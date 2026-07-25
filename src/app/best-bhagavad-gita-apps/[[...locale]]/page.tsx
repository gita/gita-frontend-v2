import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isValidLocaleSegment } from "shared/functions";

import { Breadcrumb } from "@/components/content/blocks";
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

  // Three different dates, each meaning something different. Published is when
  // the page appeared, updated is when the words last changed, and verifiedOn
  // is when the figures were last re-pulled from the stores — which is the one
  // that actually matters on a page made of store numbers.
  const fmt = (iso?: string) =>
    iso
      ? new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : null;
  const publishedLabel = fmt(doc.published);
  const updatedLabel = fmt(doc.updated);
  const verifiedLabel = fmt(doc.verifiedOn);

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
        {/* Asymmetric padding on purpose: the header owns the space above it,
            and the first block in the MDX body brings its own margin below.
            Equal padding on both sides left a visible hole under the standfirst. */}
        <header className="relative overflow-hidden pt-16 pb-2 md:pt-24 md:pb-4">
          <div className="from-prakash-primary/20 dark:from-nisha-primary/20 absolute inset-0 -z-10 bg-linear-to-b to-transparent" />
          <div className="container mx-auto max-w-[44rem] px-4">
            <Breadcrumb title="Best Bhagavad Gita apps" />
            {/* An eyebrow, not a badge. The filled terracotta pill this replaces
                was the loudest element above the fold and competed with the
                headline for first read; set in gold at 12px it labels the page
                without arguing with it. */}
            {verifiedLabel ? (
              <p className="text-gold-ink mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
                Every figure checked {verifiedLabel}
              </p>
            ) : null}
            <h1 className="font-crimson mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
              {doc.heading ?? doc.title}
            </h1>
            {doc.standfirst ? (
              <p className="text-foreground/85 text-lg leading-relaxed">
                {doc.standfirst}
              </p>
            ) : null}

            {/* Who wrote this, and when. No invented staff byline: the page is
                genuinely organisation-authored and saying so is the honest
                version of the credential the surveyed pages carry. */}
            <p className="text-foreground/60 mt-6 text-sm">
              By the{" "}
              <Link href="/about" className="underline underline-offset-4">
                Ved Vyas Foundation
              </Link>
              , who publish bhagavadgita.com
              {publishedLabel ? ` · Published ${publishedLabel}` : ""}
              {updatedLabel ? ` · Updated ${updatedLabel}` : ""}
            </p>
          </div>
        </header>

        {/* One reading column for the whole page. The blocks that need to be
            wider, the table in particular, scroll inside themselves rather than
            breaking out of it. */}
        <div className="container mx-auto max-w-[44rem] px-4 pb-20">
          <MDXBody doc={doc} />
        </div>
      </article>
    </>
  );
}
