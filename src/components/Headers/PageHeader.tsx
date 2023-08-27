"use client";

import { lazy, Suspense, useState } from "react";
import { Disclosure, Switch } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

import LinkWithLocale from "components/LinkWithLocale";

import useEnvironment from "../../hooks/useEnvironment";
import useToggle from "../../hooks/useToggle";
import classNames from "../../utils/classNames";
import AuthorSettings from "../AuthorSettings";
import NotesModal from "../NotesModal";
import Settings from "../Settings";
import ContentModal from "./ContentModal";
import DarkModeToggle from "./DarkModeToggle";
import LanguageDropdown from "./LanguageDropdown";

const AudioPlayer = lazy(() => import("./AudioPlayer"));

interface Props {
  advancedSettings: AdvancedSettings;
  updateAdvancedSettings: (update: Partial<AdvancedSettings>) => void;
  translate: Translate;
  locale: Locale;
}

const PageHeader = ({
  advancedSettings,
  updateAdvancedSettings,
  translate,
  locale,
}: Props) => {
  const [advancedOptionsActive, setAdvancedOptionsActive] = useState(false);

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
  const {
    data: playerIsOpen,
    onClose: closePlayerModal,
    onOpen: openPlayerModal,
  } = useToggle();
  const {
    data: authorSettingsIsOpen,
    onClose: closeAuthorSettingsModal,
    onOpen: openAuthorSettingsModal,
  } = useToggle();
  const {
    data: notesSettingsIsOpen,
    onClose: closeNotesSettingsModal,
    onOpen: openNotesSettingsModal,
  } = useToggle();
  const [input, setInput] = useState("");
  const router = useRouter();
  const [isProduction] = useEnvironment();

  const { devanagari, verseText, synonyms, translation, purport } =
    advancedSettings;

  const toggleClass = () => setAdvancedOptionsActive(!advancedOptionsActive);

  function handleSearch(e) {
    e.preventDefault();

    if (input?.trim().length <= 0) {
      return;
    }
    router.push(`/search${locale === "en" ? "" : `/${locale}`}?query=${input}`);
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
                    {/* Current: "border-my-orange text-gray-900", Default: "border-transparent text-gray-500 " */}

                    <div className="text-gray-900 dark:text-gray-50">
                      <LinkWithLocale
                        href="/"
                        className="flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-current hover:bg-nav-hover dark:hover:bg-dark-bg"
                      >
                        <Image
                          className="mb-1 h-6 w-6"
                          src="/Home.svg"
                          alt="home icon"
                          width={24}
                          height={24}
                        />
                        {translate("Home")}
                      </LinkWithLocale>
                    </div>
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
                        alt="content icon"
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
                        alt="appearance icon"
                        width={28}
                        height={24}
                      />
                      {translate("Appearance")}
                    </button>
                    <button
                      type="button"
                      onClick={openAuthorSettingsModal}
                      className={classNames(
                        authorSettingsIsOpen
                          ? "bg-nav-hover dark:bg-dark-bg"
                          : null,
                        "flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-current hover:bg-nav-hover dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        className="mb-1 h-6 w-6"
                        src="/language.svg"
                        alt="source icon"
                        width={24}
                        height={24}
                      />
                      {translate("Source")}
                    </button>

                    <button
                      type="button"
                      onClick={openPlayerModal}
                      className={classNames(
                        playerIsOpen ? "bg-nav-hover dark:bg-dark-bg" : null,
                        "flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-current hover:bg-nav-hover dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        className="mb-1 h-6 w-6"
                        src="/Audio.svg"
                        alt="audio icon"
                        width={24}
                        height={24}
                      />
                      {translate("Play Audio")}
                    </button>

                    <button
                      type="button"
                      onClick={toggleClass}
                      className={classNames(
                        advancedOptionsActive
                          ? "bg-nav-hover dark:bg-dark-bg"
                          : null,
                        "flex flex-col items-center rounded border-b-2 border-transparent p-2 text-sm font-medium text-current hover:bg-nav-hover dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        className="mb-1 h-6 w-6"
                        src="/Advanced.svg"
                        alt="advanced icon"
                        width={24}
                        height={24}
                      />
                      {translate("Advanced View")}
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-start pr-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      {translate("Search")}
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
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
                  </div>
                  <DarkModeToggle />
                  <LanguageDropdown locale={locale} align="right" />
                </div>
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-start rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange">
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
              <div className="space-y-1 pb-1 pt-2">
                <LinkWithLocale
                  href="/"
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Home")}
                </LinkWithLocale>
                <button
                  type="button"
                  onClick={openContentModal}
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Content")}
                </button>
                <button
                  type="button"
                  onClick={openSettingsModal}
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Appearance")}
                </button>
                <button
                  type="button"
                  onClick={openAuthorSettingsModal}
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Source")}
                </button>
                <button
                  type="button"
                  onClick={openPlayerModal}
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Play Audio")}
                </button>
                <button
                  type="button"
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Notes")}
                </button>
                <button
                  type="button"
                  className="block border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  {translate("Bookmark")}
                </button>
              </div>

              <Disclosure>
                <Disclosure.Button className="flex w-full justify-between border-t-2 border-gray-300 py-2 pl-3 pr-4 text-base font-medium text-black hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-gray-400 dark:hover:text-gray-900 dark:focus:text-gray-900">
                  {translate("Advanced View")}
                  <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:text-black" />
                </Disclosure.Button>
                <Disclosure.Panel className="z-50 text-gray-500">
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between px-4 py-2"
                  >
                    <span className="flex grow flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        {translate("Devanagari")}
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={devanagari}
                      onChange={() =>
                        updateAdvancedSettings({ devanagari: !devanagari })
                      }
                      className={classNames(
                        devanagari
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          devanagari ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between px-4 py-2"
                  >
                    <span className="flex grow flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        {translate("Verse Text")}
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={verseText}
                      onChange={() =>
                        updateAdvancedSettings({ verseText: !verseText })
                      }
                      className={classNames(
                        verseText
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          verseText ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between px-4 py-2"
                  >
                    <span className="flex grow flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        {translate("Synonyms")}
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={synonyms}
                      onChange={() =>
                        updateAdvancedSettings({ synonyms: !synonyms })
                      }
                      className={classNames(
                        synonyms
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          synonyms ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between px-4 py-2"
                  >
                    <span className="flex grow flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        {translate("Translation")}
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={translation}
                      onChange={() =>
                        updateAdvancedSettings({ translation: !translation })
                      }
                      className={classNames(
                        translation
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          translation ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between px-4 py-2"
                  >
                    <span className="flex grow flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        {translate("Purport")}
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={purport}
                      onChange={() =>
                        updateAdvancedSettings({ purport: !purport })
                      }
                      className={classNames(
                        purport
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          purport ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </Disclosure.Panel>
              </Disclosure>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {advancedOptionsActive ? (
        <AdvancedOptions
          advancedSettings={advancedSettings}
          updateAdvancedSettings={updateAdvancedSettings}
          translate={translate}
        />
      ) : null}
      {playerIsOpen && (
        <Suspense
          fallback={<div className="absolute">{translate("Loading")}</div>}
        >
          <AudioPlayer
            playerIsOpen={playerIsOpen}
            closePlayerModal={closePlayerModal}
            translate={translate}
          />
        </Suspense>
      )}
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
      <AuthorSettings
        authorSettingsIsOpen={authorSettingsIsOpen}
        closeAuthorSettingsModal={closeAuthorSettingsModal}
        translate={translate}
        locale={locale}
      />
      <NotesModal
        notesSettingsIsOpen={notesSettingsIsOpen}
        closeNotesSettingsModal={closeNotesSettingsModal}
      />
    </>
  );
};

export default PageHeader;

type TAdvancedOptions = Partial<
  Omit<Props, "languageSettings" | "setLanguageSettings">
> & {
  advancedSettings: AdvancedSettings;
  updateAdvancedSettings: (update: Partial<AdvancedSettings>) => void;
  translate: Translate;
};

const AdvancedOptions = ({
  advancedSettings,
  updateAdvancedSettings,
  translate,
}: TAdvancedOptions) => {
  const { devanagari, verseText, synonyms, translation, purport } =
    advancedSettings;

  return (
    <div className="mx-auto mt-4 max-w-full px-2 transition duration-500 ease-in-out sm:hidden lg:block lg:px-8">
      <span className="z-0 flex justify-center rounded-md">
        <div className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:border-dark-100 dark:bg-dark-bg dark:text-gray-50">
          <Switch
            checked={devanagari}
            onChange={() => updateAdvancedSettings({ devanagari: !devanagari })}
            className={classNames(
              devanagari ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative mr-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
            )}
          >
            <span className="sr-only">{translate("Use setting")}</span>
            <span
              className={classNames(
                devanagari ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 transform rounded-full  bg-white shadow ring-0 transition duration-200 ease-in-out",
              )}
            >
              <span
                className={classNames(
                  devanagari
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  devanagari
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-my-orange"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          {translate("Devanagari")}
        </div>
        <div className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:border-dark-100 dark:bg-dark-bg dark:text-gray-50">
          <Switch
            checked={verseText}
            onChange={() => updateAdvancedSettings({ verseText: !verseText })}
            className={classNames(
              verseText ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative mr-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
            )}
          >
            <span className="sr-only">{translate("Use setting")}</span>
            <span
              className={classNames(
                verseText ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              )}
            >
              <span
                className={classNames(
                  verseText
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  verseText
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-my-orange"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          {translate("Verse Text")}
        </div>
        <div className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:border-dark-100 dark:bg-dark-bg dark:text-gray-50">
          <Switch
            checked={synonyms}
            onChange={() => updateAdvancedSettings({ synonyms: !synonyms })}
            className={classNames(
              synonyms ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative mr-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
            )}
          >
            <span className="sr-only">{translate("Use setting")}</span>
            <span
              className={classNames(
                synonyms ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              )}
            >
              <span
                className={classNames(
                  synonyms
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  synonyms
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-my-orange"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          {translate("Synonyms")}
        </div>
        <div className="relative -ml-px inline-flex items-center border border-gray-300  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:border-dark-100 dark:bg-dark-bg dark:text-gray-50">
          <Switch
            checked={translation}
            onChange={() =>
              updateAdvancedSettings({ translation: !translation })
            }
            className={classNames(
              translation ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative mr-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
            )}
          >
            <span className="sr-only">{translate("Use setting")}</span>
            <span
              className={classNames(
                translation ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              )}
            >
              <span
                className={classNames(
                  translation
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  translation
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-my-orange"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          {translate("Translation")}
        </div>

        <div className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:border-dark-100 dark:bg-dark-bg dark:text-gray-50">
          <Switch
            checked={purport}
            onChange={() => updateAdvancedSettings({ purport: !purport })}
            className={classNames(
              purport ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative mr-2 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
            )}
          >
            <span className="sr-only">{translate("Use setting")}</span>
            <span
              className={classNames(
                purport ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              )}
            >
              <span
                className={classNames(
                  purport
                    ? "opacity-0 duration-100 ease-out"
                    : "opacity-100 duration-200 ease-in",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  purport
                    ? "opacity-100 duration-200 ease-in"
                    : "opacity-0 duration-100 ease-out",
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                )}
                aria-hidden="true"
              >
                <svg
                  className="h-3 w-3 text-my-orange"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                </svg>
              </span>
            </span>
          </Switch>
          {translate("Commentary")}
        </div>
      </span>
    </div>
  );
};
