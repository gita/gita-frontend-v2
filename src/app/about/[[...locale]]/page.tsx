import { Metadata } from "next";

import AboutContent from "components/About/AboutContent";
import AboutFAQ from "components/About/AboutFAQ";
import AboutBanner from "components/AboutBanner";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import { jsonLdFirst, jsonLdTwo } from "./constants";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export const metadata: Metadata = {
  title: "About Bhagavad Gita - Sacred Scripture by Ved Vyasa",
  description:
    "Bhagavad Gita: 700-verse Hindu scripture from Mahabharata. Lord Krishna's teachings to Arjuna on dharma, karma, and yoga. Read in Hindi & English with commentaries.",
  keywords:
    "about bhagavad gita, bhagavad gita history, mahabharata, lord krishna, ved vyasa, bhagavad gita meaning, hindu scripture",
  authors: [{ name: "Ved Vyasa" }],
  publisher: "Ved Vyas Foundation",
  openGraph: {
    title: "About Bhagavad Gita - Sacred Scripture by Ved Vyasa",
    description:
      "Bhagavad Gita: 700-verse Hindu scripture from Mahabharata. Lord Krishna's teachings to Arjuna on dharma, karma, and yoga. Read in Hindi & English with commentaries.",
    url: "https://bhagavadgita.io/about",
    siteName: "Bhagavad Gita",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        secureUrl:
          "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        height: 1080,
        width: 1920,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Bhagavad Gita - Sacred Scripture by Ved Vyasa",
    description:
      "Bhagavad Gita: 700-verse Hindu scripture from Mahabharata. Lord Krishna's teachings to Arjuna on dharma, karma, and yoga. Read in Hindi & English with commentaries.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/about",
  },
};

export default async function About(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translationProps = {
    locale,
    translations: await getTranslations(locale),
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
      <AboutBanner {...translationProps} />
      {["en", "hi"].includes(locale) && (
        <>
          <AboutContent {...translationProps} />
          <AboutFAQ {...translationProps} />
        </>
      )}
    </>
  );
}
