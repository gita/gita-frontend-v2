"use client";

import { Fragment, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  ArrowLongRightIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import LinkWithLocale from "components/LinkWithLocale";

import data from "../../constant/contentModal.json";

interface Props {
  translate: Translate;
  isOpen: boolean;
  close: () => void;
}
export default function ContentModal({ translate, isOpen, close }: Props) {
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState({ verseNumber: 1, id: 1 });

  const router = useRouter();

  function modalClose() {
    close();
    setSelectedChapter(1);
  }
  function handleSubmit() {
    router.push(
      `chapter/${selectedChapter}/verse/${selectedVerse.verseNumber}`,
    );
    setSelectedChapter(1);
    setSelectedVerse({ verseNumber: 1, id: 1 });
    close();
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="dark:bg-dark-100 w-5/6 max-w-4xl overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex">
                  <div className="flex w-full flex-col p-8 md:hidden">
                    <p className="text-my-orange py-2 font-semibold">
                      {translate("Chapters")}
                    </p>
                    <Listbox
                      value={selectedChapter}
                      onChange={setSelectedChapter}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="focus-visible:ring-my-orange/75 dark:bg-dark-bg relative w-full cursor-default rounded-lg bg-white py-2 pr-10 pl-3 text-left shadow-md focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block">
                            {translate("Chapter")} {selectedChapter}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="size-5 text-gray-400"
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
                          <Listbox.Options className="dark:bg-dark-bg mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                            {data.map((chapter) => (
                              <Listbox.Option
                                key={chapter.chapterNumber}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "bg-amber-100 text-amber-900"
                                      : "text-gray-900"
                                  } relative cursor-default py-2 pr-4 pl-10 select-none`
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
                                      {translate("Chapter")}{" "}
                                      {chapter.chapterNumber}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          active
                                            ? "text-amber-600"
                                            : "text-amber-600"
                                        } absolute inset-y-0 left-0 flex items-center pl-3`}
                                      >
                                        <CheckIcon
                                          className="size-5"
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
                      {translate("Verses")}
                    </p>
                    <Listbox value={selectedVerse} onChange={setSelectedVerse}>
                      <div className="relative mt-1">
                        <Listbox.Button className="focus-visible:ring-my-orange/75 dark:bg-dark-bg relative w-full cursor-default rounded-lg bg-white py-2 pr-10 pl-3 text-left shadow-md focus:outline-hidden focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block">
                            {translate("Verse")} {selectedVerse.verseNumber}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="size-5 text-gray-400"
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
                          <Listbox.Options className="dark:bg-dark-bg mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                            {data
                              .filter(
                                (chapter) =>
                                  chapter.chapterNumber === selectedChapter,
                              )[0]
                              .gitaVersesByChapterId.nodes.map((verse) => (
                                <Listbox.Option
                                  key={verse.id}
                                  className={({ active }) =>
                                    `${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-900 dark:text-gray-50"
                                    } relative cursor-default py-2 pr-4 pl-10 select-none`
                                  }
                                  value={verse}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <span
                                        className={`${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        } block truncate dark:text-gray-50`}
                                      >
                                        {translate("Verse")} {verse.verseNumber}
                                      </span>
                                      {selected ? (
                                        <span
                                          className={`${
                                            active
                                              ? "text-amber-600"
                                              : "text-amber-600"
                                          } absolute inset-y-0 left-0 flex items-center pl-3`}
                                        >
                                          <CheckIcon
                                            className="size-5"
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
                      className="bg-my-orange/80 mx-auto mt-3 w-2/3 rounded px-4 py-2 font-bold text-white"
                      onClick={handleSubmit}
                    >
                      Lets Go
                    </button>
                  </div>
                  <div className="hidden items-center justify-center md:flex">
                    <div className="flex h-full flex-1 justify-center gap-2 p-6">
                      <div className="my-auto flex flex-col gap-1">
                        {data.slice(0, 9).map((chapter) =>
                          selectedChapter === chapter.chapterNumber ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedChapter(chapter.chapterNumber);
                              }}
                              className="group bg-light-orange flex w-40 items-center justify-between rounded-lg p-2 hover:cursor-pointer"
                              key={chapter.chapterNumber}
                            >
                              <p className="text-my-orange text-base font-medium">
                                {translate("Chapter")} {chapter.chapterNumber}
                              </p>
                              <ArrowLongRightIcon className="text-my-orange h-5 w-8 opacity-100" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedChapter(chapter.chapterNumber);
                              }}
                              className="group hover:bg-light-orange dark:hover:bg-dark-bg flex w-40 items-center justify-between rounded-lg p-2 hover:cursor-pointer"
                              key={chapter.chapterNumber}
                            >
                              <p className="group-hover:text-my-orange text-base font-medium text-gray-500 dark:text-white">
                                {translate("Chapter")} {chapter.chapterNumber}
                              </p>
                              <ArrowLongRightIcon className="text-my-orange h-5 w-8 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                            </button>
                          ),
                        )}
                      </div>
                      <div className="my-auto flex flex-col gap-1">
                        {data.slice(9, 18).map((chapter) =>
                          selectedChapter === chapter.chapterNumber ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedChapter(chapter.chapterNumber);
                              }}
                              className="group bg-light-orange flex w-40 items-center justify-between rounded-lg p-2 hover:cursor-pointer"
                              key={chapter.chapterNumber}
                            >
                              <p className="text-my-orange text-base font-medium">
                                {translate("Chapter")} {chapter.chapterNumber}
                              </p>
                              <ArrowLongRightIcon className="text-my-orange h-5 w-8 opacity-100" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedChapter(chapter.chapterNumber);
                              }}
                              className="group hover:bg-light-orange dark:hover:bg-dark-bg flex w-40 items-center justify-between rounded-lg p-2 hover:cursor-pointer"
                              key={chapter.chapterNumber}
                            >
                              <p className="group-hover:text-my-orange text-base font-medium text-gray-500 dark:text-white">
                                {translate("Chapter")} {chapter.chapterNumber}
                              </p>
                              <ArrowLongRightIcon className="text-my-orange h-5 w-8 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                    <div className="bg-light-orange flex h-full flex-1 flex-col justify-start p-6">
                      <p className="text-my-orange py-2 font-semibold">
                        {translate("Chapter")} {selectedChapter}
                      </p>
                      <hr className="border-my-orange/10" />
                      <div className={`flex flex-wrap p-3`}>
                        {data
                          .filter(
                            (chapter) =>
                              chapter.chapterNumber === selectedChapter,
                          )[0]
                          .gitaVersesByChapterId.nodes.map((verse) => (
                            <LinkWithLocale
                              href={`/chapter/${selectedChapter}/verse/${verse.verseNumber}`}
                              key={verse.id}
                              prefetch={false}
                            >
                              {selectedVerse.id === verse.id ? (
                                <div
                                  onClick={modalClose}
                                  className="bg-my-orange m-px flex size-10 items-center justify-center rounded p-1.5 text-white hover:cursor-pointer"
                                >
                                  {verse.verseNumber}
                                </div>
                              ) : (
                                <div
                                  onClick={modalClose}
                                  className="hover:bg-my-orange m-px flex size-10 items-center justify-center rounded p-1.5 text-gray-500 hover:cursor-pointer hover:text-white"
                                >
                                  {verse.verseNumber}
                                </div>
                              )}
                            </LinkWithLocale>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
