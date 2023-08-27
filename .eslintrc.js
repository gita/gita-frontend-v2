module.exports = {
  extends: ["next/core-web-vitals", "plugin:tailwindcss/recommended"],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": [
      2,
      {
        groups: [
          // Packages. `react` related packages come first.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^react", "^@?\\w"],
          // Absolute imports
          [
            "^app(/.*|$)",
            "^components(/.*|$)",
            "^constant(/.*|$)",
            "^gqty-client(/.*|$)",
            "^hooks(/.*|$)",
            "^layouts(/.*|$)",
            "^lib(/.*|$)",
            "^redux(/.*|$)",
            "^shared(/.*|$)",
            "^utils(/.*|$)",
          ],
          // ../ imports
          [
            "^\\../",
            "^\\./",
            "^\\./types",
            "^\\./constants",
            "^\\./functions",
            "^\\./use",
          ],
          // for scss imports.
          ["^[^.]"],
        ],
      },
    ],
  },
};
