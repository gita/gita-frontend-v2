import { useEffect, useState } from "react";
import Head from "next/head";
import Modal from "../components/Home/Modal";
import Banner from "../components/Home/Banner";
import Chapters from "../components/Home/Chapters";
import Newsletter from "../components/Home/Newsletter";
import VerseOfDay from "../components/Home/VerseOfDay";
import HomeLayout from "../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

// Define your Hasura GraphQL endpoint
const HASURA_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

if (!HASURA_GRAPHQL_ENDPOINT || !HASURA_ADMIN_SECRET) {
  throw new Error('Environment variables NEXT_PUBLIC_GRAPHQL_ENDPOINT or NEXT_PUBLIC_HASURA_ADMIN_SECRET are not set');
}


export const getStaticProps = async (props) => {
  // Create an HttpLink that connects to your GraphQL endpoint
  const httpLink = new HttpLink({
    uri: HASURA_GRAPHQL_ENDPOINT,
    headers: {
      'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      'content-type': 'application/json',
      'hasura-client-name': 'bhagavad-gita-web',
    },
  });

  // Create an instance of Apollo Client
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
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
  return {
try {
  const { data } = await client.query({
    query: GET_ALL_GITA_CHAPTERS_QUERY,
  });
  return {
    props: { chapters: data?.gita_chapters },
  };
} catch (error) {
  console.error("Failed to fetch chapters:", error);
  return {
    props: { chapters: [] }, // Return empty array or some default value
  };
}
};
export default function Home({ chapters }) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  useEffect(() => {
    const pathName = router.asPath;
    const access_token = pathName.match(/\#(?:access_token)\=([\S\s]*?)\&/);

    if (access_token && access_token.length > 1) {
      setCookie("Token", access_token[1]);
    }
  }, [router.query]);
  function handleSubscribe(e, formData) {
    e.preventDefault();
    if (formData.name && formData.email) {
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
