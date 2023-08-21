import { getCookie } from "cookies-next";

import languages from "constant/languages.json";
import commentaryAuthors from "constant/commentary_authors.json";
import translationAuthors from "constant/translation_authors.json";
import {
  defaultCommentaryAuthorId,
  defaultLanguageId,
  defaultTranslationAuthorId,
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

export const getMyStyles = () => {
  const myStyles = JSON.parse(JSON.stringify(defaultStyles));

  const fontSize = getCookie("fontSize");
  const spacing = getCookie("spacing");
  const bg = getCookie("bg");

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

export const getMyLanguage = () => {
  const languageId = getCookie("languageId") || 1;
  return (
    languages.find(({ id }) => String(id) === String(languageId)) ||
    languages[0]
  );
};

export const getMyCommentaryAuthor = () => {
  const commentaryAuthorId = getCookie("commentaryAuthorId") || 16;
  return (
    commentaryAuthors.find(
      ({ id }) => String(id) === String(commentaryAuthorId)
    ) || commentaryAuthors[0]
  );
};

export const getMyTranslationAuthor = () => {
  const translationAuthorId = getCookie("translationAuthorId") || 16;
  return (
    translationAuthors.find(
      ({ id }) => String(id) === String(translationAuthorId)
    ) || translationAuthors[0]
  );
};

export const getLanguageById = (languageId: number) =>
  languages.find(({ id }) => id === languageId);

export const getTranslationAuthorById = (translationAuthorId: number) =>
  translationAuthors.find(({ id }) => id === translationAuthorId);

export const getCommentaryAuthorById = (commentaryAuthorId: number) =>
  commentaryAuthors.find(({ id }) => id === commentaryAuthorId);

export const getLanguageSettings = (
  { languageId, translationAuthorId, commentaryAuthorId } = {
    languageId: defaultLanguageId,
    translationAuthorId: defaultTranslationAuthorId,
    commentaryAuthorId: defaultCommentaryAuthorId,
  }
): LanguageSettings => ({
  language: getLanguageById(languageId) || getLanguageById(defaultLanguageId)!,
  translationAuthor:
    getTranslationAuthorById(translationAuthorId) ||
    getTranslationAuthorById(defaultTranslationAuthorId)!,
  commentaryAuthor:
    getCommentaryAuthorById(commentaryAuthorId) ||
    getCommentaryAuthorById(defaultCommentaryAuthorId)!,
});
