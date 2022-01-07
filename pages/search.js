import React from "react";
import HomeLayout from "../layouts/HomeLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import SearchCard from "../components/Search/SearchCard";
export default function Search() {
  const router = useRouter();
  console.log(router.query);
  const data = [1];
  return (
    <div>
      <Head>
        <title>Bhagavad Gita App - Search</title>
      </Head>
      <div className="max-w-5xl font-inter py-4 mx-auto px-4 sm:px-6">
        <p className="text-2xl lg:text-3xl py-4">
          Seaching results for:{" "}
          <span className="font-extrabold">{router.query.query}</span>
        </p>
        <hr />
        {data.length > 0 ? (
          <div>
            <SearchCard />
            <SearchCard />
            <SearchCard />
            <SearchCard />
            <SearchCard />
            <SearchCard />
          </div>
        ) : (
          <div className="py-7">
            <p className="text-my-orange font-extrabold text-4xl">No result</p>
            <p className="text-gray-500 font-normal text-sm">
              Sorry, we couldn’t find the page you’re looking for.
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
