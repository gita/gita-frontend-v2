import { config } from "dotenv";
import * as path from "path";

// Load environment variables before any other imports
config({ path: path.resolve(process.cwd(), ".env.local") });

import { gateway } from "@ai-sdk/gateway";
import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import * as fs from "fs";

import { DATA_PATH } from "./ingest-config";

// Configuration
const BATCH_SIZE = 10; // Number of embeddings to process at once
const EMBEDDING_MODEL = "text-embedding-3-small";

// Test mode settings - set to false for full ingestion
const TEST_MODE = true;
const TEST_AUTHOR_ID = 22; // Swami Mukundananda
const TEST_MAX_VERSES = null; // Process ALL verses (null = no limit)
const TEST_MAX_CHAPTERS = 18; // Process ALL 18 chapters

// Chunking strategy based on research best practices:
// - text-embedding-3-small has 8191 token limit
// - 1 token ≈ 4 characters in English (conservative estimate)
// - Optimal chunk size: 512-1024 tokens for retrieval quality
// - We use 3000 chars ≈ 750 tokens (optimal range)
// - Max safe limit: 6000 chars ≈ 1500 tokens (well below 8191)
const OPTIMAL_CHUNK_CHARS = 3000; // Optimal for retrieval quality (~750 tokens)
const MAX_CHUNK_CHARS = 6000; // Maximum safe chunk size (~1500 tokens)
const CHUNK_OVERLAP_CHARS = 200; // 10% overlap for context preservation

// Types
interface VerseCommon {
  verse_number: string;
  sanskrit_text: string;
  transliteration: string;
  word_meanings: string[];
  sanskrit_audio?: string;
}

interface ChapterCommon {
  chapter_number: string;
  verses: VerseCommon[];
}

interface CommonData {
  language_code: string;
  chapters: ChapterCommon[];
}

interface AuthorData {
  author_id: number;
  author_name: string;
  language_code: string;
  chapters: ChapterData[];
}

interface ChapterData {
  chapter_number: number;
  verses: VerseData[];
}

interface VerseData {
  verse_number: string;
  translation?: string;
  commentary?: string | null;
}

interface EmbeddingRecord {
  content: string;
  metadata: {
    chapter: number;
    verse: string;
    author: string;
    author_id: number;
    type: "verse_complete" | "chapter_info" | "page_content"; // Content type
    language: string;
    // Chunking metadata for reassembly
    chunk_index?: number; // 0-based index if content was chunked
    total_chunks?: number; // Total number of chunks for this verse
    is_chunked?: boolean; // True if this is part of a multi-chunk verse
  };
}

// Initialize clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

/**
 * Generate embedding for text using Vercel AI Gateway
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: gateway.textEmbeddingModel(`openai/${EMBEDDING_MODEL}`),
    value: text,
  });
  return embedding;
}

/**
 * Advanced text chunking with overlap for better context preservation
 * Based on research best practices for RAG systems
 */
function chunkText(text: string): string[] {
  // If text fits in optimal size, return as single chunk
  if (text.length <= OPTIMAL_CHUNK_CHARS) {
    return [text];
  }

  const chunks: string[] = [];

  // Split by sentences (English, Hindi, Sanskrit)
  const sentences = text.split(/(?<=[.!?।॥])\s+/);

  let currentChunk = "";
  let overlapBuffer = ""; // Store last sentences for overlap

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const potentialChunk = currentChunk + (currentChunk ? " " : "") + sentence;

    // Check if adding this sentence would exceed optimal size
    if (potentialChunk.length > OPTIMAL_CHUNK_CHARS && currentChunk) {
      // Check if current chunk would exceed MAX_CHUNK_CHARS
      if (currentChunk.length > MAX_CHUNK_CHARS) {
        console.warn(
          `Warning: Chunk exceeds MAX_CHUNK_CHARS (${currentChunk.length} chars). Consider reducing OPTIMAL_CHUNK_CHARS.`,
        );
      }

      chunks.push(currentChunk.trim());

      // Create overlap: take last ~200 chars from current chunk
      const overlapStart = Math.max(
        0,
        currentChunk.length - CHUNK_OVERLAP_CHARS,
      );
      overlapBuffer = currentChunk.substring(overlapStart).trim();

      // Start new chunk with overlap
      currentChunk = overlapBuffer + " " + sentence;
    } else {
      currentChunk = potentialChunk;
    }
  }

  // Add final chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Format word meanings into readable text
 */
function formatWordMeanings(wordMeanings: string[]): string {
  return wordMeanings.join("\n");
}

