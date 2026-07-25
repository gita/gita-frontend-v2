import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { OG_SIZE } from "@/lib/og/brand";
import { OgCanvas } from "@/lib/og/template";

export const runtime = "edge";

/**
 * Generates OpenGraph images on demand.
 *
 * A route handler rather than the file-based `opengraph-image.tsx` convention,
 * because that convention applies to the segment it sits in and Next forbids
 * placing it inside an optional catch-all. Every page here lives under
 * `[[...locale]]`, so the file-based approach cannot reach any of them.
 *
 * Query params: t (heading), e (eyebrow), s (subheading), m (meta line).
 */
export function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;

  return new ImageResponse(
    OgCanvas({
      eyebrow: p.get("e") ?? undefined,
      heading: p.get("t") ?? "The Bhagavad Gita, complete and free",
      subheading:
        p.get("s") ??
        "All 18 chapters and 700 verses with translations, commentaries and audio.",
      meta: p.get("m") ?? undefined,
    }),
    {
      ...OG_SIZE,
      headers: {
        // Cheap to render, but crawlers refetch often. Cache hard at the edge.
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  );
}
