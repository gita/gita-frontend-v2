import React, { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { connect } from "react-redux";


 function AudioPlayer({ playerIsOpen, closePlayerModal,currentVerse }) {
  const refs = useRef([]);
  const play = () => {
    if (refs.current[1].paused) {
      refs.current[1].play();
      refs.current[0].src = "/pause.svg";
    } else {
      refs.current[1].pause();
      refs.current[0].src = "/play.svg";
    }
  };

  const endFunction = () => {
    refs.current[1].currentTime = 0;
    refs.current[1].load();
    refs.current[0].src = "/play.svg";
  };

  const playback = (speed) => {
    if (!refs.current[1].paused) {
      refs.current[1].load();
      refs.current[1].playbackRate = speed;
      refs.current[1].play();
    } else {
      refs.current[1].load();
      refs.current[1].playbackRate = speed;
    }
  };
  useEffect(() => {
    const scriptTag = document.createElement("script");
    const scrptTag = document.createElement("script");
    scrptTag.src = "https://code.jquery.com/jquery-2.2.4.min.js";
    scrptTag.crossOrigin = "anonymous";
    scrptTag.integrity = "sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=";

    scriptTag.src = "../js/audioseeker.js";
    scriptTag.async = true;

    document.body.appendChild(scriptTag);
    document.body.appendChild(scrptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <div>
      <audio
        id="a1"
        ref={(element) => {
          refs.current[1] = element;
        }}
        src={`https://gita.github.io/gita/data/verse_recitation/${currentVerse?.chapterNumber}/${currentVerse?.verseNumber}.mp3`}
        onEnded={() => endFunction()}
      ></audio>
      <Transition appear show={playerIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 -top-20 z-10 overflow-y-auto"
          onClose={closePlayerModal}
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
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-dark-bg shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-gray-50"
                >
                  BG {currentVerse?.chapterNumber}.{currentVerse?.verseNumber}{" "}
                </Dialog.Title>
                <div className="mt-2 border-b pb-8">
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    dhṛitarāśhtra uvācha dharma-kṣhetre kuru-kṣhetre samavetā
                    yuyutsavaḥ māmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya
                  </p>
                </div>

                <div className="flex justify-between mt-4 px-4">
                  <img src="/rewind.svg" />
                  <img
                    id="play"
                    ref={(element) => {
                      refs.current[0] = element;
                    }}
                    className="cursor-pointer"
                    src="/play.svg"
                    onClick={play}
                  />
                  <img src="/forward.svg" />
                </div>
                <div
                  className=" flex items-center w-full h-2 mx-auto my-3 cursor-pointer"
                  onClick={(event) => sayLoc(event)}
                >
                  <div
                    id="audiobar"
                    className="hp_slide h-1 w-full bg-light-orange"
                  >
                    <div className="hp_range h-1 bg-my-orange"></div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className=" w-full z-0 mt-4 flex shadow-sm rounded-md">
                    <button
                      type="button"
                      className="flex-grow items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:text-gray-200 dark:bg-dark-100 dark:hover:bg-dark-bg hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      onClick={() => playback(0.75)}
                    >
                      0.75x
                    </button>
                    <button
                      type="button"
                      className="-ml-px flex-grow items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:text-gray-200 dark:bg-dark-100 dark:hover:bg-dark-bg hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      onClick={() => playback(1.0)}
                    >
                      1x
                    </button>

                    <button
                      type="button"
                      className="-ml-px flex-grow items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:text-gray-200 dark:bg-dark-100 dark:hover:bg-dark-bg hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      onClick={() => playback(1.5)}
                    >
                      1.5x
                    </button>
                    <button
                      type="button"
                      className="-ml-px flex-grow items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:text-gray-200 dark:bg-dark-100 dark:hover:bg-dark-bg hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      onClick={() => playback(2.0)}
                    >
                      2x
                    </button>
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


const mapStateToProps = (state)=> { 
  return{
    currentVerse : state?.settings?.currentVerse
  }
}

export default connect(mapStateToProps)(AudioPlayer)