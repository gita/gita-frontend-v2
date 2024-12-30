import { ReactNode } from "react";

import PagesLayoutClient from "./PagesLayout";

type ServerPagesLayoutProps = {
  children: ReactNode;
  locale: Locale;
  translations: Record<string, string>;
};

export default function ServerPagesLayout({
  children,
  locale,
  translations,
}: ServerPagesLayoutProps) {
  return (
    <PagesLayoutClient locale={locale} translations={translations}>
      {children}
    </PagesLayoutClient>
  );
}
