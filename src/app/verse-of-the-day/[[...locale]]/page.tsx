import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
import { getDailyVerse } from "lib/getDailyVerse";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import VerseOfTheDay from "./VerseOfTheDay";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Bhagavad Gita - Verse of the Day",
    description: 
      "Daily Bhagavad Gita verse with translation & commentary. Get daily spiritual wisdom from Lord Krishna's teachings. Read in Hindi & English for daily inspiration.",
    openGraph: {
      url: "https://bhagavadgita.io/verse-of-the-day",
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
          url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          secureUrl:
            "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
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
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        en: "https://bhagavadgita.io/verse-of-the-day",
        "en-US": "https://bhagavadgita.io/verse-of-the-day",
        "en-GB": "https://bhagavadgita.io/verse-of-the-day",
        "en-IN": "https://bhagavadgita.io/verse-of-the-day",
        hi: "https://bhagavadgita.io/verse-of-the-day/hi",
      },
      canonical: "https://bhagavadgita.io/verse-of-the-day",
    },
  };
}

const Page = async ({ params }: ParamsWithLocale) => {
  const locale = paramsToLocale(params);
  const dailyVerse = await getDailyVerse(locale);

  if (!dailyVerse) {
    return <NotFound hint="Daily verse not found" />;
  }

  return (
    <VerseOfTheDay
      dailyVerse={dailyVerse}
      translations={await getTranslations(locale)}
      locale={locale}
    />
  );
};

export default Page;
