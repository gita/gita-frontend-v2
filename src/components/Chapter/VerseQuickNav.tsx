"use client";

import LinkWithLocale from "components/LinkWithLocale";

import { cn } from "@/lib/utils";

interface VerseQuickNavProps {
  verses: {
    verse_number: string; // Changed to string to support ranges like "4-6"
    chapter_number: number;
  }[];
  currentVerse?: number;
  translate: Translate;
  showHeader?: boolean;
  className?: string;
}

export function VerseQuickNav({
  verses,
  currentVerse,
  translate,
  showHeader = true,
  className = "",
}: VerseQuickNavProps) {
  return (
    <div className={className}>
      {showHeader && (
        <div className="mb-4">
          <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {translate("Verses")}
          </h3>
        </div>
      )}
      <div className="grid grid-cols-5 gap-2">
        {verses.map((verse) => {
          // Compare numeric first verse with currentVerse
          const firstVerseNum = parseInt(verse.verse_number.split("-")[0], 10);
          const isActive = currentVerse === firstVerseNum;

          return (
            <LinkWithLocale
              key={verse.verse_number}
              href={`/chapter/${verse.chapter_number}/verse/${verse.verse_number}`}
              prefetch={false}
            >
              <div
                className={cn(
                  "hover:border-prakash-primary hover:bg-prakash-primary/10 dark:hover:border-nisha-primary dark:hover:bg-nisha-primary/10 flex h-11 w-full items-center justify-center rounded-md border-2 text-sm font-semibold transition-all hover:scale-105",
                  isActive
                    ? "border-prakash-primary bg-prakash-primary hover:bg-prakash-primary dark:border-nisha-primary dark:bg-nisha-primary text-white shadow-xs"
                    : "border-border/60 bg-card hover:shadow-xs",
                )}
              >
                {verse.verse_number}
              </div>
            </LinkWithLocale>
          );
        })}
      </div>
    </div>
  );
}
