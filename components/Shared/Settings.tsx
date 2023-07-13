import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { editSettings } from "../../redux/actions/settings";
import classNames from "../../utils/classNames";
import { RootState } from "../../redux/reducers/rootReducer";

interface Props {
  settingsIsOpen: boolean;
  closeSettingsModal: () => void;
}

const Settings = ({ settingsIsOpen, closeSettingsModal }: Props) => {
  const state = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  const [appearenceSettings, setAppearnceSettings] = useState(state);

  useEffect(() => {
    setAppearnceSettings(state);
  }, [state]);

  return (
    <div className="bg-gray-300">
      <Transition appear show={settingsIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 top-0 z-10"
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 border-gray-200 pb-4 text-gray-900 dark:text-gray-50"
                >
                  Setting
                </Dialog.Title>
                <div className="mt-2 border-t py-2 border-b">
                  <p
                    className={classNames(
                      " text-gray-500 dark:text-gray-200",
                      appearenceSettings?.fontSize === "small"
                        ? "text-md"
                        : "text-xl",
                      appearenceSettings?.spacing === "large"
                        ? "leading-loose"
                        : "",
                      appearenceSettings?.spacing === "medium"
                        ? "leading-normal"
                        : "",
                      appearenceSettings?.spacing === "small"
                        ? "leading-tight"
                        : ""
                    )}
                  >
                    O Kṛṣṇa, maintainer of the people, I have heard by disciplic
                    succession that those whose family traditions are destroyed
                    dwell always in hell.
                  </p>
                </div>

                <span className="relative mt-4 font-bold z-0 text-center w-full inline-flex shadow-sm rounded-md">
                  <button
                    type="button"
                    onClick={() =>
                      setAppearnceSettings((prevState) => {
                        return { ...prevState, fontSize: "small" };
                      })
                    }
                    className={classNames(
                      appearenceSettings?.fontSize === "small"
                        ? "text-my-orange"
                        : "text-gray-500 dark:text-gray-200",
                      "relative w-1/2 items-center align-center px-2 py-6 text-center rounded-l-md border border-gray-300 bg-white dark:bg-dark-100 text-sm font-bold hover:bg-gray-50 dark:hover:bg-dark-bg focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                    )}
                  >
                    <h2 className="text-center">-Aa</h2>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setAppearnceSettings((prevState) => {
                        return { ...prevState, fontSize: "large" };
                      })
                    }
                    className={classNames(
                      appearenceSettings?.fontSize === "large"
                        ? "text-my-orange"
                        : "text-gray-500 dark:text-gray-200",
                      "relative w-1/2 items-center align-center px-2 py-6 text-center rounded-r-md border border-gray-300 bg-white dark:bg-dark-100 text-sm font-bold hover:bg-gray-50 dark:hover:bg-dark-bg focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                    )}
                  >
                    <h2 className="text-center text-xl">+Aa</h2>
                  </button>
                </span>

                <div className="mt-4">
                  <span className="relative z-0 w-full inline-flex shadow-sm rounded-md">
                    <button
                      type="button"
                      onClick={() =>
                        setAppearnceSettings((prevState) => {
                          return { ...prevState, spacing: "large" };
                        })
                      }
                      className={classNames(
                        appearenceSettings?.spacing === "large"
                          ? "text-my-orange"
                          : "text-gray-700 dark:text-gray-200",
                        "relative text-center w-1/3 items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-dark-100 text-sm font-medium  hover:bg-gray-50 dark:hover:bg-dark-bg focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      )}
                    >
                      <Image
                        src="/text-wide.svg"
                        className="w-4 mx-auto"
                        alt="text wide icon"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAppearnceSettings((prevState) => {
                          return { ...prevState, spacing: "medium" };
                        })
                      }
                      className={classNames(
                        appearenceSettings?.spacing === "medium"
                          ? "text-my-orange"
                          : "text-gray-700 dark:text-gray-200",
                        "-ml-px relative text-center w-1/3 items-center px-4 py-2 border border-gray-300 bg-white dark:bg-dark-100 text-sm font-medium  hover:bg-gray-50 dark:hover:bg-dark-bg focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      )}
                    >
                      <Image
                        alt="text medium icon"
                        src="/text-medium.png"
                        className="w-4 mx-auto dark:fill-current dark:text-my-orange"
                        width={16}
                        height={16}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setAppearnceSettings((prevState) => {
                          return { ...prevState, spacing: "small" };
                        })
                      }
                      className={classNames(
                        appearenceSettings?.spacing === "small"
                          ? "text-my-orange"
                          : "text-gray-700 dark:text-gray-200",
                        "-ml-px relative text-center w-1/3 items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-dark-100 text-sm font-medium  hover:bg-gray-50 dark:hover:bg-dark-bg focus:z-10 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
                      )}
                    >
                      <Image
                        src="/text-narrow.svg"
                        className="w-4 mx-auto"
                        alt="text narrow icon"
                        width={16}
                        height={16}
                      />
                    </button>
                  </span>
                </div>

                <div className="mt-4 gap-6 flex">
                  <button
                    type="button"
                    onClick={() =>
                      setAppearnceSettings((prevState) => {
                        return { ...prevState, bg: "bg-light-bg" };
                      })
                    }
                    className={classNames(
                      appearenceSettings?.bg === "bg-light-bg"
                        ? "ring-2 ring-offset-2 ring-my-orange"
                        : "",
                      "inline-flex items-center p-5 border border-transparent rounded-full shadow-sm text-white dark:ring-offset-dark-100 bg-light-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                    )}
                  ></button>

                  <button
                    type="button"
                    onClick={() =>
                      setAppearnceSettings((prevState) => {
                        return { ...prevState, bg: "bg-yellow-bg" };
                      })
                    }
                    className={classNames(
                      appearenceSettings?.bg === "bg-yellow-bg"
                        ? "ring-2 ring-offset-2 ring-my-orange"
                        : "",
                      "inline-flex items-center p-5 border border-transparent rounded-full shadow-sm text-white dark:ring-offset-dark-100 bg-yellow-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                    )}
                  ></button>

                  <button
                    type="button"
                    onClick={() =>
                      setAppearnceSettings((prevState) => {
                        return { ...prevState, bg: "bg-dark-bg" };
                      })
                    }
                    className={classNames(
                      appearenceSettings?.bg === "bg-dark-bg"
                        ? "ring-2 ring-offset-2 ring-my-orange"
                        : "",
                      "inline-flex items-center p-5 border border-transparent rounded-full shadow-sm text-white dark:ring-offset-dark-100 bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                    )}
                  ></button>
                </div>

                <div className="mt-4 w-full flex gap-5">
                  <button
                    type="button"
                    className="text-center w-1/2 items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                    onClick={closeSettingsModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      dispatch(editSettings(appearenceSettings));
                      closeSettingsModal();
                    }}
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
export default Settings;
