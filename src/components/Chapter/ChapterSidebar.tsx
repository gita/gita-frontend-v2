"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";

import { VerseQuickNav } from "./VerseQuickNav";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChapterSidebarProps {
  currentChapter: number;
  chapterName: string;
  verses: {
    verse_number: number;
    chapter_number: number;
  }[];
  currentVerse?: number;
  translate: Translate;
  className?: string;
  heroImage?: string;
}

export function ChapterSidebar({
  currentChapter,
  chapterName,
  verses,
  currentVerse,
  translate,
  className = "",
  heroImage,
}: ChapterSidebarProps) {
  const prevChapter = currentChapter > 1 ? currentChapter - 1 : null;
  const nextChapter = currentChapter < 18 ? currentChapter + 1 : null;

  return (
    <aside
      className={`flex flex-col border-l border-border/40 bg-muted/10 ${className}`}
      aria-label="Chapter navigation"
    >
      {/* Scrollable Header Section - Image + Navigation */}
      <div className="shrink-0">
        {/* Chapter Image */}
        {heroImage && (
          <div className="relative aspect-[4/3] w-full overflow-hidden border-b bg-muted/20">
            <Image
              src={heroImage}
              alt={`Chapter ${currentChapter} illustration`}
              fill
              className="object-cover"
              sizes="320px"
              priority
            />
          </div>
        )}

        {/* Chapter Navigation Buttons */}
        <div className="border-b border-border/40 bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <LinkWithLocale
              href={prevChapter ? `/chapter/${prevChapter}` : "#"}
              prefetch={false}
              className={cn(
                "flex-1",
                !prevChapter && "pointer-events-none opacity-50",
              )}
            >
              <Button
                variant="outline"
                size="default"
                disabled={!prevChapter}
                className="h-10 w-full gap-2"
                aria-label="Previous chapter"
              >
                <ChevronLeft className="size-4" />
                <span className="text-sm">{translate("Previous chapter")}</span>
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
                <span className="text-sm">{translate("Next chapter")}</span>
                <ChevronRight className="size-4" />
              </Button>
            </LinkWithLocale>
          </div>
        </div>
      </div>

      {/* Verse Grid */}
      <div className="flex-1 overflow-hidden">
        <div className="relative h-full">
          <ScrollArea className="h-full">
            <VerseQuickNav
              verses={verses}
              currentVerse={currentVerse}
              translate={translate}
              showHeader={true}
              className="p-4"
            />
          </ScrollArea>
          {/* Scroll Indicator - Fade gradient at bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      </div>
    </aside>
  );
}
