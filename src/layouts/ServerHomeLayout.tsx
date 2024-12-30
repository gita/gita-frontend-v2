import { ReactNode } from "react";

import HomeLayoutClient from "./HomeLayout";

type ServerHomeLayoutProps = {
  children: ReactNode;
  locale: Locale;
  translations: Record<string, string>;
};

export default function ServerHomeLayout({
  children,
  locale,
  translations,
}: ServerHomeLayoutProps) {
  return (
    <HomeLayoutClient locale={locale} translations={translations}>
      {children}
    </HomeLayoutClient>
  );
}
