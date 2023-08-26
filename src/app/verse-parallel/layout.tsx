import React from "react";
import { headers } from "next/headers";

import PagesLayout from "layouts/PagesLayout";
import { headerToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();

  return (
    <PagesLayout
      locale={headerToLocale(headersList.get("x-settings-l"))}
      translations={await getTranslations()}
    >
      {children}
    </PagesLayout>
  );
}
