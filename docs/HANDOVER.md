# Handover — state of play, 2026-07-25

Written at the end of a long working session so the next one can start cold. Read this, then
[`../ROADMAP.md`](../ROADMAP.md).

---

## Shipped and live on production

Verified against `bhagavadgita.com`, not assumed:

| What                                 | Evidence                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------- |
| **Per-page OG images** (#304)        | `/api/og?t=…` returns **200 `image/png`** — the URL that was 404ing              |
| **Comparison page** (#308)           | `/best-bhagavad-gita-apps` returns 200                                           |
| **App comparison fact sheet** (#307) | `notes/app-comparison-facts.md`                                                  |
| **Tier 1 install conversion** (#312) | `/go/app` 307s to the App Store under an iPhone UA; Smart App Banner in the HTML |

Also live: the install bar (rebuilt on radhakrishna.com's pattern — icon, one pill, 69px on
mobile, corner card on desktop, 700px scroll trigger, 30-day dismissal).

## Open work, in priority order

1. **Item 24 — Velite content system.** The next thing to build. Rebuilds
   `/best-bhagavad-gita-apps` on typed MDX blocks; the current version is factually correct but
   visually unpolished because there is no block vocabulary behind it.
2. **Item 26 — dependency upgrade.** Arguably should come _first_: Tailwind 3 → 4 is cheapest as a
   token pass before the design work in items 20–22, and it fixes the repo-wide broken pre-commit
   hook.
3. **Item 20 — homepage rebuild.** Highest-traffic page, and the weakest.
4. **Items 21–23** — reading UI, then content/growth.
5. **Item 25** — chapter descriptions in house voice.
6. **Item 27** — port the image generation system.

## Reference material

- **[`ui-reference-analysis.md`](ui-reference-analysis.md)** — what bible.com, quran.com, sefaria,
  hallow, abide and calm do that we don't, measured on real device profiles. The gap list.
- **[`upgrade-learnings.md`](upgrade-learnings.md)** — ported from radhakrishna.net. The
  "immersive not dashboard" design direction, Tailwind v4, Velite, gamification, guide character.
- **[`design-capture/capture.mjs`](design-capture/capture.mjs)** — regenerates all 145 reference
  screenshots into `design-refs/` (git-ignored, ~10 MB). Needs Playwright.
- **`marketing/`** — the GTM work: BGFA teardown, creator landscape, content engine, retention,
  automation stack, video pipeline, paid ads, trend monitoring.

## Things that will bite you

- **`npm` was broken** under Node v26 (`npm -v` returned empty). It works now, but if it breaks
  again, `node /opt/homebrew/lib/node_modules/npm/bin/npm-cli.js` bypasses the shim.
- **Every commit needs `--no-verify`.** `prettier-plugin-tailwindcss@^0.7.1` requires Tailwind v4
  and the repo is on v3. Item 26 fixes this.
- **`Vercel – bg-frontend` fails on every PR.** It is an orphaned project in the `gita-v2` Vercel
  team, which `samanyougarg` is not a member of. Both projects share one GitHub App installation,
  so it cannot be removed from the GitHub side without breaking the working deploy. It is **not a
  required status check** and blocks nothing.
- **The git remote is `gita/bg-frontend`** — the repo's old name. `gh` resolves it to
  `gita-frontend-v2`. This is probably why the orphaned Vercel project exists.
- **The merge queue requires one approving review and rejects self-merge.** Every PR needs the
  founder to click approve.
- **`design-refs/` is git-ignored.** Regenerate rather than looking for it in git.

## Decisions worth not re-litigating

- **No user-agent branching in the UI.** Measured: none of bible.com, quran.com, hallow or abide
  hide the wrong-platform store badge. `/go/app` resolves the store server-side, which is routing,
  not hiding.
- **The Smart App Banner carries no `app-argument`.** `gita-flutter-2.0`'s handler
  (`lib/main.dart`) only routes gitagpt and home-widget links, so a verse deep link would open the
  app at its home screen. Add it once the Flutter side handles verse routes. Scheme is `gita://`,
  host `gita.app`.
- **Depicting Krishna with AI is fine.** Seven backlash cases examined; none objected to the
  technology, all objected to portrayal. Real risks are iconographic sloppiness (generators
  whitewash the complexion) and visible cheapness. Full reasoning in
  `marketing/03-content-engine.md`.
- **Organic A/B testing is not valid inference.** Use outlier mining; buy real randomisation with
  ~$5–10 per variant in paid.
- **radhakrishna.com is one-way top-of-funnel** into the app install, sharing the Gita social
  accounts.
- **No blog.** Evergreen pages at flat URLs. srimadgita's `/questions/*` does 14,371 visits across
  146 URLs; `/blog/*` does 56 across 184.

## Open questions for the founder

- Does a **US 501(c)(3) with an IRS determination letter** exist? Gates Google Ad Grants entirely
  (India registration needs FCRA; 12A/80G does not satisfy Google).
- Is **Firebase already wired into `gita-flutter-2.0`**? Decides whether conversion-optimised ad
  bidding is a day or a week of work.
- Who owns the **`gita-v2` Vercel team**, so the failing check can be removed?
- Sign-off on the **art policy** (traditional iconography, human review, never presented as an
  object of worship).
