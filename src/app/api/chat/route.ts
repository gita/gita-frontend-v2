import { gateway } from "@ai-sdk/gateway";
import { createClient } from "@supabase/supabase-js";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { headers } from "next/headers";

import { buildSystemPrompt } from "@/lib/ai/prompts";
import { getRelevantContext } from "@/lib/ai/retrieval";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/ratelimit";

// Configuration
export const maxDuration = 30; // Allow streaming responses up to 30 seconds
const RAG_CHUNK_COUNT = 5; // Number of relevant chunks to retrieve from vector DB (Chatbase uses 7)

/**
 * GitaGPT Chat API Route
 *
 * Features:
 * - RAG: Retrieves relevant Gita content from Supabase pgvector
 * - Streaming: Uses AI SDK's streamText for real-time responses
 * - Rate Limiting: 5/day for anonymous, 10/day for authenticated users
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
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (authHeader?.startsWith("Bearer ") && supabaseUrl && supabaseAnonKey) {
      const token = authHeader.substring(7);
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const {
        data: { user },
      } = await supabase.auth.getUser(token);

      if (user) {
        userId = user.id;
        isAuthenticated = true;
      }
    }

    // Rate limit check - DISABLED FOR TESTING
    // TODO: Re-enable before production
    const identifier = isAuthenticated && userId ? userId : ip;
    const rateLimitResult = await checkRateLimit(identifier, isAuthenticated);

    // Skip rate limit enforcement during testing
    /*
    if (!rateLimitResult.success) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: isAuthenticated
            ? "You have reached your daily limit of 10 messages. Please try again tomorrow."
            : "You have reached the daily limit of 5 messages. Sign in for more messages, or try again tomorrow.",
          remaining: rateLimitResult.remaining,
          reset: rateLimitResult.reset.toISOString(),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...getRateLimitHeaders(rateLimitResult),
          },
        }
      );
    }
    */

    // Parse request body - UI messages from the client
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get the last user message for RAG retrieval
    const lastUserMessage = messages
      .filter((m) => m.role === "user")
      .pop();

    // Extract text from the last user message parts
    const userQuery = lastUserMessage?.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(" ") ?? "";

    // Retrieve relevant context from Supabase pgvector
    let relevantContext = "";
    if (userQuery) {
      try {
        relevantContext = await getRelevantContext(userQuery, RAG_CHUNK_COUNT);
        
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

    // Build system prompt with Krishna's personality and context
    const systemPrompt = buildSystemPrompt(relevantContext);

    // Stream the response using AI SDK with Vercel AI Gateway
    // Using OpenAI GPT-5.1-instant with no reasoning mode for faster responses
    const result = streamText({
      model: gateway("openai/gpt-5.1-instant"),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
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
      JSON.stringify({
        error: "Internal server error",
        message: "An error occurred while processing your request.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
