const totalChapters = 18;

const getSearchPostfix = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const prefix = searchParams.size ? "?" : "";
  return `${prefix}${searchParams.toString()}`;
};

export const getPrevPageHref = (
  currentChapter: number,
  currentVerse?: number,
  prevChapterTotalVerses?: number,
) => {
  const searchPostfix = getSearchPostfix();
  const prevChapterAvailable = currentChapter > 1;
  const prevChapterNumber = prevChapterAvailable
    ? currentChapter - 1
    : totalChapters;
  if (!currentVerse) {
    return `/chapter/${prevChapterNumber}${searchPostfix}`;
  }

  const prevVerseAvailable = currentVerse > 1;
  if (!prevVerseAvailable) {
    return `/chapter/${prevChapterNumber}/verse/${prevChapterTotalVerses}${searchPostfix}`;
  }
  return `/chapter/${currentChapter}/verse/${currentVerse - 1}${searchPostfix}`;
};

export const getNextPageHref = (
  currentChapter: number,
  currentVerse?: number,
  totalVerses?: number,
) => {
  const searchPostfix = getSearchPostfix();
  const nextChapterAvailable = currentChapter < totalChapters;
  const nextChapterNumber = nextChapterAvailable ? currentChapter + 1 : 1;
  if (!currentVerse) {
    return `/chapter/${nextChapterNumber}${searchPostfix}`;
  }

  const nextVerseAvailable =
    typeof totalVerses === "number" && currentVerse < totalVerses;
  if (!nextVerseAvailable) {
    return `/chapter/${nextChapterNumber}/verse/1${searchPostfix}`;
  }
  return `/chapter/${currentChapter}/verse/${currentVerse + 1}${searchPostfix}`;
};
