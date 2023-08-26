import { defaultLocale } from "shared/constants";

const translationsCache: string[] = [];

export const getTranslate = (
  translations: Record<string, string>,
  locale: Locale,
) => {
  return (literal: string) => {
    if (locale === defaultLocale) {
      return literal;
    }

    const translation = translations[literal];
    if (translation) {
      return translation;
    }

    if (
      process.env.NODE_ENV === "development" &&
      typeof window === "undefined" &&
      !translationsCache.includes(literal)
    ) {
      translationsCache.push(translation);
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
