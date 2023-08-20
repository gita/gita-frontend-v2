import Link from "next/link";
import { SvgList, SvgBookmark, SvgShuffle } from "../svgs";
import truncate from "../../utils/truncate";

interface Props {
  chapter: TChapter;
}

const Card = ({ chapter }: Props) => {
  return (
    <Link
      href={`/chapter/${chapter.id}`}
      prefetch={false}
      className="flex flex-col bg-white dark:bg-dark-100 drop-shadow-card border-2 border-white dark:border-dark-bg rounded-md p-6 hover:bg-box-bg dark:hover:bg-dark-bg hover:shadow-none hover:border-box-stroke dark:hover:border-dark-100 hover:border-2 hover:cursor-pointer dark:text-gray-200 z-10"
    >
      <h2 className="text-my-orange font-bold">
        Chapter {chapter.chapter_number}
      </h2>
      <h3 className="text-xl font-bold dark:text-white">
        {chapter.name_translated}
      </h3>
      <p className="flex-1 text-gray-500 dark:text-gray-100 mt-2 overflow-ellipsis">
        {truncate(chapter.chapter_summary, 280)}
      </p>

      <div className="flex justify-between">
        <div className="flex text-sm items-center mt-4 ">
          <SvgList className="mr-4" />
          <span className="mb-0.5">{chapter.verses_count} Verses</span>
        </div>

        {/* Hide for the time being until we implement notes and bookmarks */}
        {/* <div className="flex mt-4">
          <div className="flex text-sm items-center align-middle mr-3">
            <SvgBookmark className="h-5 w-5 mr-1" />2
          </div>

          <div className="flex text-sm items-center">
            <SvgShuffle className="h-5 w-5 mr-1" />2
          </div>
        </div> */}
      </div>
    </Link>
  );
};

export default Card;
