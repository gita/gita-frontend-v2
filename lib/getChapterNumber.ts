import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function getChapterNumber() {
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

  return data;
}
