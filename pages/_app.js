import "tailwindcss/tailwind.css";
import { wrapper } from "../redux/store";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
