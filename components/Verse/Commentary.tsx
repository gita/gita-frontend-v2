import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

interface Props {
  commentaryData: Node | null;
}

export default function Commentary({ commentaryData }: Props) {
  const styles = useMyStyles();

  return (
    <div>
      <h1
        className={classNames(
          "font-extrabold mt-4 dark:text-gray-50",
          styles.fontSize.heading
        )}
      >
        Commentary
      </h1>
      <p
        className={classNames(
          "mt-4 mx-auto text-justify dark:text-gray-50",
          styles.fontSize.para,
          styles.lineHeight
        )}
      >
        {commentaryData?.description}
      </p>
    </div>
  );
}
