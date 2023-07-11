import { getChapterData } from "../../../lib/getChapterData";
import { getChapterNumber } from "../../../lib/getChapterNumber";

import { Metadata } from "next";
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

export default async function Chapter({ params }) {
  const chapterData = await getChapterData(params);

  return <ChapterPage chapterData={chapterData} />;
}
