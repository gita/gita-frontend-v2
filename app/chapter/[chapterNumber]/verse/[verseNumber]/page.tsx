import { Suspense } from "react";
import { Metadata } from "next";
import { getVerseId } from "../../../../../lib/getVerseData";
import VersePage from "./verse-page";

function VerseFallback() {
  return <>Loading...</>;
}

type Props = {
  params: { chapterNumber: string; verseNumber: string };
};

export async function generateStaticParams() {
  const data = await getVerseId();

  return data.gita_verses.map(({ chapter_number, verse_number }) => ({
    params: {
      chapterNumber: chapter_number.toString(),
      verseNumber: verse_number.toString(),
    },
  }));
}

export function generateMetadata({ params: { verseNumber } }: Props): Metadata {
  return {
    title: `Bhagavad Gita App - Verse ${verseNumber}`,
  };
}

const Verse = async ({ params: { chapterNumber, verseNumber } }: Props) => {
  return (
    <Suspense fallback={<VerseFallback />}>
      <VersePage chapterNumber={chapterNumber} verseNumber={verseNumber} />
    </Suspense>
  );
};

export default Verse;
