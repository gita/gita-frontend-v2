import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import NotFound from "components/NotFound";
import { loadChapters } from "lib/data";
import { findVerseRange } from "lib/data/loaders";
import { getChapterData } from "lib/getChapterData";
import { getVerseData } from "lib/getVerseData";
import { getLanguageSettings, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import VersePage from "./VersePage";
import { getJsonLd } from "./functions";

type Props = {
  params: Promise<{
    chapterNumber: string;
    verseNumber: string;
    locale: string[];
  }>;
};

// Generate all verse pages at build time for optimal SEO and performance
// This creates actual verses from data (including ranges like "4-6") × 2 languages
export async function generateStaticParams() {
  const verseIds = await (await import("lib/getVerseData")).getVerseId();
  const params: Array<{
    chapterNumber: string;
    verseNumber: string;
    locale: string[];
  }> = [];

  for (const verse of verseIds) {
    // English version (default)
    params.push({
      chapterNumber: String(verse.chapter_number),
      verseNumber: verse.verse_number, // Can be "4" or "4-6"
      locale: [],
    });
    // Hindi version
    params.push({
      chapterNumber: String(verse.chapter_number),
      verseNumber: verse.verse_number, // Can be "4" or "4-6"
      locale: ["hi"],
    });
  }

  return params;
}

// Bhagavad Gita verses never change - cache forever once generated
export const revalidate = false;

// Return 404 for paths not generated at build time
export const dynamicParams = false;

export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  const params = await paramsPromise;
  const { verseNumber, chapterNumber, locale: localeParams } = params;
  const locale = paramsToLocale({ locale: localeParams });
  const isHindi = locale === "hi";
  const baseUrl = "https://bhagavadgita.io";
  const verseUrl = `${baseUrl}/chapter/${chapterNumber}/verse/${verseNumber}`;

  const verseData = await getVerseData(
    Number(chapterNumber) || 1,
    verseNumber, // Keep as string to support ranges like "4-6"
    isHindi ? 1 : 16, // default commentary author (Ramsukhdas for Hindi, Sivananda for English)
    isHindi ? 1 : 16, // default translation author
    locale,
  );

  if (!verseData) {
    return {};
  }

  // Create description with verse text and translation, limited to 160 chars
  const prefix = isHindi
    ? `भगवद् गीता ${chapterNumber}.${verseNumber}: `
    : `Bhagavad Gita ${chapterNumber}.${verseNumber}: `;
  const verseText = verseData.text;
  const verseTranslation = verseData.gita_translations[0]?.description || "";

  // Calculate remaining space after prefix
  const remainingSpace = 157 - prefix.length; // 157 to leave room for "..."
  const description =
    prefix +
    (verseText.length > remainingSpace
      ? verseText.slice(0, remainingSpace) + "..."
      : verseText);

  const title = isHindi
    ? `भगवद गीता ${chapterNumber}.${verseNumber} - अध्याय ${chapterNumber} श्लोक ${verseNumber} हिंदी और अंग्रेजी`
    : `Bhagavad Gita ${chapterNumber}.${verseNumber} - Chapter ${chapterNumber} Verse ${verseNumber} in Hindi & English`;

  return {
    title,
    description,
    keywords: isHindi
      ? `भगवद गीता ${chapterNumber}.${verseNumber}, अध्याय ${chapterNumber} श्लोक ${verseNumber}, भगवद गीता हिंदी अंग्रेजी, गीता श्लोक ${chapterNumber}.${verseNumber} अर्थ`
      : `bhagavad gita ${chapterNumber}.${verseNumber}, bhagavad gita chapter ${chapterNumber} verse ${verseNumber}, bhagavad gita ${chapterNumber} ${verseNumber} meaning, gita verse ${chapterNumber}.${verseNumber} hindi english`,
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      url: isHindi ? `${verseUrl}/hi` : verseUrl,
      siteName: "Bhagavad Gita",
      locale: isHindi ? "hi_IN" : "en_US",
      type: "article",
      authors: "https://www.facebook.com/radhakrishnablog/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title,
      description,
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
      title,
      description,
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        "x-default": verseUrl,
        en: verseUrl,
        "en-US": verseUrl,
        "en-GB": verseUrl,
        "en-IN": verseUrl,
        hi: `${verseUrl}/hi`,
      },
      canonical: isHindi ? `${verseUrl}/hi` : verseUrl,
    },
  };
}

const Verse = async ({ params: paramsPromise }: Props) => {
  const params = await paramsPromise;
  const { chapterNumber, verseNumber } = params;

  const locale = paramsToLocale(params);

  const headersList = await headers();
  const languageSettings = getLanguageSettings(locale, {
    translationAuthorId: parseInt(headersList.get("x-settings-t") || ""),
    commentaryAuthorId: parseInt(headersList.get("x-settings-c") || ""),
  });

  // Fetch verse and chapter data in parallel
  const [verseData, chapterData, commonVerses] = await Promise.all([
    getVerseData(
      Number(chapterNumber) || 1,
      verseNumber, // Keep as string to support ranges like "4-6"
      languageSettings.commentaryAuthor.id,
      languageSettings.translationAuthor.id,
      locale,
    ),
    getChapterData(locale, Number(chapterNumber) || 1),
    // Get all verses for navigation
    (async () => {
      const { getCommonVersesForChapter } = await import("lib/data/loaders");
      return getCommonVersesForChapter(
        Number(chapterNumber) || 1,
        locale === "hi" ? "hi" : "en",
      );
    })(),
  ]);

  // If verse not found, check if it's part of a range and redirect
  if (!verseData) {
    const verseRange = await findVerseRange(
      Number(chapterNumber) || 1,
      verseNumber,
      locale,
    );

    if (verseRange) {
      // Verse is part of a range, redirect to the range URL
      const localePrefix = locale === "hi" ? "/hi" : "";
      redirect(`/chapter/${chapterNumber}/verse/${verseRange}${localePrefix}`);
    }

    return <NotFound hint={`Verse ${verseNumber} not found`} />;
  }

  const translations = await getTranslations(locale);
  const chapterName =
    chapterData?.gita_chapters_by_pk?.name_translated ||
    `Chapter ${chapterNumber}`;

  // Note: Verses are already sorted in the JSON files
  // Find next and previous verse numbers from the actual data
  const currentIndex = commonVerses.findIndex(
    (v) => v.verse_number === verseNumber,
  );
  const nextVerseNumber =
    currentIndex >= 0 && currentIndex < commonVerses.length - 1
      ? commonVerses[currentIndex + 1]?.verse_number
      : undefined;
  const prevVerseNumber =
    currentIndex > 0 ? commonVerses[currentIndex - 1]?.verse_number : undefined;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLd(chapterNumber, verseNumber)),
        }}
      />
      <VersePage
        verseData={verseData}
        chapterName={chapterName}
        translations={translations}
        locale={locale}
        nextVerseNumber={nextVerseNumber}
        prevVerseNumber={prevVerseNumber}
      />
    </article>
  );
};

export default Verse;
