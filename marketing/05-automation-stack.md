# 05 — The automation stack: tools, costs, and what to build

Research date: 2026-07-25. Prices need re-checking before purchase; several 2026 aggregator
figures conflicted with each other.

---

## Recommended stack

| Layer                     | Tool                      | Cost/mo             | Why                                             |
| ------------------------- | ------------------------- | ------------------- | ----------------------------------------------- |
| Publishing                | **Ayrshare** Premium      | $149                | Only mature single API covering all 5 platforms |
| Templated video           | **Remotion**              | **$0** (non-profit) | ~$0.02/render on Lambda                         |
| Generative video + images | **Higgsfield** Plus/Ultra | $39–99              | Already wired via MCP                           |
| Lambda renders            | AWS                       | ~$5–10              |                                                 |
| Competitor scraping       | **Apify** Starter         | $49                 | ~$2.60 per 1,000 results                        |
| Generative credits        | overflow                  | ~$20–50             |                                                 |
| **Total**                 |                           | **~$300–360**       | Scales down to **~$110** on free/starter tiers  |

Plus retention from [04](04-retention-email-push.md): **$0–90/mo**.

### Publishing: Ayrshare

The only developer-first API that natively covers **Instagram, Facebook, YouTube, X and Pinterest**
in a single call, plus TikTok, LinkedIn, Threads and Bluesky. One `POST /post` with an array of
platforms fans out to all five and returns per-network post IDs — which is what feeds the
analytics loop.

Billed **per social profile**, not per seat, and a profile bundles all networks. Premium ~$149/mo
for one profile; extra profiles ~$8.99 each. **There is a $0 tier** — prototype on it and validate
all five network connections before paying anything.

**radhakrishna.com becomes a second profile at ~+$8.99/mo**, sharing the same templates and
scraping infrastructure. Given its job is purely top-of-funnel traffic into the app, that is
cheap.

Buffer, Metricool, Publer and Post-Bridge were all considered and rejected as the _backend_:
Buffer is per-channel rather than per-profile, Metricool's API is analytics-oriented, Publer
exposes an API only on Business, and Post-Bridge's programmatic API is an add-on rather than a
full API. Keep Metricool only if we separately want its dashboard.

### Video: three tiers, not one tool

**Remotion is the daily workhorse and it is free for us.** Remotion's licence is **free for
commercial use by non-profits** — Ved Vyas Foundation qualifies. For-profits with 4+ employees pay
$25/seat/mo. Render cost on AWS Lambda is **~$0.02 per short video**.

Build 3–4 React templates — verse-of-the-day card-to-motion, shloka + transliteration +
translation, Gita GPT answer snippet, festival greeting — feed each a JSON row, render on Lambda.
**This is the zero-marginal-cost baseline that guarantees the daily post**, with full brand
control and no AI-slop risk, because the template is designed once by a human.

**Get the non-profit licence confirmed in writing before relying on $0.**

**Generative video, used sparingly:**

| Model            | Cost                        | Use                           |
| ---------------- | --------------------------- | ----------------------------- |
| Kling 3.0        | ~$0.029–0.10/sec            | Routine devotional b-roll     |
| Sora 2           | ~$0.10/sec (Pro $0.30–0.50) | Hero pieces                   |
| Veo 3.1 Standard | ~$0.75/sec (Fast ~$0.15)    | Hero pieces, best lip-sync/4K |

A 10-second clip runs ~$0.50 (Wan 2.6) to ~$7.50 (Veo 3.1 Standard). **Reserve the expensive
models for 1–2 hero pieces a week**; use Kling for routine motion at 3–10× less.

**Higgsfield bundles all of them** — Kling, Sora 2, Veo 3.1, Nano Banana Pro, a Shorts Studio, and
a virality predictor — at $15/$39/$99 per month for 200/1,000/3,000 credits. Basic videos cost
15–25 credits, premium 40–70. Credits do not roll over. Since it is already wired via MCP, one
subscription beats wiring four model APIs separately.

Its **virality predictor is worth using as a pre-publish gate** on generated Reels, to filter weak
hooks before they enter the queue.

### Images: Nano Banana Pro, for one specific reason

**Sanskrit and Devanagari rendering.** Nano Banana Pro (Gemini 3 Pro Image) has industry-leading
in-image multilingual text rendering, which is the whole ballgame for shloka cards. ~$0.134 per
1K/2K image, ~$0.24 at 4K. Cheaper options exist (FLUX.2 at $0.014–0.07, base Nano Banana at
~$0.039) but text fidelity is the constraint, not price.

**Even so: test it on real shlokas before trusting it.** Conjunct characters, matras and ligatures
are exactly what image models mangle, and mangled scripture is unacceptable. **A human proof step
on any rendered Sanskrit is mandatory**, regardless of model.

### The learning loop: Apify

Nightly, pull the latest posts from ~20 tracked devotional/Gita creators (the target list in
[02](02-creator-landscape.md)), dump to a table, rank by engagement-per-follower, and surface the
top formats, hooks and audio each morning to steer that day's content.

~$2.60 per 1,000 results, Starter plan $49/mo. Budget ~1,000 results a night.

**Have a fallback path.** Platforms change anti-scraping defences constantly, and Instagram and
SocialBlade already 403'd our automated fetches during this very research. An official-API route
should exist for when actors break.

## Build order

The research is done; this is the sequence that gets value out fastest without over-building.

**Phase 1 — prove the pipeline (weeks 1–2)**

1. Ayrshare **free tier**, connect all five networks, confirm each publishes
2. Build **one** Remotion template (verse of the day) and render it on Lambda
3. Ship 7 consecutive daily posts by hand-triggering the pipeline
4. Confirm Remotion's non-profit licence in writing

**Phase 2 — retention (weeks 2–4)** 5. Size the list — the number that decides the whole email architecture 6. OneSignal into `gita-flutter-2.0` (check whether Firebase is already wired) 7. Shared preference centre + suppression store + frequency cap **before** the first send 8. Verse-of-the-day email and push from one canonical record

**Phase 3 — the engine (weeks 4–8)** 9. Remaining Remotion templates, the weekly grid, comment-to-DM CTA 10. Weekly trend scan with the four-gate checklist, run by a human 11. Apify nightly scrape and the morning digest 12. Pinterest pipeline pointed at radhakrishna.com

**Phase 4 — growth levers (ongoing)** 13. Creator shoutout test: $300–500 across 5–8 pages with per-page tracked links 14. 3–5 engineered spectacle pieces per quarter 15. Newsjacking, at 3–4/week, with both human gates 16. QR-per-verse printed Gita

**Do not automate publishing end-to-end until the reverence gate has a named owner.** Everything
above assumes a human sign-off on anything quoting scripture or riding a trend.

## Verify before spending

- Ayrshare's live pricing and per-profile post limits — 2026 aggregators conflicted ($149 vs $499),
  and "Max Pack" ($300/mo) and DM metering ($0.09/conversation) add-ons may apply
- **That Ayrshare publishes via official Graph/Content APIs, not scraping.** We must never risk the
  main accounts.
- Whether Ayrshare handles YouTube **long-form** with full metadata, or whether that needs the
  YouTube Data API directly
- Remotion non-profit eligibility, in writing
- Nano Banana Pro on real Devanagari conjuncts
- Apify actor reliability in 2026, with a fallback
