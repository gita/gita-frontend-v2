import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import QuotesPage from "./QuotesPage";
import { jsonLdFirst, jsonLdTwo } from "./constants";

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
  description:
    "100+ Bhagavad Gita Quotes spoken by Lord Krishna in the Bhagavad Gita to Arjuna on the battlefield of the Kurukshetra.",
  openGraph: {
    title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
    description:
      "100+ Bhagavad Gita Quotes spoken by Lord Krishna in the Bhagavad Gita to Arjuna on the battlefield of the Kurukshetra.",
    url: "https://bhagavadgita.io/bhagavad-gita-quotes",
    siteName: "Bhagavad Gita",
    images: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita Quotes By Krishna - BhagavadGita.io",
    images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/bhagavad-gita-quotes",
  },
};

async function Quotes(props: ParamsWithLocale) {
  const { params } = props;

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
      <QuotesPage translations={translations} locale={locale} />
    </>
  );
}

export default Quotes;
