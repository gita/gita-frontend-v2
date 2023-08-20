import { Suspense } from "react";
import { Metadata } from "next";
import { getVerseId } from "../../../../../lib/getVerseData";
import VersePage from "./verse-page";

function VerseFallback() {
  return <>Loading...</>;
}

type Props = {
  params: { chapterNumber: string; verseNumber: string };
};

export async function generateStaticParams() {
  const data = await getVerseId();

  return data.gita_verses.map(({ chapter_number, verse_number }) => ({
    params: {
      chapterNumber: chapter_number.toString(),
      verseNumber: verse_number.toString(),
    },
  }));
}

export async function generateMetadata({
  params: { verseNumber, chapterNumber },
}: Props): Promise<Metadata> {
  return {
    title: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`,
    openGraph: {
      url: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
      siteName: "Bhagavad Gita",
      locale: "en_US",
      type: "article",
      authors: "https://www.facebook.com/radhakrishnablog/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`,
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
      title: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber} - BhagavadGita.io`,
      images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        en: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
        "en-US": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
        "en-GB": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
        "en-IN": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
        hi: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/hi`,
      },
      canonical: `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
    },
  };
}

const Verse = async ({ params: { chapterNumber, verseNumber } }: Props) => {
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
          "@id": `https://bhagavadgita.io/chapter/${chapterNumber}?page=1`,
          name: `Bhagavad Gita Chapter ${chapterNumber}`,
          image: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@id": `https://bhagavadgita.io/chapter/${chapterNumber}/verse/${verseNumber}/`,
          name: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber}`,
          image: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
        },
      },
    ],
  };

  return (
    <Suspense fallback={<VerseFallback />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VersePage chapterNumber={chapterNumber} verseNumber={verseNumber} />;
    </Suspense>
  );
};

export default Verse;
