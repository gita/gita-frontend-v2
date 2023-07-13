import { gql } from "@apollo/client";
import apolloClient from "./apolloClient";

export async function getChapterNumber() {
  const { data } = await apolloClient.query({
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
