"use client";

import "tailwindcss/tailwind.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "next-themes";
import { CookiesProvider } from "react-cookie";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";

const client = new ApolloClient({
  uri: "https://gql.bhagavadgita.io/graphql",
  cache: new InMemoryCache(),
});

export default function Providers({ children }: { children: ReactNode }) {
  const store = useStore(undefined);

  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <Provider store={store}>
          <ThemeProvider attribute="class" enableSystem={false}>
            {children}
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    </ApolloProvider>
  );
}
