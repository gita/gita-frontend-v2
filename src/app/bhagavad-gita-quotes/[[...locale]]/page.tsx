import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import QuotesPageNew from "./QuotesPageNew";
import { jsonLdFirst, jsonLdTwo } from "./constants";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes by Lord Krishna - Hindi & English",
  description:
    "100+ Bhagavad Gita quotes by Lord Krishna in Hindi & English. Profound wisdom on karma, dharma, life, yoga, and spirituality. Read, share & inspire.",
  keywords:
    "bhagavad gita quotes, krishna quotes, gita quotes in hindi, bhagavad gita sayings, spiritual quotes, dharma quotes, karma quotes",
  authors: [{ name: "Ved Vyasa" }],
  publisher: "Ved Vyas Foundation",
  openGraph: {
    title: "Bhagavad Gita Quotes by Lord Krishna - Hindi & English",
    description:
      "100+ Bhagavad Gita quotes by Lord Krishna in Hindi & English. Profound wisdom on karma, dharma, life, yoga, and spirituality. Read, share & inspire.",
    url: "https://bhagavadgita.io/bhagavad-gita-quotes",
    siteName: "Bhagavad Gita",
    images:
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita Quotes by Lord Krishna - Hindi & English",
    description:
      "100+ Bhagavad Gita quotes by Lord Krishna in Hindi & English. Profound wisdom on karma, dharma, life, yoga, and spirituality. Read, share & inspire.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/bhagavad-gita-quotes",
  },
};

async function Quotes(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;

  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

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
      <QuotesPageNew translations={translations} locale={locale} />
    </>
  );
}

export default Quotes;
