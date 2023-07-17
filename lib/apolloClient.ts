import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const HASURA_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

if (!HASURA_GRAPHQL_ENDPOINT || !HASURA_ADMIN_SECRET) {
  throw new Error(
    "Environment variables NEXT_PUBLIC_GRAPHQL_ENDPOINT or NEXT_PUBLIC_HASURA_ADMIN_SECRET are not set"
  );
}

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET as string,
    "content-type": "application/json",
    "hasura-client-name": "bhagavad-gita-web",
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
