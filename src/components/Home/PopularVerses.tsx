"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";
import { getTranslate } from "shared/translate";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PopularVerse {
  chapter: number;
  verse: string;
  category: string;
  summary: string;
}

const popularVerses: PopularVerse[] = [
  {
    chapter: 2,
    verse: "47",
    category: "Karma Yog",
    summary:
      "Emphasizes performing one's duty without attachment to the results.",
  },
  {
    chapter: 4,
    verse: "7",
    category: "Avatar Vani",
    summary: "Krishna declares He incarnates whenever righteousness declines.",
  },
  {
    chapter: 4,
    verse: "8",
    category: "Avatar Vani",
    summary:
      "Explains the purpose of His incarnations: to protect the good and destroy the wicked.",
  },
  {
    chapter: 18,
    verse: "66",
    category: "Moksha",
    summary:
      "Urges to abandon all forms of dharma and surrender to Krishna for liberation.",
  },
  {
    chapter: 2,
    verse: "20",
    category: "Sankhya Yog",
    summary: "Describes the soul as eternal, neither born nor dying.",
  },
  {
    chapter: 3,
    verse: "9",
    category: "Karma Yog",
    summary: "Work should be done as a sacrifice to avoid bondage.",
  },
  {
    chapter: 6,
    verse: "5",
    category: "Dhyana Yog",
    summary: "One must elevate oneself by one's own mind, not degrade oneself.",
  },
  {
    chapter: 2,
    verse: "14",
    category: "Sankhya Yog",
    summary: "Teaches about the temporary nature of pleasure and pain.",
  },
  {
    chapter: 10,
    verse: "8",
    category: "Vibhuti Yog",
    summary: "Krishna is the source of all spiritual and material worlds.",
  },
  {
    chapter: 9,
    verse: "22",
    category: "Bhakti Yog",
    summary:
      "For devoted worshippers, Krishna provides and preserves their needs.",
  },
  {
    chapter: 3,
    verse: "20-21",
    category: "Karma Yog",
    summary: "People follow the example set by great individuals.",
  },
  {
    chapter: 11,
    verse: "32",
    category: "Vishvarupa Darshana Yog",
    summary: "Krishna reveals Himself as Time, the destroyer of worlds.",
  },
  {
    chapter: 2,
    verse: "12",
    category: "Sankhya Yog",
    summary: "Krishna begins teaching about the nature of the soul.",
  },
  {
    chapter: 6,
    verse: "6",
    category: "Dhyana Yog",
    summary: "The mind can be one's friend or enemy.",
  },
  {
    chapter: 12,
    verse: "12",
    category: "Bhakti Yog",
    summary:
      "Qualities of a true devotee: non-envious, friendly, and compassionate.",
  },
  {
    chapter: 2,
    verse: "27",
    category: "Sankhya Yog",
    summary: "Death is certain for the born; rebirth is certain for the dead.",
  },
  {
    chapter: 5,
    verse: "18",
    category: "Karma Sannyasa Yog",
    summary: "The wise see all beings with equal vision.",
  },
  {
    chapter: 7,
    verse: "14",
    category: "Jnana Vijnana Yog",
    summary:
      "Divine energy (Maya) is hard to overcome without surrendering to Krishna.",
  },
  {
    chapter: 8,
    verse: "6",
    category: "Akshara Brahma Yog",
    summary:
      "Whatever one thinks of at the time of death, that state one attains.",
  },
  {
    chapter: 17,
    verse: "3",
    category: "Shraddhatraya Vibhaga Yog",
    summary: "A person's faith corresponds to their inherent nature.",
  },
  {
    chapter: 10,
    verse: "10",
    category: "Bhakti Yog",
    summary:
      "Krishna grants understanding to devoted worshippers to reach Him.",
  },
  {
    chapter: 2,
    verse: "16",
    category: "Sankhya Yog",
    summary: "The unreal has no existence; the real never ceases to be.",
  },
  {
    chapter: 13,
    verse: "22",
    category: "Kshetra Kshetrajna Vibhaga Yog",
    summary:
      "The soul experiences birth and death due to attachment to material nature.",
  },
  {
    chapter: 2,
    verse: "7",
    category: "Sankhya Yog",
    summary: "Arjuna surrenders to Krishna, seeking guidance.",
  },
  {
    chapter: 2,
    verse: "31",
    category: "Sankhya Yog",
    summary: "One should not waver from their duty as a warrior.",
  },
  {
    chapter: 16,
    verse: "21",
    category: "Daivasura Sampad Vibhaga Yog",
    summary: "Desire, anger, and greed are gates to hell.",
  },
  {
    chapter: 3,
    verse: "27",
    category: "Karma Yog",
    summary:
      "All actions are performed by nature; the self, deluded by ego, thinks 'I am the doer.'",
  },
  {
    chapter: 9,
    verse: "4",
    category: "Raja Vidya Raja Guhya Yog",
    summary: "Krishna pervades and supports the entire universe.",
  },
  {
    chapter: 18,
    verse: "65",
    category: "Moksha",
    summary:
      "Directs to fix the mind on Krishna, be devoted, and one will come to Him.",
  },
  {
    chapter: 15,
    verse: "7",
    category: "Purushottama Yog",
    summary: "Living entities are eternal fragments of Krishna.",
  },
  {
    chapter: 6,
    verse: "47",
    category: "Dhyana Yog",
    summary:
      "The yogi with great faith who always abides in Krishna is the highest.",
  },
];

