"use server";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

import { getDailyVerse } from "../../lib/getDailyVerse";
import { Skeleton } from "../Skeleton";

type Props = {
  locale: Locale;
  translations: Record<string, string>;
};

const VerseOfDay = async (props: Props) => {
  const { translations, locale } = props;

  const dailyVerse = await getDailyVerse(locale);
  const translate = getTranslate(translations, locale);

  return (
    <div className="relative z-10 mx-auto mt-24 max-w-7xl px-4 sm:px-6">
      <div className="rounded-xl bg-white px-12 pb-8 pt-5 text-gray-400 shadow-lg dark:bg-dark-100">
        {dailyVerse ? (
          <>
            <h2 className="divider line one-line mb-4 px-4 font-bold text-my-orange">
              {translate("Verse of the day")} - BG {dailyVerse?.chapter_number}.
              {dailyVerse.verse_number}
            </h2>
            <p className="text-lg">
              {dailyVerse?.gita_translations[0].description}{" "}
            </p>
            <button className="mt-4 text-sm font-bold uppercase text-black hover:text-gray-700 focus:outline-none dark:text-white dark:hover:text-gray-400">
              <LinkWithLocale href="/verse-of-the-day" shallow>
                {translate("See more")}
              </LinkWithLocale>
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
