"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import LinkWithLocale from "components/LinkWithLocale";

import { Button } from "@/components/ui/button";

interface ChapterNavigatorProps {
  currentChapter: number;
  chapterName: string;
  translate: Translate;
}

export function ChapterNavigator({
  currentChapter,
  chapterName,
  translate,
}: ChapterNavigatorProps) {
  const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
  const nextChapter = currentChapter < 18 ? currentChapter + 1 : null;

  return (
    <div className="border-b border-border/40 bg-muted/20 p-4">
      {/* Chapter Title */}
      <div className="mb-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {translate("Chapter")}
        </p>
        <h3 className="mt-1 text-base font-semibold leading-tight">
          {currentChapter}. {chapterName}
        </h3>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-between gap-3">
        <LinkWithLocale
          href={prevChapter ? `/chapter/${prevChapter}` : "#"}
          prefetch={false}
          className="flex-1"
        >
          <Button
            variant="outline"
            size="default"
            disabled={!prevChapter}
            className="h-10 w-full gap-2"
            aria-label="Previous chapter"
          >
            <ChevronLeft className="size-4" />
            <span className="text-sm">{translate("Previous")}</span>
          </Button>
        </LinkWithLocale>

        <LinkWithLocale
          href={nextChapter ? `/chapter/${nextChapter}` : "#"}
          prefetch={false}
          className="flex-1"
        >
          <Button
            variant="outline"
            size="default"
            disabled={!nextChapter}
            className="h-10 w-full gap-2"
            aria-label="Next chapter"
          >
            <span className="text-sm">{translate("Next")}</span>
            <ChevronRight className="size-4" />
          </Button>
        </LinkWithLocale>
      </div>
    </div>
  );
}
