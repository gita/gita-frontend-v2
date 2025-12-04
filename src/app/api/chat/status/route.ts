import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

import { getRateLimitHeaders, getRateLimitStatus } from "@/lib/ratelimit";

/**
 * GET /api/chat/status
 * 
 * Returns the current rate limit status WITHOUT consuming a credit.
 * Used to proactively show rate limit warnings on the main page.
 * 
 * Response:
 * {
 *   remaining: number,    // Messages left today
 *   limit: number,        // Total daily limit (2 for anon, 10 for auth)
 *   reset: string,        // ISO timestamp when limit resets
 *   isLimited: boolean,   // true if no messages remaining
 *   isAuthenticated: boolean
 * }
 */
export async function GET() {
  try {
    // Check if rate limiting is disabled in development
    const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";
    
    if (isDevelopment) {
      return Response.json({
        remaining: 999,
        limit: 999,
        reset: new Date(Date.now() + 86400000).toISOString(),
        isLimited: false,
        isAuthenticated: false,
        isDevelopment: true,
      });
    }

    // Get request headers for IP and auth
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "unknown";
    const authHeader = headersList.get("authorization");

    // Check if user is authenticated
    let userId: string | null = null;
    let isAuthenticated = false;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Use service role key for server-side auth validation
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (authHeader?.startsWith("Bearer ") && supabaseUrl && supabaseServiceKey) {
      const token = authHeader.substring(7);
      // Service role client can validate any user's token
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      try {
        const { data: { user } } = await supabase.auth.getUser(token);

        if (user) {
          userId = user.id;
          isAuthenticated = true;
        }
      } catch {
        // Token validation failed - treat as anonymous
      }
    }

    // Get rate limit status (without consuming)
    const identifier = isAuthenticated && userId ? userId : ip;
    const status = await getRateLimitStatus(identifier, isAuthenticated);

    return Response.json(
      {
        remaining: status.remaining,
        limit: status.limit,
        reset: status.reset.toISOString(),
        isLimited: status.isLimited,
        isAuthenticated,
      },
      {
        headers: getRateLimitHeaders(status),
      }
    );
  } catch (error) {
    console.error("Rate limit status API error:", error);
    
    // Return safe defaults on error
    return Response.json(
      {
        remaining: 2,
        limit: 2,
        reset: new Date(Date.now() + 86400000).toISOString(),
        isLimited: false,
        isAuthenticated: false,
        error: "Failed to check rate limit status",
      },
      { status: 500 }
    );
  }
}

