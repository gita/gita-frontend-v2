"use client";

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";

import { useStore } from "redux/store";

import "tailwindcss/tailwind.css";

export default function Providers({ children }: { children: ReactNode }) {
  const store = useStore(undefined);

  return (
    <PlausibleProvider domain="bhagavadgita.io" trackOutboundLinks>
      <CookiesProvider>
        <Provider store={store}>
          <ThemeProvider attribute="class" enableSystem={false}>
            {children}
          </ThemeProvider>
        </Provider>
      </CookiesProvider>
    </PlausibleProvider>
  );
}
