import type { ContentDoc } from "./content";

/**
 * Section index for a content page, derived from the MDX source.
 *
 * A page's sections come from two places: `## Headings` written in the MDX, and
 * data blocks like `<RankedApps />` that render their own heading. Both appear
 * in the source in document order, so reading the source is the only way to get
 * a list that is both complete and correctly ordered — and, more to the point,
 * one that cannot drift when someone reorders the page.
 *
 * Block headings are declared here rather than read from the components, so a
 * block that renders no heading simply has no entry.
 */
const BLOCK_SECTIONS: Record<string, { id: string; title: string }> = {
  CategoryWinners: { id: "best-for-each-thing", title: "Best for each thing" },
  ComparisonTable: { id: "every-app-compared", title: "Every app, compared" },
  RankedApps: { id: "the-apps-ranked", title: "The apps, ranked" },
  AlsoConsidered: { id: "also-considered", title: "Also considered" },
  FaqBlock: { id: "faq", title: "Frequently asked questions" },
};

export type TocEntry = { id: string; title: string };

/**
 * Matches rehype-slug: lowercase, strip anything that is not a word character,
 * space or hyphen, then collapse spaces to hyphens. Kept deliberately simple
 * because our headings are plain sentences.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function tableOfContents(doc: ContentDoc): TocEntry[] {
  const out: TocEntry[] = [];
  const seen = new Set<string>();

  for (const line of (doc.source ?? "").split("\n")) {
    const heading = /^##\s+(?!#)(.+?)\s*$/.exec(line);
    if (heading) {
      const title = heading[1].replace(/[*_`]/g, "");
      const id = slugify(title);
      if (!seen.has(id)) {
        seen.add(id);
        out.push({ id, title });
      }
      continue;
    }

    // Self-closing block, e.g. `<RankedApps />`, at the start of a line.
    const block = /^<([A-Z]\w*)\s*\/>/.exec(line.trim());
    if (block) {
      const section = BLOCK_SECTIONS[block[1]];
      if (section && !seen.has(section.id)) {
        seen.add(section.id);
        out.push(section);
      }
    }
  }

  return out;
}
