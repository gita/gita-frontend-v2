import SearchPage from "./search-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Search",
};
export default function Search() {
  return <SearchPage />;
}
