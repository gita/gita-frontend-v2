/**
 * Flexible GitaGPT Content Ingestion Script
 * 
 * Supports multiple data sources:
 * - JSON files (Gita verses)
 * - Website pages (scraping)
 * - Custom content
 * 
 * Update modes:
 * - append: Add new content only
 * - replace: Delete matching records, then add new
 * - merge: Update if exists, add if not
 */

import { config } from "dotenv";
import * as path from "path";
config({ path: path.resolve(__dirname, "../.env.local") });

import { gateway } from "@ai-sdk/gateway";
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import * as fs from "fs";

import { DEFAULT_CONFIG, type IngestConfig } from "./ingest-config";
import { processSnippetFolder } from "./snippet-processor";
import {
  addTrainingHistory,
  checkStaleSources,
  displayTrainingStatus,
  getEnabledWebsiteURLs,
  loadTrainingSources,
  saveTrainingSources,
  updateTrainingTimestamp,
} from "./training-tracker";
import { chunkScrapedPage,scrapePages } from "./web-scraper";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Check if content already exists to prevent duplicates
 */
async function checkExistingContent(
  type: "gita" | "website" | "snippet",
  identifier: string
): Promise<boolean> {
  try {
    if (type === "website") {
      const { data } = await supabase
        .from("gita_embeddings")
        .select("id")
        .eq("metadata->>url", identifier)
        .limit(1);
      
      return (data?.length || 0) > 0;
    } else if (type === "snippet") {
      const { data } = await supabase
        .from("gita_embeddings")
        .select("id")
        .eq("metadata->>file_path", identifier)
        .limit(1);
      
      return (data?.length || 0) > 0;
    }
  } catch (error) {
    console.error("Error checking existing content:", error);
  }
  
  return false;
}

/**
 * Delete existing records based on filters
 */
async function deleteExisting(config: IngestConfig): Promise<number> {
  if (config.update_mode === "append" || !config.replace_filters) {
    return 0;
  }

  console.log("\n🗑️  Deleting existing records based on filters...");
  const filters = config.replace_filters;
  const query = supabase.from("gita_embeddings").delete();

  // Build filter conditions
  const conditions: string[] = [];

  if (filters.chapters && filters.chapters.length > 0) {
    // Delete specific chapters
    for (const chapter of filters.chapters) {
      const { error, count } = await supabase
        .from("gita_embeddings")
        .delete({ count: "exact" })
        .eq("metadata->>chapter", String(chapter));
      
      if (!error && count) {
        console.log(`   Deleted ${count} records from Chapter ${chapter}`);
      }
    }
  }

  if (filters.authors && filters.authors.length > 0) {
    for (const authorId of filters.authors) {
      const { error, count } = await supabase
        .from("gita_embeddings")
        .delete({ count: "exact" })
        .eq("metadata->>author_id", String(authorId));
      
      if (!error && count) {
        console.log(`   Deleted ${count} records from Author ${authorId}`);
      }
    }
  }

  if (filters.types && filters.types.length > 0) {
    for (const type of filters.types) {
      const { error, count } = await supabase
        .from("gita_embeddings")
        .delete({ count: "exact" })
        .eq("metadata->>type", type);
      
      if (!error && count) {
        console.log(`   Deleted ${count} records of type "${type}"`);
      }
    }
  }

  if (filters.urls && filters.urls.length > 0) {
    for (const url of filters.urls) {
      const { error, count } = await supabase
        .from("gita_embeddings")
        .delete({ count: "exact" })
        .eq("metadata->>url", url);
      
      if (!error && count) {
        console.log(`   Deleted ${count} records from URL "${url}"`);
      }
    }
  }

  return 0;
}

/**
 * Generate embedding using AI Gateway
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: gateway.textEmbeddingModel("openai/text-embedding-3-small"),
    value: text,
  });
  return embedding;
}

/**
 * Process website pages
 */
