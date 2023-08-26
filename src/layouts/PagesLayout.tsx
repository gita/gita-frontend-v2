"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";

type Props = {
  locale: Locale;
  translations: Record<string, string>;
};

const PagesLayout = ({
  children,
  locale,
  translations,
}: React.PropsWithChildren<Props>) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="flex min-h-screen flex-col justify-between dark:bg-dark-bg">
      <div className="flex-1">
        {/* to fix footer when no data */}
        {children}
      </div>
      <Footer translate={translate} />
    </div>
  );
};

export default PagesLayout;
