import { Dispatch, SetStateAction } from "react";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

function Modal({ modalVisible, setModalVisible }: Props) {
  return (
    <Transition.Root show={modalVisible} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={setModalVisible}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left  shadow-xl transition-all sm:w-full sm:max-w-sm">
              <div>
              <div className="z-50 inline-block  overflow-hidden rounded-lg bg-white  text-left align-bottom shadow-xl transition-all duration-200 dark:bg-dark-100 sm:mt-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <div >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-dark-bg ">
                <svg
                  className="h-6 w-6 text-yellow-400"
                  x-description="Heroicon name: outline/check"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="mt-3 px-5 text-center sm:mt-5">
                <p
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                  id="modal-title"
                >
                  Subscription Successful!
                </p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Congratulations! You have now subscribed to the daily
                    &quot;Shloka of the Day&quot; newsletter.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="mx-auto flex w-1/3 justify-center rounded-md border border-transparent bg-my-orange px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
                onClick={() => setModalVisible(false)}
              >
                I got it
              </button>
            </div>
          </div>

              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  );
}

export default Modal;