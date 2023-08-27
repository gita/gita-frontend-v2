import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
import { getDailyVerse } from "lib/getDailyVerse";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import { VerseOfTheDay } from "./verse-of-the-day";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Bhagavad Gita - Verse of the Day`,
    openGraph: {
      url: `https://bhagavadgita.io/verse-of-the-day`,
      siteName: "Bhagavad Gita",
      locale: "en_US",
      type: "article",
      authors: "https://www.facebook.com/radhakrishnablog/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title: `Bhagavad Gita - Verse of the Day`,
      images: [
        {
          url: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
          secureUrl:
            "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
          height: 1080,
          width: 1920,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Bhagavad Gita - Verse of the Day`,
      images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        en: `https://bhagavadgita.io/verse-of-the-day`,
        "en-US": `https://bhagavadgita.io/verse-of-the-day`,
        "en-GB": `https://bhagavadgita.io/verse-of-the-day`,
        "en-IN": `https://bhagavadgita.io/verse-of-the-day`,
        hi: `https://bhagavadgita.io/verse-of-the-day/hi`,
      },
      canonical: `https://bhagavadgita.io/verse-of-the-day`,
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
