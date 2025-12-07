import { gateway } from "@ai-sdk/gateway";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { headers } from "next/headers";

import {
  isConversationMemoryEnabled,
  processConversationMemory,
} from "@/lib/ai/conversation-memory";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import {
  contextualizeQuery,
  isQueryRewritingEnabled,
} from "@/lib/ai/query-rewriter";
import { getRelevantContext } from "@/lib/ai/retrieval";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ratelimit";

// Configuration
export const maxDuration = 30; // Allow streaming responses up to 30 seconds
const RAG_CHUNK_COUNT = 5; // Number of relevant chunks to retrieve from vector DB (Chatbase uses 7)

// Conversation history management
// NOTE: These are MESSAGE PAIRS (exchanges), so 20 messages = 10 user-assistant exchanges
const MAX_HISTORY_MESSAGES = 20; // Keep last 20 messages (10 exchanges) for LLM context
const QUERY_REWRITE_HISTORY = 6; // Use last 6 messages (3 exchanges) for query rewriting

/**
 * GitaGPT Chat API Route
 *
 * Features:
 * - RAG: Retrieves relevant Gita content from Supabase pgvector
 * - Streaming: Uses AI SDK's streamText for real-time responses
 * - Rate Limiting: 2/day for anonymous, 10/day for authenticated users (disabled in development)
 * - Krishna Personality: Speaks as Lord Krishna with divine wisdom
 * - AI Gateway: Uses Vercel AI Gateway for unified model access
 */
export async function POST(req: Request) {
  try {
    // Get request headers for IP and auth
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "unknown";
    const authHeader = headersList.get("authorization");

    // Check if user is authenticated
    let userId: string | null = null;
    let isAuthenticated = false;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Use service role key for server-side auth validation
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      authHeader?.startsWith("Bearer ") &&
      supabaseUrl &&
      supabaseServiceKey
    ) {
      const token = authHeader.substring(7);
      // Service role client can validate any user's token
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (authError) {
        console.warn("[Chat API] Auth validation failed:", authError.message);
      }

      if (user) {
        userId = user.id;
        isAuthenticated = true;
        console.log(
          "[Chat API] Authenticated user:",
          userId.substring(0, 8) + "...",
        );
      }
    } else {
      // Log why auth check was skipped
      if (!supabaseUrl) {
        console.warn("[Chat API] Missing NEXT_PUBLIC_SUPABASE_URL");
      }
      if (!supabaseServiceKey) {
        console.warn("[Chat API] Missing SUPABASE_SERVICE_ROLE_KEY");
      }
      if (authHeader && !authHeader.startsWith("Bearer ")) {
        console.warn("[Chat API] Invalid auth header format");
      }
    }

    // Rate limit check - ENABLED (disabled in development)
    const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";
    const identifier = isAuthenticated && userId ? userId : ip;
    console.log("[Chat API] Rate limit check:", {
      isAuthenticated,
      identifier: identifier.substring(0, 12) + "...",
      limit: isAuthenticated ? 10 : 2,
    });
    const rateLimitResult = await checkRateLimit(identifier, isAuthenticated);

    // Enforce rate limits (skip in development)
    if (!isDevelopment && !rateLimitResult.success) {
      const errorMessage = isAuthenticated
        ? "You have reached your daily limit of 10 messages. Your limit will reset tomorrow."
        : "You have reached the daily limit of 2 messages. Sign in to get 10 messages per day, or try again tomorrow.";

      // Return plain text error for AI SDK compatibility
      return new Response(errorMessage, {
        status: 429,
        headers: {
          "Content-Type": "text/plain",
          ...getRateLimitHeaders(rateLimitResult),
        },
      });
    }

    // Log rate limit bypass in development
    if (isDevelopment) {
      console.log("🔓 Rate limiting disabled in development mode");
    }

    // Parse request body - UI messages from the client
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(
        "Please provide a message to continue the conversation.",
        {
          status: 400,
          headers: { "Content-Type": "text/plain" },
        },
      );
    }

    // Get the last user message for RAG retrieval
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();

    // Extract text from the last user message parts
    const userQuery =
      lastUserMessage?.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
        .map((p) => p.text)
        .join(" ") ?? "";

    // ===========================================
    // QUERY REWRITING: Contextualize follow-up questions
    // ===========================================
    // Transform questions like "tell me more" into standalone queries
    // that include context from previous conversation
    let retrievalQuery = userQuery;
    if (userQuery && isQueryRewritingEnabled()) {
      try {
        retrievalQuery = await contextualizeQuery(userQuery, messages, {
          maxHistoryMessages: QUERY_REWRITE_HISTORY,
          debug: true,
        });
      } catch (error) {
        console.error("❌ Query rewriting failed, using original:", error);
        retrievalQuery = userQuery;
      }
    }

    // Retrieve relevant context from Supabase pgvector
    // Uses the rewritten query for better retrieval on follow-up questions
    let relevantContext = "";
    if (retrievalQuery) {
      try {
        relevantContext = await getRelevantContext(
          retrievalQuery,
          RAG_CHUNK_COUNT,
        );

        if (relevantContext) {
          console.log("\n" + "🎯".repeat(40));
          console.log("📜 FORMATTED CONTEXT FOR LLM:");
          console.log("🎯".repeat(40) + "\n");
          console.log(relevantContext);
          console.log("\n" + "🎯".repeat(40) + "\n");
        }
      } catch (error) {
        console.error("❌ Error retrieving context:", error);
        // Continue without context if retrieval fails
      }
    }

    // ===========================================
    // CONVERSATION MEMORY: Remember key facts + summarize older messages
    // ===========================================
    // When conversation exceeds sliding window:
    // 1. Extract key facts (user name, preferences, topics)
    // 2. Summarize older messages that would be dropped
    // 3. Inject memory into system prompt
    // This ensures we don't lose important info like user's name
    let memoryContext = "";
    let recentMessages = messages;

    if (
      isConversationMemoryEnabled() &&
      messages.length > MAX_HISTORY_MESSAGES
    ) {
      try {
        const memoryResult = await processConversationMemory(
          messages,
          MAX_HISTORY_MESSAGES,
          true, // debug
        );
        memoryContext = memoryResult.memoryContext;
        recentMessages = memoryResult.recentMessages;

        if (memoryResult.wasProcessed) {
          console.log(
            `🧠 Memory processed: ${messages.length} → ${recentMessages.length} messages + memory context`,
          );
        }
      } catch (error) {
        console.error(
          "❌ Memory processing failed, using simple window:",
          error,
        );
        recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);
      }
    } else if (messages.length > MAX_HISTORY_MESSAGES) {
      // Fallback to simple sliding window if memory is disabled
      recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);
      console.log(
        `📏 Sliding window: ${messages.length} → ${recentMessages.length} messages`,
      );
    }

    // Build system prompt with Krishna's personality, context, and memory
    const systemPrompt = buildSystemPrompt(relevantContext, memoryContext);

    // Stream the response using AI SDK with Vercel AI Gateway
    // Using OpenAI GPT-5.1-instant with no reasoning mode for faster responses
    const result = streamText({
      model: gateway("openai/gpt-5.1-instant"),
      system: systemPrompt,
      messages: convertToModelMessages(recentMessages),
    });

    // Return UI message stream response with rate limit headers
    const response = result.toUIMessageStreamResponse();

    // Add rate limit headers to response
    const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);
    Object.entries(rateLimitHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      "An error occurred while processing your request. Please try again.",
      {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      },
    );
  }
}
