import React from "react";
import { SvgChevronLeft, SvgChevronRight } from "../svgs";

export default function QuotesNavigator({ quoteIndex, quoteCount, setQuote }) {
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
          className="rounded-full h-10 w-10 absolute z-[60] top-1/2 md:top-1/2 left-1 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border"
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </button>
      )}
      {nextQuote <= quoteCount && (
        <button
          onClick={next}
          className="rounded-full h-10 w-10 absolute z-[60] top-1/2 md:top-1/2 right-1 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border"
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </button>
      )}
    </>
  );
}
