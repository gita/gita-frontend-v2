import apolloClient from "./apolloClient";
import { gql, ApolloQueryResult } from "@apollo/client";

export const getDailyVerse = async () => {
  const {
    data: { verse_of_the_day },
  }: ApolloQueryResult<VersesOfTheDay> = await apolloClient.query({
    query: gql`
      query MyQuery {
        verse_of_the_day(order_by: { date: desc }) {
          date
          id
          verse_order
        }
      }
    `,
  });

  const {
    data: { gita_verses },
  }: ApolloQueryResult<Verse> = await apolloClient.query({
    query: gql`
        query MyQuery {
          gita_verses(where: { id: { _eq: ${verse_of_the_day[0].verse_order} } }) {
              id
              chapter_number
              verse_number
              text
              transliteration
              word_meanings
              gita_translations(where: {gita_author: {name: {_eq: "Swami Sivananda"}}, language: {_eq: "english"}}) {
                description
              }
              gita_commentaries(where: {gita_author: {name: {_eq: "Swami Sivananda"}}}) {
                  description
              }
              gita_chapter {
                verses_count
              }
          }
        }
      `,
  });

  return gita_verses[0];
};
