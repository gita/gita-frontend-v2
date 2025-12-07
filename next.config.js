const { withPlausibleProxy } = require("next-plausible");
const fs = require("fs");
const path = require("path");

// Generate redirects for verses that are part of ranges
function generateVerseRedirects() {
  const redirects = [];
  const dataPath = path.join(__dirname, "data", "common");

  try {
    // Read English common data to find all verse ranges
    const commonEnPath = path.join(dataPath, "common_en.json");
    if (!fs.existsSync(commonEnPath)) return redirects;

    const commonData = JSON.parse(fs.readFileSync(commonEnPath, "utf8"));

    // For each chapter, find verse ranges and create redirects
    commonData.chapters.forEach((chapter) => {
      const chapterNum = chapter.chapter_number;

      chapter.verses.forEach((verse) => {
        if (!verse || !verse.verse_number) return;

        // Check if this is a range (e.g., "4-6")
        const rangeMatch = verse.verse_number.match(/^(\d+)-(\d+)$/);
        if (rangeMatch) {
          const rangeStart = parseInt(rangeMatch[1], 10);
          const rangeEnd = parseInt(rangeMatch[2], 10);

          // Create redirects for each individual verse in the range
          for (let v = rangeStart; v <= rangeEnd; v++) {
            // English version
            redirects.push({
              source: `/chapter/${chapterNum}/verse/${v}`,
              destination: `/chapter/${chapterNum}/verse/${verse.verse_number}`,
              permanent: true,
            });

            // Hindi version
            redirects.push({
              source: `/chapter/${chapterNum}/verse/${v}/hi`,
              destination: `/chapter/${chapterNum}/verse/${verse.verse_number}/hi`,
              permanent: true,
            });
          }
        }
      });
    });

    console.log(`✅ Generated ${redirects.length} verse range redirects`);
  } catch (error) {
    console.error("Error generating verse redirects:", error);
  }

  return redirects;
}

module.exports = withPlausibleProxy()({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // Enable React Compiler for automatic memoization (stable in Next.js 16)
  reactCompiler: true,

  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
    // Enable Turbopack filesystem caching for faster dev builds (beta)
    turbopackFileSystemCacheForDev: true,
    // Enable optimized package imports (Next.js 14+)
    optimizePackageImports: ["@headlessui/react", "lodash", "react-player"],
  },
  // Serve old static app from /app route
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/app",
          destination: "/app/index.html",
        },
        {
          source: "/app/:path*",
          destination: "/app/:path*",
        },
      ],
    };
  },
  // Redirect individual verses to their ranges
  async redirects() {
    return generateVerseRedirects();
  },
});

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: "writesonic",
    project: "bhagavadgitaio-frontend",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
