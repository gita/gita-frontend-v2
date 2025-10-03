"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";
import ChapterHeader from "../components/Headers/ChapterHeader";

const ChapterLayout = ({
  children,
  translations,
  locale,
  hideFooter,
}: React.PropsWithChildren<LocaleAndTranslations & {hideFooter?: boolean}>) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="dark:bg-dark-bg">
      <ChapterHeader translate={translate} locale={locale} />
      {children}
      {!hideFooter && <Footer translate={translate} />}
    </div>
  );
};

export default ChapterLayout;
