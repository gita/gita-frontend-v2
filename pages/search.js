import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchCard from "../components/Search/SearchCard";
import { useState, useEffect } from "react"
export default function Search() {
  const router = useRouter();
  const { query } = router.query;
  const [data, setData] = useState()
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  useEffect(() => {
    setIsSearchLoading(true)
    const fetchData = async () => {

      fetch(`https://api.bhagavadgita.io/v2/search?query=${query}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'X-API-KEY': process.env.NEXT_PUBLIC_BG_API_KEY
        }

      }).then(resp => {
        return (resp.json())

      }).then(data => {

        setData(data)
        setIsSearchLoading(false)
      }).catch(err => {
        console.log(err)
      })
    }
    fetchData()
  }, [query])
  return (
    <div>
      <Head>
        <title>Bhagavad Gita App - Search</title>
      </Head>
      <div className="max-w-5xl font-inter py-4 mx-auto px-4 sm:px-6">
        <p className={`text-2xl lg:text-3xl py-4 ${isSearchLoading ? "animate-pulse" : ""}`}>
          Seaching results for:{" "}
          <span className="font-extrabold">{router.query.query}</span>
        </p>
        <hr />

        {data?.length > 0 ? (
          <div>
            {
              data.map(verse => {
                return (
                  <SearchCard
                    id={verse.id}
                    chapterNumber={verse.chapter_number}
                    transliteration={verse.transliteration}
                    verseNumber={verse.verse_number}
                    text={verse.text}
                    wordMeanings={verse.word_meanings} />
                )
              })
            }

          </div>
        ) : (
          <div className={`py-7 ${isSearchLoading ? "animate-pulse" : ""}`}>
            <p className="text-my-orange font-extrabold text-4xl">{isSearchLoading ? "Loading" : "No Results"}</p>
            <p className="text-gray-500 font-normal text-sm">
              {!isSearchLoading && (
                "Sorry, we couldn’t find the page you’re looking for."
              )}

            </p>
          </div>
        )}
      </div>
    </div>
  );
}

Search.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
