import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import AudioPlayer from "./AudioPlayer";
import Settings from "../Shared/Settings";
import DarkModeToggle from "./DarkModeToggle";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ChapterHeader = () => {
  const router = useRouter();
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [playerIsOpen, setplayerIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  function closePlayerModal() {
    setplayerIsOpen(false);
  }

  function openSettingsModal() {
    setSettingsIsOpen(true);
  }

  function closeSettingsModal() {
    setSettingsIsOpen(false);
  }

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
      <Disclosure
        as="nav"
        className="bg-white dark:bg-dark-100 shadow font-inter"
      >
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex px-2 lg:px-0">
                  <div className="hidden items-center py-2 lg:flex lg:space-x-4">
                    <div className="text-gray-900 dark:text-gray-50">
                      <Link href="/">
                        <a
                          href="#"
                          className="border-transparent flex flex-col text-current items-center rounded p-2 border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                        >
                          <img className="w-6 h-6" src="/Home.svg" />
                          Home
                        </a>
                      </Link>
                    </div>
                    <Link href="/">
                      <a
                        href="#"
                        className="border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                      >
                        <img className="w-6 h-6" src="/content.svg" />
                        Content
                      </a>
                    </Link>
                    <Link href="#">
                      <a
                        href="#"
                        onClick={openSettingsModal}
                        className={classNames(
                          settingsIsOpen
                            ? "bg-nav-hover dark:bg-dark-bg"
                            : null,
                          "border-transparent text-current flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover dark:hover:bg-dark-bg"
                        )}
                      >
                        <img className="w-6 h-6" src="/appearance.svg" />
                        Appearance
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
                        <SearchIcon
                          className="h-5 w-5 text-gray-400 dark:text-gray-50"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-dark-100 placeholder-gray-500 dark:placeholder-gray-50 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-my-orange focus:border-my-orange sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
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
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-my-orange text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <a
                  href="#"
                  className=" border-my-orange text-black bg-box-bg block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Content
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Appearance
                </a>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
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

export default ChapterHeader;
