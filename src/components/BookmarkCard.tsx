"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { classNames } from "shared/functions";

const Bookmarkcard = () => {
  return (
    <div className="mt-4 flex items-baseline gap-2 border-b border-gray-300 pb-4 font-inter">
      <div>
        <Image
          src="bookmark-header.svg"
          alt="bookmark icon"
          width={24}
          height={24}
        />
      </div>
      <div>
        <h3 className="font-bold text-black"> Verse 10.18</h3>
        <p className="mt-3 text-gray-400">
          Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu
          assembled in the place of pilgrimage at Kurukṣetra, desiring to fight,
          what did they do?
        </p>
      </div>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 focus:ring-offset-gray-100">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon className="size-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "flex items-center gap-3 px-4 py-2 text-sm",
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg>
                      Go To Verse
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-red-900" : "text-red-700",
                        "flex items-center gap-3 px-4 py-2 text-sm",
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Bookmarkcard;
