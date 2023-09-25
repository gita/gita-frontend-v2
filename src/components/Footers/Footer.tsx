"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";
import { classNames } from "shared/functions";

import useMyStyles from "../../hooks/useMyStyles";

interface IconProps {
  className: string;
  ariaHidden: boolean;
}

const getNavigation = (translate: Translate) => ({
  main: [
    { name: translate("About Us"), href: "/about", newTab: false },
    {
      name: translate("App"),
      href: "/app",
      newTab: false,
    },
    {
      name: translate("Bhagavad Gita AI"),
      href: "https://bhagavadgita.ai",
      newTab: true,
    },
    {
      name: translate("Acknowledgements"),
      href: "/acknowledgements",
      newTab: false,
    },
    {
      name: translate("Privacy"),
      href: "/privacy-policy",
      newTab: false,
    },
    { name: translate("Terms"), href: "/terms-of-service", newTab: false },
    {
      name: translate("Blog"),
      href: "https://radhakrishna.net/",
      newTab: true,
    },
    {
      name: translate("Donate"),
      href: "https://opencollective.com/the-gita-initiative",
      newTab: true,
    },
    {
      name: "API",
      href: "https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3",
      newTab: true,
    },
    {
      name: translate("Contact Us"),
      href: "mailto:admin@bhagavadgita.io",
      newTab: false,
    },
  ],
  social: [
    {
      name: "Facebook",
      href: " https://www.facebook.com/iiRadhaKrishnaii/",
      icon: ({ className, ariaHidden }: IconProps) => (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/ShriKrishna?s=20&t=92c4he0cK-nq_Bo6WOx0ZQ",
      icon: ({ className, ariaHidden }: IconProps) => (
        <svg
          fill="currentColor"
          viewBox="0 0 30 30"
          className={className}
          aria-hidden={ariaHidden}
        >
          <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: " https://github.com/gita",
      icon: ({ className, ariaHidden }: IconProps) => (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className={className}
          aria-hidden={ariaHidden}
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
});

type Props = {
  translate: Translate;
};

const Footer = (props: Props) => {
  const { translate } = props;

  const styles = useMyStyles();
  const navigation = getNavigation(translate);

  return (
    <div className="bottom-0 w-full border-y border-gray-200 bg-white font-inter dark:bg-dark-100">
      <div
        className={classNames(
          "py-1 dark:bg-dark-bg lg:pb-8 lg:pt-24",
          `bg-${styles.backgroundColor}`,
        )}
      >
        <div className="flex items-center justify-between lg:justify-center">
          <div className="w-1/2 flex-none lg:hidden lg:w-1/5">
            <Menu
              as="div"
              className="relative inline-block text-left lg:hidden"
            >
              {({ open }) => (
                <>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute bottom-10 left-0 mt-2 w-56 origin-bottom-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-bg">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              English
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              French
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              Spanish
                            </a>
                          )}
                        </Menu.Item>
                        <form method="POST" action="#">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="submit"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 dark:text-gray-400",
                                  "block w-full px-4 py-2 text-left text-sm",
                                )}
                              >
                                Hindi
                              </button>
                            )}
                          </Menu.Item>
                        </form>
                      </div>
                    </Menu.Items>
                  </Transition>
                  {/* commented out for now  until next release
                  <div>
                    <Menu.Button className="inline-flex justify-centerw-full rounded-lg border border-gray-300 shadow-sm px-2 py-2 bg-white dark:bg-dark-100 text-xs text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700 focus:ring-my-orange">
                      Language
                      {open ? (
                        <ChevronUpIcon
                          className="-mr-1 ml-1 h-4 w-4 rotate-180"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronUpIcon
                          className="-mr-1 ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      )}
                    </Menu.Button>
                  </div>
                */}
                </>
              )}
            </Menu>

            <Menu
              as="div"
              className="relative inline-block text-left lg:hidden"
            >
              {({ open }) => (
                <>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute bottom-10 left-0 z-50 mt-2 w-56 origin-bottom-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark-bg">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <LinkWithLocale
                              href="/about"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                            >
                              {translate("About Us")}
                            </LinkWithLocale>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="https://radhakrishna.net/"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                              target="_blank"
                            >
                              {translate("Blog")}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="https://opencollective.com/the-gita-initiative"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                              target="_blank"
                            >
                              {translate("Donate")}
                            </a>
                          )}
                        </Menu.Item>
                        {/* 
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm"
                              )}
                              target="_blank"
                            >
                              Press
                            </a>
                          )}
                        </Menu.Item>
                        */}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700 dark:text-gray-400",
                                "block px-4 py-2 text-sm",
                              )}
                              target="_blank"
                            >
                              API
                            </a>
                          )}
                        </Menu.Item>
                        <div className="border-t  border-gray-200 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://www.facebook.com/iiRadhaKrishnaii/"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 dark:text-gray-400",
                                  "block px-4 py-2 text-sm",
                                )}
                                target="_blank"
                              >
                                Facebook
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://www.instagram.com/iiradhakrishnaii1008/"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 dark:text-gray-400",
                                  "block px-4 py-2 text-sm",
                                )}
                                target="_blank"
                              >
                                Instagram
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="https://twitter.com/ShriKrishna?s=20&t=92c4he0cK-nq_Bo6WOx0ZQ"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 dark:text-gray-400",
                                  "block px-4 py-2 text-sm",
                                )}
                                target="_blank"
                              >
                                Twitter
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href=" https://github.com/gita"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700 dark:text-gray-400",
                                  "block px-4 py-2 text-sm",
                                )}
                                target="_blank"
                              >
                                Github
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                  <div>
                    <Menu.Button className="justify-centerw-full ml-3 inline-flex rounded-lg border border-gray-300 bg-white p-2 text-xs text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-dark-100 dark:text-gray-400 dark:hover:bg-dark-bg dark:focus:ring-offset-gray-700">
                      More
                      {open ? (
                        <ChevronUpIcon
                          className="-mr-1 ml-1 h-4 w-4 rotate-180"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronUpIcon
                          className="-mr-1 ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      )}
                    </Menu.Button>
                  </div>
                </>
              )}
            </Menu>
          </div>
          <div className="hidden flex-none lg:block">
            <footer className="bg-white dark:bg-dark-100">
              <div
                className={classNames(
                  "mx-auto max-w-7xl overflow-hidden dark:bg-dark-bg sm:px-6 lg:px-8",
                  `bg-${styles.backgroundColor}`,
                )}
              >
                <nav
                  className="-mx-5 -my-2 flex flex-wrap justify-center"
                  aria-label="Footer"
                >
                  {navigation.main.map((item) => (
                    <div key={item.name} className="px-5 py-2">
                      {item.newTab ? (
                        <a
                          href={item.href}
                          className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          target="_blank"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <LinkWithLocale
                          className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white"
                          href={item.href}
                          passHref
                        >
                          {item.name}
                        </LinkWithLocale>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </footer>
          </div>
          <div className="mr-3 flex max-h-10 flex-1 justify-end lg:hidden lg:w-1/5">
            <a
              href="https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/play_store.svg"
                alt="Bhagavad Gita"
                height={40}
                width={140}
                className="rounded pr-1"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/app_store.svg"
                alt="Bhagavad Gita"
                height={40}
                width={140}
                className="rounded"
              />
            </a>
          </div>
        </div>
        <div className="w-1/3 flex-none text-right lg:w-full">
          <div className="mt-8 hidden items-center justify-center space-x-6 lg:flex">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
                target="_blank"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" ariaHidden={true} />
              </a>
            ))}
            {/* <a href="#">App Icon</a> */}
          </div>
          {/* <a href="#" className="text-right block lg:hidden">
          App Icon
        </a> */}
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between px-4 py-1 dark:bg-copyright-bg">
        <div className="hidden w-1/2 flex-none lg:inline-block lg:w-1/5">
          {/* commented out for now  until next release
          <Menu as="div" className="relative text-left ">
            {({ open }) => (
              <>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-bottom-left absolute left-0 bottom-10 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-dark-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-200"
                                : "text-gray-700 dark:text-gray-400",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            English
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-200"
                                : "text-gray-700 dark:text-gray-400",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            French
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-200"
                                : "text-gray-700 dark:text-gray-400",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Spanish
                          </a>
                        )}
                      </Menu.Item>
                      <form method="POST" action="#">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={classNames(
                                active
                                  ? "bg-gray-100 dark:bg-dark-bg text-gray-900 dark:text-gray-200"
                                  : "text-gray-700 dark:text-gray-400",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                            >
                              Hindi
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
                <div>
                  <Menu.Button className="inline-flex justify-centerw-full rounded-lg border border-gray-300 shadow-sm px-2 py-2 bg-white dark:bg-dark-100 text-xs text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-700 focus:ring-my-orange">
                    Language
                    {open ? (
                      <ChevronUpIcon
                        className="-mr-1 ml-1 h-4 w-4 rotate-180"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronUpIcon
                        className="-mr-1 ml-1 h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                  </Menu.Button>
                </div>
              </>
            )}
          </Menu>
          */}
        </div>

        <div className="block w-full flex-none lg:w-3/5">
          <p className="text-center text-sm text-gray-400">
            {`© ${new Date().getFullYear()} ${translate("Copyright")}: `}
            <a
              href="https://vedvyas.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-my-orange hover:underline"
            >
              Ved Vyas Foundation.
            </a>
            <br className="sm:hidden" />
            <span className="sm:inline">
              {" "}
              {translate("All rights reserved")}.
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end lg:flex lg:w-1/5  lg:space-x-1">
          <a
            href="https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10"
          >
            <Image
              src="/play_store.svg"
              alt="Bhagavad Gita"
              className="h-full rounded object-contain"
              height={40}
              width={140}
            />
          </a>
          <a
            href="https://apps.apple.com/us/app/bhagavad-gita-hindi-english/id1602895635"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10"
          >
            <Image
              src="/app_store.svg"
              alt="Bhagavad Gita"
              className="h-full object-contain"
              height={40}
              width={140}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
