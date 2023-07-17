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

export async function getVerseData(
  id: string,
  language = "english",
  commentariesAuthor = "Swami Sivananda",
  translationsAuthor = "Swami Sivananda"
): Promise<Verse> {
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
        gita_commentaries(where: {author_name: {_eq: "${commentariesAuthor}"}, verse_id: {_eq: ${id}}}) {
            description
          }
        gita_translations(where: {language: {_eq: "${language}"}, author_name: {_eq: "${translationsAuthor}"}, verse_id: {_eq: ${id}}}) {
            description
          }
      }
    `,
  });

  return data;
}
