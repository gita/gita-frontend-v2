import { Fragment ,useState } from "react";
import { Disclosure, Switch, Transition } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PageHeader = () => {
    const [enabled, setEnabled] = useState(false)

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow font-inter">
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex px-2 lg:px-0">
                  <div className="hidden items-center py-2 lg:flex lg:space-x-4">
                    {/* Current: "border-my-orange text-gray-900", Default: "border-transparent text-gray-500 " */}

                    <div className="">
                      <a
                        href="#"
                        className="border-transparent flex flex-col text-gray-900  items-center rounded p-2 border-b-2 text-sm font-medium hover:bg-nav-hover"
                      >
                        <img className="w-6 h-6" src="/Home.svg" />
                        Home
                      </a>
                    </div>
                    <a
                      href="#"
                      className="border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"
                    >
                      <img className="w-6 h-6" src="/content.svg" />
                      Content
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"
                    >
                      <img className="w-6 h-6" src="/appearance.svg" />
                      Appearance
                    </a>
                    <a
                      href="#"
                      className="border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"
                    >
                      <img className="w-6 h-6" src="/notes.svg" />
                      Notes
                    </a>

                    <a
                      href="#"
                      className="border-transparent text-gray-900  flex flex-col items-center p-2 rounded border-b-2 text-sm font-medium hover:bg-nav-hover"
                    >
                      <img className="w-6 h-6" src="/bookmark-header.svg" />
                      Bookmark
                    </a>
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
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-my-orange focus:border-my-orange sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
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
                <a
                  href="#"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Notes
                </a>

                <a
                  href="#"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Bookmark
                </a>
              </div>
              <Disclosure>
                <Disclosure.Button className="w-full flex border-t justify-between order-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800  pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                  Advaced View
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
                        className=" font-medium text-gray-600"
                        passive
                      >
                        Devnagari
                      </Switch.Label>
                     
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
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
                        className=" font-medium text-gray-600"
                        passive
                      >
                        Verse Text
                      </Switch.Label>
                     
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
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
                        className=" font-medium text-gray-600"
                        passive
                      >
                       Synonyms
                      </Switch.Label>
                     
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
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
                        className=" font-medium text-gray-600"
                        passive
                      >
                        Transition
                      </Switch.Label>
                     
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          enabled ? "translate-x-5" : "translate-x-0",
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
                        className=" font-medium text-gray-600"
                        passive
                      >
                       Purport
                      </Switch.Label>
                     
                    </span>
                    <Switch
                      checked={enabled}
                      onChange={setEnabled}
                      className={classNames(
                        enabled ? "bg-my-orange" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                      )}
                    >
                      <span
                        aria-hidden="true"
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
    </>
  );
};

export default PageHeader;
