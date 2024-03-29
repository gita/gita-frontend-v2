"use server";

import { headers } from "next/headers";

import { defaultLocale, supportedLocales } from "shared/constants";

export const getTranslations = async (locale: Locale, paths = []) => {
  if (!supportedLocales.includes(locale)) {
    if (locale !== defaultLocale) {
      console.error(`Locale ${locale} is not supported`);
    }
    return {};
  }

  return (
    await Promise.all(
      ["shared/translate/locales", ...paths].map((path) =>
        import(`../../../src/${path}/${locale}.json`).then(
          (imported) => imported.default,
        ),
      ),
    )
  ).reduce(
    (prev, cur) => ({
      ...prev,
      ...cur,
    }),
    [],
  );
};
