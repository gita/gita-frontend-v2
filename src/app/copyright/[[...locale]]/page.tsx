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
      ? "कॉपीराइट और अट्रिब्यूशन - BhagavadGita.io"
      : "Copyright & Attribution - BhagavadGita.io",
    description: isHindi
      ? "कॉपीराइट नीतियों, सामग्री उपयोग दिशानिर्देशों, अट्रिब्यूशन आवश्यकताओं और भगवद गीता सामग्री का जिम्मेदारी से उपयोग करने के बारे में जानें।"
      : "Learn about copyright policies, content usage guidelines, attribution requirements, and how to use Bhagavad Gita content responsibly.",
    keywords: isHindi
      ? "भगवद गीता कॉपीराइट, सामग्री अट्रिब्यूशन, उचित उपयोग, सार्वजनिक डोमेन, भगवद गीता लाइसेंस"
      : "bhagavad gita copyright, content attribution, fair use, public domain, bhagavad gita license",
    openGraph: {
      title: isHindi
        ? "कॉपीराइट और अट्रिब्यूशन - BhagavadGita.io"
        : "Copyright & Attribution - BhagavadGita.io",
      description: isHindi
        ? "कॉपीराइट नीतियों और सामग्री उपयोग दिशानिर्देशों के बारे में जानें।"
        : "Learn about copyright policies, content usage guidelines, attribution requirements, and how to use Bhagavad Gita content responsibly.",
      url: isHindi ? `${baseUrl}/hi/copyright` : `${baseUrl}/copyright`,
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
        ? "कॉपीराइट और अट्रिब्यूशन - BhagavadGita.io"
        : "Copyright & Attribution - BhagavadGita.io",
      description: isHindi
        ? "कॉपीराइट नीतियों के बारे में जानें।"
        : "Learn about copyright policies, content usage guidelines, attribution requirements, and how to use Bhagavad Gita content responsibly.",
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: isHindi ? `${baseUrl}/hi/copyright` : `${baseUrl}/copyright`,
      languages: {
        "x-default": `${baseUrl}/copyright`,
        en: `${baseUrl}/copyright`,
        hi: `${baseUrl}/hi/copyright`,
      },
    },
  };
}

