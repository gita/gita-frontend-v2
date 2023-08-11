import { useEffect, useState } from "react";
import { gql, ApolloQueryResult, useApolloClient } from "@apollo/client";
import Link from "next/link";
import { Skeleton } from "../Shared/Skeleton";

interface DailyVerse {
  verseNumber: number;
  chapterNumber: number;
  id: number;
  text: string;
  transliteration: string;
  wordMeanings: string;
  gitaTranslationsByVerseId: {
    nodes: { description: string }[];
  };
}

const VerseOfDay = () => {
  const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const getDailyVerse = async (): Promise<DailyVerse | null> => {
      const { data }: ApolloQueryResult<any> = await client.query({
        query: gql`
          query MyQuery {
            allVerseOfTheDays(last: 1) {
              nodes {
                verseOrder
                date
              }
            }
          }
        `,
      });
      const verseData: ApolloQueryResult<any> = await client.query({
        query: gql`
        query MyQuery {
          allGitaVerses(condition: {id: ${data.allVerseOfTheDays.nodes[0].verseOrder} }) {
            nodes {
              verseNumber
              chapterNumber
              id
              text
              transliteration
              wordMeanings
              gitaTranslationsByVerseId(condition: {authorName: "Swami Sivananda"}) {
                nodes {
                  description
                }
              }
            }
           
          }
        }
        `,
      });

      const finalData = verseData?.data.allGitaVerses?.nodes[0];
      setDailyVerse(finalData);
      return finalData;
    };

    if (!dailyVerse) {
      getDailyVerse();
    }
  }, [client, dailyVerse]);

  return (
    <div className="relative max-w-7xl mx-auto z-10 px-4 sm:px-6 mt-24">
      <div className="bg-white dark:bg-dark-100 shadow-lg rounded-xl px-12 pb-8 pt-5 text-gray-400">
        {dailyVerse ? (
          <>
            <h2 className="text-my-orange font-bold mb-4 divider line one-line px-4">
              Verse of the day - BG {dailyVerse?.chapterNumber}.
              {dailyVerse?.verseNumber}
            </h2>
            <p className="text-lg">
              {dailyVerse?.gitaTranslationsByVerseId?.nodes[0]?.description}{" "}
            </p>
            <button className="uppercase text-black dark:text-white mt-4 font-bold text-sm hover:text-gray-700 dark:hover:text-gray-400 focus:outline-none">
              <Link
                href={`chapter/${dailyVerse?.chapterNumber}/verse/${dailyVerse?.verseNumber}`}
                shallow
              >
                See more
              </Link>
            </button>
          </>
        ) : (
          <>
            <Skeleton height="h-4" width="w-2/12" margin="my-4" />
            <Skeleton height="h-5" width="w-10/12" margin="mb-3" />
            <Skeleton height="h-5" width="w-9/12" margin="mb-4" />
            <Skeleton height="h-5" width="w-1/12" margin="mb-3" />
          </>
        )}
      </div>
    </div>
  );
};
export default VerseOfDay;
