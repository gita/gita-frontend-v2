# Data Sync Architecture

> Cross-platform data synchronization strategy for Bhagavad Gita web and mobile applications.

## Overview

This document outlines the architecture for keeping data synchronized between the web (Next.js) and mobile (Flutter) applications while optimizing for performance, SEO, and cost.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     GITA CONTENT                             │
│              (verses, translations, commentaries)            │
├─────────────────────────────────────────────────────────────┤
│  Web:    Static pages at build time from JSON files         │
│  Mobile: Remote JSON (Supabase Storage) + local cache       │
│  Update: Change JSON → rebuild web / mobile re-fetches      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      USER DATA                               │
│              (bookmarks, notes, read progress, chats)        │
├─────────────────────────────────────────────────────────────┤
│  Web:    Supabase client directly                           │
│  Mobile: SharedPrefs (offline) + Supabase sync              │
│  Sync:   Both platforms use same Supabase tables            │
└─────────────────────────────────────────────────────────────┘
```

## Key Decisions

| Decision        | Choice                      | Reason                                     |
| --------------- | --------------------------- | ------------------------------------------ |
| GraphQL         | Dropped                     | Overkill for read-only scripture content   |
| Content storage | Static JSON files           | Fast CDN delivery, SEO-friendly, free      |
| User data sync  | Direct Supabase             | Simple, already implemented                |
| Mobile offline  | SharedPrefs + Supabase sync | Current approach works well                |
| Verse IDs       | `chapter.verse` format      | Consistent across platforms (e.g., "2.47") |

## Cost Analysis

| Before                            | After                 |
| --------------------------------- | --------------------- |
| Hasura ~$99/mo + Supabase ~$25/mo | Supabase ~$25/mo only |
| **~$124/month**                   | **~$25/month**        |

**Savings: ~$100/month** by dropping Hasura/GraphQL

---

## Content Architecture

### Why Static JSON?

1. **Gita content rarely changes** - perfect for static generation
2. **SEO benefits** - fully pre-rendered HTML pages
3. **Performance** - served from CDN (~10ms response)
4. **Cost** - no database queries, no egress charges
5. **Simplicity** - no GraphQL complexity

### URL Structure

Static pages generated for all language/author/verse combinations:

```
/en/swami-mukundananda/chapter/2/verse/47
/en/swami-sivananda/chapter/2/verse/47
/hi/swami-ramsukhdas/chapter/2/verse/47
/hi/swami-mukundananda/chapter/2/verse/47
...
```

This creates thousands of unique, crawlable pages for SEO.

### JSON File Structure

```
/public/data/
├── index.json              # Languages, authors metadata
├── chapters.json           # Chapter list with summaries
├── common/
│   ├── common_en.json      # English verses (sanskrit, transliteration)
│   ├── common_hi.json      # Hindi verses
│   ├── common_gu.json      # Gujarati verses
│   └── ...
└── authors/
    ├── author_1_hi.json    # Swami Ramsukhdas (Hindi)
    ├── author_16_en.json   # Swami Sivananda (English)
    ├── author_22_en.json   # Swami Mukundananda (English)
    ├── author_22_hi.json   # Swami Mukundananda (Hindi)
    └── ...
```

### Static Page Generation (Next.js)

```tsx
// app/[lang]/[author]/chapter/[chapter]/verse/[verse]/page.tsx

export async function generateStaticParams() {
  const index = await import("@/public/data/index.json");
  const chapters = await import("@/public/data/chapters.json");

  const params = [];
  for (const lang of index.languages) {
    const authors = index.language_authors[lang.code];
    const allAuthors = [
      ...authors.translation_authors,
      ...authors.commentary_authors,
    ];

    for (const authorId of [...new Set(allAuthors)]) {
      for (const chapter of chapters) {
        for (let verse = 1; verse <= chapter.verses_count; verse++) {
          params.push({
            lang: lang.code,
            author: authorId,
            chapter: String(chapter.chapter_number),
            verse: String(verse),
          });
        }
      }
    }
  }
  return params;
}

// Return 404 for paths not generated at build time
export const dynamicParams = false;
```

---

## User Data Architecture

### Consistent Verse References

Both platforms use `chapter.verse` format (e.g., "2.47") instead of database IDs:

```sql
-- Supabase schema
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_ref TEXT NOT NULL,  -- "2.47" format
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, verse_ref)
);

CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_ref TEXT NOT NULL,  -- "2.47" format
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Cross-Platform Sync Flow

