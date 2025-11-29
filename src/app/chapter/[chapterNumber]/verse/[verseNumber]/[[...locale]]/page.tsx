import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
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

// Pre-generate popular verses (Chapters 1-6) for better SEO
// Other verses are generated on-demand and cached forever
export async function generateStaticParams() {
  const verseCounts = [47, 72, 43, 42, 29, 47]; // Verse counts for chapters 1-6
  const verses: Array<{ chapterNumber: string; verseNumber: string; locale: string[] }> = [];
  
  // Generate all verses for chapters 1-6 in both languages
  for (let chapter = 1; chapter <= 6; chapter++) {
    for (let verse = 1; verse <= verseCounts[chapter - 1]; verse++) {
      verses.push(
        { chapterNumber: String(chapter), verseNumber: String(verse), locale: [] }, // English
        { chapterNumber: String(chapter), verseNumber: String(verse), locale: ["hi"] }, // Hindi
      );
    }
  }
  
  return verses;
}

// Bhagavad Gita verses never change - cache forever once generated
export const revalidate = false;

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
    Number(verseNumber) || 1,
    1, // default commentary author
    1, // default translation author
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
    ? `भगवद् गीता अध्याय ${chapterNumber} श्लोक ${verseNumber} - BhagavadGita.io`
    : `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`;

  return {
    title,
    description,
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

  const verseData = await getVerseData(
    Number(chapterNumber) || 1,
    Number(verseNumber) || 1,
    languageSettings.commentaryAuthor.id,
    languageSettings.translationAuthor.id,
  );

  if (!verseData) {
    return <NotFound hint={`Verse ${verseNumber} not found`} />;
  }

  const translations = await getTranslations(locale);

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
        translations={translations}
        locale={locale}
      />
    </article>
  );
};

export default Verse;
