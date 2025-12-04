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
- GPT-5.1-instant
- Jina Reranker v2 (FREE)
- PostgreSQL FTS (BM25)

**Cost**: $0/month (all free tiers)

---

## Quick Commands

```bash
# Data ingestion
npm run ingest:gita          # All 18 chapters
npm run ingest:web           # Website pages  
npm run ingest:chapter -- 5  # Re-index Chapter 5

# Testing
npx tsx scripts/test-rag-system.ts  # Automated tests
npm run dev                         # Manual testing (rate limiting disabled)

# Deployment
vercel deploy
```

**💡 Development Mode:** Rate limiting is automatically disabled when `NEXT_PUBLIC_NODE_ENV=development`

---

## Configuration

### Dataset Path

Edit `scripts/ingest-config.ts`:

```typescript
export const DATA_PATH = "/your/path/to/gita-data";
```

### Website URLs

```typescript
urls: [
  "https://bhagavadgita.io/about",
  "https://bhagavadgita.io/faq",
]
```

---

Radhey Radhey! 🙏
