import { createClient } from "@supabase/supabase-js";

export const subscribeUser = async (
  name: string,
  email: string,
): Promise<string | null> => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase configuration");
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("newsletter_subscriptions")
    .insert({
      user_name: name,
      user_email: email,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to subscribe user:", error.message);
    return null;
  }

  return data?.id || null;
};
