import type { Metadata } from "next";

import { getJsonLdTwo, jsonLdFirst } from "./constants";

import { Chat } from "@/components/features/chat-sdk";

// Force dynamic rendering for chat functionality
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "GitaGPT - Bhagavad Gita AI Chatbot | Free Gita AI by Ved Vyas Foundation",
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

export default function GitagptPage() {
  const jsonLdSecond = getJsonLdTwo("en");

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
      <Chat />
    </>
  );
}
