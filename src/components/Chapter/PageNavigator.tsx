import Link from "next/link";
import { SvgChevronLeft, SvgChevronRight } from "../svgs";

interface Props {
  pageNumber: number;
  pageCount: number;
  route: string;
  maxVerseCount?: number;
  verseNumber?: number;
}

function PageNavigator({
  pageNumber,
  pageCount,
  route,
  maxVerseCount = 0,
  verseNumber = 0,
}: Props) {
  const staticVerse = verseNumber;
  let currentVerse = verseNumber;
  const nextPage =
    route === "verse"
      ? verseNumber >= maxVerseCount
        ? pageNumber + 1
        : pageNumber
      : pageNumber + 1;
  const previousPage =
    route === "verse"
      ? verseNumber === 1
        ? pageNumber - 1
        : pageNumber
      : pageNumber - 1;
  const nextVerse =
    verseNumber >= maxVerseCount ? (verseNumber = 1) : verseNumber + 1;

  const previousVerse = currentVerse >= 2 ? currentVerse - 1 : verseNumber;

  return (
    <div className="relative z-10">
      {previousPage >= 1 && (
        <Link
          prefetch={false}
          href={
            route === "verse" && currentVerse > 1
              ? `/chapter/${previousPage}/${route}/${previousVerse}`
              : `/chapter/${previousPage}`
          }
          className="z-neg fixed left-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </Link>
      )}
      {nextPage <= pageCount && (
        <Link
          prefetch={false}
          href={
            route === "verse" && maxVerseCount > staticVerse
              ? `/chapter/${nextPage}/${route}/${nextVerse}`
              : `/chapter/${nextPage}`
          }
          className="z-neg fixed right-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </Link>
      )}
    </div>
  );
}

export default PageNavigator;
