import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import data from "../../constant/contentModal.json";
import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
export default function ContentModal({ isOpen, close }) {
  const [selectedChapter, setSelectedChapter] = useState(1);

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
                <div className="flex items-center">
                  <div className="grid p-4 grid-cols-2">
                    <div className="">
                      {" "}
                      {Array(9)
                        .fill()
                        .map((_, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedChapter(index + 1)}
                          >
                            <a className="group p-1 flex items-start rounded-lg hover:bg-my-orange/5 dark:hover:bg-dark-bg hover:cursor-pointer">
                              <div className=" flex justify-between items-center ml-4">
                                <p className="text-base font-medium text-gray-500 dark:text-white group-hover:text-my-orange">
                                  Chapter {index + 1}
                                </p>
                                <ArrowNarrowRightIcon
                                  className="h-5 w-5 ml-4 text-my-orange -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                    <div className="">
                      {Array(9)
                        .fill()
                        .map((_, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedChapter(index + 10)}
                          >
                            <a className="group p-1 flex items-start rounded-lg hover:bg-my-orange/5 dark:hover:bg-dark-bg hover:cursor-pointer">
                              <div className=" flex justify-between items-center ml-4">
                                <p className="text-base font-medium text-gray-500 dark:text-white group-hover:text-my-orange">
                                  Chapter {index + 10}
                                </p>
                                <ArrowNarrowRightIcon
                                  className="h-5 w-5 ml-4 text-my-orange -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-transform duration-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex justify-center h-full flex-1 flex-col bg-light-orange  p-6">
                    <p className="text-my-orange py-2 font-semibold">
                      Chapter {selectedChapter}
                    </p>
                    <hr className="border-my-orange/10" />
                    <div className={`flex p-3 flex-wrap `}>
                      {Array(
                        data.filter(
                          (chapter) => chapter.chapterNumber === selectedChapter
                        )[0].gitaVersesByChapterId.totalCount
                      )
                        .fill()
                        .map((_verse, index) => (
                          <div
                            onClick={() => {}}
                            className={`flex justify-center items-center h-10 w-10 p-1.5 m-px text-gray-500 rounded hover:cursor-pointer hover:bg-my-orange hover:text-white 
                             
                           
          `}
                          >
                            {index + 1}
                          </div>
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
