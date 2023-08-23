import { query, resolved } from "gqty-client";

const msInDay = 24 * 60 * 60 * 1000;
const dayOfYear = (date: Date) =>
  (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
    Date.UTC(date.getFullYear(), 0, 0)) /
  msInDay;

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
    const gitaVerse =
      query.gita_verses_by_pk({
        id: dayOfYear(new Date()),
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
