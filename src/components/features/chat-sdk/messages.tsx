"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import { ArrowDown } from "lucide-react";

import { Message } from "./message";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessagesProps {
  messages: UIMessage[];
  isLoading?: boolean;
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

export function Messages({ messages, isLoading }: MessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Check if user has scrolled up
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  }, []);

  // Scroll on new messages (only if near bottom)
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom, showScrollButton]);

  // Scroll during streaming (when content updates) - only if near bottom
  useEffect(() => {
    if (isLoading && !showScrollButton) {
      const interval = setInterval(scrollToBottom, 100);
      return () => clearInterval(interval);
    }
  }, [isLoading, scrollToBottom, showScrollButton]);

  return (
    <div 
      ref={containerRef} 
      className="relative flex-1 overflow-y-auto"
      onScroll={handleScroll}
    >
      <div className="flex flex-col pb-32">
        {messages.map((message) => (
          <div key={message.id} className="group">
            <Message
              role={message.role as "user" | "assistant"}
              content={getMessageText(message)}
            />
          </div>
        ))}

        {/* Loading indicator - show when loading and last message is from user (waiting for AI) */}
        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
          <div className="group">
            <Message role="assistant" content="" isLoading />
          </div>
        )}

        {/* Invisible element to scroll to */}
        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={scrollToBottom}
                size="icon"
                variant="outline"
                className="fixed bottom-32 left-1/2 z-10 size-9 -translate-x-1/2 rounded-full bg-background shadow-md"
              >
                <ArrowDown className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Scroll to bottom</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
