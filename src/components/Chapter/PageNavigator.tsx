"use client";

import { useRouter } from "next/navigation";

import LinkWithLocale from "components/LinkWithLocale";

import { SvgChevronLeft, SvgChevronRight } from "../svgs";
import { getNextPageHref, getPrevPageHref } from "./functions";

interface Props {
  currentChapter: number;
  currentVerse?: number;
  totalVerses?: number;
  prevChapterTotalVerses?: number;
}

function PageNavigator({
  currentChapter,
  currentVerse,
  totalVerses,
  prevChapterTotalVerses,
}: Props) {
  useRouter();

  return (
    <div className="relative z-10">
      <LinkWithLocale
        prefetch={false}
        href={getPrevPageHref(
          currentChapter,
          currentVerse,
          prevChapterTotalVerses,
        )}
        className="fixed left-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
      >
        <SvgChevronLeft className="dark:text-gray-50" />
      </LinkWithLocale>
      <LinkWithLocale
        prefetch={false}
        href={getNextPageHref(currentChapter, currentVerse, totalVerses)}
        className="fixed right-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
      >
        <SvgChevronRight className="dark:text-gray-50" />
      </LinkWithLocale>
    </div>
  );
}

export default PageNavigator;
