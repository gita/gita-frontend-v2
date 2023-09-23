export const pageJsonLd = {
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
        "@id": "https://bhagavadgita.io/gitagpt",
        name: "Gita GPT - AI chatbot trained on Bhagavad Gita",
      },
    },
  ],
};
