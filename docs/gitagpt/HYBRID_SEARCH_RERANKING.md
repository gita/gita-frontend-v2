# Hybrid Search, Reranking & Prompt Compression - Complete Guide

## 📊 Reranking Solutions Comparison (2025)

### Free & Open Source Options

| Solution                     | Cost        | Accuracy | Speed      | Implementation     | Best For        |
| ---------------------------- | ----------- | -------- | ---------- | ------------------ | --------------- |
| **FlashRank**                | **FREE** 🎉 | ⭐⭐⭐⭐ | ⚡⚡⚡⚡⚡ | Easy (Python/API)  | **RECOMMENDED** |
| bge-reranker                 | FREE        | ⭐⭐⭐⭐ | ⚡⚡⚡     | Medium (self-host) | GPU available   |
| RRF (Reciprocal Rank Fusion) | FREE        | ⭐⭐⭐   | ⚡⚡⚡⚡⚡ | Easy (algorithm)   | Quick wins      |
| PostgreSQL FTS (BM25)        | FREE        | ⭐⭐⭐   | ⚡⚡⚡⚡   | Medium (SQL)       | Hybrid search   |

### Paid Solutions

| Solution             | Cost              | Accuracy   | Speed      | Best For          |
| -------------------- | ----------------- | ---------- | ---------- | ----------------- |
| **Jina Reranker v2** | **$2/1M tokens**  | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡   | **BEST VALUE**    |
| Cohere Rerank 3      | $1-2/1K searches  | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡⭐ | Enterprise        |
| Qwen3-Reranker-0.6B  | $0.01/1M tokens   | ⭐⭐⭐⭐   | ⚡⚡⚡⚡   | Budget-friendly   |
| Voyage Rerank        | $0.50/1K searches | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡   | Technical content |

**💰 Cost Estimate for GitaGPT**:

- Assume 1,000 queries/month
- Average 5 chunks to rerank = 5,000 tokens/month
- **Jina**: $0.01/month (negligible!)
- **Cohere**: $1-2/month

## 🎯 Recommended Solution: Jina Reranker v2

**Why Jina?**

1. ✅ **Cheapest paid option**: $2 per 1M tokens (vs Cohere $1 per 1K searches)
2. ✅ **Free tier**: 10,000 requests/month
3. ✅ **Multilingual**: Supports Sanskrit, Hindi, English
4. ✅ **Easy API**: Simple REST endpoint
5. ✅ **No vendor lock-in**: Can switch anytime

**Free tier covers**:

- 10,000 searches/month × 5 chunks = **50,000 reranks/month FREE**
- Perfect for testing and low-traffic sites

## 🔀 Hybrid Search Implementation (BM25 + Vector)

### PostgreSQL Full Text Search + pgvector

```sql
-- 1. Add tsvector column for BM25 (full-text search)
ALTER TABLE gita_embeddings
ADD COLUMN IF NOT EXISTS content_tsv tsvector;

-- 2. Create GIN index for fast keyword search
CREATE INDEX IF NOT EXISTS gita_embeddings_content_tsv_idx
ON gita_embeddings
USING GIN (content_tsv);

-- 3. Auto-update tsvector on insert/update
CREATE OR REPLACE FUNCTION update_content_tsv()
RETURNS TRIGGER AS $$
BEGIN
  NEW.content_tsv := to_tsvector('english', NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER gita_embeddings_tsv_update
BEFORE INSERT OR UPDATE ON gita_embeddings
FOR EACH ROW
EXECUTE FUNCTION update_content_tsv();

-- 4. Hybrid search function (BM25 + Vector)
CREATE OR REPLACE FUNCTION hybrid_search_gita(
  query_text text,
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  bm25_weight float DEFAULT 0.3,
  vector_weight float DEFAULT 0.7
)
RETURNS TABLE (
  id uuid,
  content text,
  metadata jsonb,
  similarity float,
  bm25_score float,
  hybrid_score float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH vector_search AS (
    SELECT
      gita_embeddings.id,
      gita_embeddings.content,
      gita_embeddings.metadata,
      1 - (gita_embeddings.embedding <=> query_embedding) as vector_sim,
      0::float as bm25_rank
    FROM gita_embeddings
    ORDER BY gita_embeddings.embedding <=> query_embedding
    LIMIT match_count * 2
  ),
  bm25_search AS (
    SELECT
      gita_embeddings.id,
      gita_embeddings.content,
      gita_embeddings.metadata,
      0::float as vector_sim,
      ts_rank_cd(content_tsv, plainto_tsquery('english', query_text)) as bm25_rank
    FROM gita_embeddings
    WHERE content_tsv @@ plainto_tsquery('english', query_text)
    ORDER BY bm25_rank DESC
    LIMIT match_count * 2
  ),
  combined AS (
    SELECT * FROM vector_search
    UNION
    SELECT * FROM bm25_search
  ),
  normalized AS (
    SELECT
      id,
      content,
      metadata,
      vector_sim,
      bm25_rank,
      -- Normalize scores to 0-1 range
      CASE
        WHEN MAX(vector_sim) OVER () > 0
        THEN vector_sim / MAX(vector_sim) OVER ()
        ELSE 0
      END as norm_vector,
      CASE
        WHEN MAX(bm25_rank) OVER () > 0
        THEN bm25_rank / MAX(bm25_rank) OVER ()
        ELSE 0
      END as norm_bm25
    FROM combined
  )
  SELECT
    id,
    content,
    metadata,
    norm_vector as similarity,
    norm_bm25 as bm25_score,
    (norm_vector * vector_weight + norm_bm25 * bm25_weight) as hybrid_score
  FROM normalized
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;
```

