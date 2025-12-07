"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

import { VedicPattern } from "@/components/blocks/decorative/VedicPattern";

interface ChapterHeroProps {
  chapterNumber: number;
  chapterName: string;
  chapterNameMeaning: string;
  chapterSummary: string;
  verseCount: number;
  translate: Translate;
}

export function ChapterHero({
  chapterNumber,
  chapterName,
  chapterNameMeaning,
  chapterSummary,
  verseCount,
  translate,
}: ChapterHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <VedicPattern variant="mandala" size={500} opacity={0.3} />
      </div>

      <div className="relative z-10 px-4 pb-10 pt-4 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Title Banner */}
          <div className="rounded-lg bg-verse-banner-bg px-6 py-5 text-center transition-colors dark:bg-verse-banner-bg">
            <h1 className="font-crimson text-xl font-semibold tracking-[0.3px] text-verse-muted-text transition-colors dark:text-verse-muted-text">
              {translate("Chapter")} {chapterNumber}: {chapterName}
            </h1>
            <p className="mt-2 font-crimson text-[15px] italic text-verse-light-text transition-colors dark:text-verse-light-text">
              {chapterNameMeaning}{" "}
              <span className="text-verse-grey-text dark:text-verse-grey-text">
                •
              </span>{" "}
              {verseCount} {translate("Verses")}
            </p>
          </div>

          <p className="text-justify font-serif text-lg leading-loose text-foreground/90">
            {chapterSummary}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
