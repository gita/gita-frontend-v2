import { Metadata } from "next";
import {
  getChapterData,
  getChapterNumbers,
} from "../../../../lib/getChapterData";
import ChapterPage from "./chapter-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Chapters",
};
export async function generateStaticParams() {
  const data = await getChapterNumbers();

  return data.gita_chapters.map(({ chapter_number }) => ({
    params: { chapterNumber: chapter_number.toString() },
  }));
}

type Props = {
  params: {
    chapterNumber: string;
  };
};

export default async function Chapter({ params: { chapterNumber } }: Props) {
  const chapterData = await getChapterData(chapterNumber);

  return (
    <ChapterPage
      chapterData={chapterData.gita_chapters_by_pk}
      versesData={chapterData.gita_verses}
    />
  );
}
