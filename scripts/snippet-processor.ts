/**
 * Custom text snippet processor for GitaGPT
 * 
 * Processes text files from scripts/snippets/ folder
 * Supports: Q&A pairs, custom info, FAQs, guides
 */

import * as fs from "fs";
import * as path from "path";

export interface ProcessedSnippet {
  content: string;
  metadata: {
    type: "custom_snippet";
    snippet_id: string;
    source: "text_file";
    file_name: string;
    language: string;
    created_at: string;
  };
}

/**
 * Detect language from text content
 */
function detectLanguage(text: string): string {
  // Check for Hindi/Devanagari characters
  const devanagariChars = text.match(/[\u0900-\u097F]/g);
  const totalChars = text.replace(/\s/g, "").length;
  const devanagariRatio = devanagariChars ? devanagariChars.length / totalChars : 0;

  // If > 30% Devanagari, it's Hindi
  return devanagariRatio > 0.3 ? "hi" : "en";
}

/**
 * Process a single snippet file
 */
export function processSnippetFile(
  filePath: string
): ProcessedSnippet | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8").trim();

    if (!content || content.length < 20) {
      console.log(`   ⏭️  Skipping ${path.basename(filePath)}: Too short`);
      return null;
    }

    const fileName = path.basename(filePath);
    const snippetId = fileName.replace(/\.txt$/, "");
    const language = detectLanguage(content);

    console.log(`   ✅ ${fileName} (${content.length} chars, ${language})`);

    return {
      content,
      metadata: {
        type: "custom_snippet",
        snippet_id: snippetId,
        source: "text_file",
        file_name: fileName,
        language,
        created_at: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error(`   ❌ Error processing ${filePath}:`, error);
    return null;
  }
}

/**
 * Process all snippet files in a directory
 */
export function processSnippetDirectory(
  dirPath: string
): ProcessedSnippet[] {
  const snippets: ProcessedSnippet[] = [];

  if (!fs.existsSync(dirPath)) {
    console.log(`   ⚠️  Snippets directory not found: ${dirPath}`);
    console.log(`   Creating directory...`);
    fs.mkdirSync(dirPath, { recursive: true });
    return snippets;
  }

  const files = fs.readdirSync(dirPath);
  const txtFiles = files.filter(
    (f) => f.endsWith(".txt") && !f.startsWith(".")
  );

  if (txtFiles.length === 0) {
    console.log(`   ℹ️  No .txt files found in ${dirPath}`);
    console.log(`   Add files like: faq.txt, custom-info.txt`);
    return snippets;
  }

  console.log(`   Found ${txtFiles.length} snippet file(s):`);

  for (const file of txtFiles) {
    const snippet = processSnippetFile(path.join(dirPath, file));
    if (snippet) {
      snippets.push(snippet);
    }
  }

  return snippets;
}

/**
 * Chunk a large snippet if needed
 */
export function chunkSnippet(
  snippet: ProcessedSnippet,
  maxSize: number = 3500,
  overlap: number = 150
): ProcessedSnippet[] {
  if (snippet.content.length <= maxSize) {
    return [snippet];
  }

  console.log(`   ⚠️  Snippet too large (${snippet.content.length} chars), chunking...`);

  const chunks: ProcessedSnippet[] = [];
  const sections = snippet.content.split(/\n---\n/); // Split on Q&A separators
  let currentChunk = "";
  let chunkIndex = 0;

  for (const section of sections) {
    if (currentChunk.length + section.length > maxSize && currentChunk.length > 0) {
      // Save current chunk
      chunks.push({
        content: currentChunk,
        metadata: {
          ...snippet.metadata,
          snippet_id: `${snippet.metadata.snippet_id}-part${chunkIndex + 1}`,
          is_chunked: true,
          chunk_index: chunkIndex,
          total_chunks: -1, // Will update later
        } as any,
      });

      // Start new chunk with overlap (last section)
      currentChunk = section + "\n\n";
      chunkIndex++;
    } else {
      currentChunk += section + "\n---\n";
    }
  }

  // Add final chunk
  if (currentChunk.trim()) {
    chunks.push({
      content: currentChunk,
      metadata: {
        ...snippet.metadata,
        snippet_id: chunkIndex > 0 ? `${snippet.metadata.snippet_id}-part${chunkIndex + 1}` : snippet.metadata.snippet_id,
        is_chunked: chunkIndex > 0,
        chunk_index: chunkIndex,
        total_chunks: chunkIndex + 1,
      } as any,
    });
  }

  // Update total_chunks
  chunks.forEach((c) => {
    if (c.metadata.is_chunked) {
      (c.metadata as any).total_chunks = chunks.length;
    }
  });

  console.log(`   Created ${chunks.length} chunks`);
  return chunks;
}
