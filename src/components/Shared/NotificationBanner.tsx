import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/actions/main";

interface Props {
  message: string;
  status: string;
}

export default function NotificationBanner({ message, status }: Props) {
  const dispatch = useDispatch();
  const hideBanner = () => {
    dispatch(setNotification(null));
  };
  return (
    <div
      className={`relative ${
        status == "failed"
          ? "bg-red-600"
          : status == "success"
          ? "bg-my-orange"
          : "bg-my-orange"
      }`}
    >
      <div className="mx-auto max-w-7xl p-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium text-white">
            <span className="md:hidden">{message}</span>
            <span className="hidden md:inline">{message}</span>
            <span className="block sm:ml-2 sm:inline-block"></span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-start pr-1 pt-1 sm:items-start sm:pr-2 sm:pt-1">
          <button
            type="button"
            className="flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              onClick={hideBanner}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
