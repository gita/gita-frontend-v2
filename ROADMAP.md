# Roadmap

Working list for bhagavadgita.com. Each item gets its own branch and PR. Order below is
roughly the order we'll pick things up, but it isn't fixed — pull whatever is most useful next.

Status key: `todo` · `in progress` · `blocked` · `done`

---

## Content quality: the standing rule

**We do not publish at scale for its own sake.** Every page ships because it is worth reading,
or it does not ship.

This is not squeamishness, it is what the competitive research showed. srimadgita.com has 5,620
URLs and **53 of them get any traffic at all** — a 0.9% hit rate. Their `/aeo/` and
`/aeo-batch2/` folders hold roughly 531 machine-generated pages with **zero ranking keywords and
zero traffic**, and the slugs are truncated mid-word
(`...arjunas-despair-in-one-`, `...classical-vs-mode`), which tells you nobody read them before
publishing. Their 3,505 mechanically translated verse URLs across five languages produce
approximately nothing. Meanwhile **one** carefully targeted page,
`/hi/questions/sabse-important-shlok`, carries 57% of their entire traffic.

Volume did not create their win. One good page did. And the volume carries real risk: Google's
scaled-content-abuse policy targets exactly this pattern, mass publication in a short window is
a recognised spam signal, and their backlink profile is a bought PBN (`buybacklinks.agency`,
`pbnseolinks.shop` and around twenty more) which is why their Domain Rating sits at 0.2 despite
the traffic. Their July spike may well not survive the next core update.

**Borrow their strategy, never their execution.** Worth taking: the flat `/questions/` folder
rather than a blog, "top N / best / famous" curation framing, named-competitor comparison pages
built for AI retrieval, concept `X vs Y` pages, and an explicit AI-crawler allow-list. Not worth
taking: batch generation, bought links, mechanical translation, and publishing thousands of
pages nobody proofread.

**Before any content work starts, research the current guidance.** Google shipped several core
updates through 2025 and 2026 with tightened positions on thin content, scaled content abuse and
AI-generated material. Read the current state rather than working from memory, and follow the
practitioners who track it closely: Lily Ray, Kevin Indig, Michael King, Aleyda Solis. This
research is a prerequisite for items 11 through 15, not an optional extra.

**Every page we publish must clear this bar:**

- A named author or reviewer, and a real editorial pass by a person
- Verified primary-source citations, chapter and verse, for every scriptural claim
- Something that could not be produced by a model with no access to our data: our translations,
  our commentary set, our audio, our reading data, a genuine editorial judgment
- A clean, permanent, keyword-appropriate URL decided before writing
- Complete metadata, structured data and internal links to the verses it discusses
- No medical claims, no unverifiable superlatives, no invented Sanskrit etymology

If a page cannot clear that bar, it should not exist. Fifty pages that each deserve to rank
will beat five thousand that do not, and they will still be there after the next core update.

---

## 1. Finish the .io → .com domain migration

**Status:** done — nothing to change

Verified on 2026-07-20. Every remaining `bhagavadgita.io` reference is the `contact@` mailto,
which stays. There are no web URLs on the old domain left, `vercel.json` and `robots.txt` are
clean, and both the apex and www of the old domain 301 to `.com`. Commit `77a0677` had already
completed the migration; the count below was miscounted as URLs when it was the email address
in four files:

- `src/app/privacy-policy/[[...locale]]/page.tsx`
- `src/app/terms-of-service/[[...locale]]/page.tsx`
- `src/app/copyright/[[...locale]]/page.tsx`
- `src/components/Footers/Footer.tsx`

The contact address stays `contact@bhagavadgita.io`. That mailbox is still live on the old
domain, so leave every `mailto:` alone if this is ever revisited.

---

## 2. Rebuild the app landing page at /bhagavad-gita-app

**Status:** done — branch `feat/bhagavad-gita-app-page`
**Superseded branch:** `feat/app-landing-page` (Codex attempt, kept for copy reference only)

**URL decision:** the new page lives at `/bhagavad-gita-app`. `/app` 301s to it. The longer
slug matches the head term we're going after, and the redirect keeps every existing link and
whatever authority `/app` has accumulated.

**This is the product landing page, not the comparison page.** The GTM notes are clear that
these are two different intents and both should exist. This page explains our app and converts.
A separate `/best-bhagavad-gita-apps/` page (item 12) compares multiple real apps, including
competitors, and cannot honestly declare us the winner in every category. Don't merge them.
Target keywords here: "Bhagavad Gita app", "Bhagavad Gita app download", "Gita AI app",
"Bhagavad Gita app for Android", "Bhagavad Gita app for iPhone".

