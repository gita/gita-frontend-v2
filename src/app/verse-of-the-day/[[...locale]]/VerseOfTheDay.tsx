"use client";

import Verse from "components/Verse";

type Props = {
  dailyVerse: GitaVerse;
  chapterName: string;
} & LocaleAndTranslations;

const VerseOfTheDay = ({
  dailyVerse,
  chapterName,
  translations,
  locale,
}: Props) => {
  return (
    <div className="font-inter">
      {dailyVerse && (
        <Verse
          verse={dailyVerse}
          chapterName={chapterName}
          translations={translations}
          locale={locale}
        />
      )}
    </div>
  );
};

export default VerseOfTheDay;
