import { query, resolved } from "gqty-client";

interface GitaVerseIds {
  gita_verses: { chapter_number: number; verse_number: number }[];
}

export const getVerseId = () =>
  resolved(() =>
    query.gita_verses().map((gitaVerse) => ({
      chapter_number: gitaVerse.chapter_number!,
      verse_number: gitaVerse.verse_number!,
    })),
  );

export const getVerseData = (
  chapterNumber: number,
  verseNumber: number,
  commentariesAuthorId: number,
  translationsAuthorId: number,
): Promise<GitaVerse> =>
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

    const [prevChapter] = query.gita_chapters({
      where: {
        chapter_number: {
          _eq: chapterNumber - 1 || 18,
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
        verses_count: gitaVerse.gita_chapter
          .gita_verses_aggregate()
          .aggregate.count(),
      },
      prev_chapter_verses_count: prevChapter
        .gita_verses_aggregate()
        .aggregate.count(),
      gita_commentaries: gitaVerse
        .gita_commentaries({
          where: {
            author_id: {
              _eq: commentariesAuthorId,
            },
          },
        })
        .map(({ description }) => ({ description: description! })),
      gita_translations: gitaVerse
        .gita_translations({
          where: {
            author_id: {
              _eq: translationsAuthorId,
            },
          },
        })
        .map(({ description }) => ({ description: description! })),
    };
  });
