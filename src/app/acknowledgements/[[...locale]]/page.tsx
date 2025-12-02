import { ExternalLink,Heart } from "lucide-react";
import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import { getJsonLdFirst, getJsonLdTwo } from "./constants";

import { VedicPattern } from "@/components/blocks/decorative";
import { CTASection,PageHero } from "@/components/blocks/page-sections";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

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
      ? "स्वीकृतियां - भगवद गीता अनुवाद और टीका स्रोत"
      : "Acknowledgements - Bhagavad Gita Translations & Commentary Sources",
    description: isHindi
      ? "गीता प्रेस, अद्वैत आश्रम, चिन्मय मिशन, दिव्य जीवन सोसाइटी और विद्वानों के प्रति कृतज्ञता जिनके प्रामाणिक भगवद गीता अनुवाद और टीकाएं हमारे प्लेटफ़ॉर्म पर प्रदर्शित हैं।"
      : "Gratitude to Gita Press, Advaita Ashrama, Chinmaya Mission, Divine Life Society & scholars for authentic Bhagavad Gita translations and commentaries featured on our platform.",
    keywords: isHindi
      ? "भगवद गीता अनुवाद स्रोत, गीता टीका स्वीकृतियां, गीता प्रेस, अद्वैत आश्रम, प्रामाणिक गीता अनुवाद"
      : "bhagavad gita translations sources, gita commentary acknowledgements, gita press, advaita ashrama, authentic gita translations",
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      title: isHindi
        ? "स्वीकृतियां - प्रदर्शित भगवद गीता अनुवाद"
        : "Acknowledgements - Featured Bhagavad Gita Translations",
      description: isHindi
        ? "हम उन सम्मानित संगठनों और व्यक्तियों के प्रति अपनी हार्दिक कृतज्ञता व्यक्त करते हैं जिन्होंने हमें अपने अमूल्य भगवद गीता अनुवाद और टीकाओं को प्रदर्शित करने की अनुमति दी है।"
        : "We extend our heartfelt gratitude to esteemed organizations and individuals for allowing us to feature their invaluable Bhagavad Gita translations and commentaries.",
      url: isHindi
        ? `${baseUrl}/hi/acknowledgements`
        : `${baseUrl}/acknowledgements`,
      siteName: "Bhagavad Gita",
      images: [
        {
          url: "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          secureUrl:
            "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          height: 1080,
          width: 1920,
        },
      ],
      locale: isHindi ? "hi_IN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isHindi
        ? "स्वीकृतियां - प्रदर्शित भगवद गीता अनुवाद"
        : "Acknowledgements - Featured Bhagavad Gita Translations",
      description: isHindi
        ? "हम उन सम्मानित संगठनों के प्रति अपनी कृतज्ञता व्यक्त करते हैं।"
        : "We extend our heartfelt gratitude to esteemed organizations and individuals for allowing us to feature their invaluable Bhagavad Gita translations and commentaries.",
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: isHindi
        ? `${baseUrl}/hi/acknowledgements`
        : `${baseUrl}/acknowledgements`,
      languages: {
        "x-default": `${baseUrl}/acknowledgements`,
        en: `${baseUrl}/acknowledgements`,
        hi: `${baseUrl}/hi/acknowledgements`,
      },
    },
  };
}

