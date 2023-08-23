import { Dispatch, SetStateAction } from "react";

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

function Modal({ modalVisible, setModalVisible }: Props) {
  return (
    <div className={`relative z-50 ${!modalVisible && "hidden"}`}>
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        x-ref="dialog"
        aria-modal="true"
      >
        <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity dark:bg-dark-bg"
            aria-hidden="true"
          ></div>

          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          ></span>

          <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all duration-200 dark:bg-dark-100 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-dark-bg">
                <svg
                  className="h-6 w-6 text-yellow-400"
                  x-description="Heroicon name: outline/check"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="mt-3 px-5 text-center sm:mt-5">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                  id="modal-title"
                >
                  Subscription Successful!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Congratulations! You have now subscribed to the daily
                    &quot;Shloka of the Day&quot; newsletter.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="mx-auto flex w-1/3 justify-center rounded-md border border-transparent bg-my-orange px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 sm:text-sm"
                onClick={() => setModalVisible(false)}
              >
                I got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
