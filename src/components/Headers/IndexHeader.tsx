/* This IndexHeader requires Tailwind CSS v2.0+ */
"use client";

import { Fragment, useState } from "react";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

import { AuthModal } from "components/AuthModal";
import LinkWithLocale from "components/LinkWithLocale";
import { useAuth } from "lib/auth/AuthProvider";
import { classNames } from "shared/functions";

import DarkModeToggle from "./DarkModeToggle";
import LanguageDropdown from "./LanguageDropdown";

const chapters = [
  {
    number: 1,
    icon: DocumentTextIcon,
    href: "/chapter/1",
  },
  {
    number: 2,
    icon: DocumentTextIcon,
    href: "/chapter/2",
  },
  {
    number: 3,
    icon: DocumentTextIcon,
    href: "/chapter/3",
  },
  {
    number: 4,
    icon: DocumentTextIcon,
    href: "/chapter/4",
  },
  {
    number: 5,
    icon: DocumentTextIcon,
    href: "/chapter/5",
  },
  {
    number: 6,
    icon: DocumentTextIcon,
    href: "/chapter/6",
  },
  {
    number: 7,
    icon: DocumentTextIcon,
    href: "/chapter/7",
  },
  {
    number: 8,
    icon: DocumentTextIcon,
    href: "/chapter/8",
  },
  {
    number: 9,
    icon: DocumentTextIcon,
    href: "/chapter/9",
  },
  {
    number: 10,
    icon: DocumentTextIcon,
    href: "/chapter/10",
  },
  {
    number: 11,
    icon: DocumentTextIcon,
    href: "/chapter/11",
  },
  {
    number: 12,
    icon: DocumentTextIcon,
    href: "/chapter/12",
  },
  {
    number: 13,
    icon: DocumentTextIcon,
    href: "/chapter/13",
  },
  {
    number: 14,
    icon: DocumentTextIcon,
    href: "/chapter/14",
  },
  {
    number: 15,
    icon: DocumentTextIcon,
    href: "/chapter/15",
  },
  {
    number: 16,
    icon: DocumentTextIcon,
    href: "/chapter/16",
  },
  {
    number: 17,
    icon: DocumentTextIcon,
    href: "/chapter/17",
  },
  {
    number: 18,
    icon: DocumentTextIcon,
    href: "/chapter/18",
  },
];

const mobileNav = [
  { name: "Quotes", href: "/bhagavad-gita-quotes", current: false },
  { name: "About Gita", href: "/about", current: false },
  { name: "Gita AI", href: "/gitagpt", current: false },
  { name: "Donate", href: "/donate", current: false },
];

type Props = {
  locale: Locale;
  translate: Translate;
};

