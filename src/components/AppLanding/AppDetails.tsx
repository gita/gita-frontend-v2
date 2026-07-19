import { BookMarked, Check, ExternalLink, History } from "lucide-react";
import Link from "next/link";

import type { AppLandingCopy } from "./content";
import { GOOGLE_PLAY_URL } from "./content";
import { SectionHeading } from "./SectionHeading";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function AppDetails({ copy }: { copy: AppLandingCopy }) {
  return (
    <>
      <section
        id="app-facts"
        className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-10 lg:py-24"
      >
        <SectionHeading
          eyebrow={copy.facts.eyebrow}
          title={copy.facts.title}
          description={copy.facts.intro}
        />
        <div>
          <dl className="overflow-hidden rounded-2xl border border-border/80 bg-card/70 shadow-sm">
            {copy.facts.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-border/70 px-5 py-4 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                <dt className="ui-label text-lg font-semibold text-foreground">
                  {row.label}
                </dt>
                <dd className="text-lg leading-8 text-foreground/75">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="ui-label mt-5 text-base leading-7 text-foreground/75">
            {copy.facts.sourceNote}{" "}
            <Link
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4"
            >
              {copy.facts.sourceLink}
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={copy.sources.eyebrow}
            title={copy.sources.title}
            description={copy.sources.description}
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              {
                label: copy.sources.translationsLabel,
                text: copy.sources.translations,
              },
              {
                label: copy.sources.commentariesLabel,
                text: copy.sources.commentaries,
              },
            ].map((source) => (
              <Card key={source.label} className="border-border/80 shadow-sm">
                <CardContent className="p-6 sm:p-7">
                  <Badge className="ui-label mb-4 rounded-full border border-primary/40 bg-primary/10 text-foreground hover:bg-primary/10">
                    <BookMarked className="mr-1 size-4" aria-hidden="true" />
                    {source.label}
                  </Badge>
                  <p className="text-lg leading-8 text-foreground/75">
                    {source.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex gap-5 rounded-2xl border border-border bg-secondary/45 p-6 dark:bg-accent/60 sm:p-8">
            <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <History className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">
                {copy.sources.historyTitle}
              </h3>
              <p className="mt-3 max-w-4xl text-lg leading-8 text-foreground/75">
                {copy.sources.historyText}
              </p>
              <p className="ui-label mt-5 flex items-center gap-2 text-base font-medium text-foreground">
                <Check className="size-4 text-primary" aria-hidden="true" />
                <span translate="no">bhagavadgita.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
