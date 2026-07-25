import { content } from "#content";

/**
 * Accessors over the Velite-generated content layer.
 *
 * Velite validates frontmatter against the Zod schema in velite.config.ts at
 * build time and emits typed JS, so a missing required field fails the build
 * with a file path rather than rendering a blank section.
 */
export type ContentDoc = (typeof content)[number];

/** Every publishable doc. Drafts never reach a route. */
export const docs: ContentDoc[] = content.filter((d) => !d.draft);

export function findByUrl(url: string): ContentDoc | undefined {
  const clean = "/" + url.replace(/^\/+/, "").replace(/\/+$/, "");
  return docs.find((d) => d.url === clean);
}

/** Slug segments for generateStaticParams. */
export function allSlugs(): string[][] {
  return docs.map((d) => d.url.replace(/^\//, "").split("/"));
}
