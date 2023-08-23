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
          className="rounded-full h-10 w-10 fixed z-neg top-1/2 left-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border"
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
          className="rounded-full h-10 w-10 fixed z-neg top-1/2 right-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border"
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </Link>
      )}
    </div>
  );
}

export default PageNavigator;
