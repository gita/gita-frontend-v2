/**
 * Carries what we know about a signup across the OAuth redirect.
 *
 * Sign-in is Google/Apple only, so the browser leaves the site and comes back.
 * Anything we want to record about why someone signed up has to survive that
 * round trip, which is the same reason `authReturnPath` already exists.
 *
 * Written when the auth modal opens, read once after the session lands, then
 * cleared.
 */

const STORAGE_KEY = "bgSignupIntent";

export type SignupSource =
  | "gitagpt_rate_limit"
  | "gitagpt"
  | "newsletter"
  | "nav"
  | "app_page"
  | "unknown";

export type SignupIntent = {
  source: SignupSource;
  /** Path the signup started from. */
  path: string;
  /** True when the Gita GPT limit banner was on screen at the time. */
  hitRateLimit: boolean;
  /** Whether they ticked the daily verse opt-in. */
  newsletterOptIn: boolean;
  /** Where they arrived from, when the browser tells us. */
  referrer?: string;
  locale?: string;
};

export function storeSignupIntent(
  intent: Omit<SignupIntent, "path" | "referrer">,
): void {
  if (typeof window === "undefined") return;
  try {
    const payload: SignupIntent = {
      ...intent,
      path: window.location.pathname,
      referrer: document.referrer || undefined,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Private browsing or a full quota. Attribution is best effort and must
    // never be the reason a signup fails.
  }
}

export function readSignupIntent(): SignupIntent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SignupIntent;
    if (!parsed || typeof parsed.source !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSignupIntent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing useful to do here.
  }
}
