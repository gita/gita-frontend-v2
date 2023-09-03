import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const HASURA_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error(
    "Environment variables NEXT_PUBLIC_GRAPHQL_ENDPOINT or NEXT_PUBLIC_HASURA_ADMIN_SECRET are not set"
  );
}

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
  headers: {
    "content-type": "application/json",
    "hasura-client-name": "bhagavad-gita-web",
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
