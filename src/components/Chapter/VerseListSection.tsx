"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import LinkWithLocale from "components/LinkWithLocale";

import { VerseListItem } from "./VerseListItem";

import { Button } from "@/components/ui/button";

interface VerseListSectionProps {
  verses: Array<{
    verse_number: number;
    chapter_number: number;
    gita_translations: Array<{ description: string }>;
  }>;
  chapterNumber: number;
  translate: Translate;
}

export function VerseListSection({
  verses,
  chapterNumber,
  translate,
}: VerseListSectionProps) {
  const prevChapter = chapterNumber > 1 ? chapterNumber - 1 : null;
  const nextChapter = chapterNumber < 18 ? chapterNumber + 1 : null;

  return (
    <section className="px-4">
      {/* Verse List */}
      <div className="-mx-4 mt-8">
        {verses.map((verse, index) => (
          <div
            key={verse.verse_number}
            id={`verse-${verse.verse_number}`}
            className={index === 0 ? "border-t border-border/40" : ""}
          >
            <VerseListItem
              verseNumber={verse.verse_number}
              chapterNumber={verse.chapter_number}
              translation={verse.gita_translations[0]?.description || ""}
              translate={translate}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 py-8">
        <LinkWithLocale
          href={prevChapter ? `/chapter/${prevChapter}` : "#"}
          prefetch={false}
          className={!prevChapter ? "pointer-events-none opacity-50" : ""}
        >
          <Button
            variant="outline"
            size="lg"
            disabled={!prevChapter}
            className="gap-2"
          >
            <ChevronLeft className="size-5" />
            <span className="hidden sm:inline">
              {translate("Previous Chapter")}
            </span>
            <span className="sm:hidden">{translate("Previous")}</span>
          </Button>
        </LinkWithLocale>

        <LinkWithLocale
          href={nextChapter ? `/chapter/${nextChapter}` : "#"}
          prefetch={false}
          className={!nextChapter ? "pointer-events-none opacity-50" : ""}
        >
          <Button
            size="lg"
            disabled={!nextChapter}
            className="gap-2 bg-prakash-primary text-white hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90"
          >
            <span className="hidden sm:inline">
              {translate("Next Chapter")}
            </span>
            <span className="sm:hidden">{translate("Next")}</span>
            <ChevronRight className="size-5" />
          </Button>
        </LinkWithLocale>
      </div>

      {/* Empty State */}
      {verses.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            {translate("No verses found")}
          </p>
        </div>
      )}
    </section>
  );
}
