import type { Metadata } from "next";

import { paramsToLocale } from "shared/functions";

import { getJsonLdTwo, jsonLdFirst } from "./constants";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export const metadata: Metadata = {
  title: "Bhagavad Gita AI - Gita GPT - Ask Krishna",
  description:
    "GitaGPT is a free AI chatbot powered by ChatGPT that provides wisdom from the Bhagavad Gita. Get instant spiritual guidance for your questions through Krishna's teachings.",
  openGraph: {
    title: "Bhagavad Gita AI - Gita GPT - Ask Krishna",
    description:
      "GitaGPT is a free AI chatbot powered by ChatGPT that provides wisdom from the Bhagavad Gita. Get instant spiritual guidance for your questions through Krishna's teachings.",
    url: "https://bhagavadgita.io/gitagpt",
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
    title: "Bhagavad Gita AI - Gita GPT - Ask Krishna",
    description:
      "GitaGPT is a free AI chatbot powered by ChatGPT that provides wisdom from the Bhagavad Gita. Get instant spiritual guidance for your questions through Krishna's teachings.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/gitagpt",
  },
};

export default async function GitagptPage(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const jsonLdSecond = getJsonLdTwo(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFirst) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSecond) }}
      />
      {["en", "hi"].includes(locale) && (
        <div style={{ height: "100vh", width: "100vw" }}>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/FUopn1I5lRD_dEopmyuQk"
            width="100%"
            style={{ height: "100%", minHeight: "700px" }}
            frameBorder="0"
            title="GitaGPT"
          />
        </div>
      )}
    </>
  );
}
