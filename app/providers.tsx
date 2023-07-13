"use client";

import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";
import { CookiesProvider } from "react-cookie";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";

export default function Providers({ children }: { children: ReactNode }) {
  const store = useStore(undefined);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider attribute="class" enableSystem={false}>
          {children}
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}
