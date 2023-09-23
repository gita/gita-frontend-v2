import React from "react";
import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";

import { vedvyasJsonLD } from "../../../constant/vedvyasJsonLD";
import { pageJsonLd } from "./constants";

export const metadata: Metadata = {
  title: "Gita GPT - AI chatbot trained on Bhagavad Gita",
  description:
    "GitaGPT is a 100% Free AI chatbot that uses the teachings of the Bhagavad Gita to answer your everyday questions. It’s easy to use and filled with wisdom, all thanks to ChatGPT.",
  openGraph: {
    title: "Gita GPT - AI chatbot trained on Bhagavad Gita",
    description:
      "GitaGPT is a 100% Free AI chatbot that uses the teachings of the Bhagavad Gita to answer your everyday questions. It’s easy to use and filled with wisdom, all thanks to ChatGPT.",
    url: "https://bhagavadgita.io/gita-gpt",
    images:
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    siteName: "Bhagavad Gita",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gita GPT - AI chatbot trained on Bhagavad Gita",
    description:
      "GitaGPT is a 100% Free AI chatbot that uses the teachings of the Bhagavad Gita to answer your everyday questions. It’s easy to use and filled with wisdom, all thanks to ChatGPT.",
    site: "@ShriKrishna",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
  },
  alternates: {
    canonical: "https://bhagavadgita.io/gita-gpt",
  },
};

export default async function GitaGPT(props: ParamsWithLocale) {
  const { params } = props;
  const locale = paramsToLocale(params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vedvyasJsonLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {["en", "hi"].includes(locale) && (
        <iframe
          style={{
            height: "calc(100vh - 90px)",
            width: "100vw",
            border: "none",
          }}
          src="https://widget.writesonic.com/CDN/index.html?service-base-url=https://api.botsonic.ai&token=aa05c2d3-8669-4d3f-9637-1967c13d6233&base-origin=https://bot.writesonic.com&instance-name=Botsonic&standalone=true"
        ></iframe>
      )}
      ;
    </>
  );
}
