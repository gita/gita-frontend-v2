"use client";

import { useLocalChats } from "./useLocalChats";
import { useSupabaseChats } from "./useSupabaseChats";

import { useAuth } from "@/lib/auth/AuthProvider";

/**
 * Unified chat persistence hook that automatically switches between
 * localStorage (anonymous users) and Supabase (authenticated users)
 */
export function useChatPersistence() {
  const { user, isLoading: authLoading } = useAuth();

  const localChats = useLocalChats();
  const supabaseChats = useSupabaseChats(user?.id ?? null);

  // SIMPLE FIX: Always wait for auth to load first
  // This prevents the race condition where we try to load from the wrong persistence
  if (authLoading) {
    return {
      ...(user ? supabaseChats : localChats),
      isLoading: true,
    };
  }

  // After auth is loaded, return the appropriate hook
  if (user) {
    return supabaseChats;
  }

  return localChats;
}
