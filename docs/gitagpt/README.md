# GitaGPT - Custom RAG Chatbot Documentation

## 📚 Documentation Index

### Quick Start

- **[Complete Guide](COMPLETE_GUIDE.md)** - Everything you need (architecture, setup, deployment)
- **[Ingestion Guide](INGESTION_GUIDE.md)** - Data sources (JSON, websites, selective updates)

### Technical Details

- **[Setup Guide](GITAGPT_SETUP.md)** - Environment variables, database setup
- **[Hybrid Search & Reranking](HYBRID_SEARCH_RERANKING.md)** - Advanced RAG techniques (578 lines)

---

## System Overview

**Status**: ✅ Production-ready (8/10 tests, 80% accuracy)

**Data**: 809 records (18 chapters, all Bhagavad Gita verses)

**Tech Stack**:

- Supabase (pgvector + HNSW)
- Vercel AI SDK v5
- GPT-5.1-instant (main LLM, query rewriting)
- gpt-5-mini (conversation memory, summarization)
- gpt-5-nano (chat titles)
- Jina Reranker v2 (FREE)
- PostgreSQL FTS (BM25)

**Key Features**:

- ✅ RAG with hybrid search (BM25 + Vector)
- ✅ Query rewriting for follow-up questions (smart heuristics)
- ✅ Conversation memory (remembers user's name, topics)
- ✅ LLM-generated chat titles (async, non-blocking)
- ✅ Sliding window for long conversations
- ✅ Auto-focus input for seamless UX

**Cost**: ~$0.15/month (mostly free tiers)

---

## Quick Commands

```bash
# Data ingestion
npm run ingest:gita          # All 18 chapters
npm run ingest:web           # Website pages
npm run ingest:chapter -- 5  # Re-index Chapter 5

# Testing
npx tsx scripts/test-rag-system.ts  # Automated tests
npm run dev                         # Manual testing

# Rate Limit Management
npx tsx scripts/reset-ratelimit.ts         # Reset all rate limits
npx tsx scripts/reset-ratelimit.ts flush   # ⚠️ Flush entire Redis (most reliable)
npx tsx scripts/reset-ratelimit.ts anon    # Reset anonymous only
npx tsx scripts/reset-ratelimit.ts auth    # Reset authenticated only

# Deployment
vercel deploy
```

**💡 Development Mode:** Rate limiting is automatically disabled when `NEXT_PUBLIC_NODE_ENV=development`

**💡 After resetting rate limits:** Restart your dev server to clear in-memory cache

---

## Feature Toggles

Control features via environment variables:

```env
DISABLE_QUERY_REWRITING=true      # Disable query contextualization
ENABLE_CONVERSATION_MEMORY=true   # Enable memory extraction (disabled by default - adds latency)
```

**Note**: Conversation memory is **disabled by default** because it adds 15-25 seconds latency per message. Query rewriting captures most of the context value without the overhead.

---

## Configuration

### Dataset Path

Edit `scripts/ingest-config.ts`:

```typescript
export const DATA_PATH = "/your/path/to/gita-data";
```

### Website URLs

```typescript
urls: ["https://bhagavadgita.io/about", "https://bhagavadgita.io/faq"];
```

---

Radhey Radhey! 🙏
