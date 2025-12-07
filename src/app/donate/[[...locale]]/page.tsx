import { Bot, Globe, Heart, QrCode, Smartphone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import { getJsonLdFirst, getJsonLdTwo } from "./constants";

import { VedicPattern } from "@/components/blocks/decorative";
import { CTASection, PageHero } from "@/components/blocks/page-sections";
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
      ? "दान करें - वेद व्यास फाउंडेशन - निःशुल्क भगवद गीता संसाधनों का समर्थन करें"
      : "Donate to Ved Vyas Foundation - Support Free Bhagavad Gita Resources",
    description: isHindi
      ? "लाखों लोगों के लिए निःशुल्क, विज्ञापन-मुक्त भगवद गीता संसाधनों का समर्थन करें। वेद व्यास फाउंडेशन को हिंदी और अंग्रेजी में गीता, मोबाइल ऐप्स और AI चैटबॉट प्रदान करने में मदद करें।"
      : "Support free, ad-free Bhagavad Gita resources for millions. Help Ved Vyas Foundation provide Gita in Hindi & English, mobile apps, and AI chatbot to seekers worldwide.",
    keywords: isHindi
      ? "भगवद गीता दान, वेद व्यास फाउंडेशन दान, गीता परियोजना का समर्थन, भगवद गीता चैरिटी, आध्यात्मिक दान भारत"
      : "donate bhagavad gita, ved vyas foundation donation, support gita project, bhagavad gita charity, spiritual donation india",
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      title: isHindi
        ? "दान करें - भगवद गीता - वेद व्यास फाउंडेशन"
        : "Donate - Bhagavad Gita - Ved Vyas Foundation",
      description: isHindi
        ? "भगवद गीता परियोजना में दान करें और दुनिया भर में भगवद गीता और कृष्ण की बुद्धिमत्ता के संदेश को फैलाने के हमारे मिशन को जारी रखने में मदद करें।"
        : "Donate to the Bhagavad Gita project to help us continue our mission of spreading the message of the Bhagavad Gita and Krishna's wisdom to the world.",
      url: isHindi ? `${baseUrl}/hi/donate` : `${baseUrl}/donate`,
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
        ? "दान करें - भगवद गीता - वेद व्यास फाउंडेशन"
        : "Donate - Bhagavad Gita - Ved Vyas Foundation",
      description: isHindi
        ? "भगवद गीता परियोजना में दान करें और दुनिया भर में भगवद गीता और कृष्ण की बुद्धिमत्ता के संदेश को फैलाने के हमारे मिशन को जारी रखने में मदद करें।"
        : "Donate to the Bhagavad Gita project to help us continue our mission of spreading the message of the Bhagavad Gita and Krishna's wisdom to the world.",
      images: [
        "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: isHindi ? `${baseUrl}/hi/donate` : `${baseUrl}/donate`,
      languages: {
        "x-default": `${baseUrl}/donate`,
        en: `${baseUrl}/donate`,
        hi: `${baseUrl}/hi/donate`,
      },
    },
  };
}

export default async function Donate(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);
  const isHindi = locale === "hi";

  const jsonLdFirst = getJsonLdFirst(isHindi);
  const jsonLdTwo = getJsonLdTwo(isHindi);

  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  // What your donation supports
  const supportedResources = [
    {
      icon: <Globe className="size-6" />,
      title: translate("Bhagavad Gita Website"),
      description: translate(
        "Free, ad-free access to all 700 verses with translations and commentaries",
      ),
      link: "/",
    },
    {
      icon: <Smartphone className="size-6" />,
      title: translate("Mobile Apps"),
      description: translate(
        "iOS and Android apps bringing the Gita to your fingertips",
      ),
      link: "/app",
    },
    {
      icon: <Bot className="size-6" />,
      title: translate("GitaGPT AI Chatbot"),
      description: translate(
        "AI-powered spiritual guidance based on the Bhagavad Gita",
      ),
      link: "/gitagpt",
    },
  ];

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

      <div className="relative min-h-screen overflow-hidden bg-prakash-bg font-crimson dark:bg-nisha-bg">
        <div className="pb-0">
          <PageHero
            badge={translate("Support")}
            title={translate("Donate")}
            subtitle={translate(
              "Support the digital revival of ancient wisdom. Help us make the Bhagavad Gita accessible to seekers worldwide, free and ad-free.",
            )}
            locale={locale}
          />
        </div>

        {/* What Your Donation Supports */}
        <section className="relative py-8 md:py-10">
          <div className="pointer-events-none absolute bottom-10 right-10 opacity-20">
            <VedicPattern variant="mandala" size={300} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeader
              subtitle={translate("IMPACT")}
              title={translate("What Your Donation Supports")}
              align="center"
              className="mb-10"
            />

            <div className="grid gap-6 md:grid-cols-3">
              {supportedResources.map((resource, index) => (
                <Link
                  key={index}
                  href={
                    resource.link === "/gitagpt"
                      ? "/gitagpt"
                      : localizedLink(resource.link)
                  }
                  className="group block"
                >
                  <Card className="h-full overflow-hidden border-2 transition-all hover:border-prakash-primary hover:shadow-xl dark:hover:border-nisha-primary">
                    <CardContent className="p-6">
                      <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-prakash-primary/10 text-prakash-primary transition-transform group-hover:scale-110 dark:bg-nisha-primary/10 dark:text-nisha-primary">
                        {resource.icon}
                      </div>
                      <CardTitle className="font-newsreader mb-3 text-xl">
                        {resource.title}
                      </CardTitle>
                      <p className="font-merriweather text-sm leading-relaxed text-muted-foreground">
                        {resource.description}
                      </p>
                      <p className="mt-4 text-sm font-medium text-prakash-primary group-hover:underline dark:text-nisha-primary">
                        {translate("Learn more")} →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section className="relative bg-adhyayan-bg py-8 dark:bg-nisha-bg/50 md:py-10">
          <div className="pointer-events-none absolute bottom-10 left-10 opacity-20">
            <VedicPattern variant="dots" size={200} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-8 text-center">
              <h2 className="font-newsreader mb-3 text-2xl font-bold md:text-3xl">
                {translate("Make a Donation")}
              </h2>
              <p className="font-merriweather text-sm text-muted-foreground md:text-base">
                {translate("Scan the QR code with any UPI app")}
              </p>
            </div>

            <Card className="overflow-hidden border-2 shadow-xl transition-shadow hover:shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center gap-8">
                  <div className="relative rounded-2xl border-4 border-prakash-primary/30 bg-white p-6 shadow-lg dark:border-nisha-primary/30 dark:bg-nisha-bg">
                    <Image
                      src="/upi_qr_radhakrishna.png"
                      alt={translate("Donate to Ved Vyas Foundation")}
                      width={280}
                      height={280}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-full rounded-xl bg-prakash-primary/5 p-6 text-center dark:bg-nisha-primary/5">
                    <p className="font-merriweather mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      {translate("UPI ID")}
                    </p>
                    <p className="font-newsreader text-2xl font-bold text-prakash-primary dark:text-nisha-primary md:text-3xl">
                      vedvyasfoundation@icici
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          title={translate("Thank You for Your Support")}
          description={translate(
            "Your contribution helps preserve and share the timeless wisdom of the Bhagavad Gita with seekers around the world.",
          )}
          primaryButtonText={translate("Read the Gita")}
          primaryButtonLink="/"
          secondaryButtonText={translate("Learn More About Us")}
          secondaryButtonLink="/about"
          locale={locale}
        />
      </div>
    </>
  );
}
