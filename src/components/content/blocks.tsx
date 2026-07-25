import Link from "next/link";

import type { ContentDoc } from "@/lib/content";
import { tableOfContents } from "@/lib/content-toc";

/**
 * Block vocabulary for MDX content pages (ROADMAP item 24).
 *
 * The first version of /best-bhagavad-gita-apps was hand-written TSX and every
 * section came out as the same thing: a heading, then paragraphs, at the same
 * weight and the same colour all the way down. Twelve app entries rendered as
 * twelve indistinguishable slabs, so nothing could be found by scanning.
 *
 * These blocks give the page a small set of shapes that mean something —
 * a ranked card, a rating, a disclosure, a table — so structure carries
 * information rather than decorating it.
 *
 * Type scale follows the measurements in docs/ui-reference-analysis.md:
 * bible.com sets scripture at 18px/36px in a 480px column, and sets its own
 * chapter headings at body size so the furniture never competes with the text.
 * Section headings here are deliberately quiet for the same reason.
 */

type App = ContentDoc["apps"][number];

/* ---------------------------------------------------------------- primitives */

/** Section heading. Small, letter-spaced eyebrow over a restrained title. */
export function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="text-prakash-primary dark:text-nisha-primary mb-2 text-xs font-semibold tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-crimson text-2xl font-bold tracking-tight md:text-3xl"
      >
        {title}
      </h2>
    </div>
  );
}

/**
 * Our-app disclosure. Deliberately not styled as a warning: it is a statement
 * of interest, and dressing it as an alert would read as either boasting or
 * apologising. It repeats at every point of claim rather than once at the top.
 */
export function OursTag({ ours }: { ours?: App["ours"] }) {
  if (!ours) return null;
  const label = ours === "published" ? "Our app" : "We built this";
  return (
    <span className="border-prakash-primary/40 text-prakash-primary dark:border-nisha-primary/40 dark:text-nisha-primary ml-2 shrink-0 rounded-full border px-2 py-0.5 align-middle text-[11px] font-semibold tracking-wide">
      {label}
    </span>
  );
}

/**
 * A store rating as a number plus a proportional bar.
 *
 * The bar is scaled across 3.5 to 5.0 rather than 0 to 5. Store ratings almost
 * never fall below 3.5, so a 0-5 bar renders every app as a near-full bar and
 * communicates nothing. The count sits alongside because 4.9 from 1,688 and
 * 4.9 from 44 are not the same claim.
 */
export function Rating({
  rating,
  count,
  storefront,
}: {
  rating?: string;
  count?: string;
  storefront?: string;
}) {
  if (!rating) return null;
  const value = Number(rating);
  const pct = Math.max(0, Math.min(100, ((value - 3.5) / 1.5) * 100));
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-crimson text-lg leading-none font-bold tabular-nums">
        {rating}
      </span>
      <span
        className="bg-border h-1.5 w-16 overflow-hidden rounded-full"
        role="img"
        aria-label={`${rating} out of 5${count ? ` from ${count} ratings` : ""}${storefront ? ` on ${storefront}` : ""}`}
      >
        <span
          className="bg-prakash-primary dark:bg-nisha-primary block h-full rounded-full"
          style={{ width: `${pct}%` }}
        />
      </span>
      {count ? (
        <span className="text-muted-foreground text-sm tabular-nums">
          {count} ratings
        </span>
      ) : null}
    </div>
  );
}

