import commentaryAuthors from "constant/commentary_authors.json";
import languages from "constant/languages.json";
import translationAuthors from "constant/translation_authors.json";

import {
  defaultCommentaryAuthorId,
  defaultLocale,
  defaultTranslationAuthorId,
  supportedLocales,
} from "./constants";

const defaultStyles = {
  fontSize: {
    heading: "text-4xl",
    subHeading1: "text-3xl",
    subHeading2: "text-2xl",
    para: "text-xl",
  },
  lineHeight: "leading-none",
  backgroundColor: "light-bg",
};

type FontSize = "large" | "small" | "";

export const getMyStyles = () => {
  const myStyles = JSON.parse(JSON.stringify(defaultStyles));

  const fontSize: FontSize = "" as FontSize;
  const spacing = ["medium"][0];
  const bg = ["bg-dark-bg"][0];

  if (fontSize === "large") {
    myStyles.fontSize = {
      heading: "text-4xl",
      subHeading1: "text-intro",
      subHeading2: "text-paragraph",
      para: "text-paragraph",
    };
  } else if (fontSize == "small") {
    myStyles.fontSize = {
      heading: "text-3xl",
      subHeading1: "text-2xl",
      subHeading2: "text-xl",
      para: "text-md",
    };
  }

  if (spacing === "large") {
    myStyles.lineHeight = "leading-loose";
  } else if (spacing === "medium") {
    myStyles.lineHeight = "leading-normal";
  } else if (spacing === "small") {
    myStyles.lineHeight = "leading-none";
  }

  if (bg === "bg-dark-bg") {
    myStyles.backgroundColor = "dark-bg";
  } else if (bg === "bg-light-bg") {
    myStyles.backgroundColor = "white";
  } else if (bg === "bg-yellow-bg") {
    myStyles.backgroundColor = "yellow-bg";
  }

  return myStyles;
};

export const getDefaultsForLocale = (locale: Locale) => {
  if (locale === "hi") {
    return {
      translationAuthorId: 1,
      commentaryAuthorId: 1,
    };
  }
  return {
    translationAuthorId: 16,
    commentaryAuthorId: 16,
  };
};

export const getLanguageById = (languageId: number) =>
  languages.find(({ id }) => id === languageId);

export const getTranslationAuthorById = (translationAuthorId: number) =>
  translationAuthors.find(({ id }) => id === translationAuthorId);

export const getCommentaryAuthorById = (commentaryAuthorId: number) =>
  commentaryAuthors.find(({ id }) => id === commentaryAuthorId);

export const isLocale = (value: unknown): value is Locale =>
  supportedLocales.includes(String(value));

export const deprecated_headerToLocale = (headerLocale: string) =>
  isLocale(headerLocale) ? headerLocale : defaultLocale;

/**
 * True when the optional catch-all segment is something we actually serve.
 *
 * `[[...locale]]` matches anything, so without this check `/total-nonsense`
 * rendered the homepage with a 200. That turned every mistyped or stale link on
 * the web into an indexable duplicate of the homepage.
 *
 * Valid shapes are: absent (the English route), empty, or exactly one supported
 * locale segment.
 */
export const isValidLocaleSegment = (localeFromParams: {
  locale?: string[];
}): boolean => {
  const segments = localeFromParams?.locale;
  if (!segments || segments.length === 0) return true;
  if (segments.length > 1) return false;
  return isLocale(segments[0]);
};

export const paramsToLocale = (localeFromParams: { locale?: string[] }) => {
  const paramsLocale = Array.isArray(localeFromParams?.locale)
    ? localeFromParams.locale[0]
    : "en";
  return isLocale(paramsLocale) ? paramsLocale : defaultLocale;
};

export const getLanguageSettings = (
  locale: Locale,
  {
    translationAuthorId,
    commentaryAuthorId,
  }: {
    translationAuthorId: number;
    commentaryAuthorId: number;
  } = {
    translationAuthorId: defaultTranslationAuthorId,
    commentaryAuthorId: defaultCommentaryAuthorId,
  },
): LanguageSettings => {
  const defaults = getDefaultsForLocale(locale);
  return {
    translationAuthor:
      getTranslationAuthorById(translationAuthorId) ||
      getTranslationAuthorById(defaults.translationAuthorId)!,
    commentaryAuthor:
      getCommentaryAuthorById(commentaryAuthorId) ||
      getCommentaryAuthorById(defaults.commentaryAuthorId)!,
  };
};

export const upperFirst = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const classNames = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");
