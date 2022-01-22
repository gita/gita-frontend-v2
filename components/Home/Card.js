import React from "react";
import Link from "next/link";
import { SvgList, SvgBookmark, SvgShuffle } from "../svgs";
import truncate from "../../utils/truncate";

const Card = ({ chapter }) => {
  return (
    <Link href={`/chapter/${chapter.id}`}>
      <div className="flex flex-col bg-white dark:bg-dark-100 shadow-xl  border-2 border-white dark:border-dark-bg mt-6 rounded-md p-6 hover:bg-box-bg dark:hover:bg-dark-bg hover:shadow-none hover:border-box-stroke dark:hover:border-dark-100 hover:border-2 hover:cursor-pointer dark:text-gray-200">
        <h3 className="text-my-orange font-bold">
          Chapter {chapter.chapterNumber}
        </h3>
        <h2 className="text-xl font-bold dark:text-white">
          {chapter.nameTranslated}
        </h2>
        <p className="flex-1 text-gray-500 dark:text-gray-100 mt-2 overflow-ellipsis">
          {truncate(chapter.chapterSummary, 280)}
        </p>

        <div className="flex justify-between">
          <div className="flex text-sm items-center mt-4 ">
            <SvgList className="mr-4" />
            {chapter.versesCount} Verses
          </div>

          <div className="flex mt-4">
            <div className="flex text-sm items-center align-middle mr-3">
              <SvgBookmark className="h-5 w-5 mr-1" />2
            </div>

            <div className="flex text-sm items-center">
              <SvgShuffle className="h-5 w-5 mr-1" />2
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
