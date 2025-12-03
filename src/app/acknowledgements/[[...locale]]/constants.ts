export function getJsonLdFirst(isHindi: boolean) {
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    name: "Bhagavad Gita",
    url: "https://bhagavadgita.io",
    logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
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
          "@id": "https://bhagavadgita.io",
          name: isHindi ? "होम" : "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": isHindi
            ? "https://bhagavadgita.io/hi/acknowledgements"
            : "https://bhagavadgita.io/acknowledgements",
          name: isHindi
            ? "स्वीकृतियां - BhagavadGita.io"
            : "Acknowledgements - BhagavadGita.io",
        },
      },
    ],
  };
}
