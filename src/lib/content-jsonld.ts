import type { ContentDoc } from "./content";

/**
 * Structured data for a comparison page, built from the document.
 *
 * Store ratings are attributed to the individual app and never aggregated
 * across the page. Google's guidance is explicit that review markup describes a
 * specific item rather than a category or a list, so there is deliberately no
 * page-level `aggregateRating` here and there should never be one.
 */
export function comparisonJsonLd(doc: ContentDoc, pageUrl: string) {
  const org = {
    "@type": "Organization",
    name: "Ved Vyas Foundation",
    url: "https://bhagavadgita.com",
  };

  const blocks: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: doc.title,
      description: doc.description,
      datePublished: doc.published ?? doc.verifiedOn,
      dateModified: doc.updated ?? doc.verifiedOn,
      inLanguage: "en",
      author: org,
      publisher: org,
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    },
  ];

  if (doc.apps.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${pageUrl}#list`,
      name: "Bhagavad Gita apps compared",
      numberOfItems: doc.apps.length,
      itemListElement: doc.apps.map((app, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareApplication",
          name: app.name,
          applicationCategory: "BooksApplication",
          operatingSystem:
            app.iosUrl && app.playUrl
              ? "Android, iOS"
              : app.playUrl
                ? "Android"
                : "iOS",
          url: app.playUrl ?? app.iosUrl,
          author: { "@type": "Organization", name: app.developer },
          offers: app.price.toLowerCase().startsWith("free")
            ? { "@type": "Offer", price: "0", priceCurrency: "USD" }
            : { "@type": "Offer", description: app.price },
          ...(app.rating && app.ratingCount
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: app.rating,
                  ratingCount: Number(app.ratingCount.replace(/,/g, "")),
                  bestRating: "5",
                },
              }
            : {}),
        },
      })),
    });
  }

  if (doc.faq.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: doc.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  blocks.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: { "@id": "https://bhagavadgita.com", name: "Home" },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: { "@id": pageUrl, name: doc.title },
      },
    ],
  });

  return blocks;
}
