import LinkWithLocale from "components/LinkWithLocale";
import { getVerseData } from "lib/getVerseData";
import { getLanguageSettings } from "shared/functions";

import { SvgChevronLeft, SvgChevronRight } from "../svgs";

interface Props {
  pageNumber: number;
  pageCount: number;
  route: string;
  maxVerseCount?: number;
  verseNumber?: number;
  locale: Locale;
  setVerse?: React.Dispatch<React.SetStateAction<GitaVerse>>;
}

function PageNavigator({
  pageNumber,
  pageCount,
  route,
  maxVerseCount = 0,
  verseNumber = 0,
  locale,
  setVerse,
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

  const onNavClick = async (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    chapterNumber: number,
    verseNumber: number | null,
  ) => {
    if (setVerse) {
      evt.preventDefault();
      evt.stopPropagation();
    }
    const languageSettings = getLanguageSettings(locale);
    const verseData = await getVerseData(
      chapterNumber,
      verseNumber,
      languageSettings.commentaryAuthor.id,
      languageSettings.translationAuthor.id,
    );
    setVerse(verseData);
  };

  return (
    <div className="relative z-10">
      {previousPage >= 1 && (
        <LinkWithLocale
          prefetch={false}
          href={
            route === "verse" && currentVerse > 1
              ? `/chapter/${previousPage}/${route}/${previousVerse}`
              : `/chapter/${previousPage}`
          }
          onClick={(evt) =>
            onNavClick(
              evt,
              previousPage,
              route === "verse" && currentVerse > 1 ? previousVerse : null,
            )
          }
          className="fixed left-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </LinkWithLocale>
      )}
      {nextPage <= pageCount && (
        <LinkWithLocale
          prefetch={false}
          href={
            route === "verse" && maxVerseCount > staticVerse
              ? `/chapter/${nextPage}/${route}/${nextVerse}`
              : `/chapter/${nextPage}`
          }
          onClick={(evt) =>
            onNavClick(
              evt,
              nextPage,
              route === "verse" && maxVerseCount > staticVerse
                ? nextVerse
                : null,
            )
          }
          className="fixed right-3 top-1/2 flex h-10 w-10 items-center justify-center rounded-full border bg-white  hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg"
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </LinkWithLocale>
      )}
    </div>
  );
}

export default PageNavigator;
