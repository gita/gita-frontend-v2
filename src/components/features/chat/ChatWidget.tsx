"use client";

import { useEffect,useState } from "react";
import { AnimatePresence,motion } from "framer-motion";
import { MessageCircle, Minimize2,X } from "lucide-react";

import { ChatContainer } from "./ChatContainer";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  /**
   * Optional auth token for authenticated requests
   */
  authToken?: string;
  /**
   * Whether the widget should be hidden on certain pages
   */
  hidden?: boolean;
  /**
   * Position of the widget
   */
  position?: "bottom-right" | "bottom-left";
}

export function ChatWidget({
  authToken,
  hidden = false,
  position = "bottom-right",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Reset new message indicator when chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  if (hidden) {
    return null;
  }

  const positionClasses =
    position === "bottom-right" ? "right-4 sm:right-6" : "left-4 sm:left-6";

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={cn("fixed bottom-4 z-50 sm:bottom-6", positionClasses)}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="relative size-14 rounded-full shadow-lg hover:shadow-xl sm:size-16"
            >
              <MessageCircle className="size-6 sm:size-7" />
              <span className="sr-only">Open GitaGPT chat</span>

              {/* New message indicator */}
              {hasNewMessage && (
                <span className="absolute right-0 top-0 size-3 rounded-full bg-destructive" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : undefined,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-4 z-50 flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl sm:bottom-6 sm:w-[400px]",
              positionClasses,
              isMinimized ? "h-auto" : "h-[min(600px,calc(100vh-6rem))]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <span className="text-xl">🙏</span>
                <div>
                  <h3 className="font-semibold">GitaGPT</h3>
                  <p className="text-xs opacity-80">Ask Krishna anything</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="size-4" />
                  <span className="sr-only">
                    {isMinimized ? "Expand" : "Minimize"}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="size-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </div>
            </div>

            {/* Chat content */}
            {!isMinimized && (
              <ChatContainer
                authToken={authToken}
                className="flex-1"
                onRateLimitReached={(remaining, reset) => {
                  console.log(
                    `Rate limit reached. Remaining: ${remaining}, Reset: ${reset}`
                  );
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

