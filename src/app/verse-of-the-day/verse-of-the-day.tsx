"use client";

import { FC, useState } from "react";

import PageHeader from "components/Headers/PageHeader";
import { Verse } from "components/Verse/Verse";
import useMyStyles from "hooks/useMyStyles";
import classNames from "utils/classNames";

interface VerseOfTheDayProps {
  dailyVerse: GitaVerse;
  translations: Record<string, string>;
  locale: Locale;
}

export const VerseOfTheDay: FC<VerseOfTheDayProps> = ({
  dailyVerse,
  translations,
  locale,
}) => {
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
