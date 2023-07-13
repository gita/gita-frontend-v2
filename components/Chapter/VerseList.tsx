import Link from "next/link";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

type VerseData = Omit<GitaVerse, "wordMeanings">;

interface Props {
  verseData: VerseData;
}

const VerseList = ({ verseData }: Props) => {
  const { id, verseNumber, transliteration } = verseData;
  const styles = useMyStyles();

  return (
    <Link href={`/verse/${id}`}>
      <div className="w-full flex flex-col lg:flex-row py-2 lg:py-5 justify-between px-6 hover:cursor-pointer hover:bg-box-bg dark:hover:bg-dark-100 rounded-lg">
        <div
          className={classNames(
            "lg:w-1/5 font-medium text-my-orange uppercase",
            styles.fontSize && styles.fontSize.para && styles.lineHeight
          )}
        >
          Verse {verseNumber}
        </div>
        <div
          className={classNames(
            "flex-1 text-gray-900 dark:text-gray-50 sm:mt-0 sm:col-span-4",
            styles.fontSize && styles.fontSize.para && styles.lineHeight
          )}
        >
          {transliteration}
        </div>
      </div>
    </Link>
  );
};

export default VerseList;
