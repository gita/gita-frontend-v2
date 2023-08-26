"use server";

import BackgroundImage from "components/Home/BackgroundImage";
import Banner from "components/Home/Banner";
import Chapters from "components/Home/Chapters";
import Newsletter from "components/Home/Newsletter";
import VerseOfDay from "components/Home/VerseOfDay";
import HomeLayout from "layouts/HomeLayout";
import { getTranslations } from "shared/translate/server";

async function HomePage({
  locale,
  chapters,
}: Omit<ChaptersProps, "translations">) {
  return (
    <div className="min-h-screen font-inter dark:bg-dark-bg">
      <main>
        <HomeLayout
          locale={locale}
          translations={await getTranslations(locale)}
        >
          <div className="relative">
            <Banner
              locale={locale}
              translations={await getTranslations(locale)}
            />
            <BackgroundImage />
            <VerseOfDay
              locale={locale}
              translations={await getTranslations(locale)}
            />
          </div>
          <Newsletter
            locale={locale}
            translations={await getTranslations(locale)}
          />
          <Chapters
            chapters={chapters}
            locale={locale}
            translations={await getTranslations(locale)}
          />
        </HomeLayout>
      </main>
    </div>
  );
}

export default HomePage;
