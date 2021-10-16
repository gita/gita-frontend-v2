import "tailwindcss/tailwind.css";
import { wrapper } from "../redux/store"

function MyApp({ Component, pageProps  }) {
  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
}

export default wrapper.withRedux(MyApp);
