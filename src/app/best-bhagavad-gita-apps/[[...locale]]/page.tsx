import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isValidLocaleSegment } from "shared/functions";

import {
  ALSO_CONSIDERED,
  type App,
  APPS,
  CATEGORY_WINNERS,
  FAQS,
  getJsonLd,
  STOREFRONT,
  VERIFIED_ON_LABEL,
} from "./constants";

import { SectionHeader } from "@/components/ui/section-header";

// Static, so every word is in the HTML before any JavaScript runs. Comparison
// pages are read by AI assistants far more than they are read by people, and
// most of those crawlers do not execute JavaScript.
export const dynamic = "force-static";

// English only, on purpose. A Hindi URL carrying English app descriptions is a
// thin duplicate, so /best-bhagavad-gita-apps/hi returns 404 rather than
// existing as a worse copy of this page.
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: [] as string[] }, { locale: ["en"] }];
}

const URL = "https://bhagavadgita.com/best-bhagavad-gita-apps";

export const metadata: Metadata = {
  title: "The Best Bhagavad Gita Apps in 2026, Compared and Checked",
  description:
    "Every major Bhagavad Gita app compared on price, advertising, languages and who translated the text. Ratings taken from the stores' own data and checked on 20 July 2026.",
  alternates: { canonical: URL },
  openGraph: {
    title: "The Best Bhagavad Gita Apps, Compared",
    description:
      "Price, advertising, languages and translator for every major Bhagavad Gita app, with each figure checked against the stores.",
    url: URL,
    siteName: "Bhagavad Gita",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best Bhagavad Gita Apps, Compared",
    description:
      "Price, advertising, languages and translator for every major Bhagavad Gita app.",
  },
};

/** Shown wherever one of our own apps appears, never only once at the bottom. */
function OursTag({ kind }: { kind: NonNullable<App["ours"]> }) {
  return (
    <span className="ml-2 inline-block whitespace-nowrap rounded-full border border-prakash-primary/40 px-2 py-0.5 align-middle text-xs font-semibold uppercase tracking-wide text-prakash-primary dark:border-nisha-primary/40 dark:text-nisha-primary">
      {kind === "published" ? "Our app" : "Built by us"}
    </span>
  );
}

