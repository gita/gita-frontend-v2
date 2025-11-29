import { Metadata } from "next";

import AboutBanner from "components/AboutBanner";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import { jsonLdFirst, jsonLdTwo } from "./constants";

export const metadata: Metadata = {
  title: "About Bhagavad Gita - BhagavadGita.io",
  description:
    "Bhagavad Gita is a 700-verse Hindu scripture from Mahabharata containing Lord Krishna's teachings to Arjuna. Discover timeless wisdom on dharma, karma, and spirituality.",
  openGraph: {
    title: "About Bhagavad Gita - BhagavadGita.io",
    description:
      "Bhagavad Gita is a 700-verse Hindu scripture from Mahabharata containing Lord Krishna's teachings to Arjuna. Discover timeless wisdom on dharma, karma, and spirituality.",
    url: "https://bhagavadgita.io/about",
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
    title: "About Bhagavad Gita - BhagavadGita.io",
    description:
      "Bhagavad Gita is a 700-verse Hindu scripture from Mahabharata containing Lord Krishna's teachings to Arjuna. Discover timeless wisdom on dharma, karma, and spirituality.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/about",
  },
};

export default async function About(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);

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
      <AboutBanner
        locale={locale}
        translations={await getTranslations(locale)}
      />
      {["en", "hi"].includes(locale) && (
        <div className="mx-auto max-w-5xl px-4 py-12 font-inter sm:px-6">
          <p className="mt-8 text-xl">
            Bhagavad Gita, also known as the Gita - &quot;The Song of The
            Lord&quot; is a practical guide to one&apos;s life that guides one
            to re-organise their life, achieve inner peace and approach the
            Supreme Lord (the Ultimate Reality). It is a 700-verse text in
            Sanskrit which comprises chapters 23 through 40 in the Bhishma-Parva
            section of the Mahabharata.
          </p>
          <p className="mt-8 text-xl">
            The Bhagavad Gita is a dialogue between Arjuna, a supernaturally
            gifted warrior and his guide and charioteer Lord Krishna on the
            battlefield of Kurukshetra. As both armies stand ready for the
            battle, the mighty warrior Arjuna, on observing the warriors on both
            sides becomes overwhelmed with grief and compassion due to the fear
            of losing his relatives and friends and the consequent sins
            attributed to killing his own relatives. So, he surrenders to Lord
            Krishna, seeking a solution. Thus, follows the wisdom of the
            Bhagavad Gita. Over 18 chapters, Gita packs an intense analysis of
            life, emotions and ambitions, discussion of various types of yoga,
            including Jnana, Bhakti, Karma and Raja, the difference between Self
            and the material body as well as the revelation of the Ultimate
            Purpose of Life.
          </p>
        </div>
      )}
    </>
  );
}
