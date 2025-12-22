"use client";

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";

import { AuthProvider } from "lib/auth/AuthProvider";
import { useStore } from "redux/store";

import "tailwindcss/tailwind.css";

export default function Providers({ children }: { children: ReactNode }) {
  const store = useStore(undefined);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider attribute="class" enableSystem={false}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
}
