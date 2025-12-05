"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";

import { AuthModal } from "@/components/AuthModal";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import { useRateLimitStatus } from "@/hooks/useRateLimitStatus";
import { useAuth } from "@/lib/auth/AuthProvider";

interface ChatProps {
  chatId?: string;
}

export function Chat({ chatId }: ChatProps) {
  const { user, session } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const {
    isLoading: chatsLoading,
    getChat,
    createChat,
    addMessage,
    updateChatTitle,
  } = useChatPersistence();

  // Proactive rate limit status check
  const { isLimited: isProactivelyLimited, refresh: refreshRateLimit } =
    useRateLimitStatus();

  // Track the active chat ID for this session (may be created mid-conversation)
  const [activeChatId, setActiveChatId] = useState<string | null>(
    chatId ?? null,
  );

  // Check if we're on the main gitagpt page (not a chat page)
  const isMainPage = pathname === "/gitagpt" || pathname === "/gitagpt/";

  // Track synced messages to avoid infinite loops
  const syncedMessageCountRef = useRef(0);
  const titleUpdatedRef = useRef(false);
  const pendingMessageHandledRef = useRef(false);
  const lastLoadedChatIdRef = useRef<string | null>(null);

  // Create a stable reference to the current access token
  const accessTokenRef = useRef<string | undefined>(session?.access_token);
  accessTokenRef.current = session?.access_token;

  // Create transport with auth headers - uses ref to always get fresh token
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/chat",
      // Use a function to dynamically get headers at request time
      headers: (): Record<string, string> => {
        const token = accessTokenRef.current;
        if (token) {
          return { Authorization: `Bearer ${token}` };
        }
        return {};
      },
    });
    // Empty deps - transport is stable, headers are dynamic via ref
  }, []);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    clearError,
    setMessages,
  } = useChat({
    transport,
  });

  // Parse error message to get clean text
  const getErrorMessage = (): string => {
    if (!error) return "";

    // For Error objects, String() gives us the message
    // Error.toString() returns "Error: <message>" or just the message
    const errorStr = String(error);

    // Remove "Error: " prefix if present
    const cleanedStr = errorStr.startsWith("Error: ")
      ? errorStr.substring(7)
      : errorStr;

    // Check if it's a JSON string
    if (cleanedStr.startsWith("{") || cleanedStr.startsWith('{"error"')) {
      try {
        const parsed = JSON.parse(cleanedStr);
        return parsed.error || parsed.message || cleanedStr;
      } catch {
        // If parsing fails, return as is
        return cleanedStr;
      }
    }

    return cleanedStr;
  };

  const errorMessage = getErrorMessage();
  const isRateLimitError =
    errorMessage.toLowerCase().includes("daily limit") ||
    errorMessage.toLowerCase().includes("rate limit");

  // Load existing messages when chat is opened (only for chats loaded from persistence)
  useEffect(() => {
    // Wait for chats to finish loading
    if (chatsLoading) return;

    // Only load from persistence if chatId is from URL (not created mid-conversation)
    if (!chatId) return;

    // If chatId changed, reset state and load messages
    if (chatId !== lastLoadedChatIdRef.current) {
      syncedMessageCountRef.current = 0;
      titleUpdatedRef.current = false;
      pendingMessageHandledRef.current = false;

      const chat = getChat(chatId);

      if (chat?.messages && chat.messages.length > 0) {
        const formattedMessages = chat.messages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          parts: [{ type: "text" as const, text: msg.content }],
        }));
        setMessages(formattedMessages);
        syncedMessageCountRef.current = formattedMessages.length;
        titleUpdatedRef.current = true; // Title already set for existing chats
      } else {
        setMessages([]);
      }

      lastLoadedChatIdRef.current = chatId;
    }
  }, [chatId, chatsLoading, getChat, setMessages]);

  const isLoading = status === "streaming" || status === "submitted";
  const isReady = status === "ready";

  // Sync assistant messages with persistence (only when streaming completes)
  // User messages are saved immediately in handleSubmit
  useEffect(() => {
    const currentChatId = activeChatId;
    if (!currentChatId || status !== "ready" || messages.length === 0) return;

    // Only sync messages we haven't synced yet
    const newMessagesCount = messages.length - syncedMessageCountRef.current;
    if (newMessagesCount <= 0) return;

    // Get new messages to sync (only assistant messages - user messages saved in handleSubmit)
    const newMessages = messages.slice(syncedMessageCountRef.current);

    // Save each new ASSISTANT message (user messages already saved)
    newMessages.forEach((msg) => {
      if (msg.role !== "assistant") return; // Skip user messages - already saved

      const content =
        msg.parts
          ?.filter(
            (p): p is { type: "text"; text: string } => p.type === "text",
          )
          .map((p) => p.text)
          .join("") || "";

      if (content) {
        addMessage(currentChatId, {
          role: "assistant",
          content,
        });
      }
    });

    // Update synced count
    syncedMessageCountRef.current = messages.length;

    // Auto-generate title from first user message (only once)
    if (!titleUpdatedRef.current) {
      const firstUserMessage = messages.find((m) => m.role === "user");
      if (firstUserMessage) {
        const content =
          firstUserMessage.parts
            ?.filter(
              (p): p is { type: "text"; text: string } => p.type === "text",
            )
            .map((p) => p.text)
            .join("") || "";
        const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
        updateChatTitle(currentChatId, title);
        titleUpdatedRef.current = true;
      }
    }
  }, [messages.length, status, activeChatId, addMessage, updateChatTitle]);

  // Track previous auth state to detect login/logout (skip initial load)
  const wasAuthenticatedRef = useRef<boolean | null>(null);
  const isInitialMountRef = useRef(true);

  // Clear chat when user logs in or out (to avoid mixing auth states)
  useEffect(() => {
    const isNowAuthenticated = !!user;
    
    // Skip on initial mount - we don't want to redirect when page first loads
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      wasAuthenticatedRef.current = isNowAuthenticated;
      return;
    }
    
    const wasAuthenticated = wasAuthenticatedRef.current;

    // Auth state actually changed (login or logout) - clear the chat and start fresh
    if (wasAuthenticated !== null && isNowAuthenticated !== wasAuthenticated) {
      setActiveChatId(null);
      setMessages([]);
      clearError();
      syncedMessageCountRef.current = 0;
      titleUpdatedRef.current = false;
      lastLoadedChatIdRef.current = null;

      // Navigate to main page to avoid loading old chat from URL
      if (!isMainPage) {
        router.push("/gitagpt");
      }
    }

    wasAuthenticatedRef.current = isNowAuthenticated;
  }, [user, setMessages, clearError, isMainPage, router]);

  // Reset state when navigating to main page (for new chat)
  useEffect(() => {
    // If on main page but have an active chat, reset everything
    if (isMainPage && activeChatId) {
      setActiveChatId(null);
      setMessages([]);
      clearError(); // Clear any previous errors when starting fresh
      syncedMessageCountRef.current = 0;
      titleUpdatedRef.current = false;
      lastLoadedChatIdRef.current = null;
    }
    // Also clear error when on main page without active chat (fresh start)
    else if (isMainPage && !activeChatId && error) {
      clearError();
    }
    // If chatId prop is provided (from URL), use it
    else if (chatId && chatId !== activeChatId) {
      setActiveChatId(chatId);
    }
  }, [isMainPage, chatId, error]); // activeChatId and setMessages are stable

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || !isReady) return;

    const message = inputValue;
    setInputValue("");

    // Track if this is a new chat being created
    const isNewChat = !activeChatId;

    try {
      // Send message to AI FIRST - before creating any chat
      // This way, if rate limit hits, no chat is created
      await sendMessage({ text: message });

      // Only after successful send, create/commit the chat
      if (isNewChat) {
        const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");
        try {
          const newChat = await createChat(title);
          const newChatId = newChat.id;

          setActiveChatId(newChatId);
          titleUpdatedRef.current = true;

          // Save user message to persistence
          addMessage(newChatId, {
            role: "user",
            content: message,
          });
          syncedMessageCountRef.current += 1;

          // Update URL without full page reload
          window.history.pushState({}, "", `/gitagpt/chat/${newChatId}`);
        } catch {
          // Chat persistence failed (e.g., not authenticated yet)
          // Continue without persisting - the message was already sent
          console.warn("Could not persist chat - continuing without saving");
        }
      } else if (activeChatId) {
        // Existing chat - save user message
        try {
          addMessage(activeChatId, {
            role: "user",
            content: message,
          });
          syncedMessageCountRef.current += 1;
        } catch {
          // Message persistence failed
          console.warn("Could not persist message - continuing without saving");
        }
      }
      // Refresh rate limit status after successful send
      refreshRateLimit();
    } catch (err) {
      console.error("Error sending message:", err);
      // Restore the input value on error
      setInputValue(message);

      // Remove the user message that was optimistically added by useChat
      // This prevents showing the failed message in the chat
      setMessages((prev) => {
        // Remove the last user message if it matches what we just tried to send
        const lastUserIdx = prev.findLastIndex((m) => m.role === "user");
        if (lastUserIdx !== -1) {
          const lastUserMsg = prev[lastUserIdx];
          const lastUserText =
            lastUserMsg.parts
              ?.filter(
                (p): p is { type: "text"; text: string } => p.type === "text",
              )
              .map((p) => p.text)
              .join("") || "";

          if (lastUserText === message) {
            return prev.filter((_, idx) => idx !== lastUserIdx);
          }
        }
        return prev;
      });

      // If this was a new chat that failed, no chat was created
      // Error will be displayed on the welcome screen
      // Also refresh rate limit status to get accurate remaining count
      refreshRateLimit();
    }
  };

  // Welcome screen - with title, subtitle and suggested prompts
  // Show welcome screen ONLY if no active chat and no messages
  if (!activeChatId && messages.length === 0) {
    return (
      <>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-start px-4 pb-20 pt-16 md:pt-28">
            <div className="w-full max-w-3xl space-y-8">
              {/* Welcome Message */}
              <div className="text-center">
                {/* Krishna Image - Arch Shape */}
                <div className="mb-6 flex justify-center">
                  <div className="relative h-24 w-20 overflow-hidden rounded-t-full border-2 border-primary/20 shadow-lg md:h-28 md:w-24">
                    <Image
                      src="/art/bg_krishnaji_portrait.webp"
                      alt="Lord Krishna"
                      fill
                      className="object-cover object-top"
                      sizes="96px"
                      priority
                    />
                  </div>
                </div>
                <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
                  Radhey Radhey! Welcome to GitaGPT
                </h1>
                <p className="text-base text-muted-foreground md:text-lg">
                  Ask me any question about life, dharma, karma, or the path to
                  self-realization.
                </p>
              </div>

              {/* Proactive rate limit banner - shown before user tries to send */}
              {isProactivelyLimited && !error && (
                <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <AlertTriangle className="size-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-700 dark:text-amber-400">
                        Daily Limit Reached
                      </h3>
                      <p className="mt-1 text-sm text-amber-700/90 dark:text-amber-400/90">
                        {user
                          ? "You've used all your messages for today. Your limit will reset tomorrow."
                          : "You've reached the free daily limit of 2 messages. Sign in to get 10 messages per day!"}
                      </p>
                      {!user && (
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="mt-3 inline-flex items-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
                        >
                          Sign in for more messages
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Error message on welcome screen */}
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <svg
                        className="size-5 text-destructive"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-destructive">
                        {isRateLimitError
                          ? "Daily Limit Reached"
                          : "An Error Occurred"}
                      </h3>
                      <p className="mt-1 text-sm text-destructive/90">
                        {errorMessage ||
                          "Something went wrong. Please try again."}
                      </p>
                      {isRateLimitError && !user && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => setAuthModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                          >
                            Sign up for more messages
                          </button>
                          <button
                            type="button"
                            onClick={clearError}
                            className="inline-flex items-center rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                      {isRateLimitError && user && (
                        <button
                          type="button"
                          onClick={clearError}
                          className="mt-3 inline-flex items-center rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                        >
                          Dismiss
                        </button>
                      )}
                      {!isRateLimitError && (
                        <button
                          type="button"
                          onClick={clearError}
                          className="mt-3 text-sm font-medium text-destructive underline hover:no-underline"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Center Input */}
              <div className="w-full">
                <MultimodalInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSubmit={handleSubmit}
                  onStop={stop}
                  isLoading={isLoading}
                  disabled={
                    (!isReady && !isLoading) ||
                    (isRateLimitError && !!error) ||
                    isProactivelyLimited
                  }
                  placeholder="Ask Krishna a question..."
                />
              </div>

              {/* Suggested prompts */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {[
                  "What is karma yoga?",
                  "How to find inner peace?",
                  "कर्म योग क्या है?",
                  "मन की शांति कैसे पाएं?",
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => setInputValue(question)}
                    className="rounded-full border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer at bottom */}
          <div className="bg-background px-4 py-3">
            <p className="text-center text-xs text-muted-foreground">
              AI can make mistakes. Verify responses and consult a guru for
              deeper understanding.
            </p>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          translate={(key) => key || ""}
        />
      </>
    );
  }

  // Chat view
  return (
    <>
      <div className="flex h-full flex-col">
        {/* Messages */}
        <Messages messages={messages} isLoading={isLoading} />

        {/* Error message */}
        {error && (
          <div className="bg-background px-4 pb-3">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0">
                    <svg
                      className="size-5 text-destructive"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-destructive">
                      {isRateLimitError
                        ? "Daily Limit Reached"
                        : "An Error Occurred"}
                    </h3>
                    <p className="mt-1 text-sm text-destructive/90">
                      {errorMessage ||
                        "Something went wrong. Please try again."}
                    </p>
                    {isRateLimitError && !user && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                          Sign up for more messages
                        </button>
                        <button
                          type="button"
                          onClick={clearError}
                          className="inline-flex items-center rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                    {isRateLimitError && user && (
                      <button
                        type="button"
                        onClick={clearError}
                        className="mt-3 inline-flex items-center rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/5"
                      >
                        Dismiss
                      </button>
                    )}
                    {!isRateLimitError && (
                      <button
                        type="button"
                        onClick={clearError}
                        className="mt-3 text-sm font-medium text-destructive underline hover:no-underline"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input - floating style like ChatGPT */}
        <div className="bg-gradient-to-t from-background via-background to-transparent px-4 pb-4 pt-6">
          <div className="mx-auto max-w-3xl">
            <MultimodalInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              onStop={stop}
              isLoading={isLoading}
              disabled={!isReady && !isLoading}
            />
            {/* Disclaimer at bottom */}
            <p className="mt-2 text-center text-xs text-muted-foreground">
              AI can make mistakes. Verify responses and consult a guru for
              deeper understanding.
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        translate={(key) => key || ""}
      />
    </>
  );
}
