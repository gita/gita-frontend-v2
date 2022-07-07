import React from "react";
import Link from "next/link";

const SearchCard = ({ id,chapterNumber, verseNumber,transliteration,wordMeanings,text}) => {
  //   const { chapterNumber, verseNumber, transliteration } = searchData;
    
  return (
    <Link href={`/verse/${id}`}>
      <div className="w-full flex flex-col border mt-4 py-2 lg:py-5 justify-between px-6 hover:cursor-pointer hover:bg-box-bg rounded-lg">
        <div className="text-md lg:w-2/5 pb-2 font-semibold text-my-orange uppercase">
          Chapter {chapterNumber} - verse {verseNumber}
        </div>
        <div className="flex-1 text-md text-gray-900 font-semibold sm:mt-0 sm:col-span-4">
          {text}
        </div>
        <div className="flex-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4">
          {wordMeanings}
        </div>
        <div className="flex-1 mt-4 text-sm text-my-orange sm:mt-0 sm:col-span-4">
          {transliteration}
        </div>

      </div>
    </Link>
  );
};

export default SearchCard;
