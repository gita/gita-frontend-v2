"use client";

import Verse from "components/Verse";
import useMyStyles from "hooks/useMyStyles";
import classNames from "utils/classNames";

interface VerseOfTheDayProps {
  dailyVerse: GitaVerse;
  translations: Record<string, string>;
  locale: Locale;
}

const VerseOfTheDay = ({
  dailyVerse,
  translations,
  locale,
}: VerseOfTheDayProps) => {
  const styles = useMyStyles();

  return (
    <div
      className={classNames(
        "font-inter dark:bg-dark-bg",
        `bg-${styles.backgroundColor}`,
      )}
    >
      {dailyVerse && (
        <Verse verse={dailyVerse} translations={translations} locale={locale} />
      )}
    </div>
  );
};

export default VerseOfTheDay;
