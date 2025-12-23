import type { MetadataRoute } from "next";

import { loadChapters, loadCommonData } from "lib/data";

const BASE_URL = "https://bhagavadgita.io";

// Supported locales for sitemap generation
const LOCALES = ["", "hi"] as const; // "" = English (default), "hi" = Hindi

// Static routes to include in sitemap
// Note: Auth pages (/login, /signup) and user-specific pages (/bookmark, /notes) are excluded
const STATIC_PATHS = [
  "",
  "/about",
  "/acknowledgements",
  "/bhagavad-gita-quotes",
  "/copyright",
  "/donate",
  "/gitagpt",
  "/mahabharata-characters",
  "/privacy-policy",
  "/search",
  "/terms-of-service",
  "/verse-of-the-day",
  "/verse-parallel",
] as const;

/**
 * Generate sitemap entries for static pages
 */
function generateStaticRoutes(): MetadataRoute.Sitemap {
  return STATIC_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: locale ? `${BASE_URL}${path}/${locale}` : `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1.0 : 0.8,
    })),
  );
}

/**
 * Generate sitemap entries for chapter pages
 */
function generateChapterRoutes(
  chapterNumbers: number[],
): MetadataRoute.Sitemap {
  return chapterNumbers.flatMap((chapter) =>
    LOCALES.map((locale) => ({
      url: locale
        ? `${BASE_URL}/chapter/${chapter}/${locale}`
        : `${BASE_URL}/chapter/${chapter}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  );
}

/**
 * Generate sitemap entries for verse pages
 * Uses actual verse numbers from data (including ranges like "4-6")
 */
function generateVerseRoutes(
  chapterVerseMap: Map<number, string[]>,
): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const [chapterNumber, verseNumbers] of chapterVerseMap) {
    for (const verseNumber of verseNumbers) {
      for (const locale of LOCALES) {
        routes.push({
          url: locale
            ? `${BASE_URL}/chapter/${chapterNumber}/verse/${verseNumber}/${locale}`
            : `${BASE_URL}/chapter/${chapterNumber}/verse/${verseNumber}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    }
  }

  return routes;
}

/**
 * Main sitemap generation function
 * Automatically runs at build time when deploying to production
 */
async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Load chapters data
  const chapters = await loadChapters();
  const chapterNumbers = chapters.map((c) => c.chapter_number);

  // Load common data to get actual verse numbers (including ranges)
  const commonData = await loadCommonData("en");

  // Build chapter -> verse numbers map
  const chapterVerseMap = new Map<number, string[]>();

  for (const chapter of commonData.chapters) {
    const chapterNum = parseInt(chapter.chapter_number, 10);
    const verseNumbers = chapter.verses
      .filter((v) => v != null && v.verse_number != null)
      .map((v) => v.verse_number);

    chapterVerseMap.set(chapterNum, verseNumbers);
  }

  // Generate all route types
  const staticRoutes = generateStaticRoutes();
  const chapterRoutes = generateChapterRoutes(chapterNumbers);
  const verseRoutes = generateVerseRoutes(chapterVerseMap);

  // Log stats for build output
  console.log(
    `📚 Sitemap generated: ${staticRoutes.length} static + ${chapterRoutes.length} chapter + ${verseRoutes.length} verse = ${staticRoutes.length + chapterRoutes.length + verseRoutes.length} total URLs`,
  );

  return [...staticRoutes, ...chapterRoutes, ...verseRoutes];
}

export default sitemap;
