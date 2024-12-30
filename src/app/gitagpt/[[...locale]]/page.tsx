import type { Metadata } from "next";

import { paramsToLocale } from "shared/functions";

import { getJsonLdTwo,jsonLdFirst } from "./constants";

export const metadata: Metadata = {
  title: "Bhagavad Gita AI - Gita GPT - Ask Krishna",
  description: "GitaGPT is a free Bhagavad Gita AI chatbot that uses the wisdom of the Bhagavad Gita to help answer your day-to-day questions. It's simple, insightful, and powered by ChatGPT.",
  openGraph: {
    title: "Bhagavad Gita AI - Gita GPT - Ask Krishna",
    description: "GitaGPT is a free Bhagavad Gita AI chatbot that uses the wisdom of the Bhagavad Gita to help answer your day-to-day questions. It's simple, insightful, and powered by ChatGPT.",
    url: "https://bhagavadgita.io/gitagpt",
    siteName: "Bhagavad Gita",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        secureUrl: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
        height: 1080,
        width: 1920,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita AI - Gita GPT - Ask Krishna",
    description: "GitaGPT is a free Bhagavad Gita AI chatbot that uses the wisdom of the Bhagavad Gita to help answer your day-to-day questions. It's simple, insightful, and powered by ChatGPT.",
    images: ["https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75"],
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
            src="https://widget.writesonic.com/CDN/index.html?service-base-url=https://api.botsonic.ai&token=aa0b5e0e-9284-4c52-968f-77f2c959dcdc&base-origin=https://bot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https://bot.writesonic.com/61178c5c-aed2-47c0-8759-305d2489956c?t=connect&workspace_id=91c72ad8-79d9-44aa-88e5-6c3738324985"
            title="GitaGPT"
          >
            You need to enable JavaScript to run this app.
          </iframe>
        </div>
      )}
    </>
  );
}
