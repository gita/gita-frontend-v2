/**
 * Ingest or Re-index a specific chapter
 *
 * Usage:
 *   npm run ingest:chapter -- 2       # Re-index Chapter 2
 *   npm run ingest:chapter -- 5       # Re-index Chapter 5
 *
 * This will:
 * 1. Delete all existing records for that chapter
 * 2. Re-ingest from JSON with latest data
 * 3. Useful for updating after commentary changes
 */

import { config } from "dotenv";
import * as path from "path";
config({ path: path.resolve(__dirname, "../.env.local") });

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function reindexChapter() {
  const chapterArg = process.argv[2];

  if (!chapterArg) {
    console.error("❌ Please specify a chapter number:");
    console.error("   npm run ingest:chapter -- 2");
    process.exit(1);
  }

  const chapter = parseInt(chapterArg);

  if (isNaN(chapter) || chapter < 1 || chapter > 18) {
    console.error(`❌ Invalid chapter number: ${chapterArg}`);
    console.error("   Must be between 1 and 18");
    process.exit(1);
  }

  console.log("\n═".repeat(60));
  console.log(`🔄 Re-indexing Chapter ${chapter}`);
  console.log("═".repeat(60));

  // Step 1: Delete existing records for this chapter
  console.log(`\n1️⃣ Deleting existing Chapter ${chapter} records...`);

  const { error: deleteError, count } = await supabase
    .from("gita_embeddings")
    .delete({ count: "exact" })
    .eq("metadata->>chapter", String(chapter));

  if (deleteError) {
    console.error("   ❌ Error deleting:", deleteError);
    process.exit(1);
  }

  console.log(`   ✅ Deleted ${count} existing records`);

  // Step 2: Run main ingestion with this chapter only
  console.log(`\n2️⃣ Ingesting fresh data for Chapter ${chapter}...`);
  console.log("\n   💡 Temporarily update scripts/ingest-gita-content.ts:");
  console.log(`   TEST_MAX_CHAPTERS = ${chapter}`);
  console.log(`   Then run: npm run ingest:gita`);
  console.log(
    "\n   Or use the flexible ingestion system (see ingest-config.ts)\n",
  );

  console.log("═".repeat(60) + "\n");
}

reindexChapter().catch(console.error);
