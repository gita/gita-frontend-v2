import { Metadata } from "next";
import { getChapterData } from "lib/getChapterData";
import ChapterPage from "./chapter-page";

type Props = {
  params: {
    chapterNumber: string;
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
    },
  };
}

export default async function Chapter({ params: { chapterNumber } }: Props) {
  const chapterData = await getChapterData(parseInt(chapterNumber));

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
    return <h1 className="p-10 text-center">Not found</h1>;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ChapterPage
        chapterData={chapterData.gita_chapters_by_pk}
        versesData={chapterData.gita_verses}
      />
    </>
  );
}
