import { getTranslate } from "shared/translate";

import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";
import splitIntoParagraphs from "../../utils/splitIntoParagraphs";
import { Skeleton } from "../Skeleton";

interface Props {
  commentaryData: GitaLanguage[] | undefined;
  translations: Record<string, string>;
  locale: Locale;
}

export default function Commentary({
  commentaryData,
  translations,
  locale,
}: Props) {
  const styles = useMyStyles();
  const translate = getTranslate(translations, locale);

  const paragraphs = splitIntoParagraphs(commentaryData);

  return (
    <div className="mt-16">
      <h2
        className={classNames(
          "font-extrabold dark:text-gray-50",
          styles.fontSize.heading,
        )}
      >
        {translate("Commentary")}
      </h2>
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
