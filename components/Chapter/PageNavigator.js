import React from "react";
import Link from "next/link";
import { SvgChevronLeft, SvgChevronRight } from "../svgs";

function PageNavigator({ pageNumber, pageCount, route }) {
  const nextPage = pageNumber + 1;
  const previousPage = pageNumber - 1;

  return (
    <div className="relative z-10">
      {previousPage >= 1 && (
        <Link
          href={`/${route}/${previousPage}`}
          passHref
          className="rounded-full h-10 w-10 fixed z-neg top-1/2 left-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border"
        >
          <SvgChevronLeft className="dark:text-gray-50" />
        </Link>
      )}
      {nextPage <= pageCount && (
        <Link
          href={`/${route}/${nextPage}`}
          passHref
          className="rounded-full h-10 w-10 fixed z-neg top-1/2 right-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border"
        >
          <SvgChevronRight className="dark:text-gray-50" />
        </Link>
      )}
    </div>
  );
}

export default PageNavigator;
