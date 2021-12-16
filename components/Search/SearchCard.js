import React from "react";
import Link from "next/link";
const SearchCard = ({ searchData }) => {
  //   const { chapterNumber, verseNumber, transliteration } = searchData;
  const chapterNumber = 1;
  const verseNumber = 1;
  const transliteration =
    "Dhritarashtra said: O Sanjay, after gathering on the holy field of Kurukshetra, and desiring to fight, what did my sons and the sons of Pandu do?";
  const id = 1;
  return (
    <Link href={`/verse/${id}`}>
      <div className="w-full flex flex-col border mt-4 py-2 lg:py-5 justify-between px-6 hover:cursor-pointer hover:bg-box-bg rounded-lg">
        <div className="text-md lg:w-1/5 pb-2 font-semibold text-my-orange uppercase">
          Chapter {chapterNumber} - verse {verseNumber}
        </div>
        <div className="flex-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
          {transliteration}
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
