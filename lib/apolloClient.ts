import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://gql.bhagavadgita.io/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
