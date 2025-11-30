"use server";

import BackgroundImage from "components/Home/BackgroundImage";
import Banner from "components/Home/Banner";
import Chapters from "components/Home/Chapters";
import FAQ from "components/Home/FAQ";
import Newsletter from "components/Home/Newsletter";
import PopularVerses from "components/Home/PopularVerses";
import VerseOfDayClient from "components/Home/VerseOfDayClient";
import HomeLayout from "layouts/HomeLayout";
import { getTranslations } from "shared/translate/server";

async function HomePage({
  locale,
  chapters,
}: Omit<ChaptersProps, "translations">) {
  const translationProps = {
    locale,
    translations: await getTranslations(locale),
  };

  return (
    <div className="min-h-screen font-inter dark:bg-dark-bg">
      <main>
        <HomeLayout {...translationProps}>
          <div className="relative">
            <Banner {...translationProps} />
            <BackgroundImage />
            <VerseOfDayClient {...translationProps} />
          </div>
          <Newsletter {...translationProps} />
          <Chapters chapters={chapters} {...translationProps} />
          <PopularVerses {...translationProps} />
          <FAQ {...translationProps} />
        </HomeLayout>
      </main>
    </div>
  );
}

export default HomePage;
