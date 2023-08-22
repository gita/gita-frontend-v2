import { order_by, query, resolved } from "src/gqty-client";

export const getChapterNumbers = () =>
  resolved(() => ({
    gita_chapters: query
      .gita_chapters()
      .map(({ chapter_number }) => ({ chapter_number: chapter_number! })),
  }));

export const getChapterData = (chapterNumber: number) =>
  resolved(() => {
    const gitaChapter = query.gita_chapters_by_pk({
      id: chapterNumber,
    });

    const gitaVerses = query.gita_verses({
      where: {
        chapter_id: {
          _eq: chapterNumber,
        },
      },
      order_by: [
        {
          verse_number: order_by.asc,
        },
      ],
    });

    if (gitaChapter === null) {
      return null;
    }

    return {
      gita_chapters_by_pk: {
        chapter_number: gitaChapter.chapter_number!,
        chapter_summary: gitaChapter.chapter_summary!,
        name_translated: gitaChapter.name_translated!,
        verses_count: gitaChapter.verses_count!,
      },
      gita_verses: gitaVerses.map((gitaVerse) => ({
        id: gitaVerse.id!,
        verse_number: gitaVerse.verse_number!,
        word_meanings: gitaVerse.word_meanings!,
        chapter_number: gitaVerse.chapter_number!,
        gita_translations: gitaVerse
          .gita_translations({
            where: {
              language: { _eq: "english" },
              author_name: { _eq: "Swami Gambirananda" },
            },
          })
          .map((gitaTranslation) => ({
            description: gitaTranslation.description!,
          })),
      })),
    };
  });