export default async function Copyright(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);

  const sections: LegalContentSection[] = [
    {
      title: translate("Non-Profit Mission"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "BhagavadGita.io is a non-profit initiative operated by the Ved Vyas Foundation. Our mission is to make the sacred wisdom of the Bhagavad Gita freely accessible to seekers worldwide, transcending barriers of language, geography, and economic circumstance."
            )}
          </p>
          <p>
            {translate(
              "We believe that spiritual knowledge should be available to all who seek it. All content on this platform is provided free of charge, and we do not seek to profit from the distribution of these sacred teachings."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Content Usage Guidelines"),
      content: (
        <>
          <h3 className="mb-3 text-lg font-bold">
            {translate("Public Domain Content")}
          </h3>
          <p className="mb-4">
            {translate(
              "The original Sanskrit verses of the Bhagavad Gita are ancient sacred texts in the public domain. These verses may be freely used, reproduced, and distributed by anyone."
            )}
          </p>

          <h3 className="mb-3 text-lg font-bold">
            {translate("Translations and Commentaries")}
          </h3>
          <p className="mb-4">
            {translate(
              "All translations and commentaries featured on BhagavadGita.io have been used with explicit permission from their respective authors, publishers, and organizations. Copyrights to these works remain with their original creators."
            )}
          </p>

          <h3 className="mb-3 text-lg font-bold">
            {translate("Personal Use")}
          </h3>
          <p className="mb-4">
            {translate(
              "You are welcome to download, read, and use the content from this site for:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>{translate("Personal study and spiritual practice")}</li>
            <li>
              {translate(
                "Educational purposes in classrooms and study groups"
              )}
            </li>
            <li>
              {translate("Non-commercial religious or spiritual teaching")}
            </li>
            <li>{translate("Academic research and citation")}</li>
          </ul>

          <h3 className="mb-3 text-lg font-bold">
            {translate("Commercial Use Restrictions")}
          </h3>
          <p>
            {translate(
              "The content may NOT be used for commercial purposes. This means you cannot:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              {translate(
                "Sell or bundle the content with products or services"
              )}
            </li>
            <li>
              {translate(
                "Charge fees for access, including shipping or handling"
              )}
            </li>
            <li>
              {translate(
                "Use the content in commercial applications or websites"
              )}
            </li>
            <li>
              {translate(
                "Reproduce the content in commercial publications"
              )}
            </li>
          </ul>
        </>
      ),
    },
    {
      title: translate("Attribution Requirements"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "When using content from BhagavadGita.io, please provide appropriate attribution. A simple citation format is:"
            )}
          </p>
          <div className="mb-4 rounded-lg bg-adhyayan-bg p-4 dark:bg-nisha-bg/50">
            <p className="font-mono text-sm">
              {translate("Source")}: BhagavadGita.io - {translate("The Bhagavad Gita Online")}
              <br />
              [{translate("Translation by Author Name, if applicable")}]
              <br />
              URL: https://bhagavadgita.io
            </p>
          </div>
          <p>
            {translate(
              "Proper attribution helps others discover these teachings and supports our mission to spread this wisdom."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("API and Data Access"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "We provide a free API for developers who wish to integrate Bhagavad Gita content into their non-commercial applications. When using our API:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>{translate("Attribution must be clearly displayed")}</li>
            <li>{translate("Usage must be non-commercial")}</li>
            <li>{translate("Rate limits must be respected")}</li>
            <li>{translate("Content integrity must be maintained")}</li>
          </ul>
          <p>
            {translate(
              "For API documentation and access, please visit our developer portal or contact us at"
            )}{" "}
            <a
              href="mailto:api@bhagavadgita.io"
              className="text-prakash-primary hover:underline dark:text-nisha-primary"
            >
              api@bhagavadgita.io
            </a>
          </p>
        </>
      ),
    },
    {
      title: translate("Contributor Acknowledgements"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "We are deeply grateful to the organizations and individuals who have granted us permission to feature their translations and commentaries. For a complete list of contributors and their works, please visit our"
            )}{" "}
            <Link
              href={locale === "hi" ? "/hi/acknowledgements" : "/acknowledgements"}
              className="text-prakash-primary hover:underline dark:text-nisha-primary"
            >
              {translate("Acknowledgements page")}
            </Link>
            .
          </p>
          <p>
            {translate(
              "To acquire individual copies of any featured works, please contact the respective organizations directly. Contact information is available on our Acknowledgements page."
            )}
          </p>
        </>
      ),
    },
    {
      title: translate("Supporting Our Mission"),
      content: (
        <>
          <p className="mb-4">
            {translate(
              "As a non-profit initiative, we rely on the generosity of supporters to maintain and improve this platform. If you find value in our work, please consider:"
            )}
          </p>
          <ul className="mb-4 ml-8 list-disc space-y-2">
            <li>
              {translate("Making a donation to support our operations")}
            </li>
            <li>{translate("Sharing our website with others")}</li>
            <li>
              {translate("Contributing translations or improvements")}
            </li>
            <li>{translate("Volunteering your time and expertise")}</li>
          </ul>
          <p>
            {translate("Visit our")}{" "}
            <Link
              href={locale === "hi" ? "/hi/donate" : "/donate"}
              className="text-prakash-primary hover:underline dark:text-nisha-primary"
            >
              {translate("Donate page")}
            </Link>{" "}
            {translate("to learn more about supporting our mission.")}
          </p>
        </>
      ),
    },
    {
      title: translate("Copyright Infringement or Removal Requests"),
      content: (
        <div className="rounded-lg bg-prakash-primary/5 p-5 dark:bg-nisha-primary/5">
          <p className="mb-4">
            {translate(
              "We respect the intellectual property rights of all content creators. If you believe that content on BhagavadGita.io infringes your copyright, or if you are a rights holder and would like your content removed, please contact us immediately."
            )}
          </p>
          <p className="mb-2">
            <strong>{translate("Email")}:</strong>{" "}
            <a
              href="mailto:contact@bhagavadgita.io"
              className="text-prakash-primary hover:underline dark:text-nisha-primary"
            >
              contact@bhagavadgita.io
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            {translate(
              "Please provide: (1) identification of the copyrighted work, (2) the location of the infringing material on our site, (3) your contact information, and (4) a statement of good faith belief that the use is not authorized."
            )}
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="pb-0">
        <PageHero
          badge={translate("Legal")}
          title={translate("Copyright & Attribution")}
          subtitle={translate(
            "Understanding how to use and share the sacred teachings responsibly"
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

