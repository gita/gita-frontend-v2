import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import NotFound from "components/NotFound";
import { getChapterData } from "lib/getChapterData";
import { getLanguageSettings, isValidLocaleSegment, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import ChapterPage from "./ChapterPage";
import { getJsonLd } from "./functions";

import { ogImageUrl } from "@/lib/og/brand";

type Props = {
  params: Promise<{
    chapterNumber: string;
    locale: string[];
  }>;
};

// Pre-generate all 18 chapters for both English and Hindi
// Only 36 pages total - good for SEO and fast builds
export async function generateStaticParams() {
  const chapters = Array.from({ length: 18 }, (_, i) => i + 1);

  return chapters.flatMap((chapter) => [
    { chapterNumber: String(chapter), locale: [] }, // English
    { chapterNumber: String(chapter), locale: ["hi"] }, // Hindi
  ]);
}

// Bhagavad Gita text never changes - no need for revalidation
// Static pages generated with default authors for SEO
// User preferences still work via headers at request time
export const revalidate = false; // Never revalidate - content is eternal

export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  const params = await paramsPromise;
  const { chapterNumber } = params;
  const locale = paramsToLocale(params);
  const isHindi = locale === "hi";
  const baseUrl = "https://bhagavadgita.com";
  const chapterUrl = `${baseUrl}/chapter/${chapterNumber}`;

  const chapterData = await getChapterData(locale, Number(chapterNumber) || 1);
  if (!chapterData) {
    return {};
  }

  // Get first sentence and limit to 160 chars
  const firstSentence =
    chapterData.gita_chapters_by_pk.chapter_summary.split(/[.!?]+\s+/)[0];
  const chapterDescription =
    firstSentence.length > 157
      ? firstSentence.slice(0, 157) + "..."
      : firstSentence + ".";

  const title = isHindi
    ? `भगवद गीता अध्याय ${chapterNumber}: ${chapterData.gita_chapters_by_pk.name_translated}`
    : `Bhagavad Gita Chapter ${chapterNumber}: ${chapterData.gita_chapters_by_pk.name_translated} in Hindi & English`;

  return {
    title,
    description: chapterDescription,
    keywords: isHindi
      ? `भगवद गीता अध्याय ${chapterNumber}, ${chapterData.gita_chapters_by_pk.name_translated}, भगवद गीता हिंदी, गीता अध्याय ${chapterNumber}`
      : `bhagavad gita chapter ${chapterNumber}, ${chapterData.gita_chapters_by_pk.name_translated}, bhagavad gita chapter ${chapterNumber} hindi english, gita chapter ${chapterNumber} with commentary`,
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      images: [ogImageUrl({
        eyebrow: `Chapter ${chapterNumber}`,
        heading: `Bhagavad Gita, Chapter ${chapterNumber}`,
        subheading:
          "Sanskrit, transliteration, word meanings, translation and commentary for every verse.",
      })],
      url: isHindi ? `${chapterUrl}/hi` : chapterUrl,
      siteName: "Bhagavad Gita",
      locale: isHindi ? "hi_IN" : "en_US",
      type: "article",
      authors: "https://www.facebook.com/iiRadhaKrishnaii/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title,
      description: chapterDescription,
    },
    twitter: {
      images: [ogImageUrl({
        eyebrow: `Chapter ${chapterNumber}`,
        heading: `Bhagavad Gita, Chapter ${chapterNumber}`,
        subheading:
          "Sanskrit, transliteration, word meanings, translation and commentary for every verse.",
      })],
      card: "summary_large_image",
      title,
      description: chapterDescription,
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        "x-default": chapterUrl,
        en: chapterUrl,
        "en-US": chapterUrl,
        "en-GB": chapterUrl,
        "en-IN": chapterUrl,
        hi: `${chapterUrl}/hi`,
      },
      canonical: isHindi ? `${chapterUrl}/hi` : chapterUrl,
    },
  };
}

export default async function Chapter({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  if (!isValidLocaleSegment(params)) notFound();
  const headersList = await headers();
  const locale = paramsToLocale(params);
  const languageSettings = getLanguageSettings(locale, {
    translationAuthorId: parseInt(headersList.get("x-settings-t") || ""),
    commentaryAuthorId: parseInt(headersList.get("x-settings-c") || ""),
  });

  const { chapterNumber } = params;

  const chapterData = await getChapterData(
    locale,
    Number(chapterNumber) || 1,
    languageSettings.translationAuthor.id,
  );

  if (!chapterData) {
    // A real 404, not a 200 carrying a "not found" message. The soft-404
    // shipped no <title> and no canonical, which is the worst of both.
    notFound();
  }

  const translations = await getTranslations(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getJsonLd(
              chapterNumber,
              chapterData?.gita_chapters_by_pk.name_translated,
            ),
          ),
        }}
      />
      <ChapterPage
        chapterData={chapterData.gita_chapters_by_pk}
        versesData={chapterData.gita_verses}
        translations={translations}
        locale={locale}
      />
    </>
  );
}
