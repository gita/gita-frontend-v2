import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

interface Props {
  translationData: GitaLanguage[] | undefined;
}

export default function Translation({ translationData }: Props) {
  const styles = useMyStyles();

  return (
    <div>
      <h1
        className={classNames(
          "font-extrabold dark:text-gray-50",
          styles.fontSize.heading
        )}
      >
        Translation
      </h1>
      <p
        className={classNames(
          "mt-6 mx-auto text-justify dark:text-gray-50 ",
          styles.fontSize.para
        )}
      >
        {translationData ? translationData[0]?.description : ""}
      </p>
    </div>
  );
}
