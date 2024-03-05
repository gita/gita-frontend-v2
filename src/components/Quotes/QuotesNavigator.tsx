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

  const [isScrolling, setIsScrolling] = useState(false);

  const next = () => {
    quoteIndex < quoteCount - 1 && setQuote(quoteIndex + 1);
  };

  const previous = () => {
    quoteIndex > 0 && setQuote(quoteIndex - 1);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {previousQuote >= 1 && (
        <button
          onClick={previous}
          className={`fixed left-3 top-3/4 z-[60] flex h-10 w-10 items-center justify-center rounded-full border hover:cursor-pointer hover:brightness-90 dark:border-gray-600 dark:hover:bg-dark-bg lg:left-40 ${
            isScrolling ? "bg-white dark:bg-dark-100" : ""
          }`}
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </button>
      )}
      {nextQuote <= quoteCount && (
        <button
          onClick={next}
          className={`fixed right-3 top-3/4 z-[60] flex h-10 w-10 items-center justify-center rounded-full border hover:cursor-pointer  hover:brightness-90 dark:border-gray-600 dark:hover:bg-dark-bg lg:right-40
            ${ isScrolling ? "bg-white dark:bg-dark-100" : ""}
          `}
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </button>
      )}
    </>
  );
}
