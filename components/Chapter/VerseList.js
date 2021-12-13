import React from "react";
import Link from "next/link";
const VerseList = ({ verseData }) => {
  const { id, verseNumber, transliteration } = verseData;
  return (
    <Link href={`/verse/${id}`}>
      <div className="w-full flex flex-col lg:flex-row py-2 lg:py-5 justify-between px-6 hover:cursor-pointer hover:bg-box-bg dark:hover:bg-dark-100 rounded-lg">
        <div className="text-sm lg:w-1/5 font-medium text-my-orange uppercase">
          Verse {verseNumber}
        </div>
        <div className="flex-1 text-sm text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-4">
          {transliteration}
        </div>
      </div>
    </Link>
  );
};

export default VerseList;
