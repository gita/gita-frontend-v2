"use client";

import { FC, useState } from "react";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import PageHeader from "../../components/Headers/PageHeader";
import { Verse } from "../../components/Verse/Verse";
import {
  getCommentaryAuthorById,
  getLanguageById,
  getTranslationAuthorById,
} from "shared/functions";
import {
  defaultCommentaryAuthorId,
  defaultLanguageId,
  defaultTranslationAuthorId,
} from "shared/constants";

interface VerseOfTheDayProps {
  dailyVerse: GitaVerse;
}

export const VerseOfTheDay: FC<VerseOfTheDayProps> = ({ dailyVerse }) => {
  const styles = useMyStyles();

  const [advancedSettings, setAdvancedSettings] = useState({
    devnagari: true,
    verseText: true,
    synonyms: true,
    translation: true,
    purport: true,
  });

  const [languageSettings, setLanguageSettings] = useState({
    language: getLanguageById(defaultLanguageId)!,
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
        languageSettings={languageSettings}
        setLanguageSettings={setLanguageSettings}
      />
      {dailyVerse && (
        <Verse verse={dailyVerse} advancedSettings={advancedSettings} />
      )}
    </div>
  );
};
