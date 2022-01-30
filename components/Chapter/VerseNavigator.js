import React from "react";

function VerseNavigator({
  verseCount,
  currentVerse,
  viewNavigation,
  setViewNavigation,
  setVerseId,
}) {
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
        className={`block h-10 w-10 p-2 m-px rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
          !currentVerse && "bg-my-orange text-white"
        }`}
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
            className={`block h-10 w-10 p-2 m-px rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
              index + 1 === currentVerse && "bg-my-orange text-white"
            }`}
          >
            {index + 1}
          </div>
        ))}
    </div>
  );
}

export default VerseNavigator;
