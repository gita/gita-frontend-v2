import React from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import PagesLayout from "../../layouts/PagesLayout";
import Translation from "../../components/Verse/Translation";
import Commentary from "../../components/Verse/Commentary";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  SvgFloralDivider,
  SvgChevronLeft,
  SvgChevronRight,
} from "../../components/svgs";
import classNames from "../../utils/classNames";

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
const Verse = ({ verseData, advanceSettings, languageSettings }) => {
  const state = useSelector((state) => state.settings);
  const { fontSize, fontFamily, spacing, bg } = state;
  const {
    id,
    text,
    transliteration,
    verseNumber,
    wordMeanings,
    chapterNumber,
  } = verseData;
  const { devnagari, verseText, synonyms, translation, purport } =
    advanceSettings;

  console.log("advanceSettings: ", advanceSettings);
  console.log("LanguageSettings: ", languageSettings);

  const previousVerseId = id - 1;
  const nextVerseId = id + 1;

  return (
    <div className="font-inter">
      <Head>
        <title>Bhagavad Gita App - Verse {id}</title>
      </Head>
      <div className="max-w-5xl font-inter py-12 mx-auto text-center  px-4 sm:px-6">
        {previousVerseId >= 1 && (
          <Link href={`/verse/${previousVerseId}`}>
            <div className="rounded-full h-10 w-10 fixed z-neg top-1/2 md:top-1/3 left-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border">
              <SvgChevronLeft className="dark:text-gray-50" />
            </div>
          </Link>
        )}
        {nextVerseId <= 701 && (
          <Link href={`/verse/${nextVerseId}`}>
            <div className="rounded-full h-10 w-10 fixed z-neg top-1/2 md:top-1/3 right-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border">
              <SvgChevronRight className="dark:text-gray-50" />
            </div>
          </Link>
        )}
        <h1
          className={classNames(
            fontSize === "large" ? "text-4xl" : "text-3xl",
            "font-extrabold dark:text-gray-50"
          )}
        >
          BG {chapterNumber}.{verseNumber}
        </h1>
        {devnagari && (
          <p
            className={classNames(
              fontSize === "large" ? "text-3xl" : "text-2xl",
              "font-dev text-my-orange mt-4 max-w-md mx-auto"
            )}
          >
            {text}
          </p>
        )}
        {verseText && (
          <p
            className={classNames(
              fontSize === "large" ? "text-2xl" : "text-xl",
              "mt-4 max-w-md mx-auto dark:text-gray-50"
            )}
          >
            {transliteration}
          </p>
        )}
        {synonyms && (
          <p
            className={classNames(
              fontSize === "large" ? "text-2xl max-w-lg" : "text-xl max-w-md",
              "mt-4 mx-auto dark:text-gray-50"
            )}
          >
            {wordMeanings}
          </p>
        )}
        {(translation || purport) && (
          <SvgFloralDivider className="my-16 w-full text-white dark:text-dark-bg" />
        )}
        {translation && <Translation fontSize={fontSize}/>}
        {purport && <Commentary fontSize={fontSize}/>}
      </div>
    </div>
  );
};

export default Verse;

Verse.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
