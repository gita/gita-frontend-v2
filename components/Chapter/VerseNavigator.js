import React from "react";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import { useSelector } from "react-redux";

function VerseNavigator({
  verseCount,
  currentVerse,
  viewNavigation,
  setViewNavigation,
  setVerseId,
}) {
  const styles = useMyStyles();
  const { fontSize } = useSelector((state) => state.settings);

  return (
    <div
      className={classNames(
        fontSize === "large" ? "top-12" : "top-10",
        `flex absolute w-full bg-white dark:bg-dark-bg p-3 flex-wrap border border-gray-200 dark:border-dark-100 shadow rounded ${
          !viewNavigation && "hidden"
        }`
      )}
    >
      <div
        onClick={() => {
          setViewNavigation(false);
          setVerseId("");
        }}
        className={classNames(
          `flex items-center justify-center min-w-[2.5rem] p-2 m-px rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
            !currentVerse && "bg-my-orange text-white"
          }`,
          styles.fontSize.para,styles.lineHeight
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
              `flex items-center justify-center min-w-[2.5rem] p-2 m-px rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
                index + 1 === currentVerse && "bg-my-orange text-white"
              }`,
              styles.fontSize.para
            )}
          >
            {index + 1}
          </div>
        ))}
    </div>
  );
}

export default VerseNavigator;
