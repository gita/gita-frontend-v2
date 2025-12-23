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
