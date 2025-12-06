import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
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

// Generate verses dynamically for faster builds
// Static generation can be re-enabled later for production optimization
export const dynamic = "force-dynamic";

// Pre-generate popular verses (Chapters 1-6) for better SEO (disabled for now)
// Other verses are generated on-demand and cached forever
// export async function generateStaticParams() {
//   const verseCounts = [47, 72, 43, 42, 29, 47]; // Verse counts for chapters 1-6
//   const verses: Array<{
//     chapterNumber: string;
//     verseNumber: string;
//     locale: string[];
//   }> = [];
//
//   // Generate all verses for chapters 1-6 in both languages
//   for (let chapter = 1; chapter <= 6; chapter++) {
//     for (let verse = 1; verse <= verseCounts[chapter - 1]; verse++) {
//       verses.push(
//         {
//           chapterNumber: String(chapter),
//           verseNumber: String(verse),
//           locale: [],
//         }, // English
//         {
//           chapterNumber: String(chapter),
//           verseNumber: String(verse),
//           locale: ["hi"],
//         }, // Hindi
//       );
//     }
//   }
//
//   return verses;
// }

// Bhagavad Gita verses never change - cache forever once generated
// export const revalidate = false;

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
  const [verseData, chapterData] = await Promise.all([
    getVerseData(
      Number(chapterNumber) || 1,
      Number(verseNumber) || 1,
      languageSettings.commentaryAuthor.id,
      languageSettings.translationAuthor.id,
    ),
    getChapterData(locale, Number(chapterNumber) || 1),
  ]);

  if (!verseData) {
    return <NotFound hint={`Verse ${verseNumber} not found`} />;
  }

  const translations = await getTranslations(locale);
  const chapterName =
    chapterData?.gita_chapters_by_pk?.name_translated ||
    `Chapter ${chapterNumber}`;

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
      />
    </article>
  );
};

export default Verse;
