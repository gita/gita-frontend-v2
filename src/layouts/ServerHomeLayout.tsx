import { ReactNode } from "react";

import { getAllChapters } from "lib/getAllChapters";

import HomeLayoutClient from "./HomeLayout";

type ServerHomeLayoutProps = {
  children: ReactNode;
  locale: Locale;
  translations: Record<string, string>;
};

export default async function ServerHomeLayout({
  children,
  locale,
  translations,
}: ServerHomeLayoutProps) {
  const chapters = await getAllChapters(locale);

  return (
    <HomeLayoutClient
      locale={locale}
      translations={translations}
      chapters={chapters}
    >
      {children}
    </HomeLayoutClient>
  );
}
