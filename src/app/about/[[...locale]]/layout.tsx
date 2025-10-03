import NotFound from "components/NotFound";
import ServerHomeLayout from "layouts/ServerHomeLayout";
import { IsPathInvalid, paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({
  params,
  children,
}: React.PropsWithChildren<ParamsWithLocale>) {
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  return (
    <ServerHomeLayout locale={locale} translations={translations}>
      {IsPathInvalid(params)? <NotFound locale={locale} translations={translations}/>: children}
    </ServerHomeLayout>
  );
}
