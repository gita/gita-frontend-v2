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
      className={`flex absolute top-10 w-full lg:w-[120%] bg-white p-3 flex-wrap border border-gray-200 shadow rounded ${
        !viewNavigation && "hidden"
      }`}
    >
      {Array(verseCount)
        .fill(verseCount)
        .map((_verse, index) => (
          <div
            onClick={() => {
              setViewNavigation(false);
              setVerseId(index + 1);
            }}
            className={`block h-10 w-10 p-2 rounded hover:cursor-pointer hover:bg-my-orange hover:text-white ${
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
