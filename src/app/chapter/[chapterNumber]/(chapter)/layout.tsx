import { ReactNode } from "react";
import { headers } from "next/headers";

import ChapterLayout from "layouts/ChapterLayout";
import { headerToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({ children }: { children: ReactNode }) {
  const headersList = headers();

  return (
    <ChapterLayout
      locale={headerToLocale(headersList.get("x-settings-l"))}
      translations={await getTranslations()}
    >
      {children}
    </ChapterLayout>
  );
}
