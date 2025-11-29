import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { editSettings } from "redux/actions/settings";
import { RootState } from "redux/reducers/rootReducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { SettingsState } from "redux/types";
import { classNames } from "shared/functions";

interface Props {
  settingsIsOpen: boolean;
  closeSettingsModal: () => void;
  translate: Translate;
}

const Settings = ({ settingsIsOpen, closeSettingsModal, translate }: Props) => {
  const state = useAppSelector((state: RootState) => state.settings);
  const dispatch = useAppDispatch();
  const [appearanceSettings, setAppearanceSettings] =
    useState<SettingsState>(state);
  const { setTheme } = useTheme();

  useEffect(() => {
    setAppearanceSettings(state);
  }, [state]);

  return (
    <div className="bg-gray-300">
      <Transition appear show={settingsIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10"
          onClose={closeSettingsModal}
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
              <div className="fixed inset-0" aria-hidden="true" />
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
                <Dialog.Title
                  as="h3"
                  className="border-gray-200 pb-4 text-lg font-bold leading-6 text-gray-900 dark:text-gray-50"
                >
                  {translate("Settings")}
                </Dialog.Title>
                <div className="mt-2 border-y py-2">
                  <p
                    className={classNames(
                      " text-gray-500 dark:text-gray-200",
                      appearanceSettings?.fontSize === "small"
                        ? "text-md"
                        : "text-xl",
                      appearanceSettings?.spacing === "large"
                        ? "leading-loose"
                        : "",
                      appearanceSettings?.spacing === "medium"
                        ? "leading-normal"
                        : "",
                      appearanceSettings?.spacing === "small"
                        ? "leading-tight"
                        : "",
                    )}
                  >
                    {translate(
                      "O Kṛṣṇa, maintainer of the people, I have heard by disciplic succession that those whose family traditions are destroyed dwell always in hell.",
                    )}
                  </p>
                </div>

                <span className="relative z-0 mt-4 inline-flex w-full rounded-md text-center font-bold shadow-sm">
                  <button
                    type="button"
                    onClick={() =>
                      setAppearanceSettings((prevState) => {
                        return { ...prevState, fontSize: "small" };
                      })
                    }
                    className={classNames(
                      appearanceSettings?.fontSize === "small"
                        ? "text-my-orange"
                        : "text-gray-500 dark:text-gray-200",
                      "align-center relative w-1/2 items-center rounded-l-md border border-gray-300 bg-white px-2 py-6 text-center text-sm font-bold hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:hover:bg-dark-bg",
                    )}
                  >
                    <h2 className="text-center">-{translate("Aa")}</h2>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAppearanceSettings((prevState) => {
                        return { ...prevState, fontSize: "large" };
                      })
                    }
                    className={classNames(
                      appearanceSettings?.fontSize === "large"
                        ? "text-my-orange"
                        : "text-gray-500 dark:text-gray-200",
                      "align-center relative w-1/2 items-center rounded-r-md border border-gray-300 bg-white px-2 py-6 text-center text-sm font-bold hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:hover:bg-dark-bg",
                    )}
                  >
                    <h2 className="text-center text-xl">+{translate("Aa")}</h2>
                  </button>
                </span>

                <div className="mt-4">
                  <span className="relative z-0 inline-flex w-full rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() =>
                        setAppearanceSettings((prevState) => {
                          return { ...prevState, spacing: "large" };
                        })
                      }
                      className={classNames(
                        appearanceSettings?.spacing === "large"
                          ? "text-my-orange"
                          : "text-gray-700 dark:text-gray-200",
                        "relative w-1/3 items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium hover:bg-gray-50  focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        src="/text-wide.svg"
                        className="mx-auto w-4"
                        alt="text wide icon"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAppearanceSettings((prevState) => {
                          return { ...prevState, spacing: "medium" };
                        })
                      }
                      className={classNames(
                        appearanceSettings?.spacing === "medium"
                          ? "text-my-orange"
                          : "text-gray-700 dark:text-gray-200",
                        "relative -ml-px w-1/3 items-center border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium hover:bg-gray-50  focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        alt="text medium icon"
                        src="/text-medium.png"
                        className="mx-auto w-4 dark:fill-current dark:text-my-orange"
                        width={16}
                        height={16}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setAppearanceSettings((prevState) => {
                          return { ...prevState, spacing: "small" };
                        })
                      }
                      className={classNames(
                        appearanceSettings?.spacing === "small"
                          ? "text-my-orange"
                          : "text-gray-700 dark:text-gray-200",
                        "relative -ml-px w-1/3 items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium hover:bg-gray-50  focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:hover:bg-dark-bg",
                      )}
                    >
                      <Image
                        src="/text-narrow.svg"
                        className="mx-auto w-4"
                        alt="text narrow icon"
                        width={16}
                        height={16}
                      />
                    </button>
                  </span>
                </div>

                <div className="mt-4 flex gap-6">
                  <button
                    type="button"
                    onClick={() =>
                      setAppearanceSettings((prevState) => {
                        return { ...prevState, bg: "bg-light-bg" };
                      })
                    }
                    className={classNames(
                      appearanceSettings?.bg === "bg-light-bg"
                        ? "ring-2 ring-my-orange ring-offset-2"
                        : "",
                      "inline-flex items-center rounded-full border border-transparent bg-light-bg p-5 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 dark:ring-offset-dark-100",
                    )}
                  ></button>

                  {/*<button
                    type="button"
                    onClick={() =>
                      setAppearanceSettings((prevState) => {
                        return { ...prevState, bg: "bg-yellow-bg" };
                      })
                    }
                    className={classNames(
                      appearanceSettings?.bg === "bg-yellow-bg"
                        ? "ring-2 ring-my-orange ring-offset-2"
                        : "",
                      "inline-flex items-center rounded-full border border-transparent bg-yellow-bg p-5 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 dark:ring-offset-dark-100",
                    )}
                    ></button>*/}

                  <button
                    type="button"
                    onClick={() =>
                      setAppearanceSettings((prevState) => {
                        return { ...prevState, bg: "bg-dark-bg" };
                      })
                    }
                    className={classNames(
                      appearanceSettings?.bg === "bg-dark-bg"
                        ? "ring-2 ring-my-orange ring-offset-2"
                        : "",
                      "inline-flex items-center rounded-full border border-transparent bg-dark-bg p-5 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 dark:ring-offset-dark-100",
                    )}
                  ></button>
                </div>

                <div className="mt-4 flex w-full gap-5">
                  <button
                    type="button"
                    className="w-1/2 items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-center text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2 dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
                    onClick={closeSettingsModal}
                  >
                    {translate("Cancel")}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      switch (appearanceSettings?.bg) {
                        case "bg-dark-bg":
                          setTheme("dark");
                          break;
                        default:
                          setTheme("light");
                      }

                      dispatch(editSettings(appearanceSettings));
                      closeSettingsModal();
                    }}
                    className="w-1/2 items-center rounded-md border border-transparent bg-my-orange px-6 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-my-orange focus:outline-none focus:ring-2 focus:ring-my-orange focus:ring-offset-2"
                  >
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
export default Settings;
