import "tailwindcss/tailwind.css";
// import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" enableSystem={false}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
