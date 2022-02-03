import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition, Switch, Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import languages from "../../constant/languages.json"; //todo: use graphql api to fetch
import authorTranslations from "../../constant/authorTranslations.json"; //todo: use graphql api to fetch
const Author = ({
  authorSettingsIsOpen,
  closeAuthorSettingsModal,
  languageSettings,
  setLanguageSettings,
}) => {
  const [isVerseCommentarySourceEnabled, setIsVerseCommentarySourceEnabled] =
    useState(false);
  const [
    isVerseTransliterationLanguageEnabled,
    setIsVerseTransliterationLanguageEnabled,
  ] = useState(false);
  const [isVerseTranslationSourceEnabled, setIsVerseTranslationSourceEnabled] =
    useState(false);
  const [language, setLanguage] = useState();
  const [author, setAuthor] = useState({ id: 0, name: "" });

  useEffect(() => {
    setIsVerseCommentarySourceEnabled(
      languageSettings.isCommentarySourceEnabled
    );
    setLanguage(languageSettings.language);
    setAuthor(languageSettings.author);
  }, []);

  function handleSubmit() {
    setLanguageSettings({
      isCommentarySourceEnabled: isVerseCommentarySourceEnabled,
      language: language,
      author: author,
    });
    closeAuthorSettingsModal();
  }

  return (
    <div>
      <Transition appear show={authorSettingsIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 top-0 z-10"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-dark-100 shadow-xl rounded-2xl">
                <div className="flex py-2 justify-between my-2 items-center">
                  <p className="text-base text-black dark:text-white">
                    Verse Commentary Source
                  </p>
                  <Switch
                    checked={isVerseCommentarySourceEnabled}
                    onChange={setIsVerseCommentarySourceEnabled}
                    className={`${
                      isVerseCommentarySourceEnabled
                        ? "bg-my-orange"
                        : "bg-gray-200 dark:bg-dark-bg"
                    }
                    relative inline-flex flex-shrink-0 h-[29px] w-[49px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        isVerseCommentarySourceEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                      pointer-events-none inline-block h-[25px] w-[25px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>

                <div className="flex py-2 justify-between items-center mb-2">
                  <p className="text-base text-black dark:text-white">
                    Verse Transliteration Language
                  </p>
                  <Switch
                    checked={isVerseTransliterationLanguageEnabled}
                    onChange={setIsVerseTransliterationLanguageEnabled}
                    className={`${
                      isVerseTransliterationLanguageEnabled
                        ? "bg-my-orange"
                        : "bg-gray-200 dark:bg-dark-bg"
                    }
                    relative inline-flex flex-shrink-0 h-[29px] w-[49px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        isVerseTransliterationLanguageEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                      pointer-events-none inline-block h-[25px] w-[25px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>

                <div
                  className="mb-6"
                  hidden={!isVerseTransliterationLanguageEnabled}
                >
                  <Listbox value={language} onChange={setLanguage}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-dark-bg rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-black sm:text-sm">
                        <span className="block truncate text-black capitalize dark:text-white">
                          {language?.language}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
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
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-dark-bg rounded-md shadow-md max-h-40 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-my-orange focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2">
                          {languages.map((language) => (
                            <Listbox.Option
                              key={language.id}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-white bg-my-orange"
                                    : "text-black dark:text-white"
                                }
                                cursor-pointer select-none relative py-2 px-4 capitalize`
                              }
                              value={language}
                            >
                              {language.language}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                <div className="flex py-2 justify-between items-center mb-2">
                  <p className="text-base text-black dark:text-white">
                    Verse Translation Source
                  </p>
                  <Switch
                    checked={isVerseTranslationSourceEnabled}
                    onChange={setIsVerseTranslationSourceEnabled}
                    className={`${
                      isVerseTranslationSourceEnabled
                        ? "bg-my-orange"
                        : "bg-gray-200 dark:bg-dark-bg"
                    }
                    relative inline-flex flex-shrink-0 h-[29px] w-[49px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        isVerseTranslationSourceEnabled
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                      pointer-events-none inline-block h-[25px] w-[25px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>

                <div hidden={!isVerseTranslationSourceEnabled}>
                  <Listbox value={author} onChange={setAuthor}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-dark-bg rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-black sm:text-sm">
                        <span className="block truncate text-black dark:text-white">
                          {author?.name}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
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
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-dark-bg rounded-md shadow-md max-h-24 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-my-orange focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2">
                          {authorTranslations.map((author) => (
                            <Listbox.Option
                              key={author.id}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-white bg-my-orange"
                                    : "text-black dark:text-white"
                                }
                                cursor-pointer select-none relative py-2 px-4`
                              }
                              value={author}
                            >
                              {author.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                <div className="mt-8 w-full flex gap-5">
                  <button
                    type="button"
                    className="text-center w-1/2 items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                    onClick={closeAuthorSettingsModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="text-center w-1/2 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-my-orange hover:bg-my-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                  >
                    Apply Settings
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

export default Author;
