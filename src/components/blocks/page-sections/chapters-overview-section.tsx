"use client";

import { BookOpen, Brain, Heart } from "lucide-react";
import Link from "next/link";

import { ChapterGroupCard } from "../cards";

import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

interface ChaptersOverviewSectionProps {
  subtitle: string;
  title: string;
  description?: string;
  chapterGroups: {
    title: string;
    chapters: string;
    description: string;
    type: "karma" | "bhakti" | "jnana";
  }[];
  ctaText?: string;
  ctaLink?: string;
  locale?: string;
  className?: string;
}

export function ChaptersOverviewSection({
  subtitle,
  title,
  description,
  chapterGroups,
  ctaText,
  ctaLink = "/",
  locale = "en",
  className = "",
}: ChaptersOverviewSectionProps) {
  const iconMap = {
    karma: <BookOpen className="size-6" />,
    bhakti: <Heart className="size-6" />,
    jnana: <Brain className="size-6" />,
  };

  const colorMap = {
    karma: "orange" as const,
    bhakti: "amber" as const,
    jnana: "yellow" as const,
  };

  const localizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path.startsWith("/") ? path : "/" + path}`;
  };

  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={<BookOpen className="size-5" />}
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {chapterGroups.map((group, index) => (
            <ChapterGroupCard
              key={index}
              title={group.title}
              chapters={group.chapters}
              description={group.description}
              icon={iconMap[group.type]}
              color={colorMap[group.type]}
              index={index}
            />
          ))}
        </div>

        {ctaText && (
          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="bg-prakash-primary text-white hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90"
            >
              <Link href={localizedLink(ctaLink)}>{ctaText}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