async function processWebsitePages(
  config: IngestConfig,
  trainingSources?: any
): Promise<any[]> {
  if (!config.sources.website_pages.enabled) {
    return [];
  }

  console.log("\n🌐 Processing website pages...");
  
  // Get URLs from training-sources.json if available
  let urls = config.sources.website_pages.urls;
  if (trainingSources) {
    urls = getEnabledWebsiteURLs(trainingSources);
    console.log(`   Loaded ${urls.length} URLs from training-sources.json`);
  }
  
  const { selectors } = config.sources.website_pages;

  const pages = await scrapePages(urls, selectors, 1000);
  console.log(`   Scraped ${pages.length}/${urls.length} pages successfully`);

  const chunks: any[] = [];

  for (const page of pages) {
    const pageChunks = chunkScrapedPage(
      page,
      config.chunking.optimal_size,
      config.chunking.max_size,
      config.chunking.overlap
    );

    chunks.push(...pageChunks);
    console.log(`   ${page.title}: ${pageChunks.length} chunk(s)`);
  }

  return chunks;
}

/**
 * Main ingestion function
 */
async function ingest(config: IngestConfig = DEFAULT_CONFIG) {
  console.log("═".repeat(80));
  console.log("🕉️  GitaGPT Flexible Content Ingestion");
  console.log("═".repeat(80));

  // Load training sources and display status
  let trainingSources;
  try {
    trainingSources = loadTrainingSources();
    displayTrainingStatus(trainingSources);
    checkStaleSources(trainingSources);
  } catch (error) {
    console.log("\n⚠️  training-sources.json not found, using config only\n");
  }

  console.log("\n📋 Configuration:");
  console.log(`   Update Mode: ${config.update_mode}`);
  console.log(`   Gita JSON: ${config.sources.gita_json.enabled ? '✅' : '❌'}`);
  console.log(`   Website Pages: ${config.sources.website_pages.enabled ? '✅' : '❌'}`);
  console.log(`   Custom Content: ${config.sources.custom_content.enabled ? '✅' : '❌'}`);

  // Step 1: Check what's already in database
  console.log("\n🔍 Checking existing content...");
  const { data: existingRecords } = await supabase
    .from("gita_embeddings")
    .select("metadata");

  const existingUrls = new Set(
    existingRecords
      ?.filter((r) => r.metadata?.url)
      .map((r) => r.metadata.url) || []
  );
  const existingSnippets = new Set(
    existingRecords
      ?.filter((r) => r.metadata?.type === "custom_snippet")
      .map((r) => r.metadata.snippet_id) || []
  );

  console.log(`   Found ${existingUrls.size} existing website pages`);
  console.log(`   Found ${existingSnippets.size} existing custom snippets`);

  // Step 2: Delete existing if needed (replace mode)
  const deletedCount = await deleteExisting(config);

  const allRecords: any[] = [];
  let addedCount = 0;
  const updatedCount = 0;
  let skippedCount = 0;

  // Step 2: Process Gita JSON (if enabled)
  if (config.sources.gita_json.enabled) {
    console.log("\n📖 Processing Gita JSON files...");
    // Import and use existing processMukundanandaEnglish function
    // (This would require refactoring the existing ingest-gita-content.ts)
    console.log("   ⚠️  Using existing ingest-gita-content.ts for now");
    console.log("   💡 Run: npm run ingest:gita");
  }

  // Step 3: Process website pages (if enabled)
  if (config.sources.website_pages.enabled) {
    const webChunks = await processWebsitePages(config, trainingSources);
    console.log(`   Total chunks created: ${webChunks.length}`);
    
    // Check for duplicates if in append mode
    if (config.update_mode === "append") {
      console.log(`\n   🔍 Checking for duplicates...`);
      const uniqueUrls = new Set<string>();
      const newChunks = [];
      
      for (const chunk of webChunks) {
        const url = chunk.metadata.url;
        if (!uniqueUrls.has(url)) {
          const exists = await checkExistingContent("website", url);
          if (!exists) {
            newChunks.push(chunk);
            uniqueUrls.add(url);
          } else {
            console.log(`   ⏭️  Skipping ${url} (already trained)`);
          }
        }
      }
      
      console.log(`   ✅ ${newChunks.length}/${webChunks.length} new chunks (skipped ${webChunks.length - newChunks.length} duplicates)`);
      allRecords.push(...newChunks);
      addedCount += newChunks.length;
    } else {
      allRecords.push(...webChunks);
      addedCount += webChunks.length;
    }
  }

  // Step 4: Process custom snippets (if enabled)
  if (config.sources.custom_content.enabled) {
    console.log("\n📄 Processing custom snippets...");
    
    const { processSnippetDirectory, chunkSnippet } = await import("./snippet-processor");
    const snippetsDir = trainingSources?.sources.custom_snippets?.snippets_directory || path.join(__dirname, "..", "data", "snippets");
    
    const rawSnippets = processSnippetDirectory(snippetsDir);
    
    // Filter out already-trained snippets
    const newSnippets = rawSnippets.filter(s => !existingSnippets.has(s.metadata.snippet_id));
    
    if (rawSnippets.length > newSnippets.length) {
      skippedCount += rawSnippets.length - newSnippets.length;
      console.log(`   ⏭️  Skipped ${rawSnippets.length - newSnippets.length} already-trained snippets`);
    }
    
    // Chunk large snippets
    const allSnippetChunks: any[] = [];
    for (const snippet of newSnippets) {
      const chunks = chunkSnippet(snippet);
      allSnippetChunks.push(...chunks);
    }
    
    console.log(`   Total snippet chunks: ${allSnippetChunks.length}`);
    allRecords.push(...allSnippetChunks);
    addedCount += allSnippetChunks.length;
  }

  // Step 5: Generate embeddings and insert
  if (allRecords.length > 0) {
    console.log(`\n🔢 Generating embeddings for ${allRecords.length} records...`);

    for (let i = 0; i < allRecords.length; i += config.batch_size) {
      const batch = allRecords.slice(i, i + config.batch_size);
      
      const embeddingsBatch = await Promise.all(
        batch.map(async (record) => ({
          content: record.content,
          embedding: await generateEmbedding(record.content),
          metadata: record.metadata,
        }))
      );

      const { error } = await supabase
        .from("gita_embeddings")
        .insert(embeddingsBatch);

      if (error) {
        console.error(`   ❌ Error batch ${i / config.batch_size + 1}:`, error);
      } else {
        console.log(`   ✅ Batch ${i / config.batch_size + 1}: ${i + batch.length}/${allRecords.length}`);
      }

      // Delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, config.delay_ms));
    }
  }

  console.log("\n═".repeat(80));
  console.log("✅ Ingestion Complete!");
  console.log(`   New records added: ${addedCount}`);
  console.log(`   Records skipped (already trained): ${skippedCount}`);
  console.log(`   Total processed: ${allRecords.length}`);
  console.log("═".repeat(80));

  // Update training sources with timestamps and history
  if (trainingSources) {
    console.log("\n📝 Updating training tracker...");

    // Update timestamps
    if (config.sources.gita_json.enabled) {
      trainingSources = updateTrainingTimestamp(trainingSources, "gita_json");
    }

    if (config.sources.website_pages.enabled && trainingSources) {
      // Update batch training timestamp
      if (!trainingSources.sources.website_pages.training_metadata) {
        trainingSources.sources.website_pages.training_metadata = {
          last_batch_trained: null,
          total_pages_trained: 0,
        };
      }
      trainingSources.sources.website_pages.training_metadata.last_batch_trained = new Date().toISOString();
      trainingSources.sources.website_pages.training_metadata.total_pages_trained = 
        trainingSources.sources.website_pages.urls.length;
    }

    // Add to history
    trainingSources = addTrainingHistory(trainingSources, {
      source_type: config.sources.gita_json.enabled
        ? "gita_json"
        : config.sources.website_pages.enabled
        ? "website"
        : "custom",
      records_added: addedCount,
      records_updated: updatedCount,
      records_deleted: deletedCount,
      details: {
        update_mode: config.update_mode,
        gita_enabled: config.sources.gita_json.enabled,
        website_enabled: config.sources.website_pages.enabled,
      },
    });

    // Save updated config
    saveTrainingSources(trainingSources);
    console.log("   ✅ Training tracker updated");
  }

  console.log();
}

// Run with default config
if (require.main === module) {
  ingest().catch(console.error);
}

export { ingest };

