import { Fragment, useState, useEffect } from "react";
import { Disclosure, Switch } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import AudioPlayer from "./AudioPlayer";
import Settings from "../Shared/Settings";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PageHeader = () => {
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [advancedOptionsActive, setAdvancedOptionsActive] = useState(false);
  const [playerIsOpen, setplayerIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  function closePlayerModal() {
    setplayerIsOpen(false);
  }

  function openPlayerModal() {
    setplayerIsOpen(true);
  }

  function openSettingsModal() {
    setSettingsIsOpen(true);
  }

  function closeSettingsModal() {
    setSettingsIsOpen(false);
  }

  const toggleClass = () => {
    setAdvancedOptionsActive(!advancedOptionsActive);
  };
  useEffect(() => {
    console.log(router.route);
    if (router.route == "/chapter") {
      setShowMenuItems(true);
      console.log(showMenuItems);
    } else {
      setShowMenuItems(false);
      console.log(showMenuItems);
    }
  });
  return (
    <>
      <Disclosure as='nav' className='bg-white shadow font-inter'>
        {({ open }) => (
          <>
            <div className='max-w-full mx-auto px-2 sm:px-4 lg:px-8'>
              <div className='flex justify-between h-16'>
                <div className='flex px-2 lg:px-0'>
                  <div className='hidden items-center py-2 lg:flex lg:space-x-4'>
                    {/* Current: "border-my-orange text-gray-900", Default: "border-transparent text-gray-500 " */}

                    <div className=''>
                      <Link href='/'>
                        <a
                          href='#'
                          className='border-transparent flex flex-col text-gray-900  items-center rounded p-2 border-b-2 text-sm font-medium hover:bg-nav-hover'>
                          <img className='w-6 h-6' src='/Home.svg' />
                          Home
                        </a>
                      </Link>
                    </div>
                    <Link href='/'>
                      <a
                        href='#'
                        className='border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover'>
                        <img className='w-6 h-6' src='/content.svg' />
                        Content
                      </a>
                    </Link>
                    <Link href='#'>
                      <a
                        href='#'
                        onClick={openSettingsModal}
                        className={classNames(
                          settingsIsOpen ? "bg-nav-hover" : null,
                          "border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"
                        )}>
                        <img className='w-6 h-6' src='/appearance.svg' />
                        Appearance
                      </a>
                    </Link>

                    <Link href='/verseParallel'>
                      <a
                        href='#'
                        className='border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover'>
                        <img className='w-6 h-6' src='/Parellel.svg' />
                        Parallel Mode
                      </a>
                    </Link>

                    <Link href='#'>
                      <a
                        href='#'
                        onClick={openPlayerModal}
                        className={classNames(
                          playerIsOpen ? "bg-nav-hover" : null,
                          "border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"
                        )}>
                        <img className='w-6 h-6' src='/Audio.svg' />
                        Play Audio
                      </a>
                    </Link>

                    <Link href=''>
                      <a

                        href="#"
                        className={
                          advancedOptionsActive
                            ? "bg-nav-hover"
                            : "bg-nav-hover"
                        }
                        onClick={toggleClass}
                        className={classNames(
                          advancedOptionsActive ? "bg-nav-hover" : null,
                          "border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"

                        )}
                      >
                        <img className="w-6 h-6" src="/Advanced.svg" />
                        Advanced View{" "}
                      </a>
                    </Link>

                    <Link href='/notes'>
                      <a
                        href='#'
                        className='border-transparent   text-gray-900  flex flex-col items-center p-2 rounded  text-sm font-medium hover:bg-nav-hover'>
                        <img className='w-6 h-6' src='/notes.svg' />
                        Notes
                      </a>
                    </Link>
                    <Link href='/bookmark'>
                      <a
                        href='#'
                        className='border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover'>
                        <img className='w-6 h-6' src='/bookmark-header.svg' />
                        Bookmark
                      </a>
                    </Link>
                  </div>
                </div>
                <div className='flex-1 flex items-center justify-start pr-2  lg:ml-6 lg:justify-end'>
                  <div className='max-w-lg w-full lg:max-w-xs'>
                    <label htmlFor='search' className='sr-only'>
                      Search
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <SearchIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                      <input
                        id='search'
                        name='search'
                        className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-my-orange focus:border-my-orange sm:text-sm'
                        placeholder='Search'
                        type='search'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex items-center lg:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='inline-flex items-center justify-start p-2 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='lg:hidden'>
              <div className='pt-2 pb-3 space-y-1'>
                {/* Current: "bg-indigo-50 border-my-orange text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <a
                  href='#'
                  className=' border-my-orange text-black bg-box-bg block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Home
                </a>
                <a
                  href='#'
                  className='border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Content
                </a>
                <a
                  href='#'
                  className='border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Appearance
                </a>
                <a
                  href='#'
                  className='border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Notes
                </a>

                <a
                  href='#'
                  className='border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Bookmark
                </a>
              </div>
              <Disclosure>
                <Disclosure.Button className='w-full flex border-t justify-between order-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800  pl-3 pr-4 py-2 border-l-4 text-base font-medium'>
                  Advanced View
                  <ChevronDownIcon className='ml-2 h-5 w-5 group-hover:text-black' />
                </Disclosure.Button>
                <Disclosure.Panel className='text-gray-500 z-50'>
                  <Switch.Group
                    as='div'
                    className='flex items-center px-4 py-2 justify-between'>
                    <span className='flex-grow flex flex-col'>
                      <Switch.Label
                        as='span'
                        className=' font-medium text-gray-600'
                        passive>
                        Devnagari
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}>
                      <span
                        aria-hidden='true'
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  <Switch.Group
                    as='div'
                    className='flex items-center px-4 py-2 justify-between'>
                    <span className='flex-grow flex flex-col'>
                      <Switch.Label
                        as='span'
                        className=' font-medium text-gray-600'
                        passive>
                        Verse Text
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}>
                      <span
                        aria-hidden='true'
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>

                  <Switch.Group
                    as='div'
                    className='flex items-center px-4 py-2 justify-between'>
                    <span className='flex-grow flex flex-col'>
                      <Switch.Label
                        as='span'
                        className=' font-medium text-gray-600'
                        passive>
                        Synonyms
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}>
                      <span
                        aria-hidden='true'
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as='div'
                    className='flex items-center px-4 py-2 justify-between'>
                    <span className='flex-grow flex flex-col'>
                      <Switch.Label
                        as='span'
                        className=' font-medium text-gray-600'
                        passive>
                        Transition
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}>
                      <span
                        aria-hidden='true'
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                  <Switch.Group
                    as='div'
                    className='flex items-center px-4 py-2 justify-between'>
                    <span className='flex-grow flex flex-col'>
                      <Switch.Label
                        as='span'
                        className=' font-medium text-gray-600'
                        passive>
                        Purport
                      </Switch.Label>
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}>
                      <span
                        aria-hidden='true'
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
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

      {advancedOptionsActive ? <AppearanceOptions /> : null}
      <AudioPlayer
        playerIsOpen={playerIsOpen}
        closePlayerModal={closePlayerModal}
      />
      <Settings
        settingsIsOpen={settingsIsOpen}
        closeSettingsModal={closeSettingsModal}
      />
    </>
  );
};

export default PageHeader;

const AppearanceOptions = () => {
  const [enabledDevnagari, setEnabledDevnagari] = useState(false);
  const [enabledVerseText, setEnabledVerseText] = useState(false);
  const [enabledSynomyms, setEnabledSynomyms] = useState(false);
  const [enabledTranslation, setEnabledTranslation] = useState(false);
  const [enabledPurport, setEnabledPurport] = useState(false);

  return (
    <div className='max-w-full mx-auto px-2 sm:hidden transition duration-500 ease-in-out lg:block mt-10 lg:px-8'>
      <span className='flex justify-center  z-0 flex rounded-md'>
        <button
          type='button'
          className='relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange'>
          <Switch
            checked={enabledDevnagari}
            onChange={setEnabledDevnagari}
            className={classNames(
              enabledDevnagari ? "bg-my-orange" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}>
            <span className='sr-only'>Use setting</span>
            <span
              className={classNames(
                enabledDevnagari ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}>
              <span
                className={classNames(
                  enabledDevnagari
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-gray-400'
                  fill='none'
                  viewBox='0 0 12 12'>
                  <path
                    d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  enabledDevnagari
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-my-orange'
                  fill='currentColor'
                  viewBox='0 0 12 12'>
                  <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                </svg>
              </span>
            </span>
          </Switch>
          Devnagari
        </button>
        <button
          type='button'
          className='-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange'>
          <Switch
            checked={enabledVerseText}
            onChange={setEnabledVerseText}
            className={classNames(
              enabledVerseText ? "bg-my-orange" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}>
            <span className='sr-only'>Use setting</span>
            <span
              className={classNames(
                enabledVerseText ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}>
              <span
                className={classNames(
                  enabledVerseText
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-gray-400'
                  fill='none'
                  viewBox='0 0 12 12'>
                  <path
                    d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  enabledVerseText
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-my-orange'
                  fill='currentColor'
                  viewBox='0 0 12 12'>
                  <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                </svg>
              </span>
            </span>
          </Switch>
          Verse Text
        </button>
        <button
          type='button'
          className='-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange'>
          <Switch
            checked={enabledSynomyms}
            onChange={setEnabledSynomyms}
            className={classNames(
              enabledSynomyms ? "bg-my-orange" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}>
            <span className='sr-only'>Use setting</span>
            <span
              className={classNames(
                enabledSynomyms ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}>
              <span
                className={classNames(
                  enabledSynomyms
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-gray-400'
                  fill='none'
                  viewBox='0 0 12 12'>
                  <path
                    d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  enabledSynomyms
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-my-orange'
                  fill='currentColor'
                  viewBox='0 0 12 12'>
                  <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                </svg>
              </span>
            </span>
          </Switch>
          Synonyms
        </button>

        <button
          type='button'
          className='-ml-px relative inline-flex items-center px-4 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange'>
          <Switch
            checked={enabledTranslation}
            onChange={setEnabledTranslation}
            className={classNames(
              enabledTranslation ? "bg-my-orange" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}>
            <span className='sr-only'>Use setting</span>
            <span
              className={classNames(
                enabledTranslation ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}>
              <span
                className={classNames(
                  enabledTranslation
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-gray-400'
                  fill='none'
                  viewBox='0 0 12 12'>
                  <path
                    d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  enabledTranslation
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-my-orange'
                  fill='currentColor'
                  viewBox='0 0 12 12'>
                  <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                </svg>
              </span>
            </span>
          </Switch>
          Translation
        </button>

        <button
          type='button'
          className='-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange'>
          <Switch
            checked={enabledPurport}
            onChange={setEnabledPurport}
            className={classNames(
              enabledPurport ? "bg-my-orange" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 mr-2 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            )}>
            <span className='sr-only'>Use setting</span>
            <span
              className={classNames(
                enabledPurport ? "translate-x-5" : "translate-x-0",
                "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}>
              <span
                className={classNames(
                  enabledPurport
                    ? "opacity-0 ease-out duration-100"
                    : "opacity-100 ease-in duration-200",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-gray-400'
                  fill='none'
                  viewBox='0 0 12 12'>
                  <path
                    d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                    stroke='currentColor'
                    strokeWidth={2}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span
                className={classNames(
                  enabledPurport
                    ? "opacity-100 ease-in duration-200"
                    : "opacity-0 ease-out duration-100",
                  "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
                )}
                aria-hidden='true'>
                <svg
                  className='h-3 w-3 text-my-orange'
                  fill='currentColor'
                  viewBox='0 0 12 12'>
                  <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
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
