import type { User } from "@supabase/supabase-js";

import { clearSignupIntent, readSignupIntent } from "@/lib/signup-intent";
import { subscribeUser } from "@/lib/subscribeUser";
import { supabase } from "@/utils/supabase";

/**
 * Records where a signup came from, and honours the daily verse opt-in.
 *
 * Runs once after the OAuth round trip, reading the intent the auth modal
 * stored before redirecting. Everything here is best effort: a failure must
 * never interfere with someone being signed in.
 */
export async function recordSignup(user: User): Promise<void> {
  const intent = readSignupIntent();
  if (!intent) return;

  // Clear first. If one of the writes below throws, we would rather lose a row
  // of attribution than retry it on every page load for the rest of the session.
  clearSignupIntent();

  try {
    // Primary key is user_id, so a returning user who signs in again is
    // ignored rather than overwriting their original source.
    const { error } = await supabase.from("signup_attribution").insert({
      user_id: user.id,
      signup_source: intent.source,
      signup_path: intent.path,
      hit_rate_limit_before_signup: intent.hitRateLimit,
      metadata: {
        referrer: intent.referrer ?? null,
        locale: intent.locale ?? null,
        newsletter_opt_in: intent.newsletterOptIn,
      },
    });

    // 23505 means we already have a row for this user, which is expected on
    // every sign-in after the first.
    if (error && error.code !== "23505") {
      console.warn("[signup] attribution insert failed:", error.message);
    }
  } catch (error) {
    console.warn("[signup] attribution insert threw:", error);
  }

  if (!intent.newsletterOptIn || !user.email) return;

  try {
    const name =
      (user.user_metadata?.full_name as string | undefined)?.trim() ||
      (user.user_metadata?.name as string | undefined)?.trim() ||
      user.email.split("@")[0];

    const result = await subscribeUser(name, user.email, {
      source: "signup_optin",
      locale: intent.locale ?? "en",
      userId: user.id,
    });

    if (!result.ok) {
      console.warn("[signup] newsletter opt-in failed:", result.message);
    }
  } catch (error) {
    console.warn("[signup] newsletter opt-in threw:", error);
  }
}
