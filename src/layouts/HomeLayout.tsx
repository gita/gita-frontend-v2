"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";
import IndexHeader from "../components/Headers/IndexHeader";

type Props = {
  locale: Locale;
  translations: Record<string, string>;
};

const HomeLayout = ({
  children,
  locale,
  translations,
}: React.PropsWithChildren<Props>) => {
  const translate = getTranslate(translations, locale);

  return (
    <div className="flex min-h-screen flex-col dark:bg-dark-bg">
      <IndexHeader />
      <div className="flex-1 pt-[84px] lg:pt-[90px]">{children}</div>
      <Footer translate={translate} />
    </div>
  );
};

export default HomeLayout;
