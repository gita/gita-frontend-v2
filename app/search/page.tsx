import { Metadata } from "next";
import SearchPage from "./search-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Search",
};
export default function Search() {
  return <SearchPage />;
}
