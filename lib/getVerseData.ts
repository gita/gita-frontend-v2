import { gql } from "@apollo/client";
import apolloClient from "./apolloClient";

export async function getVerseData(id: string): Promise<Verse> {
  // todo: add translation to the query and pass transation data to Translation and Commentary component
  const { data } = await apolloClient.query({
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
  return data?.gitaVerseById;
}
