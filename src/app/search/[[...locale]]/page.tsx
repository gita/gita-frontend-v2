import { Suspense } from "react";
import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import SearchPage from "./search-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Search",
};

function SearchFallback() {
  return <>Loading...</>;
}

export default async function Search({ params }: ParamsWithLocale) {
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPage locale={locale} translations={translations} />;
    </Suspense>
  );
}
