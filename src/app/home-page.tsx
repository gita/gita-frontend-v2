"use server";

import BackgroundImage from "components/Home/BackgroundImage";
import { getTranslations } from "shared/translate/server";

import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";

async function HomePage({ locale, chapters }: ChaptersProps) {
  return (
    <div className="min-h-screen font-inter dark:bg-dark-bg">
      <main>
        <HomeLayout
          locale={locale}
          translations={await getTranslations(locale)}
        >
          <div className="relative">
            <Banner />
            <BackgroundImage />
            <VerseOfDay />
          </div>
          <Newsletter />
          <Chapters chapters={chapters} locale={locale} />
        </HomeLayout>
      </main>
    </div>
  );
}

export default HomePage;
