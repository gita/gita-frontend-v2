import { Metadata } from "next";
import Link from "next/link";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import { PageHero } from "@/components/blocks/page-sections";
import {
  LegalContentPage,
  LegalContentSection,
} from "@/components/blocks/page-sections";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export async function generateMetadata({
  params: paramsPromise,
}: ParamsWithLocale): Promise<Metadata> {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const isHindi = locale === "hi";
  const baseUrl = "https://bhagavadgita.io";

  return {
    title: isHindi
      ? "गोपनीयता नीति - BhagavadGita.io"
      : "Privacy Policy - BhagavadGita.io",
    description: isHindi
      ? "जानें कि हम आपके डेटा की सुरक्षा कैसे करते हैं, आपकी गोपनीयता सुनिश्चित करते हैं और सुरक्षा बनाए रखते हैं। डेटा संग्रह, उपयोग, कुकीज़ और आपके अधिकारों के बारे में पढ़ें।"
      : "Learn how we protect your data, ensure your privacy, and maintain security. Read about data collection, usage, cookies, and your rights.",
    openGraph: {
      title: isHindi
        ? "गोपनीयता नीति - BhagavadGita.io"
        : "Privacy Policy - BhagavadGita.io",
      description: isHindi
        ? "जानें कि हम आपके डेटा की सुरक्षा कैसे करते हैं और आपकी गोपनीयता सुनिश्चित करते हैं।"
        : "Learn how we protect your data, ensure your privacy, and maintain security. Read about data collection, usage, cookies, and your rights.",
      url: isHindi
        ? `${baseUrl}/hi/privacy-policy`
        : `${baseUrl}/privacy-policy`,
      siteName: "Bhagavad Gita",
      locale: isHindi ? "hi_IN" : "en_US",
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
      title: isHindi
        ? "गोपनीयता नीति - BhagavadGita.io"
        : "Privacy Policy - BhagavadGita.io",
      description: isHindi
        ? "जानें कि हम आपके डेटा की सुरक्षा कैसे करते हैं।"
        : "Learn how we protect your data, ensure your privacy, and maintain security. Read about data collection, usage, cookies, and your rights.",
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: isHindi
        ? `${baseUrl}/hi/privacy-policy`
        : `${baseUrl}/privacy-policy`,
      languages: {
        "x-default": `${baseUrl}/privacy-policy`,
        en: `${baseUrl}/privacy-policy`,
        hi: `${baseUrl}/hi/privacy-policy`,
      },
    },
  };
}

