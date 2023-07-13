import { gql } from "@apollo/client";
import makeClient from "./makeClient";

export async function getChapterNumber() {
  const client = makeClient();

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
