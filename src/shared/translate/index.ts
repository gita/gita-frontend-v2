import { template } from "lodash";

import { defaultLocale } from "shared/constants";

const translationsCache: string[] = [];

export const getTranslate = (
  translations: Record<string, string>,
  locale: Locale,
): Translate => {
  return (literal: string | undefined, options = {}) => {
    if (!literal) {
      return "";
    }
    const compiled = template(translations[literal] || literal);
    const translated = String(compiled(options));

    if (translations[literal] || locale === defaultLocale) {
      return translated;
    }

    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined" &&
      !translationsCache.includes(literal)
    ) {
      translationsCache.push(literal);
      fetch("http://localhost:3000/translations", {
        method: "post",
        body: JSON.stringify({
          locale,
          literal,
        }),
      }).catch((err) => {
        console.error("Translations update error");
        console.error(err);
      });
    }

    // Fall back to the interpolated source string, not the raw key. Returning
    // `literal` shipped uninterpolated lodash templates to the page: every
    // Hindi verse heading read "Chapter <%= chapter %>, Verse <%= verse %>"
    // because that key is missing from hi.json. `translated` is the same string
    // with the options applied, so a missing translation degrades to readable
    // English instead of a broken placeholder.
    return translated;
  };
};
