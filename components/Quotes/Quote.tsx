import { SvgChapterBackground } from "../svgs";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

interface Props {
  quoteNumber: number;
  quote: string;
}

export default function Quote({ quoteNumber, quote }: Props) {
  const styles = useMyStyles();
  return (
    <>
      <div className="absolute max-w-5xl font-inter left-0 right-0 top-[5%] mx-auto text-center ">
        <SvgChapterBackground className="relative text-gray-300 w-full lg:w-min dark:text-black text-opacity-25 dark:text-opacity-25 rounded-full m-auto left-0 right-0 bottom-0 lg:top-12" />
      </div>

      <div className="max-w-5xl font-inter xs:py-24 sm:py-28 mx-auto text-center px-4 sm:px-6 relative">
        <h2
          className={classNames(
            "text-my-orange font-medium uppercase",
            styles.fontSize.subHeading2
          )}
        >
          Quote {quoteNumber}
        </h2>
        <p
          className={classNames(
            "text-center dark:text-white mt-3 mx-auto max-w-2xl text-2xl",
            styles.lineHeight
          )}
        >
          {quote}
        </p>
      </div>
    </>
  );
}
