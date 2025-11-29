"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";
import IndexHeader from "../components/Headers/IndexHeader";

const HomeLayoutClient = ({
  children,
  locale,
  translations,
}: React.PropsWithChildren<LocaleAndTranslations>) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="flex min-h-screen flex-col dark:bg-dark-bg">
      <IndexHeader locale={locale} translate={translate} />
      <main className="flex-1 pt-[84px] lg:pt-[90px]">{children}</main>
      <Footer translate={translate} />
    </div>
  );
};

export default HomeLayoutClient;
