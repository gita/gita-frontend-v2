"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";
import ChapterHeader from "../components/Headers/ChapterHeader";

type Props = {
  locale: Locale;
  translations: Record<string, string>;
};

const ChapterLayout = ({
  children,
  translations,
  locale,
}: React.PropsWithChildren<Props>) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="dark:bg-dark-bg">
      <ChapterHeader translate={translate} locale={locale} />
      {children}
      <Footer translate={translate} />
    </div>
  );
};

export default ChapterLayout;
