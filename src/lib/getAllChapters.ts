import { query, resolved } from "gqty-client";

export const getAllChapters = () =>
  resolved(() => {
    const gitaChapters = query.gita_chapters();
    return gitaChapters.map((gitaChapter) => ({
      id: gitaChapter.id!,
      chapter_number: gitaChapter.chapter_number!,
      chapter_summary: gitaChapter.chapter_summary!,
      name_translated: gitaChapter.name_translated!,
      verses_count: gitaChapter.verses_count!,
    }));
  });
