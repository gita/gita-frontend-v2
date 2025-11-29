import ChapterLayout from "layouts/ChapterLayout";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({
  params: paramsPromise,
  children,
}: React.PropsWithChildren<ParamsWithLocale>) {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);

  return (
    <ChapterLayout locale={locale} translations={await getTranslations(locale)}>
      {children}
    </ChapterLayout>
  );
}