export default async function Acknowledgement(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);
  const isHindi = locale === "hi";

  const contributors = [
    {
      name: isHindi ? "गीता प्रेस, गोरखपुर" : "Gita Press, Gorakhpur",
      description: translate("Since 1923, Gita Press has been one of the world's largest publishers of Hindu religious texts. Their unwavering commitment to making spiritual literature accessible and affordable has touched millions of lives across generations, spreading the timeless wisdom of the Bhagavad Gita throughout India and beyond."),
      location: "Govind Bhawan Karyalaya, Gitapress, Gorakhpur 273005, Uttar Pradesh, India",
      website: "https://www.gitapress.org/",
      work: translate(
        "Srimad Bhagavad Gita: with Hindi translation of Sankarabhashya translated by Sri Harikrishandas Goenka (1998) and Srimad Bhagavad Gita: Sadhaka Sanjivani (Hindi Commentary) by Swami Ramsukhdas (1995)"
      ),
    },
    {
      name: isHindi ? "अद्वैत आश्रम" : "Advaita Ashrama",
      description: translate("The publication house of the Ramakrishna Order, Advaita Ashrama has been spreading the message of Vedanta since 1909. Their scholarly publications maintain the highest standards of authenticity and clarity, making profound philosophical truths accessible to seekers worldwide."),
      location: "5 Dehi Entally Road, Calcutta, India",
      contact: "advaita@giascl01.vsnl.net.in",
      website: "https://www.advaitaashrama.org/",
      work: translate(
        "Commentary on Bhagavad Gita by Sankaracarya, translated by Swami Gambhirananda (Published in 1995)"
      ),
    },
    {
      name: isHindi ? "केंद्रीय चिन्मय मिशन ट्रस्ट" : "Central Chinmaya Mission Trust",
      description: translate("Founded by Swami Chinmayananda in 1953, the Chinmaya Mission has been transforming lives through Vedantic wisdom for over seven decades. Their teachings make ancient philosophy accessible to modern minds, bridging traditional knowledge with contemporary understanding."),
      location: "Sandeepany Sadhanalaya, Saki Vihar Road, Mumbai 400 072, India",
      contact: "chinmaya@bom2.vsnl.net.in",
      website: "https://www.chinmayamission.com/",
      work: translate(
        "Srimad Bhagavad Gita translated by Swami Tejomayananda (1993) [Hindi translation of The Holy Geeta by Swami Chinmayananda]"
      ),
    },
    {
      name: isHindi ? "दिव्य जीवन सोसायटी" : "Divine Life Society",
      description: translate("Established by Swami Sivananda in 1936 in the sacred Himalayas, the Divine Life Society continues to spread the universal message of truth, love, and service. Swami Sivananda was a prolific author and spiritual giant whose teachings combine deep wisdom with practical guidance."),
      location: "P.O. Shivanandanagar 249192, District Tehri-Garhwal, Uttar Pradesh, Himalayas, India",
      website: "https://www.dlshq.org/",
      work: translate(
        "The Bhagavad Gita by Swami Sivananda (1995, The Divine Life Society, Shivanandanagar)"
      ),
    },
    {
      name: isHindi ? "श्री वेंकटेश्वर विश्वविद्यालय, तिरुपति" : "Sri Venkateswara University, Tirupati",
      description: translate("The Oriental Research Institute at Sri Venkateswara University is a renowned center for Indological research. Their scholarly work preserves and promotes India's rich literary and philosophical heritage, making rare texts and commentaries available to researchers and spiritual seekers."),
      location: "Oriental Research Institute, Sri Venkateswara University, Tirupati 517502, Andhra Pradesh, India",
      website: "https://www.svuniversity.edu.in/",
      work: translate(
        "Srimad Bhagavad Gita with Gitarthasangraha of Abhinavagupta Part 1 & 2. Translation by Dr. S Sankaranarayan (1985)"
      ),
    },
    {
      name: isHindi ? "गीता सुपरसाइट आईआईटी कानपुर टीम" : "Gita Supersite IITK Team",
      description: translate("The brilliant team at IIT Kanpur created Gita Supersite, a pioneering digital platform that brought together translations and commentaries from multiple scholars in one comprehensive resource. Their groundbreaking work in digitizing classical Gita commentaries has been invaluable."),
      website: "https://gitasupersite.iitk.ac.in/",
      work: translate(
        "Special thanks to the team at Gita Supersite by IIT Kanpur for their hard work in collating various translations and commentaries of the Bhagavad Gita in one comprehensive platform."
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdFirst(isHindi)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdTwo(isHindi)),
        }}
      />

      <div className="relative min-h-screen overflow-hidden bg-prakash-bg font-inter dark:bg-nisha-bg">
        {/* Hero */}
        <div className="pb-0">
          <PageHero
            badge={translate("Gratitude")}
            title={translate("Acknowledgements")}
            subtitle={translate(
              "Honoring the scholars, translators, and organizations who preserve and share the wisdom of the Bhagavad Gita"
            )}
            locale={locale}
          />
        </div>

        {/* Contributors Section */}
        <section className="relative -mt-4 py-8 md:py-10">
          <div className="pointer-events-none absolute right-10 top-10 opacity-20">
            <VedicPattern variant="mandala" size={300} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-7xl px-4">
            <p className="mb-8 text-center text-sm text-muted-foreground">
              {translate(
                "All copyrights are retained by the respective organizations."
              )}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {contributors.map((contributor, index) => (
                <Card
                  key={index}
                  className="overflow-hidden transition-shadow hover:shadow-lg"
                >
                  <CardHeader className="bg-adhyayan-bg dark:bg-nisha-bg/50">
                    <CardTitle className="font-newsreader flex items-center gap-2 text-xl">
                      <Heart className="size-5 text-prakash-primary dark:text-nisha-primary" />
                      {contributor.name}
                    </CardTitle>
                    {contributor.location && (
                      <p className="mt-3 text-sm leading-relaxed text-foreground/60 dark:text-foreground/70">
                        {contributor.location}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="font-merriweather space-y-4">
                      {contributor.description && (
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {contributor.description}
                        </p>
                      )}
                      
                      <div className="flex flex-col gap-2 border-t pt-3">
                        {contributor.website && (
                          <p className="text-sm text-foreground/70">
                            <span className="font-medium text-foreground/80">
                              {translate("Website")}:
                            </span>{" "}
                            <a
                              href={contributor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-prakash-primary hover:underline dark:text-nisha-primary"
                            >
                              {contributor.website}
                              <ExternalLink className="size-3" />
                            </a>
                          </p>
                        )}
                        {contributor.contact && (
                          <p className="text-sm text-foreground/70">
                            <span className="font-medium text-foreground/80">
                              {translate("Email")}:
                            </span>{" "}
                            <a
                              href={`mailto:${contributor.contact}`}
                              className="text-prakash-primary hover:underline dark:text-nisha-primary"
                            >
                              {contributor.contact}
                            </a>
                          </p>
                        )}
                      </div>

                      <div className="rounded-lg border border-muted bg-muted/30 p-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/60">
                          {translate("Featured Work")}
                        </p>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {contributor.work}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title={translate("Support Our Mission")}
          description={translate(
            "Help us continue making the Bhagavad Gita accessible to seekers worldwide"
          )}
          primaryButtonText={translate("Donate Now")}
          primaryButtonLink="/donate"
          locale={locale}
        />
      </div>
    </>
  );
}
