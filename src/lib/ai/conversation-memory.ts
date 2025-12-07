/**
 * Conversation Memory for Long-Context Management
 *
 * Solves the problem of losing important information (like user's name)
 * when using a sliding window approach. This module:
 *
 * 1. Extracts key facts from the conversation (name, preferences, topics)
 * 2. Summarizes older messages that would be dropped by sliding window
 * 3. Provides persistent context even in long conversations
 *
 * Architecture:
 * - Memory: Extracted facts that persist (name, preferences, key topics)
 * - Summary: Condensed version of older messages
 * - Recent: Sliding window of last N messages
 */

import { gateway } from "@ai-sdk/gateway";
import { generateText, type UIMessage } from "ai";

/**
 * Extracted memory from conversation
 */
export interface ConversationMemory {
  /** User's name if mentioned */
  userName?: string;
  /** Key topics discussed */
  topicsDiscussed: string[];
  /** User preferences/interests mentioned */
  preferences: string[];
  /** Important facts to remember */
  keyFacts: string[];
  /** Summary of older conversation (when sliding window kicks in) */
  olderConversationSummary?: string;
}

/**
 * System prompt for memory extraction
 */
const MEMORY_EXTRACTION_PROMPT = `You are a memory extraction assistant. Analyze the conversation and extract key information to remember.

Extract the following in JSON format:
{
  "userName": "User's name if mentioned, null otherwise",
  "topicsDiscussed": ["List of main topics/concepts discussed"],
  "preferences": ["User preferences or interests mentioned"],
  "keyFacts": ["Important facts about the user or their questions"]
}

Rules:
1. Only extract explicitly stated information
2. Keep each item concise (< 10 words)
3. Maximum 5 items per array
4. Return valid JSON only, no markdown`;

/**
 * System prompt for conversation summarization
 */
const SUMMARIZATION_PROMPT = `Summarize this conversation excerpt concisely for a chatbot's memory.

Focus on:
1. What questions the user asked
2. What topics were discussed
3. Any key conclusions or answers given
4. User's name if mentioned

Keep the summary under 150 words. Be factual and concise.`;

/**
 * Extract text content from a UI message
 */
function extractMessageText(message: UIMessage): string {
  if (!message.parts) return "";

  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join(" ");
}

/**
 * Format messages as conversation text
 */
function formatMessagesAsText(messages: UIMessage[]): string {
  return messages
    .map((m) => {
      const role = m.role === "user" ? "User" : "Assistant";
      const text = extractMessageText(m);
      // Truncate long assistant responses
      const truncated =
        m.role === "assistant" && text.length > 300
          ? text.substring(0, 300) + "..."
          : text;
      return `${role}: ${truncated}`;
    })
    .join("\n\n");
}

/**
 * Quick check if conversation likely has extractable memory
 */
function conversationHasMemoryContent(messages: UIMessage[]): boolean {
  const text = messages
    .filter((m) => m.role === "user")
    .map(extractMessageText)
    .join(" ")
    .toLowerCase();

  // Check for name patterns
  const hasNamePattern =
    /\b(my name is|i am|i'm|call me)\b/i.test(text) ||
    /\b(name is \w+)\b/i.test(text);

  // Check for preference patterns
  const hasPreferencePattern =
    /\b(i like|i prefer|i want|interested in|favorite)\b/i.test(text);

  return hasNamePattern || hasPreferencePattern;
}

/**
 * Extract memory (key facts) from a conversation
 * Only called when we detect potential memory content
 */
export async function extractMemory(
  messages: UIMessage[],
  debug: boolean = true,
): Promise<Partial<ConversationMemory>> {
  // Quick check - avoid LLM call if no memory content detected
  if (!conversationHasMemoryContent(messages)) {
    if (debug) console.log("🧠 Memory: No extractable content detected");
    return { topicsDiscussed: [], preferences: [], keyFacts: [] };
  }

  try {
    const conversationText = formatMessagesAsText(messages);

    if (debug) {
      console.log("\n" + "🧠".repeat(40));
      console.log("🧠 MEMORY EXTRACTION");
      console.log("🧠".repeat(40));
    }

    const startTime = Date.now();

    const result = await generateText({
      model: gateway("openai/gpt-5-mini"),
      system: MEMORY_EXTRACTION_PROMPT,
      prompt: `Conversation:\n${conversationText}\n\nExtract memory as JSON:`,
      temperature: 0,
    });

    const latency = Date.now() - startTime;

    // Parse JSON response
    let memory: Partial<ConversationMemory> = {
      topicsDiscussed: [],
      preferences: [],
      keyFacts: [],
    };

    try {
      const jsonMatch = result.text?.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        memory = {
          userName: parsed.userName || undefined,
          topicsDiscussed: parsed.topicsDiscussed || [],
          preferences: parsed.preferences || [],
          keyFacts: parsed.keyFacts || [],
        };
      }
    } catch {
      console.warn("⚠️ Failed to parse memory JSON, using defaults");
    }

    if (debug) {
      console.log("Extracted memory:", memory);
      console.log(`Latency: ${latency}ms`);
      console.log("🧠".repeat(40) + "\n");
    }

    return memory;
  } catch (error) {
    console.error("❌ Memory extraction failed:", error);
    return { topicsDiscussed: [], preferences: [], keyFacts: [] };
  }
}

