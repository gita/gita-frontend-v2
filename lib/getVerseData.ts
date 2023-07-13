import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function getVerseData(id: string): Promise<Verse> {
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
  return data?.gitaVerseById;
}
