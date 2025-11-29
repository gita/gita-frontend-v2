const { withPlausibleProxy } = require("next-plausible");

module.exports = withPlausibleProxy()({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
    serverActions: true,
  },
  i18n: {
    locales: ["en", "hi"],
    defaultLocale: "en",
  },
  // Serve old static app from /app route
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/app',
          destination: '/app/index.html',
        },
        {
          source: '/app/:path*',
          destination: '/app/:path*',
        },
      ],
    };
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
