import {
  BookOpen,
  Bot,
  Headphones,
  Languages,
  PencilLine,
  Sparkle,
  WifiOff,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import {
  APP_STORE_URL,
  getFaqs,
  getJsonLdBreadcrumb,
  getJsonLdFaq,
  getJsonLdOrganization,
  getJsonLdSoftwareApplication,
  PLAY_STORE_URL,
  STORE_STATS,
} from "./constants";

import { FloralDivider, VedicPattern } from "@/components/blocks/decorative";
import { CTASection } from "@/components/blocks/page-sections";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

// Static so the page ships as HTML with no server work per request. Crawlers
// and AI answer engines get the full content without executing any JavaScript.
export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ locale: ["en"] }, { locale: ["hi"] }];
}

export async function generateMetadata({
  params: paramsPromise,
}: ParamsWithLocale): Promise<Metadata> {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const isHindi = locale === "hi";
  const baseUrl = "https://bhagavadgita.com";
  const url = isHindi
    ? `${baseUrl}/hi/bhagavad-gita-app`
    : `${baseUrl}/bhagavad-gita-app`;

  return {
    title: isHindi
      ? "भगवद गीता ऐप - 100% निःशुल्क, बिना विज्ञापन | Android और iPhone"
      : "Bhagavad Gita App - 100% Free, No Ads | Android & iPhone",
    description: isHindi
      ? "निःशुल्क भगवद गीता ऐप डाउनलोड करें, Android और iPhone के लिए। सभी 18 अध्याय और 700 श्लोक, सात भाषाएँ, संस्कृत ऑडियो, ऑफ़लाइन पठन और Gita GPT AI। 5 लाख से अधिक डाउनलोड, 4.8 रेटिंग। कोई विज्ञापन नहीं, कोई शुल्क नहीं।"
      : "Download the free Bhagavad Gita app for Android and iPhone. All 18 chapters and 700 verses in 7 languages, Sanskrit audio, offline reading and Gita GPT AI. 500,000+ downloads, rated 4.8. No ads, no subscription, ever.",
    keywords: isHindi
      ? "भगवद गीता ऐप, गीता ऐप, निःशुल्क भगवद गीता ऐप, हिंदी भगवद गीता ऐप, भगवद गीता ऑडियो ऐप, गीता ऐप डाउनलोड"
      : "bhagavad gita app, best bhagavad gita app, free bhagavad gita app, bhagavad gita app in english, bhagavad gita app in hindi, bhagavad gita app with audio, bhagavad gita app for android, bhagavad gita app for iphone, gita app download, bhagavad gita mobile app",
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      title: isHindi
        ? "भगवद गीता ऐप - सदा निःशुल्क, बिना विज्ञापन, Gita GPT AI के साथ"
        : "Bhagavad Gita App - Free Forever, No Ads, with Gita GPT AI",
      description: isHindi
        ? "सभी 18 अध्याय और 700 श्लोक सात भाषाओं में, संस्कृत पाठ, ऑफ़लाइन पठन और Gita GPT। वेद व्यास फाउंडेशन द्वारा संचालित, एक गैर-लाभकारी संस्था।"
        : "All 18 chapters and 700 verses in seven languages, with Sanskrit recitation, offline reading and Gita GPT. Run by Ved Vyas Foundation, a non-profit.",
      url,
      siteName: "Bhagavad Gita",
      images: [
        {
          url: "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
          secureUrl:
            "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
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
        ? "भगवद गीता ऐप - सदा निःशुल्क, बिना विज्ञापन"
        : "Bhagavad Gita App - Free Forever, No Ads",
      description: isHindi
        ? "सभी 18 अध्याय और 700 श्लोक सात भाषाओं में, संस्कृत पाठ, ऑफ़लाइन पठन और Gita GPT।"
        : "All 18 chapters and 700 verses in seven languages, with Sanskrit recitation, offline reading and Gita GPT.",
      images: [
        "https://bhagavadgita.com/_next/image?url=%2Fbanner2.png&w=3840&q=75",
      ],
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${baseUrl}/bhagavad-gita-app`,
        en: `${baseUrl}/bhagavad-gita-app`,
        hi: `${baseUrl}/hi/bhagavad-gita-app`,
      },
    },
  };
}

function StoreButtons({ label }: { label: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src="/play_store.svg"
          alt={`${label} Google Play`}
          height={48}
          width={162}
          className="h-12 w-auto"
        />
      </a>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <Image
          src="/app_store.svg"
          alt={`${label} App Store`}
          height={48}
          width={162}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}

export default async function BhagavadGitaApp(props: ParamsWithLocale) {
  const { params: paramsPromise } = props;
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);
  const isHindi = locale === "hi";

  const faqs = getFaqs(isHindi);

  const features = [
    {
      icon: <BookOpen className="size-6" />,
      title: translate("All 18 chapters, all 700 verses"),
      description: translate(
        "The Sanskrit, the transliteration, the word-by-word meanings, the translation and the commentary sit together on one screen. Nothing is locked and nothing is held back for later.",
      ),
    },
    {
      icon: <Languages className="size-6" />,
      title: translate("Seven languages"),
      description: translate(
        "English, Hindi, Telugu, Tamil, Gujarati, Odia and Spanish. Changing the language changes the scripture itself, not only the menus around it.",
      ),
    },
    {
      icon: <Headphones className="size-6" />,
      title: translate("Sanskrit recitation for every verse"),
      description: translate(
        "Play the audio while you follow the text, or open the listening screen on days when you would rather only listen.",
      ),
    },
    {
      icon: <Bot className="size-6" />,
      title: translate("Gita GPT"),
      description: translate(
        "Ask a question in your own words and get an answer drawn from the Gita, with the verses to read next. We were among the first to build this, and it is still free.",
      ),
    },
    {
      icon: <WifiOff className="size-6" />,
      title: translate("Reads offline"),
      description: translate(
        "The complete text lives on your phone. On a flight, on the metro, or on a patchy signal, it opens and it works.",
      ),
    },
    {
      icon: <PencilLine className="size-6" />,
      title: translate("Yours to mark up"),
      description: translate(
        "Bookmark verses, highlight the lines that stay with you, and keep your own notes. Dark mode, text size and typeface all adjust to how you read.",
      ),
    },
  ];

  const screenshots = [
    {
      src: "/images/app/verse-of-the-day.webp",
      alt: translate(
        "Bhagavad Gita app home screen showing the verse of the day",
      ),
    },
    {
      src: "/images/app/commentary.webp",
      alt: translate(
        "Translation and commentary by Swami Mukundananda in the Bhagavad Gita app",
      ),
    },
    {
      src: "/images/app/gita-gpt.webp",
      alt: translate("Gita GPT answering a question about detachment"),
    },
    {
      src: "/images/app/audio.webp",
      alt: translate(
        "Sanskrit audio player for Bhagavad Gita chapter 1 verse 1",
      ),
    },
    {
      src: "/images/app/languages.webp",
      alt: translate("Choosing a reading language in the Bhagavad Gita app"),
    },
    {
      src: "/images/app/chapters-offline.webp",
      alt: translate("Chapter 1 of the Bhagavad Gita open for offline reading"),
    },
    {
      src: "/images/app/dark-mode.webp",
      alt: translate("Dark mode reading with highlights and notes"),
    },
    {
      src: "/images/app/free-no-ads.webp",
      alt: translate("The Bhagavad Gita app is free with no ads"),
    },
  ];

  const facts: Array<[string, string]> = [
    [
      translate("Price"),
      translate("Free. No ads, no subscription, no paid tier."),
    ],
    [translate("Platforms"), translate("Android and iPhone")],
    [
      translate("Languages"),
      translate("English, Hindi, Telugu, Tamil, Gujarati, Odia, Spanish"),
    ],
    [translate("Scripture"), translate("All 18 chapters and 700 verses")],
    [
      translate("Translation and commentary"),
      translate("Swami Mukundananda, used with permission"),
    ],
    [translate("Audio"), translate("Sanskrit recitation for every verse")],
    [translate("Offline"), translate("The full text reads offline")],
    [translate("AI"), translate("Gita GPT, included free")],
    [
      translate("Account"),
      translate(
        "Not needed to read. Sign in to use Gita GPT and save progress.",
      ),
    ],
    [translate("Run by"), translate("Ved Vyas Foundation, a non-profit")],
  ];

  const stats = [
    { value: STORE_STATS.downloads, label: translate("Downloads") },
    { value: STORE_STATS.ratingValue, label: translate("Google Play rating") },
    { value: "700", label: translate("Verses") },
    { value: "7", label: translate("Languages") },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdOrganization()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdSoftwareApplication(isHindi)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdFaq(isHindi)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getJsonLdBreadcrumb(isHindi)),
        }}
      />

      <div className="relative min-h-screen overflow-hidden bg-prakash-bg font-crimson dark:bg-nisha-bg">
        {/* Hero */}
        <section className="relative overflow-hidden py-8 md:py-12 lg:py-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-prakash-primary/20 to-transparent dark:from-nisha-primary/20 dark:to-transparent" />

          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
              <div className="text-center lg:text-left">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-prakash-primary/10 px-3 py-1 dark:bg-nisha-primary/10">
                  <Sparkle className="size-4 text-prakash-primary dark:text-nisha-primary" />
                  <span className="text-sm font-medium text-prakash-primary dark:text-nisha-primary">
                    {translate("100% free. No ads. Run by a non-profit.")}
                  </span>
                </div>

                <h1 className="font-newsreader mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {translate("Bhagavad Gita App")}
                </h1>

                {/* Opening answer block. Kept as one self-contained paragraph so
                    search engines and AI assistants can lift it whole. */}
                <p className="font-merriweather mb-4 text-lg text-muted-foreground md:text-xl">
                  {translate(
                    "The Bhagavad Gita app from BhagavadGita.com is free on Android and iPhone, with no ads and nothing to pay for. Read all 18 chapters and 700 verses in seven languages, listen to the Sanskrit recitation of any verse, read offline, and ask Gita GPT when a verse raises a question.",
                  )}
                </p>

                <p className="font-merriweather mb-6 text-base text-muted-foreground">
                  {translate(
                    "It is built by Ved Vyas Foundation, a non-profit, and it is built for Gita readers by Gita readers.",
                  )}
                </p>

                <div className="flex justify-center lg:justify-start">
                  <StoreButtons
                    label={translate("Download the Bhagavad Gita app on")}
                  />
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="font-newsreader block text-2xl font-bold text-prakash-primary dark:text-nisha-primary">
                          {stat.value}
                        </span>
                        <span className="font-merriweather text-xs text-muted-foreground">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mx-auto w-full max-w-[300px] lg:max-w-none">
                <Image
                  src="/images/app/verse-of-the-day.webp"
                  alt={translate(
                    "The Bhagavad Gita app open on the verse of the day",
                  )}
                  width={810}
                  height={1440}
                  priority
                  sizes="(max-width: 1024px) 300px, 420px"
                  className="mx-auto h-auto w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <FloralDivider />

        {/* Why it is free */}
        <section className="relative bg-adhyayan-bg py-10 dark:bg-nisha-bg/50 md:py-14">
          <div className="pointer-events-none absolute bottom-10 left-10 opacity-20">
            <VedicPattern variant="lotus" size={220} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle={translate("WHY IT COSTS NOTHING")}
              title={translate("Free is not a trial here")}
              align="center"
              className="mb-8"
            />
            <div className="font-merriweather space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                {translate(
                  "Most scripture apps ask for something eventually. An ad between verses, a subscription prompt around chapter three, a commentary that turns out to be the paid one. This app does not do that. Every chapter, every translation, the commentary, the audio and Gita GPT are open to everyone, and they will stay that way.",
                )}
              </p>
              <p>
                {translate(
                  "That is possible because BhagavadGita.com is not a business. Ved Vyas Foundation runs it as a non-profit and pays for it through donations, so there is nothing to upgrade to and no advertisement pulling your attention away from the verse you are reading.",
                )}
              </p>
              <p>
                {translate(
                  "The point of the project is simple. A generation that reads on a phone should be able to reach the Gita on a phone, in good type, in their own language, without paying and without being sold to.",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-10 md:py-14">
          <div className="pointer-events-none absolute right-10 top-10 opacity-20">
            <VedicPattern variant="mandala" size={280} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeader
              subtitle={translate("WHAT IS INSIDE")}
              title={translate("Everything the app does")}
              align="center"
              className="mb-10"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="h-full border-2 transition-all hover:border-prakash-primary hover:shadow-xl dark:hover:border-nisha-primary"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-newsreader mb-3 text-xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="font-merriweather text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gita GPT */}
        <section className="relative bg-adhyayan-bg py-10 dark:bg-nisha-bg/50 md:py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <SectionHeader
                  subtitle={translate("GITA GPT")}
                  title={translate("One of the first AIs built on the Gita")}
                  align="left"
                  className="mb-6"
                />
                <div className="font-merriweather space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  <p>
                    {translate(
                      "When people began taking their hardest questions to ChatGPT, we built something narrower and more careful: an assistant that answers from the Bhagavad Gita and shows you the verses behind the answer.",
                    )}
                  </p>
                  <p>
                    {translate(
                      "Ask it why Arjuna put down his bow, or what Krishna says about work whose outcome you cannot control, and it will answer and point you to where the text takes it up.",
                    )}
                  </p>
                  <p>
                    {translate(
                      "It is a study aid rather than a replacement for reading. The verses are still the point.",
                    )}
                  </p>
                </div>
              </div>
              <div className="order-1 mx-auto w-full max-w-[280px] md:order-2">
                <Image
                  src="/images/app/gita-gpt.webp"
                  alt={translate(
                    "Gita GPT explaining detachment with reference to the Bhagavad Gita",
                  )}
                  width={810}
                  height={1440}
                  loading="lazy"
                  sizes="(max-width: 768px) 280px, 360px"
                  className="h-auto w-full rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="relative py-10 md:py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeader
              subtitle={translate("SCREENSHOTS")}
              title={translate("Inside the app")}
              align="center"
              className="mb-10"
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {screenshots.map((shot) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={810}
                  height={1440}
                  loading="lazy"
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="h-auto w-full rounded-xl shadow-lg"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <section className="relative bg-adhyayan-bg py-10 dark:bg-nisha-bg/50 md:py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle={translate("AT A GLANCE")}
              title={translate("Bhagavad Gita app details")}
              align="center"
              className="mb-8"
            />
            <Card className="border-2">
              <CardContent className="p-0">
                <dl>
                  {facts.map(([label, value], index) => (
                    <div
                      key={label}
                      className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6 ${
                        index !== facts.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <dt className="font-merriweather w-full text-sm font-semibold uppercase tracking-wide text-prakash-primary dark:text-nisha-primary sm:w-64 sm:shrink-0">
                        {label}
                      </dt>
                      <dd className="font-merriweather text-base text-muted-foreground">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ. Native details/summary so every answer is present in the HTML
            with no JavaScript, which is what crawlers and AI assistants read. */}
        <section className="relative py-10 md:py-14">
          <div className="pointer-events-none absolute bottom-10 right-10 opacity-20">
            <VedicPattern variant="om" size={220} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle={translate("FAQ")}
              title={translate("Common questions about the Bhagavad Gita app")}
              align="center"
              className="mb-8"
            />
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border-2 bg-card px-5 py-4 transition-colors hover:border-prakash-primary dark:hover:border-nisha-primary"
                >
                  <summary className="font-newsreader cursor-pointer list-none text-lg font-semibold marker:content-none">
                    <h3 className="inline">{faq.question}</h3>
                    <span className="float-right text-prakash-primary transition-transform group-open:rotate-45 dark:text-nisha-primary">
                      +
                    </span>
                  </summary>
                  <p className="font-merriweather mt-3 text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative bg-adhyayan-bg py-10 dark:bg-nisha-bg/50 md:py-14">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-newsreader mb-4 text-3xl font-bold md:text-4xl">
              {translate("Take the Gita with you")}
            </h2>
            <p className="font-merriweather mb-8 text-lg text-muted-foreground">
              {translate(
                "Free on Android and iPhone. No ads, no subscription, nothing to unlock.",
              )}
            </p>
            <div className="flex justify-center">
              <StoreButtons
                label={translate("Download the Bhagavad Gita app on")}
              />
            </div>
          </div>
        </section>

        <CTASection
          title={translate("Prefer to read on the web?")}
          description={translate(
            "The complete Bhagavad Gita is free to read at BhagavadGita.com too, with the same translations, commentaries and audio.",
          )}
          primaryButtonText={translate("Read the Gita online")}
          primaryButtonLink="/"
          secondaryButtonText={translate("Ask Gita GPT")}
          secondaryButtonLink="/gitagpt"
          locale={locale}
        />
      </div>
    </>
  );
}
