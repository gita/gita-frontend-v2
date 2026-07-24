# 00 — Cross-property plan

Adapted from `radhakrishna.net/docs/08-marketing-automation.md` (the cross-property original).
**Rewritten, not copied**, because the founder's 2026-07-25 decision changed the property model
that doc assumed.

---

## What changed from the original

The original planned two properties as peers: separate voices, two-way cross-promotion, and by
implication separate social presences. That is no longer the model.

|                  | Original assumption                               | Now                                                                            |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| radhakrishna.com | Co-equal property with its own audience and voice | **Pure top-of-funnel.** No app, no on-site conversion                          |
| Cross-promotion  | Two-way between properties                        | **One-way.** Traffic flows to the Gita app install                             |
| Social accounts  | Per-property voices                               | **One shared set.** The Bhagavad Gita accounts carry Radha Krishna content too |
| Conversion event | Implied per property                              | **One:** a Bhagavad Gita app install                                           |

**Why:** radhakrishna.com is a strong domain with nothing to monetise or convert on its own. Its
highest-value use is as an SEO/GEO traffic engine feeding the app. Running separate handles for it
would split effort across two audiences to no benefit.

## The model

```
radhakrishna.com          bhagavadgita.com
(SEO/GEO, top-of-funnel)  (scripture, Gita GPT, comparison pages)
        │                          │
        └──────────┬───────────────┘
                   ▼
        ONE shared social presence
        (IG, FB, YouTube, X, Pinterest)
                   │
                   ▼
        Bhagavad Gita app install
                   │
                   ▼
        Retention: push + email
        (verse of the day, reading plans, streaks)
```

One conversion event. One social presence. Two content sources feeding it.

## The three engines

| Engine        | Output                                                          | Cadence                     | Goal                     |
| ------------- | --------------------------------------------------------------- | --------------------------- | ------------------------ |
| **Social**    | Quote/shloka cards, carousels, AI video Reels/Shorts, leela art | ≥1/day                      | Reach → installs         |
| **Retention** | Verse of the day, reading plans, streaks, festivals             | Daily push, weekly email    | Return visits, retention |
| **Content**   | New site pages on both properties                               | 5–10/week, gated on quality | SEO/GEO growth           |

One shared brain feeds all three: a trend and competitor monitor, an ideation model, the
asset-generation pipeline, a scheduler, and an analytics loop.

```
MONITOR  → trends + competitor top-posts (views, likes, saves, shares)
IDEATE   → adapt winners, generate net-new angles
CREATE   → copy + image/video, on-brand, reverent
TEST     → A/B hook, art, format, caption, time
MEASURE  → per-post and per-account performance
LEARN    → winners and losers feed back into IDEATE
```

## Voice

**One brand family, two content sources, one tone.** Not two personalities.

- **Gita content:** verse of the day, wisdom for modern life, "what the Gita says about X",
  practical application, Gita GPT demos. Wise, practical, calm.
- **Radha Krishna content:** leelas, daily darshan, festivals, bhajans, devotional art,
  "did you know" scripture facts. Warm, devotional, delightful.

Both go out from the same accounts. The mix is what keeps a daily cadence from feeling
monotonous — which was the original doc's insight, and it survives the model change.

## The content engine on radhakrishna.com

Since its only job is traffic that converts to installs:

- **Pinterest is a natural fit** ([02](02-creator-landscape.md)) — 631M MAU, rewards fresh 2:3
  pins, compounds over months. It drives _web traffic_, not installs directly, which is exactly
  what a top-of-funnel property needs. Pins deep-link to verse and story pages.
- **Every page needs an app CTA** that is honest rather than aggressive — this is a non-profit
  giving something away free, and the ask should read that way.
- **Attribution is mandatory.** Tracked links on every path from radhakrishna.com to a store
  listing, or we will never know whether the funnel works. Same discipline as the signup
  attribution work in roadmap item 6.

## Guardrails, inherited and non-negotiable

- **Every page passes the information-gain test.** Never publish faster than we can verify. The
  standing rule at the top of `ROADMAP.md` applies to marketing content as much as site content:
  srimadgita has 5,620 URLs and 53 with traffic.
- **The AI never writes scripture.** Retrieval-only, verbatim by ID. See
  [03](03-content-engine.md).
- **No AI-generated deity faces or voices.** Pending the Foundation's formal policy, this is the
  working assumption.
- **A human gate on anything quoting a verse or riding a trend**, until that policy exists and a
  named owner holds it.

## Sequencing

Build order lives in [05-automation-stack.md](05-automation-stack.md). In short: prove the
publishing pipeline on free tiers, then retention, then the daily engine, then the growth levers.

---

_Cross-property. Reuses the content and image/video pipelines from the radhakrishna.net docs and
the tooling patterns in `writesonic-marketing`. Living doc._
