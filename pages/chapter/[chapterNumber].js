import React from "react";
import PagesLayout from "../../layouts/PagesLayout";
import Head from "next/head";
import Link from "next/link";
import {
  SortAscendingIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import VerseList from "../../components/Chapter/VerseList";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {
  SvgChapterBackground,
  SvgChevronLeft,
  SvgChevronRight,
} from "../../components/svgs";

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        allGitaChapters {
          nodes {
            chapterNumber
          }
        }
      }
    `,
  });
  const chapters = data.allGitaChapters.nodes;
  const paths = chapters.map(({ chapterNumber }) => {
    return {
      params: { chapterNumber: chapterNumber.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { chapterNumber } = params;
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        gitaChapterById(id: ${chapterNumber}) {
          chapterSummary
          chapterNumber
          nameTranslated
          versesCount
          gitaVersesByChapterId {
            nodes {
              id
              verseNumber
              wordMeanings
              transliteration
            }
          }
        }
      }
    `,
  });
  const chapterData = data?.gitaChapterById;
  return {
    props: {
      chapterData,
    },
  };
}
export default function Chapter({ chapterData }) {
  const {
    chapterNumber,
    chapterSummary,
    nameTranslated,
    versesCount,
    gitaVersesByChapterId,
  } = chapterData;
  const verses = gitaVersesByChapterId.nodes;
  const nextChapter = chapterNumber + 1;
  const previousChapter = chapterNumber - 1;
  return (
    <div>
      <Head>
        <title>Bhagwat Gita App - Chapters</title>
        <link rel="icon" href="/favicon.ico" />
        <link ref="style" rel="stylesheet" href="/globals.css" />
      </Head>

      <div className="max-w-5xl font-inter py-24 mx-auto text-center px-4 sm:px-6 relative">
        <SvgChapterBackground className="absolute text-gray-300 w-full lg:w-min dark:text-black text-opacity-25 dark:text-opacity-25 rounded-full m-auto left-0 right-0 bottom-0 -top-20 lg:top-20" />
        {previousChapter >= 1 && (
          <Link href={`/chapter/${previousChapter}`}>
            <div className="rounded-full h-10 w-10 fixed z-neg top-1/2 md:top-1/3 left-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border">
              <SvgChevronLeft className="dark:text-gray-50" />
            </div>
          </Link>
        )}
        {nextChapter <= 18 && (
          <Link href={`/chapter/${nextChapter}`}>
            <div className="rounded-full h-10 w-10 fixed z-neg top-1/2 md:top-1/3 right-3 hover:brightness-90 hover:cursor-pointer flex justify-center items-center  bg-white dark:bg-dark-100 dark:hover:bg-dark-bg dark:border-gray-600 border">
              <SvgChevronRight className="dark:text-gray-50" />
            </div>
          </Link>
        )}
        <h3 className="text-my-orange font-medium uppercase">
          Chapter {chapterNumber}
        </h3>
        <h1 className="font-extrabold text-3xl dark:text-white my-8">
          {nameTranslated}
        </h1>
        <p className="text-left dark:text-white mt-3">{chapterSummary}</p>
      </div>

      <div className="max-w-5xl font-inter mx-auto text-center  px-4 sm:px-6">
        <div className="flex items-center justify-between border-t py-6 border-b border-gray-200">
          <div className="font-extrabold dark:text-white">
            {versesCount} Verses
          </div>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none "></div>
              <input
                type="text"
                name="verse-search"
                id="verse-search"
                className="focus:ring-my-orange border focus:border-my-orange block w-full rounded-none rounded-l-md pl-2 sm:text-sm dark:bg-dark-100 dark:text-gray-50 dark:placeholder-gray-50 border-gray-300"
                placeholder="Go To Verse"
              />
            </div>
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium dark:bg-dark-100 rounded-r-md text-gray-700 dark:text-gray-50 bg-gray-50 hover:bg-gray-100 dark:hover:bg-dark-bg focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
            >
              <SortAscendingIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-50"
                aria-hidden="true"
              />
              <span>Sort</span>

              <ChevronDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-50"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl font-inter py-8 mb-16 mx-auto px-4 sm:px-6">
        {verses.map((verse) => (
          <VerseList verseData={verse} key={verse.id} />
        ))}
      </div>
    </div>
  );
}

Chapter.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
