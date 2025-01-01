import type { Metadata } from "next";

import { paramsToLocale } from "shared/functions";

import { getJsonLdTwo, jsonLdFirst } from "./constants";

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
  const { params } = props;
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
            style={{ height: "100%", width: "100%" }}
            src="https://widget.botsonic.com/CDN/index.html?service-base-url=https%3A%2F%2Fapi-azure.botsonic.ai&token=97984adc-5eec-43db-ae83-69cbffb823af&base-origin=https%3A%2F%2Fbot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https%3A%2F%2Fbot.writesonic.com%2Fbots%2F56dc43c9-8238-4921-935a-9de28caca114%2Fconnect"
            title="GitaGPT"
          >
            You need to enable JavaScript to run this app.
          </iframe>
        </div>
      )}
    </>
  );
}
