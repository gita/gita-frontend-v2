import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

/**
 * Typed MDX content layer, ported from radhakrishna.net (ROADMAP item 24).
 *
 * Every content page here used to be hand-written TSX, which does not scale and
 * produced pages with no shared visual vocabulary. One `content` collection
 * under content/; the URL comes from the file path and `type` selects the
 * template.
 *
 * Runs as a `velite` step before `next dev`/`next build`. Velite writes plain
 * JS + JSON into .velite, so Turbopack never has to compile MDX itself.
 */

/**
 * One app in a comparison page.
 *
 * Everything optional except identity, price, ads and the editorial fields,
 * because the honest state for an unverified figure is absent, not zero. A
 * missing `rating` renders as no rating rather than as a wrong one.
 */
const app = s.object({
  slug: s.string(),
  name: s.string(),
  developer: s.string(),
  /** Our relationship to the app, disclosed everywhere it appears. */
  ours: s.enum(["published", "built-for-jkyog"]).optional(),
  playUrl: s.string().url().optional(),
  iosUrl: s.string().url().optional(),
  /** Play shows one decimal; these are its underlying value to two. */
  rating: s.string().optional(),
  ratingCount: s.string().optional(),
  installs: s.string().optional(),
  price: s.string(),
  ads: s.string(),
  languages: s.string(),
  /** Who translated and commented, or plainly that nobody is named. */
  attribution: s.string(),
  verdict: s.string(),
  forWhom: s.string(),
  notForWhom: s.string(),
  pros: s.array(s.string()).default([]),
  cons: s.array(s.string()).default([]),
});

const content = defineCollection({
  name: "Content",
  pattern: "**/*.mdx",
  schema: s
    .object({
      title: s.string().max(140),
      /** Path relative to content/, e.g. "best-bhagavad-gita-apps". Drives the URL. */
      path: s.path(),
      type: s.enum(["comparison", "guide", "page"]).default("page"),
      description: s.string().max(300),
      /** Shown as the h1 when it should differ from the SEO title. */
      heading: s.string().optional(),
      /** One sentence under the h1. */
      standfirst: s.string().optional(),
      /** The scannable version of the whole page, rendered above the fold. */
      tldr: s.array(s.string()).default([]),
      published: s.isodate().optional(),
      updated: s.isodate().optional(),
      /**
       * When the figures on the page were last re-pulled from source. Separate
       * from `updated`, which moves for a typo fix. A comparison page whose
       * prose changed but whose numbers did not should not claim fresh data.
       */
      verifiedOn: s.isodate().optional(),
      /** Which storefront the ratings came from. Ratings differ by storefront. */
      storefront: s.string().optional(),
      apps: s.array(app).default([]),
      /** "Best for X" picks. `ours` repeats the disclosure at the point of claim. */
      categoryWinners: s
        .array(
          s.object({
            category: s.string(),
            winner: s.string(),
            ours: s.enum(["published", "built-for-jkyog"]).optional(),
            why: s.string(),
          }),
        )
        .default([]),
      /** Left off the ranked list on purpose, each with the reason stated. */
      alsoConsidered: s
        .array(
          s.object({
            name: s.string(),
            developer: s.string(),
            note: s.string(),
          }),
        )
        .default([]),
      /** Genuine Q&A, mirrored in-body, feeding FAQPage schema. */
      faq: s
        .array(s.object({ question: s.string(), answer: s.string() }))
        .default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      // "best-bhagavad-gita-apps" -> "/best-bhagavad-gita-apps"; index files
      // map to their folder.
      url: "/" + data.path.replace(/(^|\/)index$/, "$1").replace(/\/$/, ""),
      slug: data.path.split("/").pop() as string,
    })),
});

export default defineConfig({
  root: "content",
  output: { data: ".velite", clean: true },
  collections: { content },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
});
