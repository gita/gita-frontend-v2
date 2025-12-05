/**
 * Reranking module for improved RAG retrieval quality
 *
 * Two-stage retrieval:
 * 1. Vector search retrieves top N candidates (broader recall)
 * 2. Reranker scores these N for relevance to query (better precision)
 *
 * Options:
 * - Cohere Rerank (best quality, $1/1000 searches)
 * - Jina AI Reranker (free tier, good quality)
 * - Simple BM25 reranking (free, keyword-based)
 */

import { RetrievedContent } from "./retrieval";

/**
 * Simple keyword-based reranking using BM25-like scoring
 * This is a free alternative to Cohere/Jina for initial testing
 */
export function simpleKeywordRerank(
  query: string,
  results: RetrievedContent[],
  topK: number = 5,
): RetrievedContent[] {
  const queryTerms = query.toLowerCase().split(/\s+/);

  console.log(`\n🔄 Reranking Query: "${query}"`);

  // Extract verse number from query
  // Supports: "verse 1.1", "1.1", "verse 1", etc.
  const chapterVerseMatch =
    query.match(/verse\s*(\d+)\.(\d+)/i) || query.match(/(\d+)\.(\d+)/);

  let targetChapter: string | null = null;
  let targetVerse: string | null = null;

  if (chapterVerseMatch) {
    // Query has "verse 1.1" format
    targetChapter = chapterVerseMatch[1];
    targetVerse = chapterVerseMatch[2];
    console.log(`   Target: Chapter ${targetChapter}, Verse ${targetVerse}`);
  } else {
    // Try to extract just verse number (e.g., "verse 1" -> "1")
    const singleVerseMatch = query.match(/verse\s*(\d+)(?![.\d])/i);
    if (singleVerseMatch) {
      targetVerse = singleVerseMatch[1];
      console.log(`   Target: Verse ${targetVerse} (any chapter)`);
    }
  }

  // Score each result
  const scored = results.map((result) => {
    let score = result.similarity; // Start with vector similarity
    const resultVerse = String(result.metadata.verse || "");
    const resultChapter = String(result.metadata.chapter || "");

    // HUGE boost if verse matches exactly
    if (targetVerse) {
      // Case 1: Query "verse 1.1" → Check if chapter=1 AND verse="1"
      if (
        targetChapter &&
        resultChapter === targetChapter &&
        resultVerse === targetVerse
      ) {
        score += 1.0; // Perfect match!
      }
      // Case 2: Query "verse 1" → Check if verse="1" (any chapter)
      else if (!targetChapter && resultVerse === targetVerse) {
        score += 1.0;
      }
      // Case 3: Query "verse 1.1" → Check if verse="1.1" directly (in case DB stores it that way)
      else if (
        targetChapter &&
        resultVerse === `${targetChapter}.${targetVerse}`
      ) {
        score += 1.0;
      }
    }

    // Boost if query mentions "verse" and this is a verse (not chapter info)
    if (
      query.toLowerCase().includes("verse") &&
      result.metadata.type === "verse_complete"
    ) {
      score += 0.2; // Medium boost for being a verse
    }

    // Boost if query mentions "chapter" and this is chapter info
    if (
      query.toLowerCase().includes("chapter") &&
      result.metadata.type === "chapter_info"
    ) {
      score += 0.1;
    }

    // Count query term matches in content
    const contentLower = result.content.toLowerCase();
    const matchCount = queryTerms.filter((term) =>
      contentLower.includes(term),
    ).length;
    score += (matchCount / queryTerms.length) * 0.1; // Small boost for keyword matches

    return { ...result, rerankScore: score };
  });

  // Sort by rerank score and return top K
  const sorted = scored.sort(
    (a, b) => (b.rerankScore || 0) - (a.rerankScore || 0),
  );

  console.log(`\n   Top ${Math.min(3, sorted.length)} after reranking:`);
  sorted.slice(0, 3).forEach((r, i) => {
    console.log(
      `   ${i + 1}. Ch ${r.metadata.chapter}, Verse "${r.metadata.verse}" - Score: ${r.rerankScore?.toFixed(2)}`,
    );
  });

  return sorted.slice(0, topK);
}

/**
 * Cohere Rerank API integration (commented out until needed)
 * Requires: npm install cohere-ai
 * Cost: $1 per 1000 searches
 */
/*
import { CohereClient } from "cohere-ai";

export async function cohereRerank(
  query: string,
  results: RetrievedContent[],
  topK: number = 5
): Promise<RetrievedContent[]> {
  const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
  });

  // Prepare documents for reranking
  const documents = results.map(r => r.content);

  const reranked = await cohere.rerank({
    query,
    documents,
    topN: topK,
    model: "rerank-english-v3.0",
  });

  // Map back to original results with new scores
  return reranked.results.map(r => ({
    ...results[r.index],
    rerankScore: r.relevanceScore,
  }));
}
*/

/**
 * Jina AI Reranker integration
 *
 * FREE tier: 10,000 searches/month
 * Paid: $2 per 1M tokens after free tier
 *
 * Features:
 * - Multilingual (supports Sanskrit, Hindi, English)
 * - 10-20% accuracy improvement over keyword reranking
 * - 2-3ms latency
 *
 * Setup:
 * 1. Sign up at https://jina.ai
 * 2. Get API key from dashboard
 * 3. Add JINA_API_KEY to .env.local
 */
export async function jinaRerank(
  query: string,
  results: RetrievedContent[],
  topK: number = 5,
): Promise<RetrievedContent[]> {
  // Check if Jina API key is configured
  if (!process.env.JINA_API_KEY) {
    console.log("⚠️  JINA_API_KEY not found, using simple keyword reranking");
    return simpleKeywordRerank(query, results, topK);
  }

  try {
    const response = await fetch("https://api.jina.ai/v1/rerank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        documents: results.map((r) => r.content),
        top_n: topK,
        model: "jina-reranker-v2-base-multilingual", // Supports 100+ languages including Sanskrit!
      }),
    });

    if (!response.ok) {
      throw new Error(`Jina API error: ${response.status}`);
    }

    const data = await response.json();

    console.log(`✨ Jina reranking: ${results.length} → ${topK} chunks`);

    return data.results.map((r: any) => ({
      ...results[r.index],
      rerankScore: r.relevance_score,
      similarity: r.relevance_score, // Update similarity with Jina score
    }));
  } catch (error) {
    console.error(
      "❌ Jina reranking failed, falling back to keyword reranking:",
      error,
    );
    return simpleKeywordRerank(query, results, topK);
  }
}
