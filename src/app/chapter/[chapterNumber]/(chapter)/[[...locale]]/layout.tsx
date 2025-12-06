import ChapterLayout from "layouts/ChapterLayout";
import { getChapterData } from "lib/getChapterData";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({
  params: paramsPromise,
  children,
}: React.PropsWithChildren<{
  params: Promise<{ chapterNumber: string; locale?: string[] }>;
}>) {
  const params = await paramsPromise;
  const locale = paramsToLocale(params);
  const chapterNumber = Number(params.chapterNumber);

  // Fetch minimal chapter data for layout
  const chapterData = await getChapterData(locale, chapterNumber);
  const chapterName = chapterData?.gita_chapters_by_pk.name_translated;

  return (
    <ChapterLayout
      locale={locale}
      translations={await getTranslations(locale)}
      currentChapter={chapterNumber}
      chapterName={chapterName}
    >
      {children}
    </ChapterLayout>
  );
}
