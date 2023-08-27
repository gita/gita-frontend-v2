"use client";

import Verse from "components/Verse";
import useMyStyles from "hooks/useMyStyles";
import classNames from "utils/classNames";

type Props = {
  dailyVerse: GitaVerse;
} & LocaleAndTranslations;

const VerseOfTheDay = ({ dailyVerse, translations, locale }: Props) => {
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
