import "tailwindcss/tailwind.css";
import { wrapper } from "../redux/store";
import { ThemeProvider } from "next-themes";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
} from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const client = new ApolloClient({
    link: new createHttpLink({
      uri: "https://gql.bhagavadgita.io/graphiql",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
    cache: new InMemoryCache(),
  });
  client
    .query({
      query: gql`
        query MyQuery {
          allGitaChapters {
            nodes {
              chapterNumber
              gitaVersesByChapterId {
                totalCount
                nodes {
                  id
                }
              }
            }
          }
        }
      `,
    })
    .then((result) => console.log(result));
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
