import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function AudioPlayer({ isOpen, closeModal }) {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 -top-20 z-10 overflow-y-auto"
          onClose={closeModal}
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  BG 1.1{" "}
                </Dialog.Title>
                <div className="mt-2 border-b pb-8">
                  <p className="text-sm text-gray-500">
                    dhṛitarāśhtra uvācha dharma-kṣhetre kuru-kṣhetre samavetā
                    yuyutsavaḥ māmakāḥ pāṇḍavāśhchaiva kimakurvata sañjaya
                  </p>
                </div>

                <div className="flex justify-between mt-4 px-4">
                  <img src="/rewind.svg" />
                  <img src="/play.svg" />
                  <img src="/forward.svg" />
                </div>

                <div className="mt-4">
                  <span className=" w-full z-0 mt-4 flex shadow-sm rounded-md">
                    <button
                      type="button"
                      className="flex-grow items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                    >
                      0.75x
                    </button>
                    <button
                      type="button"
                      className="-ml-px flex-grow items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                    >
                      1x
                    </button>

                    <button
                      type="button"
                      className="-ml-px flex-grow items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                    >
                      1.5x
                    </button>
                    <button
                      type="button"
                      className="-ml-px flex-grow items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
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
