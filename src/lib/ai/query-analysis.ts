/**
 * Query Analysis for Adaptive RAG Retrieval
 * 
 * Inspired by ChatRAG's adaptive retrieval system:
 * - Analyzes query complexity (simple/moderate/complex)
 * - Detects query type (factual/analytical/exploratory)
 * - Provides dynamic similarity thresholds
 * 
 * This improves retrieval quality by filtering out low-confidence matches
 * and adapting search strategy based on query characteristics.
 */

export enum QueryComplexity {
  SIMPLE = "simple",      // "What is karma?"
  MODERATE = "moderate",  // "How does karma yoga differ from bhakti yoga?"
  COMPLEX = "complex"     // "Explain the philosophical implications of..."
}

export enum QueryType {
  FACTUAL = "factual",           // "What is", "Who said", "Which verse"
  ANALYTICAL = "analytical",      // "Why", "How", "Explain"
  EXPLORATORY = "exploratory"     // "Tell me about", "Discuss"
}

export interface QueryAnalysis {
  complexity: QueryComplexity;
  queryType: QueryType;
  similarityThreshold: number;
  confidence: number;
}

/**
 * Analyze query complexity based on length and structure
 */
export function analyzeQueryComplexity(query: string): QueryComplexity {
  const words = query.trim().split(/\s+/);
  const wordCount = words.length;
  
  // Check for multiple concepts
  const hasMultipleConcepts = /\b(and|or|versus|vs|compared|difference|between)\b/gi.test(query);
  
  // Check for complex sentence structure
  const hasSubClauses = (query.match(/[,;]/g) || []).length > 1;
  const hasQuestionWords = (query.match(/\b(what|who|which|when|where|why|how)\b/gi) || []).length;
  
  // Simple: Short, single concept, one question word
  if (wordCount <= 6 && !hasMultipleConcepts && hasQuestionWords <= 1) {
    return QueryComplexity.SIMPLE;
  }
  
  // Complex: Long, multiple concepts, or complex structure
  if (wordCount > 20 || hasSubClauses || hasMultipleConcepts) {
    return QueryComplexity.COMPLEX;
  }
  
  // Moderate: Everything else
  return QueryComplexity.MODERATE;
}

/**
 * Detect query type based on starting words and structure
 */
export function detectQueryType(query: string): QueryType {
  const queryLower = query.toLowerCase().trim();
  
  // Factual: Asks for specific facts
  if (/^(what|who|which|when|where)\s/.test(queryLower)) {
    return QueryType.FACTUAL;
  }
  
  // Also factual: Verse references
  if (/verse\s*\d+\.\d+|bg\s*\d+\.\d+/i.test(queryLower)) {
    return QueryType.FACTUAL;
  }
  
  // Analytical: Asks for reasoning or explanation
  if (/^(why|how|explain|describe|compare|analyze)\s/.test(queryLower)) {
    return QueryType.ANALYTICAL;
  }
  
  // Exploratory: Open-ended or discussion-based
  return QueryType.EXPLORATORY;
}

/**
 * Get dynamic similarity threshold based on query analysis
 * 
 * Philosophy:
 * - Simple factual queries: High threshold (need precise matches)
 * - Complex exploratory queries: Lower threshold (cast wider net)
 * 
 * Range: 0.35 (lowest) to 0.7 (highest)
 */
export function getSimilarityThreshold(
  complexity: QueryComplexity,
  queryType: QueryType
): number {
  // Note: These thresholds are tuned for our specific dataset
  // ChatRAG uses 0.35-0.70, but our embeddings yield 0.22-0.55 similarity scores
  // Adjust based on your actual similarity distribution
  
  // Thresholds tuned for small dataset (Chapter 1 only)
  // Lower thresholds allow more results through
  // Will increase these as we add more chapters (better embeddings distribution)
  const thresholds: Record<QueryComplexity, Record<QueryType, number>> = {
    [QueryComplexity.SIMPLE]: {
      [QueryType.FACTUAL]: 0.30,      // Specific queries
      [QueryType.ANALYTICAL]: 0.22,   // Explain something
      [QueryType.EXPLORATORY]: 0.18,  // Greetings, open questions
    },
    [QueryComplexity.MODERATE]: {
      [QueryType.FACTUAL]: 0.25,      // Specific but nuanced
      [QueryType.ANALYTICAL]: 0.20,   // Standard explanations
      [QueryType.EXPLORATORY]: 0.18,  // Broader exploration
    },
    [QueryComplexity.COMPLEX]: {
      [QueryType.FACTUAL]: 0.22,      // Complex facts
      [QueryType.ANALYTICAL]: 0.18,   // Deep analysis
      [QueryType.EXPLORATORY]: 0.15,  // Cast very wide net
    },
  };
  
  return thresholds[complexity][queryType];
}

/**
 * Analyze query and return full analysis with recommended threshold
 */
export function analyzeQuery(query: string): QueryAnalysis {
  const complexity = analyzeQueryComplexity(query);
  const queryType = detectQueryType(query);
  const similarityThreshold = getSimilarityThreshold(complexity, queryType);
  
  // Calculate confidence score (0-1) based on query clarity
  // Clear, well-formed questions = higher confidence
  const hasQuestionMark = query.includes('?');
  const hasKeywords = /\b(what|who|which|when|where|why|how|verse|chapter|krishna|arjuna)\b/i.test(query);
  const isReasonableLength = query.length >= 10 && query.length <= 200;
  
  let confidence = 0.5; // Base confidence
  if (hasQuestionMark) confidence += 0.1;
  if (hasKeywords) confidence += 0.2;
  if (isReasonableLength) confidence += 0.2;
  
  return {
    complexity,
    queryType,
    similarityThreshold,
    confidence: Math.min(confidence, 1.0),
  };
}

/**
 * Determine if query should use metadata filtering (explicit verse reference)
 */
export function shouldUseMetadataFilter(query: string): boolean {
  // Matches patterns like: "verse 1.1", "BG 2.3", "chapter 5 verse 10"
  return /(?:verse|bg|BG|chapter)\s*\d+[.\s]\d+/i.test(query);
}

/**
 * Get recommended number of candidates to retrieve before reranking
 * More complex queries benefit from larger candidate pools
 * 
 * Increased multipliers based on best practices:
 * - Gives reranker more options to choose from
 * - Better quality at minimal cost (we have small dataset)
 * - ChatRAG uses 3-4x, we use 3-5x
 */
export function getRetrievalCount(complexity: QueryComplexity, finalCount: number): number {
  const multipliers = {
    [QueryComplexity.SIMPLE]: 3,    // 3x candidates (e.g., 5 → 15)
    [QueryComplexity.MODERATE]: 4,  // 4x candidates (e.g., 5 → 20)
    [QueryComplexity.COMPLEX]: 5,   // 5x candidates (e.g., 5 → 25)
  };
  
  return finalCount * multipliers[complexity];
}

