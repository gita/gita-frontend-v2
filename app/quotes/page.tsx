import { Metadata } from "next";
import QuotesPage from "./quotes-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
  description:
    "100+ Bhagavad Gita Quotes spoken by Lord Krishna in the Bhagavad Gita to Arjuna on the battlefield of the Kurukshetra.",
  openGraph: {
    title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
    description:
      "100+ Bhagavad Gita Quotes spoken by Lord Krishna in the Bhagavad Gita to Arjuna on the battlefield of the Kurukshetra.",
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
  alternates: {
    canonical: "https://bhagavadgita.io/bhagavad-gita-quotes/",
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
