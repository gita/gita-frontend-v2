export const jsonLdFirst = {
  "@context": "http://schema.org",
  "@type": "Organization",
  "@id": "#organization",
  name: "Bhagavad Gita",
  url: "https://bhagavadgita.io",
  logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
  sameAs: [
    "https://www.facebook.com/iiRadhaKrishnaii/",
    "https://www.linkedin.com/company/bhagavadgita/",
    "https://www.pinterest.com/iiradhakrishnaii/",
    "https://twitter.com/ShriKrishna",
  ],
};

export const getJsonLdTwo = (locale: string) => ({
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id":
          locale === "hi"
            ? "https://bhagavadgita.io/hi"
            : "https://bhagavadgita.io",
        name: locale === "hi" ? "होम" : "Home",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@id":
          locale === "hi"
            ? "https://bhagavadgita.io/gitagpt/hi"
            : "https://bhagavadgita.io/gitagpt",
        name:
          locale === "hi"
            ? "Bhagavad Gita AI - Gita GPT - Ask Krishna"
            : "Bhagavad Gita AI - Gita GPT - Ask Krishna",
      },
    },
  ],
});
