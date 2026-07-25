#!/usr/bin/env node
/**
 * WCAG contrast audit for the design tokens in src/app/global.css.
 *
 * Written because a contrast failure is invisible to review. Body text at
 * 3.65:1 looked entirely fine in screenshots for a day before anyone measured
 * it; the eye adapts, the ratio does not. So the rule for this pass is measure,
 * do not eyeball, and this is the instrument.
 *
 * Token values are parsed out of global.css rather than copied here, so the
 * audit can never report on a palette the site no longer ships.
 *
 * Usage: node scripts/contrast-audit.mjs [--all] [--theme=light|dark] [--css=PATH]
 *   --all    also print the pairs that pass, not just the failures
 *   --theme  audit one palette only
 *   --css    audit a different stylesheet, for comparing another site's palette
 *            against ours before borrowing from it
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cssArg = process.argv.find((a) => a.startsWith("--css="))?.split("=")[1];
const CSS = readFileSync(
  cssArg ? resolve(process.cwd(), cssArg) : resolve(ROOT, "src/app/global.css"),
  "utf8",
);

/**
 * Pull `--name: value;` declarations out of a `:root {...}` style block.
 * A missing block yields no tokens rather than throwing, so the audit can be
 * pointed at a single-theme stylesheet.
 */
function parseBlock(selector, optional = false) {
  const start = CSS.indexOf(`${selector} {`);
  if (start === -1) {
    if (optional) return {};
    throw new Error(`Block not found: ${selector}`);
  }
  let depth = 0;
  let i = CSS.indexOf("{", start);
  const from = i;
  for (; i < CSS.length; i++) {
    if (CSS[i] === "{") depth++;
    else if (CSS[i] === "}" && --depth === 0) break;
  }
  const body = CSS.slice(from + 1, i);
  const out = {};
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim();
  }
  return out;
}

const light = parseBlock(":root");
const dark = { ...light, ...parseBlock(".dark", true) };

/** `48 33.33% 97.06%` (bare HSL triple) or `#rrggbb` -> linear-light RGB 0..1 */
function toRgb(value) {
  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    return [0, 2, 4].map((o) => parseInt(hex.slice(o, o + 2), 16) / 255);
  }
  const [h, s, l] = value
    .split(/\s+/)
    .map((p) => parseFloat(p.replace("%", "")));
  return hslToRgb(h, s / 100, l / 100);
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const t = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ][Math.floor((((h % 360) + 360) % 360) / 60)];
  return t.map((v) => v + m);
}

/** WCAG 2.x relative luminance. */
function luminance(rgb) {
  const [r, g, b] = rgb.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [x, y] = [luminance(toRgb(a)), luminance(toRgb(b))].sort(
    (p, q) => q - p,
  );
  return (x + 0.05) / (y + 0.05);
}

/**
 * Every pair a person actually reads or aims at, with the threshold that
 * applies to it: 4.5 for body text (WCAG 2.2 1.4.3), 3.0 for the boundary that
 * identifies a control (1.4.11).
 *
 * Only pairs that genuinely co-occur are listed. `text-primary` on `bg-muted`,
 * for instance, is absent because a census of the components found no element
 * that combines them, and holding the brand colour to a pairing the site never
 * renders would darken it for no one's benefit.
 *
 * `theme` pins a pair to one palette. The prakash/nisha tokens are fixed
 * literals applied through explicit `dark:` variants rather than being
 * redefined per theme, so checking prakash against the dark palette would
 * report a failure for something that cannot appear.
 */
const PAIRS = [
  // fg,                  bg,             min,  theme,   what it is
  ["foreground", "background", 4.5, null, "body text"],
  ["foreground", "card", 4.5, null, "text on a card"],
  ["foreground", "muted", 4.5, null, "text on a muted panel"],
  ["muted-foreground", "background", 4.5, null, "secondary text"],
  ["muted-foreground", "card", 4.5, null, "secondary text on a card"],
  ["muted-foreground", "muted", 4.5, null, "secondary text on a muted panel"],
  ["card-foreground", "card", 4.5, null, "card heading"],
  ["popover-foreground", "popover", 4.5, null, "popover text"],
  ["secondary-foreground", "secondary", 4.5, null, "secondary button label"],
  ["accent-foreground", "accent", 4.5, null, "accent surface text"],
  ["primary-foreground", "primary", 4.5, null, "primary button label"],
  [
    "destructive-foreground",
    "destructive",
    4.5,
    null,
    "destructive button label",
  ],
  ["primary", "background", 4.5, null, "link / brand text"],
  ["primary", "card", 4.5, null, "brand text on a card"],
  [
    "prakash-primary",
    "prakash-bg",
    4.5,
    "light",
    "brand text on the light ground",
  ],
  ["nisha-primary", "nisha-bg", 4.5, "dark", "brand text on the dark ground"],
  ["gold-ink", "background", 4.5, null, "gold eyebrow / label text"],
  ["gold-ink", "card", 4.5, null, "gold label on a card"],
  ["indigo-foreground", "indigo", 4.5, null, "text on a deep indigo panel"],
  ["input", "background", 3.0, null, "input outline"],
  ["ring", "background", 3.0, null, "focus ring"],
  ["verse-medium-text", "background", 4.5, null, "verse body"],
  ["verse-muted-text", "background", 4.5, null, "verse secondary"],
  ["verse-light-text", "background", 4.5, null, "verse tertiary"],
  ["verse-grey-text", "background", 4.5, null, "verse quiet label"],
  ["verse-warm-brown", "background", 4.5, null, "verse accent"],
  ["verse-verse-count", "verse-card-bg", 4.5, null, "verse counter on a card"],
  ["verse-dark-text", "verse-card-bg", 4.5, null, "verse text on a card"],
  ["verse-medium-text", "verse-banner-bg", 4.5, null, "verse text on a banner"],
];

/**
 * `--border` is deliberately not audited. It draws decorative separation —
 * hairlines between sections and around cards — and 1.4.11 applies to visual
 * information required to identify a control, not to ornament. `--input` is
 * audited precisely because it is the boundary that identifies a text field.
 */

const showAll = process.argv.includes("--all");
const only = process.argv.find((a) => a.startsWith("--theme="))?.split("=")[1];
let failures = 0;

for (const [key, name, tokens] of [
  ["light", "LIGHT (prakash)", light],
  ["dark", "DARK (nisha)", dark],
]) {
  if (only && only !== key) continue;
  const rows = [];
  for (const [fg, bg, min, theme, label] of PAIRS) {
    if (theme && theme !== key) continue;
    if (!tokens[fg] || !tokens[bg]) continue;
    const ratio = contrast(tokens[fg], tokens[bg]);
    const pass = ratio >= min;
    if (!pass) failures++;
    if (pass && !showAll) continue;
    rows.push(
      [
        pass ? "  ok  " : "  FAIL",
        `${ratio.toFixed(2)}:1`.padStart(8),
        `(needs ${min})`.padEnd(12),
        `${fg} on ${bg}`.padEnd(46),
        label,
      ].join(" "),
    );
  }
  console.log(`\n${name}`);
  console.log(rows.length ? rows.join("\n") : "  all pairs pass");
}

console.log(
  `\n${failures} failing pair${failures === 1 ? "" : "s"}${showAll ? "" : " (--all to see passes, --theme=light|dark to filter)"}\n`,
);
process.exitCode = failures ? 1 : 0;
