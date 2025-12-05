"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = "gitagpt_chats";
const MAX_CHATS = 20; // Reduced to prevent quota issues
const MAX_MESSAGES_PER_CHAT = 50; // Limit messages per chat
const MAX_CONTENT_LENGTH = 5000; // Limit content length per message

/**
 * Hook for managing chat history in localStorage for anonymous users
 */
export function useLocalChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Use ref to avoid stale closures in callbacks
  const chatsRef = useRef<Chat[]>([]);
  chatsRef.current = chats;

  // Helper to load chats from localStorage
  const loadChatsFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const chatsWithDates = parsed.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            createdAt: new Date(msg.createdAt),
          })),
        }));
        return chatsWithDates;
      }
    } catch (error) {
      console.error("Error loading chats from localStorage:", error);
    }
    return [];
  }, []);

  // Load chats from localStorage on mount
  useEffect(() => {
    const loaded = loadChatsFromStorage();
    setChats(loaded);
    setIsLoading(false);
  }, [loadChatsFromStorage]);

  // Sync between multiple instances using storage events and custom events
  useEffect(() => {
    // Handle storage events from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const loaded = loadChatsFromStorage();
        setChats(loaded);
      }
    };

    // Handle custom events from same tab (storage events don't fire in same tab)
    const handleCustomSync = () => {
      const loaded = loadChatsFromStorage();
      setChats(loaded);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("gitagpt-chats-updated", handleCustomSync);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("gitagpt-chats-updated", handleCustomSync);
    };
  }, [loadChatsFromStorage]);

  // Save chats to localStorage with quota management
  const saveChats = useCallback((updatedChats: Chat[]) => {
    try {
      // Truncate content to prevent quota issues
      const optimizedChats = updatedChats.map((chat) => ({
        ...chat,
        messages: chat.messages.slice(-MAX_MESSAGES_PER_CHAT).map((msg) => ({
          ...msg,
          content: msg.content.slice(0, MAX_CONTENT_LENGTH),
        })),
      }));

      localStorage.setItem(STORAGE_KEY, JSON.stringify(optimizedChats));
      setChats(optimizedChats);

      // Dispatch custom event to sync other instances in same tab
      window.dispatchEvent(new CustomEvent("gitagpt-chats-updated"));
    } catch (error) {
      // If quota exceeded, remove oldest chats and try again
      if (error instanceof Error && error.name === "QuotaExceededError") {
        console.warn("localStorage quota exceeded, removing old chats...");
        const reducedChats = updatedChats.slice(
          0,
          Math.floor(updatedChats.length / 2),
        );
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedChats));
          setChats(reducedChats);
          window.dispatchEvent(new CustomEvent("gitagpt-chats-updated"));
        } catch {
          // Last resort: clear all
          localStorage.removeItem(STORAGE_KEY);
          setChats([]);
          window.dispatchEvent(new CustomEvent("gitagpt-chats-updated"));
        }
      } else {
        console.error("Error saving chats to localStorage:", error);
      }
    }
  }, []);

  // Create a new chat
  const createChat = useCallback(
    (title: string = "New conversation") => {
      const newChat: Chat = {
        id: crypto.randomUUID(),
        title,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      let updatedChats = [newChat, ...chatsRef.current];

      // Limit to MAX_CHATS, remove oldest
      if (updatedChats.length > MAX_CHATS) {
        updatedChats = updatedChats
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .slice(0, MAX_CHATS);
      }

      saveChats(updatedChats);
      return newChat;
    },
    [saveChats],
  );

  // Get a specific chat by ID - depends on chats to trigger re-renders
  const getChat = useCallback(
    (chatId: string) => {
      return chats.find((chat) => chat.id === chatId);
    },
    [chats],
  );

  // Add a message to a chat (stable reference - no infinite loop)
  // IMPORTANT: Read directly from localStorage to avoid race conditions
  const addMessage = useCallback(
    (chatId: string, message: Omit<ChatMessage, "id" | "createdAt">) => {
      // Read FRESH data from localStorage to prevent race conditions
      // This is critical when multiple addMessage calls happen rapidly
      const freshChats = loadChatsFromStorage();
      const chat = freshChats.find((c: Chat) => c.id === chatId);

      console.log("[LocalChats] addMessage called:", { chatId, role: message.role, content: message.content.substring(0, 50), chatFound: !!chat });

      if (!chat) {
        console.warn("[LocalChats] Chat not found:", chatId);
        return;
      }

      // Check if message already exists (prevent duplicates)
      const messageExists = chat.messages.some(
        (m: ChatMessage) => m.role === message.role && m.content === message.content,
      );
      if (messageExists) {
        console.log("[LocalChats] Message already exists, skipping");
        return;
      }

      const updatedChats = freshChats.map((c: Chat) => {
        if (c.id === chatId) {
          const newMessage: ChatMessage = {
            ...message,
            id: crypto.randomUUID(),
            createdAt: new Date(),
          };
          const updatedChat = {
            ...c,
            messages: [...c.messages, newMessage],
            updatedAt: new Date(),
          };
          console.log("[LocalChats] Updated chat:", { chatId, messagesCount: updatedChat.messages.length });
          return updatedChat;
        }
        return c;
      });

      console.log("[LocalChats] Saving chats to localStorage, total chats:", updatedChats.length);
      saveChats(updatedChats);
    },
    [loadChatsFromStorage, saveChats],
  );

  // Update chat title (stable reference)
  const updateChatTitle = useCallback(
    (chatId: string, title: string) => {
      const currentChats = chatsRef.current;
      const chat = currentChats.find((c) => c.id === chatId);

      // Don't update if title is the same
      if (!chat || chat.title === title) return;

      const updatedChats = currentChats.map((c) =>
        c.id === chatId ? { ...c, title, updatedAt: new Date() } : c,
      );
      saveChats(updatedChats);
    },
    [saveChats],
  );

  // Delete a chat
  const deleteChat = useCallback(
    (chatId: string) => {
      const updatedChats = chatsRef.current.filter(
        (chat) => chat.id !== chatId,
      );
      saveChats(updatedChats);
    },
    [saveChats],
  );

  // Clear all chats
  const clearAllChats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setChats([]);
  }, []);

  return {
    chats,
    isLoading,
    createChat,
    getChat,
    addMessage,
    updateChatTitle,
    deleteChat,
    clearAllChats,
  };
}
