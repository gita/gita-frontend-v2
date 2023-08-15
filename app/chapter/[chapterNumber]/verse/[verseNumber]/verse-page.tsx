"use client";

import { useDispatch } from "react-redux";
import { getVerseData } from "../../../../../lib/getVerseData";
import useMyStyles from "../../../../../hooks/useMyStyles";
import { useEffect, useState } from "react";
import { setCurrentverse } from "../../../../../redux/actions/settings";
import classNames from "../../../../../utils/classNames";
import PageHeader from "../../../../../components/Headers/PageHeader";
import { Verse } from "../../../../../components/Verse/Verse";

type Props = {
  chapterNumber: string;
  verseNumber: string;
};

export default function VersePage({ chapterNumber, verseNumber }: Props) {
  const styles = useMyStyles();
  const [currentVerse, setCurrentVerse] = useState<GitaVerse>({
    verse_number: 1,
    chapter_number: 1,
    id: 1,
    text: "",
    transliteration: "",
    word_meanings: "",
    gita_chapter: {
      verses_count: 1,
    },
    gita_commentaries: [{ description: "" }],
    gita_translations: [{ description: "" }],
  });

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentverse(currentVerse));
  }, [currentVerse, dispatch]);

  useEffect(() => {
    const getCurrentVerseData = async () => {
      const data = await getVerseData(
        chapterNumber,
        verseNumber,
        languageSettings.language.language,
        languageSettings.commentaryAuthor.name,
        languageSettings.translationAuthor.name
      );
      setCurrentVerse(data);
    };
    getCurrentVerseData();
  }, [chapterNumber, currentVerse, languageSettings, verseNumber]);

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
      <Verse verse={currentVerse} advancedSettings={advanceSettings} />
    </div>
  );
}
