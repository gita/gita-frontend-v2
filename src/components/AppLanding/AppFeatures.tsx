import {
  Bookmark,
  BookOpenText,
  Headphones,
  Languages,
  Sparkles,
  WifiOff,
} from "lucide-react";
import Image from "next/image";

import type { AppLandingCopy } from "./content";
import { SectionHeading } from "./SectionHeading";

import { Card, CardContent } from "@/components/ui/card";

const icons = {
  book: BookOpenText,
  headphones: Headphones,
  sparkles: Sparkles,
  bookmark: Bookmark,
  wifi: WifiOff,
  languages: Languages,
};

export function AppFeatures({ copy }: { copy: AppLandingCopy }) {
  return (
    <>
      <section
        id="features"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
      >
        <SectionHeading
          eyebrow={copy.features.eyebrow}
          title={copy.features.title}
          description={copy.features.description}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {copy.features.items.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <Card
                key={feature.title}
                className="border-border/80 bg-card shadow-sm transition-colors hover:border-primary/40"
              >
                <CardContent className="flex gap-5 p-6 sm:p-8">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold leading-8 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-lg leading-8 text-foreground/75">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section
        id="screenshots"
        className="scroll-mt-24 border-y border-border/70 bg-secondary/35 py-20 dark:bg-accent/50 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow={copy.screenshots.eyebrow}
            title={copy.screenshots.title}
            description={copy.screenshots.description}
            centered
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {copy.screenshots.items.map((screenshot) => (
              <figure key={screenshot.src} className="mx-auto w-full max-w-sm">
                <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={1080}
                    height={1920}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="ui-label mt-5 text-center text-lg font-semibold text-foreground">
                  {screenshot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
