import { Metadata } from "next";
import { getVerseData } from "../../../lib/getVerseData";
import { getVerseId } from "../../../lib/getVerseId";
import VersePage from "./verse-page";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params: { id } }: Props): Metadata {
  return {
    title: `Bhagavad Gita App - Verse ${id}`,
  };
}

export async function generateStaticParams() {
  const data = await getVerseId();
  const verses = data.allGitaVerses.nodes;
  return verses.map(({ id }) => {
    return {
      params: { id: id.toString() },
    };
  });
}

const Verse = async ({ params: { id } }: Props) => {
  const verseData = await getVerseData(id);

  return <VersePage verseData={verseData} />;
};

export default Verse;
