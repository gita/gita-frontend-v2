const totalChapters = 18;

export const getPrevPageHref = (
  currentChapter: number,
  currentVerse?: number,
  prevChapterTotalVerses?: number,
) => {
  const prevChapterAvailable = currentChapter > 1;
  const prevChapterNumber = prevChapterAvailable
    ? currentChapter - 1
    : totalChapters;
  if (!currentVerse) {
    return `/chapter/${prevChapterNumber}`;
  }

  const prevVerseAvailable = currentVerse > 1;
  if (!prevVerseAvailable) {
    return `/chapter/${prevChapterNumber}/verse/${prevChapterTotalVerses}`;
  }
  return `/chapter/${currentChapter}/verse/${currentVerse - 1}`;
};

export const getNextPageHref = (
  currentChapter: number,
  currentVerse?: number,
  totalVerses?: number,
) => {
  const nextChapterAvailable = currentChapter < totalChapters;
  const nextChapterNumber = nextChapterAvailable ? currentChapter + 1 : 1;
  if (!currentVerse) {
    return `/chapter/${nextChapterNumber}`;
  }

  const nextVerseAvailable =
    typeof totalVerses === "number" && currentVerse < totalVerses;
  if (!nextVerseAvailable) {
    return `/chapter/${nextChapterNumber}/verse/1`;
  }
  return `/chapter/${currentChapter}/verse/${currentVerse + 1}`;
};
