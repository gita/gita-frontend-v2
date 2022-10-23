import { useEffect, useState } from "react";
import Head from "next/head";
import Modal from "../components/Home/Modal";
import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://gql.bhagavadgita.io/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        allGitaChapters {
          nodes {
            id
            chapterNumber
            chapterSummary
            nameTranslated
            versesCount
          }
        }
      }
    `,
  });
  return {
    props: { chapters: data?.allGitaChapters.nodes },
  };
};
export default function Home({ chapters }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  useEffect(() => {
    const pathName = router.asPath;
    const access_token = pathName.match(/\#(?:access_token)\=([\S\s]*?)\&/);
    
    if (access_token && access_token.length>1) {
      setCookie("access_token", access_token[1])
    }

  }, [router.query])
  function handleSubscribe(e, formData) {
    e.preventDefault();
    if (formData.username && formData.email) {
      // todo call newsletter subscribe API
      setModalVisible(true);
      return true;
    } else return false;
  }

  return (
    <div className="font-inter min-h-screen dark:bg-dark-bg">
      <Head>
        <title>Bhagavad Gita App</title>
      </Head>

      <main className="">
        <HomeLayout>
          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <Banner />
          <VerseOfDay />
          <Newsletter handleSubscribe={handleSubscribe} />
          <Chapters chapters={chapters} />
        </HomeLayout>
      </main>
    </div>
  );
}
