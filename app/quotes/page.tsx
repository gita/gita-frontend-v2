import { Metadata } from "next";
import QuotesPage from "./quotes-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Quotes",
};

const Quotes = () => {
  return <QuotesPage />;
};

export default Quotes;
