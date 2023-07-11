import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { getChapterData } from "../../../lib/getChapterData";
import { Metadata } from "next";
import ChapterPage from "./chapter-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Chapters",
};
export async function generateStaticParams() {
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
  return chapters.map(({ chapterNumber }) => {
    return {
      params: { chapterNumber: chapterNumber.toString() },
    };
  });
}

export default async function Chapter({ params }) {
  const chapterData = await getChapterData(params);

  return <ChapterPage chapterData={chapterData} />;
}
