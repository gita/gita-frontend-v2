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

    return literal;
  };
};
