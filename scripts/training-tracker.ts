/**
 * Training Tracker - Keep records of what's trained and when
 * 
 * Features:
 * - Read URLs from training-sources.json
 * - Track last training date for each source
 * - Log training history
 * - Identify stale content (>30 days old)
 */

import * as fs from "fs";
import * as path from "path";

export interface TrainingSource {
  url?: string;
  path?: string;
  enabled?: boolean;
  last_trained?: string | null;
  notes?: string;
  // Title is auto-extracted from webpage, not stored here
}

export interface TrainingHistory {
  timestamp: string;
  source_type: "gita_json" | "website" | "custom";
  records_added: number;
  records_updated: number;
  records_deleted: number;
  details: any;
}

export interface TrainingSources {
  version: string;
  last_updated: string;
  sources: {
    gita_json: {
      enabled: boolean;
      data_path: string;
      source_repo: string;
      authors: Array<{
        id: number;
        name: string;
        language: string;
        last_trained: string | null;
      }>;
      chapters: {
        included: "all" | number[];
        last_trained: string | null;
      };
    };
    website_pages: {
      enabled: boolean;
      urls: string[]; // Simple array of URLs, metadata auto-extracted
      training_metadata?: {
        last_batch_trained: string | null;
        total_pages_trained: number;
        notes?: string;
      };
      selectors: {
        title?: string;
        content?: string;
        exclude?: string[];
      };
    };
    custom_files: {
      enabled: boolean;
      files: TrainingSource[];
    };
  };
  training_history: TrainingHistory[];
}

const TRAINING_SOURCES_FILE = path.join(__dirname, "training-sources.json");

/**
 * Load training sources configuration
 */
export function loadTrainingSources(): TrainingSources {
  if (!fs.existsSync(TRAINING_SOURCES_FILE)) {
    throw new Error(`Training sources file not found: ${TRAINING_SOURCES_FILE}`);
  }

  const content = fs.readFileSync(TRAINING_SOURCES_FILE, "utf-8");
  return JSON.parse(content);
}

/**
 * Save training sources configuration
 */
export function saveTrainingSources(config: TrainingSources): void {
  config.last_updated = new Date().toISOString();
  fs.writeFileSync(
    TRAINING_SOURCES_FILE,
    JSON.stringify(config, null, 2),
    "utf-8"
  );
}

/**
 * Get all enabled website URLs
 */
export function getEnabledWebsiteURLs(config: TrainingSources): string[] {
  if (!config.sources.website_pages.enabled) {
    return [];
  }

  return config.sources.website_pages.urls || [];
}

/**
 * Update last trained timestamp for a source
 */
export function updateTrainingTimestamp(
  config: TrainingSources,
  sourceType: "gita_json" | "website" | "custom",
  identifier?: string // URL or file path
): TrainingSources {
  const now = new Date().toISOString();

  if (sourceType === "gita_json") {
    config.sources.gita_json.chapters.last_trained = now;
    config.sources.gita_json.authors.forEach((author) => {
      author.last_trained = now;
    });
  } else if (sourceType === "website" && identifier) {
    const urlSource = config.sources.website_pages.urls.find(
      (u) => u.url === identifier
    );
    if (urlSource) {
      urlSource.last_trained = now;
    }
  } else if (sourceType === "custom" && identifier) {
    const fileSource = config.sources.custom_files.files.find(
      (f) => f.path === identifier
    );
    if (fileSource) {
      fileSource.last_trained = now;
    }
  }

  return config;
}

/**
 * Add training history entry
 */
export function addTrainingHistory(
  config: TrainingSources,
  entry: Omit<TrainingHistory, "timestamp">
): TrainingSources {
  config.training_history.push({
    timestamp: new Date().toISOString(),
    ...entry,
  });

  // Keep only last 50 entries
  if (config.training_history.length > 50) {
    config.training_history = config.training_history.slice(-50);
  }

  return config;
}

/**
 * Get stale sources (not trained in > 30 days)
 */
export function getStaleWebsiteSources(
  config: TrainingSources,
  daysThreshold: number = 30
): string[] {
  if (!config.sources.website_pages.training_metadata?.last_batch_trained) {
    return config.sources.website_pages.urls; // Never trained = all stale
  }

  const now = Date.now();
  const threshold = daysThreshold * 24 * 60 * 60 * 1000;
  const lastTrained = new Date(config.sources.website_pages.training_metadata.last_batch_trained).getTime();

  if (now - lastTrained > threshold) {
    return config.sources.website_pages.urls; // All stale
  }

  return []; // All fresh
}

/**
 * Display training status summary
 */
export function displayTrainingStatus(config: TrainingSources): void {
  console.log("\n📊 Training Status Summary");
  console.log("═".repeat(70));

  // Gita JSON
  console.log("\n📖 Gita JSON:");
  console.log(`   Enabled: ${config.sources.gita_json.enabled ? "✅" : "❌"}`);
  console.log(`   Data Path: ${config.sources.gita_json.data_path}`);
  console.log(`   Chapters: ${config.sources.gita_json.chapters.included}`);
  console.log(
    `   Last Trained: ${config.sources.gita_json.chapters.last_trained || "Never"}`
  );

  // Website pages
  console.log("\n🌐 Website Pages:");
  console.log(`   Enabled: ${config.sources.website_pages.enabled ? "✅" : "❌"}`);
  console.log(`   Configured URLs: ${config.sources.website_pages.urls.length}`);
  
  const lastBatch = config.sources.website_pages.training_metadata?.last_batch_trained;
  const totalTrained = config.sources.website_pages.training_metadata?.total_pages_trained || 0;
  
  if (lastBatch) {
    const daysSince = Math.floor(
      (Date.now() - new Date(lastBatch).getTime()) / (24 * 60 * 60 * 1000)
    );
    const indicator = daysSince > 30 ? "⚠️" : "✅";
    console.log(`   Last Batch: ${indicator} ${daysSince} days ago`);
    console.log(`   Pages Trained: ${totalTrained}`);
  } else {
    console.log(`   Last Batch: ❌ Never trained`);
  }

  if (config.sources.website_pages.urls.length > 0) {
    console.log("\n   URLs to scrape:");
    config.sources.website_pages.urls.forEach((url, i) => {
      console.log(`   ${i + 1}. ${url}`);
    });
  }

  // Training history
  console.log("\n📜 Recent Training History:");
  const recentHistory = config.training_history.slice(-5).reverse();
  if (recentHistory.length === 0) {
    console.log("   No history yet");
  } else {
    recentHistory.forEach((entry) => {
      const date = new Date(entry.timestamp).toLocaleString();
      console.log(`   ${date} | ${entry.source_type}`);
      console.log(
        `     Added: ${entry.records_added}, Updated: ${entry.records_updated}, Deleted: ${entry.records_deleted}`
      );
    });
  }

  console.log("\n═".repeat(70) + "\n");
}

/**
 * Check for stale content and warn
 */
export function checkStaleSources(config: TrainingSources): void {
  const stale = getStaleWebsiteSources(config, 30);

  if (stale.length > 0) {
    console.log(`\n⚠️  Stale Website Sources (${stale.length} URLs >30 days old or never trained)`);
    console.log("   💡 Re-train with: npm run ingest:web\n");
  }
}

