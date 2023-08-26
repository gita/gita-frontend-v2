import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import splitIntoParagraphs from "../../utils/splitIntoParagraphs";
import { Skeleton } from "../Skeleton";

interface Props {
  commentaryData: GitaLanguage[] | undefined;
}

export default function Commentary({ commentaryData }: Props) {
  const styles = useMyStyles();

  const paragraphs = splitIntoParagraphs(commentaryData);

  return (
    <div className="mt-16">
      <h1
        className={classNames(
          "font-extrabold dark:text-gray-50",
          styles.fontSize.heading,
        )}
      >
        Commentary
      </h1>
      {paragraphs?.[0] ? (
        paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className={classNames(
              "mx-auto mt-6 whitespace-pre-wrap text-justify dark:text-gray-50",
              styles.fontSize.para,
            )}
          >
            {paragraph}
          </p>
        ))
      ) : (
        <>
          <Skeleton width="w-full" height="h-5" margin="my-3" />
          <Skeleton width="w-full" height="h-5" margin="my-3" />
          <Skeleton width="w-full" height="h-5" margin="my-3" />
          <Skeleton width="w-full" height="h-5" margin="my-3" />
          <Skeleton width="w-4/5" height="h-5" margin="my-3" />
        </>
      )}
    </div>
  );
}
