import { useEffect, useState } from "react";
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
          className={`absolute left-3 top-2 z-[60] flex size-10 items-center justify-center rounded-full border hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:hover:bg-dark-bg md:top-1/2 lg:left-40`}
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </button>
      )}
      {nextQuote <= quoteCount && (
        <button
          onClick={next}
          className={`absolute right-3 top-2 z-[60] flex size-10 items-center justify-center rounded-full border hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:hover:bg-dark-bg md:top-1/2 lg:right-40`}
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </button>
      )}
    </>
  );
}
