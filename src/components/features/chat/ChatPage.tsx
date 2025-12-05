"use client";

import { useEffect, useState } from "react";

import { ChatContainer } from "./ChatContainer";

import { cn } from "@/lib/utils";

interface ChatPageProps {
  /**
   * Locale for i18n
   */
  locale?: string;
  /**
   * Optional CSS class name
   */
  className?: string;
}

export function ChatPage({ locale = "en", className }: ChatPageProps) {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number;
    reset: Date;
  } | null>(null);

  // Get auth token from Supabase session
  useEffect(() => {
    const getSession = async () => {
      try {
        // Get token from localStorage or session
        const token = localStorage.getItem("supabase.auth.token");
        if (token) {
          const parsed = JSON.parse(token);
          setAuthToken(parsed?.currentSession?.access_token);
        }
      } catch (error) {
        console.error("Error getting auth session:", error);
      }
    };

    getSession();
  }, []);

  const handleRateLimitReached = (remaining: number, reset: Date) => {
    setRateLimitInfo({ remaining, reset });
  };

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-64px)] flex-col bg-background",
        className,
      )}
    >
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-2xl text-primary-foreground">
            🙏
          </div>
          <div>
            <h1 className="text-xl font-bold">GitaGPT</h1>
            <p className="text-sm text-muted-foreground">
              {locale === "hi"
                ? "भगवद्गीता की दिव्य ज्ञान से मार्गदर्शन"
                : "Divine guidance from the Bhagavad Gita"}
            </p>
          </div>
        </div>

        {/* Rate limit indicator */}
        {rateLimitInfo && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-1.5 text-sm text-destructive">
            <p className="font-medium">Daily limit reached</p>
            <p className="text-xs">
              Resets at {rateLimitInfo.reset.toLocaleTimeString()}
            </p>
          </div>
        )}
      </header>

      {/* Chat container */}
      <ChatContainer
        authToken={authToken}
        onRateLimitReached={handleRateLimitReached}
        className="flex-1"
        showWelcome
      />
    </div>
  );
}
