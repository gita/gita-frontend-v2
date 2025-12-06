"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import LinkWithLocale from "components/LinkWithLocale";

import { getNextPageHref, getPrevPageHref } from "../Chapter/functions";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VerseNavigationProps {
  currentChapter: number;
  currentVerse: number;
  totalVerses: number;
  totalChapters: number;
  prevChapterTotalVerses?: number;
  canGoPrev: boolean;
  translate: Translate;
  className?: string;
}

export function VerseNavigation({
  currentChapter,
  currentVerse,
  totalVerses,
  totalChapters,
  prevChapterTotalVerses,
  canGoPrev,
  translate,
  className = "",
}: VerseNavigationProps) {
  const prevHref = getPrevPageHref(
    currentChapter,
    currentVerse,
    prevChapterTotalVerses,
  );
  const nextHref = getNextPageHref(currentChapter, currentVerse, totalVerses);

  // Determine if at chapter boundaries
  const isFirstVerseInChapter = currentVerse === 1;
  const isLastVerseInChapter = currentVerse === totalVerses;
  const isLastChapter = currentChapter === totalChapters;

  // Calculate next verse/chapter info for display
  const nextVerseNumber = isLastVerseInChapter
    ? `${currentChapter + 1 > totalChapters ? 1 : currentChapter + 1}.1`
    : `${currentChapter}.${currentVerse + 1}`;

  // Labels for prev button
  const prevLabel = isFirstVerseInChapter
    ? translate("Prev Chapter")
    : translate("Prev Verse");

  // Check if next should be disabled (last verse of last chapter)
  const canGoNext = !(isLastChapter && isLastVerseInChapter);

  return (
    <div className={cn("", className)}>
      {/* Top border */}
      <div className="border-t border-border/40" />

      {/* Navigation buttons - matching design spec */}
      <div className="flex items-center justify-between pt-8">
        {/* Previous Button - Outline style */}
        {canGoPrev ? (
          <LinkWithLocale href={prevHref} prefetch={false}>
            <Button
              variant="outline"
              size="default"
              className="gap-2 px-5 py-3"
              aria-label="Previous"
            >
              <ChevronLeft className="size-4" />
              <span className="text-sm">{prevLabel}</span>
            </Button>
          </LinkWithLocale>
        ) : (
          <div />
        )}

        {/* Next Button - Primary filled style */}
        {canGoNext ? (
          <LinkWithLocale href={nextHref} prefetch={false}>
            <Button
              size="default"
              className="gap-2 bg-prakash-primary px-6 py-3 text-white hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90"
              aria-label="Next verse"
            >
              <span className="text-sm">
                {translate("Verse")} {nextVerseNumber}
              </span>
              <ChevronRight className="size-4" />
            </Button>
          </LinkWithLocale>
        ) : (
          <div />
        )}
      </div>

      {/* Verse count indicator */}
      <div className="mt-5 text-center">
        <span className="font-crimson text-[13px] text-verse-verse-count transition-colors dark:text-verse-verse-count">
          {currentVerse} {translate("of")} {totalVerses} {translate("verses")}
        </span>
      </div>
    </div>
  );
}
