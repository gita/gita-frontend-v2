"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { getTranslate } from "shared/translate";

import Commentary from "./Commentary";
import Translation from "./Translation";
import { VerseHero } from "./VerseHero";
import { VerseNavigation } from "./VerseNavigation";

// Section divider with three dots
const SectionDivider = () => (
  <div className="my-10 flex w-full items-center justify-center">
    <span className="text-sm tracking-[6px] text-verse-divider-dots transition-colors dark:text-verse-divider-dots">
      •••
    </span>
  </div>
);

// Section heading component
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-5 text-left font-crimson text-[13px] font-semibold uppercase tracking-[1.5px] text-verse-grey-text transition-colors dark:text-verse-grey-text">
    {children}
  </h2>
);

// Inline Audio Player component
interface AudioPlayerProps {
  chapterNumber: number;
  verseNumber: number;
}

function InlineAudioPlayer({ chapterNumber, verseNumber }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioSrc = `https://gita.github.io/gita/data/verse_recitation/${chapterNumber}/${verseNumber}.mp3`;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Reset audio when verse changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [chapterNumber, verseNumber]);

  return (
    <div className="mb-[52px] flex justify-center">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="inline-flex items-center gap-3 rounded-full border border-verse-border bg-verse-card-bg px-5 py-2.5 transition-colors dark:border-verse-border dark:bg-verse-card-bg">
        <button
          onClick={togglePlay}
          className="flex size-6 items-center justify-center text-verse-light-text transition-colors hover:text-prakash-primary dark:text-verse-light-text dark:hover:text-nisha-primary"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current" />
          )}
        </button>

        {/* Progress bar */}
        <div
          className="relative h-1 w-[140px] cursor-pointer rounded-full bg-verse-progress-bg transition-colors dark:bg-verse-progress-bg"
          onClick={handleSeek}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-verse-progress-fill transition-colors dark:bg-verse-progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-verse-progress-handle transition-colors dark:bg-verse-progress-handle"
            style={{ left: `calc(${progress}% - 5px)` }}
          />
        </div>

        {/* Time display */}
        <span className="min-w-[60px] text-xs text-verse-grey-text transition-colors dark:text-verse-grey-text">
          {formatTime(currentTime)} / {formatTime(duration || 0)}
        </span>
      </div>
    </div>
  );
}

// Total chapters constant
const TOTAL_CHAPTERS = 18;

// Word meanings component with 2-column layout
interface WordMeaningsProps {
  wordMeanings: string;
  translate: Translate;
}

function WordMeanings({ wordMeanings, translate }: WordMeaningsProps) {
  // Parse word meanings - format is usually "word—meaning; word—meaning"
  const meanings = wordMeanings
    .split(";")
    .map((m) => m.trim())
    .filter(Boolean)
    .map((m) => {
      // Handle both "word—meaning" and "word - meaning" formats
      const dashIndex = m.indexOf("—");
      const hyphenIndex = m.indexOf(" - ");

      if (dashIndex !== -1) {
        return {
          sanskrit: m.slice(0, dashIndex).trim(),
          meaning: m.slice(dashIndex + 1).trim(),
        };
      } else if (hyphenIndex !== -1) {
        return {
          sanskrit: m.slice(0, hyphenIndex).trim(),
          meaning: m.slice(hyphenIndex + 3).trim(),
        };
      }
      return { sanskrit: m, meaning: "" };
    });

  return (
    <section className="mb-10">
      <SectionHeading>{translate("Word Meanings")}</SectionHeading>
      <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 md:grid-cols-2">
        {meanings.map((item, index) => (
          <div
            key={index}
            className="flex items-baseline gap-1 text-[15px] leading-relaxed"
          >
            <span className="font-crimson italic text-verse-warm-brown transition-colors dark:text-verse-warm-brown">
              {item.sanskrit}
            </span>
            {item.meaning && (
              <>
                <span className="text-verse-dash-color transition-colors dark:text-verse-dash-color">
                  —
                </span>
                <span className="text-[#3D3936] transition-colors dark:text-verse-dark-text">
                  {item.meaning}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

type Props = {
  verse: GitaVerse;
  chapterName: string;
} & LocaleAndTranslations;

const Verse = ({ verse, chapterName, translations, locale }: Props) => {
  const {
    gita_chapter,
    prev_chapter_verses_count,
    verse_number,
    chapter_number,
    text,
    transliteration,
    word_meanings,
    gita_translations,
    gita_commentaries,
  } = verse;

  const translate = getTranslate(translations, locale);

  // Determine if we can go to previous (not on chapter 1, verse 1)
  const canGoPrev = !(chapter_number === 1 && verse_number === 1);

  return (
    <div className="min-h-screen bg-prakash-bg font-crimson dark:bg-nisha-bg">
      <div className="mx-auto max-w-[680px] px-4 pb-24 pt-6 sm:px-6">
        {/* Hero Section with Breadcrumb and Title Banner */}
        <VerseHero
          chapterNumber={chapter_number}
          verseNumber={verse_number}
          chapterName={chapterName}
          translate={translate}
        />

        {/* Sanskrit Verse (Devanagari) */}
        {text && (
          <section className="mb-8 text-center">
            <p className="whitespace-pre-line font-crimson text-2xl font-semibold leading-loose text-prakash-primary transition-colors dark:text-nisha-primary">
              {text
                .split("\n")
                .filter((line) => line.trim() !== "")
                .join("\n")}
            </p>
          </section>
        )}

        {/* Transliteration */}
        {transliteration && (
          <section className="mb-6 text-center">
            <p className="whitespace-pre-line font-crimson text-base font-normal italic leading-[1.9] text-verse-light-text transition-colors dark:text-verse-light-text">
              {transliteration}
            </p>
          </section>
        )}

        {/* Audio Player */}
        <InlineAudioPlayer
          chapterNumber={chapter_number}
          verseNumber={verse_number}
        />

        {/* Word Meanings */}
        {word_meanings && (
          <WordMeanings wordMeanings={word_meanings} translate={translate} />
        )}

        <SectionDivider />

        {/* Translation Section */}
        <Translation
          translationData={gita_translations}
          translations={translations}
          locale={locale}
        />

        <SectionDivider />

        {/* Commentary Section */}
        <Commentary
          commentaryData={gita_commentaries}
          translations={translations}
          locale={locale}
        />

        {/* Bottom Navigation */}
        <VerseNavigation
          currentChapter={chapter_number}
          currentVerse={verse_number}
          totalVerses={gita_chapter.verses_count}
          totalChapters={TOTAL_CHAPTERS}
          prevChapterTotalVerses={prev_chapter_verses_count}
          canGoPrev={canGoPrev}
          translate={translate}
          className="mt-12"
        />
      </div>
    </div>
  );
};

export default Verse;
