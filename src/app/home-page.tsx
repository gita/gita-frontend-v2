"use server";

import { headers } from "next/headers";

import BackgroundImage from "components/Home/BackgroundImage";
import { headerToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";

async function HomePage({ chapters }: ChaptersProps) {
  const headersList = headers();

  return (
    <div className="min-h-screen font-inter dark:bg-dark-bg">
      <main>
        <HomeLayout
          locale={headerToLocale(headersList.get("x-settings-l"))}
          translations={await getTranslations()}
        >
          <div className="relative">
            <Banner />
            <BackgroundImage />
            <VerseOfDay />
          </div>
          <Newsletter />
          <Chapters chapters={chapters} />
        </HomeLayout>
      </main>
    </div>
  );
}

export default HomePage;
