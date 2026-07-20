/**
 * Structured data for a verse page.
 *
 * These pages previously carried only a BreadcrumbList, which told search
 * engines the path to the page but nothing about what was on it. Every verse is
 * now also declared as a CreativeWork that is part of the Bhagavad Gita, which
 * is what lets it be understood as scripture rather than a generic web page.
 */
export const getVerseCreativeWorkJsonLd = ({
  chapterNumber,
  verseNumber,
  chapterName,
  locale,
}: {
  chapterNumber: string;
  verseNumber: string;
  chapterName: string;
  locale: string;
}) => {
  const isHindi = locale === "hi";
  const base = `https://bhagavadgita.com/chapter/${chapterNumber}/verse/${verseNumber}`;
  const url = isHindi ? `${base}/hi` : base;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#verse`,
    url,
    name: isHindi
      ? `भगवद गीता अध्याय ${chapterNumber} श्लोक ${verseNumber}`
      : `Bhagavad Gita Chapter ${chapterNumber}, Verse ${verseNumber}`,
    inLanguage: isHindi ? "hi" : "en",
    position: Number(String(verseNumber).split("-")[0]) || undefined,
    isPartOf: {
      "@type": "Book",
      "@id": "https://bhagavadgita.com/#book",
      name: "Bhagavad Gita",
      alternateName: ["Srimad Bhagavad Gita", "Bhagavad Gita As It Is", "Gita"],
      author: { "@type": "Person", name: "Vyasa" },
      numberOfPages: 700,
      inLanguage: ["sa", "en", "hi"],
      genre: "Scripture",
      url: "https://bhagavadgita.com",
    },
    hasPart: {
      "@type": "Chapter",
      name: chapterName,
      position: Number(chapterNumber),
      url: isHindi
        ? `https://bhagavadgita.com/chapter/${chapterNumber}/hi`
        : `https://bhagavadgita.com/chapter/${chapterNumber}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Ved Vyas Foundation",
      url: "https://bhagavadgita.com",
    },
    isAccessibleForFree: true,
    license: "https://bhagavadgita.com/copyright",
  };
};

export const getJsonLd = (chapterNumber: string, verseNumber: string) => ({
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": "https://bhagavadgita.com",
        name: "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@id": `https://bhagavadgita.com/chapter/${chapterNumber}?page=1`,
        name: `Bhagavad Gita Chapter ${chapterNumber}`,
        image:
          "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@id": `https://bhagavadgita.com/chapter/${chapterNumber}/verse/${verseNumber}`,
        name: `Bhagavad Gita Chapter ${chapterNumber} Verse ${verseNumber}`,
        image:
          "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      },
    },
  ],
});
