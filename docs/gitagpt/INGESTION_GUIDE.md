# GitaGPT Ingestion Guide - Flexible Data Sources

## Overview

The ingestion system now supports multiple data sources and update modes:

✅ **JSON files** (Gita verses from Flutter app)
✅ **Website pages** (scraping and indexing)
✅ **Custom content** (text/markdown files)
✅ **Selective updates** (re-index specific chapters)

---

## Quick Start

### 0. Check Training Status

```bash
npm run ingest:status
```

**Shows**:
- Last training date for each source
- Stale sources (>30 days old)
- Training history
- Configured URLs

### 1. Full Gita (All 18 Chapters)

```bash
npm run ingest:gita
```

**What it does**:
- Indexes all 18 chapters (~809 records)
- Swami Mukundananda English version
- Takes 5-10 minutes

### 2. Website Pages

**Add URLs** in `scripts/training-sources.json`:
```json
{
  "sources": {
    "website_pages": {
      "enabled": true,
      "urls": [
        {
          "url": "https://bhagavadgita.io/about",
          "title": "About Bhagavad Gita",
          "enabled": true,
          "last_trained": null
        },
        {
          "url": "https://bhagavadgita.io/faq",
          "title": "FAQ",
          "enabled": true,
          "last_trained": null
        }
      ]
    }
  }
}
```

**Then run**:
```bash
# Configure to use website pages
# Edit scripts/ingest-config.ts:
export const DEFAULT_CONFIG = WEBSITE_PAGES_CONFIG;

# Scrape and index
npm run ingest:web
```

**Timestamps auto-updated** in `training-sources.json`!

### 3. Re-index Specific Chapter

```bash
npm run ingest:chapter -- 2  # Re-index Chapter 2
npm run ingest:chapter -- 5  # Re-index Chapter 5
```

**What it does**:
- Deletes all existing Chapter X records
- Re-ingests fresh data
- Useful after updating commentary

---

## Configuration System

### File: `scripts/ingest-config.ts`

**Presets Available**:

1. **FULL_GITA_CONFIG** - All 18 chapters
2. **CHAPTER_1_CONFIG** - Chapter 1 only (testing)
3. **WEBSITE_PAGES_CONFIG** - Website scraping
4. **REPLACE_CHAPTER_CONFIG(n)** - Re-index chapter n
5. **ADD_WEBSITE_CONFIG** - Add pages, keep verses
6. **REPLACE_WEBSITE_CONFIG(urls)** - Re-scrape specific URLs

**Switch presets**:
```typescript
// In ingest-config.ts:
export const DEFAULT_CONFIG = FULL_GITA_CONFIG;  // Current
// export const DEFAULT_CONFIG = WEBSITE_PAGES_CONFIG;  // Switch to this
```

---

## Update Modes

### Append (Default)
```typescript
update_mode: "append"
```
- Adds new content only
- Keeps all existing records
- **Use for**: Initial ingestion, adding new chapters

### Replace
```typescript
update_mode: "replace",
replace_filters: {
  chapters: [2],  // Delete Chapter 2
  authors: [22],  // Delete this author
  types: ["page_content"],  // Delete all pages
}
```
- Deletes matching records first
- Then adds new content
- **Use for**: Re-indexing after updates, fixing errors

### Merge (Future)
```typescript
update_mode: "merge"
```
- Updates existing if found (by chapter/verse)
- Adds new if not found
- **Use for**: Smart updates without duplicates

---

## Website Scraping

### Basic Usage

1. **Configure URLs** in `ingest-config.ts`:
```typescript
urls: [
  "https://bhagavadgita.io/about",
  "https://bhagavadgita.io/faq",
  "https://bhagavadgita.io/introduction",
]
```

2. **Run**:
```bash
npm run ingest:web
```

### Advanced Selectors

**Customize content extraction**:
```typescript
selectors: {
  title: "h1.main-title",        // Page title selector
  content: "article.content",     // Main content area
  exclude: [                      // Elements to remove
    "nav",
    "footer",
    ".sidebar",
    ".comments",
    ".ads"
  ]
}
```

### What Gets Scraped

**For each URL**:
```typescript
{
  url: "https://bhagavadgita.io/about",
  title: "About Bhagavad Gita",
  content: "# About\n\nThe Bhagavad Gita...",
  metadata: {
    type: "page_content",
    url: "...",
    title: "...",
    scraped_at: "2025-12-04T10:30:00Z",
    source: "website"
  }
}
```

---

## Selective Re-indexing

### Re-index Single Chapter

**Scenario**: Chapter 2 commentary was updated

```bash
# Delete Chapter 2 records
npm run ingest:chapter -- 2

# Then update TEST_MAX_CHAPTERS in ingest-gita-content.ts
TEST_MAX_CHAPTERS = 2

# Run ingestion
npm run ingest:gita
```

