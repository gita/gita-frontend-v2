import { createClient } from "@supabase/supabase-js";

// Using the same Supabase project as the Flutter app
const supabaseUrl = "https://qspzsyifzsmddpaqkrlt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey && process.env.NODE_ENV === "development") {
  console.warn("NEXT_PUBLIC_SUPABASE_KEY is not set");
}

export const supabase = createClient(supabaseUrl, supabaseKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce", // Use PKCE flow for better security
    storage:
      typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
