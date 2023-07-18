import { ApolloQueryResult, gql } from "@apollo/client";
import apolloClient from "./apolloClient";

interface GitaVerseIds {
  gita_verses: { chapter_number: number; verse_number: number }[];
}

export async function getVerseId(): Promise<GitaVerseIds> {
  const { data }: ApolloQueryResult<GitaVerseIds> = await apolloClient.query({
    query: gql`
      query MyQuery {
        gita_verses {
          chapter_number
          verse_number
        }
      }
    `,
  });

  return data;
}

export async function getVerseData(
  chapterNumber,
  verseNumber,
  language = "english",
  commentariesAuthor = "Swami Sivananda",
  translationsAuthor = "Swami Sivananda"
): Promise<GitaVerse> {
  // todo: add translation to the query and pass transation data to Translation and Commentary component
  const { data }: ApolloQueryResult<Verse> = await apolloClient.query({
    query: gql`
      query MyQuery {
        gita_verses(where: {chapter_number: {_eq: ${chapterNumber}}, verse_number: {_eq: ${verseNumber}}}) {
            chapter_number
            id
            text
            transliteration
            verse_number
            word_meanings
            gita_chapter {
              verses_count
            }
            gita_commentaries(where: {author_name: {_eq: "${commentariesAuthor}"}}) {
            description
          }
        gita_translations(where: {language: {_eq: "${language}"}, author_name: {_eq: "${translationsAuthor}"}}) {
            description
          }
          }
      }
    `,
  });

  return data.gita_verses[0];
}
