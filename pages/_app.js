import "tailwindcss/tailwind.css";
import { wrapper } from "../redux/store";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
