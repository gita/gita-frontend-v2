import { FC } from "react";
import classNames from "../../utils/classNames";
import useMyStyles from "../../hooks/useMyStyles";
import PageNavigator from "../Chapter/PageNavigator";
import { Skeleton } from "../Shared/Skeleton";
import { SvgFloralDivider } from "../svgs";
import Translation from "./Translation";
import Commentary from "./Commentary";

interface VerseProps {
  verse: GitaVerse;
  advancedSettings: AdvancedSettings;
}

interface AdvancedSettings {
  devnagari: boolean;
  verseText: boolean;
  synonyms: boolean;
  translation: boolean;
  purport: boolean;
}

export const Verse: FC<VerseProps> = ({
  verse: {
    gita_chapter,
    verse_number,
    chapter_number,
    text,
    transliteration,
    word_meanings,
    gita_translations,
    gita_commentaries,
  },
  advancedSettings: { devnagari, verseText, synonyms, translation, purport },
}) => {
  const styles = useMyStyles();

  return (
    <>
      <PageNavigator
        pageCount={18}
        route="verse"
        maxVerseCount={gita_chapter.verses_count}
        verseNumber={verse_number}
        pageNumber={chapter_number}
      />

      <section className="max-w-5xl font-inter py-16 mx-auto text-center px-4 sm:px-6">
        <h1
          className={classNames(
            "font-extrabold dark:text-gray-50",
            styles.fontSize.heading
          )}
        >
          BG {chapter_number}.{verse_number}
        </h1>
        {devnagari &&
          (text ? (
            <p
              className={classNames(
                "font-dev text-my-orange mt-8 max-w-md mx-auto",
                styles.fontSize.subHeading1
              )}
            >
              {text}
            </p>
          ) : (
            <div className="flex flex-col items-center w-full max-w-md mx-auto pt-10">
              <Skeleton height="h-8" width="w-full" margin="mb-2" />
              <Skeleton height="h-8" width="w-5/6" margin="mb-2" />
              <Skeleton height="h-8" width="w-4/5" margin="mb-2" />
            </div>
          ))}
        {verseText && (
          <p
            className={classNames(
              "mt-6 max-w-md mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2
            )}
          >
            {transliteration}
          </p>
        )}
        {synonyms &&
          (text ? (
            <p
              className={classNames(
                "mt-6 mx-auto dark:text-gray-50",
                styles.fontSize.subHeading2
              )}
            >
              {word_meanings}
            </p>
          ) : (
            <>
              <div className="flex flex-col items-center w-full max-w-md mx-auto pt-3">
                <Skeleton height="h-5" width="w-full" margin="mb-3" />
                <Skeleton height="h-5" width="w-5/6" margin="mb-3" />
              </div>
              <div className="flex flex-col items-center w-full pt-3">
                <Skeleton height="h-5" width="w-full" margin="mb-3" />
                <Skeleton height="h-5" width="w-5/6" margin="mb-3" />
                <Skeleton height="h-5" width="w-4/5" margin="mb-3" />
              </div>
            </>
          ))}
        {(translation || purport) && (
          <SvgFloralDivider
            className={`my-20 w-full ${
              styles.backgroundColor === "white"
                ? "text-white"
                : "text-yellow-bg"
            } dark:text-dark-bg`}
          />
        )}
        {translation && <Translation translationData={gita_translations} />}
        {purport && <Commentary commentaryData={gita_commentaries} />}
      </section>
    </>
  );
};
