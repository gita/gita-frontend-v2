import { gita_translations_bool_exp, query, resolved } from "gqty-client";
import { getDefaultsForLocale } from "shared/functions";

const msInDay = 24 * 60 * 60 * 1000;
const dayOfYear = (date: Date) =>
  (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
    Date.UTC(date.getFullYear(), 0, 0)) /
  msInDay;

const getWhereGitaAuthor = (
  locale: Locale,
): {
  where: gita_translations_bool_exp;
} => {
  const defaultsForLocale = getDefaultsForLocale(locale);
  return {
    where: {
      author_id: {
        _eq: defaultsForLocale.translationAuthorId,
      },
    },
  };
};

export const getDailyVerse = (locale: Locale): Promise<GitaVerse> =>
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

    const whereGitaAuthor = getWhereGitaAuthor(locale);

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
      prev_chapter_verses_count: 0,
    };
  });
