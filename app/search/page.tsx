import { Suspense } from "react";
import { Metadata } from "next";
import SearchPage from "./search-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Search",
};

function SearchFallback() {
  return <>Loading...</>;
}

export default function Search() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPage />;
    </Suspense>
  );
}
