import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function getChapterData(
  chapterNumber: string
): Promise<GitaChapter> {
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

  return data?.gitaChapterById;
}
