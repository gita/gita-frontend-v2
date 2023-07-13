import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function makeClient() {
  return new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });
}