export default function IndexHeader({ locale, translate }: Props) {
  const [input, setInput] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const router = useRouter();
  const { user, signOut, isLoading } = useAuth();

  function handleSearch(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (input?.trim().length <= 0) {
      return;
    }
    router.push(`/search${locale === "en" ? "" : `/${locale}`}?query=${input}`);
  }

  return (
    <div className="sticky top-0 z-50 w-full">
      <Popover className="relative border-b border-border bg-background/80 font-inter backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-4 md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <LinkWithLocale
                href="/"
                className="text-3xl font-bold focus:outline-none dark:text-white"
              >
                <span className="sr-only">{translate("Workflow")}</span>
                {translate("Bhagavad Gita")}
              </LinkWithLocale>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <DarkModeToggle />
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange dark:bg-dark-bg">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="size-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-black",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-500 focus:outline-none dark:bg-dark-100 dark:text-white",
                      )}
                    >
                      <span>{translate("Chapters")}</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-500",
                          "ml-2 h-5 w-5 group-hover:text-gray-500 dark:text-white",
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
                      <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-xs px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded shadow-lg ring-1 ring-black/5">
                          <div className="relative grid gap-6 bg-white py-2 dark:bg-dark-100 sm:gap-8 sm:p-8 md:grid-cols-2">
                            {chapters.map((chapter, index) => (
                              <LinkWithLocale
                                href={chapter.href}
                                key={index}
                                className="-m-3 flex items-start rounded-lg p-1 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-bg"
                              >
                                <chapter.icon
                                  className="size-6 shrink-0 text-my-orange"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {translate("Chapter")} {chapter.number}
                                  </p>
                                </div>
                              </LinkWithLocale>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <LinkWithLocale
                href="/bhagavad-gita-quotes"
                className="text-base font-medium text-black hover:text-gray-500 focus:outline-none dark:text-white"
              >
                {translate("Quotes")}
              </LinkWithLocale>
              <LinkWithLocale
                href="/about"
                className="text-base font-medium text-black hover:text-gray-500 focus:outline-none dark:text-white"
              >
                {translate("About Gita")}
              </LinkWithLocale>
              <LinkWithLocale
                href="/gitagpt"
                className="text-base font-medium text-black hover:text-gray-500 focus:outline-none dark:text-white"
              >
                {translate("Gita AI")}
              </LinkWithLocale>
              <LinkWithLocale
                href="/donate"
                className="text-base font-medium text-black hover:text-gray-500 focus:outline-none dark:text-white"
              >
                {translate("Donate")}
              </LinkWithLocale>
              {!user ? (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-my-orange px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2"
                >
                  <UserCircleIcon className="size-5" />
                  {translate("Sign In")}
                </button>
              ) : (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 dark:bg-dark-100 dark:text-white dark:hover:bg-zinc-700">
                        {user.user_metadata?.avatar_url ||
                        user.user_metadata?.picture ? (
                          <img
                            src={
                              user.user_metadata.avatar_url ||
                              user.user_metadata.picture
                            }
                            alt="Avatar"
                            className="size-6 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <UserCircleIcon className="size-6 text-my-orange" />
                        )}
                        <span className="max-w-24 truncate">
                          {user.user_metadata?.full_name ||
                            user.email?.split("@")[0] ||
                            "Account"}
                        </span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "size-4 transition-transform",
                          )}
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
                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-48 origin-top-right">
                          <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 dark:bg-dark-100">
                            <div className="p-2">
                              <div className="border-b border-gray-100 px-3 py-2 dark:border-zinc-700">
                                <p className="text-xs text-gray-500 dark:text-zinc-400">
                                  {translate("Signed in as")}
                                </p>
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                  {user.email}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => signOut()}
                                className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-zinc-700"
                              >
                                <svg
                                  className="size-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                                {translate("Sign Out")}
                              </button>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              )}
            </Popover.Group>
            <div className="hidden w-auto items-center justify-end py-px md:flex md:flex-1 lg:w-0">
              <form
                onSubmit={handleSearch}
                className="relative flex text-gray-600"
              >
                <button
                  type="submit"
                  className="absolute left-3 top-0 mr-4 mt-2"
                >
                  <MagnifyingGlassIcon
                    className="size-5 text-gray-400 dark:text-gray-50"
                    aria-hidden="true"
                  />
                </button>

                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder:text-gray-500 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange focus:placeholder:text-gray-400 dark:bg-dark-100 dark:text-white dark:placeholder:text-gray-50 sm:text-sm"
                  placeholder={translate("Search")}
                  type="search"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </form>
              <DarkModeToggle />
              <LanguageDropdown locale={locale} align="right" />
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
            className="absolute inset-x-0 top-0 origin-top-right pb-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:divide-dark-100 dark:bg-dark-100">
              <div className="pt-5">
                <div className="flex items-center justify-between pr-5">
                  <button className="text-3xl font-bold" type="button">
                    <form
                      onSubmit={handleSearch}
                      className="relative mx-auto px-3 py-2 text-sm font-medium text-gray-600"
                    >
                      <button
                        type="submit"
                        className="absolute left-6 top-0 mr-4 mt-5"
                      >
                        <svg
                          className="size-4 fill-current text-gray-600 dark:text-white"
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
                        className="h-10 w-max rounded-lg border border-gray-300 bg-white px-8 pr-16 text-sm focus:outline-none dark:bg-dark-100 dark:text-white dark:placeholder:text-white"
                        type="search"
                        name="search"
                        placeholder="Search"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                    </form>
                  </button>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-my-orange dark:bg-dark-bg">
                      <span className="sr-only px-5">
                        {translate("Close Menu")}
                      </span>
                      <XMarkIcon className="size-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <nav className="space-y-1" aria-label="Sidebar">
                      <Disclosure>
                        <Disclosure.Button className="flex w-full justify-between px-3 py-2 text-left font-medium hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 focus:border-l-4 focus:border-my-orange focus:bg-yellow-100 focus:text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900">
                          {translate("Chapters")}
                          <ChevronDownIcon className="ml-2 size-5 group-hover:text-black" />
                        </Disclosure.Button>
                        <Disclosure.Panel className="py-4 text-gray-500 dark:bg-dark-100 dark:text-white">
                          <div className="relative grid grid-cols-2 gap-6 bg-white px-8 py-2 dark:bg-dark-100 dark:text-white sm:gap-8 sm:p-8">
                            {chapters.map((item) => (
                              <a
                                key={item.number}
                                href={item.href}
                                className="-m-3 flex items-start p-1 hover:cursor-pointer hover:rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-100 dark:focus:bg-yellow-100"
                              >
                                <item.icon
                                  className="size-6 shrink-0 text-my-orange"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white dark:hover:text-gray-900 dark:focus:text-gray-900">
                                    {translate("Chapter")} {item.number}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </Disclosure>
                      {mobileNav.map((item) => (
                        <LinkWithLocale
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "border-l-4 border-my-orange bg-yellow-100 text-gray-900 dark:text-white"
                              : "hover:border-l-4 hover:border-my-orange hover:bg-yellow-100 hover:text-gray-900 dark:hover:text-gray-900",
                            "mb-2 flex items-center px-3 py-2 font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <span className="truncate">{item.name}</span>
                        </LinkWithLocale>
                      ))}
                      {/* Auth Section for Mobile */}
                      <div className="border-t border-gray-200 pt-4 dark:border-zinc-700">
                        {!user ? (
                          <button
                            type="button"
                            onClick={() => setAuthModalOpen(true)}
                            className="mx-3 flex w-[calc(100%-24px)] items-center justify-center gap-2 rounded-lg bg-my-orange px-4 py-3 font-medium text-white shadow-sm transition-all hover:bg-orange-600"
                          >
                            <UserCircleIcon className="size-5" />
                            {translate("Sign In")}
                          </button>
                        ) : (
                          <div className="px-3">
                            <div className="mb-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-zinc-800">
                              {user.user_metadata?.avatar_url ||
                              user.user_metadata?.picture ? (
                                <img
                                  src={
                                    user.user_metadata.avatar_url ||
                                    user.user_metadata.picture
                                  }
                                  alt="Avatar"
                                  className="size-10 rounded-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <UserCircleIcon className="size-10 text-my-orange" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium text-gray-900 dark:text-white">
                                  {user.user_metadata?.full_name ||
                                    user.email?.split("@")[0]}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-zinc-400">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => signOut()}
                              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                            >
                              <svg
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                              {translate("Sign Out")}
                            </button>
                          </div>
                        )}
                      </div>
                    </nav>
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        translate={translate}
      />
    </div>
  );
}
