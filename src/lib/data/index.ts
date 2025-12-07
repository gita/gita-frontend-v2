/**
 * Static JSON Data Module
 *
 * This module provides access to Bhagavad Gita content from static JSON files,
 * replacing the previous GraphQL/Hasura implementation for better performance
 * and lower costs.
 *
 * Data files are located in /public/data/ and sourced from the mobile app.
 */

// Export types
export * from "./types";

// Export loaders
export * from "./loaders";

// Export query functions
export * from "./queries";
