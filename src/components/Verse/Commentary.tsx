"use client";

import { getTranslate } from "shared/translate";
import splitIntoParagraphs from "utils/splitIntoParagraphs";

type Props = {
  commentaryData: GitaLanguage[] | undefined;
} & LocaleAndTranslations;

export default function Commentary({
  commentaryData,
  translations,
  locale,
}: Props) {
  const translate = getTranslate(translations, locale);
  const paragraphs = splitIntoParagraphs(commentaryData);

  return (
    <section className="mb-12">
      <h2 className="mb-5 text-left font-crimson text-[13px] font-semibold uppercase tracking-[1.5px] text-verse-grey-text transition-colors dark:text-verse-grey-text">
        {translate("Commentary")}
      </h2>
      {paragraphs?.[0] ? (
        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              lang={locale}
              className="commentary text-left text-lg leading-[1.95] text-verse-medium-text transition-colors dark:text-verse-medium-text"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-center font-crimson text-muted-foreground">
          {translate("Commentary is not available for this verse")}
        </p>
      )}
    </section>
  );
}
