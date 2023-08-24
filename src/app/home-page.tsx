"use server";

import BackgroundImage from "components/Home/BackgroundImage";

import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";

function HomePage({ chapters }: ChaptersProps) {
  return (
    <div className="min-h-screen font-inter dark:bg-dark-bg">
      <main>
        <HomeLayout>
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
