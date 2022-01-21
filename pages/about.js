import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import Head from "next/head";
import AboutBanner from "../components/Shared/AboutBanner";

export default function About() {
  return (
    <div>
      <Head>
        <title>Bhagavad Gita App - About</title>
      </Head>
      <AboutBanner />
      <div className="max-w-5xl font-inter py-12 mx-auto  px-4 sm:px-6">
        <p className="mt-8 text-xl ">
          Bhagavad Gita, also known as the Gita - "The Song of The Lord" is a
          practical guide to one's life that guides one to re-organise their
          life, achieve inner peace and approach the Supreme Lord (the Ultimate
          Reality). It is a 700-verse text in Sanskrit which comprises chapters
          23 through 40 in the Bhishma-Parva section of the Mahabharata.
        </p>
        <p className="mt-8 text-xl ">
          The Bhagavad Gita is a dialogue between Arjuna, a supernaturally
          gifted warrior and his guide and charioteer Lord Krishna on the
          battlefield of Kurukshetra. As both armies stand ready for the battle,
          the mighty warrior Arjuna, on observing the warriors on both sides
          becomes overwhelmed with grief and compassion due to the fear of
          losing his relatives and friends and the consequent sins attributed to
          killing his own relatives. So, he surrenders to Lord Krishna, seeking
          a solution. Thus, follows the wisdom of the Bhagavad Gita. Over 18
          chapters, Gita packs an intense analysis of life, emotions and
          ambitions, discussion of various types of yoga, including Jnana,
          Bhakti, Karma and Raja, the difference between Self and the material
          body as well as the revelation of the Ultimate Purpose of Life.
        </p>
      </div>
    </div>
  );
}

About.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
