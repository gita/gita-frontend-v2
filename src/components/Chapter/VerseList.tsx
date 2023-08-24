import Link from "next/link";

import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

type VerseData = Pick<
  GitaVerse,
  "verse_number" | "gita_translations" | "chapter_number"
>;

interface Props {
  verseData: VerseData;
}

const VerseList = ({ verseData }: Props) => {
  const { verse_number, gita_translations, chapter_number } = verseData;
  const styles = useMyStyles();

  return (
    <Link
      href={`/chapter/${chapter_number}/verse/${verse_number}`}
      prefetch={false}
    >
      <div className="flex w-full flex-col justify-between rounded-lg px-6 py-2 hover:cursor-pointer hover:bg-box-bg dark:hover:bg-dark-100 lg:flex-row lg:py-5">
        <div
          className={classNames(
            "font-medium uppercase text-my-orange lg:w-1/5",
            styles.fontSize && styles.fontSize.para && styles.lineHeight,
          )}
        >
          Verse {verse_number}
        </div>
        <div
          className={classNames(
            "flex-1 text-gray-900 dark:text-gray-50 sm:col-span-4 sm:mt-0",
            styles.fontSize && styles.fontSize.para && styles.lineHeight,
          )}
        >
          {gita_translations[0].description}
        </div>
      </div>
    </Link>
  );
};

export default VerseList;
