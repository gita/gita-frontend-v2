/**
 * Get verse data from static JSON files
 * Replaces the previous GraphQL implementation
 */

import { queryAllVerseIds, queryVerseData } from "./data";

/**
 * Get all verse IDs for static generation
 */
export const getVerseId = () => queryAllVerseIds();

/**
 * Get verse data including sanskrit text, transliteration, translations, and commentaries
 * @param verseNumber - Can be a number or string (e.g., "4-6" for ranges)
 */
export const getVerseData = (
  chapterNumber: number,
  verseNumber: string,
  commentariesAuthorId: number,
  translationsAuthorId: number,
  locale: string = "en",
): Promise<GitaVerse | null> =>
  queryVerseData(
    chapterNumber,
    verseNumber,
    commentariesAuthorId,
    translationsAuthorId,
    locale,
  );
