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
      className="z-10 flex flex-col rounded-md border-2 border-white bg-white p-6 drop-shadow-card hover:cursor-pointer hover:border-2 hover:border-box-stroke hover:bg-box-bg hover:shadow-none dark:border-dark-bg dark:bg-dark-100 dark:text-gray-200 dark:hover:border-dark-100 dark:hover:bg-dark-bg"
    >
      <h3 className="font-bold text-my-orange">
        Chapter {chapter.chapter_number}
      </h3>
      <h2 className="text-xl font-bold dark:text-white">
        {chapter.name_translated}
      </h2>
      <p className="mt-2 flex-1 text-ellipsis text-gray-500 dark:text-gray-100">
        {truncate(chapter.chapter_summary, 280)}
      </p>

      <div className="flex justify-between">
        <div className="mt-4 flex items-center text-sm ">
          <SvgList className="mr-4" />
          <span className="mb-0.5">{chapter.verses_count} Verses</span>
        </div>

        <div className="mt-4 flex">
          <div className="mr-3 flex items-center align-middle text-sm">
            <SvgBookmark className="mr-1 h-5 w-5" />2
          </div>

          <div className="flex items-center text-sm">
            <SvgShuffle className="mr-1 h-5 w-5" />2
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
