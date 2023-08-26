import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";

import { getAllChapters } from "../lib/getAllChapters";
import HomePage from "./home-page";

export const metadata: Metadata = {
  title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
  description:
    "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
  openGraph: {
    title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
    description:
      "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
    url: "https://bhagavadgita.io/",
    siteName: "Bhagavad Gita",
    images: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
    description:
      "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
    images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
    site: "@ShriKrishna",
  },
  verification: {
    google: "FafB0VlsAZd51s-bIT0hsgtAY9xdb8PNxCNQ9tsqDqE",
    other: {
      "p:domain_verify": ["21a3d58146eb60f13c6fc72f26abda2d"],
      "msvalidate.01": ["0451A734F7E9BD838957319E106DE363"],
    },
  },
  alternates: {
    languages: {
      en: "https://bhagavadgita.io/",
      "en-US": "https://bhagavadgita.io/",
      "en-GB": "https://bhagavadgita.io/",
      "en-IN": "https://bhagavadgita.io/",
      hi: "https://bhagavadgita.io/hi/",
    },
  },
};

export default async function Home({ params }: ParamsWithLocale) {
  const chapters = await getAllChapters();
  const locale = paramsToLocale(params);

  const jsonLdFirst = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    name: "BhagavadGita.io",
    url: "https://bhagavadgita.io",
    sameAs: [
      "https://www.facebook.com/iiRadhaKrishnaii/",
      "https://instagram.com/iiradhakrishnaii/",
      "https://www.linkedin.com/company/bhagavadgita/",
      "https://www.youtube.com/c/krsna",
      "https://www.pinterest.com/iiradhakrishnaii/",
      "https://twitter.com/ShriKrishna",
    ],
    logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
  };

  const jsonLdTwo = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    name: "Bhagavad Gita - Free Searchable Online Bhagavad Gita",
    url: "https://bhagavadgita.io",
    publisher: {
      "@type": "Organization",
      name: "BhagavadGita.io",
      logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
    },
    image: {
      "@type": "ImageObject",
      url: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
      width: 1553,
      height: 660,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://bhagavadgita.io",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://bhagavadgita.io/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description:
      "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
  };

  const jsonLdThree = {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdThree) }}
      />
      <HomePage chapters={chapters} locale={locale} />
    </>
  );
}
