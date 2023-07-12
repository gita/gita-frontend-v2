import { Metadata } from "next";
import { getVerseData } from "../../../lib/getVerseData";
import { getVerseId } from "../../../lib/getVerseId";
import VersePage from "./verse-page";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `Bhagavad Gita App - Verse ${params.id}`,
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

const Verse = async ({ params }) => {
  const verseData = await getVerseData(params);

  return <VersePage verseData={verseData} />;
};

export default Verse;
