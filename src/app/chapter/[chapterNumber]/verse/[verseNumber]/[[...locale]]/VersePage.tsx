import Verse from "components/Verse";

type Props = {
  verseData: GitaVerse;
  chapterName: string;
  nextVerseNumber?: string;
  prevVerseNumber?: string;
} & LocaleAndTranslations;

export default function VersePage({
  verseData,
  chapterName,
  translations,
  locale,
  nextVerseNumber,
  prevVerseNumber,
}: Props) {
  return (
    <>
      {verseData && (
        <Verse
          verse={verseData}
          chapterName={chapterName}
          translations={translations}
          locale={locale}
          nextVerseNumber={nextVerseNumber}
          prevVerseNumber={prevVerseNumber}
        />
      )}
      {!verseData && (
        <div className="flex min-h-[50vh] items-center justify-center bg-prakash-bg font-inter dark:bg-nisha-bg">
          <h1 className="text-center text-xl text-muted-foreground">
            This verse was not found
          </h1>
        </div>
      )}
    </>
  );
}
