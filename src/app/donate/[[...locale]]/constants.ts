export function getJsonLdFirst(isHindi: boolean) {
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    name: "Bhagavad Gita",
    url: "https://bhagavadgita.com",
    logo: "https://bhagavadgita.com/static/images/radhakrishna.png",
  };
}

export function getJsonLdTwo(isHindi: boolean) {
  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://bhagavadgita.com",
          name: isHindi ? "होम" : "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": isHindi
            ? "https://bhagavadgita.com/hi/donate"
            : "https://bhagavadgita.com/donate",
          name: isHindi
            ? "दान - भगवद गीता - वेद व्यास फाउंडेशन"
            : "Donate - Bhagavad Gita - Ved Vyas Foundation",
        },
      },
    ],
  };
}
