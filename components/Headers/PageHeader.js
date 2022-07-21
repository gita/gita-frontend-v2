import { Fragment, useState, useEffect } from "react";
import { Disclosure, Switch } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import ContentModal from "./ContentModal";
import AudioPlayer from "./AudioPlayer";
import Settings from "../Shared/Settings";
import AuthorSettings from "../Shared/Author";
import DarkModeToggle from "./DarkModeToggle";
import useToggle from "../../hooks/useToggle";
import classNames from "../../utils/classNames";
import { useRouter } from "next/router";


const PageHeader = ({
  advanceSettings,
  setAdvanceSettings,
  languageSettings,
  setLanguageSettings,
}) => {
  const { devnagari, verseText, synonyms, translation, purport } =
    advanceSettings;
  const [advancedOptionsActive, setAdvancedOptionsActive] = useState(false);
  const [settingsIsOpen, closeSettingsModal, openSettingsModal] = useToggle();
  const [contentModalIsOpen, closeContentModal, openContentModal] = useToggle();
  const [playerIsOpen, closePlayerModal, openPlayerModal] = useToggle();
  const [
    authorSettingsIsOpen,
    closeAuthorSettingsModal,
    openAuthorSettingsModal,
  ] = useToggle();
  const [input, setInput] = useState("");
  const router = useRouter();
  const toggleClass = () => {
    setAdvancedOptionsActive(!advancedOptionsActive);
  };
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
                    {/* Current: "border-my-orange text-gray-900", Default: "border-transparent text-gray-500 " */}

                    <div className="text-gray-900 dark:text-gray-50">
                      <Link href="/">
                        <a
                          href="#"
                          className="border-transparent flex flex-col text-current items-center rounded p-2 border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                        >
                          <img className="w-6 h-6 mb-1" src="/Home.svg" />
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
                      <img className="w-6 h-6 mb-1" src="/content.svg" />
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
                      <img className="w-6 h-6 mb-1" src="/appearance.svg" />
                      Appearance
                    </button>
                    <button
                      type="button"
                      onClick={openAuthorSettingsModal}
                      className={classNames(
                        authorSettingsIsOpen
                          ? "bg-nav-hover dark:bg-dark-bg"
                          : null,
                        "border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      )}
                    >
                      <img className="w-6 h-6 mb-1" src="/language.svg" />
                      Language
                    </button>
                    {/*<Link href="/verse-parallel">
                      <a
                        href="#"
                        className="border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      >
                        <img className="w-6 h-6 mb-1" src="/Parellel.svg" />
                        Parallel Mode
                      </a>
                    </Link> */}

                    <button
                      type="button"
                      onClick={openPlayerModal}
                      className={classNames(
                        playerIsOpen ? "bg-nav-hover dark:bg-dark-bg" : null,
                        "border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      )}
                    >
                      <img className="w-6 h-6 mb-1" src="/Audio.svg" />
                      Play Audio
                    </button>

                    <button
                      type="button"
                      onClick={toggleClass}
                      className={classNames(
                        advancedOptionsActive
                          ? "bg-nav-hover dark:bg-dark-bg"
                          : null,
                        "border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      )}
                    >
                      <img className="w-6 h-6 mb-1" src="/Advanced.svg" />
                      Advanced View
                    </button>

                    <Link href="/notes">
                      <a
                        href="#"
                        className="border-transparent text-current flex flex-col items-center p-2 rounded  text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      >
                        <img className="w-6 h-6 mb-1" src="/notes.svg" />
                        Notes
                      </a>
                    </Link>
                    <Link href="/bookmark">
                      <a
                        href="#"
                        className="border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      >
                        <img
                          className="w-6 h-6 mb-1"
                          src="/bookmark-header.svg"
                        />
                        Bookmark
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-start pr-2  lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                      </div>
                      <form
                        onSubmit={handleSearch}
                        className="pt-2 relative flex text-gray-600"
                      >
                        <button
                          type="submit"
                          className="absolute left-3 top-0 mt-4 mr-4"
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
              <div className="pt-2 pb-1 space-y-1">
                {/* Current: "bg-indigo-50 border-my-orange text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <a
                  href="/"
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  Home
                </a>
                <a
                  href="#"
                  onClick={openContentModal}
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  Content
                </a>
                <a
                  href="#"
                  onClick={openSettingsModal}
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  Appearance
                </a>
                <a
                  href="#"
                  onClick={openAuthorSettingsModal}
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  Language
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  Notes
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 dark:text-white block pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900"
                >
                  Bookmark
                </a>
              </div>
              <Disclosure>
                <Disclosure.Button className="w-full flex border-t-2 border-gray-300 justify-between text-black dark:text-gray-400 pl-3 pr-4 py-2 text-base font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900 dark:hover:text-gray-900 dark:focus:text-gray-900">
                  Advanced View
                  <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:text-black" />
                </Disclosure.Button>
                <Disclosure.Panel className="text-gray-500 z-50">
                  <Switch.Group
                    as="div"
                    className="flex items-center px-4 py-2 justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        Devnagari
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={devnagari}
                      onChange={() =>
                        setAdvanceSettings((prevState) => {
                          return {
                            ...prevState,
                            devnagari: !devnagari,
                          };
                        })
                      }
                      className={classNames(
                        devnagari
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          devnagari ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  <Switch.Group
                    as="div"
                    className="flex items-center px-4 py-2 justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        Verse Text
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={verseText}
                      onChange={() =>
                        setAdvanceSettings((prevState) => {
                          return {
                            ...prevState,
                            verseText: !verseText,
                          };
                        })
                      }
                      className={classNames(
                        verseText
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          verseText ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  <Switch.Group
                    as="div"
                    className="flex items-center px-4 py-2 justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        Synonyms
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={synonyms}
                      onChange={() =>
                        setAdvanceSettings((prevState) => {
                          return {
                            ...prevState,
                            synonyms: !synonyms,
                          };
                        })
                      }
                      className={classNames(
                        synonyms
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          synonyms ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as="div"
                    className="flex items-center px-4 py-2 justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        Translation
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={translation}
                      onChange={() =>
                        setAdvanceSettings((prevState) => {
                          return {
                            ...prevState,
                            translation: !translation,
                          };
                        })
                      }
                      className={classNames(
                        translation
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          translation ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as="div"
                    className="flex items-center px-4 py-2 justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className=" font-medium text-gray-600 dark:text-gray-50"
                        passive
                      >
                        Purport
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={purport}
                      onChange={() =>
                        setAdvanceSettings((prevState) => {
                          return {
                            ...prevState,
                            purport: !purport,
                          };
                        })
                      }
                      className={classNames(
                        purport
                          ? "bg-my-orange"
                          : "bg-gray-200 dark:bg-dark-bg",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          purport ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
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
          advanceSettings={advanceSettings}
          setAdvanceSettings={setAdvanceSettings}
        />
      ) : null}
      <AudioPlayer
        playerIsOpen={playerIsOpen}
        closePlayerModal={closePlayerModal}
      />
      <ContentModal isOpen={contentModalIsOpen} close={closeContentModal} />

      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettingsModal={closeSettingsModal}
      />
      <AuthorSettings
        languageSettings={languageSettings}
        setLanguageSettings={setLanguageSettings}
        authorSettingsIsOpen={authorSettingsIsOpen}
        closeAuthorSettingsModal={closeAuthorSettingsModal}
      />
    </>
  );
};

export default  PageHeader;

const AdvancedOptions = ({ advanceSettings, setAdvanceSettings }) => {
  const { devnagari, verseText, synonyms, translation, purport } =
    advanceSettings;
  return (
    <div className="max-w-full mx-auto px-2 sm:hidden transition duration-500 ease-in-out lg:block mt-4 lg:px-8">
      <span className="flex justify-center z-0 rounded-md">
        <button
          type="button"
          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-dark-bg dark:border-dark-100 dark:text-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
        >
          <Switch
            checked={devnagari}
            onChange={() =>
              setAdvanceSettings((prevState) => {
                return {
                  ...prevState,
                  devnagari: !devnagari,
                };
              })
            }
            className={classNames(
              devnagari ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={classNames(
                devnagari ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white  shadow transform ring-0 transition ease-in-out duration-200"
              )}
            >
              <span
                className={classNames(
                  devnagari
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
                  devnagari
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
          Devnagari
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white dark:bg-dark-bg dark:border-dark-100 dark:text-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
        >
          <Switch
            checked={verseText}
            onChange={() =>
              setAdvanceSettings((prevState) => {
                return {
                  ...prevState,
                  verseText: !verseText,
                };
              })
            }
            className={classNames(
              verseText ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={classNames(
                verseText ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            >
              <span
                className={classNames(
                  verseText
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
          Verse Text
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white dark:bg-dark-bg dark:border-dark-100 dark:text-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
        >
          <Switch
            checked={synonyms}
            onChange={() =>
              setAdvanceSettings((prevState) => {
                return {
                  ...prevState,
                  synonyms: !synonyms,
                };
              })
            }
            className={classNames(
              synonyms ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={classNames(
                synonyms ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            >
              <span
                className={classNames(
                  synonyms
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
          Synonyms
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2  border border-gray-300 bg-white dark:bg-dark-bg dark:border-dark-100 dark:text-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
        >
          <Switch
            checked={translation}
            onChange={() =>
              setAdvanceSettings((prevState) => {
                return {
                  ...prevState,
                  translation: !translation,
                };
              })
            }
            className={classNames(
              translation ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={classNames(
                translation ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            >
              <span
                className={classNames(
                  translation
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
          Translation
        </button>

        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-dark-bg dark:border-dark-100 dark:text-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
        >
          <Switch
            checked={purport}
            onChange={() =>
              setAdvanceSettings((prevState) => {
                return {
                  ...prevState,
                  purport: !purport,
                };
              })
            }
            className={classNames(
              purport ? "bg-my-orange" : "bg-gray-200 dark:bg-dark-100",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              className={classNames(
                purport ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            >
              <span
                className={classNames(
                  purport
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
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
          Purport
        </button>
      </span>
    </div>
  );
};
