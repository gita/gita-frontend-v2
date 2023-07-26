import { Metadata } from "next";
import QuotesPage from "./quotes-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
  openGraph: {
    title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
    url: "https://bhagavadgita.io/about/",
    siteName: "Bhagavad Gita",
    images: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
    images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
    site: "@ShriKrishna",
  },
};

const Quotes = () => {
  const jsonLdFirst = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    name: "Bhagavad Gita",
    url: "https://bhagavadgita.io",
    logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
  };

  const jsonLdTwo = {
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
          "@id": "https://bhagavadgita.io/bhagavad-gita-quotes/",
          name: "Bhagavad Gita Quotes",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFirst) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTwo) }}
      />
      <QuotesPage />
    </>
  );
};

export default Quotes;