/**
 * Summarize older messages that are being dropped by sliding window
 */
export async function summarizeOlderMessages(
  olderMessages: UIMessage[],
  debug: boolean = true,
): Promise<string> {
  if (olderMessages.length === 0) return "";

  try {
    const conversationText = formatMessagesAsText(olderMessages);

    if (debug) {
      console.log("\n" + "📝".repeat(40));
      console.log("📝 CONVERSATION SUMMARIZATION");
      console.log("📝".repeat(40));
      console.log(`Summarizing ${olderMessages.length} older messages`);
    }

    const startTime = Date.now();

    const result = await generateText({
      model: gateway("openai/gpt-5-mini"),
      system: SUMMARIZATION_PROMPT,
      prompt: `Conversation to summarize:\n${conversationText}`,
      temperature: 0,
    });

    const summary = result.text?.trim() || "";
    const latency = Date.now() - startTime;

    if (debug) {
      console.log("Summary:", summary);
      console.log(`Latency: ${latency}ms`);
      console.log("📝".repeat(40) + "\n");
    }

    return summary;
  } catch (error) {
    console.error("❌ Summarization failed:", error);
    return "";
  }
}

/**
 * Build memory context string to inject into system prompt
 */
export function buildMemoryContext(memory: ConversationMemory): string {
  const parts: string[] = [];

  if (memory.userName) {
    parts.push(`**User's Name**: ${memory.userName}`);
  }

  if (memory.topicsDiscussed.length > 0) {
    parts.push(`**Topics Discussed**: ${memory.topicsDiscussed.join(", ")}`);
  }

  if (memory.preferences.length > 0) {
    parts.push(`**User Interests**: ${memory.preferences.join(", ")}`);
  }

  if (memory.keyFacts.length > 0) {
    parts.push(`**Key Facts**: ${memory.keyFacts.join("; ")}`);
  }

  if (memory.olderConversationSummary) {
    parts.push(
      `**Earlier in Conversation**: ${memory.olderConversationSummary}`,
    );
  }

  if (parts.length === 0) return "";

  return `## Conversation Memory\n\n${parts.join("\n\n")}`;
}

/**
 * Process conversation for memory management
 * Returns memory context and truncated messages for LLM
 */
export async function processConversationMemory(
  messages: UIMessage[],
  maxRecentMessages: number = 10,
  debug: boolean = true,
): Promise<{
  memoryContext: string;
  recentMessages: UIMessage[];
  wasProcessed: boolean;
}> {
  // If conversation is short, no processing needed
  if (messages.length <= maxRecentMessages) {
    return {
      memoryContext: "",
      recentMessages: messages,
      wasProcessed: false,
    };
  }

  // Split into older and recent messages
  const olderMessages = messages.slice(0, -maxRecentMessages);
  const recentMessages = messages.slice(-maxRecentMessages);

  if (debug) {
    console.log(
      `🧠 Processing memory: ${messages.length} total → ${olderMessages.length} older + ${recentMessages.length} recent`,
    );
  }

  // Extract memory and summarize in parallel
  const [memory, summary] = await Promise.all([
    extractMemory(messages, debug),
    summarizeOlderMessages(olderMessages, debug),
  ]);

  // Combine into full memory
  const fullMemory: ConversationMemory = {
    userName: memory.userName,
    topicsDiscussed: memory.topicsDiscussed || [],
    preferences: memory.preferences || [],
    keyFacts: memory.keyFacts || [],
    olderConversationSummary: summary,
  };

  const memoryContext = buildMemoryContext(fullMemory);

  return {
    memoryContext,
    recentMessages,
    wasProcessed: true,
  };
}

/**
 * Check if conversation memory is enabled
 *
 * NOTE: Memory extraction is DISABLED by default because:
 * 1. It adds 15-25 seconds latency (runs on every message)
 * 2. Re-extracts same info repeatedly (no caching)
 * 3. Query rewriting already captures most context value
 *
 * To enable, set ENABLE_CONVERSATION_MEMORY=true
 *
 * Future improvement: Store memory in database per chat,
 * only re-extract when older messages change.
 */
export function isConversationMemoryEnabled(): boolean {
  return process.env.ENABLE_CONVERSATION_MEMORY === "true";
}
