import LinkWithLocale from "components/LinkWithLocale";

import { SvgList } from "../svgs";

import { Card as CardUI, CardContent, CardHeader } from "@/components/ui/card";
import { chapterDescriptions } from "@/data/chapterDescriptions";
import { cn } from "@/lib/utils";

interface Props {
  chapter: TChapter;
  translate: Translate;
}

const Card = ({ chapter, translate }: Props) => {
  const description = chapterDescriptions[chapter.chapter_number] || chapter.chapter_summary;
  
  return (
    <LinkWithLocale
      href={`/chapter/${chapter.id}`}
      prefetch={false}
      className="z-10 block transition-all hover:cursor-pointer"
      aria-label={`Read Chapter ${chapter.chapter_number}: ${chapter.name_translated} - ${chapter.verses_count} verses`}
    >
      <CardUI
        className={cn(
          "h-full bg-white dark:bg-card border-2 shadow-md hover:shadow-xl transition-all duration-300",
          "border-border hover:border-primary/30",
          "dark:border-border dark:hover:border-primary/50"
        )}
      >
        <CardHeader className="space-y-2 pb-3">
          <h2 className="font-bold text-primary">
            {translate("Chapter")} {chapter.chapter_number}
          </h2>
          <h3 className="text-xl font-bold text-foreground">
            {chapter.name_translated}
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="line-clamp-3 text-base leading-relaxed text-foreground/80">
            {description}
          </p>

          <div className="flex justify-between">
            <div className="flex items-center text-sm text-foreground/70">
              <SvgList className="mr-2 size-4" aria-hidden="true" />
              <span>
                {chapter.verses_count} {translate("Verses")}
              </span>
            </div>
          </div>
        </CardContent>
      </CardUI>
    </LinkWithLocale>
  );
};

export default Card;
