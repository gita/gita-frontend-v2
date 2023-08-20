import { Dispatch, SetStateAction } from "react";

interface Props {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

function Modal({ modalVisible, setModalVisible }: Props) {
  return (
    <div className={`relative z-50 ${!modalVisible && "hidden"}`}>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        x-ref="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 dark:bg-dark-bg opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <div className="inline-block align-bottom bg-white dark:bg-dark-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl duration-200 transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-dark-bg">
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
              <div className="mt-3 text-center px-5 sm:mt-5">
                <p
                  className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200"
                  id="modal-title"
                >
                  Subscription Successful!
                </p>
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
                className="w-1/3 mx-auto flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-my-orange text-base font-medium text-white hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
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