/** Store links, rendered as buttons so they are findable and 44px tall. */
function StoreLinks({ app }: { app: App }) {
  const base =
    "inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors";
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {app.playUrl ? (
        <a
          href={app.playUrl}
          rel="nofollow noopener noreferrer"
          target="_blank"
          data-analytics={`compare-play-${app.slug}`}
          className={`${base} bg-prakash-primary dark:bg-nisha-primary text-white`}
        >
          Google Play
        </a>
      ) : null}
      {app.iosUrl ? (
        <a
          href={app.iosUrl}
          rel="nofollow noopener noreferrer"
          target="_blank"
          data-analytics={`compare-ios-${app.slug}`}
          className={`${base} border-border hover:bg-accent border`}
        >
          App Store
        </a>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- blocks */

/**
 * Breadcrumb. The BreadcrumbList schema already existed but nothing rendered,
 * so the trail was visible to crawlers and invisible to readers.
 */
export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="text-foreground/60 flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            href="/"
            className="hover:text-foreground underline-offset-4 hover:underline"
          >
            Home
          </Link>
        </li>
        <li aria-hidden className="text-foreground/40">
          /
        </li>
        <li className="text-foreground/80" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Section index with jump links.
 *
 * Derived from the MDX source, so it stays in step with the page. Not sticky:
 * only 2 of the 6 top-ranking comparison pages surveyed use a floating one, and
 * a persistent rail costs more on a phone than it returns.
 *
 * The real reason this earns its place is extraction. Stable anchors plus a
 * visible index is how an answer engine cites a *section* of a page rather than
 * the whole undifferentiated thing.
 */
export function TableOfContents({ doc }: { doc: ContentDoc }) {
  const entries = tableOfContents(doc);
  if (entries.length < 3) return null;
  return (
    <nav
      aria-labelledby="toc-heading"
      className="border-border bg-adhyayan-bg/50 dark:bg-nisha-bg/40 my-10 rounded-2xl border p-6"
    >
      <p
        id="toc-heading"
        className="text-foreground/60 mb-3 text-xs font-semibold tracking-[0.16em] uppercase"
      >
        On this page
      </p>
      <ol className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {entries.map((e, i) => (
          <li key={e.id} className="flex gap-2 text-sm leading-snug">
            <span className="text-foreground/40 tabular-nums" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${e.id}`}
              className="text-foreground/85 hover:text-prakash-primary dark:hover:text-nisha-primary underline-offset-4 hover:underline"
            >
              {e.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Freeform note. `disclosure` is the conflict-of-interest variant. */
export function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: "note" | "disclosure";
  title?: string;
  children: React.ReactNode;
}) {
  const tone =
    variant === "disclosure"
      ? "border-prakash-primary/30 bg-prakash-primary/5 dark:border-nisha-primary/30 dark:bg-nisha-primary/10"
      : "border-border bg-adhyayan-bg/60 dark:bg-nisha-bg/40";
  return (
    <aside className={`my-10 rounded-2xl border p-6 md:p-7 ${tone}`}>
      {title ? (
        <p className="font-crimson mb-2 text-lg font-bold">{title}</p>
      ) : null}
      <div className="text-muted-foreground [&>p]:mt-0 [&>p]:leading-relaxed [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}

/** "Best for X" picks as a two-column list. */
export function CategoryWinners({ doc }: { doc: ContentDoc }) {
  if (!doc.categoryWinners.length) return null;
  return (
    <section className="my-14">
      <SectionHeading
        eyebrow="At a glance"
        title="Best for each thing"
        id="best-for-each-thing"
      />
      <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {doc.categoryWinners.map((c) => (
          <div key={c.category} className="border-border border-t pt-4">
            <dt className="text-muted-foreground text-xs font-semibold tracking-[0.14em] uppercase">
              {c.category}
            </dt>
            <dd className="mt-1.5">
              <p className="font-crimson leading-snug font-bold">
                {c.winner}
                <OursTag ours={c.ours} />
              </p>
              <p className="text-foreground/75 mt-1 text-sm leading-relaxed">
                {c.why}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/**
 * The full comparison grid.
 *
 * Six columns do not fit a reading column, so on wide screens the table breaks
 * out past it rather than living permanently inside a scroller. Below that it
 * scrolls inside its own container, which is the only honest option on a phone
 * and keeps the page body from scrolling sideways. The first column is sticky
 * so a row stays identifiable once you have scrolled past the name.
 */
export function ComparisonTable({ doc }: { doc: ContentDoc }) {
  if (!doc.apps.length) return null;
  const cols = [
    [
      "Rating",
      (a: App) =>
        a.rating ? `${a.rating} (${a.ratingCount})` : "Not verified",
    ],
    ["Installs", (a: App) => a.installs ?? "Not stated"],
    ["Price", (a: App) => a.price],
    ["Ads", (a: App) => a.ads],
    ["Languages", (a: App) => a.languages],
    ["Whose translation", (a: App) => a.attribution],
  ] as const;

  return (
    <section className="my-14 lg:-mx-20 xl:-mx-40">
      <SectionHeading
        eyebrow="Side by side"
        title="Every app, compared"
        id="every-app-compared"
      />
      <div className="border-border overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <caption className="sr-only">
            Bhagavad Gita apps compared on rating, installs, price, advertising,
            languages and attribution. Ratings from {doc.storefront}.
          </caption>
          <thead>
            <tr className="bg-adhyayan-bg dark:bg-nisha-bg/60">
              <th
                scope="col"
                className="bg-adhyayan-bg dark:bg-nisha-bg/60 sticky left-0 px-4 py-3 text-left font-semibold"
              >
                App
              </th>
              {cols.map(([label]) => (
                <th
                  key={label}
                  scope="col"
                  className="px-4 py-3 text-left font-semibold"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doc.apps.map((a) => (
              <tr key={a.slug} className="border-border border-t align-top">
                <th
                  scope="row"
                  className="bg-prakash-bg dark:bg-nisha-bg sticky left-0 px-4 py-3 text-left font-semibold"
                >
                  {a.name}
                  <OursTag ours={a.ours} />
                  <span className="text-muted-foreground block text-xs font-normal">
                    {a.developer}
                  </span>
                </th>
                {cols.map(([label, get]) => (
                  <td key={label} className="text-foreground/75 px-4 py-3">
                    {get(a)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-foreground/70 mt-3 text-sm">
        Ratings from {doc.storefront}, read from the stores&rsquo; own
        structured data. Play shows one decimal; these are its underlying value
        to two.
      </p>
    </section>
  );
}

/** The ranked entries, as cards with a rank, a rating and two-column pros/cons. */
export function RankedApps({ doc }: { doc: ContentDoc }) {
  if (!doc.apps.length) return null;
  return (
    <section className="my-14">
      <SectionHeading
        eyebrow="In order"
        title="The apps, ranked"
        id="the-apps-ranked"
      />
      <ol className="space-y-6">
        {doc.apps.map((a, i) => (
          <li
            key={a.slug}
            id={a.slug}
            className="border-border bg-card scroll-mt-24 rounded-2xl border p-6 md:p-8"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="font-crimson text-muted-foreground/60 text-2xl font-bold tabular-nums"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="font-crimson text-xl leading-tight font-bold md:text-2xl">
                  {a.name}
                  <OursTag ours={a.ours} />
                </h3>
                <p className="text-foreground/70 mt-0.5 text-sm">
                  By {a.developer}
                  {a.installs ? ` · ${a.installs} installs` : ""}
                </p>
              </div>
            </div>

            {a.rating ? (
              <div className="mt-4">
                <Rating
                  rating={a.rating}
                  count={a.ratingCount}
                  storefront={doc.storefront}
                />
              </div>
            ) : null}

            <p className="mt-4 leading-relaxed">{a.verdict}</p>

            <dl className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {(
                [
                  ["Get it if", a.forWhom],
                  ["Skip it if", a.notForWhom],
                  ["Price", a.price],
                  ["Ads", a.ads],
                  ["Languages", a.languages],
                  ["Whose translation", a.attribution],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="shrink-0 font-semibold">{k}:</dt>
                  <dd className="text-foreground/75">{v}</dd>
                </div>
              ))}
            </dl>

            {a.pros.length || a.cons.length ? (
              <div className="border-border mt-5 grid gap-6 border-t pt-5 sm:grid-cols-2">
                {(
                  [
                    ["What works", a.pros],
                    ["What does not", a.cons],
                  ] as const
                ).map(([label, items]) =>
                  items.length ? (
                    <div key={label}>
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.14em] uppercase">
                        {label}
                      </p>
                      <ul className="space-y-1.5 text-sm leading-relaxed">
                        {items.map((t) => (
                          <li key={t} className="flex gap-2">
                            <span
                              className="text-muted-foreground/60 mt-[0.45em] size-1 shrink-0 rounded-full bg-current"
                              aria-hidden
                            />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null,
                )}
              </div>
            ) : null}

            <StoreLinks app={a} />
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Apps kept off the ranked list, each with the reason stated. */
export function AlsoConsidered({ doc }: { doc: ContentDoc }) {
  if (!doc.alsoConsidered.length) return null;
  return (
    <section className="my-14">
      <SectionHeading
        eyebrow="Excluded"
        title="Also considered, and why they are not ranked"
        id="also-considered"
      />
      <div className="divide-border border-border divide-y overflow-hidden rounded-2xl border">
        {doc.alsoConsidered.map((a) => (
          <div key={a.name} className="p-5 md:p-6">
            <p className="font-crimson font-bold">
              {a.name}{" "}
              <span className="text-muted-foreground text-sm font-normal">
                by {a.developer}
              </span>
            </p>
            <p className="text-foreground/75 mt-1.5 text-sm leading-relaxed">
              {a.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * FAQ. Answers stay in the DOM and visible rather than collapsed, so they can
 * be read without a tap and lifted by an answer engine.
 */
export function FaqBlock({ doc }: { doc: ContentDoc }) {
  if (!doc.faq.length) return null;
  return (
    <section className="my-14">
      <SectionHeading
        eyebrow="Questions"
        title="Frequently asked questions"
        id="faq"
      />
      <div className="divide-border border-border divide-y overflow-hidden rounded-2xl border">
        {doc.faq.map((f) => (
          <div key={f.question} className="p-5 md:p-6">
            <h3 className="font-crimson text-lg font-bold">{f.question}</h3>
            <p className="text-foreground/85 mt-2 leading-relaxed">
              {f.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** When the figures were checked, and how to check them yourself. */
export function Provenance({ doc }: { doc: ContentDoc }) {
  if (!doc.verifiedOn) return null;
  const label = new Date(
    `${doc.verifiedOn.slice(0, 10)}T00:00:00Z`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <section className="border-border text-foreground/75 my-14 border-t pt-8 text-sm leading-relaxed">
      <p>
        Every rating, review count and install figure on this page was read from
        Google Play&rsquo;s and Apple&rsquo;s own structured data on{" "}
        <strong className="text-foreground">{label}</strong>, not from the
        rendered store page. Ratings differ by storefront; ours are{" "}
        {doc.storefront}. Store figures move, so if a number here disagrees with
        what you see, the store is right and we are out of date —{" "}
        <Link href="/contact" className="underline underline-offset-4">
          tell us
        </Link>{" "}
        and we will re-check.
      </p>
    </section>
  );
}
