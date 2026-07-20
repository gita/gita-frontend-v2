/**
 * GitaGPT daily message allowances.
 *
 * Kept in their own module with no dependencies so client components can read
 * them without pulling @upstash/redis into the browser bundle.
 */

/** Messages a day before an anonymous reader is asked to sign in. */
export const ANON_DAILY_LIMIT = 5;

/** Messages a day for a signed-in reader. */
export const AUTH_DAILY_LIMIT = 10;
