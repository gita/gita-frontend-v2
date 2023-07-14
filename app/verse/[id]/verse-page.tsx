"use client";

import { useDispatch } from "react-redux";
import useMyStyles from "../../../hooks/useMyStyles";
import { useEffect, useState } from "react";
import { setCurrentverse } from "../../../redux/actions/settings";
import PageNavigator from "../../../components/Chapter/PageNavigator";
import classNames from "../../../utils/classNames";
import { SvgFloralDivider } from "../../../components/svgs";
import Translation from "../../../components/Verse/Translation";
import Commentary from "../../../components/Verse/Commentary";
import PageHeader from "../../../components/Headers/PageHeader";

type Props = {
  verseData: Verse;
};

export default function VersePage({ verseData }: Props) {
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

  const {
    gita_verses_by_pk,
    gita_commentaries_by_pk,
    gita_translations_by_pk,
  } = verseData;

  const dispatch = useDispatch();

  const { devnagari, verseText, synonyms, translation, purport } =
    advanceSettings;
  const styles = useMyStyles();

  useEffect(() => {
    dispatch(
      setCurrentverse({
        transliteration: gita_verses_by_pk.transliteration,
        verse_number: gita_verses_by_pk.verse_number,
        chapter_number: gita_verses_by_pk.chapter_number,
        id: gita_verses_by_pk.id,
      })
    );
  }, [
    dispatch,
    gita_verses_by_pk.transliteration,
    gita_verses_by_pk.verse_number,
    gita_verses_by_pk.chapter_number,
    gita_verses_by_pk.id,
  ]);

  return (
    <div className="font-inter">
      <PageHeader
        advanceSettings={advanceSettings}
        setAdvanceSettings={setAdvanceSettings}
        languageSettings={languageSettings}
        setLanguageSettings={setLanguageSettings}
      />
      <PageNavigator
        pageNumber={gita_verses_by_pk.id}
        pageCount={701}
        route="verse"
      />

      <section className="max-w-5xl font-inter py-12 mx-auto text-center px-4 sm:px-6">
        <h1
          className={classNames(
            "font-extrabold dark:text-gray-50",
            styles.fontSize.heading
          )}
        >
          BG {gita_verses_by_pk.chapter_number}.{gita_verses_by_pk.verse_number}
        </h1>
        {devnagari && (
          <p
            className={classNames(
              "font-dev text-my-orange mt-4 max-w-md mx-auto",
              styles.fontSize.subHeading1,
              styles.lineHeight
            )}
          >
            {gita_verses_by_pk.text}
          </p>
        )}
        {verseText && (
          <p
            className={classNames(
              "mt-4 max-w-md mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2,
              styles.lineHeight
            )}
          >
            {gita_verses_by_pk.transliteration}
          </p>
        )}
        {synonyms && (
          <p
            className={classNames(
              "mt-4 mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2,
              styles.lineHeight
            )}
          >
            {gita_verses_by_pk.word_meanings}
          </p>
        )}
        {(translation || purport) && (
          <SvgFloralDivider className="my-16 w-full text-white dark:text-dark-bg" />
        )}
        {translation && (
          <Translation translationData={gita_translations_by_pk} />
        )}
        {purport && <Commentary commentaryData={gita_commentaries_by_pk} />}
      </section>
    </div>
  );
}
