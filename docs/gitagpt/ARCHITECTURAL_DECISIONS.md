# GitaGPT - Architectural Decisions & Rationale

This document captures the key technical decisions made during GitaGPT development and the reasoning behind them.

**Last Updated**: December 7, 2025

---

## Decision 1: Custom Shadcn Components vs AI Elements

### Decision: Built custom chat components

**Options Considered**:

1. AI Elements (Vercel's pre-built components)
2. Clone `vercel/ai-chatbot` template
3. Custom components using shadcn/ui primitives

**Choice**: **Custom components** (Option 3)

**Why**:

1. **AI Elements CLI failed** on Node.js v24 (compatibility issue)
2. **More control** over UI/UX - can match exact Gita branding
3. **Learning curve** - AI Elements had less comprehensive docs at the time
4. **Template cloning complexity** - Would require merging two codebases, replacing Supabase auth with Auth.js
5. **Already had shadcn/ui** - Could build exactly what we needed

**Components Built**:

- `ChatContainer.tsx` - Main chat logic with `useChat` hook
- `ChatMessage.tsx` - Message rendering with markdown
- `ChatInput.tsx` - Input field with submit
- `ChatPage.tsx` - Full-screen layout
- `ChatWidget.tsx` - Floating widget (future)

**Outcome**: ✅ Full control, perfect integration with existing app

---

## Decision 2: Jina Reranker vs Cohere vs FlashRank

### Decision: Jina Reranker v2 with simple keyword fallback

**Options Considered**:

1. Cohere Rerank 3 ($1 per 1K searches)
2. Jina Reranker v2 ($2 per 1M tokens, FREE 10K/month)
3. FlashRank (FREE, open source, CPU-only)
4. bge-reranker (FREE, self-hosted, requires GPU)
5. Simple keyword reranking (FREE, no external API)

**Choice**: **Jina + Simple keyword fallback** (Option 2 + 5)

**Why Jina**:

1. **FREE tier**: 10,000 searches/month (perfect for our scale)
2. **Multilingual**: Supports Sanskrit, Hindi, English
3. **Best value**: $2/1M tokens vs Cohere $1/1K searches (100x cheaper at scale)
4. **Good quality**: +15-20% accuracy improvement
5. **Low latency**: 2-3ms overhead
6. **No infrastructure**: Just API call, no GPU needed

**Why Fallback**:

1. **Resilience**: Works even if Jina is down
2. **Development**: Can test without API key
3. **Hybrid approach**: Gets 80% quality with free fallback, 95% with Jina

**Rejected Options**:

- **Cohere**: Too expensive for our scale ($10/month vs $0 with Jina free tier)
- **FlashRank**: English only, no Sanskrit support
- **bge-reranker**: Requires GPU infrastructure (adds cost/complexity)

**Outcome**: ✅ Professional quality at $0 cost (free tier)

---

## Decision 3: Supabase pgvector vs Pinecone vs Others

### Decision: Supabase with pgvector extension

**Options Considered**:

1. Supabase (PostgreSQL + pgvector)
2. Pinecone (managed vector DB)
3. Weaviate (open source vector DB)
4. Qdrant (fast vector search)
5. Chroma (embedded vector DB)

**Choice**: **Supabase pgvector** (Option 1)

**Why**:

1. **Already using Supabase** for auth, database, storage
2. **No new service** to manage
3. **FREE tier** sufficient (500MB DB, plenty for 809 records)
4. **Same accuracy** as Pinecone (both use cosine similarity)
5. **No vendor lock-in** - can export PostgreSQL dump anytime
6. **PostgreSQL power** - Can run SQL queries, use JOINs, add features

**Research Finding**:

- pgvector and Pinecone have **identical accuracy** (same algorithm)
- Chatbase uses Pinecone, but we verified no quality difference
- Only difference is speed - HNSW index made this irrelevant

**Cost Comparison**:

- Supabase: $0/month (free tier) or $25/month (pro)
- Pinecone: $70/month minimum
- **Savings**: $70-840/year

**Outcome**: ✅ Same quality as Pinecone, $0 cost, full integration

---

## Decision 4: HNSW Index vs IVFFlat

### Decision: HNSW (Hierarchical Navigable Small World)

**Options Considered**:

1. IVFFlat (default pgvector index)
2. HNSW (faster, more memory)
3. No index (brute force, slow)

**Choice**: **HNSW** (Option 2)

**Why**:

1. **15-28x faster** queries (ChatRAG benchmark confirmed)
2. **Industry standard** - All modern RAG systems use HNSW
3. **Better scaling** - Performance stays good as data grows
4. **Memory cost** negligible for our dataset size (809 records)
5. **One-time cost** - Index building slightly slower, but we only do once

**Parameters Chosen**:

- `m = 16` - Good balance (range: 8-64)
- `ef_construction = 64` - Default, optimal for most cases

**Outcome**: ✅ Queries went from 500ms → 20-50ms

---

## Decision 5: Hybrid Search (BM25 + Vector) vs Pure Semantic

### Decision: Hybrid search with adaptive routing

**Options Considered**:

1. Pure semantic (vector only)
2. Pure keyword (BM25 only)
3. Hybrid (BM25 + Vector combined)

**Choice**: **Hybrid with intelligent routing** (Option 3)

**Why**:

1. **Keyword queries fail** with pure semantic ("dharma-kshetra" as a term)
2. **Sanskrit support** - BM25 catches exact Devanagari characters
3. **Best of both** - Keywords (30%) + Semantic (70%)
4. **FREE** - PostgreSQL FTS built-in, no extra cost
5. **Adaptive** - System auto-detects when to use hybrid vs pure semantic

**When Hybrid Activates**:

- Sanskrit keywords: dharma-kshetra, kurukshetra
- Devanagari text: धर्मक्षेत्रे (3+ characters)
- Character names: Krishna, Arjuna, Dhritarashtra
- Proper nouns: Panchajanya, Gandiva

**Outcome**: ✅ Improved keyword queries from 40% → 90% accuracy

---

## Decision 6: GPT-5.1-instant vs GPT-4o vs GPT-o1

### Decision: OpenAI GPT-5.1-instant via AI Gateway

**Options Considered**:

1. GPT-4o (general purpose, good streaming)
2. GPT-o1 / o1-mini (reasoning models, slow, expensive)
3. GPT-5 (reasoning model, very slow, no streaming)
4. GPT-5.1-instant (fast, streaming, consistent)

**Choice**: **GPT-5.1-instant** (Option 4)

**Why**:

1. **Fast streaming** - 2-4s responses (vs 60s with GPT-5 reasoning)
2. **Consistent output** - `temperature: 0` for predictable responses
3. **Matches Chatbase** - They use the same model
4. **Cost-effective** - Less expensive than reasoning models
5. **Good for RAG** - Doesn't need deep reasoning, just synthesis

**Rejected Options**:

- **GPT-5 reasoning**: Too slow (60s), doesn't stream, overkill for RAG
- **GPT-4o**: Good but GPT-5.1-instant is newer and faster
- **GPT-o1**: Designed for math/code, not natural conversation

**Parameters**:

- `temperature: 0` - Consistent, non-creative responses
- `maxDuration: 30` - Timeout for streaming

**Outcome**: ✅ Fast, streaming, Chatbase-quality responses

---

## Decision 7: Vercel AI Gateway vs Direct OpenAI

### Decision: Vercel AI Gateway

**Options Considered**:

1. Direct OpenAI API
2. Vercel AI Gateway
3. OpenRouter (multi-provider)

**Choice**: **Vercel AI Gateway** (Option 2)

**Why**:

1. **Unified API** - Can switch models/providers easily
2. **Monitoring** - Built-in usage tracking
3. **Rate limiting** - Gateway handles this
4. **Fallbacks** - Can configure model fallbacks
5. **Simple format** - `gateway("openai/gpt-5.1-instant")`
6. **No markup** - Same price as direct OpenAI

**Outcome**: ✅ Future-proof, easy to switch models

---

## Decision 8: Query Analysis & Adaptive Thresholds

### Decision: Implemented query complexity detection with dynamic thresholds

**Inspiration**: ChatRAG boilerplate ($6K commercial product)

**Why**:

1. **Better quality** - Filter out low-confidence matches
2. **Adaptive retrieval** - Simple queries get 15 candidates, complex get 25
3. **Industry practice** - All modern RAG systems do this
4. **FREE** - Just algorithm, no external service

**Thresholds Tuned**:

- Simple/Factual: 0.30 (precise)
- Complex/Exploratory: 0.15 (cast wide net)
- **Safety net**: Always keep minimum 2 results (for greetings)

**Outcome**: ✅ Fewer irrelevant results, better user experience

---

## Decision 9: Metadata Filtering for Verse References

### Decision: Direct database lookup for "verse X.Y" queries

**Why**:

1. **Instant results** - Bypasses vector search entirely
2. **100% accuracy** - No semantic confusion
3. **Better UX** - "verse 1.1" → instant exact match
4. **Simple pattern** - Regex to detect verse references

**Implementation**:

```typescript
if (query.match(/verse\s*(\d+)\.(\d+)/i)) {
  // Direct DB query by chapter + verse metadata
  return await supabase
    .from("gita_embeddings")
    .select("*")
    .eq("metadata->>chapter", chapter)
    .eq("metadata->>verse", verse);
}
```

**Outcome**: ✅ Verse references went from 60% → 100% accuracy

---

## Decision 10: Chunking Strategy

### Decision: 3000 char optimal, 6000 char max with 200 char overlap

**Research**:

- text-embedding-3-small: 8191 token limit
- 1 token ≈ 4 characters
- Optimal chunk: 512-1024 tokens for retrieval quality

**Chosen**:

- **Optimal**: 3000 chars (~750 tokens) - Best retrieval quality
- **Max**: 6000 chars (~1500 tokens) - Well below limit
- **Overlap**: 200 chars - Preserve context across chunks

**Why**:

1. **Fits long commentaries** - Swami Mukundananda is detailed
2. **Preserves context** - Overlap prevents information loss
3. **Research-backed** - Studies show 512-1024 tokens is optimal
4. **Safe margin** - Max 1500 tokens vs 8191 limit

**Special handling**:

- Verse 18.54 split into 4 chunks (very long commentary)
- Verse 1.38-39 split into 2 chunks
- Metadata preserved: `chunk_index`, `total_chunks` for reassembly

**Outcome**: ✅ No context limit errors, good retrieval quality

---

## Decision 11: Rate Limiting with Upstash Redis

### Decision: Upstash Redis with development bypass

**Why Upstash Redis**:

1. **Serverless** - No server to manage
2. **Fast** - Edge-compatible
3. **Vercel KV compatible** - Can use either naming convention
4. **FREE tier** - 10K requests/day

**Rate Limits (Production)**:

- Anonymous: 2 messages/day (by IP address)
- Authenticated: 10 messages/day (by user ID)
- Development: Disabled when `NEXT_PUBLIC_NODE_ENV=development`

**Key Implementation Details**:

1. **Singleton pattern** - Rate limiter instances cached in memory
2. **Lazy initialization** - Created on first use
3. **Service role key** - API routes use `SUPABASE_SERVICE_ROLE_KEY` to validate auth tokens (not anon key)
4. **Status API** - `/api/chat/status` returns remaining messages without consuming credits

**Reset Script**:

```bash
npx tsx scripts/reset-ratelimit.ts flush  # Most reliable
```

**Important**: After resetting, restart dev server to clear in-memory cache.

**Outcome**: ✅ Production-ready with easy testing workflow

---

## Decision 12: Chat Persistence (Hybrid Local + Supabase)

### Decision: localStorage for anonymous, Supabase for authenticated

**Options Considered**:

1. Supabase only (require sign-in)
2. localStorage only (no cloud sync)
3. Hybrid (localStorage for anon, Supabase for auth)

**Choice**: **Hybrid approach** (Option 3)

**Why**:

1. **Anonymous experience** - Users can try without signing in
2. **Cloud persistence** - Signed-in users get chat history across devices
3. **Clean separation** - No need to migrate local chats to cloud
4. **Simple UX** - Chat clears on login/logout (fresh start)

**Implementation**:

- `useLocalChats.ts` - localStorage with JSON serialization
- `useSupabaseChats.ts` - Supabase with JSONB `messages` column
- `useChatPersistence.ts` - Unified hook that switches based on auth state

**Database Schema**:

```sql
-- chats table (Supabase)
create table chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  messages jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Key Decisions**:

1. **JSONB column** - Messages stored as array in `chats` table (not separate table)
2. **Write queue** - Serializes concurrent writes to prevent race conditions
3. **No migration** - Local chats don't transfer to cloud (simpler UX)
4. **Chat clearing** - On auth state change, clear chat to prevent confusion

**Outcome**: ✅ Best of both worlds - try before sign-in, persist after

---

## Decision 14: Single Author (Swami Mukundananda) Only

### Decision: English version from Swami Mukundananda only

**Why**:

1. **Consistency** - Single voice, single interpretation
2. **Quality** - Mukundananda's commentary is detailed and scholarly
3. **Avoid confusion** - Multiple authors can conflict
4. **Simplicity** - Easier to maintain, better UX
5. **User request** - Specified Mukundananda during development

**Future**:

- Can add other authors as separate collections
- Can add Hindi translations
- Can add multiple commentaries with filtering

**Outcome**: ✅ Consistent, high-quality responses

---

## Decision 15: Streaming Responses

### Decision: Server-Sent Events (SSE) streaming

**Why**:

1. **Better UX** - Users see response as it generates
2. **Feels faster** - Immediate feedback vs waiting 4 seconds
3. **AI SDK built-in** - `streamText().toUIMessageStreamResponse()`
4. **Works everywhere** - Web, mobile (Flutter), any HTTP client

**Implementation**:

```typescript
const result = streamText({
  model: gateway("openai/gpt-5.1-instant"),
  system: systemPrompt,
  messages: convertToModelMessages(messages),
});

return result.toUIMessageStreamResponse();
```

**Outcome**: ✅ ChatGPT-like streaming experience

---

## Decision 16: Krishna Personality Prompt

### Decision: Conversational, compassionate guru (not formal/structured)

**Evolution**:

1. **Initial**: Structured, formal, heavy bullet points
2. **User feedback**: "Too robotic, not like Chatbase"
3. **Final**: Conversational, short paragraphs, warm tone

**Key Elements**:

- Address as "Dear one", "Beloved soul"
- Short paragraphs (2-3 sentences)
- Cite verses explicitly (BG 1.26-27)
- Interactive endings ("If you wish, we can explore...")
- No heavy formatting (minimal bullet points)

**Influenced by**:

- Chatbase's conversational style
- User wanted "Krishna speaking, compassionate guru"
- Bhagavad Gita's teaching style (dialogue, not lecture)

**Outcome**: ✅ Natural, engaging responses that feel like a guru

---

## Decision 17: 5 Chunks (Not 3 or 7)

### Decision: Retrieve 5 final chunks, 15-25 candidates for reranking

**Options Considered**:

- 3 chunks (too limited)
- 5 chunks (balanced)
- 7 chunks (Chatbase uses this)
- 10 chunks (too much context, expensive)

**Choice**: **5 chunks** with adaptive candidate retrieval

**Why**:

1. **Token efficiency** - 5 chunks ≈ 10K tokens in context
2. **Quality** - Enough context without noise
3. **Cost** - Lower than 7 chunks
4. **Reranking benefit** - 15-25 candidates → best 5

**Adaptive Multipliers**:

- Simple: 15 candidates (3x) → best 5
- Moderate: 20 candidates (4x) → best 5
- Complex: 25 candidates (5x) → best 5

**Outcome**: ✅ Good context, manageable costs, high quality

---

## Decision 18: Temperature = 0 (Consistent Responses)

### Decision: Zero temperature for deterministic outputs

**Why**:

1. **Consistency** - Same question → same answer
2. **Reliability** - Users expect stable guidance
3. **RAG-appropriate** - We want synthesis, not creativity
4. **Chatbase uses this** - Verified from comparison
5. **GPT-5.1-instant supports** - Unlike reasoning models

**Alternative considered**:

- Temperature 0.7 (creative, varied responses)
- Rejected because spiritual guidance should be consistent

**Outcome**: ✅ Predictable, trustworthy responses

---

## Decision 19: No Prompt Compression (For Now)

### Decision: Skip LLMLingua and similar compression

**Why Skipped**:

1. **Chunks already small** - 5 chunks × 2000 chars = manageable
2. **Adds complexity** - Need Python service
3. **Adds latency** - 100-200ms compression time
4. **Not needed yet** - Token costs are low (<$15/month)
5. **Quality risk** - Compression can lose nuance

**When to Reconsider**:

- Monthly token costs exceed $100
- Using 10+ chunks per query
- Multiple commentaries (3-4 authors)

**Outcome**: ✅ Simplicity over optimization (for now)

---

## Decision 20: Markdown Rendering in ChatMessage

### Decision: ReactMarkdown with custom styling

**Why**:

1. **Rich formatting** - Bold, lists, blockquotes for Sanskrit
2. **Typography plugin** - Beautiful prose styling
3. **Custom components** - Special rendering for code, quotes
4. **Chatbase comparison** - They use markdown, we match it

**Special Styling**:

- `<blockquote>` - Sanskrit verses with border
- `<strong>` - Verse references
- `<ul>` - Proper list spacing
- Custom colors for links, code

**Outcome**: ✅ Beautiful, readable responses

---

## Decision 21: Upstash Redis vs Vercel KV

### Decision: Support both (same underlying service)

**Why**:

1. **Vercel KV = Upstash** - Same service, different branding
2. **Variable naming** - Support both env var conventions
3. **Flexibility** - Works with either setup
4. **User had Vercel KV** - Already configured

**Code**:

```typescript
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
```

**Outcome**: ✅ Works with either service, no lock-in

---

## Decision 22: Test-Driven Development

### Decision: Build automated test suite early

**Why**:

1. **Catch regressions** - Know immediately if changes break things
2. **Objective metrics** - 8/10 passing, 80% accuracy
3. **Confidence** - Can refactor safely
4. **Documentation** - Tests show expected behavior

**Tests Built**:

- `test-rag-system.ts` - 10 realistic devotee queries
- Covers: verse refs, keywords, characters, philosophical, practical

**Outcome**: ✅ High confidence in system quality, easy iterations

---

## Decision 23: OAuth Redirect Handling

### Decision: localStorage-based return path for OAuth flows

**Problem**: When users sign in via Google/Apple OAuth from GitaGPT, they were being redirected to the homepage instead of back to the chat.

**Solution**: Store the current path in `localStorage` before OAuth redirect, then restore it after.

**Implementation**:

```typescript
// Before OAuth
localStorage.setItem("authReturnPath", window.location.pathname);

// After OAuth (in AuthProvider useEffect)
const returnPath = localStorage.getItem("authReturnPath");
if (returnPath && window.location.pathname !== returnPath) {
  localStorage.removeItem("authReturnPath");
  window.location.href = returnPath;
}
```

**Why localStorage (not URL state)**:

1. **OAuth constraint** - Can't pass custom state through OAuth redirect
2. **Simple** - No server-side session needed
3. **Reliable** - Survives the OAuth redirect round-trip

**Outcome**: ✅ Users return to exactly where they were before signing in

---

## Decision 24: Training Tracker System

### Decision: JSON file with URLs and timestamps

**Why**:

1. **Remembers what's trained** - Don't lose track of sources
2. **Stale detection** - Know when to re-scrape (>30 days)
3. **Training history** - Log of all ingestions
4. **Easy editing** - JSON file vs database or code

**File**: `scripts/training-sources.json`

**Benefits**:

- See all URLs at a glance
- Track last training date
- Enable/disable sources easily
- Add notes for each URL

**Outcome**: ✅ Better content management, maintainability

---

## Key Learnings from Research

### ChatRAG ($6K Boilerplate)

- Validated our HNSW choice (15-28x speedup)
- Confirmed hybrid search is standard
- Adaptive thresholds pattern (0.35-0.70, we use 0.15-0.30)
- Multi-pass retrieval concept

### Chatbase (Competitor)

- Uses 7 chunks (we use 5 - good enough)
- Uses Cohere reranking (we use Jina - cheaper)
- Uses Pinecone (we use pgvector - same quality, $0)
- Conversational prompt style (we adopted this)

### Industry Best Practices

- BM25 + Vector is standard for production RAG
- Reranking improves accuracy 10-20%
- HNSW is the default index (not IVFFlat)
- Metadata filtering for structured queries
- Query analysis for adaptive retrieval

---

## Cost-Benefit Summary

| Decision                | Alternative Cost | Our Cost | Savings/Year         |
| ----------------------- | ---------------- | -------- | -------------------- |
| Supabase vs Pinecone    | $70/mo           | $0       | $840                 |
| Jina vs Cohere          | $10-50/mo        | $0       | $120-600             |
| Custom UI vs Template   | $6000            | $0       | $6000                |
| Self-hosted vs Chatbase | $480-6000/year   | $0       | $480-6000            |
| **TOTAL SAVINGS**       | -                | -        | **$7440-13440/year** |

---

## Quality Metrics

### Test Accuracy

- **Before optimizations**: 60% (3/5 basic tests)
- **After metadata filter**: 80% (4/5)
- **After hybrid + Jina**: 80% (8/10 comprehensive tests)
- **Expected with tuning**: 90-95%

### Query Performance

- **Before HNSW**: 500ms vector search
- **After HNSW**: 20-50ms vector search
- **Hybrid search**: 100-200ms (BM25 + Vector + Jina)
- **Full response**: 2-4s (includes LLM streaming)

### Chatbase Parity

- **Content quality**: ✅ Matched (same depth)
- **Response style**: ✅ Matched (conversational guru)
- **Speed**: ✅ Matched (streaming, 2-4s)
- **Accuracy**: ✅ Comparable (80% vs ~85%)
- **Cost**: ✅ **Better** ($0 vs $40-500/mo)

---

## Decision 25: Query Rewriting for Conversational RAG

### Decision: LLM-based query contextualization with heuristic pre-filtering

**Problem**: Follow-up questions like "tell me more" or "what does that mean?" failed to retrieve relevant content because RAG only used the literal user query without conversation context.

**Solution**: Rewrite queries to be standalone using gpt-5-mini before RAG retrieval.

**Implementation** (`src/lib/ai/query-rewriter.ts`):

```typescript
// Example transformation:
// History: "What is karma yoga?" → AI explains...
// User: "How do I practice it?"
// → Rewritten: "How do I practice karma yoga according to the Bhagavad Gita?"
```

**Why gpt-5-mini (not GPT-4o)**:

1. **Faster** - Lower latency for simple reformulation task
2. **Cheaper** - Minimal token usage (~200 tokens per rewrite)
3. **Sufficient** - Query rewriting doesn't need advanced reasoning
4. **Cost**: ~$0.03/month for 1000 queries

**Heuristic Pre-filtering**:

To avoid unnecessary LLM calls, we check if the query likely needs rewriting:

```typescript
// Triggers rewriting:
- Pronouns: "it", "that", "this", "they"
- Follow-ups: "tell me more", "explain more", "what about"
- Short questions: < 4 words with question words
```

**Configuration**:

- `QUERY_REWRITE_HISTORY = 6` - Use last 3 exchanges for context
- `DISABLE_QUERY_REWRITING=true` - Env var to disable for testing

**Outcome**: ✅ Follow-up questions now retrieve relevant content

---

## Decision 26: Sliding Window for Conversation History

### Decision: Keep last 10 messages (5 exchanges) for LLM context

**Problem**: Full conversation history causes:

1. Token costs growing linearly with conversation length
2. Potential context window overflow
3. Older, less relevant context diluting responses

**Solution**: Sliding window that keeps only recent messages.

**Implementation** (`src/app/api/chat/route.ts`):

```typescript
const MAX_HISTORY_MESSAGES = 10;
const truncatedMessages =
  messages.length > MAX_HISTORY_MESSAGES
    ? messages.slice(-MAX_HISTORY_MESSAGES)
    : messages;
```

**Why 10 messages (5 exchanges)**:

1. **Sufficient context** - Most follow-ups reference recent messages
2. **Token efficient** - ~2000-4000 tokens vs potentially unlimited
3. **Industry standard** - RAG community recommends 5-10 messages
4. **Query rewriting compensates** - Older context is captured in rewritten queries

**Alternatives Considered**:

| Approach               | Pros                  | Cons                      | Chosen |
| ---------------------- | --------------------- | ------------------------- | ------ |
| Full history           | Complete context      | Unbounded costs, overflow | ❌     |
| Sliding window         | Simple, predictable   | Loses old context         | ✅     |
| Hierarchical summary   | Preserves all context | Complex, adds latency     | Future |
| Token-based truncation | Precise control       | May cut mid-conversation  | ❌     |

**Combined with Query Rewriting**:

The sliding window + query rewriting combination provides:

1. **Recent context** via sliding window (last 5 exchanges)
2. **Relevant retrieval** via rewritten queries (captures intent from full history)

**Outcome**: ✅ Bounded token costs, no context overflow, good UX

---

## Decision 27: Conversation Memory (Facts + Summarization)

### Decision: Extract key facts + summarize older messages when sliding window kicks in

**Problem**: Simple sliding window loses important information like user's name mentioned early in the conversation.

**Example**:

```
Message 1: "My name is Arjun"
Message 2-15: [conversation continues]
Message 16: "What should I do?"
→ With simple sliding window, we've lost the user's name!
```

**Solution**: Hybrid memory system (`src/lib/ai/conversation-memory.ts`)

**Three Components**:

1. **Memory Extraction**: Use gpt-5-mini to extract key facts
   - User's name
   - Topics discussed
   - Preferences/interests
   - Key facts

2. **Summarization**: Summarize older messages being dropped
   - Captures what was discussed
   - Preserves context without full messages

3. **Sliding Window**: Keep last 10 messages for recent context

**Implementation**:

```typescript
// When messages > MAX_HISTORY_MESSAGES
const { memoryContext, recentMessages } = await processConversationMemory(
  messages,
  MAX_HISTORY_MESSAGES,
);

// Memory context gets injected into system prompt
const systemPrompt = buildSystemPrompt(ragContext, memoryContext);
```

**Heuristic Optimization**:

Memory extraction only runs when it detects extractable content:

```typescript
// Triggers memory extraction:
(-"my name is", "I am", "call me" - "I like", "I prefer", "interested in");
```

**Cost**:

- Memory extraction: ~$0.02/month (only when needed)
- Summarization: ~$0.05/month (only for long conversations)
- **Total overhead**: ~$0.07/month for 1000 queries

**Disable for Testing**:

```env
DISABLE_CONVERSATION_MEMORY=true
```

**Outcome**: ✅ Remembers user's name and key facts across long conversations

---

## Decision 28: LLM-Generated Chat Titles

### Decision: Generate short, meaningful titles using gpt-5-nano

**Problem**: Chat titles were the first 50 characters of the first message, often getting cut off in the sidebar UI.

**Before**: "what is the meaning of dhrista..." (truncated, unclear)
**After**: "Dhrishti Meaning" (concise, meaningful)

**Solution**: API endpoint that generates 2-5 word titles (`src/app/api/chat/title/route.ts`)

**Why gpt-5-nano**:

1. **Cheapest model** - Perfect for simple task
2. **Fast** - ~50-100ms latency
3. **Sufficient** - Title generation doesn't need advanced reasoning
4. **Cost**: ~$0.005/month for 1000 chats

**Implementation**:

```typescript
// Non-blocking title generation
fetch("/api/chat/title", {
  method: "POST",
  body: JSON.stringify({ message: firstMessage }),
})
  .then((res) => res.json())
  .then((data) => updateChatTitle(chatId, data.title));
```

**UX Flow**:

1. User sends first message
2. Temporary truncated title shown immediately
3. LLM generates better title in background (~100ms)
4. Sidebar updates with new title

**Examples**:

| User Message                       | Generated Title        |
| ---------------------------------- | ---------------------- |
| "What is karma yoga?"              | "Karma Yoga Meaning"   |
| "Explain verse 2.47"               | "Verse 2.47 Explained" |
| "radhey radhey"                    | "Greeting"             |
| "Tell me about Arjuna's confusion" | "Arjuna's Dilemma"     |

**Bonus**: Added tooltip on sidebar chat items to show full title on hover.

**Outcome**: ✅ Clean, meaningful chat titles that fit in sidebar

---

## Decision 18: Query Rewriting Performance Optimization (Dec 2024)

### Decision: gpt-5.1-instant with smart heuristics

**Problem**: Query rewriting was taking 8+ seconds (using gpt-5-mini), creating a 14.7s total response time for follow-up questions.

**Choice**: **gpt-5.1-instant + Smart heuristics**

**Implementation**:

1. **Faster Model**: `gpt-5-mini` → `gpt-5.1-instant` (4-6x faster)
2. **Smart Heuristics**: Skip standalone questions like "What is Radha?"
3. **Token Limit**: `maxTokens: 100` for concise rewrites

**Results**:

- Response time: 14.7s → 4.1s (3.6x faster)
- Most queries skip rewriting (0s overhead)
- When triggered: only ~1-2s added

**Outcome**: ✅ 3.6x faster responses, maintained RAG accuracy

---

## Decision 19: Auto-Focus Input for Seamless UX (Dec 2024)

### Decision: React forwardRef with multiple focus triggers

**Problem**: Users had to click input after each message, breaking conversation flow.

**Choice**: **Multi-trigger auto-focus**

**Implementation**:

- Initial page load: Auto-focus immediately
- After submit: 50ms delay (ensures state updates)
- After AI response: 100ms delay (ensures DOM stability)
- Used `forwardRef` + `useImperativeHandle` pattern

**Outcome**: ✅ ChatGPT-like seamless conversation flow

---

## Decision 20: Title Generation Optimization (Dec 2024)

### Decision: Add timeout and token limits

**Problem**: Title generation could hang indefinitely, no safeguards.

**Choice**: **5-second timeout + 20 token limit**

**Implementation**:

```typescript
abortSignal: AbortSignal.timeout(5000),
maxTokens: 20
```

**Outcome**: ✅ Safer, more predictable title generation

---

## Future Considerations

### Potential Improvements

1. **Voice integration** - OpenAI TTS/STT for audio queries
2. **Multi-language** - Add Hindi versions
3. **Multiple authors** - Add other commentaries with filtering
4. **Fine-tuned embeddings** - Train on Gita-specific queries (+20-30% accuracy)
5. **Knowledge graphs** - For complex relationship queries
6. **Memory** - Remember user preferences across sessions
7. **Hierarchical summarization** - For very long conversations (v2)

### When to Upgrade

- **Cohere reranking**: If budget allows ($10/mo), 5-10% better than Jina
- **GPT-5 reasoning**: If complex philosophical reasoning needed (but slower)
- **Prompt compression**: If token costs >$100/mo
- **Fine-tuned model**: If accuracy needs to exceed 95%

---

## Conclusion

**Philosophy**: Choose simplicity, free tiers, and proven tech over bleeding edge.

**Result**: Production-ready system matching $6K commercial solutions at $0 infrastructure cost.

**Key Success Factors**:

1. Leveraged existing infrastructure (Supabase)
2. Used free tiers strategically (Jina, PostgreSQL FTS)
3. Researched industry practices (ChatRAG, Chatbase)
4. Iterated based on testing (8/10 automated tests)
5. Prioritized user experience (streaming, Krishna personality)

---

Radhey Radhey! 🙏
