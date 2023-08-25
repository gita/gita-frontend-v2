"use client";

import { FC, useState } from "react";

import {
  defaultCommentaryAuthorId,
  defaultTranslationAuthorId,
} from "shared/constants";
import {
  getCommentaryAuthorById,
  getTranslationAuthorById,
} from "shared/functions";

import PageHeader from "../../components/Headers/PageHeader";
import { Verse } from "../../components/Verse/Verse";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

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

  const [advancedSettings, setAdvancedSettings] = useState({
    devnagari: true,
    verseText: true,
    synonyms: true,
    translation: true,
    purport: true,
  });

  const [languageSettings, setLanguageSettings] = useState({
    translationAuthor: getTranslationAuthorById(defaultTranslationAuthorId)!,
    commentaryAuthor: getCommentaryAuthorById(defaultCommentaryAuthorId)!,
  });

  return (
    <div
      className={classNames(
        "font-inter dark:bg-dark-bg",
        `bg-${styles.backgroundColor}`,
      )}
    >
      <PageHeader
        advancedSettings={advancedSettings}
        setAdvancedSettings={setAdvancedSettings}
        translations={translations}
        locale={locale}
      />
      {dailyVerse && (
        <Verse verse={dailyVerse} advancedSettings={advancedSettings} />
      )}
    </div>
  );
};
