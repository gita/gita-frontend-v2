"use client";

import { useEffect, useMemo,useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { usePathname } from "next/navigation";

import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";
import { WelcomeModal } from "./welcome-modal";

import { AuthModal } from "@/components/AuthModal";
import { useChatPersistence } from "@/hooks/useChatPersistence";
import { useAuth } from "@/lib/auth/AuthProvider";

interface ChatProps {
  chatId?: string;
}

export function Chat({ chatId }: ChatProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isLoading: chatsLoading, getChat, createChat, addMessage, updateChatTitle } = useChatPersistence();

  // Track the active chat ID for this session (may be created mid-conversation)
  const [activeChatId, setActiveChatId] = useState<string | null>(chatId ?? null);
  
  // Check if we're on the main gitagpt page (not a chat page)
  const isMainPage = pathname === "/gitagpt" || pathname === "/gitagpt/";

  // Track synced messages to avoid infinite loops
  const syncedMessageCountRef = useRef(0);
  const titleUpdatedRef = useRef(false);
  const pendingMessageHandledRef = useRef(false);
  const lastLoadedChatIdRef = useRef<string | null>(null);

  // Create transport with auth headers
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/chat",
      headers: user?.id
        ? {
            Authorization: `Bearer ${user.id}`,
          }
        : undefined,
    });
  }, [user]);

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
      console.log("Loading chat:", chatId, "Found:", !!chat, "Messages:", chat?.messages?.length);
      
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
      
      const content = msg.parts
        ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
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
        const content = firstUserMessage.parts
          ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join("") || "";
        const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
        updateChatTitle(currentChatId, title);
        titleUpdatedRef.current = true;
      }
    }
  }, [messages.length, status, activeChatId, addMessage, updateChatTitle]);

  // Reset state when navigating to main page (for new chat)
  useEffect(() => {
    // If on main page but have an active chat, reset everything
    if (isMainPage && activeChatId) {
      setActiveChatId(null);
      setMessages([]);
      syncedMessageCountRef.current = 0;
      titleUpdatedRef.current = false;
      lastLoadedChatIdRef.current = null;
    }
    // If chatId prop is provided (from URL), use it
    else if (chatId && chatId !== activeChatId) {
      setActiveChatId(chatId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMainPage, chatId]); // activeChatId and setMessages are stable

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || !isReady) return;

    const message = inputValue;
    setInputValue("");

    try {
      let currentChatId = activeChatId;
      
      // If no chatId, create a new chat first
      if (!currentChatId) {
        const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");
        const newChat = await createChat(title);
        currentChatId = newChat.id;
        setActiveChatId(currentChatId);
        titleUpdatedRef.current = true;
        
        // Update URL without full page reload
        window.history.pushState({}, '', `/gitagpt/chat/${currentChatId}`);
      }
      
      // Save user message immediately to persistence
      addMessage(currentChatId, {
        role: "user",
        content: message,
      });
      syncedMessageCountRef.current += 1;
      
      // Send message to AI
      await sendMessage({ text: message });
    } catch (error) {
      console.error("Error sending message:", error);
      // Restore the input value on error
      setInputValue(message);
    }
  };

  // Welcome screen - with title, subtitle and suggested prompts
  // Show welcome screen ONLY if no active chat and no messages
  if (!activeChatId && messages.length === 0) {
    return (
      <>
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-4 pb-20">
            <div className="w-full max-w-3xl space-y-6">
              {/* Welcome Message */}
              <div className="text-center">
                <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
                  Radhey Radhey! Welcome to GitaGPT
                </h1>
                <p className="text-lg text-muted-foreground">
                  Ask me any question about life, dharma, karma, or the path to self-realization.
                </p>
              </div>

              {/* Center Input */}
              <div className="w-full">
                <MultimodalInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSubmit={handleSubmit}
                  onStop={stop}
                  isLoading={isLoading}
                  disabled={!isReady && !isLoading}
                  placeholder="Ask Krishna a question..."
                />
              </div>

              {/* Suggested prompts */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "What is karma yoga?",
                  "How to find inner peace?",
                  "What does Krishna say about duty?",
                  "Explain verse 2.47",
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => setInputValue(question)}
                    className="rounded-full border bg-background px-4 py-2.5 text-sm transition-colors hover:bg-muted"
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
              GitaGPT provides guidance based on the Bhagavad Gita. Always reflect and
              consult with a guru for deeper understanding.
            </p>
          </div>
        </div>

        {/* Welcome Modal for first-time visitors */}
        <WelcomeModal onSignUp={() => setAuthModalOpen(true)} />
        
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
    <div className="flex h-full flex-col">
      {/* Messages */}
      <Messages messages={messages} isLoading={isLoading} />

      {/* Error message */}
      {error && (
        <div className="border-t bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">An error occurred</p>
          <p>Something went wrong. Please try again.</p>
          <button
            type="button"
            onClick={clearError}
            className="mt-2 underline"
          >
            Dismiss
          </button>
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
            GitaGPT provides guidance based on the Bhagavad Gita. Always reflect and
            consult with a guru for deeper understanding.
          </p>
        </div>
      </div>
    </div>
  );
}

