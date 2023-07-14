import { ApolloQueryResult, gql } from "@apollo/client";
import apolloClient from "./apolloClient";

interface GitaVerseIds {
  gita_verses: { id: number }[];
}

export async function getVerseId(): Promise<GitaVerseIds> {
  const { data }: ApolloQueryResult<GitaVerseIds> = await apolloClient.query({
    query: gql`
      query MyQuery {
        gita_verses {
          id
        }
      }
    `,
  });

  return data;
}

export async function getVerseData(id: string): Promise<Verse> {
  // todo: add translation to the query and pass transation data to Translation and Commentary component
  const { data }: ApolloQueryResult<Verse> = await apolloClient.query({
    query: gql`
      query MyQuery {
        gita_verses_by_pk(id: ${id}) {
            chapter_number
            id
            text
            transliteration
            verse_number
            word_meanings
          }
        gita_commentaries_by_pk(id: ${id}) {
            description
          }
        gita_translations_by_pk(id: ${id}) {
            description
          }
      }
    `,
  });

  return data;
}
