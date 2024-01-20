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
      <div className="flex flex-col h-screen">
        <div className="flex-1 relative mx-auto max-w-5xl px-4 text-center font-inter sm:px-6 sm:py-28 overflow-hidden">
          <div className="absolute inset-x-0 top-[5%] mx-auto max-w-5xl text-center font-inter">
            <SvgChapterBackground className="relative inset-x-0 bottom-0 m-auto w-full rounded-full text-gray-300 text-opacity-25 dark:text-black dark:text-opacity-25 lg:top-12 lg:w-min" />
          </div>

          <div className="xs:py-24 relative mx-auto max-w-5xl px-4 text-center font-inter sm:px-6 sm:py-28">
            <h2
              className={classNames(
                "font-medium uppercase text-my-orange",
                styles.fontSize.subHeading2,
              )}
            >
              {translate("Quote")} {quoteNumber}
            </h2>
            <p
              className={classNames(
                "dark:text-white max-w-2xl md:text-2xl mt-3 mx-auto sm:text-xl text-center text-lg",
                styles.lineHeight,
              )}
            >
              {quote}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
