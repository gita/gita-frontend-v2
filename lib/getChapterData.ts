import { ApolloQueryResult, gql } from "@apollo/client";
import apolloClient from "./apolloClient";

interface GitaChaptersNumber {
  gita_chapters: { chapter_number: number }[];
}

export async function getChapterNumbers(): Promise<GitaChaptersNumber> {
  const { data }: ApolloQueryResult<GitaChaptersNumber> =
    await apolloClient.query({
      query: gql`
        query MyQuery {
          gita_chapters {
            chapter_number
          }
        }
      `,
    });

  return data;
}

export async function getChapterData(
  chapterNumber: string
): Promise<GitaChapter> {
  const { data }: ApolloQueryResult<GitaChapter> = await apolloClient.query({
    query: gql`
      query MyQuery {
        gita_chapters_by_pk(id: ${chapterNumber ?? 1}) {
          chapter_number
          chapter_summary
          name_translated
          verses_count
        }
        gita_verses(where: {chapter_id: {_eq: ${
          chapterNumber ?? 1
        }}}, order_by: {verse_number: asc}) {
          id
          verse_number
          word_meanings
          transliteration
          chapter_number
        }
      }
    `,
  });

  return data;
}
