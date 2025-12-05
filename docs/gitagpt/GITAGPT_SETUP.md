# GitaGPT Setup Guide

This guide explains how to set up the GitaGPT AI chatbot with RAG (Retrieval Augmented Generation).

## Architecture Overview

- **AI SDK v5** - Vercel's AI SDK for streaming and chat hooks
- **OpenAI GPT-4o-mini** - Language model (upgradeable to GPT-5.1)
- **Supabase pgvector** - Vector database for RAG
- **Upstash Redis** - Rate limiting

## Prerequisites

1. **Supabase Project** - Already configured
2. **OpenAI API Key** - For embeddings and chat
3. **Upstash Redis** - For rate limiting (free tier available)

## Environment Variables

Add these to your `.env.local`:

```bash
# Vercel AI Gateway (required)
# Get your key from: https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai&title=Go+to+AI+Gateway
# Go to API Keys > Create Key
AI_GATEWAY_API_KEY=...

# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

## Step 1: Set Up Supabase pgvector

Run the SQL migration in your Supabase SQL Editor:

```sql
-- Located at: supabase/migrations/001_pgvector_setup.sql

-- Enable vector extension
create extension if not exists vector;

-- Create embeddings table
create table if not exists gita_embeddings (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  embedding vector(1536),
  metadata jsonb default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for fast similarity search (IVFFlat)
create index if not exists gita_embeddings_embedding_idx
on gita_embeddings
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Create similarity search function
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
```

## Step 2: Ingest Gita Content

Run the ingestion script to populate the vector database:

```bash
npm run ingest:gita
```

This processes:

- Translations from all authors
- Commentaries (chunked for long texts)
- Sanskrit verses with transliteration

Expected: ~15,000-25,000 vectors depending on content.

## Step 3: Set Up Upstash Redis

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database
3. Copy the REST URL and Token to your `.env.local`

Rate limits:

- Anonymous users: 2 messages/day (by IP address)
- Authenticated users: 10 messages/day (by user ID)
- **Note:** Rate limiting is automatically disabled when `NEXT_PUBLIC_NODE_ENV=development` for local testing

### Resetting Rate Limits

For testing, you can reset rate limits using:

```bash
# Reset all rate limits (pattern-based)
npx tsx scripts/reset-ratelimit.ts

# ⚠️ Flush entire Redis database (most reliable)
npx tsx scripts/reset-ratelimit.ts flush

# Reset anonymous only
npx tsx scripts/reset-ratelimit.ts anon

# Reset authenticated only
npx tsx scripts/reset-ratelimit.ts auth

# Reset specific IP or user ID
npx tsx scripts/reset-ratelimit.ts 127.0.0.1
npx tsx scripts/reset-ratelimit.ts user-uuid-here
```

**Important:** After resetting, restart your dev server to clear in-memory cached rate limit instances

## Step 4: Test the Chat

1. Start the dev server: `npm run dev`
2. Go to `/gitagpt` for the full-page chat
3. The chat widget appears on all other pages

## File Structure

```
src/
├── app/
│   ├── api/chat/
│   │   ├── route.ts               # Chat API with RAG
│   │   └── status/route.ts        # Rate limit status API
│   └── gitagpt/                   # Full-screen chat UI
├── components/features/chat-sdk/
│   ├── chat.tsx                   # Main chat logic (useChat hook)
│   ├── multimodal-input.tsx       # Input component
│   ├── message.tsx                # Message bubble
│   ├── sidebar.tsx                # Chat history sidebar
│   ├── sidebar-footer.tsx         # Usage display
│   └── usage-display.tsx          # Rate limit progress bar
├── hooks/
│   ├── useLocalChats.ts           # localStorage persistence (anonymous)
│   ├── useSupabaseChats.ts        # Supabase persistence (authenticated)
│   ├── useChatPersistence.ts      # Unified persistence hook
│   ├── useRateLimitStatus.ts      # Rate limit display hook
│   └── useCountdown.ts            # Reset timer countdown
├── lib/
│   ├── ai/
│   │   ├── prompts.ts             # Krishna personality
│   │   └── retrieval.ts           # Vector search
│   ├── auth/
│   │   └── AuthProvider.tsx       # Supabase auth context
│   └── ratelimit.ts               # Upstash rate limiting
└── scripts/
    └── reset-ratelimit.ts         # Rate limit reset script
```

## Flutter Integration

The same `/api/chat` endpoint works for Flutter:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Stream<String>> sendMessage(List<Map<String, String>> messages) async {
  final request = http.Request(
    'POST',
    Uri.parse('https://bhagavadgita.io/api/chat'),
  );

  request.headers['Content-Type'] = 'application/json';
  // Add auth header if user is logged in
  // request.headers['Authorization'] = 'Bearer $token';

  request.body = jsonEncode({'messages': messages});

  final response = await http.Client().send(request);

  return response.stream
    .transform(utf8.decoder)
    .transform(const LineSplitter());
}
```

## Customization

### Change the Model

In `src/app/api/chat/route.ts`:

```typescript
import { gateway } from "@ai-sdk/gateway";

const result = streamText({
  model: gateway("openai/gpt-5"), // OpenAI GPT-5 via AI Gateway
  // model: gateway("xai/grok-3"),    // Alternative: xAI Grok
  // model: gateway("anthropic/claude-sonnet-4"), // Alternative: Claude
  // ...
});
```

### Adjust Rate Limits

In `src/lib/ratelimit.ts`:

```typescript
export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(20, "1 d"), // 20 per day
  // ...
});
```

### Modify Krishna's Personality

Edit `src/lib/ai/prompts.ts` to adjust how Krishna responds.

## Troubleshooting

### "Rate limit exceeded" / 429 errors

1. **Reset rate limits:**
   ```bash
   npx tsx scripts/reset-ratelimit.ts flush
   ```
2. **Restart dev server** to clear in-memory cache
3. **Verify environment variables** are set correctly:
   - `KV_REST_API_URL` (or `UPSTASH_REDIS_REST_URL`)
   - `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_TOKEN`)
4. **For development:** Set `NEXT_PUBLIC_NODE_ENV=development` in `.env.local` to disable rate limits entirely

### Rate limit not updating after sign-in

- Ensure `SUPABASE_SERVICE_ROLE_KEY` is set (used for token validation in API routes)
- The service role key has higher permissions than the anon key for validating auth tokens

### "Error retrieving context"

- Ensure pgvector extension is enabled in Supabase
- Run the ingestion script
- Check `match_gita_content` function exists

### Chat not streaming

- Ensure `OPENAI_API_KEY` or `AI_GATEWAY_API_KEY` is set
- Check browser console for errors
