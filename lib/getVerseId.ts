import { gql } from "@apollo/client";
import apolloClient from "./apolloClient";

export async function getVerseId() {
  const { data } = await apolloClient.query({
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
