import { headers } from "next/headers";

import { Verse } from "components/Verse/Verse";
import classNames from "utils/classNames";

type Props = {
  verseData: GitaVerse;
  translations: Record<string, string>;
  locale: Locale;
};

export default function VersePage({ verseData, translations, locale }: Props) {
  return (
    <div
      className={classNames(
        "font-inter dark:bg-dark-bg",
        // `bg-${styles.backgroundColor}`,
      )}
    >
      {verseData && (
        <Verse verse={verseData} translations={translations} locale={locale} />
      )}
      {!verseData && (
        <h1 className="p-5 text-center">This verse was not found</h1>
      )}
    </div>
  );
}
