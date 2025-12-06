"use client";

import { getTranslate } from "shared/translate";

import Footer from "../components/Footers/Footer";
import { ReaderNav } from "../components/Headers/ReaderNav";

import { TooltipProvider } from "@/components/ui/tooltip";

interface ChapterLayoutProps extends React.PropsWithChildren<LocaleAndTranslations> {
  currentChapter?: number;
  chapterName?: string;
}

const ChapterLayout = ({
  children,
  translations,
  locale,
  currentChapter,
  chapterName,
}: ChapterLayoutProps) => {
  const translate = getTranslate(translations, locale);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-prakash-bg dark:bg-nisha-bg">
        <ReaderNav
          translate={translate}
          locale={locale}
          currentChapter={currentChapter}
          chapterName={chapterName}
        />
        <main>{children}</main>
        <Footer translate={translate} />
      </div>
    </TooltipProvider>
  );
};

export default ChapterLayout;
