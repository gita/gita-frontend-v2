/**
 * GitaGPT Ingestion Configuration
 * 
 * Flexible configuration for indexing content from multiple sources:
 * - JSON files (Gita verses from Flutter app)
 * - Website pages (scraping)
 * - Custom content
 */

// ============================================================================
// DATA SOURCE PATHS - UPDATE THESE FOR YOUR SETUP
// ============================================================================

/**
 * Default path to Gita JSON data from Flutter app
 * 
 * Structure expected:
 * - DATA_PATH/common/common_en.json (Sanskrit, transliteration, word meanings)
 * - DATA_PATH/authors/author_22_en.json (Swami Mukundananda translation & commentary)
 * - DATA_PATH/chapters/chapter_en.json (Chapter summaries)
 * 
 * Source: https://github.com/gita/gita-flutter-2.0
 * Location: assets/data/
 */
export const DATA_PATH = "/Users/radhakrishna/Documents/gita-flutter-2.0/assets/data";

/**
 * Update this path if you have the data in a different location:
 * 
 * Examples:
 * export const DATA_PATH = "./data/gita";  // Relative to project root
 * export const DATA_PATH = "/custom/path/to/gita-data";  // Absolute path
 */

// ============================================================================
// INGESTION CONFIGURATION
// ============================================================================

export interface IngestConfig {
  // Data sources to use
  sources: {
    gita_json: {
      enabled: boolean;
      authors: number[]; // Author IDs to process (22 = Swami Mukundananda)
      languages: string[]; // "en", "hi"
      chapters: number[] | "all"; // Specific chapters or "all"
      verses: number[] | "all"; // Specific verses or "all"
    };
    
    website_pages: {
      enabled: boolean;
      urls: string[]; // List of URLs to scrape and index
      selectors?: {
        title?: string; // CSS selector for page title
        content?: string; // CSS selector for main content
        exclude?: string[]; // CSS selectors to exclude (nav, footer, etc.)
      };
    };
    
    custom_content: {
      enabled: boolean;
      files: string[]; // Paths to custom text/markdown files
    };
  };
  
  // Update strategy
  update_mode: "append" | "replace" | "merge";
  // - append: Add new content, keep existing
  // - replace: Delete existing matching records, add new
  // - merge: Update existing records if found, add if not
  
  // What to replace (only used if update_mode = "replace" or "merge")
  replace_filters?: {
    chapters?: number[]; // Replace specific chapters
    authors?: number[]; // Replace specific authors
    types?: ("verse_complete" | "chapter_info" | "page_content")[]; // Replace specific content types
    urls?: string[]; // Replace specific URLs (for website pages)
  };
  
  // Chunking settings
  chunking: {
    optimal_size: number; // 3000 chars recommended
    max_size: number; // 6000 chars max
    overlap: number; // 200 chars overlap
  };
  
  // Processing settings
  batch_size: number; // Number of embeddings to process at once (10 recommended)
  delay_ms: number; // Delay between batches to avoid rate limits (200ms recommended)
}

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Full Gita ingestion (all 18 chapters, all authors, all languages)
 */
export const FULL_GITA_CONFIG: IngestConfig = {
  sources: {
    gita_json: {
      enabled: true,
      authors: [22], // Swami Mukundananda only
      languages: ["en"],
      chapters: "all",
      verses: "all",
    },
    website_pages: {
      enabled: false,
      urls: [],
    },
    custom_content: {
      enabled: false,
      files: [],
    },
  },
  update_mode: "append",
  chunking: {
    optimal_size: 3000,
    max_size: 6000,
    overlap: 200,
  },
  batch_size: 10,
  delay_ms: 200,
};

/**
 * Chapter 1 only (for testing)
 */
export const CHAPTER_1_CONFIG: IngestConfig = {
  ...FULL_GITA_CONFIG,
  sources: {
    ...FULL_GITA_CONFIG.sources,
    gita_json: {
      ...FULL_GITA_CONFIG.sources.gita_json,
      chapters: [1],
    },
  },
};

/**
 * Website pages only (FAQ, About, etc.)
 */
export const WEBSITE_PAGES_CONFIG: IngestConfig = {
  sources: {
    gita_json: {
      enabled: false,
      authors: [],
      languages: [],
      chapters: [],
      verses: [],
    },
    website_pages: {
      enabled: true,
      urls: [
        "https://bhagavadgita.io/",
        "https://bhagavadgita.io/about",
        // Add more URLs as needed
      ],
      selectors: {
        title: "h1, .page-title",
        content: "main, article, .content",
        exclude: ["nav", "footer", ".sidebar", "header"],
      },
    },
    custom_content: {
      enabled: false,
      files: [],
    },
  },
  update_mode: "append",
  chunking: {
    optimal_size: 2000, // Smaller chunks for web content
    max_size: 4000,
    overlap: 150,
  },
  batch_size: 5,
  delay_ms: 500, // Slower to be polite to website
};

/**
 * Replace specific chapter (e.g., re-index Chapter 2 with new translation)
 */
export const REPLACE_CHAPTER_CONFIG = (chapterNumber: number): IngestConfig => ({
  ...FULL_GITA_CONFIG,
  sources: {
    ...FULL_GITA_CONFIG.sources,
    gita_json: {
      ...FULL_GITA_CONFIG.sources.gita_json,
      chapters: [chapterNumber],
    },
  },
  update_mode: "replace",
  replace_filters: {
    chapters: [chapterNumber],
    types: ["verse_complete", "chapter_info"],
  },
});

/**
 * Add website pages while keeping existing verses
 */
export const ADD_WEBSITE_CONFIG: IngestConfig = {
  ...WEBSITE_PAGES_CONFIG,
  update_mode: "append", // Don't touch existing verses
};

/**
 * Replace website pages only (re-scrape)
 */
export const REPLACE_WEBSITE_CONFIG = (urls: string[]): IngestConfig => ({
  ...WEBSITE_PAGES_CONFIG,
  sources: {
    ...WEBSITE_PAGES_CONFIG.sources,
    website_pages: {
      ...WEBSITE_PAGES_CONFIG.sources.website_pages,
      urls,
    },
  },
  update_mode: "replace",
  replace_filters: {
    types: ["page_content"],
    urls,
  },
});

// ============================================================================
// EXPORT DEFAULT CONFIG (change this to switch presets)
// ============================================================================

// Currently using: Custom snippets only
export const DEFAULT_CONFIG = {
  sources: {
    gita_json: { enabled: false },
    website_pages: { enabled: false },
    custom_content: { enabled: true, files: [] },
  },
  update_mode: "append",
  chunking: { optimal_size: 3000, max_size: 6000, overlap: 200 },
  batch_size: 10,
  delay_ms: 200,
} as any;

// To use different config, change to:
// export const DEFAULT_CONFIG = CHAPTER_1_CONFIG;
// export const DEFAULT_CONFIG = WEBSITE_PAGES_CONFIG;
// export const DEFAULT_CONFIG = REPLACE_CHAPTER_CONFIG(2);

