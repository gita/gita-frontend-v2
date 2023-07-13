"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import { SvgChapterBackground } from "../../../components/svgs";
import PageNavigator from "../../../components/Chapter/PageNavigator";
import classNames from "../../../utils/classNames";
import VerseNavigator from "../../../components/Chapter/VerseNavigator";
import VerseList from "../../../components/Chapter/VerseList";
import useMyStyles from "../../../hooks/useMyStyles";

interface Props {
  chapterData: GitaChapter;
}

export default function ChapterPage({
  chapterData: {
    chapterNumber,
    chapterSummary,
    nameTranslated,
    versesCount,
    gitaVersesByChapterId,
  },
}: Props) {
  const verses = gitaVersesByChapterId?.nodes;

  const [viewNavigation, setViewNavigation] = useState(false);
  const [verseId, setVerseId] = useState(0);
  const [isAscSorted, setisAscSorted] = useState(true);
  const styles = useMyStyles();

  const filteredVerses = verses?.filter((verse) => {
    if (!verseId) return true;
    return verse.verseNumber === verseId;
  });

  const sortedVerses = isAscSorted
    ? filteredVerses
    : filteredVerses?.slice(0).reverse();

  return (
    <div>
      <div className="absolute max-w-5xl font-inter left-0 right-0 mx-auto text-center">
        <SvgChapterBackground className="relative text-gray-300 w-full lg:w-min dark:text-black text-opacity-25 dark:text-opacity-25 rounded-full m-auto left-0 right-0 bottom-0 lg:top-12" />
      </div>

      <PageNavigator
        pageNumber={chapterNumber}
        pageCount={18}
        route="chapter"
      />

      <section className="max-w-5xl font-inter py-24 mx-auto text-center px-4 sm:px-6 relative">
        <h3
          className={classNames(
            "text-my-orange font-medium uppercase",
            styles.fontSize.subHeading2
          )}
        >
          Chapter {chapterNumber}
        </h3>
        <h1
          className={classNames(
            "font-extrabold dark:text-white my-8",
            styles.fontSize.heading
          )}
        >
          {nameTranslated}
        </h1>
        <p
          className={classNames(
            "text-left dark:text-white mt-3",
            styles.fontSize.para,
            styles.lineHeight
          )}
        >
          {chapterSummary}
        </p>
      </section>

      <div className="max-w-5xl font-inter mx-auto text-center  px-4 sm:px-6">
        <div className="flex items-center justify-between border-t py-6 border-b border-gray-200">
          <div
            className={classNames(
              "font-extrabold dark:text-white",
              styles.fontSize.para
            )}
          >
            {versesCount} Verses
          </div>
          <div className="mt-1 flex rounded-md shadow-sm relative">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none "></div>
              <input
                type="text"
                name="verse-id"
                id="verse-id"
                value={verseId ? verseId : ""}
                className={classNames(
                  "focus:ring-my-orange border focus:border-my-orange block w-full rounded-none rounded-l-md pl-2 border-gray-300",
                  styles.fontSize.para
                )}
                placeholder="Go To Verse"
                onClick={() => setViewNavigation(!viewNavigation)}
                onChange={() => {}}
              />
            </div>
            <VerseNavigator
              verseCount={versesCount}
              currentVerse={verseId}
              viewNavigation={viewNavigation}
              setViewNavigation={setViewNavigation}
              setVerseId={setVerseId}
            />
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium dark:bg-dark-100 rounded-r-md text-gray-700 dark:text-gray-50 bg-gray-50 hover:bg-gray-100 dark:hover:bg-dark-bg focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
              onClick={() => setisAscSorted(!isAscSorted)}
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
              <span className={styles.fontSize.para}>Sort</span>

              <ChevronDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-50"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl font-inter py-8 mb-16 mx-auto px-4 sm:px-6">
        {sortedVerses?.map((verse) => (
          <VerseList verseData={verse} key={verse.id} />
        ))}
      </div>
    </div>
  );
}
