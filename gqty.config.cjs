/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const fs = require("fs");
require("dotenv").config({ path: ".env.development.local" });

if (
  !process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  !process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
) {
  throw new Error("Some required env vars not found in file");
}

const config = {
  react: true,
  scalarTypes: { DateTime: "string" },
  introspection: {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    },
  },
  destination: "./src/gqty-client/index.ts",
  enumsAsConst: true,
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
