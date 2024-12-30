import ServerHomeLayout from "layouts/ServerHomeLayout";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({
  params,
  children,
}: React.PropsWithChildren<ParamsWithLocale>) {
  const locale = paramsToLocale(params);
  const translations = await getTranslations(locale);

  return (
    <ServerHomeLayout locale={locale} translations={translations}>
      {children}
    </ServerHomeLayout>
  );
}
