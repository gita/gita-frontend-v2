import "tailwindcss/tailwind.css";
// import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { ThemeProvider } from "next-themes";
import Main from "../components/main";
import { CookiesProvider } from 'react-cookie';


function MyApp({Component, pageProps }) {
  
  const store = useStore(pageProps.initialReduxState);

  return (
    <CookiesProvider>
    <Provider store={store}>
      <ThemeProvider attribute="class" enableSystem={false}>
      
        <Main Component ={Component} pageProps = {pageProps }></Main>
      </ThemeProvider>
    </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
