import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import { Skeleton } from "../Skeleton";

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
          styles.fontSize.heading,
        )}
      >
        Translation
      </h1>
      {translationData && translationData[0]?.description ? (
        <p
          className={classNames(
            "mx-auto mt-6 text-justify dark:text-gray-50 ",
            styles.fontSize.para,
          )}
        >
          {translationData[0].description}
        </p>
      ) : (
        <p>Selected translation option is not available for this verse</p>
      )}
    </div>
  );
}
