import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import splitIntoParagraphs from "../../utils/splitIntoParagraphs";

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
          styles.fontSize.heading
        )}
      >
        Commentary
      </h1>
      {paragraphs?.map((paragraph) => (
        <p
          key={paragraph}
          className={classNames(
            "mt-6 mx-auto text-justify dark:text-gray-50 whitespace-pre-wrap",
            styles.fontSize.para
          )}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
