import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting for GitaGPT chat
 * - Anonymous users: 2 messages per day (by IP)
 * - Authenticated users: 10 messages per day (by user ID)
 */

// Lazy initialization of rate limiters
let anonRateLimitInstance: Ratelimit | null = null;
let authRateLimitInstance: Ratelimit | null = null;

function getRedis(): Redis {
  // Vercel KV uses KV_REST_API_* naming convention
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis environment variables (KV_REST_API_URL and KV_REST_API_TOKEN)");
  }

  return new Redis({ url, token });
}

/**
 * Rate limit for anonymous users (2 messages per day)
 * Identified by IP address
 */
export function getAnonRateLimit(): Ratelimit {
  if (!anonRateLimitInstance) {
    anonRateLimitInstance = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.fixedWindow(2, "1 d"),
      prefix: "gitagpt:anon",
      analytics: true,
    });
  }
  return anonRateLimitInstance;
}

/**
 * Rate limit for authenticated users (10 messages per day)
 * Identified by user ID
 */
export function getAuthRateLimit(): Ratelimit {
  if (!authRateLimitInstance) {
    authRateLimitInstance = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.fixedWindow(10, "1 d"),
      prefix: "gitagpt:auth",
      analytics: true,
    });
  }
  return authRateLimitInstance;
}

/**
 * Check rate limit for a user
 * @param identifier - IP address for anon, user ID for authenticated
 * @param isAuthenticated - Whether the user is logged in
 * @returns Object with success status and remaining messages
 */
export async function checkRateLimit(
  identifier: string,
  isAuthenticated: boolean
): Promise<{
  success: boolean;
  remaining: number;
  limit: number;
  reset: Date;
}> {
  try {
    const ratelimit = isAuthenticated ? getAuthRateLimit() : getAnonRateLimit();
    const result = await ratelimit.limit(identifier);

    return {
      success: result.success,
      remaining: result.remaining,
      limit: isAuthenticated ? 10 : 2,
      reset: new Date(result.reset),
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // If rate limiting fails, allow the request but log the error
    return {
      success: true,
      remaining: isAuthenticated ? 10 : 2,
      limit: isAuthenticated ? 10 : 2,
      reset: new Date(Date.now() + 86400000), // 24 hours from now
    };
  }
}

/**
 * Get rate limit headers for API response
 */
export function getRateLimitHeaders(result: {
  remaining: number;
  limit: number;
  reset: Date;
}): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toISOString(),
  };
}

/**
 * Get current rate limit status WITHOUT consuming a credit
 * Use this for proactive rate limit display on the main page
 * @param identifier - IP address for anon, user ID for authenticated
 * @param isAuthenticated - Whether the user is logged in
 * @returns Object with remaining messages and reset time
 */
export async function getRateLimitStatus(
  identifier: string,
  isAuthenticated: boolean
): Promise<{
  remaining: number;
  limit: number;
  reset: Date;
  isLimited: boolean;
}> {
  const limit = isAuthenticated ? 10 : 2;
  
  try {
    const ratelimit = isAuthenticated ? getAuthRateLimit() : getAnonRateLimit();
    
    // getRemaining() checks without consuming a credit
    const result = await ratelimit.getRemaining(identifier);
    
    // Ensure remaining is within valid bounds
    const remaining = Math.max(0, Math.min(result.remaining, limit));
    
    return {
      remaining,
      limit,
      reset: new Date(result.reset),
      isLimited: remaining <= 0,
    };
  } catch (error) {
    console.error("Rate limit status check failed:", error);
    // On error, return safe defaults - don't block users
    // Avoid slow Redis operations that could cause timeouts
    return {
      remaining: limit,
      limit,
      reset: new Date(Date.now() + 86400000),
      isLimited: false,
    };
  }
}

