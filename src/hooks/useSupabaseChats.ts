"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import type { Chat,ChatMessage } from "./useLocalChats";

/**
 * Hook for managing chat history in Supabase for authenticated users
 */
export function useSupabaseChats(userId: string | null) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase =
    supabaseUrl && supabaseAnonKey
      ? createClient(supabaseUrl, supabaseAnonKey)
      : null;

  // Load chats from Supabase
  useEffect(() => {
    if (!userId || !supabase) {
      setIsLoading(false);
      return;
    }

    const loadChats = async () => {
      try {
        // Fetch chats with their messages
        const { data: chatsData, error: chatsError } = await supabase
          .from("chats")
          .select(
            `
            id,
            title,
            created_at,
            updated_at,
            messages (
              id,
              role,
              content,
              created_at
            )
          `
          )
          .eq("user_id", userId)
          .order("updated_at", { ascending: false });

        if (chatsError) throw chatsError;

        const formattedChats: Chat[] = (chatsData || []).map((chat: any) => ({
          id: chat.id,
          title: chat.title,
          createdAt: new Date(chat.created_at),
          updatedAt: new Date(chat.updated_at),
          messages: (chat.messages || [])
            .map((msg: any) => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
              createdAt: new Date(msg.created_at),
            }))
            .sort(
              (a: ChatMessage, b: ChatMessage) =>
                a.createdAt.getTime() - b.createdAt.getTime()
            ),
        }));

        setChats(formattedChats);
      } catch (error) {
        console.error("Error loading chats from Supabase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, [userId, supabase]);

  // Create a new chat
  const createChat = useCallback(
    async (title: string = "New conversation") => {
      if (!userId || !supabase) {
        throw new Error("User not authenticated");
      }

      try {
        const { data, error } = await supabase
          .from("chats")
          .insert({
            user_id: userId,
            title,
          })
          .select()
          .single();

        if (error) throw error;

        const newChat: Chat = {
          id: data.id,
          title: data.title,
          messages: [],
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at),
        };

        setChats((prev) => [newChat, ...prev]);
        return newChat;
      } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
      }
    },
    [userId, supabase]
  );

  // Get a specific chat by ID
  const getChat = useCallback(
    (chatId: string) => {
      return chats.find((chat) => chat.id === chatId);
    },
    [chats]
  );

  // Add a message to a chat
  const addMessage = useCallback(
    async (
      chatId: string,
      message: Omit<ChatMessage, "id" | "createdAt">
    ) => {
      if (!userId || !supabase) {
        throw new Error("User not authenticated");
      }

      try {
        const { data, error } = await supabase
          .from("messages")
          .insert({
            chat_id: chatId,
            role: message.role,
            content: message.content,
          })
          .select()
          .single();

        if (error) throw error;

        // Update local state
        setChats((prev) =>
          prev.map((chat) => {
            if (chat.id === chatId) {
              const newMessage: ChatMessage = {
                id: data.id,
                role: data.role,
                content: data.content,
                createdAt: new Date(data.created_at),
              };
              return {
                ...chat,
                messages: [...chat.messages, newMessage],
                updatedAt: new Date(),
              };
            }
            return chat;
          })
        );

        // Update chat's updated_at timestamp
        await supabase
          .from("chats")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", chatId);
      } catch (error) {
        console.error("Error adding message:", error);
        throw error;
      }
    },
    [userId, supabase]
  );

  // Update chat title
  const updateChatTitle = useCallback(
    async (chatId: string, title: string) => {
      if (!userId || !supabase) {
        throw new Error("User not authenticated");
      }

      try {
        const { error } = await supabase
          .from("chats")
          .update({ title, updated_at: new Date().toISOString() })
          .eq("id", chatId)
          .eq("user_id", userId);

        if (error) throw error;

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === chatId
              ? { ...chat, title, updatedAt: new Date() }
              : chat
          )
        );
      } catch (error) {
        console.error("Error updating chat title:", error);
        throw error;
      }
    },
    [userId, supabase]
  );

  // Delete a chat
  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!userId || !supabase) {
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
      } catch (error) {
        console.error("Error deleting chat:", error);
        throw error;
      }
    },
    [userId, supabase]
  );

  // Clear all chats
  const clearAllChats = useCallback(async () => {
    if (!userId || !supabase) {
      throw new Error("User not authenticated");
    }

    try {
      const { error } = await supabase
        .from("chats")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;

      setChats([]);
    } catch (error) {
      console.error("Error clearing all chats:", error);
      throw error;
    }
  }, [userId, supabase]);

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

