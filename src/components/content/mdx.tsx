import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import * as runtime from "react/jsx-runtime";
import Link from "next/link";

import {
  AlsoConsidered,
  Callout,
  CategoryWinners,
  ComparisonTable,
  FaqBlock,
  Provenance,
  RankedApps,
} from "./blocks";

import type { ContentDoc } from "@/lib/content";

/**
 * Renders a Velite-compiled MDX body.
 *
 * Data blocks are bound to the document here rather than reading it from a
 * React context, so `<RankedApps />` in the MDX takes no props and the page
 * stays a server component with no provider around it. A block that needs page
 * data gets it by closure.
 */
function componentsFor(doc: ContentDoc) {
  return {
    // Wide tables scroll inside their own container so the page body never
    // scrolls sideways on a phone.
    table: (props: HTMLAttributes<HTMLTableElement>) => (
      <div className="border-border my-6 overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm" {...props} />
      </div>
    ),
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className="font-crimson mt-14 mb-5 text-2xl font-bold tracking-tight md:text-3xl [&_a]:text-inherit [&_a]:no-underline"
        {...props}
      />
    ),
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className="font-crimson mt-8 mb-3 text-xl font-bold [&_a]:text-inherit [&_a]:no-underline"
        {...props}
      />
    ),
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p className="text-muted-foreground my-4 leading-relaxed" {...props} />
    ),
    strong: (props: HTMLAttributes<HTMLElement>) => (
      <strong className="text-foreground font-semibold" {...props} />
    ),
    a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const external = /^https?:\/\//.test(href);
      const className = "underline underline-offset-4";
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        />
      ) : (
        <Link href={href} className={className} {...props} />
      );
    },
    Callout,
    CategoryWinners: () => <CategoryWinners doc={doc} />,
    ComparisonTable: () => <ComparisonTable doc={doc} />,
    RankedApps: () => <RankedApps doc={doc} />,
    AlsoConsidered: () => <AlsoConsidered doc={doc} />,
    FaqBlock: () => <FaqBlock doc={doc} />,
    Provenance: () => <Provenance doc={doc} />,
  };
}

function compile(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXBody({ doc }: { doc: ContentDoc }) {
  const Content = compile(doc.body);
  return <Content components={componentsFor(doc)} />;
}
