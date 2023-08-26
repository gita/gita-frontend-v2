import { getTranslate } from "shared/translate";

import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

interface Props {
  translationData: GitaLanguage[] | undefined;
  translations: Record<string, string>;
  locale: Locale;
}

export default function Translation({
  translationData,
  translations,
  locale,
}: Props) {
  const styles = useMyStyles();
  const translate = getTranslate(translations, locale);

  return (
    <div>
      <h1
        className={classNames(
          "font-extrabold dark:text-gray-50",
          styles.fontSize.heading,
        )}
      >
        {translate("Translation")}
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
