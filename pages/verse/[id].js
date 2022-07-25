import React from "react";
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { SvgFloralDivider } from "../../components/svgs";

import PagesLayout from "../../layouts/PagesLayout";
import Translation from "../../components/Verse/Translation";
import Commentary from "../../components/Verse/Commentary";
import useMyStyles from "../../hooks/useMyStyles";
import classNames from "../../utils/classNames";

import PageNavigator from "../../components/Chapter/PageNavigator";

import { useDispatch } from "react-redux";
import { setCurrentverse } from "../../redux/actions/settings";
import {useEffect} from "react"


export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

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
  const verses = data.allGitaVerses.nodes;
  const paths = verses.map(({ id }) => {
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });
  // todo: add translation to the query and pass transation data to Translation and Commentary component
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        gitaVerseById(id: ${id}) {
          id
          text
          transliteration
          verseNumber
          wordMeanings
          chapterNumber
          gitaTranslationsByVerseId {
            nodes {
              description
              authorId
              languageId
            }
          }
          gitaCommentariesByVerseId {
            nodes {
              description
              authorId
              languageId
            }
          }
        }
      }
    `,
  });
  const verseData = data?.gitaVerseById;
  return {
    props: {
      verseData,
    },
  };
}
const Verse = ({ verseData, advanceSettings, languageSettings }) => {
  const {
    id,
    text,
    transliteration,
    verseNumber,
    wordMeanings,
    chapterNumber,
    gitaTranslationsByVerseId,
    gitaCommentariesByVerseId,
  } = verseData;

  const dispatch = useDispatch();
  
  const { devnagari, verseText, synonyms, translation, purport } =
    advanceSettings;
  const styles = useMyStyles();

  useEffect(() => {
    dispatch(setCurrentverse({
      transliteration:transliteration,
      verseNumber: verseNumber,
      chapterNumber: chapterNumber,
      id:id,
    }))
  },[transliteration,verseNumber,chapterNumber,id])

  const currentTranslation = gitaTranslationsByVerseId.nodes.reduce(
    (acc, translation) => {
      if (
        translation.authorId === languageSettings.translationAuthor.id &&
        translation.languageId === languageSettings.language.id
      ) {
        return translation;
      }
      return acc;
    },
    {}
  );
  const currentCommentary = gitaCommentariesByVerseId.nodes.reduce(
    (acc, commentary) => {
      if (
        commentary.authorId === languageSettings.commentaryAuthor.id &&
        commentary.languageId === languageSettings.language.id
      ) {
        return commentary;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="font-inter">
      <Head>
        <title>Bhagavad Gita App - Verse {id}</title>
      </Head>

      <PageNavigator pageNumber={id} pageCount={701} route="verse" />

      <section className="max-w-5xl font-inter py-12 mx-auto text-center px-4 sm:px-6">
        <h1
          className={classNames(
            "font-extrabold dark:text-gray-50",
            styles.fontSize.heading
          )}
        >
          BG {chapterNumber}.{verseNumber}
        </h1>
        {devnagari && (
          <p
            className={classNames(
              "font-dev text-my-orange mt-4 max-w-md mx-auto",
              styles.fontSize.subHeading1
            )}
          >
            {text}
          </p>
        )}
        {verseText && (
          <p
            className={classNames(
              "mt-4 max-w-md mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2
            )}
          >
            {transliteration}
          </p>
        )}
        {synonyms && (
          <p
            className={classNames(
              "mt-4 mx-auto dark:text-gray-50",
              styles.fontSize.subHeading2
            )}
          >
            {wordMeanings}
          </p>
        )}
        {(translation || purport) && (
          <SvgFloralDivider className="my-16 w-full text-white dark:text-dark-bg" />
        )}
        {translation && <Translation translationData={currentTranslation} />}
        {purport && <Commentary commentaryData={currentCommentary} />}
      </section>
    </div>
  );
};

export default Verse;

Verse.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
