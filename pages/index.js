import { useEffect } from "react";
import Head from "next/head";
import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        allGitaChapters {
          nodes {
            id
            chapterNumber
            chapterSummary
            nameTranslated
            versesCount
          }
        }
      }
    `,
  });
  return {
    props: { chapters: data.allGitaChapters.nodes },
  };
};
export default function Home({ chapters }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    console.log(settings);
  });

  return (
    <div className='font-inter min-h-screen py-2'>
      <Head>
        <title>Bhagwat Gita App</title>
        <link rel='icon' href='/favicon.ico' />
        <link ref='style' rel='stylesheet' href='/globals.css' />
      </Head>

      <main className=''>
        <HomeLayout>
          <Banner />
          <VerseOfDay />
          <Newsletter />
          <Chapters chapters={chapters} />
        </HomeLayout>
      </main>
    </div>
  );
}
