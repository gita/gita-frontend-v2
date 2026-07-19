import type { AppLandingCopy } from "./content";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./content";

const BASE_URL = "https://bhagavadgita.com";

export function AppStructuredData({ copy }: { copy: AppLandingCopy }) {
  const pageUrl =
    copy.locale === "hi"
      ? `${BASE_URL}/bhagavad-gita-app/hi`
      : `${BASE_URL}/bhagavad-gita-app`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name:
          copy.locale === "hi"
            ? "भगवद गीता ऐप: Android और iPhone के लिए निःशुल्क"
            : "Bhagavad Gita App: Free for Android and iPhone",
        description: copy.answer,
        inLanguage: copy.locale,
        dateModified: "2026-07-20",
        mainEntity: { "@id": `${pageUrl}#app` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#app`,
        name: "Bhagavad Gita",
        alternateName: "Bhagavad Gita App",
        url: pageUrl,
        applicationCategory: "Books & Reference",
        applicationSubCategory: "Bhagavad Gita study app",
        operatingSystem: "Android, iOS",
        inLanguage: ["en", "hi"],
        isAccessibleForFree: true,
        datePublished: "2018",
        dateModified: "2025-12-07",
        description: copy.answer,
        downloadUrl: [GOOGLE_PLAY_URL, APP_STORE_URL],
        installUrl: [GOOGLE_PLAY_URL, APP_STORE_URL],
        screenshot: copy.screenshots.items.map(
          (item) => `${BASE_URL}${item.src}`,
        ),
        featureList: copy.features.items.map((item) => item.title),
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1660",
          bestRating: "5",
          worstRating: "1",
        },
        publisher: {
          "@type": "Organization",
          "@id": `${BASE_URL}/#organization`,
          name: "Ved Vyas Foundation",
          url: BASE_URL,
        },
        sameAs: [GOOGLE_PLAY_URL, APP_STORE_URL],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        url: pageUrl,
        inLanguage: copy.locale,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.locale === "hi" ? "मुखपृष्ठ" : "Home",
            item: copy.locale === "hi" ? `${BASE_URL}/hi` : BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.locale === "hi" ? "भगवद गीता ऐप" : "Bhagavad Gita App",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
