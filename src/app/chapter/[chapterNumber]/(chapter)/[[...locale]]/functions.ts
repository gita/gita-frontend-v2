export const getJsonLd = (chapterNumber: string, nameTranslated?: string) => ({
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
        "@id": `https://bhagavadgita.com/chapter/${chapterNumber}`,
        name: `Bhagavad Gita Chapter ${chapterNumber} - ${nameTranslated}`,
        image:
          "https://bhagavadgita.com/banner2.png",
      },
    },
  ],
});