**Or use config**:
```typescript
import { REPLACE_CHAPTER_CONFIG } from "./ingest-config";

const config = REPLACE_CHAPTER_CONFIG(2);
await ingest(config);
```

### Re-scrape Website Pages

**Scenario**: Website FAQ was updated

```typescript
import { REPLACE_WEBSITE_CONFIG } from "./ingest-config";

const config = REPLACE_WEBSITE_CONFIG([
  "https://bhagavadgita.io/faq"
]);
await ingest(config);
```

**What happens**:
1. Deletes records where `metadata.url = "https://bhagavadgita.io/faq"`
2. Re-scrapes the URL
3. Adds fresh content

---

## Examples

### Example 1: Add Website Pages Without Touching Verses

```typescript
// ingest-config.ts
export const DEFAULT_CONFIG = {
  sources: {
    gita_json: { enabled: false },  // Don't touch verses
    website_pages: {
      enabled: true,
      urls: [
        "https://bhagavadgita.io/about",
        "https://bhagavadgita.io/faq",
      ]
    },
  },
  update_mode: "append",  // Just add, don't delete
};
```

```bash
npm run ingest:web
```

### Example 2: Replace Chapter 5 Only

```typescript
// ingest-config.ts
export const DEFAULT_CONFIG = REPLACE_CHAPTER_CONFIG(5);
```

```bash
npm run ingest:gita
```

### Example 3: Mixed Update

```typescript
// ingest-config.ts
export const DEFAULT_CONFIG = {
  sources: {
    gita_json: {
      enabled: true,
      chapters: [10, 11, 12],  // Only these chapters
    },
    website_pages: {
      enabled: true,
      urls: ["https://bhagavadgita.io/about"]
    },
  },
  update_mode: "replace",
  replace_filters: {
    chapters: [10, 11, 12],  // Delete these first
    urls: ["https://bhagavadgita.io/about"]  // Delete this page
  },
};
```

---

## Database Cleanup

### Delete All Records

```sql
-- In Supabase SQL Editor
TRUNCATE gita_embeddings;
```

### Delete Specific Content

```sql
-- Delete Chapter 5
DELETE FROM gita_embeddings 
WHERE metadata->>'chapter' = '5';

-- Delete all website pages
DELETE FROM gita_embeddings 
WHERE metadata->>'type' = 'page_content';

-- Delete specific author
DELETE FROM gita_embeddings 
WHERE metadata->>'author_id' = '22';
```

---

## File Structure

```
scripts/
├── ingest-gita-content.ts      # Original (Gita JSON only)
├── ingest-config.ts            # Configuration presets
├── ingest-flexible.ts          # Multi-source ingestion
├── ingest-specific-chapter.ts  # Re-index helper
└── web-scraper.ts              # HTML scraping utilities
```

---

## Common Workflows

### Workflow 1: Initial Setup
```bash
# 1. Index all Gita verses
npm run ingest:gita

# 2. Add website pages
# Edit ingest-config.ts → Set DEFAULT_CONFIG = ADD_WEBSITE_CONFIG
npm run ingest:web
```

### Workflow 2: Update Commentary
```bash
# 1. Get updated JSON file with new commentary
# 2. Delete old chapter
npm run ingest:chapter -- 3

# 3. Re-ingest
# Update ingest-gita-content.ts: TEST_MAX_CHAPTERS = 3
npm run ingest:gita
```

### Workflow 3: Refresh Website Content
```bash
# Edit ingest-config.ts:
export const DEFAULT_CONFIG = REPLACE_WEBSITE_CONFIG([
  "https://bhagavadgita.io/faq"
]);

# Run
npm run ingest:web
```

---

## Troubleshooting

### "cheerio is not defined"

```bash
npm install cheerio
```

### Website Scraping Fails

**Check**:
1. URL is accessible (CORS, auth, etc.)
2. Content selectors are correct
3. Page has loaded (not SPA needing JS)

**Debug**:
```typescript
const page = await scrapePage(url, {
  content: "body"  // Try simplest selector first
});
console.log(page?.content.substring(0, 500));  // Check what was extracted
```

### Duplicate Records

**If using append mode**, duplicates can occur. Fix:

```bash
# Option A: Delete all, re-ingest
TRUNCATE gita_embeddings;
npm run ingest:gita

# Option B: Delete specific duplicates
DELETE FROM gita_embeddings 
WHERE id NOT IN (
  SELECT MIN(id) 
  FROM gita_embeddings 
  GROUP BY metadata->>'chapter', metadata->>'verse', metadata->>'author_id'
);
```

---

## Future Enhancements

### Planned:
- [ ] YouTube video transcripts
- [ ] PDF document ingestion
- [ ] Google Docs integration
- [ ] Automatic duplicate detection
- [ ] Incremental updates (only changed content)
- [ ] Multiple language support (Hindi, Sanskrit)

---

Radhey Radhey! 🙏

