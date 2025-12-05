"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/lib/auth/AuthProvider";

// Custom event name for rate limit refresh
const RATE_LIMIT_REFRESH_EVENT = "ratelimit:refresh";

interface RateLimitStatus {
  remaining: number;
  limit: number;
  reset: string;
  isLimited: boolean;
  isAuthenticated: boolean;
  isDevelopment?: boolean;
}

/**
 * Dispatch event to refresh rate limit status across all components
 */
export function triggerRateLimitRefresh() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(RATE_LIMIT_REFRESH_EVENT));
  }
}

/**
 * Hook to fetch and manage rate limit status
 * Fetches status on mount, when auth state changes, and when refresh event is triggered
 */
export function useRateLimitStatus() {
  const { session } = useAuth();
  const [status, setStatus] = useState<RateLimitStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Include auth header with access_token for proper authentication
      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("/api/chat/status", {
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to fetch rate limit status");
      }

      const data: RateLimitStatus = await response.json();
      setStatus(data);
    } catch (err) {
      // Don't log abort errors
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Error fetching rate limit status:", err);
      }
      setError(err instanceof Error ? err.message : "Unknown error");
      // Set default status on error - don't block users
      setStatus({
        remaining: 2,
        limit: 2,
        reset: new Date(Date.now() + 86400000).toISOString(),
        isLimited: false,
        isAuthenticated: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, [session?.access_token]);

  // Fetch on mount and when auth state changes
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Listen for refresh events from other components
  useEffect(() => {
    const handleRefresh = () => {
      fetchStatus();
    };

    window.addEventListener(RATE_LIMIT_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(RATE_LIMIT_REFRESH_EVENT, handleRefresh);
    };
  }, [fetchStatus]);

  // Refresh function that also triggers global refresh
  const refresh = useCallback(() => {
    triggerRateLimitRefresh();
  }, []);

  return {
    status,
    isLoading,
    error,
    refresh,
    // Default to not limited to avoid blocking users on first load
    isLimited: status?.isLimited ?? false,
    remaining: status?.remaining ?? 2,
    limit: status?.limit ?? 2,
    resetTime: status?.reset ? new Date(status.reset) : null,
  };
}
