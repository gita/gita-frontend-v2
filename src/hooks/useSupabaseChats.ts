"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Chat, ChatMessage } from "./useLocalChats";

import { supabase } from "@/utils/supabase";

// Custom event for syncing Supabase chats across component instances
const SUPABASE_CHATS_SYNC_EVENT = "gitagpt-supabase-chats-updated";

function triggerSupabaseChatSync() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SUPABASE_CHATS_SYNC_EVENT));
  }
}

// Simple write queue to prevent race conditions
// Each chat has its own queue to allow parallel writes to different chats
type WriteOperation = () => Promise<void>;
const writeQueues: Map<string, Promise<void>> = new Map();

async function enqueueWrite(
  chatId: string,
  operation: WriteOperation,
): Promise<void> {
  const currentQueue = writeQueues.get(chatId) || Promise.resolve();
  const newQueue = currentQueue.then(operation).catch(console.error);
  writeQueues.set(chatId, newQueue);
  await newQueue;
}

/**
 * Hook for managing chat history in Supabase for authenticated users
 * Uses the shared Supabase client which has the user's authenticated session
 */
export function useSupabaseChats(userId: string | null) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Track which userId we've fetched for - this allows us to detect
  // when userId changes and we need to refetch
  const fetchedForUserIdRef = useRef<string | null | undefined>(undefined);

  // CRITICAL: Derive loading state synchronously
  // If userId changed since our last fetch, we're loading (even if useEffect hasn't run yet)
  const needsFetch = userId !== null && fetchedForUserIdRef.current !== userId;
  const effectiveIsLoading = isLoading || needsFetch;

  // Load chats from Supabase
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      fetchedForUserIdRef.current = null;
      return;
    }

    // Mark that we're fetching for this userId
    fetchedForUserIdRef.current = userId;
    setIsLoading(true);

    const loadChats = async () => {
      try {
        // Fetch chats with messages JSONB array
        const { data: chatsData, error: chatsError } = await supabase
          .from("chats")
          .select("id, messages, created_at, updated_at")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false });

        if (chatsError) {
          console.error("Error loading chats:", chatsError);
          throw chatsError;
        }

        const formattedChats: Chat[] = (chatsData || []).map((chat: any) => {
          const messagesArray = Array.isArray(chat.messages)
            ? chat.messages
            : [];

          // Generate title from first user message if available
          const firstUserMsg = messagesArray.find(
            (m: any) => m.role === "user",
          );
          const title = firstUserMsg
            ? firstUserMsg.content.slice(0, 50) +
              (firstUserMsg.content.length > 50 ? "..." : "")
            : "New conversation";

          return {
            id: chat.id,
            title,
            createdAt: new Date(chat.created_at),
            updatedAt: new Date(chat.updated_at),
            messages: messagesArray.map((msg: any) => ({
              id: msg.id || crypto.randomUUID(),
              role: msg.role,
              content: msg.content,
              createdAt: msg.created_at ? new Date(msg.created_at) : new Date(),
            })),
          };
        });

        setChats(formattedChats);
      } catch (error) {
        console.error("Error loading chats from Supabase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();

    // Listen for sync events from other component instances
    const handleSync = () => {
      if (userId) {
        loadChats();
      }
    };

    window.addEventListener(SUPABASE_CHATS_SYNC_EVENT, handleSync);
    return () => {
      window.removeEventListener(SUPABASE_CHATS_SYNC_EVENT, handleSync);
    };
  }, [userId]);

  // Create a new chat
  const createChat = useCallback(
    async (title: string = "New conversation") => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      try {
        console.log("[Supabase] Creating chat for userId:", userId);

        // Insert with empty messages array (actual schema has messages as JSONB column)
        const { data, error } = await supabase
          .from("chats")
          .insert({
            user_id: userId,
            messages: [], // Required JSONB column in actual schema
          })
          .select()
          .single();

        console.log("[Supabase] Insert result:", {
          hasData: !!data,
          hasError: !!error,
        });

        if (error) {
          console.error("Supabase insert error:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
            raw: JSON.stringify(error),
          });
          throw error;
        }

        const newChat: Chat = {
          id: data.id,
          title, // Use client-provided title
          messages: [],
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setChats((prev) => [newChat, ...prev]);

        // Trigger sync event so other instances (like sidebar) update
        triggerSupabaseChatSync();

        return newChat;
      } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
      }
    },
    [userId],
  );

  // Get a specific chat by ID
  const getChat = useCallback(
    (chatId: string) => {
      return chats.find((chat) => chat.id === chatId);
    },
    [chats],
  );

  // Add a message to a chat (messages stored as JSONB array)
  // Uses a write queue to prevent race conditions when multiple messages are saved rapidly
  const addMessage = useCallback(
    async (chatId: string, message: Omit<ChatMessage, "id" | "createdAt">) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const newMessage = {
        id: crypto.randomUUID(),
        role: message.role,
        content: message.content,
        created_at: new Date().toISOString(),
      };

      // Enqueue the write operation to ensure sequential execution per chat
      await enqueueWrite(chatId, async () => {
        console.log("[Supabase] Adding message to chat:", {
          chatId,
          role: message.role,
          content: message.content.substring(0, 50),
        });

        // Fetch the LATEST messages from DB (inside queue to ensure freshness)
        const { data: currentChat, error: fetchError } = await supabase
          .from("chats")
          .select("messages")
          .eq("id", chatId)
          .eq("user_id", userId)
          .single();

        if (fetchError) {
          console.error("[Supabase] Error fetching current chat:", fetchError);
          throw fetchError;
        }

        const currentMessages = Array.isArray(currentChat?.messages)
          ? currentChat.messages
          : [];
        console.log(
          "[Supabase] Current messages count:",
          currentMessages.length,
        );

        // Append new message to messages array
        const updatedMessagesArray = [...currentMessages, newMessage];
        console.log(
          "[Supabase] Updating with messages count:",
          updatedMessagesArray.length,
        );

        const { error: updateError } = await supabase
          .from("chats")
          .update({
            messages: updatedMessagesArray,
            updated_at: new Date().toISOString(),
          })
          .eq("id", chatId)
          .eq("user_id", userId);

        if (updateError) {
          console.error(
            "[Supabase] Error updating chat with message:",
            updateError,
          );
          throw updateError;
        }

        console.log("[Supabase] Message saved successfully");
      });

      // Update local state (after queue completes)
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === chatId) {
            const formattedMessage: ChatMessage = {
              id: newMessage.id,
              role: newMessage.role as "user" | "assistant",
              content: newMessage.content,
              createdAt: new Date(newMessage.created_at),
            };
            return {
              ...chat,
              messages: [...chat.messages, formattedMessage],
              updatedAt: new Date(),
            };
          }
          return chat;
        }),
      );

      // Trigger sync event so other instances update
      triggerSupabaseChatSync();
    },
    [userId],
  );

  // Update chat title (local state only - DB schema doesn't have title column)
  const updateChatTitle = useCallback((chatId: string, title: string) => {
    // Just update local state - title is generated client-side from first message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title, updatedAt: new Date() } : chat,
      ),
    );
  }, []);

  // Delete a chat
  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      try {
        const { error } = await supabase
          .from("chats")
          .delete()
          .eq("id", chatId)
          .eq("user_id", userId);

        if (error) throw error;

        setChats((prev) => prev.filter((chat) => chat.id !== chatId));

        // Trigger sync event
        triggerSupabaseChatSync();
      } catch (error) {
        console.error("Error deleting chat:", error);
        throw error;
      }
    },
    [userId],
  );

  // Clear all chats
  const clearAllChats = useCallback(async () => {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    try {
      const { error } = await supabase
        .from("chats")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;

      setChats([]);

      // Trigger sync event
      triggerSupabaseChatSync();
    } catch (error) {
      console.error("Error clearing all chats:", error);
      throw error;
    }
  }, [userId]);

  return {
    chats,
    isLoading: effectiveIsLoading,
    createChat,
    getChat,
    addMessage,
    updateChatTitle,
    deleteChat,
    clearAllChats,
  };
}
