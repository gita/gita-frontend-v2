export const jsonLdFirst = {
  "@context": "http://schema.org",
  "@type": "Organization",
  "@id": "#organization",
  name: "Bhagavad Gita",
  url: "https://bhagavadgita.io",
  logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
};

export const jsonLdTwo = {
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
        "@id": "https://bhagavadgita.io/acknowledgements",
        name: "Acknowledgements -  BhagavadGita.io",
      },
    },
  ],
};
