import { Metadata } from "next";

import AcknowledgementBanner from "components/AcknowledgementBanner";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import { jsonLdFirst, jsonLdTwo } from "./constants";

export const metadata: Metadata = {
  title: "Acknowledgements - Featured Bhagavad Gita Translations",
  description:
    "We extend our heartfelt gratitude to esteemed organizations and individuals for allowing us to feature their invaluable Bhagavad Gita translations and commentaries.",
  openGraph: {
    title: "Acknowledgements - Featured Bhagavad Gita Translations",
    description:
      "We extend our heartfelt gratitude to esteemed organizations and individuals for allowing us to feature their invaluable Bhagavad Gita translations and commentaries.",
    url: "https://bhagavadgita.io/acknowledgements",
    siteName: "Bhagavad Gita",
    images:
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acknowledgements - Featured Bhagavad Gita Translations",
    description:
      "We extend our heartfelt gratitude to esteemed organizations and individuals for allowing us to feature their invaluable Bhagavad Gita translations and commentaries.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/acknowledgements",
  },
};

export default async function Acknowledgement(props: ParamsWithLocale) {
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
      <AcknowledgementBanner
        locale={locale}
        translations={await getTranslations(locale)}
      />
      {["en", "hi"].includes(locale) && (
        <div className="mx-auto max-w-5xl px-4 py-12 font-inter sm:px-6">
          <p className="mb-6">
            We extend our heartfelt gratitude to the esteemed organizations
            listed below for allowing us to feature their invaluable
            publications. All copyrights are retained by the respective
            organizations. For acquiring individual copies of any books, please
            directly contact the relevant organization.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Advaita Ashrama */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-semibold">Advaita Ashrama</h2>
              <address className="mb-4 not-italic">
                Located at 5 Dehi Entally Road, Calcutta, India.
                <br />
                Contact: Various phone lines and Fax available.
                <br />
                Email:{" "}
                <a href="mailto:advaita@giascl01.vsnl.net.in">
                  advaita@giascl01.vsnl.net.in
                </a>
              </address>
              <p>
                Featured Work: Commentary on Bhagavadgita by Sankaracarya,
                translated by Swami Gambhirananda (Published in 1995).
              </p>
            </div>

            {/* Central Chinmaya Mission Trust */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-semibold">
                Central Chinmaya Mission Trust
              </h2>
              <address className="mb-4 not-italic">
                Located at Sandeepany Sadhanalaya, Saki Vihar Road, Mumbai 400
                072, India.
                <br />
                Phone: 91-22-8572367/8575806; Fax: 91-22-8573065
                <br />
                Email:{" "}
                <a href="mailto:chinmaya@bom2.vsnl.net.in">
                  chinmaya@bom2.vsnl.net.in
                </a>
              </address>
              <p>
                Featured Work: Srimadbhagavadgita translated by Swami
                Tejomayananda (1993, Central Chinmaya Mission Trust, Bombay)
                [Hindi translation of The Holy Geeta by Swami Chinmayananda]
              </p>
            </div>

            {/* Divine Life Society */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-semibold">
                Divine Life Society
              </h2>
              <address className="mb-4 not-italic">
                Located at P.O. Shivanandanagar 249192, District Tehri-Garhwal,
                Uttar Pradesh, Himalayas, India.
                <br />
              </address>
              <p>
                Featured Work: The Bhagavad Gita by Swami Sivananda (1995, The
                Divine Life Society, Shivanandanagar)
              </p>
            </div>

            {/* Gita Press, Gorakhpur */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-semibold">
                Gita Press, Gorakhpur
              </h2>
              <address className="mb-4 not-italic">
                Located at Govind Bhawan Karyalaya, Gitapress, Gorakhpur 273005,
                Uttar Pradesh, India. Phone: 334721
                <br />
              </address>
              <p>
                Featured Works:
                <ul>
                  <li>
                    Srimadbhagavadgita: with Hindi translation of Sankarabhashya
                    translated by Sri Harikrishandas Goenka (1998, Gita Press,
                    Gorakhpur)
                  </li>
                  <li>
                    Srimadbhagavadgita: Sadhaka Sanjivani (Hindi Commentary) by
                    Swami Ramsukhdas (1995, Gita Press, Gorakhpur)
                  </li>
                </ul>
              </p>
            </div>

            {/* Sri Venkateswara University, Tirupati */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-semibold">
                Sri Venkateswara University, Tirupati
              </h2>
              <address className="mb-4 not-italic">
                Located at Oriental Research Institute, Sri Venkateswara
                University, Tirupati 517502, Andhra Pradesh, India.
                <br />
                Phone: 91-8574-24166-Extension 291; Fax: 91-8574-24111
                <br />
              </address>
              <p>
                Featured Work: Srimadbhagavadgita with Gitarthasangraha of
                Abhinavagupta Part 1 & 2. Translation by Dr. S Sankaranarayan
                (1985, Sri Venkateswara University, Tirupati)
              </p>
            </div>

            {/* Gita Supersite IITK Team */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-2 text-xl font-semibold">
                Gita Supersite IITK Team
              </h2>
              <address className="mb-4 not-italic">
                Website:{" "}
                <a
                  href="https://gitasupersite.iitk.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gitasupersite.iitk.ac.in
                </a>
                <br />
              </address>
              <p>
                We extend special thanks to the team at Gita Supersite by IIT
                Kanpur for their hard work in collating various translations and
                commentaries of the Bhagavad Gita in one comprehensive platform.
              </p>
            </div>
          </div>

          {/* <h2 className="text-2xl font-semibold mt-8 mb-4">Audio Acknowledgements</h2>
          <p>
            Special thanks to Swami Brahmananda for allowing us to feature his Bhagavadgita chantings. These are available in a set of 4 audio cassettes titled "Geeta Chanting" and can be directly obtained from Central Chinmaya Mission Trust.
          </p> */}
        </div>
      )}
    </>
  );
}
