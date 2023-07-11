import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Metadata } from "next";
import ChapterPage from "./chapter-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Chapters",
};
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

  const chapters = data.allGitaChapters?.nodes;
  const paths = chapters.map(({ chapterNumber }) => {
    return {
      params: { chapterNumber: chapterNumber.toString() },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
export async function getChapterData(params) {
  const { chapterNumber } = params;
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        gitaChapterById(id: ${chapterNumber ?? 1}) {
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

export default async function Chapter({ params }) {
  const chapterData = await getChapterData(params);

  return <ChapterPage chapterData={chapterData} />;
}
