import { ReactNode } from "react";
import { headers } from "next/headers";

import HomeLayout from "layouts/HomeLayout";
import { headerToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

export default async function Layout({ children }: { children: ReactNode }) {
  const headersList = headers();

  return (
    <HomeLayout
      locale={headerToLocale(headersList.get("x-settings-l"))}
      translations={await getTranslations()}
    >
      {children}
    </HomeLayout>
  );
}
