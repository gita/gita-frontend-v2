# Marketing / GTM

Working docs for growing bhagavadgita.com, the Bhagavad Gita app, and radhakrishna.com.

Research date on everything here: **2026-07-25**, from a 10-agent research run. Every factual
claim carries a source URL. Where something could not be verified it says **"could not verify"**
rather than guessing — that rule exists because this project has already shipped one wrong figure
scraped from a rendered page.

## The docs

| Doc                                                   | What's in it                                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [00 — Cross-property plan](00-cross-property-plan.md) | How radhakrishna.com, bhagavadgita.com and the app fit together. One conversion event, one social presence |
| [01 — BGFA teardown](01-competitor-bgfa.md)           | Bhagavad Gita For All: their real numbers, ~500 concurrent ads, celebrity costs, the QR-book trick         |
| [02 — Creator landscape](02-creator-landscape.md)     | ~25 target accounts to learn from and pay, real shoutout rates, YouTube and Pinterest                      |
| [03 — Content engine](03-content-engine.md)           | Daily social, trend-riding, newsjacking, and the reverence gate                                            |
| [04 — Retention](04-retention-email-push.md)          | Email and push across web, iOS and Android                                                                 |
| [05 — Automation stack](05-automation-stack.md)       | Tools, real costs, and the build order                                                                     |

## Standing strategy docs

Numbered docs above are the 2026-07-25 research synthesis. These are the earlier strategy work,
still current, moved here from `notes/` so all marketing lives in one place:

| Doc                                                                      | What's in it                                                                                                          |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| [gtm-plan.md](gtm-plan.md)                                               | The foundation: site architecture, GEO/AEO strategy, the prompt universe to monitor, viral GTM ideas, the 90-day plan |
| [gtm-open-benchmarks.md](gtm-open-benchmarks.md)                         | The benchmark program (apps + websites), and why independence is the whole point                                      |
| [ramayan-strategy.md](ramayan-strategy.md)                               | Ramayan expansion: economics and the six-month launch sequence                                                        |
| [archive/email-provider-research.md](archive/email-provider-research.md) | **Superseded** by [04](04-retention-email-push.md). Kept for the Resend vs Loops vs SES reasoning                     |

The cross-property original lives at `radhakrishna.net/docs/08-marketing-automation.md`.

Still in `notes/`: `app-comparison-research.md`, which is page-source research for
`/best-bhagavad-gita-apps` rather than marketing, and whose companion fact sheet is in open
PR #307. Move both once that merges, if wanted.

## Your six workstreams, mapped

1. **Social media, ≥1 post/day, engaging not generic** → [03](03-content-engine.md) daily grid, [05](05-automation-stack.md) tooling
2. **Email + push for web, iOS, Android** → [04](04-retention-email-push.md)
3. **News/trends related to Gita wisdom** → [03](03-content-engine.md) newsjacking pipeline
4. **Pinterest** → [02](02-creator-landscape.md). Still effective, but a slow-compounding traffic play, best pointed at radhakrishna.com
5. **BGFA deep research** → [01](01-competitor-bgfa.md)
6. **Find creator accounts to learn from and pay** → [02](02-creator-landscape.md)

## The five things worth knowing if you read nothing else

1. **BGFA's reach is bought, not earned.** ~500 concurrent Meta ads across two advertiser pages,
   plus 55 Google ads. Their lifetime Instagram engagement rate is **0.21%** against 676K
   followers. Do not benchmark against their follower count.
2. **Their daily posts are not what grows them.** Daily reels do ~40–50K views. A celebrity collab
   did 9.7M. Daily cadence keeps an account alive; spectacle and collabs grow it. Budget for both.
3. **The AI-baby trend cannot be done literally.** It structurally requires a synthetic face and
   voice on its subject, and AI deity depictions have triggered removals and organised backlash.
   The re-vessel version — Gita GPT answering a modern anxiety, verse cited on screen — keeps the
   upside and the reverence. Full reasoning in [03](03-content-engine.md).
4. **Celebrity endorsements cost ₹5–15 Cr for A-listers**, and Cameo does not carry Indian
   A-listers at all. The non-profit route is a gift-of-service ask to people who already post
   about the Gita, plus mythology micro-creators.
5. **The whole stack runs at roughly $300–360/month**, or ~$110 on free tiers. Remotion is **free
   for non-profits**, which removes the main cost of guaranteed daily video.

## Decisions still needed from the founder

These block automation, not research:

- **The deity-depiction policy.** Classical art only? AI-generated reverent scenes without faces?
  Everything here assumes **no AI-generated deity faces or voices**. This is the single most
  important call and it needs the Foundation's sign-off.
- **Who holds the go/no-go** on trend and newsjack posts, and their turnaround SLA.
- **The real email list size** — decides the entire email architecture in [04](04-retention-email-push.md).
- **Whether there is any budget for paid creator shoutouts** ($300–500 for a first test), and an
  acceptable cost-per-install.
- **Where the line sits on deaths of revered public figures** — reverent CTA-free condolence, or
  silence entirely?
- **Whether paid promotion of scripture conflicts with the no-sponsorship stance** at all.