### TypeScript Integration

```typescript
// retrieval.ts
export async function hybridSearchGitaContent(
  query: string,
  matchCount: number = 5,
  bm25Weight: number = 0.3,
  vectorWeight: number = 0.7,
): Promise<RetrievedContent[]> {
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
    console.error("Hybrid search error:", error);
    return [];
  }

  return data as RetrievedContent[];
}
```

**When to use hybrid search**:

- ✅ Keyword-heavy queries: "dharma-kshetra", "Krishna conch"
- ✅ Exact term matching: Names, Sanskrit words
- ✅ Better recall: Catches results semantic search misses
- ❌ Not needed if metadata filtering works (verse numbers)

## 🗜️ Prompt Compression

### Solutions Comparison

| Solution          | Compression | Quality Loss | Cost     | Implementation |
| ----------------- | ----------- | ------------ | -------- | -------------- |
| **LLMLingua-2**   | **50-80%**  | **Low**      | **FREE** | Medium         |
| LongLLMLingua     | 60-90%      | Medium       | FREE     | Medium         |
| Selective Context | 40-60%      | Very Low     | FREE     | Easy           |
| Token Pruning     | 30-50%      | Low          | FREE     | Easy           |

### LLMLingua-2 (Microsoft - RECOMMENDED)

**What it does**: Compresses RAG context by 50-80% with minimal quality loss

**How it works**:

1. Identifies important tokens using perplexity
2. Removes redundant/filler tokens
3. Preserves key semantic information

**Example**:

```
Original (2000 tokens):
"The blind King Dhritarashtra's fondness for his own sons had clouded
his spiritual wisdom and deviated him from the path of virtue. He had
usurped the kingdom of Hastinapur from the rightful heirs; the Pandavas,
sons of his brother Pandu. Feeling guilty of the injustice he had done
towards his nephews, his conscience worried him about the outcome..."

Compressed (600 tokens):
"Dhritarashtra's fondness clouded wisdom, deviated from virtue. Usurped
kingdom from Pandavas. Guilty, worried about outcome..."
```

**Integration**:

```python
# Python service for compression
from llmlingua import PromptCompressor

compressor = PromptCompressor()

compressed = compressor.compress_prompt(
    context,
    instruction="",
    rate=0.5,  # 50% compression
    target_token=1000
)
```

**Pros**:

- ✅ FREE and open source
- ✅ 50-80% token savings
- ✅ Low quality loss (<5%)

**Cons**:

- ❌ Requires Python service
- ❌ Adds latency (~100-200ms)
- ❌ Complexity increase

### Selective Context (Simplest Approach)

**What it does**: Only include most relevant parts of retrieved chunks

```typescript
function compressContext(chunks: RetrievedContent[]): string {
  return chunks
    .map((chunk) => {
      // Only include translation + key commentary points
      const lines = chunk.content.split("\n");

      // Find translation section
      const translationIdx = lines.findIndex((l) =>
        l.includes("## Translation"),
      );
      const commentaryIdx = lines.findIndex((l) => l.includes("## Commentary"));

      let compressed = "";

      // Include verse header
      compressed += lines[0] + "\n\n";

      // Include translation
      if (translationIdx !== -1) {
        compressed +=
          lines.slice(translationIdx, translationIdx + 3).join("\n") + "\n\n";
      }

      // Include first 3 lines of commentary only
      if (commentaryIdx !== -1) {
        compressed += lines.slice(commentaryIdx, commentaryIdx + 4).join("\n");
      }

      return compressed;
    })
    .join("\n\n---\n\n");
}
```

**Pros**:

- ✅ FREE
- ✅ No external dependencies
- ✅ Fast (no API call)
- ✅ Predictable behavior

**Cons**:

- ❌ Manual logic (needs tuning)
- ❌ May miss important details
- ❌ Less sophisticated

