import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
import { getVerseData } from "lib/getVerseData";
import { getLanguageSettings, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import VersePage from "./VersePage";
import { getJsonLd } from "./functions";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    chapterNumber: string;
    verseNumber: string;
    locale: string[];
  };
};

export async function generateMetadata({
  params: { verseNumber, chapterNumber, locale: localeParams },
}: Props): Promise<Metadata> {
  const locale = paramsToLocale({ locale: localeParams });
  const isHindi = locale === 'hi';
  const baseUrl = 'https://bhagavadgita.io';
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

  const verseText = verseData.text.slice(0, 100);
  const verseTranslation = verseData.gita_translations[0]?.description?.slice(0, 100);
  const description = isHindi 
    ? `भगवद् गीता अध्याय ${chapterNumber} श्लोक ${verseNumber}: ${verseText}... ${verseTranslation}...`
    : `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber}: ${verseText}... ${verseTranslation}...`;

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
          secureUrl: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          height: 1080,
          width: 1920,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75"],
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

const Verse = async ({ params }: Props) => {
  const { chapterNumber, verseNumber } = params;

  const locale = paramsToLocale(params);

  const headersList = headers();
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
