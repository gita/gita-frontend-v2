import type { Metadata } from "next";

import { paramsToLocale } from "shared/functions";

import {
  appLandingCopy,
  AppLandingPage,
  AppStructuredData,
} from "@/components/AppLanding";

const BASE_URL = "https://bhagavadgita.com";
const OG_IMAGE = `${BASE_URL}/banner2.png`;

// The root layout reads the locale header set by middleware so the document
// language is correct for both English and Hindi responses.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: paramsPromise,
}: ParamsWithLocale): Promise<Metadata> {
  const params = await paramsPromise;
  const isHindi = paramsToLocale(params) === "hi";
  const pageUrl = isHindi
    ? `${BASE_URL}/bhagavad-gita-app/hi`
    : `${BASE_URL}/bhagavad-gita-app`;
  const title = isHindi
    ? "भगवद गीता ऐप: Android और iPhone के लिए निःशुल्क"
    : "Bhagavad Gita App: Free for Android and iPhone";
  const description = isHindi
    ? "Android और iPhone पर निःशुल्क, विज्ञापन-मुक्त भगवद गीता ऐप डाउनलोड करें। 700 श्लोक, ऑडियो, अनुवाद, टीकाएँ, ऑफलाइन पाठ और Gita AI।"
    : "Download the free, ad-free Bhagavad Gita app for Android and iPhone. Read 700 verses with audio, translations, commentaries, offline access, and Gita AI.";

  return {
    title,
    description,
    keywords: isHindi
      ? ["भगवद गीता ऐप", "गीता ऐप डाउनलोड", "हिंदी गीता ऐप", "Gita AI ऐप"]
      : [
          "Bhagavad Gita app",
          "Bhagavad Gita app download",
          "Gita AI app",
          "Bhagavad Gita app for Android",
          "Bhagavad Gita app for iPhone",
        ],
    alternates: {
      canonical: pageUrl,
      languages: {
        "x-default": `${BASE_URL}/bhagavad-gita-app`,
        en: `${BASE_URL}/bhagavad-gita-app`,
        hi: `${BASE_URL}/bhagavad-gita-app/hi`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Bhagavad Gita",
      locale: isHindi ? "hi_IN" : "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 1920,
          height: 1080,
          alt: isHindi
            ? "Android और iPhone के लिए भगवद गीता ऐप"
            : "Bhagavad Gita app for Android and iPhone",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
      site: "@ShriKrishna",
    },
  };
}

export default async function BhagavadGitaAppPage({
  params: paramsPromise,
}: ParamsWithLocale) {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const copy = appLandingCopy[locale === "hi" ? "hi" : "en"];

  return (
    <>
      <AppStructuredData copy={copy} />
      <AppLandingPage copy={copy} />
    </>
  );
}
