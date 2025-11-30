import { Metadata } from "next";

import { getAllChapters } from "lib/getAllChapters";
import { paramsToLocale } from "shared/functions";

import HomePage from "./HomePage";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [
    { locale: [] }, // Default route (English)
    { locale: ["hi"] }, // Hindi route
  ];
}

// Use ISR to regenerate every 24 hours for fresh content
export const revalidate = 86400; // 24 hours in seconds

export async function generateMetadata({
  params: paramsPromise,
}: ParamsWithLocale): Promise<Metadata> {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const isHindi = locale === "hi";
  const baseUrl = "https://bhagavadgita.io";

  return {
    title: isHindi
      ? "भगवद गीता हिंदी और अंग्रेजी में टीका और ऑडियो सहित"
      : "Bhagavad Gita in Hindi & English with Commentaries & Audio",
    description: isHindi
      ? "भगवद गीता 700 श्लोक, 18 अध्याय, 20+ आचार्यों की टीका। हिंदी-अंग्रेजी अनुवाद, ऑडियो, गीता सार। श्री कृष्ण-अर्जुन का दिव्य संवाद।"
      : "Bhagavad Gita - 700 verses, 18 chapters with commentaries from 20+ scholars. Hindi & English translations, audio, Gita Saar. Free online.",
    keywords: isHindi
      ? "भगवद गीता, भगवत गीता, श्रीमद भगवद गीता, गीता, भगवद गीता हिंदी में, गीता के श्लोक, भगवद गीता टीका, गीता सार, भगवद गीता ऑडियो, श्री कृष्ण, अर्जुन, कर्म योग, भक्ति योग, ज्ञान योग, महाभारत"
      : "bhagavad gita, bhagwat geeta, srimad bhagavad gita, bhagavad gita online, bhagavad gita commentaries, bhagavad gita translations, lord krishna, arjuna, bhagavad gita audio, gita saar, bhagavad gita quotes, bhagavad gita in hindi, karma yoga, bhakti yoga, jnana yoga, 700 verses, 18 chapters",
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: isHindi
        ? "भगवद गीता हिंदी और अंग्रेजी में टीका और ऑडियो सहित"
        : "Bhagavad Gita in Hindi & English with Commentaries & Audio",
      description: isHindi
        ? "भगवद गीता - श्री कृष्ण और अर्जुन का पवित्र संवाद। 700 श्लोक, 18 अध्याय, 20+ आचार्यों की प्रामाणिक टीका। हिंदी-अंग्रेजी-संस्कृत अनुवाद, ऑडियो और गीता सार।"
        : "Bhagavad Gita - Sacred dialogue of Lord Krishna & Arjuna. 700 verses, 18 chapters with authentic commentaries from 20+ revered scholars. Hindi & English translations, audio, Gita Saar.",
      url: isHindi ? `${baseUrl}/hi` : baseUrl,
      siteName: "Bhagavad Gita",
      images:
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      locale: isHindi ? "hi_IN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isHindi
        ? "भगवद गीता हिंदी और अंग्रेजी में टीका और ऑडियो सहित"
        : "Bhagavad Gita in Hindi & English with Commentaries & Audio",
      description: isHindi
        ? "भगवद गीता - श्री कृष्ण और अर्जुन का पवित्र संवाद। 700 श्लोक, 18 अध्याय, 20+ आचार्यों की प्रामाणिक टीका। हिंदी-अंग्रेजी-संस्कृत अनुवाद, ऑडियो और गीता सार।"
        : "Bhagavad Gita - Sacred dialogue of Lord Krishna & Arjuna. 700 verses, 18 chapters with authentic commentaries from 20+ revered scholars. Hindi & English translations, audio, Gita Saar.",
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
        "x-default": baseUrl,
        en: baseUrl,
        "en-US": baseUrl,
        "en-GB": baseUrl,
        "en-IN": baseUrl,
        hi: `${baseUrl}/hi`,
      },
      canonical: isHindi ? `${baseUrl}/hi` : baseUrl,
    },
  };
}

