import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import type { AppLandingCopy } from "./content";
import { StoreButtons } from "./StoreButtons";

import { Badge } from "@/components/ui/badge";

export function AppHero({ copy }: { copy: AppLandingCopy }) {
  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-background">
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-secondary/55 dark:bg-accent/60 lg:block" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-24">
        <div>
          <Badge className="ui-label mb-6 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-base text-foreground hover:bg-primary/10">
            <CheckCircle2 className="mr-1 size-4" aria-hidden="true" />
            {copy.badge}
          </Badge>
          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-7 max-w-2xl border-l-4 border-primary pl-5 text-xl font-medium leading-9 text-foreground sm:text-2xl sm:leading-10">
            {copy.answer}
          </p>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-foreground/75">
            {copy.supportingText}
          </p>
          <StoreButtons labels={copy.storeLabels} className="mt-8" />
        </div>

        <div className="relative mx-auto w-full max-w-[390px]">
          <div className="absolute -inset-5 hidden translate-x-4 translate-y-4 rounded-[2rem] border-2 border-primary/25 bg-primary/10 sm:block" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl">
            <Image
              src={copy.screenshots.items[0].src}
              alt={copy.screenshots.items[0].alt}
              width={1080}
              height={1920}
              sizes="(max-width: 640px) 88vw, 390px"
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative border-t border-border/70 bg-secondary/45 dark:bg-accent/60">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
          {copy.proof.map((item) => (
            <div
              key={item.label}
              className="border-border/70 px-4 py-7 text-center even:border-l lg:border-l lg:first:border-l-0"
            >
              <dt className="ui-label text-base text-foreground/75">
                {item.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold tabular-nums text-primary">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
