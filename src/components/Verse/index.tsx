"use client";

import { FC } from "react";

import PageHeader from "components/Headers/PageHeader";
import useAdvancedSettings from "hooks/useAdvancedSettings";
import { defaultAdvancedSettings } from "shared/constants";
import { getTranslate } from "shared/translate";

import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import PageNavigator from "../Chapter/PageNavigator";
import { Skeleton } from "../Skeleton";
import { SvgFloralDivider } from "../svgs";
import Commentary from "./Commentary";
import Translation from "./Translation";

type Props = {
  verse: GitaVerse;
} & LocaleAndTranslations;

const Verse = ({
  verse: {
    gita_chapter,
    verse_number,
    chapter_number,
    text,
    transliteration,
    word_meanings,
    gita_translations,
    gita_commentaries,
  },
  translations,
  locale,
}: Props) => {
  const styles = useMyStyles();

  const { advancedSettings, updateAdvancedSettings } =
    useAdvancedSettings(locale);

  const { devanagari, verseText, synonyms, translation, purport } =
    advancedSettings;

  const translate = getTranslate(translations, locale);

  return (
    <>
      <PageHeader
        advancedSettings={advancedSettings}
        updateAdvancedSettings={updateAdvancedSettings}
        translate={translate}
        locale={locale}
      />

      <PageNavigator
        pageCount={18}
        route="verse"
        maxVerseCount={gita_chapter.verses_count}
        verseNumber={verse_number}
        pageNumber={chapter_number}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 text-center font-inter sm:px-6">
        <h1
          className={classNames(
            "font-extrabold dark:text-gray-50",
            styles.fontSize.heading,
          )}
        >
          {translate("BG <%= verseNumber %>", {
            verseNumber: `${chapter_number}.${verse_number}`,
          })}
        </h1>
        {devanagari &&
          (text ? (
            <p
              className={classNames(
                "mx-auto mt-8 max-w-md font-dev text-my-orange",
                styles.fontSize.subHeading1,
              )}
              suppressHydrationWarning
            >
              {text}
            </p>
          ) : (
            <div className="mx-auto flex w-full max-w-md flex-col items-center pt-10">
              <Skeleton height="h-8" width="w-full" margin="mb-2" />
              <Skeleton height="h-8" width="w-5/6" margin="mb-2" />
              <Skeleton height="h-8" width="w-4/5" margin="mb-2" />
            </div>
          ))}
        {verseText && (
          <p
            className={classNames(
              "mx-auto mt-6 max-w-md dark:text-gray-50",
              styles.fontSize.subHeading2,
            )}
          >
            {transliteration}
          </p>
        )}
        {synonyms &&
          (text ? (
            <p
              className={classNames(
                "mx-auto mt-6 dark:text-gray-50",
                styles.fontSize.subHeading2,
              )}
            >
              {word_meanings}
            </p>
          ) : (
            <>
              <div className="mx-auto flex w-full max-w-md flex-col items-center pt-3">
                <Skeleton height="h-5" width="w-full" margin="mb-3" />
                <Skeleton height="h-5" width="w-5/6" margin="mb-3" />
              </div>
              <div className="flex w-full flex-col items-center pt-3">
                <Skeleton height="h-5" width="w-full" margin="mb-3" />
                <Skeleton height="h-5" width="w-5/6" margin="mb-3" />
                <Skeleton height="h-5" width="w-4/5" margin="mb-3" />
              </div>
            </>
          ))}
        {(translation || purport) && (
          <SvgFloralDivider
            className={`my-20 w-full ${
              styles.backgroundColor === "white"
                ? "text-white"
                : "text-yellow-bg"
            } dark:text-dark-bg`}
          />
        )}
        {translation && (
          <Translation
            translationData={gita_translations}
            translations={translations}
            locale={locale}
          />
        )}
        {purport && (
          <Commentary
            commentaryData={gita_commentaries}
            translations={translations}
            locale={locale}
          />
        )}
      </section>
    </>
  );
};

export default Verse;