interface PopularVersesProps extends LocaleAndTranslations {}

const PopularVerses = ({ locale, translations }: PopularVersesProps) => {
  const translate = getTranslate(translations, locale);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  return (
    <div className="relative bg-gradient-to-b from-transparent via-accent/25 to-transparent py-20">
      <div className="pointer-events-none absolute inset-0 z-[-2] bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.08)_0%,transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {translate("Popular Verses")}
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-foreground/70 md:text-xl">
              {translate(
                "Explore timeless wisdom from Lord Krishna on karma yoga, bhakti, dharma, and moksha",
              )}
            </p>
          </div>

          <div className="relative">
            {/* Left scroll button - Outside cards */}
            <button
              onClick={() => {
                const container = document.getElementById("popular-verses-scroll");
                if (container) {
                  container.scrollBy({ left: -400, behavior: "smooth" });
                }
              }}
              className="absolute -left-14 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl ring-1 ring-gray-200 transition-all hover:scale-110 hover:bg-primary hover:text-white hover:ring-primary dark:bg-card dark:ring-gray-700 xl:block"
              aria-label="Scroll left to view previous verses"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right scroll button - Outside cards */}
            <button
              onClick={() => {
                const container = document.getElementById("popular-verses-scroll");
                if (container) {
                  container.scrollBy({ left: 400, behavior: "smooth" });
                }
              }}
              className="absolute -right-14 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-xl ring-1 ring-gray-200 transition-all hover:scale-110 hover:bg-primary hover:text-white hover:ring-primary dark:bg-card dark:ring-gray-700 xl:block"
              aria-label="Scroll right to view more verses"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Horizontal scrollable container */}
            <div
              id="popular-verses-scroll"
              className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-4"
              onScroll={handleScroll}
            >
              {popularVerses.map((verse, index) => (
                <LinkWithLocale
                  key={`${verse.chapter}-${verse.verse}`}
                  href={`/chapter/${verse.chapter}/verse/${verse.verse}`}
                  prefetch={false}
                  className="group block w-[300px] shrink-0 sm:w-[340px]"
                  aria-label={`Read verse ${verse.chapter}.${verse.verse} about ${verse.category}`}
                >
                  <Card className="h-full border-2 bg-white transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:bg-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-primary">
                          {translate("Verse")} {verse.chapter}.{verse.verse}
                        </h3>
                        <Badge variant="secondary" className="bg-primary/10 text-xs font-medium text-primary hover:bg-primary/20">
                          {verse.category}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <p className="line-clamp-3 text-sm leading-relaxed text-foreground/90">
                        {verse.summary}
                      </p>

                      <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                        {translate("Read full verse")}
                        <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                      </div>
                    </CardContent>
                  </Card>
                </LinkWithLocale>
              ))}
            </div>

            {/* Mobile scroll hint */}
            <div className="mt-6 text-center text-sm font-medium text-foreground/60 md:hidden">
              ← {translate("Swipe to explore more")} →
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PopularVerses;
