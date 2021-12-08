import React from "react";
import Link from "next/link";

const VerseCard = ({ chapter }) => {
  return (
    // <Link href={`/chapter/${chapter.id}`}>
    <Link href='/verse'>
      <div className='flex flex-col bg-white shadow-xl  border-2 border-white mt-6 rounded-md p-6 hover:bg-box-bg hover:shadow-none hover:border-box-stroke hover:border-2 hover:cursor-pointer'>
        <h3 className='text-my-orange font-bold'>
          Chapter {chapter.chapterNumber}
        </h3>
        <h2 className='text-xl font-bold'>{chapter.nameTranslated}</h2>
        <p className='flex-1 text-gray-500 mt-2'>{chapter.chapterSummary}</p>

        <div className='flex justify-between'>
          <div className='flex text-sm items-center mt-4'>
            <img src='/list.svg' className='h-5 w-5 mr-4' />
            {chapter.versesCount} Verses
          </div>

          <div className='flex mt-4'>
            <div className='flex text-sm items-center align-middle mr-3'>
              <img src='/bookmark.svg' className='h-4  w-4 mr-1' />2
            </div>

            <div className='flex text-sm items-center'>
              <img src='/shuffle.svg' className='h-5 w-5 mr-1' />2
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VerseCard;
