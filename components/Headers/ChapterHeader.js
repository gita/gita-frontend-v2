import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import Settings from "../Shared/Settings";
import DarkModeToggle from "./DarkModeToggle";
import ContentModal from "./ContentModal";
import useToggle from "../../hooks/useToggle";
import classNames from "../../utils/classNames";
import { useState } from "react";
import { useRouter } from "next/router";

const ChapterHeader = () => {
  const [input, setInput] = useState("");
  const [settingsIsOpen, closeSettingsModal, openSettingsModal] = useToggle();
  const [contentModalIsOpen, closeContentModal, openContentModal] = useToggle();

  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();

    if (input?.trim().length <= 0) {
      return;
    }
    router.push(`/search?query=${input}`, undefined, { shallow: true });
  }
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white dark:bg-dark-100 shadow font-inter"
      >
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8 md:py-1">
              <div className="flex justify-between h-16">
                <div className="flex px-2 lg:px-0">
                  <div className="hidden items-center py-2 lg:flex lg:space-x-4">
                    <div className="text-gray-900 dark:text-gray-50">
                      <Link href="/">
                        <a className="border-transparent flex flex-col text-current items-center rounded p-2 border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg">
                          <Image
                            className="w-6 h-6 mb-1"
                            src="/Home.svg"
                            alt="Home"
                            width={24}
                            height={24}
                          />
                          Home
                        </a>
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={openContentModal}
                      className={classNames(
                        contentModalIsOpen
                          ? "bg-nav-hover dark:bg-dark-bg"
                          : null,
                        "border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      )}
                    >
                      <Image
                        className="w-6 h-6 mb-1"
                        src="/content.svg"
                        alt="Home"
                        width={24}
                        height={24}
                      />
                      Content
                    </button>
                    <button
                      type="button"
                      onClick={openSettingsModal}
                      className={classNames(
                        settingsIsOpen ? "bg-nav-hover dark:bg-dark-bg" : null,
                        "border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      )}
                    >
                      <Image
                        className="w-7 h-6 mb-1"
                        src="/appearance.svg"
                        alt="Home"
                        width={24}
                        height={24}
                      />
                      Appearance
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-start pr-2  lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <form
                      onSubmit={handleSearch}
                      className="relative flex text-gray-600"
                    >
                      <button
                        type="submit"
                        className="absolute left-3 top-0 mt-2 mr-4"
                      >
                        <SearchIcon
                          className="h-5 w-5 text-gray-400 dark:text-gray-50"
                          aria-hidden="true"
                        />
                      </button>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-dark-100 placeholder-gray-500 dark:placeholder-gray-50 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-my-orange focus:border-my-orange sm:text-sm"
                        placeholder="Search"
                        type="search"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                    </form>
                  </div>
                  <DarkModeToggle />
                </div>
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-start p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-my-orange text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <Link href="/">
                  <a className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 dark:hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:focus:text-gray-900">
                    Home
                  </a>
                </Link>
                <a
                  href="#"
                  onClick={openContentModal}
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 dark:hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:focus:text-gray-900"
                >
                  Content
                </a>
                <a
                  href="#"
                  onClick={openSettingsModal}
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 dark:hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:focus:text-gray-900"
                >
                  Appearance
                </a>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <ContentModal isOpen={contentModalIsOpen} close={closeContentModal} />
      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettingsModal={closeSettingsModal}
      />
    </>
  );
};

export default ChapterHeader;
