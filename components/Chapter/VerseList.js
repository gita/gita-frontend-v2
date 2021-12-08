import React from "react";

const VerseList = ({ verseData }) => {
  const { verseNumber, transliteration } = verseData;
  return (
    <div className='w-full flex flex-col lg:flex-row py-2 lg:py-5 justify-between px-6 hover:bg-box-bg rounded-lg'>
      <div className='text-sm lg:w-1/5 font-medium text-my-orange uppercase'>
        Verse {verseNumber}
      </div>
      <div className='flex-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4'>
        {transliteration}
      </div>
    </div>
  );
};

export default VerseList;
