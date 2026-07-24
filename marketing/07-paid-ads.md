# 07 — Paid ads on a non-profit budget

Research date: 2026-07-25. Founder note: we already run Play Store ads, but they optimise for
**installs**, and install numbers are not what we want.

**Data-quality warning up front.** India CPI search results are heavily polluted with
AI-generated SEO content. One vendor page reports a $2,313 CPI for March 2026 alongside $2.90 in
December — sample noise presented as a benchmark. **Neither Google nor Meta publishes CPI
benchmarks at all**, so every India CPI below is third-party and tiered by trustworthiness.
Anyone quoting you a confident Books-category India CPI is guessing.

---

## First, a clarification

**"Play Store ads" are not a separate product.** Google App campaigns serve across Search,
YouTube, **Google Play**, Discover, the Display Network and AdMob, and **you cannot choose
placements** — the system allocates automatically
([Google](https://support.google.com/google-ads/answer/15400292)). Play Store search results, Play
"You might also like", and the Play homepage are all inside App campaigns. So we are already
running the thing; the question is only what it optimises for.

## Do this first: the Apple Ads $100 credit

The single highest-return move available, and it costs nothing.

- **Apple Ads Basic bills on true cost-per-install** — "pay only for installs at a cost you
  choose", not per tap
  ([Apple](https://ads.apple.com/app-store/help/apple-ads-basic/0001-compare-apple-ads-solutions))
- **A one-time $100 promo credit** applies automatically for new accounts
  ([Apple](https://ads.apple.com/app-store/help/billing/0032-apple-ads-promo-credit))
- **India median CPI is $0.89** — from the best-sourced study found, AppTweak across ~3,500 apps,
  50,000 campaigns, $1B spend ([AppTweak](https://www.apptweak.com/en/aso-blog/apple-ads-benchmarks)).
  Global median $1.80, US $4.06
- No minimum daily budget is stated anywhere in Apple's docs

**~110 free iOS installs, downside structurally capped**, zero engineering work.

**One trap:** link the **top-level** App Store Connect account. "If you link a campaign group
instead of your top-level account, the credit won't be applied."

**But do not spend beyond the free $100 here.** iOS is a small share of India, our iOS app is
brand new with almost no ratings (which hurts Apple's conversion rate), and — checked across all
four placements — **Apple Ads has no video upload on any placement**. Ads are built from App Store
product-page metadata. Our cheapest competitive advantage, AI video, is worth exactly nothing on
this channel.

## The conversion-optimisation question, corrected

Your instinct is right: bid for engaged readers, not installs. **But the budget arithmetic is the
constraint, not the volume worry I flagged earlier.**

Google states the rule in its own docs, twice:

> **"Set your average daily budget at 50 times your target CPI, or 10 times your target CPA."**
> — [Google](https://support.google.com/google-ads/answer/9176652)

So switching from installs to in-app actions **changes the budget floor**, and the docs put
action-based campaigns at **10–15× target CPA**
([Google](https://support.google.com/google-ads/answer/6167156)):

| Optimising for         | Rule    | At our numbers | Monthly   |
| ---------------------- | ------- | -------------- | --------- |
| Installs, $0.20 CPI    | 50× CPI | $10/day        | **~$304** |
| Engaged reader, $1 CPA | 10× CPA | $10/day        | **~$304** |
| Engaged reader, $2 CPA | 10× CPA | $20/day        | **~$608** |
| Engaged reader, $3 CPA | 10× CPA | $30/day        | **~$912** |

**This is the thing to check before switching.** If an engaged reader costs us $1, the switch is
budget-neutral and we should do it immediately. If they cost $3, conversion bidding needs triple
the budget and may simply be unaffordable. **We cannot know which until we measure the baseline.**

Learning period is **7–14 days**, and significant bid or budget changes restart it.

### The event to pick

| Event                             | Signal quality | Volume  |
| --------------------------------- | -------------- | ------- |
| `verse_read` (first verse opened) | Good           | Highest |
| `chapter_opened`                  | Good           | High    |
| `audio_played`                    | Strong         | Medium  |
| `gita_gpt_question_asked`         | **Strongest**  | Lower   |
| `reading_plan_started`            | Strongest      | Lowest  |

**Start with `verse_read` or `chapter_opened`** — the "read at least one word" idea, and they keep
target CPA low enough that 10× stays affordable. A stronger event means a higher CPA means a
higher budget floor.

**iOS caveat:** ATT and SKAdNetwork make iOS in-app-event optimisation materially weaker. This is
an Android play, which is where our install base is anyway.

### Sequencing

1. **Instrument.** Firebase Spark is **free forever** — Analytics, Crashlytics, Remote Config,
   A/B testing, FCM, no card required ([Firebase](https://firebase.google.com/pricing)). Confirm
   it is in `gita-flutter-2.0`, then fire `verse_read`, `chapter_opened`, **plus a Day-1 open and
   Day-7 return**.
2. **Run install-optimised for 2–4 weeks with the events merely tracked.** This gives the number
   everything else depends on: what a genuinely engaged reader actually costs us. Skip this and
   there is no way to know whether conversion bidding is affordable, or to prove it worked.
3. **Then decide** using the table above.
4. **Judge every channel on cost-per-Day-7-retained-user, not CPI.** A $0.12 install that never
   opens costs more than a $0.40 install that becomes a daily reader.

## Where the $100–300/month should go

**One channel, not two.** At this budget, splitting kills both.

**Google App Campaigns, Android, India only, $8–10/day.**

- It _is_ the Play Store surface, the highest-intent install placement available
- **$300/month satisfies Google's own 50× rule at a $0.20 target CPI.** This only works because
  India CPI is roughly 0.1× US — the identical campaign in a Western market would demand
  $6,000/month
- Install-only Android campaigns **avoid the SDK/MMP integration Meta requires**, which is real
  engineering we do not need to spend
- Our AI video is a genuine asset here, since YouTube is a major App campaign surface. Google
  recommends uploading **20 images and 20 videos** across aspect ratios

**Add Meta later**, when either Play search volume caps out (likely — devotional-app search demand
is a finite pool) or the SDK is integrated. Then it becomes attractive: **Meta's learning
threshold is ~7× cheaper than Google's** — 50 conversions per _week_ versus Google's 50 per _day_.
Meta _creates_ demand; Google _captures_ it. For a devotional app with a large latent audience,
Meta is probably the bigger long-run channel, it just costs more to set up.

### India CPI, honestly

| Channel              | India CPI               | Source quality                                     |
| -------------------- | ----------------------- | -------------------------------------------------- |
| Google App Campaigns | **$0.15–$0.40** Android | Weak. No methodology-disclosed India figure exists |
| Meta                 | **$0.15–$0.85**         | Weak, and sources contradict each other            |
| Apple Ads            | **$0.89** median        | **Good** — AppTweak, 3,500 apps, disclosed method  |

Plan against $0.15–$0.40 for Android, but treat it as a planning assumption, not a fact.

## Google Ad Grants: real, free, and **not** an install channel

$10,000/month in free Search ads, hard-capped at $329/day, no rollover
([Google](https://www.google.com/grants/)). Genuinely valuable — but not for what you'd hope.

**It cannot drive app installs directly:**

1. **App campaigns cannot be created.** Only Search and Performance Max
   ([Google](https://support.google.com/nonprofits/answer/9841727))
2. **You cannot link to a store listing.** "Your nonprofit must own the domain(s) your ads point
   to" — play.google.com and apps.apple.com both fail
3. **The redirect workaround is closed** — off-domain redirects from the final URL are disapproved

**The compliant path, which Google documents itself:** its Ad Grants conversion guide names app
downloads as a trackable outcome and blesses button-click tracking
([Google](https://support.google.com/nonprofits/answer/9841491)). So:

> Search ad → a **substantive content page on bhagavadgita.com** → store buttons → track the
> outbound click as the conversion.

Two hazards: a thin "download our app" splash page gets disapproved as "solely designed to send
users elsewhere", and Google **explicitly bans** the obvious keywords — "cool apps", "download
games", "Android apps" are named as non-permitted. Mission phrasing ("Bhagavad Gita reading app")
works; generic app phrasing does not.

**Attribution dies at the store hop.** You count store-button clicks; read real installs from Play
Console separately.

**The rules are strict:** 5% monthly CTR floor (two consecutive misses deactivates the account),
$2.00 max CPC unless using smart bidding, no single-word or generic keywords, ≥2 ad groups per
campaign, ≥1 conversion/month, full HTTPS on an owned domain.

### The eligibility gate — resolve this first

**India registration requires FCRA.** Verbatim: eligible orgs must be "registered under the
Foreign Contribution Regulations Act (FCRA)"
([Google](https://support.google.com/nonprofits/answer/3215869)). **12A/80G is not mentioned and
does not appear to satisfy Google.**

**A US 501(c)(3) with an actual IRS determination letter is decisively the easier path.** Given
Ved Vyas Foundation's US presence, this is the question to answer before planning anything: **does
a US entity with a determination letter exist?** If yes, apply through it. If no, and the Indian
entity lacks live FCRA, Google for Nonprofits is closed — and with it Ad Grants, free Workspace,
and the YouTube Nonprofit Program.

Two useful clarifications: **religious organisations are eligible** (the only relevant clause is
non-discrimination in hiring and service administration), and we should present as a **charitable
publisher, not an educational institution** — "a school, academic institution, or university" is
explicitly ineligible.

## Free levers worth taking now

| Program                               | What                             | Note                                                                                                                                                     |
| ------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Apple Ads $100 credit**             | ~110 free iOS installs           | Link the top-level account                                                                                                                               |
| **Apple Developer fee waiver**        | The $99/yr membership, free      | Requires no Paid Applications Agreement. India neither listed nor excluded — worth applying                                                              |
| **Apple Featuring Nomination**        | Free editorial featuring         | Criteria include **localization quality and accessibility** — a seven-language devotional app has a genuinely strong pitch. Give 2 weeks–3 months notice |
| **Play custom store listings**        | **Up to 50 per app, free**       | Targetable by country, **search keyword, and Google Ads ad group ID** — pairs directly with App campaigns                                                |
| **Firebase Spark**                    | Analytics, Crashlytics, A/B, FCM | Free forever, no card                                                                                                                                    |
| **TechSoup India / NASSCOM BiG Tech** | Adobe, AWS, Zoho, Wix            | **Explicitly accepts religious organisations.** No FCRA gate mentioned                                                                                   |
| **Claude for Nonprofits**             | $8/user/mo, min 2 seats          | Covers "international nonprofit equivalents", no religious exclusion stated                                                                              |
| **Azure nonprofit grant**             | $2,000/year                      | Activate within 90 days, no rollover                                                                                                                     |

### Things that do not exist, despite what agencies claim

- **There is no Meta nonprofit ad grant.** Meta's nonprofit hub lists tools and training only. A
  site claiming "Meta Social Impact Ad Credits up to $10,000 annually" appears fabricated — treat
  anyone pitching it as a red flag.
- **Microsoft's ad grant ended December 2025** and is not accepting applicants.
- **Google Play's $25 developer fee has no nonprofit waiver.**
- **Slack excludes religious organisations** outright. **HubSpot's nonprofit program excludes
  India.** OpenAI's may exclude religious orgs — unverified, check before planning around it.

## Open questions

- **Does a US 501(c)(3) with an IRS determination letter exist?** Blocks Ad Grants entirely.
- Is Firebase already in `gita-flutter-2.0`?
- Current Play ads spend, current CPI, and what fraction of paid installs ever read a verse?
- Custom store listings — are we using any of the 50 free slots?

---

**Related:** [05](05-automation-stack.md) organic stack; [06](06-video-pipeline.md) the video
creative that feeds these; [01](01-competitor-bgfa.md) for what BGFA runs.
