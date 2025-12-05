/**
 * Reset GitaGPT Rate Limits
 *
 * Usage:
 *   npx tsx scripts/reset-ratelimit.ts              # Reset all rate limits
 *   npx tsx scripts/reset-ratelimit.ts flush        # ⚠️ FLUSH entire Redis (most reliable)
 *   npx tsx scripts/reset-ratelimit.ts anon         # Reset anonymous only
 *   npx tsx scripts/reset-ratelimit.ts auth         # Reset authenticated only
 *   npx tsx scripts/reset-ratelimit.ts 127.0.0.1    # Reset specific IP
 *   npx tsx scripts/reset-ratelimit.ts user-uuid    # Reset specific user ID
 */

import { Redis } from "@upstash/redis";
import { config } from "dotenv";

// Load .env.local (Next.js convention)
config({ path: ".env.local" });

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error("❌ Missing Redis environment variables!");
  console.error(
    "   Required: KV_REST_API_URL and KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*)",
  );
  console.error("   Make sure these are set in your .env.local file");
  process.exit(1);
}

const redis = new Redis({ url, token });

async function deleteKeysByPattern(pattern: string): Promise<number> {
  let cursor = 0;
  let deletedCount = 0;

  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: pattern,
      count: 100,
    });
    cursor = Number(nextCursor);

    if (keys.length > 0) {
      await redis.del(...keys);
      deletedCount += keys.length;
      console.log(`  Deleted: ${keys.join(", ")}`);
    }
  } while (cursor !== 0);

  return deletedCount;
}

async function resetRateLimits(target?: string) {
  console.log("\n🔄 GitaGPT Rate Limit Reset\n");

  try {
    let totalDeleted = 0;

    if (target === "flush") {
      // Nuclear option - flush entire Redis database
      console.log("⚠️  FLUSHING entire Redis database...\n");
      await redis.flushall();
      console.log("✅ Redis flushed successfully!");
      console.log(
        "\n💡 Tip: Restart your dev server to clear in-memory cache.",
      );
      return;
    } else if (!target || target === "all") {
      // Reset all rate limits
      console.log("Resetting ALL rate limits...\n");

      console.log("Anonymous limits (gitagpt:anon:*):");
      totalDeleted += await deleteKeysByPattern("gitagpt:anon:*");

      console.log("\nAuthenticated limits (gitagpt:auth:*):");
      totalDeleted += await deleteKeysByPattern("gitagpt:auth:*");
    } else if (target === "anon") {
      console.log("Resetting anonymous rate limits...\n");
      totalDeleted = await deleteKeysByPattern("gitagpt:anon:*");
    } else if (target === "auth") {
      console.log("Resetting authenticated rate limits...\n");
      totalDeleted = await deleteKeysByPattern("gitagpt:auth:*");
    } else {
      // Specific identifier (IP or user ID)
      console.log(`Resetting rate limit for: ${target}\n`);

      // Try both prefixes
      const anonDeleted = await deleteKeysByPattern(`gitagpt:anon:${target}*`);
      const authDeleted = await deleteKeysByPattern(`gitagpt:auth:${target}*`);
      totalDeleted = anonDeleted + authDeleted;
    }

    if (totalDeleted === 0) {
      console.log("\n⚠️  No rate limit keys found to delete.");
      console.log(
        "💡 Tip: Try 'npx tsx scripts/reset-ratelimit.ts flush' for a complete reset.",
      );
    } else {
      console.log(
        `\n✅ Successfully deleted ${totalDeleted} rate limit key(s).`,
      );
    }

    console.log("\n💡 Tip: Restart your dev server to clear in-memory cache.");
  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

// Run with command line argument
const target = process.argv[2];
resetRateLimits(target);
