/**
 * Get all chapters from static JSON files
 * Replaces the previous GraphQL implementation
 */

import { queryAllChapters } from "./data";

/**
 * Get all chapters with summaries and verse counts
 */
export const getAllChapters = (locale: Locale): Promise<TChapter[]> =>
  queryAllChapters(locale);
