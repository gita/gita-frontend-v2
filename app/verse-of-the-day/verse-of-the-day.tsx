"use client";

import { FC, useState } from "react";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import PageHeader from "../../components/Headers/PageHeader";
import { Verse } from "../../components/Verse/Verse";

interface VerseOfTheDayProps {
  dailyVerse: GitaVerse;
}

export const VerseOfTheDay: FC<VerseOfTheDayProps> = ({ dailyVerse }) => {
  const styles = useMyStyles();

  const [advanceSettings, setAdvanceSettings] = useState({
    devnagari: true,
    verseText: true,
    synonyms: true,
    translation: true,
    purport: true,
  });

  const [languageSettings, setLanguageSettings] = useState({
    language: {
      id: 1,
      language: "english",
    },
    translationAuthor: {
      id: 16,
      name: "Swami Sivananda",
    },
    commentaryAuthor: {
      id: 16,
      name: "Swami Sivananda",
    },
  });

  return (
    <div
      className={classNames(
        "font-inter dark:bg-dark-bg",
        `bg-${styles.backgroundColor}`
      )}
    >
      <PageHeader
        advanceSettings={advanceSettings}
        setAdvanceSettings={setAdvanceSettings}
        languageSettings={languageSettings}
        setLanguageSettings={setLanguageSettings}
      />
      {dailyVerse && (
        <Verse verse={dailyVerse} advancedSettings={advanceSettings} />
      )}
    </div>
  );
};
