import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import data from "../../constant/contentModal.json";
import Link from "next/link";
import {
  ArrowNarrowRightIcon,
  CheckIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
export default function ContentModal({ isOpen, close }) {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState({ verseNumber: 1, id: 1 });

  const router = useRouter();

  function modalClose() {
    close();
    setSelectedChapter(1);
  }
  function handleSubmit() {
    router.push(`/verse/${selectedVerse.id}`);
    setSelectedChapter(1);
    setSelectedVerse({ verseNumber: 1, id: 1 });
    close();
  }
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 -top-20 z-10 overflow-y-auto"
          onClose={close}
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
              <div className="inline-block w-5/6 max-w-4xl overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-dark-100 shadow-xl rounded-2xl">
                <div className="flex flex-col p-8 md:hidden">
                  <p className="text-my-orange py-2 font-semibold">Chapters</p>
                  <Listbox
                    value={selectedChapter}
                    onChange={setSelectedChapter}
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-dark-bg rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-my-orange focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block">Chapter {selectedChapter}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className=" w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-dark-bg rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {data.map((chapter) => (
                            <Listbox.Option
                              key={chapter.chapterNumber}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                              }
                              value={chapter.chapterNumber}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate dark:text-gray-50`}
                                  >
                                    Chapter {chapter.chapterNumber}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active
                                          ? "text-amber-600"
                                          : "text-amber-600"
                                      }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                    >
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  <p className="text-my-orange mt-2 py-2 font-semibold">
                    Verses
                  </p>
                  <Listbox value={selectedVerse} onChange={setSelectedVerse}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-dark-bg rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-my-orange focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block">
                          Verses {selectedVerse.verseNumber}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className=" w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-dark-bg rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {data
                            .filter(
                              (chapter) =>
                                chapter.chapterNumber === selectedChapter
                            )[0]
                            .gitaVersesByChapterId.nodes.map((verse) => (
                              <Listbox.Option
                                key={verse.id}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "text-amber-900 bg-amber-100"
                                      : "text-gray-900 dark:text-gray-50"
                                  }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={verse}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`${
                                        selected ? "font-medium" : "font-normal"
                                      } block truncate dark:text-gray-50`}
                                    >
                                      Verse {verse.verseNumber}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          active
                                            ? "text-amber-600"
                                            : "text-amber-600"
                                        }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                      >
                                        <CheckIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                  <button
                    className="bg-my-orange/80 w-2/3 mx-auto mt-3 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                  >
                    Lets Go
                  </button>
                </div>
                <div className="items-center hidden md:flex">
                  <div className="flex justify-center h-full flex-1 p-6">
                    <div className="flex flex-col">
                      {data.slice(0, 9).map((chapter) =>
                        selectedChapter === chapter.chapterNumber ? (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedChapter(chapter.chapterNumber);
                            }}
                            className="p-2 w-40 group flex items-center justify-between rounded-lg bg-light-orange hover:cursor-pointer"
                            key={chapter.chapterNumber}
                          >
                            <p className="text-base font-medium text-my-orange">
                              Chapter {chapter.chapterNumber}
                            </p>
                            <ArrowNarrowRightIcon className="w-8 h-5 text-my-orange opacity-100" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedChapter(chapter.chapterNumber);
                            }}
                            className="p-2 w-40 group flex items-center justify-between rounded-lg hover:bg-light-orange dark:hover:bg-dark-bg hover:cursor-pointer"
                            key={chapter.chapterNumber}
                          >
                            <p className="text-base font-medium text-gray-500 group-hover:text-my-orange dark:text-white">
                              Chapter {chapter.chapterNumber}
                            </p>
                            <ArrowNarrowRightIcon className="w-8 h-5 text-my-orange opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                          </button>
                        )
                      )}
                    </div>
                    <div className="">
                      {data.slice(9, 18).map((chapter) =>
                        selectedChapter === chapter.chapterNumber ? (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedChapter(chapter.chapterNumber);
                            }}
                            className="p-2 w-40 group flex items-center justify-between rounded-lg bg-light-orange hover:cursor-pointer"
                            key={chapter.chapterNumber}
                          >
                            <p className="text-base font-medium text-my-orange">
                              Chapter {chapter.chapterNumber}
                            </p>
                            <ArrowNarrowRightIcon className="w-8 h-5 text-my-orange opacity-100" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedChapter(chapter.chapterNumber);
                            }}
                            className="p-2 w-40 group flex items-center justify-between rounded-lg hover:bg-light-orange dark:hover:bg-dark-bg hover:cursor-pointer"
                            key={chapter.chapterNumber}
                          >
                            <p className="text-base font-medium text-gray-500 group-hover:text-my-orange dark:text-white">
                              Chapter {chapter.chapterNumber}
                            </p>
                            <ArrowNarrowRightIcon className="w-8 h-5 text-my-orange opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center h-full flex-1 flex-col bg-light-orange p-6">
                    <p className="text-my-orange py-2 font-semibold">
                      Chapter {selectedChapter}
                    </p>
                    <hr className="border-my-orange/10" />
                    <div className={`flex p-3 flex-wrap `}>
                      {data
                        .filter(
                          (chapter) => chapter.chapterNumber === selectedChapter
                        )[0]
                        .gitaVersesByChapterId.nodes.map((verse) => (
                          <Link href={`/verse/${verse.id}`} key={verse.id}>
                            {selectedVerse.id === verse.id ? (
                              <div
                                onClick={modalClose}
                                className="flex justify-center items-center h-10 w-10 p-1.5 m-px rounded hover:cursor-pointer bg-my-orange text-white"
                              >
                                <a>{verse.verseNumber}</a>
                              </div>
                            ) : (
                              <div
                                onClick={modalClose}
                                className="flex justify-center items-center h-10 w-10 p-1.5 m-px text-gray-500 rounded hover:cursor-pointer hover:bg-my-orange hover:text-white"
                              >
                                <a>{verse.verseNumber}</a>
                              </div>
                            )}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
