import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iqmehipbrplfcmvdzlwx.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const options =
  typeof window === "undefined" ? { auth: { persistSession: false } } : {};
export const supabase = createClient(supabaseUrl, supabaseKey || "", options);
