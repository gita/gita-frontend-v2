import { gateway } from "@ai-sdk/gateway";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { embed } from "ai";

import { analyzeQuery, getRetrievalCount } from "./query-analysis";
import { jinaRerank,simpleKeywordRerank } from "./reranker";

// Lazy initialization of Supabase client
let supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (supabase) return supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables for RAG retrieval");
  }

  supabase = createClient(supabaseUrl, supabaseServiceKey);
  return supabase;
}

/**
 * Content retrieved from vector search
 */
export interface RetrievedContent {
  id: string;
  content: string;
  metadata: {
    chapter?: number;
    verse?: string;
    author?: string;
    author_id?: number;
    type?: "verse_complete" | "chapter_info" | "page_content";
    language?: string;
    // Chunking metadata for reassembly
    is_chunked?: boolean;
    chunk_index?: number;
    total_chunks?: number;
  };
  similarity: number;
  // Hybrid search scores (optional)
  bm25Score?: number;
  hybridScore?: number;
  // Reranking score (optional)
  rerankScore?: number;
}

/**
 * Generate embedding for a query using Vercel AI Gateway
 * Uses OpenAI text-embedding-3-small via AI Gateway
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const { embedding } = await embed({
    model: gateway.textEmbeddingModel("openai/text-embedding-3-small"),
    value: text,
  });

  return embedding;
}

/**
 * Search for relevant Gita content using vector similarity
 * @param query - User's question
 * @param matchCount - Number of results to return (default 5)
 * @returns Array of relevant content with similarity scores
 */
