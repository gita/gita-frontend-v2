import { query, resolved } from "gqty-client";

export const getAllChapters = (locale: Locale) =>
  resolved(() => {
    const gitaChapters = query.gita_chapters();
    return gitaChapters.map((gitaChapter) => ({
      id: gitaChapter.id!,
      chapter_number: gitaChapter.chapter_number!,
      chapter_summary:
        locale === "en"
          ? gitaChapter.chapter_summary!
          : gitaChapter.chapter_summary_hindi!,
      name_translated:
        locale === "en" ? gitaChapter.name_translated! : gitaChapter.name!,
      verses_count: gitaChapter.verses_count!,
    }));
  });
