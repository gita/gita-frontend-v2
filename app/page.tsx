import { Metadata } from "next";
import HomePage from "./home-page";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

export const metadata: Metadata = {
  title: "Bhagavad Gita App",
};

// Define your Hasura GraphQL endpoint
const HASURA_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

if (!HASURA_GRAPHQL_ENDPOINT || !HASURA_ADMIN_SECRET) {
  throw new Error(
    "Environment variables NEXT_PUBLIC_GRAPHQL_ENDPOINT or NEXT_PUBLIC_HASURA_ADMIN_SECRET are not set"
  );
}

async function getChapters() {
  const httpLink = new HttpLink({
    uri: HASURA_GRAPHQL_ENDPOINT,
    headers: {
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET as string,
      "content-type": "application/json",
      "hasura-client-name": "bhagavad-gita-web",
    },
  });

  // Create an instance of Apollo Client
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetAllGitaChapters {
        gita_chapters {
          id
          chapter_number
          chapter_summary
          name_translated
          verses_count
        }
      }
    `,
  });

  return data?.gita_chapters;
}

export default async function Home() {
  const chapters = await getChapters();

  return <HomePage chapters={chapters} />;
}
