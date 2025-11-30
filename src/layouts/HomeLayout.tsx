"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";
import { ModernNav } from "../components/Headers/ModernNav";

interface HomeLayoutProps extends LocaleAndTranslations {
  chapters?: TChapter[];
}

const HomeLayoutClient = ({
  children,
  locale,
  translations,
  chapters = [],
}: React.PropsWithChildren<HomeLayoutProps>) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="flex min-h-screen flex-col bg-prakash-bg dark:bg-nisha-bg">
      <ModernNav translate={translate} locale={locale} chapters={chapters} />
      <main className="flex-1">{children}</main>
      <Footer translate={translate} />
    </div>
  );
};

export default HomeLayoutClient;
