import QuotesPage from "./quotes-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Quotes",
};

const Quotes = () => {
  return <QuotesPage />;
};

export default Quotes;
