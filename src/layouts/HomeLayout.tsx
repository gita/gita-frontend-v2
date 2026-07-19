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
      <a
        href="#main-content"
        className="ui-label fixed left-4 top-4 z-[100] -translate-y-20 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none"
      >
        {locale === "hi" ? "मुख्य सामग्री पर जाएँ" : "Skip to content"}
      </a>
      <ModernNav translate={translate} locale={locale} chapters={chapters} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer translate={translate} />
    </div>
  );
};

export default HomeLayoutClient;
