import useMyStyles from "hooks/useMyStyles";
import { getTranslate } from "shared/translate";
import classNames from "utils/classNames";

type Props = {
  translationData: GitaLanguage[] | undefined;
} & LocaleAndTranslations;

export default function Translation({
  translationData,
  translations,
  locale,
}: Props) {
  const styles = useMyStyles();
  const translate = getTranslate(translations, locale);

  return (
    <div>
      <h2
        className={classNames(
          "font-extrabold dark:text-gray-50",
          styles.fontSize.heading,
        )}
      >
        {translate("Translation")}
      </h2>
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
