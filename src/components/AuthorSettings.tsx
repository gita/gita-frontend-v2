"use client";
import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Dialog, Listbox, Switch, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

import commentary_authors from "constant/commentary_authors.json";
import translation_authors from "constant/translation_authors.json";
import { getLanguageSettings } from "shared/functions";
import { classNames } from "shared/functions";

const cookieOptions = { path: "/", maxAge: 365 * 24 * 60 * 60 };

interface Props {
  authorSettingsIsOpen: boolean;
  closeAuthorSettingsModal: () => void;
  translate: Translate;
  locale: Locale;
}

const AuthorSettings = ({
  authorSettingsIsOpen,
  closeAuthorSettingsModal,
  translate,
  locale,
}: Props) => {
  const [isVerseCommentarySourceEnabled, setIsVerseCommentarySourceEnabled] =
    useState(true);
  const [isVerseTranslationSourceEnabled, setIsVerseTranslationSourceEnabled] =
    useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cookies, setCookie] = useCookies([
    "bgTranslationAuthorId",
    "bgCommentaryAuthorId",
  ]);

  const [translationAuthor, setTranslationAuthor] =
    useState<TranslationAuthor | null>(null);
  const [commentaryAuthor, setCommentaryAuthor] =
    useState<CommentaryAuthor | null>(null);

  useEffect(() => {
    const myLanguageSettings = getLanguageSettings(locale, {
      translationAuthorId: parseInt(String(cookies.bgTranslationAuthorId)),
      commentaryAuthorId: parseInt(String(cookies.bgCommentaryAuthorId)),
    });

    setTranslationAuthor(myLanguageSettings.translationAuthor);
    setCommentaryAuthor(myLanguageSettings.commentaryAuthor);
  }, [cookies.bgTranslationAuthorId, cookies.bgCommentaryAuthorId, locale]);

  function handleSubmit() {
    setIsSubmitting(true);
    setCookie("bgTranslationAuthorId", translationAuthor?.id, cookieOptions);
    setCookie("bgCommentaryAuthorId", commentaryAuthor?.id, cookieOptions);
    window.location.reload();
  }

  return (
    <div>
      <Transition appear show={authorSettingsIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10"
          onClose={closeAuthorSettingsModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-100">
                <div className="my-2 flex items-center justify-between py-2">
                  <p className="text-base text-black dark:text-white">
                    {translate("Verse Commentary Source")}
                  </p>
                  <Switch
                    checked={isVerseCommentarySourceEnabled}
                    onChange={setIsVerseCommentarySourceEnabled}
                    className={`${
                      isVerseCommentarySourceEnabled
                        ? "bg-my-orange"
                        : "bg-gray-200 dark:bg-dark-bg"
                    }
                    relative inline-flex h-[29px] w-[49px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        isVerseCommentarySourceEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                      pointer-events-none inline-block h-[25px] w-[25px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>
                <div className="mb-4" hidden={!isVerseCommentarySourceEnabled}>
                  <Listbox
                    value={commentaryAuthor}
                    onChange={setCommentaryAuthor}
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-black focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-dark-bg sm:text-sm">
                        <span className="block truncate text-black dark:text-white">
                          {translate(commentaryAuthor?.name)}&nbsp;(
                          {translate(commentaryAuthor?.language)})
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-my-orange/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-dark-bg sm:text-sm">
                          {commentary_authors.map((author) => (
                            <Listbox.Option
                              key={author.id}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "bg-my-orange text-white"
                                    : "text-black dark:text-white"
                                }
                                relative flex cursor-pointer select-none justify-between px-4 py-2`
                              }
                              value={author}
                            >
                              <div>{translate(author.name)}</div>
                              <div>{translate(author.language)}</div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                <div className="mb-2 flex items-center justify-between py-2">
                  <p className="text-base text-black dark:text-white">
                    {translate("Verse Translation Source")}
                  </p>
                  <Switch
                    checked={isVerseTranslationSourceEnabled}
                    onChange={setIsVerseTranslationSourceEnabled}
                    className={`${
                      isVerseTranslationSourceEnabled
                        ? "bg-my-orange"
                        : "bg-gray-200 dark:bg-dark-bg"
                    }
                    relative inline-flex h-[29px] w-[49px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        isVerseTranslationSourceEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                      pointer-events-none inline-block h-[25px] w-[25px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                </div>

                <div hidden={!isVerseTranslationSourceEnabled}>
                  <Listbox
                    value={translationAuthor}
                    onChange={setTranslationAuthor}
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-black focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-dark-bg sm:text-sm">
                        <span className="flex justify-between text-black dark:text-white">
                          {translate(translationAuthor?.name)}&nbsp; (
                          {translate(translationAuthor?.language)})
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="relative z-20 mt-1 w-full max-h-48 overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-my-orange/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-dark-bg sm:text-sm">
                          {translation_authors.map((author) => (
                            <Listbox.Option
                              key={author.id}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "bg-my-orange text-white"
                                    : "text-black dark:text-white"
                                }
                                relative flex cursor-pointer select-none justify-between px-4 py-2`
                              }
                              value={author}
                            >
                              <div>{author.name}</div>
                              <div>{translate(author.language)}</div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                <div className="mt-8 flex w-full gap-5">
                  <button
                    type="button"
                    className="w-1/2 items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-center text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
                    onClick={closeAuthorSettingsModal}
                  >
                    {translate("Cancel")}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className={classNames(
                      "w-1/2 items-center border border-transparent px-6 py-3 text-center",
                      "rounded-md bg-my-orange text-base font-medium text-white shadow-sm",
                      "hover:bg-my-orange focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2",
                      isSubmitting && "bg-opacity-30 hover:bg-opacity-30",
                    )}
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <div
                        className="mr-2 inline-block h-4 w-4 animate-spin rounded-3xl border-2 border-solid border-r-transparent align-text-bottom"
                        role="status"
                      >
                        <span className="sr-only">
                          {translate("Loading")}...
                        </span>
                      </div>
                    )}
                    {translate("Apply Settings")}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AuthorSettings;
