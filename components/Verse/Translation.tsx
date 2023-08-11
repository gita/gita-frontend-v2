import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import { Skeleton } from "../Shared/Skeleton";

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
      {translationData && translationData[0]?.description ? (
        <p
          className={classNames(
            "mt-6 mx-auto text-justify dark:text-gray-50 ",
            styles.fontSize.para
          )}
        >
          {translationData[0].description}
        </p>
      ) : (
        <>
          <Skeleton height="h-5" width="w-full" margin="my-3" />
          <Skeleton height="h-5" width="w-4/5" margin="my-3" />
        </>
      )}
    </div>
  );
}
