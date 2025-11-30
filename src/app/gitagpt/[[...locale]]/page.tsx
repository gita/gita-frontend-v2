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
  title: "GitaGPT - Bhagavad Gita AI Chatbot | Free Gita AI by Ved Vyas Foundation",
  description:
    "GitaGPT: Free Bhagavad Gita AI chatbot. Ask Krishna's wisdom, get instant spiritual guidance. Gita AI powered answers in Hindi & English. Try now!",
  keywords:
    "GitaGPT, Gita GPT, Bhagavad Gita AI, Gita AI, bhagavad gita chatbot, gita chatgpt, ask krishna ai, spiritual ai chatbot, free gita ai",
  authors: [{ name: "Ved Vyasa" }],
  creator: "Ved Vyas Foundation",
  publisher: "Ved Vyas Foundation",
  openGraph: {
    title: "GitaGPT - Bhagavad Gita AI Chatbot | Free Gita AI",
    description:
      "GitaGPT: Free Bhagavad Gita AI chatbot powered by ChatGPT. Ask Krishna's wisdom, get instant spiritual guidance through Gita AI. Available in Hindi & English.",
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
    title: "GitaGPT - Bhagavad Gita AI Chatbot | Free Gita AI",
    description:
      "GitaGPT: Free Bhagavad Gita AI chatbot. Ask Krishna's wisdom, get instant spiritual guidance through Gita AI. Hindi & English support.",
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
