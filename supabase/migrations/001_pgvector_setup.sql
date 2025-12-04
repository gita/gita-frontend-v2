-- GitaGPT Vector Database Setup for Supabase
-- Run this migration in your Supabase SQL Editor

-- 1. Enable the pgvector extension
create extension if not exists vector;

-- 2. Create the embeddings table for Gita content
create table if not exists gita_embeddings (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(1536), -- OpenAI text-embedding-3-small dimension
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 3. Create HNSW index for fast similarity search (15-28x faster than IVFFlat)
-- HNSW (Hierarchical Navigable Small World) is the industry standard for vector search
create index if not exists gita_embeddings_embedding_idx 
on gita_embeddings 
using hnsw (embedding vector_cosine_ops)
with (m = 16, ef_construction = 64);

-- 4. Create index on metadata for filtering
create index if not exists gita_embeddings_metadata_idx 
on gita_embeddings 
using gin (metadata);

-- 5. Create the similarity search function
create or replace function match_gita_content(
  query_embedding vector(1536),
  match_count int default 5,
  filter jsonb default '{}'
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    gita_embeddings.id,
    gita_embeddings.content,
    gita_embeddings.metadata,
    1 - (gita_embeddings.embedding <=> query_embedding) as similarity
  from gita_embeddings
  where (filter = '{}' or gita_embeddings.metadata @> filter)
  order by gita_embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- 6. Create function to update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 7. Create trigger for updated_at
drop trigger if exists update_gita_embeddings_updated_at on gita_embeddings;
create trigger update_gita_embeddings_updated_at
  before update on gita_embeddings
  for each row
  execute function update_updated_at_column();

-- 8. Set up Row Level Security (RLS)
alter table gita_embeddings enable row level security;

-- Allow read access to everyone (for RAG retrieval)
create policy "Allow public read access"
  on gita_embeddings
  for select
  to public
  using (true);

-- Only allow service role to insert/update/delete
create policy "Allow service role full access"
  on gita_embeddings
  for all
  to service_role
  using (true)
  with check (true);

-- 9. Grant permissions
grant usage on schema public to anon, authenticated;
grant select on gita_embeddings to anon, authenticated;
grant all on gita_embeddings to service_role;

-- Verify setup
comment on table gita_embeddings is 'Vector embeddings for Bhagavad Gita content used in GitaGPT RAG';
comment on column gita_embeddings.content is 'The text content (verse, translation, or commentary)';
comment on column gita_embeddings.embedding is 'OpenAI text-embedding-3-small vector (1536 dimensions)';
comment on column gita_embeddings.metadata is 'JSON metadata: {chapter, verse, author, type, language}';

