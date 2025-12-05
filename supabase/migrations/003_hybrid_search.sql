-- Migration: Add Hybrid Search (BM25 + Vector) for better keyword matching
-- Combines PostgreSQL Full-Text Search with pgvector semantic search
-- Reference: Industry best practices for RAG systems

-- 1. Add tsvector column for BM25 (full-text search)
ALTER TABLE gita_embeddings 
ADD COLUMN IF NOT EXISTS content_tsv tsvector;

-- 2. Populate existing rows with tsvector data
UPDATE gita_embeddings 
SET content_tsv = to_tsvector('english', content)
WHERE content_tsv IS NULL;

-- 3. Create GIN index for fast keyword search (BM25)
CREATE INDEX IF NOT EXISTS gita_embeddings_content_tsv_idx 
ON gita_embeddings 
USING GIN (content_tsv);

-- 4. Auto-update trigger to keep tsvector in sync
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

-- 5. Hybrid search function (BM25 + Vector with weighted scoring)
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
    -- Semantic search (pgvector)
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
    -- Keyword search (PostgreSQL FTS)
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
    -- Combine both approaches
    SELECT * FROM vector_search
    UNION
    SELECT * FROM bm25_search
  ),
  normalized AS (
    -- Normalize scores to 0-1 range for fair comparison
    SELECT
      id,
      content,
      metadata,
      vector_sim,
      bm25_rank,
      CASE 
        WHEN MAX(vector_sim) OVER () > 0 
        THEN vector_sim / NULLIF(MAX(vector_sim) OVER (), 0)
        ELSE 0
      END as norm_vector,
      CASE 
        WHEN MAX(bm25_rank) OVER () > 0 
        THEN bm25_rank / NULLIF(MAX(bm25_rank) OVER (), 0)
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
  WHERE (norm_vector * vector_weight + norm_bm25 * bm25_weight) > 0
  ORDER BY hybrid_score DESC
  LIMIT match_count;
END;
$$;

-- Note: Weights explained
-- bm25_weight = 0.3 (30%): Good for keyword matching
-- vector_weight = 0.7 (70%): Prioritize semantic understanding
-- Adjust based on your use case:
--   - More keywords needed? Increase bm25_weight to 0.5
--   - More semantic? Keep vector_weight at 0.7-0.8

