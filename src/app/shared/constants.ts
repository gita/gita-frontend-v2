import languages from "constant/languages.json";
import commentaryAuthors from "constant/commentary_authors.json";
import translationAuthors from "constant/translation_authors.json";

export const defaultTranslationAuthorId = 16;
export const defaultCommentaryAuthorId = 16;
export const defaultLanguageId = 1;

export const defaultAdvancedSettings: AdvancedSettings = {
  devnagari: true,
  verseText: true,
  synonyms: true,
  translation: true,
  purport: true,
};
