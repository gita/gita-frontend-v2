import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import languages from "../../constant/languages.json"; //todo: use graphql api to fetch
import Link from "next/link";
import { useDispatch, connect } from "react-redux";
import { supabase } from "../../utils/supabase";
import { setNotification } from "../../redux/actions/main";

interface Props {
  notesSettingsIsOpen: boolean;
  closeNotesSettingsModal: () => void;
  currentVerse: CurrentVerse;
}

const NotesModal = ({
  notesSettingsIsOpen,
  closeNotesSettingsModal,
  currentVerse,
}: Props) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit() {
    const { data } = await supabase.auth.getSession();
    if (data.session === null) {
      dispatch(
        setNotification({
          status: "failed",
          message: "Please Login to Save Notes",
        })
      );
    } else {
      const { error } = await supabase.from("Notes").insert([
        {
          verse_id: currentVerse.id,
          user_id: data.session.user.id,
          description: description,
        },
      ]);
      if (error) {
        dispatch(
          setNotification({
            status: "failed",
            message: "Error in Saving Note: " + error.message,
          })
        );
      } else {
        dispatch(
          setNotification({
            status: "success",
            message: "Note saved successfully",
          })
        );
      }
    }
    closeNotesSettingsModal();
  }

  return (
    <div>
      <Transition appear show={notesSettingsIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 top-0 z-10"
          onClose={closeNotesSettingsModal}
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
                <Link href="/notes">View Notes</Link>
                <div className="flex py-2 justify-between my-2 items-center">
                  <p className="text-base text-black dark:text-white">
                    Add/Edit Notes
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add your comment
                  </label>
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      onChange={(event) => setDescription(event.target.value)}
                      value={description}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mt-8 w-full flex gap-5">
                  <button
                    type="button"
                    className="text-center w-1/2 items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-dark-100 hover:bg-gray-50 dark:hover:bg-dark-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                    onClick={closeNotesSettingsModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="text-center w-1/2 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-my-orange hover:bg-my-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
                  >
                    Submit
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

const mapStateToProps = (state) => {
  return {
    currentVerse: state?.settings?.currentVerse,
  };
};

export default connect(mapStateToProps)(NotesModal);
