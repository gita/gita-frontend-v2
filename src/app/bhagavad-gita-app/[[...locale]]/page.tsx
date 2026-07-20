import {
  BookOpen,
  Headphones,
  Languages,
  PencilLine,
  Sparkle,
  Sun,
  WifiOff,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { isValidLocaleSegment, paramsToLocale } from "shared/functions";
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
import { ogImageUrl } from "@/lib/og/brand";

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
    ? `${baseUrl}/bhagavad-gita-app/hi`
    : `${baseUrl}/bhagavad-gita-app`;

  return {
    title: isHindi
      ? "सबसे अच्छा निःशुल्क भगवद गीता ऐप - बिना विज्ञापन | Android और iPhone"
      : "Best Free Bhagavad Gita App - No Ads | Android & iPhone",
    description: isHindi
      ? "निःशुल्क भगवद गीता ऐप डाउनलोड करें, Android और iPhone के लिए। सभी 18 अध्याय और 700 श्लोक, सात भाषाएँ, संस्कृत ऑडियो, ऑफ़लाइन पठन और Gita GPT AI। 5 लाख से अधिक डाउनलोड, 4.8 रेटिंग। कोई विज्ञापन नहीं, कोई शुल्क नहीं।"
      : "Looking for the best free Bhagavad Gita app? All 18 chapters and 700 verses in 7 languages, Sanskrit audio, offline reading and Gita GPT AI, on Android and iPhone. 500,000+ downloads, rated 4.8. No ads, no subscription, ever.",
    keywords: isHindi
      ? "भगवद गीता ऐप, गीता ऐप, निःशुल्क भगवद गीता ऐप, हिंदी भगवद गीता ऐप, भगवद गीता ऑडियो ऐप, गीता ऐप डाउनलोड"
      : "bhagavad gita app, best bhagavad gita app, free bhagavad gita app, bhagavad gita app in english, bhagavad gita app in hindi, bhagavad gita app with audio, bhagavad gita app for android, bhagavad gita app for iphone, gita app download, bhagavad gita mobile app",
    authors: [{ name: "Ved Vyasa" }],
    creator: "Ved Vyas Foundation",
    publisher: "Ved Vyas Foundation",
    openGraph: {
      images: [ogImageUrl({
        eyebrow: "Free forever, no ads",
        heading: "Bhagavad Gita App",
        subheading:
          "700 verses in seven languages, with Sanskrit recitation, offline reading and Gita GPT.",
        meta: "Android and iPhone",
      })],
      title: isHindi
        ? "सबसे अच्छा निःशुल्क भगवद गीता ऐप - बिना विज्ञापन, संस्कृत ऑडियो, Gita GPT AI"
        : "Best Free Bhagavad Gita App - No Ads, Sanskrit Audio, Gita GPT AI",
      description: isHindi
        ? "सभी 18 अध्याय और 700 श्लोक सात भाषाओं में, संस्कृत पाठ, ऑफ़लाइन पठन और Gita GPT। वेद व्यास फाउंडेशन द्वारा संचालित, एक गैर-लाभकारी संस्था।"
        : "All 18 chapters and 700 verses in seven languages, with Sanskrit recitation, offline reading and Gita GPT. Run by Ved Vyas Foundation, a non-profit.",
      url,
      siteName: "Bhagavad Gita",
      locale: isHindi ? "hi_IN" : "en_US",
      type: "website",
    },
    twitter: {
      images: [ogImageUrl({
        eyebrow: "Free forever, no ads",
        heading: "Bhagavad Gita App",
        subheading:
          "700 verses in seven languages, with Sanskrit recitation, offline reading and Gita GPT.",
        meta: "Android and iPhone",
      })],
      card: "summary_large_image",
      title: isHindi
        ? "सबसे अच्छा निःशुल्क भगवद गीता ऐप - बिना विज्ञापन"
        : "Best Free Bhagavad Gita App - No Ads",
      description: isHindi
        ? "सभी 18 अध्याय और 700 श्लोक सात भाषाओं में, संस्कृत पाठ, ऑफ़लाइन पठन और Gita GPT।"
        : "All 18 chapters and 700 verses in seven languages, with Sanskrit recitation, offline reading and Gita GPT.",
      site: "@ShriKrishna",
    },
    alternates: {
      canonical: url,
      languages: {
        "x-default": `${baseUrl}/bhagavad-gita-app`,
        en: `${baseUrl}/bhagavad-gita-app`,
        hi: `${baseUrl}/bhagavad-gita-app/hi`,
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
  if (!isValidLocaleSegment(params)) notFound();
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);
  const translate = getTranslate(translations, locale);
  const isHindi = locale === "hi";

  const faqs = getFaqs(isHindi);

  const features = [
    {
      icon: <BookOpen className="size-6" />,
      title: translate("Every verse explained"),
      description: translate(
        "Sanskrit, transliteration, word-by-word meanings, translation and commentary by Swami Mukundananda, used with his permission.",
      ),
    },
    {
      icon: <Languages className="size-6" />,
      title: translate("Seven complete languages"),
      description: translate(
        "English, Hindi, Telugu, Tamil, Gujarati, Odia or Spanish. Switching changes the scripture itself, not only the menus.",
      ),
    },
    {
      icon: <Headphones className="size-6" />,
      title: translate("Sanskrit verse audio"),
      description: translate(
        "Hear the recitation of any verse, or open the listening screen when you would rather only listen.",
      ),
    },
    {
      icon: <WifiOff className="size-6" />,
      title: translate("Full offline reading"),
      description: translate(
        "All 18 chapters work with no connection. Audio, Gita GPT and the daily verse need internet.",
      ),
    },
    {
      icon: <PencilLine className="size-6" />,
      title: translate("Notes and progress"),
      description: translate(
        "Bookmark verses, highlight passages, keep your own notes. The app remembers where you stopped.",
      ),
    },
    {
      icon: <Sun className="size-6" />,
      title: translate("Built for daily reading"),
      description: translate(
        "A verse of the day on your home screen or as a notification, plus dark mode and text you can size the way you like.",
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
    [translate("Price"), translate("Free")],
    [translate("Ads"), translate("None, ever")],
    [translate("Platforms"), translate("Android and iPhone")],
    [translate("Scripture"), translate("18 chapters, 700 verses")],
    [
      translate("Languages"),
      translate("English, Hindi, Telugu, Tamil, Gujarati, Odia, Spanish"),
    ],
    [
      translate("Translation"),
      translate("Swami Mukundananda, used with permission"),
    ],
    [translate("Audio"), translate("Sanskrit recitation, every verse")],
    [translate("Offline"), translate("Full scripture text")],
    [translate("Account"), translate("Only for Gita GPT and saved progress")],
    [translate("Run by"), translate("Ved Vyas Foundation, a non-profit")],
  ];

  const stats = [
    { value: STORE_STATS.downloads, label: translate("downloads") },
    {
      value: STORE_STATS.ratingValue,
      label: translate("rating on Google Play"),
    },
    { value: "700", label: translate("verses") },
    { value: "7", label: translate("languages") },
  ];

  const gptQuestions = [
    translate("What does the Gita say about making a difficult choice?"),
    translate("How should I think about success and failure?"),
    translate("What does Krishna teach about doing my duty?"),
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
        <section className="relative overflow-hidden py-10 md:py-16 lg:py-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-prakash-primary/20 to-transparent dark:from-nisha-primary/20 dark:to-transparent" />

          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
              <div className="text-left">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-prakash-primary/10 px-4 py-1.5 dark:bg-nisha-primary/10">
                  <Sparkle className="size-4 text-prakash-primary dark:text-nisha-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-prakash-primary dark:text-nisha-primary">
                    {translate("Free forever. No ads. Non-profit.")}
                  </span>
                </div>

                {/* Emphasis comes from colour on the second clause rather than
                    from adding another type size. */}
                <h1 className="font-newsreader mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                  {translate("Bhagavad Gita App")}
                  <span className="block text-prakash-primary dark:text-nisha-primary">
                    {translate("Free, forever.")}
                  </span>
                </h1>

                {/* The single supporting paragraph. Self-contained so search
                    engines and AI assistants can lift it whole. */}
                <p className="font-merriweather mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {translate(
                    "Read all 700 verses, hear the Sanskrit recitation of any one of them, and ask Gita GPT the questions they raise. Free on Android and iPhone in seven languages, with Swami Mukundananda's translation and commentary, offline reading, and no ads.",
                  )}
                </p>

                <div className="flex justify-start">
                  <StoreButtons
                    label={translate("Download the Bhagavad Gita app on")}
                  />
                </div>

                {/* Social proof reads at body size so it does not compete with
                    the headline for attention. */}
                <dl className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="flex items-center gap-6">
                      {index > 0 && (
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full bg-prakash-primary/40 dark:bg-nisha-primary/40"
                        />
                      )}
                      <div>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="font-merriweather text-base">
                          <span className="font-bold text-foreground">
                            {stat.value}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {stat.label}
                          </span>
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Hero artwork. The store creative is already a finished piece,
                  so it sits on a soft bloom with no frame around it. */}
              <div className="relative mx-auto flex w-full max-w-[300px] items-center justify-center lg:max-w-[360px]">
                <div
                  aria-hidden
                  className="absolute size-[120%] rounded-full bg-prakash-primary/20 blur-3xl dark:bg-nisha-primary/20"
                />
                <Image
                  src="/images/app/verse-of-the-day.webp"
                  alt={translate(
                    "The Bhagavad Gita app home screen showing the verse of the day",
                  )}
                  width={810}
                  height={1440}
                  priority
                  sizes="(max-width: 1024px) 300px, 360px"
                  className="relative h-auto w-full rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pull quote */}
        <section className="bg-adhyayan-bg py-14 dark:bg-nisha-bg/50 md:py-16">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <p className="font-newsreader text-2xl font-bold leading-tight text-prakash-primary dark:text-nisha-primary md:text-4xl">
              {translate("Every verse. Every chapter. Free.")}
            </p>
          </div>
        </section>

        {/* Why it is free */}
        <section className="relative py-20 md:py-28">
          <div className="pointer-events-none absolute bottom-10 left-10 opacity-20">
            <VedicPattern variant="lotus" size={220} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle={translate("WHY IT COSTS NOTHING")}
              title={translate("Free means free")}
              align="center"
              className="mb-8"
            />
            <div className="font-merriweather mx-auto max-w-2xl space-y-5 text-center text-lg leading-relaxed text-muted-foreground">
              <p>
                {translate(
                  "Most scripture apps ask for something eventually. An ad between verses, a subscription prompt around chapter three, the commentary that turns out to be the paid one.",
                )}
              </p>
              <p>
                {translate(
                  "Ved Vyas Foundation runs this as a non-profit and funds it directly. There is nothing to upgrade to and nothing being sold.",
                )}
              </p>
            </div>

            <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[
                translate("No ads"),
                translate("No subscription"),
                translate("No in-app purchases"),
              ].map((item) => (
                <li
                  key={item}
                  className="font-merriweather rounded-2xl border bg-card p-6 text-center text-lg font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="relative bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="pointer-events-none absolute right-10 top-10 opacity-20">
            <VedicPattern variant="mandala" size={280} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeader
              subtitle={translate("WHAT IS INSIDE")}
              title={translate("Everything the app does")}
              align="center"
              className="mb-12"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="h-full">
                  <CardContent className="p-7">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                      {feature.icon}
                    </div>
                    <h3 className="font-newsreader mb-3 text-xl font-bold leading-snug md:text-2xl">
                      {feature.title}
                    </h3>
                    <p className="font-merriweather text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gita GPT */}
        <section className="relative py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <SectionHeader
                  subtitle={translate("GITA GPT")}
                  title={translate("Ask in your own words")}
                  align="left"
                  className="mb-6"
                />
                <div className="font-merriweather max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    {translate(
                      "Gita GPT answers from the Bhagavad Gita and shows you the verses behind the answer. We were among the first to build an AI trained on the Gita.",
                    )}
                  </p>
                  <p>
                    {translate(
                      "It is a study aid rather than a replacement for reading. The verses are still the point.",
                    )}
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {gptQuestions.map((question) => (
                    <li
                      key={question}
                      className="font-merriweather rounded-xl border bg-card px-5 py-4 text-base text-foreground/90"
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-1 mx-auto w-full max-w-[280px] md:order-2 md:max-w-[340px]">
                <Image
                  src="/images/app/gita-gpt.webp"
                  alt={translate(
                    "Gita GPT explaining detachment with reference to the Bhagavad Gita",
                  )}
                  width={810}
                  height={1440}
                  loading="lazy"
                  sizes="(max-width: 768px) 280px, 340px"
                  className="h-auto w-full rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

        <FloralDivider />

        {/* Screenshots */}
        <section className="relative py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeader
              subtitle={translate("SCREENSHOTS")}
              title={translate("Inside the app")}
              align="center"
              className="mb-12"
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
        <section className="relative bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle={translate("AT A GLANCE")}
              title={translate("Bhagavad Gita app details")}
              align="center"
              className="mb-10"
            />
            <Card>
              <CardContent className="p-0">
                <dl>
                  {facts.map(([label, value], index) => (
                    <div
                      key={label}
                      className={`flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6 ${
                        index !== facts.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <dt className="font-merriweather w-full text-base font-semibold uppercase tracking-wide text-prakash-primary dark:text-nisha-primary sm:w-64 sm:shrink-0">
                        {label}
                      </dt>
                      <dd className="font-merriweather text-base text-foreground/90">
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
        <section className="relative py-20 md:py-28">
          <div className="pointer-events-none absolute bottom-10 right-10 opacity-20">
            <VedicPattern variant="om" size={220} opacity={0.5} />
          </div>
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle={translate("FAQ")}
              title={translate("Common questions")}
              align="center"
              className="mb-10"
            />
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border bg-card px-6 py-5"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 marker:content-none">
                    <h3 className="font-newsreader text-xl font-semibold leading-snug md:text-2xl">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-xl leading-none text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="font-merriweather mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-newsreader mb-4 text-3xl font-bold leading-tight md:text-5xl">
              {translate("Keep the Gita close")}
            </h2>
            <p className="font-merriweather mb-9 text-lg text-muted-foreground md:text-xl">
              {translate(
                "Free on Android and iPhone. Nothing to unlock, nothing to pay.",
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
