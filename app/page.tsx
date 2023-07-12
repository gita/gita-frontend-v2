import { Metadata } from "next";
import HomePage from "./home-page";
import { getAllChapters } from "../lib/getAllChapters";

export const metadata: Metadata = {
  title: "Bhagavad Gita App",
};

export default async function Home() {
  const chapters = await getAllChapters();

  return <HomePage chapters={chapters} />;
}
