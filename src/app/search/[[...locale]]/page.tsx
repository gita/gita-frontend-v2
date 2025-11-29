import { Suspense } from "react";
import { Metadata } from "next";

import { paramsToLocale } from "shared/functions";
import { getTranslate } from "shared/translate";
import { getTranslations } from "shared/translate/server";

import SearchPage from "./SearchPage";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Search",
};

function SearchFallback({ translate }: { translate: Translate }) {
  return <>{translate("Loading")}</>;
}

export default async function Search({
  params: paramsPromise,
}: ParamsWithLocale) {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  const translate = getTranslate(translations, locale);

  return (
    <Suspense fallback={<SearchFallback translate={translate} />}>
      <SearchPage locale={locale} translations={translations} />;
    </Suspense>
  );
}
