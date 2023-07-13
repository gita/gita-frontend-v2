import { gql } from "@apollo/client";
import apolloClient from "./apolloClient";

export async function getChapterData(
  chapterNumber: string
): Promise<GitaChapter> {
  const { data } = await apolloClient.query({
    query: gql`
      query MyQuery {
        gitaChapterById(id: ${chapterNumber ?? 1}) {
          chapterSummary
          chapterNumber
          nameTranslated
          versesCount
          gitaVersesByChapterId {
            nodes {
              id
              verseNumber
              wordMeanings
              transliteration
            }
          }
        }
      }
    `,
  });

  return data?.gitaChapterById;
}
