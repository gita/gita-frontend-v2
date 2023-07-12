import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export async function getVerseId() {
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

  return data;
}
