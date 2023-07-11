import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Metadata } from "next";
import VersePage from "./verse-page";

type Props = {
  params: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Bhagavad Gita App - Verse ${params.id}`,
  };
}

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
export async function getVerseData(params) {
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
          gitaTranslationsByVerseId {
            nodes {
              description
              authorId
              languageId
            }
          }
          gitaCommentariesByVerseId {
            nodes {
              description
              authorId
              languageId
            }
          }
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
const Verse = async ({ params }) => {
  const verseData = await getVerseData(params);

  return <VersePage verseData={verseData} />;
};

export default Verse;
