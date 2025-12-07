/**
 * Get chapter data from static JSON files
 * Replaces the previous GraphQL implementation
 */

import { loadChapters, queryChapterData } from "./data";

/**
 * Get all chapter numbers for static generation
 */
export const getChapterNumbers = async () => {
  const chapters = await loadChapters();
  return {
    gita_chapters: chapters.map(({ chapter_number }) => ({ chapter_number })),
  };
};

/**
 * Get chapter data including summary, verses, and translations
 */
export const getChapterData = (
  locale: Locale,
  chapterNumber: number,
  translationsAuthorId: number = 16, // Default to Swami Sivananda
) => queryChapterData(locale, chapterNumber, translationsAuthorId);
