import { Metadata } from "next";
import { getVerseId } from "../../../lib/getVerseData";
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

  return data.gita_verses.map(({ id }) => ({
    params: { id: id.toString() },
  }));
}

const Verse = async ({ params: { id } }: Props) => {
  return <VersePage verseId={id} />;
};

export default Verse;
