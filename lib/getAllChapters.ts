import { ApolloQueryResult, gql } from "@apollo/client";
import apolloClient from "./apolloClient";

interface GitaChapters {
  gita_chapters: TChapter[];
}

export async function getAllChapters(): Promise<TChapter[]> {
  const { data }: ApolloQueryResult<GitaChapters> = await apolloClient.query({
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
