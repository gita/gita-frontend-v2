import { query, resolved } from "gqty-client";

interface GitaVerseIds {
  gita_verses: { chapter_number: number; verse_number: number }[];
}

export const getVerseId = () =>
  resolved(() =>
    query.gita_verses().map((gitaVerse) => ({
      chapter_number: gitaVerse.chapter_number!,
      verse_number: gitaVerse.verse_number!,
    }))
  );

export const getVerseData = (
  chapterNumber,
  verseNumber,
  commentariesAuthor = "Swami Sivananda",
  translationsAuthor = "Swami Sivananda"
) =>
  resolved(() => {
    const [gitaVerse] = query.gita_verses({
      where: {
        chapter_number: {
          _eq: chapterNumber,
        },
        verse_number: {
          _eq: verseNumber,
        },
      },
    });

    if (!gitaVerse) {
      return null;
    }

    return {
      chapter_number: gitaVerse.chapter_number!,
      id: gitaVerse.id!,
      text: gitaVerse.text!,
      transliteration: gitaVerse.transliteration!,
      verse_number: gitaVerse.verse_number!,
      word_meanings: gitaVerse.word_meanings!,
      gita_chapter: {
        verses_count: gitaVerse.gita_chapter?.verses_count || 0,
      },
      gita_commentaries: gitaVerse
        .gita_commentaries({
          where: {
            author_name: {
              _eq: commentariesAuthor,
            },
          },
        })
        .map(({ description }) => ({ description: description! })),
      gita_translations: gitaVerse
        .gita_translations({
          where: {
            author_name: {
              _eq: translationsAuthor,
            },
          },
        })
        .map(({ description }) => ({ description: description! })),
    };
  });