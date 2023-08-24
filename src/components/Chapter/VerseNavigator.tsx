import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

import useMyStyles from "../../hooks/useMyStyles";
import { RootState } from "../../redux/reducers/rootReducer";
import classNames from "../../utils/classNames";

interface Props {
  verseCount: number;
  currentVerse: number;
  viewNavigation: boolean;
  setViewNavigation: Dispatch<SetStateAction<boolean>>;
  setVerseId: Dispatch<SetStateAction<number>>;
}

function VerseNavigator({
  verseCount,
  currentVerse,
  viewNavigation,
  setViewNavigation,
  setVerseId,
}: Props) {
  const styles = useMyStyles();
  const { fontSize } = useSelector((state: RootState) => state.settings);

  return (
    <div
      className={classNames(
        fontSize === "large" ? "top-12" : "top-10",
        `absolute flex w-full flex-wrap rounded border border-gray-200 bg-white p-3 shadow dark:border-dark-100 dark:bg-dark-bg ${
          !viewNavigation && "hidden"
        }`,
      )}
    >
      <div
        onClick={() => {
          setViewNavigation(false);
          setVerseId(0);
        }}
        className={classNames(
          `m-px flex min-w-[2.5rem] items-center justify-center rounded p-2 hover:cursor-pointer hover:bg-my-orange hover:text-white ${
            !currentVerse && "bg-my-orange text-white"
          }`,
          styles.fontSize.para,
        )}
      >
        {"All"}
      </div>
      {Array(verseCount)
        .fill(verseCount)
        .map((_verse, index) => (
          <div
            onClick={() => {
              setViewNavigation(false);
              setVerseId(index + 1);
            }}
            key={index}
            className={classNames(
              `m-px flex min-w-[2.5rem] items-center justify-center rounded p-2 hover:cursor-pointer hover:bg-my-orange hover:text-white ${
                index + 1 === currentVerse && "bg-my-orange text-white"
              }`,
              styles.fontSize.para,
            )}
          >
            {index + 1}
          </div>
        ))}
    </div>
  );
}

export default VerseNavigator;
