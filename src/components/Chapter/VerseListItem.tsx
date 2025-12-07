"use client";

import { motion } from "framer-motion";

import LinkWithLocale from "components/LinkWithLocale";

import { cn } from "@/lib/utils";

interface VerseListItemProps {
  verseNumber: string; // Changed to string to support ranges like "4-6"
  chapterNumber: number;
  translation: string;
  translate: Translate;
  index?: number;
}

export function VerseListItem({
  verseNumber,
  chapterNumber,
  translation,
  translate,
  index = 0,
}: VerseListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="px-4"
    >
      <LinkWithLocale
        href={`/chapter/${chapterNumber}/verse/${verseNumber}`}
        prefetch={false}
      >
        <div
          className={cn(
            "group flex flex-col gap-4 border-b border-border/20 py-7 transition-all duration-200 sm:flex-row sm:gap-6",
            "hover:-mx-2 hover:rounded-lg hover:border-transparent hover:bg-primary/5 hover:px-2 hover:py-7 hover:shadow-sm",
            "focus-within:-mx-2 focus-within:rounded-lg focus-within:border-transparent focus-within:bg-primary/5 focus-within:px-2 focus-within:py-7 focus-within:shadow-sm focus-within:outline-none",
          )}
        >
          {/* Verse Number */}
          <div className="flex items-start gap-2 sm:w-28 sm:shrink-0">
            <span className="text-base font-semibold text-primary">
              {translate("Verse")} {verseNumber}
            </span>
          </div>

          {/* Translation Text - Serif font for comfortable reading */}
          <p className="flex-1 text-justify font-serif text-lg leading-loose text-foreground/90 transition-colors group-hover:text-foreground">
            {translation}
          </p>
        </div>
      </LinkWithLocale>
    </motion.div>
  );
}