export async function searchGitaContent(
  query: string,
  matchCount: number = 5,
  useReranking: boolean = true
): Promise<RetrievedContent[]> {
  try {
    const client = getSupabaseClient();

    // Analyze query for adaptive retrieval
    const analysis = analyzeQuery(query);
    console.log(`📊 Query Analysis: ${analysis.complexity}/${analysis.queryType}, threshold=${analysis.similarityThreshold.toFixed(2)}`);

    // Check if query explicitly mentions a verse number (e.g., "verse 1.1", "BG 2.3")
    const chapterVerseMatch = query.match(/(?:verse|bg|BG)\s*(\d+)\.(\d+)/i) || 
                              query.match(/(\d+)\.(\d+)/);
    
    let results: RetrievedContent[] = [];

    if (chapterVerseMatch) {
      // Query mentions specific verse - use metadata filtering
      const chapter = parseInt(chapterVerseMatch[1]);
      const verse = chapterVerseMatch[2];
      
      console.log(`🎯 Metadata filter: Chapter ${chapter}, Verse ${verse}`);
      
      // Query with metadata filter (JSONB operators)
      const { data: filteredData, error: filterError } = await client
        .from("gita_embeddings")
        .select("*")
        .filter("metadata->>chapter", "eq", String(chapter))
        .filter("metadata->>verse", "eq", String(verse));

      if (filterError) {
        console.error("❌ Metadata filter error:", filterError);
        // Fall back to vector search below
      } else if (filteredData && filteredData.length > 0) {
        console.log(`✅ Found ${filteredData.length} exact matches via metadata filter`);
        // Convert to RetrievedContent format with perfect similarity
        const metadataResults = filteredData.map((item: any) => ({
          id: item.id,
          content: item.content,
          metadata: item.metadata,
          similarity: 1.0, // Perfect match via metadata
        }));
        
        // Still log for debugging
        console.log("\n" + "=".repeat(80));
        console.log(`🔍 RAG Query: "${query}"`);
        console.log(`📊 Found ${metadataResults.length} chunks (via metadata filter)`);
        console.log("=".repeat(80) + "\n");
        
        return metadataResults.slice(0, matchCount);
      }
    }

    // If no metadata match or not a specific verse query, use vector search
    const queryEmbedding = await generateEmbedding(query);

    // Retrieve more candidates based on query complexity
    const retrievalCount = useReranking 
      ? getRetrievalCount(analysis.complexity, matchCount)
      : matchCount;

    // Call Supabase RPC function for vector similarity search
    const { data, error } = await client.rpc("match_gita_content", {
      query_embedding: queryEmbedding,
      match_count: retrievalCount,
    });

    if (error) {
      console.error("❌ Error searching Gita content:", error);
      return [];
    }

    results = (data as RetrievedContent[]) || [];

    // Deduplicate based on content+metadata
    const seen = new Set<string>();
    results = results.filter(item => {
      const key = `${item.metadata.chapter}-${item.metadata.verse}-${item.metadata.author_id}-${item.content.substring(0, 100)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Apply reranking if enabled
    if (useReranking && results.length > 0) {
      // Try Jina first (falls back to simple keyword if not configured)
      results = await jinaRerank(query, results, matchCount);
      console.log(`\n🔄 Reranking: Retrieved ${retrievalCount}, deduplicated, returning top ${matchCount}`);
    }

    // Apply similarity threshold filtering (adaptive based on query)
    // BUT: Always keep at least 1 result (for greetings, edge cases)
    const beforeThreshold = results.length;
    const filteredResults = results.filter(r => r.similarity >= analysis.similarityThreshold);
    
    // If threshold removed everything, keep top 2 results anyway
    results = filteredResults.length > 0 ? filteredResults : results.slice(0, 2);
    
    if (results.length < beforeThreshold) {
      console.log(`🎯 Threshold filter: ${beforeThreshold} → ${results.length} (removed ${beforeThreshold - results.length} low-confidence matches)`);
    }

    console.log("\n" + "=".repeat(80));
    console.log(`🔍 RAG Query: "${query}"`);
    console.log(`📊 Found ${results.length} chunks`);
    console.log("=".repeat(80));

    if (results.length > 0) {
      results.forEach((item: any, i: number) => {
        console.log(`\n📚 CHUNK ${i + 1}/${results.length}`);
        console.log(`   Chapter: ${item.metadata?.chapter || "N/A"}`);
        console.log(`   Verse: ${item.metadata?.verse || "N/A"}`);
        console.log(`   Author: ${item.metadata?.author || "N/A"}`);
        console.log(`   Type: ${item.metadata?.type || "N/A"}`);
        console.log(`   Similarity: ${((item.similarity || 0) * 100).toFixed(1)}%`);
        if (item.rerankScore) {
          console.log(`   Rerank Score: ${item.rerankScore.toFixed(2)}`);
        }
        console.log(`   Content Length: ${item.content?.length || 0} chars`);
        console.log("\n   📖 CONTENT:");
        console.log("   " + "-".repeat(76));
        const lines = (item.content || "").split("\n");
        lines.forEach((line: string) => {
          console.log(`   ${line}`);
        });
        console.log("   " + "-".repeat(76));
      });
    }

    console.log("\n" + "=".repeat(80) + "\n");

    return results;
  } catch (error) {
    console.error("❌ Error in searchGitaContent:", error);
    return [];
  }
}

/**
 * Reassemble chunked content from the same verse
 * Groups chunks by (chapter, verse, author) and merges them in order
 */
function reassembleChunks(content: RetrievedContent[]): RetrievedContent[] {
  // Group items by their verse identity (chapter + verse + author)
  const groups = new Map<string, RetrievedContent[]>();
  
  for (const item of content) {
    const meta = item.metadata;
    const key = `${meta.chapter}-${meta.verse}-${meta.author_id}`;
    
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(item);
  }
  
  // Reassemble chunks within each group
  const reassembled: RetrievedContent[] = [];
  
  for (const [, items] of groups) {
    if (items.length === 1 || !items[0].metadata.is_chunked) {
      // Not chunked, add as-is
      reassembled.push(items[0]);
    } else {
      // Sort chunks by chunk_index
      items.sort((a, b) => 
        (a.metadata.chunk_index || 0) - (b.metadata.chunk_index || 0)
      );
      
      // Merge content from all chunks
      const mergedContent = items.map(item => item.content).join("\n\n");
      
      // Use the first chunk's metadata, but remove chunking info
      const { is_chunked, chunk_index, total_chunks, ...cleanMetadata } = items[0].metadata;
      
      reassembled.push({
        id: items[0].id,
        content: mergedContent,
        metadata: cleanMetadata,
        similarity: items[0].similarity, // Use first chunk's similarity
      });
    }
  }
  
  return reassembled;
}

/**
 * Format retrieved content for the system prompt
 */
export function formatRetrievedContent(content: RetrievedContent[]): string {
  if (!content.length) {
    return "";
  }

  // First, reassemble any chunked content
  const reassembled = reassembleChunks(content);

  return reassembled
    .map((item, index) => {
      const meta = item.metadata;
      let header = `### Source ${index + 1}`;

      if (meta.chapter && meta.verse) {
        if (meta.verse === "chapter_summary") {
          header += ` (Chapter ${meta.chapter} Overview)`;
        } else {
          header += ` (Chapter ${meta.chapter}, Verse ${meta.verse})`;
        }
      }

      if (meta.author) {
        header += ` - ${meta.author}`;
      }

      if (meta.type) {
        header += ` [${meta.type}]`;
      }

      return `${header}\n\n${item.content}`;
    })
    .join("\n\n---\n\n");
}

/**
 * Hybrid search combining BM25 (keyword) + Vector (semantic)
 * Best for keyword-heavy queries like "dharma-kshetra" or Sanskrit terms
 */
export async function hybridSearchGitaContent(
  query: string,
  matchCount: number = 5,
  bm25Weight: number = 0.3,
  vectorWeight: number = 0.7
): Promise<RetrievedContent[]> {
  try {
    const client = getSupabaseClient();
    const queryEmbedding = await generateEmbedding(query);

    const { data, error } = await client.rpc("hybrid_search_gita", {
      query_text: query,
      query_embedding: queryEmbedding,
      match_count: matchCount,
      bm25_weight: bm25Weight,
      vector_weight: vectorWeight,
    });

    if (error) {
      console.error("❌ Hybrid search error, falling back to vector search:", error);
      // Fallback to pure vector search
      return await searchGitaContent(query, matchCount, false);
    }

    console.log(`🔀 Hybrid search: BM25 (${bm25Weight * 100}%) + Vector (${vectorWeight * 100}%)`);
    
    return (data as any[]).map(item => ({
      id: item.id,
      content: item.content,
      metadata: item.metadata,
      similarity: item.similarity,
      bm25Score: item.bm25_score,
      hybridScore: item.hybrid_score,
    })) as RetrievedContent[];
  } catch (error) {
    console.error("❌ Error in hybridSearchGita:", error);
    // Fallback to vector search
    return await searchGitaContent(query, matchCount, false);
  }
}

/**
 * Detect if query should use hybrid search (keyword-heavy)
 */
function shouldUseHybridSearch(query: string): boolean {
  const keywordPatterns = [
    /dharma[-\s]?kshetra/i,    // dharma-kshetra, dharma kshetra
    /kurukshetra/i,             // Kurukshetra
    /sanskrit|devanagari/i,     // Sanskrit content
    /[अ-ह]{3,}/,                 // Sanskrit Devanagari text (3+ chars)
    /\b(krishna|arjuna|sanjaya|dhritarashtra)\b/i, // Character names
    /\b(panchajanya|devadatta|gandiva|conch)\b/i,  // Proper nouns
  ];
  
  return keywordPatterns.some(pattern => pattern.test(query));
}

/**
 * Get relevant context for a user query
 * Automatically chooses between pure semantic or hybrid search
 */
export async function getRelevantContext(
  query: string,
  matchCount: number = 5
): Promise<string> {
  // Choose search strategy based on query characteristics
  let results: RetrievedContent[];
  
  if (shouldUseHybridSearch(query)) {
    // Keyword-heavy query → Hybrid search (BM25 + Vector)
    results = await hybridSearchGitaContent(query, matchCount, 0.3, 0.7);
  } else {
    // Semantic query → Pure vector search
    results = await searchGitaContent(query, matchCount);
  }
  
  return formatRetrievedContent(results);
}
