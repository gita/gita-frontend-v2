import { supabase } from "@/utils/supabase";

export type SubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; reason: "invalid" | "failed"; message: string };

/**
 * Adds someone to the daily verse list.
 *
 * This used to swallow every failure and return null, which meant the caller
 * could not tell a successful write from a broken one. It had two faults at the
 * same time: it read NEXT_PUBLIC_SUPABASE_ANON_KEY, which has never existed in
 * this project (the key is NEXT_PUBLIC_SUPABASE_KEY), so it bailed out before
 * reaching the database; and the newsletter_subscriptions table did not exist.
 * Because the error was swallowed, the form kept showing a success modal and
 * nothing was ever stored.
 *
 * It now returns a result the caller must look at.
 */
export const subscribeUser = async (
  name: string,
  email: string,
  options: { source?: string; locale?: string; userId?: string | null } = {},
): Promise<SubscribeResult> => {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName || !trimmedEmail) {
    return {
      ok: false,
      reason: "invalid",
      message: "Please enter both your name and email.",
    };
  }

  // Deliberately no .select() chained on. Anonymous callers can insert but
  // cannot read this table, and PostgREST needs SELECT permission to return the
  // inserted row, so asking for it back fails the whole write with 42501. The
  // id was never used by the caller anyway.
  const { error } = await supabase.from("newsletter_subscriptions").insert({
    user_name: trimmedName,
    user_email: trimmedEmail,
    source: options.source ?? "homepage_form",
    locale: options.locale ?? "en",
    user_id: options.userId ?? null,
  });

  if (error) {
    // 23505 is a unique violation, meaning this address is already on the list.
    // That is not a failure from the reader's point of view.
    if (error.code === "23505") {
      return { ok: true, alreadySubscribed: true };
    }

    console.error("[newsletter] subscribe failed:", error.code, error.message);
    return {
      ok: false,
      reason: "failed",
      message: "Something went wrong. Please try again in a moment.",
    };
  }

  return { ok: true, alreadySubscribed: false };
};
