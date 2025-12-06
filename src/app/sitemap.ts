import { MetadataRoute } from "next";

import { getChapterData, getChapterNumbers } from "lib/getChapterData";
import { defaultTranslationAuthorId } from "shared/constants";

const BASE_URL = "https://bhagavadgita.io";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all chapter numbers
  const chaptersData = await getChapterNumbers();
  const chapterNumbers = chaptersData.gita_chapters.map(
    (c) => c.chapter_number,
  );

  // Static routes with both English and Hindi versions
  const staticPaths = [
    "",
    "/about",
    "/privacy-policy",
    "/terms-of-service",
    "/gitagpt",
    "/verse-of-the-day",
    "/bhagavad-gita-quotes",
    "/api",
    "/app",
    "/donate",
    "/acknowledgements",
  ];

  const staticRoutes = staticPaths.flatMap((route) => [
    {
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}${route}/hi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ]);

  // Dynamic chapter routes with both English and Hindi versions
  const chapterRoutes = chapterNumbers.flatMap((chapter) => [
    {
      url: `${BASE_URL}/chapter/${chapter}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/chapter/${chapter}/hi`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  // Verse routes disabled for faster builds
  // Can be re-enabled later - verses are still accessible, just not in sitemap
  // const verseRoutes = [];
  // for (const chapter of chapterNumbers) {
  //   const chapterData = await getChapterData(
  //     "en",
  //     chapter,
  //     defaultTranslationAuthorId,
  //   );
  //   if (!chapterData) continue;
  //
  //   const verses = chapterData.gita_verses;
  //   for (const verse of verses) {
  //     // Add individual verse routes in both languages
  //     verseRoutes.push({
  //       url: `${BASE_URL}/chapter/${chapter}/verse/${verse.verse_number}`,
  //       lastModified: new Date(),
  //       changeFrequency: "monthly" as const,
  //       priority: 0.6,
  //     });
  //     verseRoutes.push({
  //       url: `${BASE_URL}/chapter/${chapter}/verse/${verse.verse_number}/hi`,
  //       lastModified: new Date(),
  //       changeFrequency: "monthly" as const,
  //       priority: 0.6,
  //     });
  //   }
  // }

  // Combine all routes (verse routes disabled for now)
  return [...staticRoutes, ...chapterRoutes];
}

export default sitemap;
