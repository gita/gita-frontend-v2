/**
 * High-level query functions that match the existing API signatures
 * These replace the GraphQL queries with static JSON lookups
 */

import {
  getAuthorVerse,
  getAuthorVersesForChapter,
  getChapter,
  getCommonVerse,
  getCommonVersesForChapter,
  loadChapters,
  loadCommonData,
  loadIndex,
} from "./loaders";

/**
 * Map language code to the language used in common data files
 * Some languages fall back to English for common verse data
 */
function getCommonLanguageCode(locale: string): string {
  // Common data is available for: en, es, gu, hi, or, ta, te
  const supportedCommon = ["en", "es", "gu", "hi", "or", "ta", "te"];
  return supportedCommon.includes(locale) ? locale : "en";
}

/**
 * Map author ID to the language code used in author files
 */
async function getAuthorLanguageCode(
  authorId: number,
  preferredLocale: string,
): Promise<string> {
  const index = await loadIndex();
  const author = index.authors.find((a) => a.id === authorId);
  if (!author) return "en";

  // Check if author supports the preferred locale
  const supportsLocale = author.languages.some(
    (l) => l.code === preferredLocale,
  );
  if (supportsLocale) return preferredLocale;

  // Fall back to author's first available language
  return author.languages[0]?.code || "en";
}

/**
 * Get verse data matching the existing GitaVerse interface
 */
export async function queryVerseData(
  chapterNumber: number,
  verseNumber: string,
  commentaryAuthorId: number,
  translationAuthorId: number,
  locale: string = "en",
): Promise<GitaVerse | null> {
  const commonLang = getCommonLanguageCode(locale);

  // Get common verse data (sanskrit, transliteration, word meanings)
  // verseNumber can be "4" or "4-6" for ranges
  const commonVerse = await getCommonVerse(
    chapterNumber,
    verseNumber,
    commonLang,
  );
  if (!commonVerse) return null;

  // Get chapter data for verse count
  const chapter = await getChapter(chapterNumber);
  const prevChapter = await getChapter(chapterNumber - 1);

  // Get translation author's language
  const translationLang = await getAuthorLanguageCode(
    translationAuthorId,
    locale,
  );
  const translationVerse = await getAuthorVerse(
    translationAuthorId,
    translationLang,
    chapterNumber,
    verseNumber,
  );

  // Get commentary author's language
  const commentaryLang = await getAuthorLanguageCode(
    commentaryAuthorId,
    locale,
  );
  const commentaryVerse = await getAuthorVerse(
    commentaryAuthorId,
    commentaryLang,
    chapterNumber,
    verseNumber,
  );

  // Parse first verse number for ID generation
  const firstVerseNum = parseInt(verseNumber.split("-")[0], 10);

  return {
    verse_number: verseNumber, // Keep original string (e.g., "4-6" for ranges)
    chapter_number: chapterNumber,
    id: chapterNumber * 100 + firstVerseNum, // Generate a unique ID based on first verse
    text: commonVerse.sanskrit_text,
    transliteration: commonVerse.transliteration,
    word_meanings: commonVerse.word_meanings, // word_meanings is already a string in v4 data
    sanskrit_audio: commonVerse.sanskrit_audio, // Audio URL from Swami Mukundananda's data
    gita_chapter: {
      verses_count: chapter?.verses_count || 0,
    },
    prev_chapter_verses_count: prevChapter?.verses_count || 0,
    gita_translations: translationVerse?.translation
      ? [{ description: translationVerse.translation }]
      : [],
    gita_commentaries: commentaryVerse?.commentary
      ? [{ description: commentaryVerse.commentary }]
      : [],
  };
}

/**
 * Get chapter data matching the existing GitaChapter interface
 */
