import { useEffect } from "react";
import Head from "next/head";
import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    console.log(settings);
  });

  return (
    <div className='font-inter min-h-screen py-2'>
      <Head>
        <title>Bhagwat Gita App</title>
        <link rel='icon' href='/bhagavad-gita.png' />
        <link ref='style' rel='stylesheet' href='/globals.css' />
      </Head>

      <main className=''>
        <HomeLayout>
          <Banner />
          <VerseOfDay />
          <Newsletter />
          <Chapters />
        </HomeLayout>
      </main>
    </div>
  );
}