export default async function PrivacyPolicy(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);
  const sections: LegalContentSection[] = [
    {
      title: "",
      content: (
        <>
          <p className="mb-4">
            {translate(
              "This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.",
            )}
          </p>
          <p className="mb-4">
            {translate(
              "We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.",
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Interpretation and Definitions"),
      content: (
        <>
          <h3 className="mb-3 text-lg font-bold">
            {translate("Interpretation")}
          </h3>
          <p className="mb-4">
            {translate(
              "The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
            )}
          </p>
          <h3 className="mb-3 text-lg font-bold">{translate("Definitions")}</h3>
          <p className="mb-4">
            {translate("For the purposes of this Privacy Policy:")}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              <strong>{translate("Account")}</strong>{" "}
              {translate(
                "means a unique account created for You to access our Service or parts of our Service.",
              )}
            </li>
            <li>
              <strong>{translate("Company")}</strong>{" "}
              {translate(
                '(referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Ved Vyas Foundation, C-604 IRWO Sector 47 Gurugram Gurgaon HR 122018 INDIA.',
              )}
            </li>
            <li>
              <strong>{translate("Cookies")}</strong>{" "}
              {translate(
                "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.",
              )}
            </li>
            <li>
              <strong>{translate("Personal Data")}</strong>{" "}
              {translate(
                "is any information that relates to an identified or identifiable individual.",
              )}
            </li>
            <li>
              <strong>{translate("Service")}</strong>{" "}
              {translate("refers to the Website.")}
            </li>
            <li>
              <strong>{translate("Website")}</strong>{" "}
              {translate("refers to BhagavadGita.io, accessible from")}{" "}
              <a
                href="https://bhagavadgita.io"
                rel="external nofollow noopener noreferrer"
                target="_blank"
                className="text-prakash-primary hover:underline dark:text-nisha-primary"
              >
                https://bhagavadgita.io
              </a>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: translate("Collecting and Using Your Personal Data"),
      content: (
        <>
          <h3 className="mb-3 text-lg font-bold">
            {translate("Personal Data")}
          </h3>
          <p className="mb-4">
            {translate(
              "While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:",
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>{translate("Email address")}</li>
            <li>{translate("First name and last name")}</li>
            <li>{translate("Usage Data")}</li>
          </ul>

          <h3 className="mb-3 text-lg font-bold">{translate("Usage Data")}</h3>
          <p className="mb-4">
            {translate(
              "Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.",
            )}
          </p>

          <h3 className="mb-3 text-lg font-bold">
            {translate("Tracking Technologies and Cookies")}
          </h3>
          <p className="mb-4">
            {translate(
              "We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. We use both Session and Persistent Cookies for the purposes set out below:",
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              <strong>{translate("Necessary / Essential Cookies")}</strong> -{" "}
              {translate(
                "These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features.",
              )}
            </li>
            <li>
              <strong>
                {translate("Cookies Policy / Notice Acceptance Cookies")}
              </strong>{" "}
              -{" "}
              {translate(
                "These Cookies identify if users have accepted the use of cookies on the Website.",
              )}
            </li>
            <li>
              <strong>{translate("Functionality Cookies")}</strong> -{" "}
              {translate(
                "These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference.",
              )}
            </li>
          </ul>
        </>
      ),
    },
    {
      title: translate("Use of Your Personal Data"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "The Company may use Personal Data for the following purposes:",
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              {translate(
                "To provide and maintain our Service, including to monitor the usage of our Service.",
              )}
            </li>
            <li>
              {translate(
                "To manage Your Account and registration as a user of the Service.",
              )}
            </li>
            <li>
              {translate(
                "To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication regarding updates or informative communications.",
              )}
            </li>
            <li>
              {translate(
                "To provide You with news, special offers and general information about other goods, services and events.",
              )}
            </li>
            <li>{translate("To manage Your requests to Us.")}</li>
            <li>
              {translate(
                "For other purposes such as data analysis, identifying usage trends, and improving our Service.",
              )}
            </li>
          </ul>
        </>
      ),
    },
    {
      title: translate("Retention of Your Personal Data"),
      content: (
        <p>
          {translate(
            "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.",
          )}
        </p>
      ),
    },
    {
      title: translate("Security of Your Personal Data"),
      content: (
        <p>
          {translate(
            "The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.",
          )}
        </p>
      ),
    },
    {
      title: translate("Children's Privacy"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.",
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Changes to this Privacy Policy"),
      content: (
        <p>
          {translate(
            'We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.',
          )}
        </p>
      ),
    },
    {
      title: translate("Contact Us"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "If you have any questions about this Privacy Policy, You can contact us:",
            )}
          </p>
          <p>
            {translate("By email")}:{" "}
            <a
              href="mailto:contact@bhagavadgita.io"
              className="text-prakash-primary hover:underline dark:text-nisha-primary"
            >
              contact@bhagavadgita.io
            </a>
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="pb-0">
        <PageHero
          badge={translate("Legal")}
          title={translate("Privacy Policy")}
          subtitle={translate(
            "Learn how we protect your data and ensure your privacy",
          )}
          locale={locale}
        />
      </div>

      <LegalContentPage
        lastUpdated={translate("December 2, 2025")}
        sections={sections}
      />
    </>
  );
}
