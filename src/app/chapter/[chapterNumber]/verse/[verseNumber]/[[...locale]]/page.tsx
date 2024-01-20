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
  params: { verseNumber, chapterNumber },
}: Props): Promise<Metadata> {
  return {
    title: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`,
    openGraph: {
      url: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}`,
      siteName: "Bhagavad Gita",
      locale: "en_US",
      type: "article",
      authors: "https://www.facebook.com/radhakrishnablog/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`,
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
      title: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`,
      images: ["https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75"],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        en: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}`,
        "en-US": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}`,
        "en-GB": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}`,
        "en-IN": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}`,
        hi: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/hi`,
      },
      canonical: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}`,
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
