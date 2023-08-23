import { Dispatch, SetStateAction } from "react";
import { SvgChevronLeft, SvgChevronRight } from "../svgs";

interface Props {
  quoteIndex: number;
  quoteCount: number;
  setQuote: Dispatch<SetStateAction<number>>;
}

export default function QuotesNavigator({
  quoteIndex,
  quoteCount,
  setQuote,
}: Props) {
  const quoteNumber = quoteIndex + 1;
  const nextQuote = quoteNumber + 1;
  const previousQuote = quoteNumber - 1;

  const next = () => {
    quoteIndex < quoteCount - 1 && setQuote(quoteIndex + 1);
  };

  const previous = () => {
    quoteIndex > 0 && setQuote(quoteIndex - 1);
  };

  return (
    <>
      {previousQuote >= 1 && (
        <button
          onClick={previous}
          className="absolute left-1 top-1/2 z-[60] flex h-10 w-10 items-center justify-center rounded-full border bg-white hover:cursor-pointer  hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg md:top-1/2"
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </button>
      )}
      {nextQuote <= quoteCount && (
        <button
          onClick={next}
          className="absolute right-1 top-1/2 z-[60] flex h-10 w-10 items-center justify-center rounded-full border bg-white hover:cursor-pointer  hover:brightness-90 dark:border-gray-600 dark:bg-dark-100 dark:hover:bg-dark-bg md:top-1/2"
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </button>
      )}
    </>
  );
}
