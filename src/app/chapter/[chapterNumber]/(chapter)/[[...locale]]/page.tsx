import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
import { getChapterData } from "lib/getChapterData";
import { getLanguageSettings, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import ChapterPage from "./ChapterPage";
import { getJsonLd } from "./functions";

type Props = {
  params: {
    chapterNumber: string;
    locale: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapterNumber } = params;
  const chapterData = await getChapterData(
    paramsToLocale(params),
    Number(chapterNumber) || 1,
  );
  if (!chapterData) {
    return {};
  }
  const regex = /"/g;
  const chapterDescription = chapterData.gita_chapters_by_pk.chapter_summary
    .slice(0, 200)
    .replace(regex, "");

  return {
    title: `Bhagavad Gita Chapter ${chapterNumber} - ${chapterData.gita_chapters_by_pk.name_translated} - BhagavadGita.io`,
    description: `${chapterDescription}...`,
    openGraph: {
      url: "https://bhagavadgita.io/",
      siteName: "Bhagavad Gita",
      locale: "en_US",
      type: "article",
      authors: "https://www.facebook.com/iiRadhaKrishnaii/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title: `Bhagavad Gita Chapter ${chapterNumber} - ${chapterData.gita_chapters_by_pk.name_translated} - BhagavadGita.io`,
      description: `${chapterDescription}...`,
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
      title: `Bhagavad Gita Chapter ${chapterNumber} - ${chapterData.gita_chapters_by_pk.name_translated} - BhagavadGita.io`,
      description: `${chapterDescription}...`,
      images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        en: `https://bhagavadgita.io/chapter/${chapterNumber}`,
        "en-US": `https://bhagavadgita.io/chapter/${chapterNumber}`,
        "en-GB": `https://bhagavadgita.io/chapter/${chapterNumber}`,
        "en-IN": `https://bhagavadgita.io/chapter/${chapterNumber}`,
        hi: `https://bhagavadgita.io/chapter/${chapterNumber}/hi`,
      },
      canonical: `https://bhagavadgita.io/chapter/${chapterNumber}`,
    },
  };
}

export default async function Chapter({ params }: Props) {
  const headersList = headers();
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
    return <NotFound hint={`Chapter ${chapterNumber} not found`} />;
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
