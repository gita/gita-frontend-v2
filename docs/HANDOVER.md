# Handover — state of play, 2026-07-25

Written at the end of a long working session so the next one can start cold. Read this, then
[`../ROADMAP.md`](../ROADMAP.md).

---

## Shipped and live on production

Verified against `bhagavadgita.com`, not assumed:

| What                                  | Evidence                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------- |
| **Per-page OG images** (#304)         | `/api/og?t=…` returns **200 `image/png`** — the URL that was 404ing                     |
| **Comparison page** (#308)            | `/best-bhagavad-gita-apps` returns 200                                                  |
| **App comparison fact sheet** (#307)  | `notes/app-comparison-facts.md`                                                         |
| **Tier 1 install conversion** (#312)  | `/go/app` 307s to the App Store under an iPhone UA; Smart App Banner in the HTML        |
| **Tailwind v4 + Next 16.2.11** (#316) | Served CSS carries `@property --tw`, `@layer properties`, `shadow-xs`, `outline-hidden` |

Also live: the install bar (rebuilt on radhakrishna.com's pattern — icon, one pill, 69px on
mobile, corner card on desktop, 700px scroll trigger, 30-day dismissal).

## Open work, in priority order

Item 26 is done — it went first so the design work below lands on v4 tokens rather than being
ported twice.

1. **Item 24 — Velite content system.** The next thing to build. Rebuilds
   `/best-bhagavad-gita-apps` on typed MDX blocks; the current version is factually correct but
   visually unpolished because there is no block vocabulary behind it.
2. **Item 20 — homepage rebuild.** Highest-traffic page, and the weakest.
3. **Items 21–23** — reading UI, then content/growth.
4. **Item 25** — chapter descriptions in house voice.
5. **Item 27** — port the image generation system.
6. **ESLint 8.57 → 9 with flat config.** Fell out of item 26: `eslint-plugin-tailwindcss` v3 reads
   `tailwindcss/resolveConfig`, which v4 no longer exports, so the plugin was dropped. Its v4 line
   needs ESLint 9. Class ordering is covered by `prettier-plugin-tailwindcss` in the meantime, so
   this is housekeeping, not urgent.

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
- **`package-lock.json` is git-ignored and `yarn.lock` is the tracked lockfile.** Commit the
  yarn.lock change after any `npm install`; npm 7+ keeps it in sync for you.
- **Screenshotting production under-renders.** Several sections are gated on IntersectionObserver,
  so a capture that only waits a few seconds gets skeletons and blank space, not the page. Walk the
  scroll position down the page before shooting or the diff will be full of false positives — this
  produced three of them during the v4 verification.
- **`Vercel – bg-frontend` fails on every PR.** It is an orphaned project in the `gita-v2` Vercel
  team, which `samanyougarg` is not a member of. Both projects share one GitHub App installation,
  so it cannot be removed from the GitHub side without breaking the working deploy. It is **not a
  required status check** and blocks nothing.
- **The git remote is `gita/bg-frontend`** — the repo's old name. `gh` resolves it to
  `gita-frontend-v2`. This is probably why the orphaned Vercel project exists.
- **Merging.** `gh pr merge --squash` fails: the queue sets the strategy and auto-merge is
  disabled on this repo. `gh pr merge <n> --squash --admin` works and bypasses the queue. Do not
  pass `--delete-branch`; it is rejected while a merge queue is enabled.
- **Vercel preview deployments are behind Vercel SSO**, so they cannot be fetched or screenshotted
  headlessly. Verification has to happen on production after merge, against a baseline captured
  beforehand.
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
