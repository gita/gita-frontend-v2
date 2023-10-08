import useMyStyles from "hooks/useMyStyles";
import { classNames } from "shared/functions";

import { SvgChapterBackground } from "../svgs";

interface Props {
  quoteNumber: number;
  quote: string;
  translate: Translate;
}

export default function Quote({ quoteNumber, quote, translate }: Props) {
  const styles = useMyStyles();
  return (
    <>
      <div className="absolute inset-x-0 mx-auto text-center font-inter">
        <SvgChapterBackground className="relative inset-x-0 bottom-0 m-auto h-full w-full rounded-full text-gray-300 text-opacity-25 dark:text-black dark:text-opacity-25 md:min-w-fit lg:w-min" />
      </div>

      <div className="xs:py-24 relative mx-auto max-w-5xl px-4 text-center font-inter sm:px-6 sm:py-28">
        <h2
          className={classNames(
            "font-medium uppercase text-my-orange mt-2",
            styles.fontSize.subHeading2,
          )}
        >
          {translate("Quote")} {quoteNumber}
        </h2>
        <p
          className={classNames(
            "mx-auto mt-3 max-w-2xl text-center text-2xl dark:text-white",
            styles.lineHeight,
          )}
        >
          {quote}
        </p>
      </div>
    </>
  );
}