## 💡 Recommended Implementation Plan

### Phase 1: Free Improvements (NOW) ✅

1. ✅ **HNSW Index** - 15-28x speedup
2. ✅ **Query Analysis** - Adaptive thresholds
3. ⏳ **Hybrid Search** - Add BM25 for keywords
4. ⏳ **Selective Compression** - Trim chunky commentaries

**Cost**: $0
**Time**: 1-2 hours
**Impact**: 20-30% quality improvement

### Phase 2: Jina Reranker (WHEN SCALING)

**Trigger**: When free tier exhausted or quality needs boost

**Implementation**:

```typescript
async function jinaRerank(
  query: string,
  chunks: RetrievedContent[],
  topK: number = 5,
): Promise<RetrievedContent[]> {
  const response = await fetch("https://api.jina.ai/v1/rerank", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.JINA_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      documents: chunks.map((c) => c.content),
      top_n: topK,
      model: "jina-reranker-v2-base-multilingual", // Supports Sanskrit!
    }),
  });

  const data = await response.json();

  return data.results.map((r: any) => ({
    ...chunks[r.index],
    rerankScore: r.relevance_score,
  }));
}
```

**Cost**: FREE for first 10K searches/month, then $2/1M tokens

### Phase 3: LLMLingua Compression (OPTIONAL)

Only if context gets too large (>8K tokens) or cost becomes issue.

**When to use**:

- ❌ NOT needed now (our chunks are small)
- ✅ When expanding to all 18 chapters + multiple commentaries
- ✅ When token costs exceed $50/month

## 🔄 Hybrid Search Implementation

### Migration SQL (`003_hybrid_search.sql`)

```sql
-- Enable full-text search alongside vector search

-- 1. Add tsvector column
ALTER TABLE gita_embeddings
ADD COLUMN IF NOT EXISTS content_tsv tsvector;

-- 2. Populate existing rows
UPDATE gita_embeddings
SET content_tsv = to_tsvector('english', content);

-- 3. Create GIN index (fast BM25)
CREATE INDEX IF NOT EXISTS gita_embeddings_content_tsv_idx
ON gita_embeddings
USING GIN (content_tsv);

-- 4. Auto-update trigger
CREATE OR REPLACE FUNCTION update_content_tsv()
RETURNS TRIGGER AS $$
BEGIN
  NEW.content_tsv := to_tsvector('english', NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS gita_embeddings_tsv_update ON gita_embeddings;
CREATE TRIGGER gita_embeddings_tsv_update
BEFORE INSERT OR UPDATE ON gita_embeddings
FOR EACH ROW
EXECUTE FUNCTION update_content_tsv();

-- 5. Hybrid search function (see full code above)
```

### When Hybrid Search Helps

| Query Type  | Example                     | Vector Alone | + BM25 (Hybrid) |
| ----------- | --------------------------- | ------------ | --------------- |
| Semantic    | "How to find peace?"        | ✅ Great     | ✅ Same         |
| Keyword     | "dharma-kshetra"            | ⚠️ Okay      | ✅ Better       |
| Exact match | "Krishna Panchajanya conch" | ⚠️ Misses    | ✅ Finds        |
| Names       | "Dhritarashtra Sanjaya"     | ⚠️ Okay      | ✅ Better       |
| Sanskrit    | "धर्मक्षेत्रे कुरुक्षेत्रे" | ❌ Poor      | ✅ Good         |

## 📈 Implementation Roadmap

### Step 1: Hybrid Search (2 hours)

```typescript
// retrieval.ts
export async function searchGitaContent(query: string, matchCount: number = 5) {
  // Detect if query is keyword-heavy
  const isKeywordQuery = /dharma|krishna|arjuna|sanskrit/i.test(query);

  if (isKeywordQuery) {
    // Use hybrid search (BM25 30% + Vector 70%)
    return await hybridSearchGita(query, matchCount, 0.3, 0.7);
  } else {
    // Pure semantic search for concept queries
    return await vectorSearchGita(query, matchCount);
  }
}
```

**Benefits**:

- ✅ Better keyword matching
- ✅ Finds exact Sanskrit terms
- ✅ Complements semantic search
- ✅ FREE (built into PostgreSQL)

### Step 2: Jina Reranker (30 min)

```typescript
// Use Jina for final reranking after hybrid search
const candidates = await hybridSearchGita(query, 15); // Get 15 candidates
const reranked = await jinaRerank(query, candidates, 5); // Return top 5
```

**Benefits**:

- ✅ 10-20% accuracy boost
- ✅ FREE for 10K searches/month
- ✅ Multilingual (Sanskrit!)
- ✅ 2-3ms latency

### Step 3: Selective Compression (1 hour)

