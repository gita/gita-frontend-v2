import { fitHeading, LOTUS_PATH, OG_COLORS } from "./brand";

type OgTemplateProps = {
  /** Small uppercase line above the heading, e.g. "Chapter 2" or "Verse". */
  eyebrow?: string;
  /** The main line. Kept to Latin script by the caller. */
  heading: string;
  /** One supporting line under the heading. */
  subheading?: string;
  /** Small line bottom right, e.g. "18 chapters, 700 verses". */
  meta?: string;
};

/**
 * One layout for every OG image on the site, so a chapter, a verse and the app
 * page all look like the same publication.
 *
 * Deliberately uses only system fonts and inline SVG. `next/og` would have to
 * fetch anything else at render time, and a slow or failed fetch produces a
 * broken preview rather than a slow one.
 */
export function OgCanvas({
  eyebrow,
  heading,
  subheading,
  meta,
}: OgTemplateProps) {
  return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: OG_COLORS.cream,
          padding: 72,
          position: "relative",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Warm wash from the top, echoing the site's hero gradient. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 220,
            background: `linear-gradient(180deg, ${OG_COLORS.terracotta}22 0%, ${OG_COLORS.cream}00 100%)`,
          }}
        />

        {/* Masthead */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}
        >
          <svg width="34" height="34" viewBox="0 0 64 64">
            <path d={LOTUS_PATH} fill={OG_COLORS.terracotta} />
            <circle
              cx="32"
              cy="47"
              r="9"
              fill="none"
              stroke={OG_COLORS.terracotta}
              strokeWidth="3"
            />
          </svg>
          <span
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: OG_COLORS.ink,
              letterSpacing: -0.5,
            }}
          >
            BhagavadGita.com
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            maxWidth: 940,
          }}
        >
          {eyebrow ? (
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: OG_COLORS.terracotta,
                marginBottom: 20,
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {eyebrow}
            </span>
          ) : null}

          <span
            style={{
              fontSize: fitHeading(heading),
              fontWeight: 700,
              lineHeight: 1.12,
              color: OG_COLORS.ink,
              letterSpacing: -1.5,
            }}
          >
            {heading}
          </span>

          {subheading ? (
            <span
              style={{
                fontSize: 28,
                lineHeight: 1.4,
                color: OG_COLORS.muted,
                marginTop: 24,
              }}
            >
              {subheading}
            </span>
          ) : null}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${OG_COLORS.border}`,
            paddingTop: 24,
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: OG_COLORS.muted,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {meta ?? "Free and ad-free, from Ved Vyas Foundation"}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: OG_COLORS.terracotta,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            bhagavadgita.com
          </span>
        </div>
    </div>
  );
}
