/**
 * Web scraper for indexing website pages into GitaGPT RAG
 *
 * Features:
 * - Scrapes HTML content from URLs
 * - Extracts main content (removes nav, footer, ads)
 * - Chunks large pages
 * - Generates embeddings
 * - Stores in vector database
 */

import * as cheerio from "cheerio";

export interface ScrapedPage {
  url: string;
  title: string;
  content: string;
  metadata: {
    scraped_at: string;
    source: "website";
    description?: string;
    og_image?: string;
    language?: string;
  };
}

export interface ScrapeOptions {
  title?: string; // CSS selector for title
  content?: string; // CSS selector for content
  exclude?: string[]; // CSS selectors to exclude
}

/**
 * Scrape a single URL and extract content
 */
export async function scrapePage(
  url: string,
  options: ScrapeOptions = {},
): Promise<ScrapedPage | null> {
  try {
    console.log(`\n🌐 Scraping: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`   ❌ Failed to fetch: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract metadata from page
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text() ||
      $("h1").first().text() ||
      new URL(url).pathname;

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      "";

    const ogImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    const language =
      $("html").attr("lang") ||
      $('meta[property="og:locale"]').attr("content") ||
      "en";

    console.log(`   📄 Title: ${title.substring(0, 60)}...`);
    console.log(`   🌍 Language: ${language}`);

    // Remove unwanted elements
    const excludeSelectors = options.exclude || [
      "script",
      "style",
      "nav",
      "header",
      "footer",
      ".sidebar",
      ".advertisement",
      ".cookie-banner",
      "iframe",
    ];

    excludeSelectors.forEach((selector) => {
      $(selector).remove();
    });

    // Extract main content
    const contentSelector = options.content || "main, article, .content, body";
    const contentHtml = $(contentSelector).first();

    // Convert to clean text
    let content = "";

    // Extract headings and paragraphs with structure
    contentHtml.find("h1, h2, h3, p, li").each((i, elem) => {
      const text = $(elem).text().trim();
      if (text) {
        const tagName = elem.tagName;
        if (tagName === "h1") {
          content += `\n# ${text}\n\n`;
        } else if (tagName === "h2") {
          content += `\n## ${text}\n\n`;
        } else if (tagName === "h3") {
          content += `\n### ${text}\n\n`;
        } else {
          content += `${text}\n\n`;
        }
      }
    });

    content = content.trim();

    if (!content || content.length < 50) {
      console.error(`   ❌ No content found (only ${content.length} chars)`);
      return null;
    }

    console.log(`   ✅ Scraped: ${content.length} chars`);

    return {
      url,
      title: title.trim(),
      content,
      metadata: {
        scraped_at: new Date().toISOString(),
        source: "website",
        description: description.trim(),
        og_image: ogImage,
        language: language.toLowerCase(),
      },
    };
  } catch (error) {
    console.error(`   ❌ Error scraping ${url}:`, error);
    return null;
  }
}

/**
 * Scrape multiple URLs
 */
export async function scrapePages(
  urls: string[],
  options: ScrapeOptions = {},
  delayMs: number = 1000,
): Promise<ScrapedPage[]> {
  const pages: ScrapedPage[] = [];

  for (const url of urls) {
    const page = await scrapePage(url, options);
    if (page) {
      pages.push(page);
    }

    // Delay to be polite to website
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return pages;
}

/**
 * Chunk a scraped page into smaller pieces
 * IMPORTANT: Must respect embedding model's 8192 token limit
 * Conservative estimate: 1 token ≈ 4 chars, so max ~6000 chars per chunk
 */
export function chunkScrapedPage(
  page: ScrapedPage,
  optimalSize: number = 2000,
  maxSize: number = 3500, // Reduced to stay well below 8192 token limit
  overlap: number = 150,
): Array<{ content: string; metadata: any }> {
  const chunks: Array<{ content: string; metadata: any }> = [];

  const header = `# ${page.title}\n\nSource: ${page.url}\n\n`;

  // If page is small enough, return as single chunk
  if (header.length + page.content.length <= maxSize) {
    chunks.push({
      content: header + page.content,
      metadata: {
        ...page.metadata,
        url: page.url,
        title: page.title,
        type: "page_content",
        is_chunked: false,
      },
    });
    return chunks;
  }

  console.log(
    `   ⚠️  Page too large (${page.content.length} chars), chunking...`,
  );

  // Split into sentences
  const sentences = page.content.split(/(?<=[.!?।])\s+/); // Include Hindi sentence ender।
  let currentChunk = header;
  let chunkIndex = 0;

  for (const sentence of sentences) {
    // Check if adding sentence would exceed maxSize
    if (
      currentChunk.length + sentence.length > maxSize &&
      currentChunk.length > header.length
    ) {
      // Save current chunk
      chunks.push({
        content: currentChunk,
        metadata: {
          ...page.metadata,
          url: page.url,
          title: page.title,
          type: "page_content",
          is_chunked: true,
          chunk_index: chunkIndex,
          total_chunks: -1, // Will update after all chunks created
        },
      });

      // Start new chunk with overlap
      const words = currentChunk.split(/\s+/);
      const overlapWords = words.slice(-Math.floor(overlap / 5)); // ~5 chars per word
      currentChunk = overlapWords.join(" ") + " " + sentence;
      chunkIndex++;
    } else {
      currentChunk += sentence + " ";
    }
  }

  // Add final chunk
  if (currentChunk.trim()) {
    chunks.push({
      content: currentChunk,
      metadata: {
        ...page.metadata,
        url: page.url,
        title: page.title,
        type: "page_content",
        is_chunked: chunks.length > 0,
        chunk_index: chunkIndex,
        total_chunks: chunkIndex + 1,
      },
    });
  }

  // Update total_chunks for all chunks
  chunks.forEach((chunk) => {
    chunk.metadata.total_chunks = chunks.length;
  });

  return chunks;
}
