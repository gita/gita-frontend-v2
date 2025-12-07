import { gateway } from "@ai-sdk/gateway";
import { generateText } from "ai";

/**
 * Generate a short, meaningful title for a chat conversation
 * Similar to how ChatGPT generates conversation titles
 */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log(
      "[Title API] Received request for message:",
      message?.slice(0, 50),
    );

    if (!message || typeof message !== "string") {
      console.error("[Title API] Invalid message:", message);
      return new Response("Message is required", { status: 400 });
    }

    console.log("[Title API] Generating title with LLM...");
    // Generate a concise title using LLM with timeout
    const result = await generateText({
      model: gateway("openai/gpt-5-nano"),
      system: `Generate a very short title (2-5 words max) for this chat message.
Rules:
- Maximum 5 words, ideally 2-3 words
- Capture the main topic/question
- No punctuation at the end
- No quotes around the title
- Use title case
- For spiritual/Gita questions, use relevant terms

Examples:
- "What is karma yoga?" → "Karma Yoga Meaning"
- "Tell me about Arjuna's confusion" → "Arjuna's Dilemma"
- "How to meditate according to Gita" → "Meditation in Gita"
- "Explain verse 2.47" → "Verse 2.47 Explained"
- "What is dharma?" → "Understanding Dharma"
- "radhey radhey" → "Greeting"

Just output the title, nothing else.`,
      prompt: message,
      temperature: 0,
      abortSignal: AbortSignal.timeout(5000), // 5 second timeout
    });

    const title = result.text?.trim() || message.slice(0, 30);

    // Ensure title isn't too long (safety check)
    const finalTitle = title.length > 40 ? title.slice(0, 37) + "..." : title;

    console.log("[Title API] Generated title:", finalTitle);
    return Response.json({ title: finalTitle });
  } catch (error) {
    console.error("[Title API] Title generation error:", error);
    // Fallback to truncated message
    return Response.json({ title: "New Chat" });
  }
}
