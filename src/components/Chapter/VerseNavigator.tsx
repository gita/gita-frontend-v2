import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

import LinkWithLocale from "components/LinkWithLocale";
import useMyStyles from "hooks/useMyStyles";
import { RootState } from "redux/reducers/rootReducer";
import { classNames } from "shared/functions";

interface Props {
  verseCount: number;
  currentVerse: number;
  chapterNumber: number;
  viewNavigation: boolean;
  setViewNavigation: Dispatch<SetStateAction<boolean>>;
  setVerseId: Dispatch<SetStateAction<number>>;
}

function VerseNavigator({
  verseCount,
  currentVerse,
  chapterNumber,
  viewNavigation,
  setViewNavigation,
  setVerseId,
}: Props) {
  const styles = useMyStyles();
  const { fontSize } = useSelector((state: RootState) => state.settings);

  return (
    <div
      className={classNames(
        fontSize === "large" ? "top-12" : "top-10",
        `absolute mt-2 flex w-full flex-wrap justify-center rounded border border-gray-200 bg-white py-1 shadow dark:border-dark-100 dark:bg-dark-bg ${
          !viewNavigation && "hidden"
        }`,
      )}
    >
      <div
        onClick={() => {
          setViewNavigation(false);
          setVerseId(0);
        }}
        className={classNames(
          ` flex min-w-[2.5rem] items-center justify-center rounded  hover:cursor-pointer hover:bg-my-orange hover:text-white ${
            !currentVerse && "bg-my-orange text-white"
          }`,
          styles.fontSize.para,
        )}
      >
        {"All"}
      </div>
      {Array(verseCount)
        .fill(verseCount)
        .map((_verse, index) => (
          <LinkWithLocale
            key={index}
            href={`/chapter/${chapterNumber}/verse/${index + 1}`}
            prefetch={false}
          >
            <div
              onClick={() => {
                setViewNavigation(false);
                setVerseId(index + 1);
              }}
              className={classNames(
                `flex min-w-[2.3rem] items-center justify-center rounded py-1 hover:cursor-pointer hover:border hover:bg-my-orange hover:text-white ${
                  index + 1 === currentVerse && "bg-my-orange text-white"
                }`,
                styles.fontSize.para,
              )}
            >
              {index + 1}
            </div>
          </LinkWithLocale>
        ))}
    </div>
  );
}

export default VerseNavigator;
