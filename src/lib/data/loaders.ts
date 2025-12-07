/**
 * Data loaders for static JSON files
 * These functions read from public/data/ and provide efficient querying
 */

import { promises as fs } from "fs";
import path from "path";

import type {
  AuthorData,
  AuthorVerse,
  ChapterData,
  CommonData,
  CommonVerse,
  GitaIndex,
} from "./types";

// Cache for loaded data (singleton pattern for server-side)
const cache = {
  index: null as GitaIndex | null,
  chapters: null as ChapterData[] | null,
  common: new Map<string, CommonData>(),
  authors: new Map<string, AuthorData>(),
};

// Helper to get the data directory path
// Data is stored at root level /data (not in public/) since it's only needed at build time
const getDataPath = () => path.join(process.cwd(), "data");

/**
 * Load the main index.json file
 */
export async function loadIndex(): Promise<GitaIndex> {
  if (cache.index) return cache.index;

  const filePath = path.join(getDataPath(), "index.json");
  const content = await fs.readFile(filePath, "utf-8");
  cache.index = JSON.parse(content) as GitaIndex;
  return cache.index;
}

/**
 * Load chapters.json file
 */
export async function loadChapters(): Promise<ChapterData[]> {
  if (cache.chapters) return cache.chapters;

  const filePath = path.join(getDataPath(), "chapters.json");
  const content = await fs.readFile(filePath, "utf-8");
  cache.chapters = JSON.parse(content) as ChapterData[];
  return cache.chapters;
}

/**
 * Load common verse data for a specific language
 * Contains: sanskrit_text, transliteration, word_meanings
 */
export async function loadCommonData(
  languageCode: string,
): Promise<CommonData> {
  const cacheKey = languageCode;
  if (cache.common.has(cacheKey)) {
    return cache.common.get(cacheKey)!;
  }

  const filePath = path.join(
    getDataPath(),
    "common",
    `common_${languageCode}.json`,
  );

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content) as CommonData;
    cache.common.set(cacheKey, data);
    return data;
  } catch {
    // Fallback to English if language not found
    if (languageCode !== "en") {
      return loadCommonData("en");
    }
    throw new Error(`Common data not found for language: ${languageCode}`);
  }
}

/**
 * Load author-specific translation/commentary data
 */
export async function loadAuthorData(
  authorId: number,
  languageCode: string,
): Promise<AuthorData | null> {
  const cacheKey = `${authorId}_${languageCode}`;
  if (cache.authors.has(cacheKey)) {
    return cache.authors.get(cacheKey)!;
  }

  const filePath = path.join(
    getDataPath(),
    "authors",
    `author_${authorId}_${languageCode}.json`,
  );

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content) as AuthorData;
    cache.authors.set(cacheKey, data);
    return data;
  } catch {
    return null;
  }
}

/**
 * Get a specific chapter's data
 */
export async function getChapter(
  chapterNumber: number,
): Promise<ChapterData | null> {
  const chapters = await loadChapters();
  return chapters.find((c) => c.chapter_number === chapterNumber) || null;
}

/**
 * Get common verse data (sanskrit, transliteration, word meanings)
 * Accepts verse number as string to support ranges like "4-6"
 */
export async function getCommonVerse(
  chapterNumber: number,
  verseNumber: string,
  languageCode: string = "en",
): Promise<CommonVerse | null> {
  const commonData = await loadCommonData(languageCode);
  const chapter = commonData.chapters.find(
    (c) => parseInt(c.chapter_number, 10) === chapterNumber, // Parse chapter number from string
  );
  if (!chapter) return null;

  // Direct match for verse number (including ranges like "4-6")
  // Filter out null values from sparse array
  return (
    chapter.verses.find((v) => v != null && v.verse_number === verseNumber) ||
    null
  );
}

/**
 * Find if a verse number is part of a range in the chapter
 * For example, if verses 4, 5, 6 are combined as "4-6", calling this with verse "5" will return "4-6"
 * @returns The range string if the verse is part of a range, null otherwise
 */
