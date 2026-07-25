import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isValidLocaleSegment } from "shared/functions";

import { MDXBody } from "@/components/content/mdx";
import { findByUrl } from "@/lib/content";
import { comparisonJsonLd } from "@/lib/content-jsonld";

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

const PATH = "/best-bhagavad-gita-apps";
const URL = `https://bhagavadgita.com${PATH}`;

export const metadata: Metadata = {
  title: "The Best Bhagavad Gita Apps in 2026, Compared and Checked",
  description:
    "Every major Bhagavad Gita app compared on price, advertising, languages and who translated the text. Ratings taken from the stores' own data and checked on 25 July 2026.",
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

/**
 * The page is now a shell: the content, the figures and the section order all
 * live in content/best-bhagavad-gita-apps.mdx, and the blocks it composes live
 * in components/content/blocks.tsx (ROADMAP item 24).
 *
 * What this file still owns is the things a route owns — the URL, the metadata
 * and the structured data.
 */
export default async function Page({
  params: paramsPromise,
}: ParamsWithLocale) {
  const params = await paramsPromise;
  if (!isValidLocaleSegment(params)) notFound();

  const doc = findByUrl(PATH);
  if (!doc) notFound();

  const verifiedLabel = doc.verifiedOn
    ? new Date(`${doc.verifiedOn.slice(0, 10)}T00:00:00Z`).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
      )
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonJsonLd(doc, URL)),
        }}
      />

      <article className="bg-prakash-bg dark:bg-nisha-bg">
        {/* Hero. Three levels only: the verification badge, the heading, and one
            self-contained answer paragraph an AI assistant can lift whole. */}
        <header className="relative overflow-hidden py-16 md:py-24">
          <div className="from-prakash-primary/20 dark:from-nisha-primary/20 absolute inset-0 -z-10 bg-linear-to-b to-transparent" />
          <div className="container mx-auto max-w-3xl px-4">
            {verifiedLabel ? (
              <p className="bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary mb-6 inline-flex rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide uppercase">
                Every figure checked {verifiedLabel}
              </p>
            ) : null}
            <h1 className="font-crimson mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
              {doc.heading ?? doc.title}
            </h1>
            {doc.standfirst ? (
              <p className="text-muted-foreground text-lg leading-relaxed">
                {doc.standfirst}
              </p>
            ) : null}
          </div>
        </header>

        {/* One reading column for the whole page. The blocks that need to be
            wider, the table in particular, scroll inside themselves rather than
            breaking out of it. */}
        <div className="container mx-auto max-w-3xl px-4 pb-20">
          <MDXBody doc={doc} />
        </div>
      </article>
    </>
  );
}
