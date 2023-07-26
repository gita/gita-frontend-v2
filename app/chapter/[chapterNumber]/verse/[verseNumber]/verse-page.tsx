"use client";

import { useDispatch } from "react-redux";
import { getVerseData } from "../../../../../lib/getVerseData";
import useMyStyles from "../../../../../hooks/useMyStyles";
import { useEffect, useState } from "react";
import { setCurrentverse } from "../../../../../redux/actions/settings";
import PageNavigator from "../../../../../components/Chapter/PageNavigator";
import classNames from "../../../../../utils/classNames";
import { SvgFloralDivider } from "../../../../../components/svgs";
import Translation from "../../../../../components/Verse/Translation";
import Commentary from "../../../../../components/Verse/Commentary";
import PageHeader from "../../../../../components/Headers/PageHeader";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  chapterNumber: string;
  verseNumber: string;
};

export default function VersePage({ chapterNumber, verseNumber }: Props) {
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

  const { devnagari, verseText, synonyms, translation, purport } =
    advanceSettings;
  const styles = useMyStyles();

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
      <PageNavigator
        pageCount={18}
        route="verse"
        maxVerseCount={currentVerse.gita_chapter.verses_count}
        verseNumber={currentVerse.verse_number}
        pageNumber={currentVerse.chapter_number}
      />

      <section className="max-w-5xl font-inter py-16 mx-auto text-center px-4 sm:px-6">
        <h1
          className={classNames(
            "font-extrabold dark:text-gray-50",
            styles.fontSize.heading
          )}
        >
          BG {currentVerse?.chapter_number}.{currentVerse?.verse_number}
        </h1>
        {devnagari && (
          <p
            className={classNames(
              "font-dev text-my-orange mt-8 max-w-md mx-auto",
              styles.fontSize.subHeading1
            )}
          >
            {currentVerse?.text}
          </p>
        )}
        {verseText && (
          <p
            className={classNames(
              "mt-6 max-w-md mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2
            )}
          >
            {currentVerse?.transliteration}
          </p>
        )}
        {synonyms && (
          <p
            className={classNames(
              "mt-6 mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2
            )}
          >
            {currentVerse?.word_meanings}
          </p>
        )}
        {(translation || purport) && (
          <SvgFloralDivider
            className={`my-20 w-full text-${styles.backgroundColor} dark:text-dark-bg`}
          />
        )}
        {translation && (
          <Translation translationData={currentVerse.gita_translations} />
        )}
        {purport && (
          <Commentary commentaryData={currentVerse.gita_commentaries} />
        )}
      </section>
    </div>
  );
}
