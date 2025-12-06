"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

import { ChapterHero } from "@/components/Chapter/ChapterHero";
import { ChapterSidebar } from "@/components/Chapter/ChapterSidebar";
import { VerseListSection } from "@/components/Chapter/VerseListSection";
import { VerseQuickNav } from "@/components/Chapter/VerseQuickNav";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  chapterData: GitaChapterData;
  versesData: Pick<
    GitaVerse,
    "id" | "verse_number" | "gita_translations" | "chapter_number"
  >[];
} & LocaleAndTranslations;

export default function ChapterPage({
  chapterData: {
    chapter_number,
    chapter_summary,
    name_translated,
    name_meaning,
    verses_count,
  },
  versesData,
  translations,
  locale,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const translate = getTranslate(translations, locale);

  const prevChapter = chapter_number > 1 ? chapter_number - 1 : null;
  const nextChapter = chapter_number < 18 ? chapter_number + 1 : null;

  // Map chapter numbers to appropriate images
  const chapterImages: Record<number, string> = {
    1: "/art/bg_arjuna_lanscape_v2.webp",
    2: "/art/bg_krishnaji_portrait_chariot.webp",
    3: "/art/bg_krishnaji_landscape.webp",
    4: "/art/bg_krishnaji_portrait.webp",
    5: "/art/bg_krishnaji_portrait_rays.webp",
    6: "/art/bg_ganeshji_landscape.webp",
    7: "/art/bg_krishnaji.webp",
    8: "/art/bg_vedvyasji.webp",
    9: "/art/bg_bheeshmaji_landscape.webp",
    10: "/art/bg_dronaji_landscape.webp",
    11: "/art/bg_karnaji_landscape.webp",
    12: "/art/bg_yuddhistirji_portrait.webp",
    13: "/art/bg_bheemji_landscape.webp",
    14: "/art/bg_nakulji_landscape.webp",
    15: "/art/bg_sahadevji_landscape.webp",
    16: "/art/bg_duryodhanji_landscape.webp",
    17: "/art/bg_sanjayaji_landscape.webp",
    18: "/art/bg_dhritarashtraji_landscape.webp",
  };

  return (
    <div className="min-h-screen bg-prakash-bg font-inter dark:bg-nisha-bg">
      <div className="flex min-h-[calc(100vh-4rem)] w-full pb-24">
        {/* Main Content Area */}
        <div className="min-w-0 flex-1 px-4 pb-24 pt-4 md:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb Navigation */}
            <LinkWithLocale
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-prakash-primary dark:hover:text-nisha-primary"
            >
              <ChevronLeft className="size-4" />
              <span>{translate("All Chapters")}</span>
            </LinkWithLocale>

            {/* Chapter Content */}
            <div className="space-y-8">
              {/* Chapter Hero */}
              <ChapterHero
                chapterNumber={chapter_number}
                chapterName={name_translated}
                chapterNameMeaning={name_meaning}
                chapterSummary={chapter_summary}
                verseCount={verses_count}
                translate={translate}
              />

              {/* Verse List */}
              <VerseListSection
                verses={versesData}
                chapterNumber={chapter_number}
                translate={translate}
              />
            </div>
          </div>

          {/* Floating Action Button for Mobile Verse Grid */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-prakash-primary shadow-lg hover:bg-prakash-primary/90 dark:bg-nisha-primary dark:hover:bg-nisha-primary/90 lg:hidden"
                    aria-label="Open verse navigation"
                  >
                    <List className="size-6" />
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{translate("Navigation")}</p>
              </TooltipContent>
            </Tooltip>

            <SheetContent
              side="bottom"
              className="h-[85vh] rounded-t-2xl px-0 pb-0 pt-2"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pb-2">
                <div className="h-1.5 w-12 rounded-full bg-muted" />
              </div>

              <SheetHeader className="space-y-3 border-b px-6 pb-4 pt-2 text-left">
                <SheetTitle className="text-lg font-semibold">
                  {translate("Chapter")} {chapter_number}: {name_translated}
                </SheetTitle>

                {/* Chapter Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <LinkWithLocale
                    href={prevChapter ? `/chapter/${prevChapter}` : "#"}
                    prefetch={false}
                    className={`flex-1 ${!prevChapter && "pointer-events-none opacity-50"}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="default"
                      disabled={!prevChapter}
                      className="h-10 w-full gap-2"
                    >
                      <ChevronLeft className="size-4" />
                      <span className="text-sm">{translate("Previous")}</span>
                    </Button>
                  </LinkWithLocale>

                  <LinkWithLocale
                    href={nextChapter ? `/chapter/${nextChapter}` : "#"}
                    prefetch={false}
                    className={`flex-1 ${!nextChapter && "pointer-events-none opacity-50"}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="default"
                      disabled={!nextChapter}
                      className="h-10 w-full gap-2"
                    >
                      <span className="text-sm">{translate("Next")}</span>
                      <ChevronRight className="size-4" />
                    </Button>
                  </LinkWithLocale>
                </div>
              </SheetHeader>

              {/* Verses Section */}
              <div className="flex h-[calc(85vh-12rem)] flex-1 flex-col overflow-hidden">
                <div className="border-b bg-muted/20 px-6 py-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {translate("Verses")}
                  </h3>
                </div>

                <ScrollArea className="flex-1">
                  <VerseQuickNav
                    verses={versesData}
                    translate={translate}
                    showHeader={false}
                    className="p-4"
                  />
                </ScrollArea>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar - Sticky on Right Edge */}
        <div className="hidden w-[400px] shrink-0 lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] border-l bg-background/50 backdrop-blur-sm">
            <ChapterSidebar
              currentChapter={chapter_number}
              chapterName={name_translated}
              verses={versesData}
              translate={translate}
              className="h-full border-none bg-transparent"
              heroImage={chapterImages[chapter_number] || chapterImages[1]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
