import { Metadata } from "next";

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
      ? "सेवा की शर्तें - BhagavadGita.io"
      : "Terms of Service - BhagavadGita.io",
    description: isHindi
      ? "हमारे प्लेटफ़ॉर्म का उपयोग करने के लिए आवश्यक दिशानिर्देश। उपयोगकर्ता जिम्मेदारियों, सामग्री उपयोग, कॉपीराइट नीतियों और सेवा शर्तों के बारे में पढ़ें।"
      : "Essential guidelines for using our platform. Read about user responsibilities, content usage, copyright policies, and service terms.",
    openGraph: {
      title: isHindi
        ? "सेवा की शर्तें - BhagavadGita.io"
        : "Terms of Service - BhagavadGita.io",
      description: isHindi
        ? "हमारे प्लेटफ़ॉर्म का उपयोग करने के लिए आवश्यक दिशानिर्देश।"
        : "Essential guidelines for using our platform. Read about user responsibilities, content usage, copyright policies, and service terms.",
      url: isHindi
        ? `${baseUrl}/hi/terms-of-service`
        : `${baseUrl}/terms-of-service`,
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
        ? "सेवा की शर्तें - BhagavadGita.io"
        : "Terms of Service - BhagavadGita.io",
      description: isHindi
        ? "हमारे प्लेटफ़ॉर्म का उपयोग करने के लिए आवश्यक दिशानिर्देश।"
        : "Essential guidelines for using our platform. Read about user responsibilities, content usage, copyright policies, and service terms.",
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: isHindi
        ? `${baseUrl}/hi/terms-of-service`
        : `${baseUrl}/terms-of-service`,
      languages: {
        "x-default": `${baseUrl}/terms-of-service`,
        en: `${baseUrl}/terms-of-service`,
        hi: `${baseUrl}/hi/terms-of-service`,
      },
    },
  };
}

export default async function TermsOfService(props: ParamsWithLocale) {
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
              'Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the BhagavadGita.io website (the "Service") operated by Ved Vyas Foundation ("us", "we", or "our").'
            )}
          </p>
          <p className="mb-4">
            {translate(
              "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service."
            )}
          </p>
          <p className="mb-4">
            {translate(
              "By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Account Terms"),
      content: (
        <>
          <h3 className="mb-3 text-lg font-bold">
            {translate("Required Information")}
          </h3>
          <p className="mb-4">
            {translate(
              "You must provide a valid email address in order to complete the signup process. Any other information requested, such as your real name, is optional, unless you are accepting these terms on behalf of a legal entity."
            )}
          </p>

          <h3 className="mb-3 text-lg font-bold">
            {translate("Account Requirements")}
          </h3>
          <p className="mb-4">
            {translate(
              "We have a few simple rules for accounts on BhagavadGita.io's Service:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              {translate(
                'You must be a human to create an account. Accounts registered by "bots" or other automated methods are not permitted.'
              )}
            </li>
            <li>
              {translate(
                "One person or legal entity may maintain no more than one account."
              )}
            </li>
            <li>
              {translate(
                "Your login may only be used by one person — i.e., a single login may not be shared by multiple people."
              )}
            </li>
          </ul>

          <h3 className="mb-3 text-lg font-bold">
            {translate("User Account Security")}
          </h3>
          <p>
            {translate(
              "You are responsible for keeping your account secure while you use our Service."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Copyright Statement"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "From this site, you may download the information and use it on your computer for personal study or other non-commercial purposes. You must include appropriate attribution/credit on the material you extract. In this case, free means free. It cannot be bundled with anything sold, nor can you charge for shipping, handling, or anything. It is provided for personal study or for use in undergraduate or seminary religion classes or other non-commercial study."
            )}
          </p>
          <p>
            {translate(
              "All the translations on this site have been taken with permission from their respective authors."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Acceptable Use"),
      content: (
        <>
          <h3 className="mb-3 text-lg font-bold">
            {translate("Compliance with Laws and Regulations")}
          </h3>
          <p className="mb-4">
            {translate(
              "Your use of the Website and Service must not violate any applicable laws, including copyright or trademark laws, export control laws, or other laws in your jurisdiction. You are responsible for making sure that your use of the Service is in compliance with laws and any applicable regulations."
            )}
          </p>

          <h3 className="mb-3 text-lg font-bold">
            {translate("Conduct Restrictions")}
          </h3>
          <p className="mb-4">
            {translate(
              "While using BhagavadGita.io, you agree that you will not under any circumstances:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              {translate(
                'Use our servers for any form of excessive automated bulk activity (for example, spamming), or relay any other form of unsolicited advertising or solicitation through our servers, such as get-rich-quick schemes.'
              )}
            </li>
            <li>
              {translate(
                "Attempt to disrupt or tamper with BhagavadGita.io's servers in ways that could harm our Website or Service, to place undue burden on BhagavadGita.io's servers through automated means, or to access BhagavadGita.io's Service in ways that exceed your authorization."
              )}
            </li>
          </ul>

          <h3 className="mb-3 text-lg font-bold">{translate("Scraping")}</h3>
          <p className="mb-4">
            {translate(
              "Scraping refers to extracting data from our Website via an automated process, such as a bot or webcrawler. You may scrape the website for the following reasons:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              {translate(
                "Researchers may scrape public, non-personal information from BhagavadGita.io for research purposes, only if any publications resulting from that research are open access."
              )}
            </li>
            <li>
              {translate(
                "Archivists may scrape BhagavadGita.io for public data for archival purposes."
              )}
            </li>
            <li>
              {translate(
                "You may not scrape BhagavadGita.io for spamming purposes."
              )}
            </li>
          </ul>
        </>
      ),
    },
    {
      title: translate("API Terms"),
      content: (
        <>
          <h3 className="mb-3 text-lg font-bold">
            {translate("No Abuse or Overuse of the API")}
          </h3>
          <p className="mb-4">
            {translate(
              "Abuse or excessively frequent requests to BhagavadGita.io via the API may result in the temporary or permanent suspension of your account's access to the API. BhagavadGita.io, in our sole discretion, will determine abuse or excessive usage of the API."
            )}
          </p>
          <p className="mb-4">
            {translate(
              "Using the Bhagavad Gita API, you may download the information and use it in your app or website as long as you do not charge for it. You must include appropriate attribution/credit on the material you extract. In this case, free means free. It cannot be bundled with anything sold, nor can you charge for shipping, handling, or anything. It is provided for non-commercial use only."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Termination"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
            )}
          </p>
          <p>
            {translate(
              "Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Governing Law"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "These Terms shall be governed and construed in accordance with the laws of Haryana, India, without regard to its conflict of law provisions."
            )}
          </p>
          <p>
            {translate(
              "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding the Service."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Changes"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
            )}
          </p>
          <p>
            {translate(
              "By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Contact Us"),
      content: (
        <>
          <p className="mb-4">
            {translate("If you have any questions about these Terms, please contact us:")}
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
          title={translate("Terms of Service")}
          subtitle={translate(
            "Essential guidelines for using our platform and services"
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
