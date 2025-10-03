import NotFound from "components/NotFound";
import HomeLayout from "layouts/HomeLayout";
import { IsPathInvalid, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({
  params,
  children,
}: React.PropsWithChildren<ParamsWithLocale>) {
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  return (
    <HomeLayout locale={locale} translations={await getTranslations(locale)}>
      {IsPathInvalid(params)? <NotFound locale={locale} translations={translations}/>: children}
    </HomeLayout>
  );
}