/**
 * Build comprehensive verse content (like Chatbase chunks)
 */
function buildVerseContent(
  chapterNum: number,
  verseNum: string,
  authorName: string,
  common?: VerseCommon,
  translation?: string,
  commentary?: string | null,
): string {
  let content = `# BG ${chapterNum}.${verseNum}\n\n`;

  // Sanskrit text
  if (common?.sanskrit_text) {
    content += `${common.sanskrit_text}\n\n`;
  }

  // Transliteration
  if (common?.transliteration) {
    content += `${common.transliteration}\n\n`;
  }

  // Word meanings
  if (common?.word_meanings && common.word_meanings.length > 0) {
    content += `${formatWordMeanings(common.word_meanings)}\n\n`;
  }

  // Translation
  if (translation) {
    content += `## Translation by ${authorName}\n${translation}\n\n`;
  }

  // Commentary (chunk if too long)
  if (commentary && commentary.trim()) {
    content += `## Commentary by ${authorName}\n${commentary}`;
  }

  return content.trim();
}

/**
 * Process Swami Mukundananda's English version with common data
 */
async function processMukundanandaEnglish(
  authorFilePath: string,
  commonFilePath: string,
): Promise<EmbeddingRecord[]> {
  const records: EmbeddingRecord[] = [];

  try {
    const authorData = JSON.parse(
      fs.readFileSync(authorFilePath, "utf-8"),
    ) as AuthorData;
    const commonData = JSON.parse(
      fs.readFileSync(commonFilePath, "utf-8"),
    ) as CommonData;

    console.log(
      `  Processing: ${authorData.author_name} (ID: ${authorData.author_id}) with common data [${authorData.language_code}]`,
    );

    for (const chapter of authorData.chapters) {
      // Skip chapters beyond test limit in TEST_MODE
      if (TEST_MODE && chapter.chapter_number > TEST_MAX_CHAPTERS) {
        continue;
      }

      // Find corresponding chapter in common data
      const commonChapter = commonData.chapters.find(
        (c) => parseInt(c.chapter_number) === chapter.chapter_number,
      );

      for (const verse of chapter.verses) {
        // Skip verses beyond test limit in TEST_MODE (only if limit is set)
        if (
          TEST_MODE &&
          TEST_MAX_VERSES !== null &&
          parseInt(verse.verse_number) > TEST_MAX_VERSES
        ) {
          continue;
        }

        // Find corresponding verse in common data
        const commonVerse = commonChapter?.verses.find(
          (v) => v.verse_number === verse.verse_number,
        );

        // Build comprehensive content
        const fullContent = buildVerseContent(
          chapter.chapter_number,
          verse.verse_number,
          authorData.author_name,
          commonVerse,
          verse.translation,
          verse.commentary,
        );

        // Chunk if necessary using smart chunking with overlap
        const chunks = chunkText(fullContent);
        const isChunked = chunks.length > 1;

        for (let i = 0; i < chunks.length; i++) {
          const chunkLabel = isChunked
            ? ` (Part ${i + 1}/${chunks.length})`
            : "";

          records.push({
            content: chunks[i],
            metadata: {
              chapter: chapter.chapter_number,
              verse: verse.verse_number,
              author: authorData.author_name,
              author_id: authorData.author_id,
              type: "verse_complete",
              language: authorData.language_code,
              // Chunking metadata for reassembly during retrieval
              ...(isChunked && {
                is_chunked: true,
                chunk_index: i,
                total_chunks: chunks.length,
              }),
            },
          });

          if (chunkLabel) {
            console.log(
              `    Chapter ${chapter.chapter_number}, Verse ${verse.verse_number}${chunkLabel} (${chunks[i].length} chars)`,
            );
          }
        }
      }
    }
  } catch (error) {
    console.error(`  Error processing files:`, error);
  }

  return records;
}

/**
 * Index chapter information for better context
 */
