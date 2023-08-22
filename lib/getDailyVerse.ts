import { order_by, query, resolved } from "src/gqty-client";

const whereGitaAuthor = {
  where: {
    gita_author: {
      name: {
        _eq: "Swami Sivananda",
      },
    },
  },
};

export const getDailyVerse = () =>
  resolved(() => {
    const versesOfTheDay = query
      .verse_of_the_day({
        where: {
          date: {
            _lte: new Date(),
          },
        },
        order_by: [{ date: order_by.desc }],
        limit: 1,
      })
      .map((verseOfTheDay) => ({
        id: verseOfTheDay.id!,
        date: verseOfTheDay.date!,
        verse_order: verseOfTheDay.verse_order!,
      }));

    const verseOrder = versesOfTheDay[0]?.verse_order || 1;

    const gitaVerse =
      query.gita_verses_by_pk({
        id: verseOrder,
      }) ||
      query.gita_verses({
        limit: 1,
      })?.[0];

    if (!gitaVerse) {
      return null;
    }

    return {
      id: gitaVerse.id!,
      chapter_number: gitaVerse.chapter_number!,
      verse_number: gitaVerse.verse_number!,
      text: gitaVerse.text!,
      transliteration: gitaVerse.transliteration!,
      word_meanings: gitaVerse.word_meanings!,
      gita_translations: gitaVerse
        .gita_translations(whereGitaAuthor)
        .map((gitaTranslation) => ({
          description: gitaTranslation.description!,
        })),
      gita_commentaries: gitaVerse
        .gita_commentaries(whereGitaAuthor)
        .map((gitaTranslation) => ({
          description: gitaTranslation.description!,
        })),
      gita_chapter: {
        verses_count: gitaVerse.gita_chapter?.verses_count || 0,
      },
    };
  });
