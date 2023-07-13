import { gql } from "@apollo/client";
import makeClient from "./makeClient";

export async function getVerseId() {
  const client = makeClient();
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
