import { gql } from "@apollo/client";
import makeClient from "./makeClient";

export async function getChapterData(
  chapterNumber: string
): Promise<GitaChapter> {
  const client = makeClient();

  const { data } = await client.query({
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
