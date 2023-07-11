"use client";

import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { ThemeProvider } from "next-themes";
import { CookiesProvider } from "react-cookie";

function Providers({ children }) {
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

export default Providers;