export async function findVerseRange(
  chapterNumber: number,
  verseNumber: string,
  languageCode: string = "en",
): Promise<string | null> {
  const commonData = await loadCommonData(languageCode);
  const chapter = commonData.chapters.find(
    (c) => parseInt(c.chapter_number, 10) === chapterNumber, // Parse chapter number from string
  );
  if (!chapter) return null;

  // Parse the requested verse number
  const requestedVerse = parseInt(verseNumber, 10);
  if (isNaN(requestedVerse)) return null;

  // Look for a range that contains this verse
  for (const verse of chapter.verses) {
    if (!verse || !verse.verse_number) continue;

    // Check if this is a range (e.g., "4-6")
    const rangeMatch = verse.verse_number.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const rangeStart = parseInt(rangeMatch[1], 10);
      const rangeEnd = parseInt(rangeMatch[2], 10);

      // Check if requested verse falls within this range
      if (requestedVerse >= rangeStart && requestedVerse <= rangeEnd) {
        return verse.verse_number;
      }
    }
  }

  return null;
}

/**
 * Get all common verses for a chapter
 */
export async function getCommonVersesForChapter(
  chapterNumber: number,
  languageCode: string = "en",
): Promise<CommonVerse[]> {
  const commonData = await loadCommonData(languageCode);
  const chapter = commonData.chapters.find(
    (c) => parseInt(c.chapter_number, 10) === chapterNumber, // Parse chapter number from string
  );
  // Filter out null/undefined entries from sparse arrays
  return chapter?.verses?.filter((v) => v != null) || [];
}

/**
 * Get author's translation/commentary for a specific verse
 * Accepts verse number as string to support ranges like "4-6"
 */
export async function getAuthorVerse(
  authorId: number,
  languageCode: string,
  chapterNumber: number,
  verseNumber: string,
): Promise<AuthorVerse | null> {
  const authorData = await loadAuthorData(authorId, languageCode);
  if (!authorData) return null;

  const chapter = authorData.chapters.find(
    (c) => c.chapter_number === chapterNumber,
  );
  if (!chapter) return null;

  // Direct match for verse number (including ranges like "4-6")
  // Filter out null values from sparse array
  return (
    chapter.verses.find((v) => v != null && v.verse_number === verseNumber) ||
    null
  );
}

/**
 * Get all author verses for a chapter
 */
export async function getAuthorVersesForChapter(
  authorId: number,
  languageCode: string,
  chapterNumber: number,
): Promise<AuthorVerse[]> {
  const authorData = await loadAuthorData(authorId, languageCode);
  if (!authorData) return [];

  const chapter = authorData.chapters.find(
    (c) => c.chapter_number === chapterNumber,
  );
  // Filter out null/undefined entries from sparse arrays
  return chapter?.verses?.filter((v) => v != null) || [];
}

/**
 * Get author by ID from index
 */
export async function getAuthor(authorId: number) {
  const index = await loadIndex();
  return index.authors.find((a) => a.id === authorId);
}

/**
 * Get all languages from index
 */
export async function getLanguages() {
  const index = await loadIndex();
  return index.languages;
}

/**
 * Get authors available for a specific language
 */
export async function getAuthorsForLanguage(languageCode: string) {
  const index = await loadIndex();
  const langAuthors = index.language_authors[languageCode];
  if (!langAuthors) return { translation_authors: [], commentary_authors: [] };

  return {
    translation_authors: langAuthors.translation_authors.map((id) =>
      index.authors.find((a) => a.id === Number(id)),
    ),
    commentary_authors: langAuthors.commentary_authors.map((id) =>
      index.authors.find((a) => a.id === Number(id)),
    ),
  };
}

/**
 * Clear all cached data (useful for testing)
 */
export function clearCache() {
  cache.index = null;
  cache.chapters = null;
  cache.common.clear();
  cache.authors.clear();
}
