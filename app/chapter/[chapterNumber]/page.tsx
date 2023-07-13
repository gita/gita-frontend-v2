import { Metadata } from "next";
import { getChapterData } from "../../../lib/getChapterData";
import { getChapterNumber } from "../../../lib/getChapterNumber";
import ChapterPage from "./chapter-page";

export const metadata: Metadata = {
  title: "Bhagavad Gita App - Chapters",
};
export async function generateStaticParams() {
  const data = await getChapterNumber();

  const chapters = data.allGitaChapters?.nodes;
  return chapters.map(({ chapterNumber }) => {
    return {
      params: { chapterNumber: chapterNumber.toString() },
    };
  });
}

type Props = {
  params: {
    chapterNumber: string;
  };
};

export default async function Chapter({ params: { chapterNumber } }: Props) {
  const chapterData = await getChapterData(chapterNumber);

  return <ChapterPage chapterData={chapterData} />;
}
