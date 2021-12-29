import React, { useState } from "react";
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
import VerseNavigator from "../../components/Chapter/VerseNavigator";

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
  const [viewNavigation, setViewNavigation] = useState(false);
  const [verseId, setVerseId] = useState(null);

  return (
    <div>
      <Head>
        <title>Bhagavad Gita App - Chapters</title>
      </Head>

      <div className="max-w-5xl font-inter py-24 chapter-intro mx-auto text-center  px-4 sm:px-6">
        {previousChapter >= 1 && (
          <Link href={`/chapter/${previousChapter}`}>
            <img
              src="/arrow-left.png"
              className="fixed z-neg top-1/2 md:top-1/3 left-3 hover:brightness-90 hover:cursor-pointer"
            />
          </Link>
        )}
        {nextChapter <= 18 && (
          <Link href={`/chapter/${nextChapter}`}>
            <img
              src="/arrow-right.png"
              className="fixed z-neg top-1/2 md:top-1/3 right-3 hover:brightness-90 hover:cursor-pointer"
            />
          </Link>
        )}
        <h3 className="text-my-orange font-medium uppercase">
          Chapter {chapterNumber}
        </h3>
        <h1 className="font-extrabold text-3xl my-8">{nameTranslated}</h1>
        <p className="text-left  mt-3">{chapterSummary}</p>
      </div>

      <div className="max-w-5xl font-inter mx-auto text-center  px-4 sm:px-6">
        <div className="flex items-center justify-between border-t py-6 border-b border-gray-200">
          <div className="font-extrabold">{versesCount} Verses</div>
          <div className="mt-1 flex rounded-md shadow-sm relative">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="verse-id"
                id="verse-id"
                value={verseId}
                className="focus:ring-my-orange border focus:border-my-orange block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
                placeholder="Go To Verse"
                onClick={() => setViewNavigation(!viewNavigation)}
              />
            </div>
            <VerseNavigator
              verseCount={versesCount}
              currentVerse={verseId}
              viewNavigation={viewNavigation}
              setViewNavigation={setViewNavigation}
              setVerseId={setVerseId}
            />
            <button
              type="button"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-my-orange focus:border-my-orange"
            >
              <SortAscendingIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span>Sort</span>

              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl font-inter py-8 mb-16 mx-auto   px-4 sm:px-6">
        {verses
          .filter((verse) => {
            if (!verseId) return true;
            return verse.verseNumber === verseId;
          })
          .map((verse) => (
            <VerseList verseData={verse} key={verse.id} />
          ))}
      </div>
    </div>
  );
}

Chapter.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
