import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

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