```
┌──────────────┐                      ┌──────────────┐
│   Web App    │                      │  Mobile App  │
│  (Next.js)   │                      │  (Flutter)   │
└──────┬───────┘                      └──────┬───────┘
       │                                     │
       │  Supabase Client                    │  SharedPrefs (offline)
       │                                     │  + Supabase sync
       │                                     │
       └─────────────┬───────────────────────┘
                     │
                     ▼
           ┌─────────────────┐
           │    Supabase     │
           │    Postgres     │
           │                 │
           │  - bookmarks    │
           │  - notes        │
           │  - chats        │
           │  - messages     │
           │  - read_verses  │
           └─────────────────┘
```

### Mobile Offline Strategy (Current)

The Flutter app uses SharedPreferences for local storage with manual sync:

```dart
// Save locally first
await SharedPref.addBookmark(bookmark);

// Sync to Supabase if online and logged in
if (SupabaseService.user != null) {
  await SupabaseService.saveBookmark(bookmark);
}

// SyncDataService handles bidirectional sync on app launch
await SyncDataService().syncData();
```

This approach:

- Works offline (saves to SharedPrefs)
- Syncs when online (to Supabase)
- No additional dependencies needed

---

## Mobile Content Updates

### Remote JSON Strategy

To update Gita content without releasing a new app version:

1. **Host JSON files on Supabase Storage**
2. **Version check on app startup**
3. **Download if new version available**
4. **Cache locally for offline use**

```dart
class ContentUpdateService {
  static const String VERSION_KEY = 'content_version';

  Future<void> checkForUpdates() async {
    final remoteVersion = await fetchRemoteVersion();
    final localVersion = await SharedPref.getString(VERSION_KEY);

    if (remoteVersion != localVersion) {
      await downloadAndCacheContent();
      await SharedPref.setString(VERSION_KEY, remoteVersion);
    }
  }

  Future<void> downloadAndCacheContent() async {
    // Download from Supabase Storage
    final chapters = await supabase.storage
        .from('gita-content')
        .download('chapters.json.gz');

    // Decompress and cache locally
    await cacheToLocalStorage(chapters);
  }
}
```

### Fallback Strategy

Keep bundled JSON as fallback for:

- First launch (before download completes)
- Network failures
- Offline first launch

---

## Implementation Phases

### Phase 1: Web - Replace GraphQL with Static JSON

1. Copy JSON files from mobile app to `/public/data/`
2. Create `generateStaticParams` for all combinations
3. Update verse/chapter pages to read from JSON
4. Remove gqty client and GraphQL dependencies
5. Test all language/author combinations
6. Verify SEO (sitemap, meta tags)

### Phase 2: Mobile - Remote JSON Updates

1. Upload JSON files to Supabase Storage
2. Add version endpoint/file
3. Implement `ContentUpdateService`
4. Add download progress UI
5. Test offline fallback
6. Optional: Remove bundled assets to reduce app size

### Phase 3: Unify Verse References

1. Audit current ID usage in both platforms
2. Migrate any integer IDs to `chapter.verse` format
3. Update Supabase tables if needed
4. Test cross-platform bookmark/note sync
5. Verify data integrity

---

## Alternatives Considered

### Why Not PowerSync?

PowerSync provides automatic offline-first sync but:

- Current SharedPrefs + manual sync works fine
- Adds complexity and cost ($49/mo for Pro)
- Overkill for simple bookmark/note sync

### Why Not Keep GraphQL?

GraphQL with Hasura:

- Adds ~$100/month cost
- Unnecessary for read-only content
- Slower than CDN-served static pages
- More complex to maintain

### Why Not ElectricSQL/Replicache/RxDB?

These are designed for:

- Real-time collaborative editing
- Frequently changing data
- Complex conflict resolution

Our use case is simpler - read-heavy scripture with occasional user bookmarks.

---

## Performance Expectations

| Metric           | Before (GraphQL) | After (Static)       |
| ---------------- | ---------------- | -------------------- |
| Verse page load  | ~200-500ms       | ~10-50ms             |
| Build time       | N/A              | ~5-10 min (one-time) |
| CDN cache hit    | No               | Yes                  |
| Database queries | Every request    | None for content     |
| Offline web      | No               | Possible with PWA    |

---

## Future Considerations

### PWA for Web Offline (Optional)

Could add service worker for web offline support:

- Cache static pages
- Offline reading experience
- App-like installation

### Content Versioning

For audit trail of content changes:

- Git history of JSON files
- Changelog in `index.json`
- Version displayed in UI

### Search

Gita search can use:

- Client-side search (JSON already loaded)
- Meilisearch (already integrated in mobile)
- Supabase full-text search

---

## References

- [Next.js Static Generation](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Flutter SharedPreferences](https://pub.dev/packages/shared_preferences)
- Mobile app data: `/assets/data/` in Flutter project
