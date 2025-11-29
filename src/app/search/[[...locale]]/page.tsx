import { Suspense } from "react";
import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import SearchPage from "./SearchPage";

// Pre-generate search pages for SEO
export async function generateStaticParams() {
  return [{ locale: [] }, { locale: ["hi"] }];
}

// Static shell with client-side search functionality
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Search Bhagavad Gita - Find Verses, Chapters & Teachings",
  description:
    "Search the complete Bhagavad Gita text. Find specific verses, chapters, keywords, and teachings from Lord Krishna. Search in Sanskrit, English, and Hindi translations.",
  openGraph: {
    title: "Search Bhagavad Gita - Find Verses, Chapters & Teachings",
    description:
      "Search the complete Bhagavad Gita text. Find specific verses, chapters, keywords, and teachings from Lord Krishna in multiple languages.",
    url: "https://bhagavadgita.io/search",
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
    title: "Search Bhagavad Gita",
    description:
      "Search the complete Bhagavad Gita text. Find verses, chapters, and Krishna's teachings in Sanskrit, English, and Hindi.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/search",
  },
};

function SearchFallback({ translate }: { translate: Translate }) {
  return <>{translate("Loading")}</>;
}

export default async function Search({
  params: paramsPromise,
}: ParamsWithLocale) {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  const translate = getTranslate(translations, locale);

  return (
    <Suspense fallback={<SearchFallback translate={translate} />}>
      <SearchPage locale={locale} translations={translations} />;
    </Suspense>
  );
}
