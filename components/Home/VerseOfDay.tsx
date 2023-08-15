import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "../Shared/Skeleton";
import { getDailyVerse } from "../../lib/getDailyVerse";

const VerseOfDay = () => {
  const [dailyVerse, setDailyVerse] = useState<GitaVerse | null>(null);

  useEffect(() => {
    const getVerseOfTheDay = async () => {
      const dailyVerse = await getDailyVerse();
      setDailyVerse(dailyVerse);
    };

    if (!dailyVerse) {
      getVerseOfTheDay();
    }
  }, [dailyVerse]);

  return (
    <div className="relative max-w-7xl mx-auto z-10 px-4 sm:px-6 mt-24">
      <div className="bg-white dark:bg-dark-100 shadow-lg rounded-xl px-12 pb-8 pt-5 text-gray-400">
        {dailyVerse ? (
          <>
            <h2 className="text-my-orange font-bold mb-4 divider line one-line px-4">
              Verse of the day - BG {dailyVerse?.chapter_number}.
              {dailyVerse.verse_number}
            </h2>
            <p className="text-lg">
              {dailyVerse?.gita_translations[0].description}{" "}
            </p>
            <button className="uppercase text-black dark:text-white mt-4 font-bold text-sm hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none">
              <Link href="/verse-of-the-day" shallow>
                See more
              </Link>
            </button>
          </>
        ) : (
          <>
            <Skeleton height="h-4" width="w-2/12" margin="my-4" />
            <Skeleton height="h-5" width="w-10/12" margin="mb-3" />
            <Skeleton height="h-5" width="w-9/12" margin="mb-4" />
            <Skeleton height="h-5" width="w-1/12" margin="mb-3" />
          </>
        )}
      </div>
    </div>
  );
};
export default VerseOfDay;
