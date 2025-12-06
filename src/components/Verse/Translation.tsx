"use client";

import { getTranslate } from "shared/translate";

type Props = {
  translationData: GitaLanguage[] | undefined;
} & LocaleAndTranslations;

export default function Translation({
  translationData,
  translations,
  locale,
}: Props) {
  const translate = getTranslate(translations, locale);

  return (
    <section className="mb-10">
      <h2 className="mb-5 text-left font-crimson text-[13px] font-semibold uppercase tracking-[1.5px] text-verse-grey-text transition-colors dark:text-verse-grey-text">
        {translate("Translation")}
      </h2>
      {translationData && translationData[0]?.description ? (
        <p className="text-left font-crimson text-lg font-medium leading-[1.9] text-verse-dark-text transition-colors dark:text-verse-dark-text">
          {translationData[0].description}
        </p>
      ) : (
        <p className="text-center font-crimson text-muted-foreground">
          {translate(
            "Selected translation option is not available for this verse",
          )}
        </p>
      )}
    </section>
  );
}
