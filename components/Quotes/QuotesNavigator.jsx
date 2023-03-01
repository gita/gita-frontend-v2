import React from "react";
import { SvgChevronLeft, SvgChevronRight } from "../svgs";

export default function QuotesNavigator({ quoteNumber, quoteCount, setQuote }) {
  const nextQuote = quoteNumber + 1;
  const previousQuote = quoteNumber - 1;
  return (
    <>
      {previousQuote >= 1 && (
        <a className="rounded-full h-10 w-10 absolute z-neg top-1/2 md:top-1/3 left-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border">
          <SvgChevronLeft className="dark:text-gray-50" />
        </a>
      )}
      {nextQuote <= quoteCount && (
        <button className="rounded-full h-10 w-10 absolute z-neg top-1/2 md:top-1/3 right-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border">
          <SvgChevronRight className="dark:text-gray-50" />
        </button>
      )}
    </>
  );
}
