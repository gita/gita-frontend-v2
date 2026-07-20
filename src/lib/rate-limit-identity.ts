import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers";

/**
 * Works out who to rate limit a GitaGPT request against.
 *
 * Both /api/chat and /api/chat/status need this and they must agree, otherwise
 * the banner and the endpoint disagree about whether you have messages left.
 *
 * Anonymous traffic used to be keyed on the caller's IP. That breaks badly on
 * mobile: Indian carriers put very large numbers of subscribers behind a small
 * pool of public addresses (CGNAT), so one phone could open the app for the
 * first time in months and be told it had used its two daily messages, because
 * strangers on the same carrier IP had used them. Anonymous traffic is now
 * keyed on a per-device cookie, with the IP kept only to bootstrap the very
 * first request and as a fallback when cookies are unavailable.
 */

export const DEVICE_COOKIE = "bgAnonId";
const DEVICE_COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // 400 days, the browser cap

export type RateLimitIdentity = {
  /** Key handed to the limiter. */
  identifier: string;
  isAuthenticated: boolean;
  source: "user" | "device" | "ip" | "none";
  /**
   * Set when a new device id was minted and the caller should persist it on the
   * response. Skipped for signed-in users, who are keyed on their user id.
   */
  deviceIdToSet?: string;
};

/**
 * Pull the client IP from the headers a proxy actually controls.
 *
 * `x-forwarded-for` is appended to by the client, so its first entry is
 * attacker-controlled and cannot be trusted on its own. Vercel sets
 * `x-vercel-forwarded-for` and `x-real-ip` itself, so those come first.
 */
function getClientIp(headersList: Headers): string | null {
  const vercelForwarded = headersList.get("x-vercel-forwarded-for");
  if (vercelForwarded) return vercelForwarded.split(",")[0].trim() || null;

  const realIp = headersList.get("x-real-ip");
  if (realIp) return realIp.trim() || null;

  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim() || null;

  return null;
}

export async function resolveRateLimitIdentity(
  userId: string | null,
): Promise<RateLimitIdentity> {
  if (userId) {
    return {
      identifier: `user:${userId}`,
      isAuthenticated: true,
      source: "user",
    };
  }

  const cookieStore = await cookies();
  const existingDeviceId = cookieStore.get(DEVICE_COOKIE)?.value;

  if (existingDeviceId) {
    return {
      identifier: `device:${existingDeviceId}`,
      isAuthenticated: false,
      source: "device",
    };
  }

  // First request from this device. Key on IP so the window is still bounded,
  // and hand back an id to store so later requests get their own bucket.
  const headersList = await headers();
  const ip = getClientIp(headersList);

  const newDeviceId = randomUUID();

  if (!ip) {
    // No usable address and no cookie. Sharing one bucket across every such
    // caller is what caused mass false blocking before, so key on the id we are
    // about to store and let the cookie take over from the next request.
    return {
      identifier: `device:${newDeviceId}`,
      isAuthenticated: false,
      source: "none",
      deviceIdToSet: newDeviceId,
    };
  }

  return {
    identifier: `ip:${ip}`,
    isAuthenticated: false,
    source: "ip",
    deviceIdToSet: newDeviceId,
  };
}

/** Serialised Set-Cookie value for a freshly minted device id. */
export function buildDeviceCookie(deviceId: string): string {
  const attrs = [
    `${DEVICE_COOKIE}=${deviceId}`,
    "Path=/",
    `Max-Age=${DEVICE_COOKIE_MAX_AGE}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (process.env.NODE_ENV === "production") attrs.push("Secure");
  return attrs.join("; ");
}
