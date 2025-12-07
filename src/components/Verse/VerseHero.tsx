"use client";

import LinkWithLocale from "components/LinkWithLocale";

interface VerseHeroProps {
  chapterNumber: number;
  verseNumber: string; // Changed to string to support ranges like "4-6"
  chapterName: string;
  translate: Translate;
}

export function VerseHero({
  chapterNumber,
  verseNumber,
  chapterName,
  translate,
}: VerseHeroProps) {
  return (
    <section className="mb-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-[13px]">
        <LinkWithLocale
          href="/"
          className="text-verse-grey-text transition-colors hover:text-prakash-primary dark:text-verse-grey-text dark:hover:text-nisha-primary"
        >
          {translate("Chapters")}
        </LinkWithLocale>
        <span className="text-verse-grey-text transition-colors dark:text-verse-grey-text">
          ›
        </span>
        <LinkWithLocale
          href={`/chapter/${chapterNumber}`}
          className="text-verse-grey-text transition-colors hover:text-prakash-primary dark:text-verse-grey-text dark:hover:text-nisha-primary"
        >
          {translate("Chapter")} {chapterNumber}
        </LinkWithLocale>
        <span className="text-verse-grey-text transition-colors dark:text-verse-grey-text">
          ›
        </span>
        <span className="text-verse-light-text transition-colors dark:text-verse-light-text">
          {translate("Verse")} {verseNumber}
        </span>
      </nav>

      {/* Title Banner */}
      <div className="rounded-lg bg-verse-banner-bg px-6 py-4 text-center transition-colors dark:bg-verse-banner-bg">
        <h1 className="font-crimson text-base font-medium tracking-[0.3px] text-verse-muted-text transition-colors dark:text-verse-muted-text">
          {translate(
            "Bhagavad Gita: Chapter <%= chapter %>, Verse <%= verse %>",
            {
              chapter: chapterNumber,
              verse: verseNumber,
            },
          )}
        </h1>
      </div>
    </section>
  );
}
