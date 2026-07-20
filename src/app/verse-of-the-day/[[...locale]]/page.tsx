import { Metadata } from "next";
import { notFound } from "next/navigation";

import NotFound from "components/NotFound";
import { getChapterData } from "lib/getChapterData";
import { getDailyVerse } from "lib/getDailyVerse";
import { isValidLocaleSegment, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import VerseOfTheDay from "./VerseOfTheDay";

// Pre-generate for both languages
export async function generateStaticParams() {
  return [{ locale: [] }, { locale: ["hi"] }];
}

// Revalidate daily to show fresh verse
export const revalidate = 86400; // 24 hours

export async function generateMetadata({
  params: paramsPromise,
}: ParamsWithLocale): Promise<Metadata> {
  const params = await paramsPromise;
  const isHindi = paramsToLocale(params) === "hi";

  return {
    title: isHindi
      ? "भगवद गीता आज का श्लोक - प्रतिदिन का ज्ञान"
      : "Bhagavad Gita Verse of the Day - Daily Wisdom in Hindi & English",
    description:
      "Daily Bhagavad Gita verse with translation & commentary. Get fresh spiritual wisdom from Lord Krishna's teachings every day. Free in Hindi & English.",
    keywords:
      "bhagavad gita verse of the day, daily gita verse, gita shloka of the day, krishna quote daily, bhagavad gita daily wisdom",
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      url: isHindi
        ? "https://bhagavadgita.com/verse-of-the-day/hi"
        : "https://bhagavadgita.com/verse-of-the-day",
      siteName: "Bhagavad Gita",
      locale: "en_US",
      type: "article",
      authors: "https://www.facebook.com/radhakrishnablog/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title: "Bhagavad Gita - Verse of the Day",
      description:
        "Daily Bhagavad Gita verse with translation & commentary. Get daily spiritual wisdom from Lord Krishna's teachings. Read in Hindi & English for daily inspiration.",
      images: [
        {
          url: "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          secureUrl:
            "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          height: 1080,
          width: 1920,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bhagavad Gita - Verse of the Day",
      description:
        "Daily Bhagavad Gita verse with translation & commentary. Get daily spiritual wisdom from Lord Krishna's teachings. Read in Hindi & English for daily inspiration.",
      images: [
        "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        "x-default": "https://bhagavadgita.com/verse-of-the-day",
        en: "https://bhagavadgita.com/verse-of-the-day",
        hi: "https://bhagavadgita.com/verse-of-the-day/hi",
      },
      // Was hardcoded to the English URL, so the Hindi page canonicalised away.
      canonical: isHindi
        ? "https://bhagavadgita.com/verse-of-the-day/hi"
        : "https://bhagavadgita.com/verse-of-the-day",
    },
  };
}

const Page = async ({ params: paramsPromise }: ParamsWithLocale) => {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const dailyVerse = await getDailyVerse(locale);

  if (!dailyVerse) {
    return <NotFound hint="Daily verse not found" />;
  }

  // Fetch chapter data for chapter name
  const chapterData = await getChapterData(locale, dailyVerse.chapter_number);
  const chapterName =
    chapterData?.gita_chapters_by_pk?.name_translated ||
    `Chapter ${dailyVerse.chapter_number}`;

  return (
    <VerseOfTheDay
      dailyVerse={dailyVerse}
      chapterName={chapterName}
      translations={await getTranslations(locale)}
      locale={locale}
    />
  );
};

export default Page;
