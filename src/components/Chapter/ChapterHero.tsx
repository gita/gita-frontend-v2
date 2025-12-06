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

      <div className="relative z-10 px-4 py-10 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {translate("Chapter")} {chapterNumber}: {chapterName}
            </h1>
            <p className="font-serif text-lg italic text-muted-foreground">
              {chapterNameMeaning}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4" />
            <span>
              {verseCount} {translate("Verses")}
            </span>
          </div>

          <p className="text-justify font-serif text-lg leading-loose text-foreground/90">
            {chapterSummary}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
