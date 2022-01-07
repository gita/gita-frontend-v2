import React from "react";
import Head from "next/head";
import Link from "next/link";
import PagesLayout from "../../layouts/PagesLayout";
import Translation from "../../components/Verse/Translation";
import Commentary from "../../components/Verse/Commentary";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        allGitaVerses {
          nodes {
            id
          }
        }
      }
    `,
  });
  const verses = data.allGitaVerses.nodes;
  const paths = verses.map(({ id }) => {
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });
  // todo: add translation to the query and pass transation data to Translation and Commentary component
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        gitaVerseById(id: ${id}) {
          id
          text
          transliteration
          verseNumber
          wordMeanings
          chapterNumber
        }
      }
    `,
  });
  const verseData = data?.gitaVerseById;
  return {
    props: {
      verseData,
    },
  };
}
const Verse = ({ verseData }) => {
  const {
    id,
    text,
    transliteration,
    verseNumber,
    wordMeanings,
    chapterNumber,
  } = verseData;
  const previousVerseId = id - 1;
  const nextVerseId = id + 1;
  return (
    <div className="font-inter mb-16">
      <Head>
        <title>Bhagavad Gita App - Verse {id}</title>
      </Head>
      <div className="max-w-5xl font-inter py-12 mx-auto text-center  px-4 sm:px-6">
        {previousVerseId >= 1 && (
          <Link href={`/verse/${previousVerseId}`}>
            <img
              src="/arrow-left.png"
              className="fixed z-neg top-1/2 md:top-1/3 left-3 hover:brightness-90 hover:cursor-pointer"
            />
          </Link>
        )}
        {nextVerseId <= 701 && (
          <Link href={`/verse/${nextVerseId}`}>
            <img
              src="/arrow-right.png"
              className="fixed z-neg top-1/2 md:top-1/3 right-3 hover:brightness-90 hover:cursor-pointer"
            />
          </Link>
        )}
        <h1 className="font-extrabold text-3xl">
          BG {chapterNumber}.{verseNumber}
        </h1>
        <p className="font-dev text-my-orange mt-4  text-2xl max-w-md mx-auto">
          {text}
        </p>
        <p className="mt-4 text-xl max-w-md mx-auto">{transliteration}</p>
        <p className="  mt-4  text-xl  mx-auto">{wordMeanings}</p>
        <img src="/floral-divider.svg" className="my-16 w-full" />
        <Translation />
        <Commentary />
      </div>
    </div>
  );
};

export default Verse;

Verse.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
