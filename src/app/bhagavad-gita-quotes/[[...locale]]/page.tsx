import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import { jsonLdFirst, jsonLdTwo, quotes } from "./constants";

import { VedicPattern } from "@/components/blocks/decorative";
import { CTASection, PageHero } from "@/components/blocks/page-sections";
import { Card, CardContent } from "@/components/ui/card";

// Force static generation for better SEO
export const dynamic = "force-static";

// Pre-generate both English and Hindi versions
export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes by Lord Krishna - Hindi & English",
  description:
    "100+ Bhagavad Gita quotes by Lord Krishna in Hindi & English. Profound wisdom on karma, dharma, life, yoga, and spirituality. Read, share & inspire.",
  keywords:
    "bhagavad gita quotes, krishna quotes, gita quotes in hindi, bhagavad gita sayings, spiritual quotes, dharma quotes, karma quotes",
  authors: [{ name: "Ved Vyasa" }],
  publisher: "Ved Vyas Foundation",
  openGraph: {
    title: "Bhagavad Gita Quotes by Lord Krishna - Hindi & English",
    description:
      "100+ Bhagavad Gita quotes by Lord Krishna in Hindi & English. Profound wisdom on karma, dharma, life, yoga, and spirituality. Read, share & inspire.",
    url: "https://bhagavadgita.io/bhagavad-gita-quotes",
    siteName: "Bhagavad Gita",
    images:
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita Quotes by Lord Krishna - Hindi & English",
    description:
      "100+ Bhagavad Gita quotes by Lord Krishna in Hindi & English. Profound wisdom on karma, dharma, life, yoga, and spirituality. Read, share & inspire.",
    images: [
      "https://bhagavadgita.io/_next/image?url=%2Fbanner2.png&w=3840&q=75",
    ],
    site: "@ShriKrishna",
  },
  alternates: {
    canonical: "https://bhagavadgita.io/bhagavad-gita-quotes",
  },
};

async function Quotes(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;

  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);

  // Get quotes in the correct language
  const isHindi = locale === "hi";
  const quotesArray = isHindi ? quotes.hi : quotes.en;

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
            badge={translate("Divine Wisdom")}
            title={translate("Bhagavad Gita Quotes By Lord Krishna")}
            subtitle={translate(
              "100+ inspiring quotes by Lord Krishna on life, karma, dharma & spiritual liberation",
            )}
            primaryButtonText={translate("Read Full Gita")}
            primaryButtonLink="/"
            locale={locale}
          />
        </div>

        {/* Quotes Grid Section */}
        <section className="relative -mt-4 py-8 md:py-10">
          <div className="pointer-events-none absolute right-10 top-20 opacity-20">
            <VedicPattern variant="mandala" size={300} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {quotesArray.map((quote, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-l-4 border-l-prakash-primary/30 transition-all hover:border-l-prakash-primary hover:shadow-xl dark:border-l-nisha-primary/30 dark:hover:border-l-nisha-primary"
                >
                  <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-prakash-primary/10 text-sm font-semibold text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                    {index + 1}
                  </div>

                  <CardContent className="p-6 pt-14">
                    <blockquote className="font-merriweather text-base leading-relaxed text-foreground/90">
                      <span className="text-3xl leading-none text-prakash-primary opacity-50 dark:text-nisha-primary">
                        &ldquo;
                      </span>
                      {quote}
                      <span className="text-3xl leading-none text-prakash-primary opacity-50 dark:text-nisha-primary">
                        &rdquo;
                      </span>
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title={translate("Read the Complete Bhagavad Gita")}
          description={translate(
            "700 verses with commentaries from 20+ scholars in Hindi & English",
          )}
          primaryButtonText={translate("Start Reading")}
          primaryButtonLink="/"
          secondaryButtonText={translate("About the Gita")}
          secondaryButtonLink="/about"
          locale={locale}
        />
      </div>
    </>
  );
}

export default Quotes;
