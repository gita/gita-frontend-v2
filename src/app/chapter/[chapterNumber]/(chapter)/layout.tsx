import { ReactNode } from "react";
import { headers } from "next/headers";

import ChapterLayout from "layouts/ChapterLayout";
import { headerToLocale } from "shared/functions";

export default function Layout({ children }: { children: ReactNode }) {
  const headersList = headers();

  return (
    <ChapterLayout locale={headerToLocale(headersList.get("x-settings-l"))}>
      {children}
    </ChapterLayout>
  );
}