export async function queryChapterData(
  locale: string,
  chapterNumber: number,
  translationAuthorId: number,
): Promise<{
  gita_chapters_by_pk: GitaChapterData;
  gita_verses: Array<{
    id: number;
    verse_number: string; // Keep as string to support ranges like "4-6"
    word_meanings: string;
    chapter_number: number;
    gita_translations: Array<{ description: string }>;
  }>;
} | null> {
  const chapter = await getChapter(chapterNumber);
  if (!chapter) return null;

  const commonLang = getCommonLanguageCode(locale);
  const commonVerses = await getCommonVersesForChapter(
    chapterNumber,
    commonLang,
  );

  // Get translation author's language
  const translationLang = await getAuthorLanguageCode(
    translationAuthorId,
    locale,
  );
  const authorVerses = await getAuthorVersesForChapter(
    translationAuthorId,
    translationLang,
    chapterNumber,
  );

  // Create a map for quick author verse lookup
  const authorVerseMap = new Map(authorVerses.map((v) => [v.verse_number, v]));

  // Build verses array - keep ranges as-is
  const verses = commonVerses
    .map((commonVerse) => {
      // Parse first verse number for ID generation and sorting
      const firstVerseNum = parseVerseNumber(commonVerse.verse_number);

      return {
        id: chapterNumber * 100 + firstVerseNum,
        verse_number: commonVerse.verse_number, // Keep original string (e.g., "4-6")
        word_meanings: commonVerse.word_meanings, // word_meanings is already a string in v4 data
        chapter_number: chapterNumber,
        gita_translations: authorVerseMap.get(commonVerse.verse_number)
          ?.translation
          ? [
              {
                description: authorVerseMap.get(commonVerse.verse_number)!
                  .translation!,
              },
            ]
          : [],
      };
    })
    .sort(
      (a, b) =>
        parseVerseNumber(a.verse_number) - parseVerseNumber(b.verse_number),
    ); // Sort by first verse number in range

  return {
    gita_chapters_by_pk: {
      chapter_number: chapter.chapter_number,
      chapter_summary:
        locale === "hi"
          ? chapter.description.hi || chapter.description.en || ""
          : chapter.description.en || "",
      name_translated:
        locale === "hi"
          ? chapter.name.hi || chapter.name.en || ""
          : chapter.name.en || "",
      name_meaning:
        chapter.oneliner[locale as keyof typeof chapter.oneliner] ||
        chapter.oneliner.en ||
        "",
      verses_count: chapter.verses_count,
    },
    gita_verses: verses,
  };
}

/**
 * Get all chapters for listing
 */
export async function queryAllChapters(locale: string): Promise<TChapter[]> {
  const chapters = await loadChapters();

  return chapters.map((chapter) => ({
    id: chapter.chapter_number,
    chapter_number: chapter.chapter_number,
    chapter_summary:
      locale === "hi"
        ? chapter.description.hi || chapter.description.en || ""
        : chapter.description.en || "",
    name_translated:
      locale === "hi"
        ? chapter.name.hi || chapter.name.en || ""
        : chapter.name.en || "",
    verses_count: chapter.verses_count,
  }));
}

/**
 * Get all verse IDs for static generation
 * Returns actual verse numbers from the data (including ranges like "4-6")
 */
export async function queryAllVerseIds(): Promise<
  Array<{ chapter_number: number; verse_number: string }>
> {
  const commonData = await loadCommonData("en"); // Use English to get verse structure
  const result: Array<{ chapter_number: number; verse_number: string }> = [];

  for (const chapter of commonData.chapters) {
    const chapterNum = parseInt(chapter.chapter_number, 10);

    // Add actual verse numbers from the data (including ranges)
    for (const verse of chapter.verses) {
      // Skip null/undefined verses (can happen with sparse arrays)
      if (!verse || !verse.verse_number) continue;

      result.push({
        chapter_number: chapterNum,
        verse_number: verse.verse_number,
      });
    }
  }

  return result;
}

/**
 * Parse verse number from string (handles ranges like "4-6")
 * Returns the first verse number in the range
 */
function parseVerseNumber(verseStr: string): number {
  // Handle verse ranges like "4-6" - return the first number
  const match = verseStr.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}
