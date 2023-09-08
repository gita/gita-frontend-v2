"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";

import PageNavigator from "components/Chapter/PageNavigator";
import VerseList from "components/Chapter/VerseList";
import VerseNavigator from "components/Chapter/VerseNavigator";
import { SvgChapterBackground } from "components/svgs";
import useMyStyles from "hooks/useMyStyles";
import { classNames } from "shared/functions";
import { getTranslate } from "shared/translate";

type Props = {
  chapterData: GitaChapterData;
  versesData: Pick<
    GitaVerse,
    "id" | "verse_number" | "gita_translations" | "chapter_number"
  >[];
} & LocaleAndTranslations;

export default function ChapterPage({
  chapterData: {
    chapter_number,
    chapter_summary,
    name_translated,
    verses_count,
  },
  versesData,
  translations,
  locale,
}: Props) {
  const [viewNavigation, setViewNavigation] = useState(false);
  const [verseId, setVerseId] = useState(0);
  const [isAscSorted, setIsAscSorted] = useState(true);
  const styles = useMyStyles();

  const translate = getTranslate(translations, locale);

  const filteredVerses = versesData?.filter((verse) => {
    if (!verseId) return true;
    return verse.verse_number === verseId;
  });

  const sortedVerses = isAscSorted
    ? filteredVerses
    : filteredVerses?.slice(0).reverse();

  return (
    <div>
      <div className="absolute inset-x-0 mx-auto max-w-5xl text-center font-inter">
        <SvgChapterBackground className="relative inset-x-0 bottom-0 m-auto w-full rounded-full text-gray-300 text-opacity-25 dark:text-black dark:text-opacity-25 lg:top-12 lg:w-min" />
      </div>

      <PageNavigator currentChapter={chapter_number} />

      <section className="relative mx-auto max-w-5xl px-4 py-24 text-center font-inter sm:px-6">
        <h3
          className={classNames(
            "font-medium uppercase text-my-orange",
            styles.fontSize.subHeading2,
          )}
        >
          {translate("Chapter")} {chapter_number}
        </h3>
        <h1
          className={classNames(
            "my-8 font-extrabold dark:text-white",
            styles.fontSize.heading,
          )}
        >
          {name_translated}
        </h1>
        <p
          className={classNames(
            "mt-3 text-left dark:text-white",
            styles.fontSize.para,
            styles.lineHeight,
          )}
        >
          {chapter_summary}
        </p>
      </section>

      <div className="mx-auto max-w-5xl px-4 text-center  font-inter sm:px-6">
        <div className="flex items-center justify-between border-y border-gray-200 py-6">
          <div
            className={classNames(
              "font-extrabold dark:text-white",
              styles.fontSize.para,
            )}
          >
            {verses_count} {translate("Verses")}
          </div>
          <div className="relative mt-1 flex rounded-md shadow-sm">
            <div className="relative flex grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "></div>
              <input
                type="text"
                name="verse-id"
                id="verse-id"
                value={verseId ? verseId : ""}
                className={classNames(
                  "block w-28 sm:w-36 rounded-none rounded-l-md border border-gray-300 pl-2 focus:border-my-orange focus:ring-my-orange",
                  styles.fontSize.para,
                )}
                placeholder={translate("Go To Verse")}
                onClick={() => setViewNavigation(!viewNavigation)}
                onChange={() => {}}
              />
            </div>
            <VerseNavigator
              verseCount={verses_count}
              currentChapter={chapter_number}
              currentVerse={verseId}
              viewNavigation={viewNavigation}
              setViewNavigation={setViewNavigation}
              setVerseId={setVerseId}
            />
            <button
              type="button"
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:text-gray-50 dark:hover:bg-dark-bg"
              onClick={() => setIsAscSorted(!isAscSorted)}
            >
              {isAscSorted ? (
                <SortDescendingIcon
                  className="h-5 w-5 text-gray-400 dark:text-gray-50"
                  aria-hidden="true"
                />
              ) : (
                <SortAscendingIcon
                  className="h-5 w-5 text-gray-400 dark:text-gray-50"
                  aria-hidden="true"
                />
              )}
              <span className={styles.fontSize.para}>{translate("Sort")}</span>

              <ChevronDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-50"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-16 max-w-5xl px-4 py-8 font-inter sm:px-6">
        {sortedVerses?.map((verse) => (
          <VerseList key={verse.id} verseData={verse} translate={translate} />
        ))}
      </div>
    </div>
  );
}
