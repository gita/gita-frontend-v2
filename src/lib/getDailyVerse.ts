/**
 * Get verse of the day from static JSON files
 * Uses day of year to deterministically select a verse
 */

import { getDefaultsForLocale } from "shared/functions";

import { loadChapters, queryVerseData } from "./data";

const msInDay = 24 * 60 * 60 * 1000;
const dayOfYear = (date: Date) =>
  (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
    Date.UTC(date.getFullYear(), 0, 0)) /
  msInDay;

/**
 * Get the verse of the day based on current date
 * Cycles through all 700 verses using day of year
 */
export const getDailyVerse = async (
  locale: Locale,
): Promise<GitaVerse | null> => {
  const defaultsForLocale = getDefaultsForLocale(locale);
  const chapters = await loadChapters();

  // Calculate total verses and get verse index based on day of year
  const totalVerses = chapters.reduce((sum, ch) => sum + ch.verses_count, 0);
  const verseIndex = (dayOfYear(new Date()) % totalVerses) + 1;

  // Find the chapter and verse number for this index
  let runningTotal = 0;
  for (const chapter of chapters) {
    if (runningTotal + chapter.verses_count >= verseIndex) {
      const verseNumber = String(verseIndex - runningTotal);
      return queryVerseData(
        chapter.chapter_number,
        verseNumber,
        defaultsForLocale.commentaryAuthorId,
        defaultsForLocale.translationAuthorId,
        locale,
      );
    }
    runningTotal += chapter.verses_count;
  }

  // Fallback to first verse
  return queryVerseData(
    1,
    "1",
    defaultsForLocale.commentaryAuthorId,
    defaultsForLocale.translationAuthorId,
    locale,
  );
};