export default async function Home({
  params: paramsPromise,
}: ParamsWithLocale) {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const isHindi = locale === "hi";
  const chapters = await getAllChapters(locale);

  const jsonLdFirst = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "@id": "#organization",
    name: isHindi ? "वेद व्यास फाउंडेशन" : "Ved Vyas Foundation",
    alternateName: "BhagavadGita.io",
    url: "https://bhagavadgita.io",
    sameAs: [
      "https://www.facebook.com/iiRadhaKrishnaii/",
      "https://www.linkedin.com/company/bhagavadgita/",
      "https://www.pinterest.com/iiradhakrishnaii/",
      "https://twitter.com/ShriKrishna",
    ],
    logo: "https://bhagavadgita.io/static/images/radhakrishna.png",
    description: isHindi
      ? "भगवद गीता 20+ प्रामाणिक विद्वानों की टीका, अनुवाद और ऑडियो के साथ"
      : "Bhagavad Gita with commentaries, translations & audio from 20+ revered scholars",
  };

  const jsonLdTwo = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "@id": "#website",
    name: isHindi
      ? "भगवद गीता - श्री कृष्ण और अर्जुन का पवित्र संवाद"
      : "Bhagavad Gita - Sacred Dialogue of Lord Krishna and Arjuna",
    alternateName: [
      "Bhagwat Geeta",
      "Srimad Bhagavad Gita",
      "Shrimad Bhagwat Geeta",
      "Bhagavad Gita Online",
      "Gita",
      "The Bhagavad Gita",
    ],
    url: "https://bhagavadgita.io",
    publisher: {
      "@type": "Organization",
      name: isHindi ? "वेद व्यास फाउंडेशन" : "Ved Vyas Foundation",
      alternateName: "BhagavadGita.io",
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
    about: {
      "@type": "Thing",
      name: "Bhagavad Gita",
      description: isHindi
        ? "भगवान श्री कृष्ण द्वारा अर्जुन को कुरुक्षेत्र के युद्ध क्षेत्र में दिया गया आध्यात्मिक ज्ञान"
        : "Ancient Hindu scripture containing spiritual wisdom imparted by Lord Krishna to Arjuna on the battlefield of Kurukshetra",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://bhagavadgita.io/search?query={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description: isHindi
      ? "भगवद गीता - श्री कृष्ण और अर्जुन का पवित्र संवाद। 700 श्लोक, 18 अध्याय, 20+ आचार्यों की प्रामाणिक टीका। हिंदी-अंग्रेजी-संस्कृत अनुवाद, ऑडियो और गीता सार।"
      : "Bhagavad Gita - Sacred dialogue of Lord Krishna and Arjuna. 700 verses, 18 chapters with authentic commentaries from 20+ revered scholars including Shankaracharya, Ramanujacharya. Hindi & English translations, audio, Gita Saar.",
    inLanguage: isHindi ? ["hi", "en", "sa"] : ["en", "hi", "sa"],
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

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: isHindi
      ? [
          {
            "@type": "Question",
            name: "भगवद गीता में कितने अध्याय हैं?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "श्रीमद् भगवद गीता में कुल 18 अध्याय और 700 श्लोक हैं। यह महाभारत के भीष्म पर्व का हिस्सा है जिसमें भगवान श्री कृष्ण ने अर्जुन को उपदेश दिया।",
            },
          },
          {
            "@type": "Question",
            name: "भगवद गीता किसने लिखी?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "भगवद गीता की रचना महर्षि वेदव्यास जी ने की थी। यह भगवान श्री कृष्ण और अर्जुन के बीच कुरुक्षेत्र युद्ध के मैदान में हुए संवाद का संग्रह है।",
            },
          },
          {
            "@type": "Question",
            name: "भगवद गीता पढ़ने के क्या लाभ हैं?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "भगवद गीता जीवन के सभी प्रश्नों का समाधान देती है। यह कर्म, धर्म, ज्ञान और भक्ति का मार्गदर्शन करती है तथा मन को शांति और जीवन को सही दिशा प्रदान करती है।",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            name: "How many chapters are in the Bhagavad Gita?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Bhagavad Gita contains 18 chapters with a total of 700 verses (shlokas). It is part of the Indian epic Mahabharata and presents a conversation between Lord Krishna and Arjuna on the battlefield of Kurukshetra.",
            },
          },
          {
            "@type": "Question",
            name: "Who wrote the Bhagavad Gita?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The Bhagavad Gita was composed by Sage Vyasa as part of the Mahabharata. It records the sacred dialogue between Lord Sri Krishna and Prince Arjuna before the great war at Kurukshetra.",
            },
          },
          {
            "@type": "Question",
            name: "What are the benefits of reading the Bhagavad Gita?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Reading the Bhagavad Gita provides guidance on life's most profound questions, teaches the paths of karma (action), bhakti (devotion), and jnana (knowledge), brings peace of mind, and helps lead a purposeful life aligned with dharma (righteousness).",
            },
          },
          {
            "@type": "Question",
            name: "Is the Bhagavad Gita available with commentaries?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, BhagavadGita.io provides the complete Bhagavad Gita with authentic commentaries from 20+ revered scholars including Adi Shankaracharya, Ramanujacharya, Madhvacharya, Swami Sivananda, and many other traditional and modern commentators. Multiple translations are available in Hindi, English, and Sanskrit.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <HomePage chapters={chapters} locale={locale} />
    </>
  );
}