function AppEntry({ app, position }: { app: App; position: number }) {
  return (
    <article className="border-t border-border/60 py-12 first:border-t-0 first:pt-0">
      <h2
        id={app.slug}
        className="font-newsreader scroll-mt-24 text-2xl font-bold tracking-tight md:text-3xl"
      >
        {position}. {app.name}
        {app.ours ? <OursTag kind={app.ours} /> : null}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        By {app.developer}
        {app.rating && app.ratingCount
          ? ` · ${app.rating} from ${app.ratingCount} ratings`
          : ""}
        {app.installs ? ` · ${app.installs} installs` : ""}
      </p>

      <p className="font-merriweather mt-5 max-w-2xl text-lg leading-relaxed">
        {app.verdict}
      </p>

      <dl className="font-merriweather mt-6 max-w-2xl space-y-2 text-base leading-relaxed text-muted-foreground">
        <div>
          <dt className="inline font-semibold text-foreground">Get it if: </dt>
          <dd className="inline">{app.forWhom}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-foreground">Skip it if: </dt>
          <dd className="inline">{app.notForWhom}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-foreground">Price: </dt>
          <dd className="inline">
            {app.price}. {app.ads === "None" ? "No advertising." : app.ads}
          </dd>
        </div>
        <div>
          <dt className="inline font-semibold text-foreground">
            Whose translation:{" "}
          </dt>
          <dd className="inline">{app.attribution}</dd>
        </div>
      </dl>

      <div className="mt-6 grid max-w-2xl gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-prakash-primary dark:text-nisha-primary">
            What works
          </h3>
          <ul className="font-merriweather mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            {app.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            What does not
          </h3>
          <ul className="font-merriweather mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
            {app.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-base">
        {app.playUrl && (
          <a
            href={app.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-prakash-primary underline underline-offset-4 dark:text-nisha-primary"
          >
            View on Google Play
          </a>
        )}
        {app.iosUrl && (
          <a
            href={app.iosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-prakash-primary underline underline-offset-4 dark:text-nisha-primary"
          >
            View on the App Store
          </a>
        )}
      </div>
    </article>
  );
}

export default async function BestBhagavadGitaApps(props: ParamsWithLocale) {
  const params = await props.params;
  if (!isValidLocaleSegment(params)) notFound();

  return (
    <>
      {getJsonLd().map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="relative min-h-screen bg-prakash-bg font-crimson dark:bg-nisha-bg">
        {/* Hero. Three text levels only: the date badge, the heading, and one
            self-contained answer paragraph that an AI assistant can lift whole. */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-prakash-primary/20 to-transparent dark:from-nisha-primary/20" />
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-6 inline-flex items-center rounded-full bg-prakash-primary/10 px-4 py-1.5 dark:bg-nisha-primary/10">
              <span className="text-sm font-semibold uppercase tracking-wide text-prakash-primary dark:text-nisha-primary">
                Every figure checked {VERIFIED_ON_LABEL}
              </span>
            </div>

            <h1 className="font-newsreader mb-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              The best Bhagavad Gita apps,
              <span className="block text-prakash-primary dark:text-nisha-primary">
                compared honestly.
              </span>
            </h1>

            <p className="font-merriweather max-w-2xl text-lg leading-relaxed text-muted-foreground">
              For most people the answer is our own app, which is free, carries
              no advertising, and covers all 700 verses in seven languages. If
              you want a wider devotional practice, Krishna Bhakti is the better
              app and the highest rated here. If you want Prabhupada&rsquo;s
              translation, buy the Bhaktivedanta Book Trust edition. Hindi,
              Bangla, Telugu and Odia readers have stronger options still, and
              they are all below.
            </p>
          </div>
        </section>

        {/* Disclosure. This sits above every comparative claim on the page, not
            beneath it. The category ordering below is defensible only on that
            condition, because two of the winners are apps we publish. */}
        <section className="border-y border-prakash-primary/20 bg-adhyayan-bg py-10 dark:border-nisha-primary/20 dark:bg-nisha-bg/50">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-newsreader text-xl font-bold">
              Read this first
            </h2>
            <p className="font-merriweather mt-3 text-base leading-relaxed text-muted-foreground">
              We are not a neutral reviewer. Ved Vyas Foundation publishes the
              first app on this list. We also built and maintain Krishna Bhakti
              for JKYog, a separate registered organisation. A third app here,
              JKYog India&rsquo;s Song of God, comes from that same organisation
              but was built by a different team. Every one of those is marked
              wherever it appears. Nobody paid for a place on this page, there
              are no affiliate links, and the store figures below are the
              stores&rsquo; own numbers, which you can check yourself in one
              click.
            </p>
          </div>
        </section>

        {/* Category winners */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <SectionHeader
              subtitle="Quick answers"
              title="The best app for each kind of reader"
              description="Ordered by what a reader is most likely to want, not by whose app it is."
            />
            <ul className="font-merriweather space-y-6">
              {CATEGORY_WINNERS.map((c) => (
                <li key={c.category}>
                  <h3 className="font-newsreader text-lg font-bold md:text-xl">
                    {c.category}: {c.winner}
                    {c.ours ? <OursTag kind={c.ours} /> : null}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {c.why}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparison table. A real HTML table, scrollable inside its own box so
            the page never scrolls sideways. Columns carry evidence, not ticks. */}
        <section className="bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="container mx-auto max-w-7xl px-4">
            <SectionHeader
              subtitle="Side by side"
              title="Every app compared"
              description={`Ratings and install counts come from each store's own structured data on ${STOREFRONT}, read on ${VERIFIED_ON_LABEL}. A rating without its storefront is not a fact: the same app scores 4.93 in India and 4.78 in the United States off an identical set of ratings.`}
            />
            <div className="overflow-x-auto rounded-xl border bg-card">
              <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Bhagavad Gita apps compared on rating, price, advertising,
                  languages and translator
                </caption>
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      App
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Rating
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Installs
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Ads
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Languages
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Whose translation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {APPS.map((app) => (
                    <tr key={app.slug} className="border-b last:border-b-0">
                      <th
                        scope="row"
                        className="px-4 py-3 align-top font-semibold"
                      >
                        <a
                          href={`#${app.slug}`}
                          className="underline underline-offset-4"
                        >
                          {app.name}
                        </a>
                        {app.ours ? <OursTag kind={app.ours} /> : null}
                      </th>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {app.rating
                          ? `${app.rating} (${app.ratingCount})`
                          : "Not published"}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {app.installs ?? "iOS only"}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {app.price}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {app.ads}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {app.languages}
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">
                        {app.attribution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-merriweather mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
              The table says something the rankings do not. The two most
              installed Gita apps in India name no translator at all, and one of
              them tells you in its own listing that it is assuming the text is
              out of copyright. Every app on this page that does name its source
              has a smaller audience than the ones that do not.
            </p>
          </div>
        </section>

        {/* Methodology, above the first ranked entry rather than buried at the
            end. Google asks review content to say how the comparison was done
            before it asks you to trust the result. */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader subtitle="Method" title="How we compared these" />
            <div className="font-merriweather space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                We searched Google Play across seven query variants covering
                English, Hindi and the phrasing people actually use, which
                surfaced 117 distinct apps. We kept the ones with either enough
                scale to matter or a purpose none of the others served, and
                dropped the rest.
              </p>
              <p>
                Every rating, review count, install band and price here was read
                from the stores&rsquo; own structured data rather than the
                rendered page, because the rendered Play listing mixes in
                ratings from its similar-apps carousel and reading those gave us
                a wrong number for our own app the first time round. Each figure
                was confirmed on {VERIFIED_ON_LABEL}.
              </p>
              <p>
                We have not run these apps side by side on a phone for a fixed
                set of tasks. What follows is a comparison of what each app
                offers, what it costs, and what it tells you about its own
                sources, not a hands-on bench test, and we would rather say that
                than imply testing we did not do. Where we could not verify
                something, the entry says so.
              </p>
              <p>
                We do not report any claim we could not evidence. There are apps
                here we suspect ship poorly proofed text, and we have left that
                out because suspecting is not knowing. What an app states on its
                own listing, we quote.
              </p>
            </div>
          </div>
        </section>

        {/* Ranked entries */}
        <section className="bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="container mx-auto max-w-4xl px-4">
            <SectionHeader
              subtitle="In detail"
              title="Every app, ranked"
              description="Ranked on how well each one serves the reader it is built for, weighing price, advertising, language coverage and whether it names its source."
            />
            {APPS.map((app, i) => (
              <AppEntry key={app.slug} app={app} position={i + 1} />
            ))}
          </div>
        </section>

        {/* The honest section. Unhedged, and about our own app. */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle="Ours"
              title="Where our own app falls short"
            />
            <ul className="font-merriweather space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <li>
                <strong className="text-foreground">
                  One commentator, not several.
                </strong>{" "}
                We ship Swami Mukundananda&rsquo;s translation and commentary
                and nothing else. That was an editorial decision rather than an
                oversight, but if you want to read Shankaracharya against
                Ramanuja against Madhvacharya, our app will not do it. Our
                website will, free.
              </li>
              <li>
                <strong className="text-foreground">
                  Banaka&rsquo;s Hindi app is far more popular than ours.
                </strong>{" "}
                It has 58,560 ratings against our 1,681. If you are a Hindi
                reader choosing by what other people chose, you would not choose
                us.
              </li>
              <li>
                <strong className="text-foreground">
                  Krishna Bhakti is rated higher and reviewed more.
                </strong>{" "}
                4.85 from 4,537 ratings, against our 4.9 from 1,681 on the
                Indian storefront. A rating from four thousand people carries
                more weight than the same rating from one thousand.
              </li>
              <li>
                <strong className="text-foreground">
                  The iPhone version lags the Android one.
                </strong>{" "}
                A new build is with Apple for review. We are not publishing an
                iOS rating until it ships, because the rating on the store today
                describes a version we are replacing.
              </li>
              <li>
                <strong className="text-foreground">
                  Gita GPT is limited and asks you to sign in.
                </strong>{" "}
                Ten messages a day, and you need an account. That is what a
                non-profit can afford to run without advertising.
              </li>
              <li>
                <strong className="text-foreground">
                  Only audio and the daily verse need a connection.
                </strong>{" "}
                The scripture reads offline, but if you want an app that works
                with no internet at all, Song of God is built for exactly that
                and ours is not.
              </li>
            </ul>
          </div>
        </section>

        {/* How to choose */}
        <section className="bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle="Choosing"
              title="Three questions worth answering first"
            />
            <div className="font-merriweather space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                <strong className="text-foreground">
                  Whose translation do you want to read?
                </strong>{" "}
                This matters more than any feature. The Gita has been rendered
                into English hundreds of times and the readings differ
                substantially. If an app will not tell you whose translation it
                is shipping, you cannot answer this question, and several of the
                most popular apps here will not tell you.
              </p>
              <p>
                <strong className="text-foreground">
                  Are you reading, listening, or studying?
                </strong>{" "}
                Reading apps, audio apps and course apps are genuinely different
                products that happen to share a title. An app built for one is
                usually mediocre at the others.
              </p>
              <p>
                <strong className="text-foreground">
                  What are you willing to pay with?
                </strong>{" "}
                Free apps here fall into three groups: funded by advertising,
                funded by a paid tier, or funded by an organisation that has
                decided not to charge. Knowing which one you are installing
                tells you what the app will ask of you later.
              </p>
            </div>
          </div>
        </section>

        {/* Also considered */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle="Excluded"
              title="Also considered, and why they are not ranked"
            />
            <ul className="font-merriweather space-y-6">
              {ALSO_CONSIDERED.map((a) => (
                <li key={a.name}>
                  <h3 className="font-newsreader text-lg font-bold">
                    {a.name}{" "}
                    <span className="text-base font-normal text-muted-foreground">
                      by {a.developer}
                    </span>
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                    {a.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ. Native details/summary, so every answer ships in the HTML. */}
        <section className="bg-adhyayan-bg py-20 dark:bg-nisha-bg/50 md:py-28">
          <div className="container mx-auto max-w-3xl px-4">
            <SectionHeader
              subtitle="FAQ"
              title="Common questions"
              align="center"
              className="mb-10"
            />
            <div className="space-y-3">
              {FAQS.map((faq) => (
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

        {/* Provenance */}
        <section className="py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="font-newsreader text-xl font-bold">
              Who wrote this, and when
            </h2>
            <p className="font-merriweather mt-3 text-base leading-relaxed text-muted-foreground">
              Written and maintained by the editorial team at Ved Vyas
              Foundation, the non-profit behind bhagavadgita.com. Every store
              figure on this page was last confirmed on {VERIFIED_ON_LABEL}. We
              re-check them on a schedule and correct anything that has moved.
              If something here is wrong, write to us at{" "}
              <a
                href="mailto:contact@bhagavadgita.io"
                className="underline underline-offset-4"
              >
                contact@bhagavadgita.io
              </a>{" "}
              and we will fix it and say that we did.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
