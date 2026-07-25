import { ArrowRight, Sparkle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImageUrl?: string;
  locale?: string;
}

export function PageHero({
  badge,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImageUrl,
  locale = "en",
}: PageHeroProps) {
  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  const hasButtons = primaryButtonText || secondaryButtonText;

  return (
    <section className="relative overflow-hidden py-8 md:py-12 lg:py-16">
      <div className="from-prakash-primary/20 dark:from-nisha-primary/20 absolute inset-0 -z-10 bg-linear-to-b to-transparent dark:to-transparent"></div>
      {backgroundImageUrl && (
        <div
          className="absolute top-0 left-0 -z-20 size-full bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>
      )}

      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="bg-prakash-primary/10 dark:bg-nisha-primary/10 mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1">
              <Sparkle className="text-prakash-primary dark:text-nisha-primary size-4" />
              <span className="text-prakash-primary dark:text-nisha-primary text-sm font-medium">
                {badge}
              </span>
            </div>
          )}

          <h1 className="font-newsreader mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p
            className={`font-merriweather text-muted-foreground text-lg md:text-xl ${hasButtons ? "mb-6" : ""}`}
          >
            {subtitle}
          </p>

          {hasButtons && (
            <div className="flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
              {primaryButtonText && primaryButtonLink && (
                <Button
                  asChild
                  size="lg"
                  className="bg-prakash-primary hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90 w-full text-white sm:w-auto"
                >
                  <Link href={localizedLink(primaryButtonLink)}>
                    {primaryButtonText} <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              )}

              {secondaryButtonText && secondaryButtonLink && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link href={localizedLink(secondaryButtonLink)}>
                    {secondaryButtonText} <ArrowRight className="ml-1 size-4" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