```typescript
function compressChunks(chunks: RetrievedContent[]): string {
  return chunks
    .map((chunk) => {
      // Keep: Sanskrit + Translation + First 2 lines of commentary
      // Remove: Word meanings, full commentary, URLs
      return extractEssentials(chunk);
    })
    .join("\n\n---\n\n");
}
```

**Benefits**:

- ✅ 40-60% token reduction
- ✅ FREE
- ✅ Faster responses
- ✅ Lower costs

## 🎯 Recommended Immediate Actions

### For GitaGPT (Priority Order):

**1. Hybrid Search** ⭐⭐⭐⭐⭐ (Do this first!)

- **Why**: Handles "dharma-kshetra", Sanskrit terms, names
- **Cost**: $0
- **Time**: 2 hours
- **Impact**: HIGH (better keyword matching)

**2. Jina Reranker** ⭐⭐⭐⭐ (When ready to scale)

- **Why**: 10-20% accuracy boost, multilingual
- **Cost**: $0 (free tier)
- **Time**: 30 min
- **Impact**: MEDIUM-HIGH

**3. Selective Compression** ⭐⭐⭐ (Nice to have)

- **Why**: Reduce tokens, faster responses
- **Cost**: $0
- **Time**: 1 hour
- **Impact**: MEDIUM (cost savings)

**4. LLMLingua** ⭐ (Future)

- **Why**: Advanced compression if needed
- **Cost**: $0
- **Time**: 4+ hours (Python service)
- **Impact**: LOW (not needed yet)

## 📊 Expected Results After Full Implementation

| Metric          | Current   | + Hybrid   | + Jina     | + Compression |
| --------------- | --------- | ---------- | ---------- | ------------- |
| Test accuracy   | 4/5 (80%) | 5/5 (100%) | 5/5 (100%) | 5/5 (100%)    |
| Keyword queries | ⚠️ Okay   | ✅ Great   | ✅ Great   | ✅ Great      |
| Response time   | 2-3s      | 1-2s       | 1.5-2.5s   | 1-2s          |
| Token usage     | 100%      | 100%       | 100%       | 40%           |
| Monthly cost    | $0        | $0         | $0         | $0            |

## 🔬 Testing Strategy

### Test Queries (After Hybrid Search):

1. **Keyword**: "dharma-kshetra meaning" → Should find BG 1.1 instantly
2. **Sanskrit**: "कृपया परया" → Should find verses with this phrase
3. **Names**: "Dhritarashtra Sanjaya conversation" → BG 1.1-2
4. **Semantic**: "How to overcome fear?" → Relevant verses
5. **Mixed**: "What is karma yoga according to Krishna?" → Hybrid

### Success Criteria:

- ✅ All 5 test queries return relevant top result
- ✅ Keyword queries <100ms (BM25 fast)
- ✅ Semantic queries <500ms (vector search)
- ✅ No false positives (threshold filtering working)

## 💰 Cost Analysis (1000 Users/Month)

### Current (Vector Only):

- Embeddings: ~$5/month
- Vector search: $0 (Supabase included)
- **Total**: $5/month

### + Hybrid Search:

- BM25 search: $0 (built-in PostgreSQL)
- **Total**: $5/month (no increase!)

### + Jina Reranker:

- 1000 users × 10 searches = 10,000 searches
- FREE (within free tier!)
- **Total**: $5/month

### + Prompt Compression:

- Token reduction: 40-60%
- LLM cost savings: ~$20/month
- **Total**: $5/month (saves $20 on LLM!)

## 🎯 Final Recommendation

**Implement in this order**:

1. **NOW**: Hybrid Search (BM25 + Vector)
   - Biggest quality improvement
   - FREE
   - Handles keyword queries

2. **NEXT**: Jina Reranker
   - FREE tier covers our needs
   - 10-20% boost
   - Easy to add

3. **LATER**: Selective Compression
   - Only if token costs become issue
   - Simple to implement
   - Good cost savings

4. **SKIP**: LLMLingua (for now)
   - Too complex
   - Not needed yet
   - Our chunks are already small

## 🚀 Quick Start: Add Hybrid Search

```bash
# 1. Run hybrid search migration
psql $SUPABASE_URL < supabase/migrations/003_hybrid_search.sql

# 2. Update retrieval.ts to use hybrid function
# (Code provided in this doc)

# 3. Test with keyword queries
# Should see immediate improvement!
```

---

**Sources**:

- FlashRank: https://github.com/PrithivirajDamodaran/FlashRank
- Jina AI: https://jina.ai/reranker
- Cohere Rerank: https://cohere.com/rerank
- LLMLingua: https://github.com/microsoft/LLMLingua
- PostgreSQL FTS: https://www.postgresql.org/docs/current/textsearch.html
