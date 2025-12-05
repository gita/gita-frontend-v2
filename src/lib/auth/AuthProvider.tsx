"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session, User } from "@supabase/supabase-js";

import { triggerRateLimitRefresh } from "@/hooks/useRateLimitStatus";
import { supabase } from "utils/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Helper to handle post-OAuth redirect
    const handleReturnRedirect = (session: Session | null) => {
      if (!session) return;
      
      const returnPath = localStorage.getItem("authReturnPath");
      if (returnPath && returnPath !== "/" && returnPath !== window.location.pathname) {
        localStorage.removeItem("authReturnPath");
        window.location.href = returnPath;
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("[Auth] Error getting session:", error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Check for return redirect on initial load (handles OAuth callback)
      handleReturnRedirect(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // Handle redirect after OAuth sign-in
      if (event === "SIGNED_IN" && session) {
        handleReturnRedirect(session);
        // Refresh rate limit status with new auth state
        setTimeout(() => triggerRateLimitRefresh(), 100);
      }
      
      // Also refresh when signed out
      if (event === "SIGNED_OUT") {
        triggerRateLimitRefresh();
      }
    });

    // Check for OAuth errors in URL and clean up
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const error = params.get("error");

      if (error) {
        console.error("[Auth] OAuth Error:", error);
        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
      }
    }

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      // Store current path to redirect back after OAuth
      if (typeof window !== "undefined") {
        localStorage.setItem("authReturnPath", window.location.pathname);
      }

      const redirectUrl =
        typeof window !== "undefined" ? window.location.origin : "";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        console.error("[Auth] Google sign-in error:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("[Auth] Sign-in error:", error);
      setIsLoading(false);
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    setIsLoading(true);
    try {
      // Store current path to redirect back after OAuth
      if (typeof window !== "undefined") {
        localStorage.setItem("authReturnPath", window.location.pathname);
      }

      const redirectUrl =
        typeof window !== "undefined" ? window.location.origin : "";

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        console.error("[Auth] Apple sign-in error:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("[Auth] Sign-in error:", error);
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
