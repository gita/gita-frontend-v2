"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  verseNumber: string; // Can be "4" or "4-6"
  sanskritAudio?: string; // Optional audio URL from data
}

function InlineAudioPlayer({
  chapterNumber,
  verseNumber,
  sanskritAudio,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackDurations, setTrackDurations] = useState<number[]>([]);
  const [isDurationsLoaded, setIsDurationsLoaded] = useState(false);
  const pendingSeekTime = useRef<number | null>(null);

  // Parse verse number to get all verses in range - memoized to prevent re-computation
  const verseNumbers = useMemo(() => {
    const verseStr = verseNumber.toString();
    if (verseStr.includes("-")) {
      const [start, end] = verseStr.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return [parseInt(verseStr, 10)];
  }, [verseNumber]);

  // Determine audio source
  const audioSrc = useMemo(() => {
    // If sanskritAudio is provided, use it (could be combined or single)
    if (sanskritAudio) {
      return sanskritAudio;
    }
    // Fall back to old URL pattern for individual verses
    const currentVerseNum = verseNumbers[currentTrackIndex];
    return `https://gita.github.io/gita/data/verse_recitation/${chapterNumber}/${currentVerseNum}.mp3`;
  }, [sanskritAudio, chapterNumber, verseNumbers, currentTrackIndex]);

  // Calculate total duration and cumulative time
  const totalDuration = trackDurations.reduce((sum, d) => sum + d, 0);
  const elapsedFromPreviousTracks = trackDurations
    .slice(0, currentTrackIndex)
    .reduce((sum, d) => sum + d, 0);
  const totalCurrentTime = elapsedFromPreviousTracks + currentTime;

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

  const handleEnded = () => {
    // If we have sanskritAudio (combined file), just stop playing
    if (sanskritAudio) {
      setIsPlaying(false);
      setCurrentTime(0);
      return;
    }

    // Otherwise, if there are more verses in the range, play the next one
    if (currentTrackIndex < verseNumbers.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
      setCurrentTime(0);
      // Audio will auto-play next track due to useEffect
    } else {
      // All tracks finished
      setIsPlaying(false);
      setCurrentTime(0);
      setCurrentTrackIndex(0); // Reset to first track
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!totalDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const seekToTotalTime = (clickX / rect.width) * totalDuration;

    // Find which track this time falls into
    let accumulatedTime = 0;
    let targetTrackIndex = 0;
    let targetTrackTime = 0;

    for (let i = 0; i < trackDurations.length; i++) {
      if (seekToTotalTime <= accumulatedTime + trackDurations[i]) {
        targetTrackIndex = i;
        targetTrackTime = seekToTotalTime - accumulatedTime;
        break;
      }
      accumulatedTime += trackDurations[i];
    }

    // If seeking to a different track, update track index and store pending seek time
    if (targetTrackIndex !== currentTrackIndex) {
      pendingSeekTime.current = targetTrackTime;
      setCurrentTrackIndex(targetTrackIndex);
      setCurrentTime(0);
      // Will seek after track loads via handleLoadedMetadata
    } else if (audioRef.current) {
      // Same track, just seek
      audioRef.current.currentTime = targetTrackTime;
      setCurrentTime(targetTrackTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = totalDuration ? (totalCurrentTime / totalDuration) * 100 : 0;

  // Reset audio when verse changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentTrackIndex(0);
    setTrackDurations([]);
    setIsDurationsLoaded(false);
    pendingSeekTime.current = null;
  }, [chapterNumber, verseNumber]);

  // Preload all verse durations when component mounts
  useEffect(() => {
    let isCancelled = false;

    const preloadDurations = async () => {
      setIsDurationsLoaded(false);
      const durations: number[] = [];

      // If we have sanskritAudio (combined file for range), just load that one
      if (sanskritAudio) {
        const audio = new Audio();
        audio.src = sanskritAudio;

        await new Promise<void>((resolve) => {
          audio.addEventListener("loadedmetadata", () => {
            durations[0] = audio.duration;
            resolve();
          });
          audio.addEventListener("error", () => {
            durations[0] = 0; // Fallback if audio fails to load
            resolve();
          });
          audio.load();
        });
      } else {
        // Fall back to loading individual verse files
        for (let i = 0; i < verseNumbers.length; i++) {
          if (isCancelled) return;

          const audio = new Audio();
          audio.src = `https://gita.github.io/gita/data/verse_recitation/${chapterNumber}/${verseNumbers[i]}.mp3`;

          await new Promise<void>((resolve) => {
            audio.addEventListener("loadedmetadata", () => {
              durations[i] = audio.duration;
              resolve();
            });
            audio.addEventListener("error", () => {
              durations[i] = 0; // Fallback if audio fails to load
              resolve();
            });
            audio.load();
          });
        }
      }

      if (!isCancelled) {
        setTrackDurations(durations);
        setIsDurationsLoaded(true);
      }
    };

    preloadDurations();

    return () => {
      isCancelled = true;
    };
  }, [verseNumbers, chapterNumber, sanskritAudio]);

  // Auto-play next track when currentTrackIndex changes
  useEffect(() => {
    if (currentTrackIndex > 0 && isPlaying && audioRef.current) {
      // Small delay to ensure audio element is ready
      const timer = setTimeout(() => {
        audioRef.current?.play();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentTrackIndex, isPlaying]);

  // Handle pending seek when track changes
  useEffect(() => {
    if (pendingSeekTime.current !== null && audioRef.current) {
      const handleCanPlay = () => {
        if (audioRef.current && pendingSeekTime.current !== null) {
          audioRef.current.currentTime = pendingSeekTime.current;
          setCurrentTime(pendingSeekTime.current);
          pendingSeekTime.current = null;
        }
      };

      audioRef.current.addEventListener("canplay", handleCanPlay);
      return () => {
        audioRef.current?.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [currentTrackIndex]);

  return (
    <div className="mb-[52px] flex justify-center">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <div className="inline-flex items-center gap-3 rounded-full border border-verse-border bg-verse-card-bg px-5 py-2.5 transition-colors dark:border-verse-border dark:bg-verse-card-bg">
        <button
          onClick={togglePlay}
          disabled={!isDurationsLoaded}
          className="flex size-6 items-center justify-center text-verse-light-text transition-colors hover:text-prakash-primary disabled:cursor-not-allowed disabled:opacity-50 dark:text-verse-light-text dark:hover:text-nisha-primary"
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
          {isDurationsLoaded ? (
            <>
              {formatTime(totalCurrentTime)} / {formatTime(totalDuration)}
            </>
          ) : (
            <>0:00 / --:--</>
          )}
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
            className="flex items-baseline gap-2 text-[15px] leading-relaxed"
          >
            <span className="min-w-[140px] font-crimson italic text-verse-warm-brown transition-colors dark:text-verse-warm-brown">
              {item.sanskrit}
            </span>
            {item.meaning && (
              <>
                <span className="shrink-0 text-verse-dash-color transition-colors dark:text-verse-dash-color">
                  —
                </span>
                <span className="flex-1 text-[#3D3936] transition-colors dark:text-verse-dark-text">
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
  nextVerseNumber?: string;
  prevVerseNumber?: string;
} & LocaleAndTranslations;

const Verse = ({
  verse,
  chapterName,
  translations,
  locale,
  nextVerseNumber,
  prevVerseNumber,
}: Props) => {
  const {
    gita_chapter,
    prev_chapter_verses_count,
    verse_number,
    chapter_number,
    text,
    transliteration,
    word_meanings,
    sanskrit_audio,
    gita_translations,
    gita_commentaries,
  } = verse;

  const translate = getTranslate(translations, locale);

  // Parse verse number for navigation logic (handles ranges like "4-6")
  const firstVerseNum = parseInt(verse_number.toString().split("-")[0], 10);

  // Determine if we can go to previous (not on chapter 1, verse 1)
  const canGoPrev = !(chapter_number === 1 && firstVerseNum === 1);

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
            <p
              lang="sa"
              className="sanskrit-verse whitespace-pre-line text-2xl leading-loose text-prakash-primary transition-colors dark:text-nisha-primary"
            >
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
            <p className="transliteration whitespace-pre-line text-base leading-[1.9] text-verse-light-text transition-colors dark:text-verse-light-text">
              {transliteration}
            </p>
          </section>
        )}

        {/* Audio Player */}
        <InlineAudioPlayer
          chapterNumber={chapter_number}
          verseNumber={verse_number}
          sanskritAudio={sanskrit_audio}
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
          nextVerseNumber={nextVerseNumber}
          prevVerseNumber={prevVerseNumber}
        />
      </div>
    </div>
  );
};

export default Verse;
