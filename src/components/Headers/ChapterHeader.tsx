"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

import LinkWithLocale from "components/LinkWithLocale";

import useToggle from "../../hooks/useToggle";
import classNames from "../../utils/classNames";
import Settings from "../Settings";
import ContentModal from "./ContentModal";
import DarkModeToggle from "./DarkModeToggle";
import LanguageDropdown from "./LanguageDropdown";

type Props = {
  locale: Locale;
  translate: Translate;
};

const ChapterHeader = (props: Props) => {
  const { locale, translate } = props;

  const [input, setInput] = useState("");
  const {
    data: settingsIsOpen,
    onClose: closeSettingsModal,
    onOpen: openSettingsModal,
  } = useToggle();
  const {
    data: contentModalIsOpen,
    onClose: closeContentModal,
    onOpen: openContentModal,
  } = useToggle();
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();

    if (input?.trim().length <= 0) {
      return;
    }
    router.push(`/search?query=${input}`);
  }
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white font-inter shadow dark:bg-dark-100"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full px-2 sm:px-4 md:py-1 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="hidden items-center py-2 lg:flex lg:space-x-4">
                    <LinkWithLocale
                      href="/"
                      className="flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-gray-900 hover:bg-nav-hover dark:text-gray-50 dark:hover:bg-dark-bg"
                    >
                      <Image
                        className="mb-1 h-6 w-6"
                        src="/Home.svg"
                        alt="Home"
                        width={24}
                        height={24}
                      />
                      {translate("Home")}
                    </LinkWithLocale>
                    <button
                      type="button"
                      onClick={openContentModal}
                      className={classNames(
                        contentModalIsOpen
                          ? "bg-nav-hover dark:bg-dark-bg"
                          : null,
                        "flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-current hover:bg-nav-hover dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        className="mb-1 h-6 w-6"
                        src="/content.svg"
                        alt="Home"
                        width={24}
                        height={24}
                      />
                      {translate("Content")}
                    </button>
                    <button
                      type="button"
                      onClick={openSettingsModal}
                      className={classNames(
                        settingsIsOpen ? "bg-nav-hover dark:bg-dark-bg" : null,
                        "flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-current hover:bg-nav-hover dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        className="mb-1 h-6 w-7"
                        src="/appearance.svg"
                        alt="Home"
                        width={24}
                        height={24}
                      />
                      {translate("Appearance")}
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start pr-2  lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      {translate("Search")}
                    </label>
                    <form
                      onSubmit={handleSearch}
                      className="relative flex text-gray-600"
                    >
                      <button
                        type="submit"
                        className="absolute left-3 top-0 mr-4 mt-2"
                      >
                        <SearchIcon
                          className="h-5 w-5 text-gray-400 dark:text-gray-50"
                          aria-hidden="true"
                        />
                      </button>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder:text-gray-500 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange focus:placeholder:text-gray-400 dark:bg-dark-100 dark:placeholder:text-gray-50 sm:text-sm"
                        placeholder={translate("Search")}
                        type="search"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                    </form>
                  </div>
                  <DarkModeToggle />
                  <LanguageDropdown locale={locale} align="right" />
                </div>
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-start rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange">
                    <span className="sr-only">
                      {translate("Open main menu")}
                    </span>
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
              <div className="space-y-1 pb-3 pt-2">
                {/* Current: "bg-indigo-50 border-my-orange text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <LinkWithLocale
                  href="/"
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Home")}
                </LinkWithLocale>
                <button
                  onClick={openContentModal}
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Content")}
                </button>
                <button
                  onClick={openSettingsModal}
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Appearance")}
                </button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <ContentModal
        translate={translate}
        isOpen={contentModalIsOpen}
        close={closeContentModal}
      />
      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettingsModal={closeSettingsModal}
        translate={translate}
      />
    </>
  );
};

export default ChapterHeader;
