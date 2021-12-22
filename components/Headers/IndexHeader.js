/* This IndexHeader requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Popover, Transition, Menu, Disclosure } from "@headlessui/react";
import {
  ChartBarIcon,
  CursorClickIcon,
  DocumentReportIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
const chapters = [
  {
    name: "Chapter 1",
    icon: DocumentReportIcon,
    href: "/chapter/1",
  },
  {
    name: "Chapter 2",
    icon: DocumentReportIcon,
    href: "/chapter/2",
  },
  {
    name: "Chapter 3",
    icon: DocumentReportIcon,
    href: "/chapter/3",
  },
  {
    name: "Chapter 4",
    icon: DocumentReportIcon,
    href: "/chapter/4",
  },
  {
    name: "Chapter 5",
    icon: DocumentReportIcon,
    href: "/chapter/5",
  },
  {
    name: "Chapter 6",
    icon: DocumentReportIcon,
    href: "/chapter/6",
  },
  {
    name: "Chapter 7",
    icon: DocumentReportIcon,
    href: "/chapter/7",
  },
  {
    name: "Chapter 8",
    icon: DocumentReportIcon,
    href: "/chapter/8",
  },
  {
    name: "Chapter 9",
    icon: DocumentReportIcon,
    href: "/chapter/9",
  },
  {
    name: "Chapter 10",
    icon: DocumentReportIcon,
    href: "/chapter/10",
  },
  {
    name: "Chapter 11",
    icon: DocumentReportIcon,
    href: "/chapter/11",
  },
  {
    name: "Chapter 12",
    icon: DocumentReportIcon,
    href: "/chapter/12",
  },
  {
    name: "Chapter 13",
    icon: DocumentReportIcon,
    href: "/chapter/13",
  },
  {
    name: "Chapter 14",
    icon: DocumentReportIcon,
    href: "/chapter/14",
  },
  {
    name: "Chapter 15",
    icon: DocumentReportIcon,
    href: "/chapter/15",
  },
  {
    name: "Chapter 16",
    icon: DocumentReportIcon,
    href: "/chapter/16",
  },
  {
    name: "Chapter 17",
    icon: DocumentReportIcon,
    href: "/chapter/17",
  },
  {
    name: "Chapter 18",
    icon: DocumentReportIcon,
    href: "/chapter/18",
  },
];

const mobileNav = [
  { name: "Quote", href: "#", current: false },
  { name: "About Geeta", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function IndexHeader() {
  const [input, setInput] = useState("");
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    router.push(`/search?query=${input}`, undefined, { shallow: true });
  }
  return (
    <div className="w-full fixed top-0 shadow">
      <Popover className="relative bg-white font-inter">
        <div className="max-w-full mx-auto  xl:px-24 px-4">
          <div className="flex justify-between items-center  py-6 md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a href="#" className="font-bold text-3xl focus:outline-none">
                  <span className="sr-only">Workflow</span>
                  Bhagavad Gita
                </a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-black",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-500 "
                      )}
                    >
                      <span>Chapters</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-500",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-xs sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid md:grid-cols-2 gap-6 bg-white  py-2 sm:gap-8 sm:p-8">
                            {chapters.map((chapter) => (
                              <Link href={chapter.href} key={chapter.name}>
                                <a className="-m-3 p-1 flex items-start rounded-lg hover:bg-gray-100 hover:cursor-pointer	">
                                  <chapter.icon
                                    className="flex-shrink-0 h-6 w-6 text-my-orange"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900">
                                      {chapter.name}
                                    </p>
                                  </div>
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Link href="/quotes">
                <a
                  href="#"
                  className="text-base font-medium text-black hover:text-gray-500"
                >
                  Quotes
                </a>
              </Link>
              <Link href="/about">
                <a className="text-base font-medium text-black hover:text-gray-500">
                  About Geeta
                </a>
              </Link>
            </Popover.Group>
            <div className="hidden md:flex justify-end items-end w-auto md:flex-1 lg:w-0">
              <form
                onSubmit={handleSearch}
                className="pt-2 relative flex text-gray-600"
              >
                <button
                  type="submit"
                  className="absolute left-3 top-0 mt-5 mr-4"
                >
                  <svg
                    className="text-gray-600 h-4 w-4 fill-current"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    width="512px"
                    height="512px"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
                <input
                  className="border-2 border-gray-300 w-full bg-white h-10 pl-8 pr-3 rounded-lg text-sm focus:outline-none outline-none  focus:border-my-orange"
                  type="search"
                  name="search"
                  placeholder="Search"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </form>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 pb-2 transition transform origin-top-right md:hidden"
          >
            <div className=" shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5">
                <div className="flex items-center pl-2 pr-5 justify-between">
                  <a href="#" className="font-bold text-3xl">
                    <form
                      onSubmit={handleSearch}
                      className="px-3 py-2 border-l-4 border-white text-sm font-medium relative mx-auto text-gray-600"
                    >
                      <button
                        type="submit"
                        className="absolute left-6 top-0 mt-5 mr-4"
                      >
                        <svg
                          className="text-gray-600 h-4 w-4 fill-current"
                          version="1.1"
                          id="Capa_1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 56.966 56.966"
                          width="512px"
                          height="512px"
                        >
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                      <input
                        className="border-2 border-gray-300 w-max bg-white h-10 pl-8 pr-3 rounded-lg text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                    </form>
                  </a>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange">
                      <span className="sr-only px-5">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <nav className="space-y-1" aria-label="Sidebar">
                      <Disclosure>
                        <Disclosure.Button className="w-full flex justify-between px-3 py-2 border-l-4 border-white text-left  font-medium hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900 focus:bg-yellow-100 focus:border-l-4 focus:border-my-orange focus:text-gray-900">
                          Chapters
                          <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:text-black" />
                        </Disclosure.Button>
                        <Disclosure.Panel className="text-gray-500 py-4">
                          <div className="relative grid grid-cols-2 gap-6 bg-white px-8  py-2 sm:gap-8 sm:p-8">
                            {chapters.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="-m-3 p-1 flex items-start hover:bg-gray-100 hover:cursor-pointer	"
                              >
                                <item.icon
                                  className="flex-shrink-0 h-6 w-6 text-my-orange"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </Disclosure>
                      {mobileNav.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-yellow-100 border-l-4 border-my-orange text-gray-900"
                              : "hover:bg-yellow-100 hover:border-l-4 hover:border-my-orange hover:text-gray-900",
                            "flex items-center mb-2 px-3 py-2 border-l-4 border-white  font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <span className="truncate">{item.name}</span>
                        </a>
                      ))}
                    </nav>
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
