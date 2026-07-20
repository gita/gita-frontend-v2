import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

import {
  buildDeviceCookie,
  resolveRateLimitIdentity,
} from "@/lib/rate-limit-identity";
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
    const authHeader = headersList.get("authorization");

    // Check if user is authenticated
    let userId: string | null = null;
    let isAuthenticated = false;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // Use service role key for server-side auth validation
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      authHeader?.startsWith("Bearer ") &&
      supabaseUrl &&
      supabaseServiceKey
    ) {
      const token = authHeader.substring(7);
      // Service role client can validate any user's token
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser(token);

        if (authError) {
          console.warn(
            "[Status API] Auth validation failed:",
            authError.message,
          );
        }

        if (user) {
          userId = user.id;
          isAuthenticated = true;
          console.log(
            "[Status API] Authenticated user:",
            userId.substring(0, 8) + "...",
          );
        }
      } catch (error) {
        // Token validation failed - treat as anonymous
        console.warn("[Status API] Token validation error:", error);
      }
    } else {
      // Log why auth check was skipped
      if (!supabaseUrl) {
        console.warn("[Status API] Missing NEXT_PUBLIC_SUPABASE_URL");
      }
      if (!supabaseServiceKey) {
        console.warn("[Status API] Missing SUPABASE_SERVICE_ROLE_KEY");
      }
      if (authHeader && !authHeader.startsWith("Bearer ")) {
        console.warn("[Status API] Invalid auth header format");
      }
    }

    // Get rate limit status (without consuming). Uses the same identity as
    // /api/chat so the banner and the endpoint can never disagree.
    const identity = await resolveRateLimitIdentity(
      isAuthenticated ? userId : null,
    );
    console.log("[Status API] Rate limit check:", {
      isAuthenticated: identity.isAuthenticated,
      source: identity.source,
      limit: identity.isAuthenticated ? 10 : 2,
    });
    const status = await getRateLimitStatus(
      identity.identifier,
      identity.isAuthenticated,
    );

    const responseHeaders = new Headers(
      getRateLimitHeaders(status) as Record<string, string>,
    );
    if (identity.deviceIdToSet) {
      responseHeaders.append(
        "Set-Cookie",
        buildDeviceCookie(identity.deviceIdToSet),
      );
    }

    return Response.json(
      {
        remaining: status.remaining,
        limit: status.limit,
        reset: status.reset.toISOString(),
        isLimited: status.isLimited,
        isAuthenticated: identity.isAuthenticated,
      },
      { headers: responseHeaders },
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
      { status: 500 },
    );
  }
}
