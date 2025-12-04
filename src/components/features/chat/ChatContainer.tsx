"use client";

import { useEffect, useMemo,useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatContainerProps {
  /**
   * Optional API endpoint (defaults to /api/chat)
   */
  api?: string;
  /**
   * Optional auth token for authenticated requests
   */
  authToken?: string;
  /**
   * Optional callback when rate limit is reached
   */
  onRateLimitReached?: (remaining: number, reset: Date) => void;
  /**
   * Optional callback when an error occurs
   */
  onError?: (error: Error) => void;
  /**
   * Optional CSS class name for the container
   */
  className?: string;
  /**
   * Whether to show a welcome message
   */
  showWelcome?: boolean;
}

/**
 * Extract text content from UIMessage parts
 */
function getMessageText(message: UIMessage): string {
  if (!message.parts || message.parts.length === 0) {
    return "";
  }

  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function ChatContainer({
  api = "/api/chat",
  authToken,
  onRateLimitReached,
  onError,
  className,
  showWelcome = true,
}: ChatContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");

  // Create transport with auth headers using DefaultChatTransport
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api,
      headers: authToken
        ? {
            Authorization: `Bearer ${authToken}`,
          }
        : undefined,
    });
  }, [api, authToken]);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    regenerate,
    clearError,
  } = useChat({
    transport,
    onError: (err: Error) => {
      // Check for rate limit error
      if (err.message.includes("429") || err.message.includes("Rate limit")) {
        try {
          const errorData = JSON.parse(err.message);
          onRateLimitReached?.(
            errorData.remaining ?? 0,
            new Date(errorData.reset)
          );
        } catch {
          onRateLimitReached?.(0, new Date());
        }
      }
      onError?.(err);
    },
  });

  const isLoading = status === "streaming" || status === "submitted";
  const isReady = status === "ready";

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && isReady) {
      const message = inputValue;
      setInputValue("");
      // Use { text: message } format as per AI SDK v5 docs
      await sendMessage({ text: message });
    }
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Messages area */}
      <ScrollArea ref={scrollRef} className="flex-1">
        <div className="flex flex-col">
          {/* Welcome message */}
          {showWelcome && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <div className="mb-4 text-4xl">🙏</div>
              <h2 className="mb-2 text-xl font-semibold">
                Radhey Radhey! Welcome to GitaGPT
              </h2>
              <p className="max-w-md text-muted-foreground">
                I am here to guide you through the timeless wisdom of the
                Bhagavad Gita. Ask me any question about life, dharma, karma, or
                the path to self-realization.
              </p>

              {/* Suggested questions */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "What is karma yoga?",
                  "How to find inner peace?",
                  "What does Krishna say about duty?",
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => {
                      setInputValue(question);
                    }}
                    className="rounded-full border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((message: UIMessage) => (
            <ChatMessage
              key={message.id}
              role={message.role as "user" | "assistant"}
              content={getMessageText(message)}
            />
          ))}

          {/* Loading indicator */}
          {status === "submitted" && (
            <ChatMessage role="assistant" content="" isLoading />
          )}

          {/* Error message */}
          {error && (
            <div className="mx-4 my-2 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-medium">An error occurred</p>
              <p className="text-muted-foreground">Something went wrong. Please try again.</p>
              <button
                type="button"
                onClick={() => {
                  clearError();
                  regenerate();
                }}
                className="mt-2 rounded-md bg-destructive px-3 py-1.5 text-sm text-destructive-foreground hover:bg-destructive/90"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="shrink-0 border-t bg-background p-4">
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          onStop={stop}
          isLoading={isLoading}
          disabled={!isReady && !isLoading}
          placeholder="Ask Krishna a question..."
        />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI can make mistakes. Verify responses and consult a guru for deeper understanding.
        </p>
      </div>
    </div>
  );
}
