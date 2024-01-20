import { Metadata } from "next";
import Script from 'next/script';

import { getAllChapters } from "lib/getAllChapters";
import { paramsToLocale } from "shared/functions";

import HomePage from "./HomePage";

export const metadata: Metadata = {
  title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
  description:
    "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
  openGraph: {
    title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
    description:
      "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
    url: "https://bhagavadgita.io",
    siteName: "Bhagavad Gita",
    images:
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Srimad Bhagavad Gita - Free Searchable Online Bhagwat Geeta",
    description:
      "Bhagwat Geeta in Hindi and English. Read Bhagavad Gita online in a simple, beautiful and easy-to-use interface; Gita Saar In Hindi; Bhagavad Gita quotes.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
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
      en: "https://bhagavadgita.io",
      "en-US": "https://bhagavadgita.io",
      "en-GB": "https://bhagavadgita.io",
      "en-IN": "https://bhagavadgita.io",
      hi: "https://bhagavadgita.io/hi",
    },
    canonical: "https://bhagavadgita.io",
  },
};

export default async function Home({ params }: ParamsWithLocale) {
  const locale = paramsToLocale(params);
  const chapters = await getAllChapters(locale);

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
      url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
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
      <Script strategy="lazyOnload" id="botsonic-widget-script">
        {`
            (function (w, d, s, o, f, js, fjs) {
              w["botsonic_widget"] = o;
              w[o] =
                w[o] ||
                function () {
                  (w[o].q = w[o].q || []).push(arguments);
                };
              (js = d.createElement(s)), (fjs = d.getElementsByTagName(s)[0]);
              js.id = o;
              js.src = f;
              js.async = 1;
              fjs.parentNode.insertBefore(js, fjs);
            })(window, document, "script", "Botsonic", "https://widget.writesonic.com/CDN/botsonic.min.js");
            Botsonic("init", {
              serviceBaseUrl: "https://api.botsonic.ai",
              token: "aa0b5e0e-9284-4c52-968f-77f2c959dcdc",
            });
          `}
      </Script>
      <HomePage chapters={chapters} locale={locale} />
    </>
  );
}
