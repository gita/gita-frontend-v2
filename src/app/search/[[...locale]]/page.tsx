import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isValidLocaleSegment, paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import SearchPage from "./SearchPage";

import { ogImageUrl } from "@/lib/og/brand";

// Pre-generate search pages for SEO
export async function generateStaticParams() {
  return [{ locale: [] }, { locale: ["hi"] }];
}

// Static shell with client-side search functionality
export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Search Bhagavad Gita - Find Verses & Chapters in Hindi, English & Sanskrit",
  description:
    "Search all 700 Bhagavad Gita verses instantly. Find chapters, keywords, Krishna's teachings in Sanskrit, Hindi & English. Advanced search with commentaries.",
  keywords:
    "search bhagavad gita, find gita verse, bhagavad gita search engine, gita keyword search, search krishna teachings",
  authors: [{ name: "Ved Vyasa" }],
  creator: "Ved Vyas Foundation",
  publisher: "Ved Vyas Foundation",
  openGraph: {
      images: [ogImageUrl({ heading: "Search the Bhagavad Gita", eyebrow: "Search" })],
    title: "Search Bhagavad Gita - Find Verses, Chapters & Teachings",
    description:
      "Search the complete Bhagavad Gita text. Find specific verses, chapters, keywords, and teachings from Lord Krishna in multiple languages.",
    url: "https://bhagavadgita.com/search",
    siteName: "Bhagavad Gita",
    locale: "en_US",
    type: "website",
  },
  twitter: {
      images: [ogImageUrl({ heading: "Search the Bhagavad Gita", eyebrow: "Search" })],
    card: "summary_large_image",
    title: "Search Bhagavad Gita",
    description:
      "Search the complete Bhagavad Gita text. Find verses, chapters, and Krishna's teachings in Sanskrit, English, and Hindi.",
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.com/search",
  },
};

function SearchFallback({ translate }: { translate: Translate }) {
  return <>{translate("Loading")}</>;
}

export default async function Search({
  params: paramsPromise,
}: ParamsWithLocale) {
  const params = await paramsPromise;
  if (!isValidLocaleSegment(params)) notFound();
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  const translate = getTranslate(translations, locale);

  return (
    <Suspense fallback={<SearchFallback translate={translate} />}>
      <SearchPage locale={locale} translations={translations} />;
    </Suspense>
  );
}
