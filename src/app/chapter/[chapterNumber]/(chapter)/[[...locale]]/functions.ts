export const getJsonLd = (chapterNumber: string, nameTranslated?: string) => ({
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
        "@id": `https://bhagavadgita.io/chapter/${chapterNumber}`,
        name: `Bhagavad Gita Chapter ${chapterNumber} - ${nameTranslated}`,
        image: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      },
    },
  ],
});
