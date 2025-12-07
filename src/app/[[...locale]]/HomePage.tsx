"use server";

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
    <div className="min-h-screen bg-prakash-bg font-crimson dark:bg-nisha-bg">
      <main>
        <HomeLayout {...translationProps} chapters={chapters}>
          <div className="relative">
            <Banner {...translationProps} />
            <VerseOfDayClient {...translationProps} />
          </div>
          <Chapters chapters={chapters} {...translationProps} />
          <PopularVerses {...translationProps} />
          <Newsletter {...translationProps} />
          <FAQ {...translationProps} />
        </HomeLayout>
      </main>
    </div>
  );
}

export default HomePage;
