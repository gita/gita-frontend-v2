import React from "react";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

function VerseNavigator({
  verseCount,
  currentVerse,
  viewNavigation,
  setViewNavigation,
  setVerseId,
}) {
  const styles = useMyStyles();

  return (
    <div
      className={`flex absolute top-10 w-full lg:w-[120%] bg-white dark:bg-dark-bg p-3 flex-wrap border border-gray-200 dark:border-dark-100 shadow rounded ${
        !viewNavigation && "hidden"
      }`}
    >
      <div
        onClick={() => {
          setViewNavigation(false);
          setVerseId("");
        }}
        className={classNames(
          `block h-10 w-10 p-2 m-px rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
            !currentVerse && "bg-my-orange text-white"
          }`,
          styles.fontSize.para
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
              `block h-10 w-10 p-2 m-px rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
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