async function indexChapterInfo(): Promise<EmbeddingRecord[]> {
  const records: EmbeddingRecord[] = [];

  try {
    const chaptersFile = path.join(DATA_PATH, "chapters.json");
    if (!fs.existsSync(chaptersFile)) {
      console.warn(
        "  Warning: chapters.json not found. Skipping chapter indexing.",
      );
      return records;
    }

    const chaptersData = JSON.parse(fs.readFileSync(chaptersFile, "utf-8"));

    for (const chapter of chaptersData) {
      if (TEST_MODE && chapter.chapter_number > TEST_MAX_CHAPTERS) {
        continue;
      }

      // Build chapter summary content
      const chapterContent = `
# Chapter ${chapter.chapter_number}: ${chapter.name.en}

${chapter.oneliner?.en || ""}

${chapter.description?.en || ""}

Verses: ${chapter.verses_count}
      `.trim();

      records.push({
        content: chapterContent,
        metadata: {
          chapter: chapter.chapter_number,
          verse: "chapter_summary",
          author: "Chapter Overview",
          author_id: 0,
          type: "chapter_info",
          language: "en",
        },
      });
    }

    console.log(`  Indexed ${records.length} chapter summaries`);
  } catch (error) {
    console.error("  Error indexing chapters:", error);
  }

  return records;
}

/**
 * Clear all existing embeddings from the database.
 */
async function clearExistingEmbeddings() {
  console.log("Clearing existing embeddings...");
  const { error } = await supabase
    .from("gita_embeddings")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) {
    console.error("Error clearing embeddings:", error);
  } else {
    console.log("Existing embeddings cleared.");
  }
}

/**
 * Main ingestion function
 */
async function main() {
  console.log("🔍 Checking environment variables...");
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "AI_GATEWAY_API_KEY",
  ];
  let allEnvVarsSet = true;
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      console.error(`${varName}: ❌ Missing`);
      allEnvVarsSet = false;
    } else {
      console.log(`${varName}: ✅ Set`);
    }
  }

  if (!allEnvVarsSet) {
    console.error("\n❌ Error: Missing required environment variables!");
    console.error("Please ensure your .env.local file contains:");
    requiredEnvVars.forEach((varName) => console.error(`  - ${varName}`));
    process.exit(1);
  }

  console.log("=== GitaGPT Content Ingestion ===");
  if (TEST_MODE) {
    console.log("🧪 TEST MODE ENABLED");
    console.log(`   Author: Swami Mukundananda (ID: ${TEST_AUTHOR_ID})`);
    console.log(`   Language: English`);
    console.log(`   Max verses: ${TEST_MAX_VERSES}`);
    console.log(`   Max chapters: ${TEST_MAX_CHAPTERS}\n`);
  } else {
    console.log();
  }

  // Optional: Clear existing embeddings
  // await clearExistingEmbeddings();

  const allRecords: EmbeddingRecord[] = [];

  // 1. Index Chapter Information
  console.log("\n1️⃣ Indexing chapter information...");
  const chapterRecords = await indexChapterInfo();
  allRecords.push(...chapterRecords);

  // 2. Process Swami Mukundananda English with common data
  console.log("\n2️⃣ Processing Swami Mukundananda English version...");
  const authorFile = path.join(DATA_PATH, "authors", "author_22_en.json");
  const commonFile = path.join(DATA_PATH, "common", "common_en.json");

  if (fs.existsSync(authorFile) && fs.existsSync(commonFile)) {
    const records = await processMukundanandaEnglish(authorFile, commonFile);
    allRecords.push(...records);
  } else {
    console.error("  Error: Required files not found!");
    if (!fs.existsSync(authorFile)) {
      console.error(`    Missing: ${authorFile}`);
    }
    if (!fs.existsSync(commonFile)) {
      console.error(`    Missing: ${commonFile}`);
    }
    process.exit(1);
  }

  // 3. TODO: Index additional pages (website content)
  // This can be expanded to index pages like:
  // - Chapter introductions from the website
  // - Author biographies
  // - Glossary terms
  // - FAQs about the Gita
  console.log(
    "\n3️⃣ Additional page indexing: Not yet implemented (future enhancement)",
  );

  console.log(`\nTotal records to process: ${allRecords.length}`);

  console.log("\nGenerating embeddings and inserting records...");
  for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
    const batch = allRecords.slice(i, i + BATCH_SIZE);
    const embeddingsBatch = await Promise.all(
      batch.map(async (record) => ({
        content: record.content,
        embedding: await generateEmbedding(record.content),
        metadata: record.metadata,
      })),
    );

    const { error } = await supabase
      .from("gita_embeddings")
      .insert(embeddingsBatch);

    if (error) {
      console.error(`  Error inserting batch ${i / BATCH_SIZE + 1}:`, error);
    } else {
      console.log(
        `  Processed batch ${i / BATCH_SIZE + 1}: ${i + batch.length}/${allRecords.length}`,
      );
    }
    // Add a small delay to avoid hitting rate limits
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log("\n=== Ingestion Complete! ===");
}

main().catch(console.error);
