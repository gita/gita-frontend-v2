"use client";

import { useLocalChats } from "./useLocalChats";
import { useSupabaseChats } from "./useSupabaseChats";

import { useAuth } from "@/lib/auth/AuthProvider";

/**
 * Unified chat persistence hook that automatically switches between
 * localStorage (anonymous users) and Supabase (authenticated users)
 */
export function useChatPersistence() {
  const { user } = useAuth();

  const localChats = useLocalChats();
  const supabaseChats = useSupabaseChats(user?.id ?? null);

  // Return the appropriate hook based on authentication status
  if (user) {
    return supabaseChats;
  }

  return localChats;
}
