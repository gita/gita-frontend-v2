"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

import { getNextPageHref, getPrevPageHref } from "components/Chapter/functions";
import LinkWithLocale from "components/LinkWithLocale";

import PlaybackRateButton from "./PlaybackRateButton";
import { updateQueryString } from "./functions";

interface Props {
  currentVerse: GitaVerse;
  playerIsOpen: boolean;
  closePlayerModal: () => void;
  translate: Translate;
}

function AudioPlayer({
  playerIsOpen,
  closePlayerModal,
  currentVerse,
  translate,
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [trackProgress, setTrackProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentRate, setCurrentRate] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("audio") !== "1") {
      searchParams.set("audio", "1");
      updateQueryString(searchParams);
    }
  }, []);

  const closeAndUpdateSearchParams = () => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.delete("audio");
    updateQueryString(newSearchParams);
    closePlayerModal();
  };

  const { current: audio } = audioRef;
  const { current: image } = imageRef;

  const play = () => {
    if (!audio || !image) {
      return;
    }

    if (audio.paused) {
      audio.play();
      image.src = "/pause.svg";
      setIsAudioPlaying(true);
    } else {
      audio.pause();
      image.src = "/play.svg";
      setIsAudioPlaying(false);
    }
  };

  const endFunction = () => {
    if (!audio || !image) {
      return;
    }

    audio.currentTime = 0;
    audio.load();
    image.src = "/play.svg";

    setIsAudioPlaying(false);
  };

  useEffect(() => {
    if (playerIsOpen && imageRef.current?.src) {
      imageRef.current.src = "/pause.svg";
      audioRef.current?.play();
    }
  }, [currentVerse?.id, playerIsOpen]);

  //below use effect is not working
  useEffect(() => {
    if (playerIsOpen && !audioRef.current?.paused) {
      imageRef.current?.src ? (imageRef.current.src = "/pause.svg") : null;
    }
  }, [playerIsOpen]);

  const prevId = currentVerse?.id - 1;
  const nextId = currentVerse?.id + 1;

  const setAudioPlaybackRate = (newRate: number) => {
    if (audio) {
      audio.playbackRate = newRate;
    }
    setCurrentRate(newRate);
  };

  const setPlaybackTime = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!audio) {
      return;
    }
    const rect = evt.currentTarget.getBoundingClientRect();
    const barLength = rect.right - rect.left;
    const clickX = evt.pageX - rect.left;
    const progression = clickX / barLength;
    audio.currentTime = Math.round(audio.duration * progression);
  };

  return (
    <div>
      <audio
        id="a1"
        ref={audioRef}
        src={`https://gita.github.io/gita/data/verse_recitation/${currentVerse?.chapter_number}/${currentVerse?.verse_number}.mp3`}
        onEnded={() => endFunction()}
        onTimeUpdate={(evt) => {
          const currentProgress =
            evt.currentTarget.currentTime / evt.currentTarget.duration;
          setTrackProgress(Math.round(currentProgress * 100));
        }}
      />
      <Transition appear show={playerIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 -top-20 z-10 overflow-y-auto"
          onClose={closeAndUpdateSearchParams}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0" aria-hidden="true" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-bg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-50 "
                >
                  {translate("BG <%= verseNumber %>", {
                    verseNumber: `${currentVerse?.chapter_number}.${currentVerse?.verse_number}`,
                  })}
                </Dialog.Title>
                <div className="mt-2 border-b pb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    {currentVerse?.transliteration}
                  </p>
                </div>

                <div className="mt-4 flex justify-between px-4">
                  <LinkWithLocale
                    href={getPrevPageHref(
                      currentVerse.chapter_number,
                      currentVerse.verse_number,
                      currentVerse.prev_chapter_verses_count,
                    )}
                    className={`hover:cursor-pointer  hover:brightness-90 dark:hover:brightness-50 ${
                      prevId <= 0 ? "pointer-events-none" : ""
                    }`}
                  >
                    <Image
                      src="/rewind.svg"
                      alt="rewind icon"
                      width={50}
                      height={50}
                    />
                  </LinkWithLocale>
                  <Image
                    id="play"
                    ref={imageRef}
                    className="cursor-pointer"
                    src={isAudioPlaying ? "/pause.svg" : "/play.svg"}
                    onClick={play}
                    width={54}
                    height={54}
                    alt="play or pause icon"
                  />
                  <LinkWithLocale
                    href={getNextPageHref(
                      currentVerse.chapter_number,
                      currentVerse.verse_number,
                      currentVerse.gita_chapter.verses_count,
                    )}
                    className={`hover:cursor-pointer  hover:brightness-90 dark:hover:brightness-50 ${
                      nextId > 701 ? "pointer-events-none" : ""
                    }`}
                  >
                    <Image
                      src="/forward.svg"
                      alt="forward icon"
                      width={50}
                      height={50}
                    />
                  </LinkWithLocale>
                </div>
                <div
                  className="mx-auto my-3 flex h-2 w-full cursor-pointer items-center"
                  onClick={setPlaybackTime}
                >
                  <div className="mb-4 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-my-orange"
                      style={{
                        width: `${trackProgress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <span className=" z-0 mt-4 flex w-full rounded-md shadow-sm">
                    <PlaybackRateButton
                      currentRate={currentRate}
                      playbackRate={0.75}
                      setAudioPlaybackRate={setAudioPlaybackRate}
                    />
                    <PlaybackRateButton
                      currentRate={currentRate}
                      playbackRate={1}
                      setAudioPlaybackRate={setAudioPlaybackRate}
                    />
                    <PlaybackRateButton
                      currentRate={currentRate}
                      playbackRate={1.5}
                      setAudioPlaybackRate={setAudioPlaybackRate}
                    />
                    <PlaybackRateButton
                      currentRate={currentRate}
                      playbackRate={2}
                      setAudioPlaybackRate={setAudioPlaybackRate}
                    />
                  </span>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default AudioPlayer;
