"use server";

import HomeLayout from "../layouts/HomeLayout";
import Banner from "../components/Home/Banner";
import VerseOfDay from "../components/Home/VerseOfDay";
import Newsletter from "../components/Home/Newsletter";
import Chapters from "../components/Home/Chapters";
import BackgroundImage from "components/Home/BackgroundImage";

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
