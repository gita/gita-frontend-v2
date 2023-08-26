import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
import { getChapterData } from "lib/getChapterData";
import { getLanguageSettings, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import ChapterPage from "./chapter-page";

type Props = {
  params: {
    chapterNumber: string;
    locale: string[];
  };
};

export async function generateMetadata({
  params: { chapterNumber },
}: Props): Promise<Metadata> {
  const chapterData = await getChapterData(parseInt(chapterNumber));
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
      authors: "https://www.facebook.com/radhakrishnablog/",
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
        en: `https://bhagavadgita.io/chapter/${chapterNumber}/`,
        "en-US": `https://bhagavadgita.io/chapter/${chapterNumber}/`,
        "en-GB": `https://bhagavadgita.io/chapter/${chapterNumber}/`,
        "en-IN": `https://bhagavadgita.io/chapter/${chapterNumber}/`,
        hi: `https://bhagavadgita.io/chapter/${chapterNumber}/hi`,
      },
      canonical: `https://bhagavadgita.io/chapter/${chapterNumber}/`,
    },
  };
}

export default async function Chapter({ params }: Props) {
  const headersList = headers();
  const languageSettings = getLanguageSettings({
    translationAuthorId: parseInt(headersList.get("x-settings-t") || ""),
    commentaryAuthorId: parseInt(headersList.get("x-settings-c") || ""),
  });

  const { chapterNumber } = params;

  const chapterData = await getChapterData(
    parseInt(chapterNumber),
    languageSettings.translationAuthor.name,
  );

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://bhagavadgita.io",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `https://bhagavadgita.io/chapter/${chapterNumber}/`,
          name: `Bhagavad Gita Chapter ${chapterNumber} - ${chapterData?.gita_chapters_by_pk.name_translated}`,
          image: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
        },
      },
    ],
  };

  if (!chapterData) {
    return <NotFound hint={`Chapter ${chapterNumber} not found`} />;
  }

  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
