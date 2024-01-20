import { Metadata } from "next";
import Image from "next/image";

import DonateBanner from "components/DonateBanner";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import { jsonLdFirst, jsonLdTwo } from "./constants";

export const metadata: Metadata = {
  title: "Donate - Bhagavad Gita - Ved Vyas Foundation",
  description:
    "Donate to the Bhagavad Gita project to help us continue our mission of spreading the message of the Bhagavad Gita and Krishna's wisdom to the world.",
  openGraph: {
    title: "Donate - Bhagavad Gita - Ved Vyas Foundation",
    description:
      "Donate to the Bhagavad Gita project to help us continue our mission of spreading the message of the Bhagavad Gita and Krishna's wisdom to the world.",
    url: "https://bhagavadgita.io/donate",
    siteName: "Bhagavad Gita",
    images:
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donate - Bhagavad Gita - Ved Vyas Foundation",
    description:
      "Donate to the Bhagavad Gita project to help us continue our mission of spreading the message of the Bhagavad Gita and Krishna's wisdom to the world.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/donate",
  },
};

export default async function Donate(props: ParamsWithLocale) {
  const { params } = props;
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
      <DonateBanner
        locale={locale}
        translations={await getTranslations(locale)}
      />
      {["en", "hi"].includes(locale) && (
        <div className="mx-auto max-w-5xl px-4 py-12 font-inter sm:px-6">
          <div className="mx-auto max-w-5xl px-4 py-12 font-inter sm:px-6">
            <h1 className="mb-4 text-center text-3xl font-bold">
              Support the Digital Revival of Ancient Wisdom
            </h1>
            <p className="mb-6 text-center text-lg">
              Your generous support enables the Ved Vyas Foundation to offer a
              suite of spiritual resources entirely free of charge and devoid of
              distractions. By donating, you help us maintain and expand our
              offerings, such as the ad-free{" "}
              <a className="text-blue-600 hover:underline" href="/">
                Bhagavad Gita website
              </a>
              ,{" "}
              <a className="text-blue-600 hover:underline" href="/app">
                mobile apps
              </a>{" "}
              and{" "}
              <a className="text-blue-600 hover:underline" href="/gitagpt">
                GitaGPT AI chatbot
              </a>
              , ensuring that the essence of Sanatana Dharma reaches the hands
              and hearts of seekers around the world without any barriers.
            </p>
            <p className="mb-6 text-center text-lg">
              Our dedication is to the digitization and modern presentation of
              the Ramayan, Mahabharat, Vedas, Puranas, and other precious Indian
              scriptures. With your contribution, we continue to create and
              innovate—providing state-of-the-art applications for
              state-of-the-art spirituality, accessible to all, anytime and
              anywhere.
            </p>
            <div className="flex items-center justify-center">
              <Image
                src="/upi_qr_radhakrishna.png"
                alt="Donate to Ved Vyas Foundation"
                width={300}
                height={300}
              />
            </div>
            <p className="mt-4 text-center font-bold">
              Scan the QR code with any UPI app to make your donation.
            </p>
            <p className="mt-4 text-center">
              <span className="font-bold">UPI ID:</span>{" "}
              <span className="font-bold text-my-orange">
                vedvyasfoundation@icici
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
