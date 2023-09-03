/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const fs = require("fs");
require("dotenv").config({ path: ".env.development.local" });

if (
  !process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT 
) {
  throw new Error("Some required env vars not found in file");
}

const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  },
  destination: "./src/gqty-client/index.ts",
  enumsAsConst: true,
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
