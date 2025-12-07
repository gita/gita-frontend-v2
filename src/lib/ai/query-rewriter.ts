/**
 * Query Rewriter for Conversational RAG
 *
 * Transforms follow-up questions into standalone queries that can be understood
 * without the chat history. This significantly improves RAG retrieval for
 * conversational queries like "tell me more" or "what does that mean?"
 *
 * Inspired by LangChain's Conversational RAG pattern and community best practices.
 */

import { gateway } from "@ai-sdk/gateway";
import { generateText, type UIMessage } from "ai";

/**
 * System prompt for query contextualization
 * Instructs the model to reformulate questions without answering them
 */
const CONTEXTUALIZE_SYSTEM_PROMPT = `You are a query reformulation assistant for a Bhagavad Gita chatbot.

Your task: Given a chat history and the user's latest question, reformulate the question to be STANDALONE - meaning it can be understood without any chat history.

Rules:
1. DO NOT answer the question - only reformulate it
2. If the question is already standalone, return it unchanged
3. Replace pronouns (it, that, this, they) with the actual subjects from history
4. Include relevant context from the conversation (e.g., specific verses, concepts mentioned)
5. Keep the reformulated question concise but complete
6. Preserve the user's original intent and tone

Examples:
- History: "What is karma yoga?" → AI explains... → User: "How do I practice it?"
  Output: "How do I practice karma yoga according to the Bhagavad Gita?"

- History: "Explain verse 2.47" → AI explains... → User: "What does 'fruit of action' mean here?"
  Output: "What does 'fruit of action' mean in Bhagavad Gita verse 2.47?"

- History: None → User: "What is dharma?"
  Output: "What is dharma?" (already standalone)

- History: "Tell me about Arjuna's dilemma" → AI explains... → User: "Why was he confused?"
  Output: "Why was Arjuna confused about fighting in the battle of Kurukshetra?"`;

/**
 * Configuration for query rewriting
 */
export interface QueryRewriterConfig {
  /** Maximum number of history messages to consider (default: 6 = 3 exchanges) */
  maxHistoryMessages?: number;
  /** Whether to enable debug logging */
  debug?: boolean;
}

const DEFAULT_CONFIG: Required<QueryRewriterConfig> = {
  maxHistoryMessages: 6,
  debug: true,
};

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
 * Format chat history for the contextualization prompt
 */
function formatChatHistory(messages: UIMessage[], maxMessages: number): string {
  // Take the last N messages (excluding the current one)
  const historyMessages = messages.slice(0, -1).slice(-maxMessages);

  if (historyMessages.length === 0) return "";

  return historyMessages
    .map((m) => {
      const role = m.role === "user" ? "User" : "Assistant";
      const text = extractMessageText(m);
      // Truncate long assistant responses to save tokens
      const truncatedText =
        m.role === "assistant" && text.length > 500
          ? text.substring(0, 500) + "..."
          : text;
      return `${role}: ${truncatedText}`;
    })
    .join("\n\n");
}

/**
 * Check if a query likely needs contextualization
 * Quick heuristic to avoid unnecessary LLM calls
 */
function queryNeedsContextualization(query: string): boolean {
  const lowerQuery = query.toLowerCase();

  // Pronouns that reference previous context
  const contextualPronouns = [
    /\b(it|this|that|these|those|they|them|he|she|him|her)\b/,
    /\b(the same|above|previous|mentioned|said)\b/,
  ];

  // Follow-up phrases
  const followUpPhrases = [
    /\b(tell me more|explain more|more about|elaborate|continue)\b/,
    /\b(what about|how about|and what|but what|so what)\b/,
    /\b(why is that|how so|in what way|what do you mean)\b/,
    /\b(can you|could you|please)\s+(explain|clarify|elaborate)/,
  ];

  // Check for contextual references
  const hasContextualReference = contextualPronouns.some((pattern) =>
    pattern.test(lowerQuery),
  );

  // Check for follow-up phrases
  const hasFollowUpPhrase = followUpPhrases.some((pattern) =>
    pattern.test(lowerQuery),
  );

  // Standalone questions (complete questions with proper nouns) don't need rewriting
  // Examples: "What is Radha?", "What is karma yoga?", "Explain dharma"
  const hasProperSubject =
    /\b(what|who)\s+is\s+[A-Z]\w+/i.test(query) || // "What is Krishna"
    /\b(explain|define|describe)\s+[A-Za-z]+/i.test(query); // "Explain karma"

  // Very short queries (< 4 words) with question words BUT lacking proper subjects are likely follow-ups
  const wordCount = query.trim().split(/\s+/).length;
  const isVeryShortQuery = wordCount <= 3;
  const hasQuestionWord = /^(what|why|how|who|when|where|which)\b/i.test(
    lowerQuery,
  );
  const isLikelyFollowUp =
    isVeryShortQuery && hasQuestionWord && !hasProperSubject;

  return (
    (hasContextualReference || hasFollowUpPhrase || isLikelyFollowUp) &&
    !hasProperSubject
  );
}

/**
 * Rewrite a query to be standalone using chat history context
 *
 * @param currentQuery - The user's latest question
 * @param chatHistory - Full chat history (UIMessage array)
 * @param config - Optional configuration
 * @returns The reformulated standalone query
 */
export async function contextualizeQuery(
  currentQuery: string,
  chatHistory: UIMessage[],
  config: QueryRewriterConfig = {},
): Promise<string> {
  const { maxHistoryMessages, debug } = { ...DEFAULT_CONFIG, ...config };

  // Skip if no history (first message)
  if (chatHistory.length <= 1) {
    if (debug) console.log("🔄 Query rewrite: Skipped (first message)");
    return currentQuery;
  }

  // Quick check if query likely needs contextualization
  if (!queryNeedsContextualization(currentQuery)) {
    if (debug)
      console.log("🔄 Query rewrite: Skipped (already standalone heuristic)");
    return currentQuery;
  }

  try {
    const historyText = formatChatHistory(chatHistory, maxHistoryMessages);

    if (!historyText) {
      if (debug) console.log("🔄 Query rewrite: Skipped (no valid history)");
      return currentQuery;
    }

    if (debug) {
      console.log("\n" + "🔄".repeat(40));
      console.log("🔄 QUERY REWRITING");
      console.log("🔄".repeat(40));
      console.log("Original query:", currentQuery);
      console.log("History length:", chatHistory.length - 1, "messages");
    }

    const startTime = Date.now();

    const result = await generateText({
      model: gateway("openai/gpt-5.1-instant"),
      system: CONTEXTUALIZE_SYSTEM_PROMPT,
      prompt: `Chat History:
${historyText}

Latest Question: ${currentQuery}

Standalone Question:`,
      temperature: 0, // Deterministic output
    });

    const rewrittenQuery = result.text?.trim() || currentQuery;
    const latency = Date.now() - startTime;

    if (debug) {
      console.log("Rewritten query:", rewrittenQuery);
      console.log(`Latency: ${latency}ms`);
      console.log("🔄".repeat(40) + "\n");
    }

    // Note: We no longer limit rewritten query length - longer queries with context are good for RAG
    return rewrittenQuery;
  } catch (error) {
    console.error("❌ Query rewriting failed, using original query:", error);
    return currentQuery;
  }
}

/**
 * Check if query rewriting is enabled
 * Can be disabled via environment variable for testing
 */
export function isQueryRewritingEnabled(): boolean {
  return process.env.DISABLE_QUERY_REWRITING !== "true";
}