**What was wrong.** `/app` was a static dump in `public/app/` — 5.4MB of jQuery, a 253KB
stylesheet and a 72KB carousel script, with the middleware skipping `/app` entirely so Next.js
never touched it. It had **no `<h1>`**, 354 words, its main heading was an `<h2>` reading
"Bhagavad Gita - Simplied." (typo shipped to production and visible in Google's snippet), and
its two richest blocks were JS-dependent carousels, so without JavaScript the page was roughly
150 words. It also had no App Store link at all while ranking #5–6 for iPhone queries.

**Where we were.** SERP research across 20 Google result pages put bhagavadgita.com/app in a
consistent 4–8 band, never top 3, on every commercial query, and absent entirely from "gita
app" and "bhagavad gita app in hindi". srimadgita.com outranked us on 100% of overlapping
queries with a cluster of five URLs, and owns the answer box and the knowledge-panel
description link. Notably, `thegita.app` beats us with 406 words, no schema, no meta
description and no FAQ, which says the problem was ours rather than the competition's strength.

**What shipped.** A static-rendered Next.js route at
`src/app/bhagavad-gita-app/[[...locale]]/page.tsx` with an `<h1>`, an extractable opening
answer paragraph, a features grid, a Gita GPT section, eight current Play Store screenshots,
an at-a-glance facts table, nine FAQs as native `<details>` so answers are in the HTML with no
JavaScript, and `MobileApplication` + `AggregateRating` + `FAQPage` + `BreadcrumbList` JSON-LD.
`/app` 301s to it, `public/app/` is deleted, internal links and the sitemap are updated.

**Facts checked before writing.** The Codex attempt claimed "7 translations and 16
commentaries" four times. That came from `commentaries.json` and `translation.json` in the app
repo, which are **referenced nowhere in `lib/`**. The app ships one translation and one
commentary per verse, Swami Mukundananda's, in seven languages. See items 7 and 8.

**Still open on this page:**

- Hindi body copy falls back to English. Metadata and the FAQ are properly translated; the rest
  needs a pass through `hi.json`.
- `STORE_STATS` in `constants.ts` hardcodes the rating, review count and download count. It
  feeds both the visible copy and the schema, so it only needs updating in one place, but it
  does need updating periodically.

---

## 3. Audit indexability across the whole site

**Status:** done — see the fix PR

Audited live on 2026-07-20. Two things were already right and worth recording: **robots.txt
blocks no AI crawler** (`User-Agent: *` with an empty `Disallow:` allows GPTBot, OAI-SearchBot,
ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended and Bingbot, all confirmed
returning 200 under their real user agents), and **content is genuinely server-rendered** —
`/chapter/2` ships 2,526 words with no JavaScript, `/chapter/2/hi` 2,918.

What was broken, and is now fixed:

1. **Every unknown URL returned 200 with the full homepage.** No `not-found.tsx` existed and the
   root `[[...locale]]` catch-all swallowed everything, so any mistyped link anywhere on the web
   minted an indexable homepage clone.
2. **All seven Hindi marketing pages canonicalised to URLs that do not exist.** Routing serves
   `/about/hi`; the canonicals pointed at `/hi/about`, which fell into the catch-all above. Every
   Hindi marketing page was being consolidated into the homepage.
3. **~672 Hindi verse pages shipped an uninterpolated template as their `<h1>`** — literally
   `Chapter <%= chapter %>, Verse <%= verse %>`. One line in the translate helper returned the
   raw key instead of the interpolated string whenever a translation was missing.
4. `/gitagpt/hi` was in the sitemap but served the English homepage.
5. `/chapter/99` and invalid verses were titleless soft-404s.
6. Quotes, characters and verse-of-the-day pointed their Hindi canonical at the English URL.
7. Chapter and verse pages carried breadcrumbs only, no `CreativeWork` or `isPartOf: Book`.
8. No `llms.txt`; the path served 172KB of homepage HTML.

Still open, deliberately deferred:

- **`/verse-parallel` is 94 words with no JavaScript.** Its entire pitch is comparing
  translations and the translations are client-loaded, so a crawler sees almost nothing.
  Server-rendering the default verse's translation set is its own piece of work.
- `/gitagpt` (102 words) and `/donate` (173 words) are thin, both client-heavy by nature.
- Nothing is CDN-cacheable: every response is `private, no-cache, no-store` with
  `x-vercel-cache: MISS`. Verse and chapter pages are static content and should be ISR'd. This
  caps crawl rate.
- Hindi pages are roughly 8× the byte size of English (`/chapter/2/hi` 405KB vs 187KB). Worth
  investigating separately.

---

## 4. Fix GitaGPT rate limiting

**Status:** done — PR #300

Not a counter that failed to reset. Anonymous traffic was keyed on the caller's IP at 2
messages a day, and Indian mobile carriers put very large numbers of subscribers behind a
small pool of public addresses, so two strangers on the same carrier IP exhausted the bucket
for everyone on it. Two further defects in the same lines: `?? "unknown"` pooled every request
without an `x-forwarded-for` header into one global bucket, and the first entry of that header
is client-controlled, so the limit was both over-blocking real users and trivially bypassable.

Anonymous traffic is now keyed on a per-device cookie via `src/lib/rate-limit-identity.ts`,
shared by `/api/chat` and `/api/chat/status` so the banner and the endpoint cannot disagree.
The anonymous allowance went from 2 to 5; signed-in stays at 10. Limits are centralised in
`src/lib/rate-limit-config.ts`.

---

## 5. Verse of the Day emails

**Status:** capture done (PR #301). Sending deferred until the list is worth sending to.

### 5a. Capture — done

The subscription form had never saved anything. Three independent faults, any one of which
alone would have lost every submission:

1. `subscribeUser` read `NEXT_PUBLIC_SUPABASE_ANON_KEY`, which has never existed in this
   project. It returned before reaching the database.
2. The `newsletter_subscriptions` table did not exist and no migration ever created it.
3. After fixing both, `.insert().select()` still failed with `42501`. PostgREST needs SELECT
   permission to return an inserted row, and anonymous callers deliberately have none on this
   table.

And it failed silently: the helper caught its own error and returned `null` rather than
throwing, so the form's `catch` never ran and everyone saw a success modal regardless.

Verified live on production: valid address writes a row, duplicate returns 23505 and reads as
success, invalid and empty input are blocked client-side with zero writes.

### 5b. Sending — not started

**Provider decision: Resend, on the Broadcasts path.** Full comparison against Loops and AWS
SES in `notes/email-provider-research.md`. Short version: Loops is disqualified because its
transactional surface forbids marketing content and its campaign surface is not cleanly
API-drivable; SES saves only about $1,500 a year even at 36,000 subscribers, against three to
five days of build and permanent ownership of deliverability.

Note React Email is **not** a reason to pick Resend. It renders to plain HTML and works with
SES too. What Resend buys is the compliance layer: RFC 8058 one-click unsubscribe, suppression,
bounce and complaint webhooks, and a dashboard showing whether the send went out.

To build:

- A **welcome email on subscribe**, confirming they are on the list and setting expectations
  for what arrives and when. This should go out the moment someone submits the form or ticks
  the opt-in at signup, not with the first daily send.
- The daily send itself: Vercel cron, Resend Broadcast, branded template
- One-click unsubscribe honoured within 48 hours, writing to `unsubscribed_at`
- Seven-language templates with per-script font stacks, tested in real Gmail, Apple Mail and
  Outlook before launch
- Everything behind a single `sendDailyVerse()` module so SES stays a swap rather than a rewrite

Blocked on item 6b: there is not yet a list large enough to justify the work.

---

## 6. Signup attribution and funnel instrumentation

**Status:** 6a shipped in PR #301 and needs live verification. 6b not started.

### 6a. Attribution — shipped, unverified

`signup_attribution` records the source, the path, and whether the Gita GPT limit banner was on
screen at signup. All six `AuthModal` call sites pass a source; the chat surfaces distinguish
`gitagpt_rate_limit` from plain `gitagpt`. There is no update policy on the table on purpose,
since attribution should not be rewritable after the fact.

Still to check on production: sign up fresh from the limit banner and confirm the row records
`signup_source = 'gitagpt_rate_limit'` with `hit_rate_limit_before_signup = true`. This is the
number that will eventually say whether raising the anonymous allowance from 2 to 5 was right.

### 6b. In-app opt-in for existing users — not started

We hold roughly 36,000 authenticated users. **They must not be bulk-imported into the mailing
list.** They authenticated with Google or Apple to use Gita GPT and were never asked about
email, so under the DPDP Act there is no consent for this purpose. More practically, sending to
36,000 cold addresses from a domain with no sending history would produce high bounces and a
complaint rate well past Gmail's 0.3% threshold, throttling the domain and stopping delivery
for the people who genuinely did opt in.

Instead, ask them inside the product: a dismissible one-time prompt for signed-in users, on top
of the signup checkbox already shipped. Zero deliverability risk, and everyone who says yes is
genuinely engaged.

Realistic conversion is 10 to 30 per cent over time, so 4,000 to 11,000 subscribers rather than
36,000. **This is the unblocker for item 5b** — it is what turns existing users into a list
worth building a send for.

---

## 7. Smart mobile app install prompt

**Status:** todo
**Branch:** `feat/mobile-app-install-prompt`

Right now the only app link on mobile is in the footer, where nobody finds it. Most of our
users are on Android, some on iOS.

Detect the platform and nudge toward the right store. What works elsewhere (Bible apps do this
well): don't interrupt on first paint. Wait until someone has shown intent — scrolled through a
chapter, read a few verses, come back a second time — then show a dismissible bar or sheet, and
remember the dismissal.

Requirements:

- platform detection for Android vs iOS, deep link if the app is installed
- trigger on engagement, not on arrival
- dismissible, and stays dismissed
- no layout shift, no CLS penalty, no impact on crawlers
- replace the current modal, which is dated

---

---

## 8. Bring back the translation and commentary picker

**Status:** todo
**Branch:** `feat/author-picker-and-pages`

The website already holds **21 authors** of translations and commentaries. `data/index.json`
lists them and the full text sits in `data/authors/*.json`: Shankaracharya, Ramanujacharya,
Madhvacharya, Chinmayananda, Sivananda, Ramsukhdas, Abhinavgupta, Vallabhacharya,
Madhusudan Saraswati, Tejomayananda, Gambirananda, Adidevananda and others.

**None of it is reachable.** The default is hardcoded to author 16, Swami Sivananda, for both
translation and commentary (`src/shared/constants.ts:4-5`). The picker component
`src/components/AuthorSettings.tsx` still exists and is imported by
`src/components/Headers/PageHeader.tsx`, but `PageHeader` is imported nowhere. It was switched
off during the redesign and never switched back on. The cookies (`bgTranslationAuthorId`,
`bgCommentaryAuthorId`) and the query layer (`src/lib/data/queries.ts`) still work.

Two parts to this:

1. **Restore the picker** so readers can choose their source again.
2. **Give each author their own indexable pages**, which is the bigger prize. Every
   translation and every commentary should be its own URL that can rank on its own. People
   search for "Shankaracharya Gita commentary" and "Sivananda Bhagavad Gita translation" as
   named queries, and right now we serve none of them despite holding the text.

Needs a proper SEO and AEO plan before building: URL structure, how author pages relate to
verse pages, canonicalisation so we don't cannibalise the main verse routes, and author bio
pages carrying real E-E-A-T signals.

---

## 9. Add Swami Mukundananda's translation and commentary to the website

**Status:** todo
**Branch:** `feat/mukundananda-content`

The Android app carries Swami Mukundananda's translation and commentary, added with his
permission. The website never got them, and he is **not** among the 21 authors currently in
`data/`. So the app and the site disagree about what you can read.

Two constraints:

- Permission is already granted, but the website version needs to be **rephrased so it does
  not duplicate holybhagavadgita.org**, Swamiji's own site. Publishing the identical text
  would put two properties in competition for the same passages, and we would lose.
- Whatever we add has to slot into the multi-author model from item 7, not become a second
  hardcoded default.

---

## 10. Ship the updated iOS app

**Status:** in progress — outside this repo
**Repo:** `bhagavad-gita-app-2.0`

The current App Store build is behind the Android release. Publishing has been the blocker.
Tracked here because the app landing page links to both stores and describes one product, so
the two builds need to stay level.

---

# GTM track

Source: `notes/gtm-plan.md` and `notes/gtm-open-benchmarks.md`

Headline target from the plan: **20,000 → 100,000 monthly organic visits**, plus app installs,
repeat reading, branded search, and citations in AI answers.

The thesis is that we already own the category-defining domain and rank for the head term, so
growth comes from expanding into three search surfaces we barely touch today: problem searches
("what does the Gita say about anxiety"), recommendation searches ("best Gita app"), and AI
prompts. The shape of it: one strong head term, hundreds of medium-intent pages, thousands of
verse-level entry points.

Traffic split the plan is aiming for:

| Cluster                   | Monthly target |
| ------------------------- | -------------- |
| Head terms and homepage   | 25K–35K        |
| Chapter and verse pages   | 15K–25K        |
| Life-guidance pages       | 20K–30K        |
| App and comparison pages  | 5K–10K         |
| Concepts and translations | 10K–15K        |
| Long-tail questions       | 10K–20K        |

---

## 11. Life-guidance pages

**Status:** todo
**Branch:** `feat/guidance-pages`

Called out in the notes as the largest untapped traffic surface, and the single biggest slice
of the editorial budget at 30%. Roughly 20 pages under `/guidance/`: anxiety, anger, fear,
grief, depression, overthinking, failure, career-confusion, workplace-stress, exam-stress,
relationship-problems, family-pressure, loneliness, decision-making, life-purpose, discipline,
leadership, jealousy, procrastination, death-and-loss.

Framing matters and the notes are firm on it. Not "the Bhagavad Gita cures anxiety" — that's
medically irresponsible. Instead "what the Bhagavad Gita teaches about responding to anxiety
and uncertainty."

Each page follows the same eight-part structure: the human problem, Krishna's relevant
teaching, three to seven exact verses, commentary from a named source, a practical reflection,
what the Gita doesn't claim, a prompt to explore it through Gita AI, related reading.

---

## 12. One comparison page, not a cluster

**Status:** todo — next up
**Branch:** `feat/best-bhagavad-gita-apps`

### What the citation data says

Writesonic citation analysis, 2026-07-20, window 2025-12-01 to 2026-07-21. Citations are
counted as distinct AI answers containing the URL, across ChatGPT, Google AI Overviews, Google
AI Mode, Perplexity, Gemini, Grok and Copilot.

| Domain | Citing answers |
| ------ | -------------- |
| srimadgita.com | **365** |
| google.com | 309 |
| **bhagavadgita.com** | **192** |
| youtube.com | 136 |
| apple.com | 116 |
| holy-bhagavad-gita.org | 86 |

They out-cite us **1.9 to 1** from a DR 0.2 domain with 281 backlinks against our 24,026. And
the pages doing it are precisely the ones with zero Google traffic:

| Their page | Citing answers | Google traffic |
| ---------- | -------------- | -------------- |
| `/app` | 142 | 7/mo |
| `/bhagavad-gita-app-comparison` | 111 | 3/mo |
| `/compare/gita-apps-comparison` | 83 | 0 |
| `/best-bhagavad-gita-app` | 72 | 0 |

Those four total 408 answers, more than **twice our entire domain**. This is an AI-retrieval
play, not a search play, and it works.

### Correction to an earlier read

An earlier note here called their `/aeo/` folders "a total failure". That was true of Google
traffic and **wrong** about citations. `/aeo/` plus `/aeo-questions/` produce **106 citing
answers, 29% of their total**. But `/aeo-batch2/`, the 531-page machine-generated batch,
produces **1**. So roughly 25 hand-targeted pages work and 531 generated ones do not, which
sharpens rather than softens the content-quality rule at the top of this file.

Their `/compare/vs-*` named-competitor pages get almost nothing: 1 citation across all of them.

### Do not copy their structure — it cannibalises

Three of their four app pages are one intent split three ways:

```
/bhagavad-gita-app-comparison   "Best Bhagavad Gita Apps 2025: Complete Comparison"
/compare/gita-apps-comparison   "Best Bhagavad Gita Apps 2025: Comprehensive"
/best-bhagavad-gita-app         "Best Bhagavad Gita App 2025"
```

Near-identical titles on separate URLs. It may be surviving because AI assistants have no
duplicate-consolidation step, but in Google terms these compete with each other, waste crawl
budget, and sit squarely in scaled-content-abuse territory. All three still say "2025" in
mid-2026, so nobody is maintaining them either.

**We ship two URLs with two genuinely different jobs:**

| URL | Intent | Status |
| --- | ------ | ------ |
| `/bhagavad-gita-app` | Our app. Explains and converts. | done, item 2 |
| `/best-bhagavad-gita-apps` | Which app should I use? Compares all of them, us included. | this item |

Sub-intents (best free, best in Hindi, best for beginners, best with audio, best offline, best
with commentary) become **anchored sections on the one page**, not separate URLs.

**On splitting off a Hindi page later.** This is the obvious candidate and it is deliberately
deferred rather than refused. Hindi is already our strongest cluster: 9 tracked Hindi prompts
averaging **58.7%** against a 32.6% site average, with "Which Bhagavad Gita app has Hindi
translation and meaning?" and "Recommend a Bhagavad Gita app for Hindi-speaking users" both at
85.7%. A Hindi page would be consolidating a strength rather than fixing a weakness, which makes
it far less urgent than it looks.

Split only when the data says the sub-intent has outgrown its section: it holds a distinct
keyword and prompt cluster of its own, the section is long enough to stand alone, and it would
not simply restate the parent. Until then a `#hindi` anchor does the job without putting two of
our own URLs in competition, which is precisely the mistake documented above.

### What goes on it

The benchmark from the old item 16 lives here rather than as a separate property. A comparison
table on our own page, openly authored by us, is more honest than a nominally independent
benchmark we would be funding and appearing in.

- A comparison matrix across the real competitor set: our app, Bhagavad Gita For All, ISKCON's
  Bhagavad-gita As It Is, Gita Press, Vedabase, Gita Supersite, JKYog, Holy Bhagavad Gita
- Per-row evidence: tested date, reviewer, device, app version, store rating and review count,
  price, ads, offline support, languages, commentary tradition, audio, AI features, account
  requirement
- **Named winners by category, and we do not win them all.** Our honest claim is being the only
  genuinely free, ad-free, non-profit option. Others beat us on video, on ISKCON commentary, on
  Sanskrit depth. Saying so is what makes the rest of the page credible.
- Every claim verified against the live store listing or the app itself, with the check date
  recorded

### The bar this page has to clear

The content-quality rule at the top of this file applies in full. No year in the title unless
we commit to maintaining it. No unverifiable superlatives. No fabricated ratings or user
counts, which their pages are full of and which is the specific thing we can beat them on.

---

## 13. One comparison page for websites

**Status:** todo — after item 12
**Branch:** `feat/best-bhagavad-gita-websites`

Separate from item 12, and genuinely a separate intent rather than a slice of the same one.
Someone asking which *app* to install and someone asking which *site* to read on want different
answers, and the candidate sets barely overlap: Vedabase, Gita Supersite, Holy Bhagavad Gita and
Gita Press are websites first, and two of them have no app at all.

The demand is real and we already do well here. Of 108 tracked prompts, **24 are website-intent
and they average 45.8% visibility against a 32.6% site average**:

| Visibility | Prompt |
| ---------- | ------ |
| **100%** | Which Bhagavad Gita website has the best mobile experience? |
| 85.7% | Which Bhagavad Gita website has no ads or popups? |
| 71.4% | Which website explains every Bhagavad Gita verse? |
| 71.4% | What is the best free website for the Bhagavad Gita? |
| 57.1% | What is the best Bhagavad Gita website? |
| 57.1% | Compare the best websites for reading the Bhagavad Gita. |
| 42.9% | Which Bhagavad Gita website has word-by-word meanings? |
| 28.6% | Which website has the best Bhagavad Gita commentaries? |

`/best-bhagavad-gita-websites`, judged on criteria that only make sense for the web: completeness
of the text, how many translations and commentaries are reachable, word-by-word meanings, search,
mobile reading experience, ads and popups, whether anything sits behind a login, page speed, and
whether the source edition is stated.

Same rules as item 12. We do not win every row. Gita Supersite beats us on academic apparatus and
Vedabase on the Prabhupada corpus, and saying so is what makes the rest credible. Reuse the rubric
adjusted for the web, and reuse the competitor facts already verified for item 12 rather than
researching them twice.

---

## 14. Trust and methodology pages

**Status:** todo
**Branch:** `feat/editorial-standards`

Small pages, disproportionate effect on whether AI systems will cite us:
`/editorial-standards/`, `/translation-methodology/`, `/gita-ai-methodology/`, `/sources/`,
`/contributors/`, `/corrections-policy/`, and `/how-we-tested-gita-ai/`.

They need to explain which editions we use, which translations are licensed, who reviews
explanations, how Gita AI cites verses, what we do when traditions disagree, how corrections
get submitted, and how the recommendation pages were tested.

---

## 15. Chapter and verse page enrichment

**Status:** todo
**Branch:** `feat/chapter-verse-enrichment`

All 18 chapter pages, then the 50 most-searched verse pages.

Chapter pages need: overview, story context, main teachings, important verses, key Sanskrit
concepts, practical applications, audio, available translations, FAQs, prev/next.

Verse pages need: Sanskrit, transliteration, word-by-word meaning, Hindi and English
translations, commentary, audio, plain-language explanation, practical application, related
verses, and an "Ask Gita AI about this verse" prompt.

Also in this layer: concept hubs under `/topics/` — karma, dharma, karma-yoga, bhakti-yoga,
jnana-yoga, detachment, atman, moksha, meditation, three-gunas, mind-control, svadharma. These
double as internal-linking hubs.

---

## 16. AI visibility benchmark and competitor citation analysis

**Status:** todo
**Branch:** n/a — measurement, not code

A tracked set of 100 prompts split across English and Hindi, India and US, recommendation and
informational intent, run against Google AI Mode, ChatGPT, Gemini, Claude, Perplexity and
Copilot. The full prompt list is in `notes/gtm-plan.md` — 15 app-discovery, 11
website-discovery, 10 translation-and-study, 14 life-guidance, 13 scripture-facts.

Record which brands appear, which sources get cited, and why. This is the measurement loop for
items 11 through 14.

**Also, once the Writesonic MCP is reconnected:** pull the top cited pages for srimadgita.com
and the other competitors, split by platform. Which of their URLs are actually being cited in
ChatGPT versus Google AI Overviews? Ahrefs answers what ranks in Google; it says nothing about
what an assistant quotes. Their `/compare/vs-*` pages earn zero Google traffic and are clearly
built for retrieval rather than search, so citation data is the only way to know whether that
worked. Their robots.txt names and allows thirteen AI crawlers explicitly, which suggests they
think it does.

**First run completed 2026-07-20.** Full findings are recorded in item 12. Two results about us
that shape everything below:

**We are a Google-only brand.** 63% of our citations come from Google AI Mode and AI Overviews.
Outside Google we barely register.

| Platform | srimadgita | us | |
| -------- | ---------- | -- | --- |
| Google AI Mode | 70 | **74** | we win, narrowly |
| Google AI Overviews | **66** | 47 | 1.4x |
| Perplexity | **72** | 18 | **4.0x** |
| Microsoft Copilot | **60** | 11 | **5.5x** |
| Grok | **67** | 21 | **3.2x** |
| ChatGPT | **19** | 13 | 1.5x |
| Gemini | **11** | 8 | 1.4x |

**Our scripture is invisible.** The entire 700-verse corpus has **6 citations**. Our
`/acknowledgements`, `/copyright` and `/privacy-policy` pages together have 12. Our legal pages
out-cite our scripture twice over. Verse URLs are structurally under-retrieved: they answer
"what does 2.47 say" but nothing asks that. What gets cited is question-shaped and
intent-shaped URLs.

Our most-cited page is `/app` with 76, the URL redirected to `/bhagavad-gita-app` in item 2.
The 301 preserves it; deleting it would have cost our single strongest citation asset.

Re-run monthly. The 23-prompt gap list is in item 12.

**Crawler policy to settle first.** Review robots/CDN rules for Googlebot, Bingbot,
OAI-SearchBot, GPTBot, ChatGPT-User, and the Perplexity and Anthropic crawlers. OpenAI
separates its search crawler from its training crawler, so don't blanket-block anything with
"GPT" in the name. Whether we allow GPTBot specifically is a deliberate call about training
data, not a default.

---

## 17. OpenBenchmarks collaboration

**Status:** folded into item 12

The benchmark does not need to be a separate property. The comparison matrix belongs on
`/best-bhagavad-gita-apps`, where it earns citations for us rather than for someone else's
domain, and where authorship is stated plainly instead of being nominally independent while we
fund it. The original memo is preserved in `notes/gtm-open-benchmarks.md` if the third-party
route is ever revisited.


## Conflicts to resolve before starting the GTM items

These came out of the two notes disagreeing with each other. Worth settling early rather than
discovering mid-build:

1. **Who is the primary tester?** `gtm-plan.md` wants us running a rigorous comparison on our
   own domain with our own tested date and reviewers. `gtm-open-benchmarks.md` says we must not
   control the testing and must not mirror the benchmark onto our domain. Both can be true, but
   only if our page adds something the benchmark doesn't. Decide what that something is.
2. **Where does the benchmark sit in priority?** It doesn't appear in the plan's top ten at all,
   but the benchmarks memo puts it in the GEO top five. The memo is the later, additive
   document, so it probably wins, but that's a call to make explicitly.
3. **Overlapping "best app for X" page sets** exist on both domains — 14 URLs on ours, 8 on
   theirs. Canonicalization, differentiation and cross-linking are all unspecified.
4. **Two different 100-item AI sets** are floating around and shouldn't be conflated. Item 15 is
   a _visibility_ benchmark (do LLMs mention us). Item 16's is a _reliability_ benchmark (does
   Gita AI cite verses correctly). Different purposes, both worth doing.

---

## Adjacent track: the scripture portfolio (not work in this repo)

Source: `notes/chatgpt-ramayan.md`

Separate from the site work above, there's a strategy note covering new exact-match-domain
scripture properties modeled on what bhagavadgita.com has proven out. Recording it here so it
isn't lost, but none of it ships from this repo.

**The three properties, scored in the note:**

| Property       | Opportunity | Execution difficulty |
| -------------- | ----------- | -------------------- |
| Ramayana       | 9/10        | 7/10                 |
| Mahabharata    | 9.5/10      | 4/10                 |
| Ramcharitmanas | 9/10        | 8/10                 |

Recommended order: Ramayan first (smaller corpus at ~24,000 shlokas, and the Nitesh Tiwari
film creates a demand window), Mahabharat as the bigger long-term prize (~100,000 verses,
18 parvas), Ramcharitmanas as the cleanest exact-match opportunity since the head term has no
intent ambiguity.

**Structure:** each exact-match domain runs as its own branded vertical on shared
infrastructure — one scripture database, one account system, one reading engine, one editorial
workflow. Explicitly not three separate editorial systems, and not subfolders under an
unfamiliar umbrella brand.

**Where this repo is involved.** Only two things touch bhagavadgita.com:

- Add a "Sanatan Scriptures" section that links contextually to the new properties
- Use the "From the team behind BhagavadGita.com" byline on the new property for trust and
  seeded distribution

The note is firm that we should _not_ attempt authority transfer through aggressive sitewide
links. Contextual, reader-useful links only. Editorially defensible cross-link topics it
suggests: Gita references to Shri Ram, dharma across both texts, Krishna on divine
incarnations, duty compared across the two.

**Unresolved before anything starts:**

- No verified Ahrefs or Search Console volumes yet. Every difficulty estimate is directional.
- Domain availability is unconfirmed. `ReadRamayana.org` and `Ramcharitmanas.org` are already
  occupied, so there's brand-confusion risk to check before buying anything nearby.
- Ramcharitmanas text rights are unsettled. Gita Press scans being on Archive.org does not
  make the translations, commentary, or audio reusable.
- Mahabharata has a real textual alignment problem: Ganguli's English doesn't map cleanly onto
  available Sanskrit chapter structures, so we'd have to pick a numbering authority.
- The movie date is inconsistent within the note itself (Diwali 2026 vs November 2026). Needs
  one confirmed date before anything is planned around it.

Full detail, including URL structures, keyword difficulty tables, backlink tiers, paid-install
economics and the six-month launch sequence, is in `notes/chatgpt-ramayan.md`.

---

## Backlog / ideas

Site and technical:

- Consolidate the brand tokens so the app page and the rest of the site can't drift
- Review Core Web Vitals sitewide once `/app` is off jQuery
- llms.txt for AI crawlers
- Split XML sitemaps by content type: chapter, verse, topic, question, language
- Fix duplicate translation URLs and tighten hreflang across the Hindi routes

From the GTM notes, not yet scheduled:

- **Gita AI distributed across the site** rather than living on one page. Contextual prompts on
  every chapter, verse, topic and guidance page: explain this simply, compare three
  commentaries, how do I apply this at work, explain in Hindi, show related verses, build me a
  seven-day plan.
- **Question and source-answer pages.** ~20 listed in the notes. The build/don't-build rule is
  useful: only make a standalone page if it can offer citations, scholarly disagreement, a
  table, a reading path, or a genuine next step. "How many chapters" is one sentence and doesn't
  need 1,500 words wrapped around it.
- **Public Gita AI question library** at `/ask/...`, indexable, but consent and moderation need
  designing first.
- **Daily short-form video engine** across YouTube Shorts, Reels, Facebook and X. Five recurring
  formats, nine-step workflow, and a hard rule that nothing publishes without human review — a
  wrong verse attribution costs more than a viral video earns.
- **Growth experiments:** verse-to-video sharing, seven-day life challenges, a personalized
  reading path based on why someone came, "Gita Wrapped" at year-end or Gita Jayanti,
  shareable Gita AI answer cards, a creator and teacher program.
- **Linkable assets** worth building because people cite them: cross-commentary comparison,
  Sanskrit glossary, the Gita's timeline within the Mahabharata, a concept graph across all 700
  verses, a "which verse discusses this" search, and an upgraded public API with proper docs,
  versioning, provenance and citation guidelines.
- **Anti-thin-content standard** for everything above: every important page needs at least three
  genuine human contributions — editorial judgment, verified primary sources, real examples,
  comparisons, expert review. Scaled low-value pages count against us whether or not AI wrote
  them.
