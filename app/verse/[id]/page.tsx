import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Metadata } from "next";
import { getVerseData } from "../../../lib/getVerseData";
import VersePage from "./verse-page";

type Props = {
  params: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Bhagavad Gita App - Verse ${params.id}`,
  };
}

export async function generateStaticParams() {
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
  return verses.map(({ id }) => {
    return {
      params: { id: id.toString() },
    };
  });
}

const Verse = async ({ params }) => {
  const verseData = await getVerseData(params);

  return <VersePage verseData={verseData} />;
};

export default Verse;
