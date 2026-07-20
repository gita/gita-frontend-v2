# Roadmap

Working list for bhagavadgita.com. Each item gets its own branch and PR. Order below is
roughly the order we'll pick things up, but it isn't fixed — pull whatever is most useful next.

Status key: `todo` · `in progress` · `blocked` · `done`

---

## 1. Finish the .io → .com domain migration

**Status:** todo
**Branch:** `fix/domain-migration-cleanup`

The domain moved from bhagavadgita.io to bhagavadgita.com, but nine references to the old
domain are still in the codebase:

- `src/app/privacy-policy/[[...locale]]/page.tsx`
- `src/app/terms-of-service/[[...locale]]/page.tsx`
- `src/app/copyright/[[...locale]]/page.tsx`
- `src/components/Footers/Footer.tsx`

**Important exception:** the contact address stays `contact@bhagavadgita.io`. That mailbox is
still live on the old domain, so leave every `mailto:` and any email string alone. Only swap
web URLs.

Also worth checking while we're in here:

- canonical tags, `metadataBase`, Open Graph and Twitter URLs
- `sitemap.ts` and `robots.txt` output
- structured data (`@id`, `url`, `sameAs`)
- anything hardcoded in `public/app/index.html`, `manifest.json`, and the Supabase config
- redirects in `vercel.json` — confirm .io still 301s to .com so we don't drop link equity

---

## 2. Rebuild the app landing page at /bhagavad-gita-app

**Status:** done — branch `feat/bhagavad-gita-app-page`
**Superseded branch:** `feat/app-landing-page` (Codex attempt, kept for copy reference only)

**URL decision:** the new page lives at `/bhagavad-gita-app`. `/app` 301s to it. The longer
slug matches the head term we're going after, and the redirect keeps every existing link and
whatever authority `/app` has accumulated.

**This is the product landing page, not the comparison page.** The GTM notes are clear that
these are two different intents and both should exist. This page explains our app and converts.
A separate `/best-bhagavad-gita-apps/` page (item 11) compares multiple real apps, including
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

**Status:** todo
**Branch:** `fix/seo-indexability-audit`

Confirm every public page is indexable by Google and readable by LLM crawlers. Specifically
verify these are in the sitemap, not noindexed, not blocked in robots.txt, and server-rendered:

- `/acknowledgements`
- `/mahabharata-characters`
- `/about`
- `/bhagavad-gita-quotes`
- `/donate`
- `/gitagpt`
- chapter and verse routes
- `/verse-of-the-day`, `/verse-parallel`, `/translations`

Check for each: canonical correctness, hreflang for the Hindi locale routes, real HTML in the
initial response (view source, not devtools), and no client-only rendering of primary content.
Then confirm coverage in Search Console and see whether GPTBot / ClaudeBot / PerplexityBot are
allowed in robots.txt.

---

## 4. Fix GitaGPT rate limiting

**Status:** todo
**Branch:** `fix/gitagpt-rate-limit`

Opening GitaGPT on mobile after months of no use immediately returns "daily limit reached",
and logging in doesn't clear it. Something in the limiter is wrong — likely the counter isn't
scoped or reset correctly, or the authenticated path still reads the anonymous IP/device key.

Reproduce on mobile, trace the limit check, and fix both the anonymous reset window and the
logged-in bypass or higher tier.

---

## 5. Verse of the Day emails

**Status:** todo
**Branch:** `feat/verse-of-the-day-emails`

We collect name and email for a shloka-of-the-day subscription. First find out:

- how many subscribers are in the Supabase table
- whether anything is actually sending. Best guess: nothing is.
- what email service, if any, is already wired up

Then build it properly. Resend or Loops are both reasonable — pick based on what fits a daily
send with a template plus an unsubscribe flow. Needs a scheduled job (Vercel cron), a decent
HTML template using our brand, one-click unsubscribe, and basic delivery logging.

If people have been subscribing for months with nothing sent, the first send should acknowledge
that rather than pretend it's routine.

---

## 6. Smart mobile app install prompt

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

## 7. Bring back the translation and commentary picker

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

## 8. Add Swami Mukundananda's translation and commentary to the website

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

## 9. Ship the updated iOS app

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

## 10. Life-guidance pages

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

## 11. Recommendation and comparison pages

**Status:** todo
**Branch:** `feat/comparison-pages`

Ranked #1 in the plan's own top-ten list. Pages under Layer 5: `/best-bhagavad-gita-apps/`,
plus beginner, Hindi, Android, iPhone, free, with-audio, with-commentary and with-AI variants,
then `/best-bhagavad-gita-websites/`, `/best-bhagavad-gita-translations/`,
`/best-bhagavad-gita-commentaries/`.

The credibility rule runs through all of them: we cannot win every category. The plan's own
draft table hands "best video experience" to Bhagavad Gita For All and "best for ISKCON
readers" to Bhagavad-gita As It Is. Several rows are still marked "based on real testing" —
those need actual testing before they're filled in.

Every comparison page carries: tested date, reviewer name, devices tested, app version, store
rating and review count, pricing, ads or subscriptions, offline capability, languages,
commentary tradition, audio, search, AI features, privacy, pros and cons, screenshots,
ownership disclosure, update history.

SrimadGita is the closest competitor here and has this whole layer built already. The notes'
verdict: don't imitate the format, build the trustworthy version of it. Also worth noting that
SrimadGita's claimed ratings and feature lists need independent verification before we treat
any of it as fact.

---

## 12. Trust and methodology pages

**Status:** todo
**Branch:** `feat/editorial-standards`

Small pages, disproportionate effect on whether AI systems will cite us:
`/editorial-standards/`, `/translation-methodology/`, `/gita-ai-methodology/`, `/sources/`,
`/contributors/`, `/corrections-policy/`, and `/how-we-tested-gita-ai/`.

They need to explain which editions we use, which translations are licensed, who reviews
explanations, how Gita AI cites verses, what we do when traditions disagree, how corrections
get submitted, and how the recommendation pages were tested.

---

## 13. Chapter and verse page enrichment

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

## 14. AI visibility benchmark

**Status:** todo
**Branch:** n/a — measurement, not code

A tracked set of 100 prompts split across English and Hindi, India and US, recommendation and
informational intent, run against Google AI Mode, ChatGPT, Gemini, Claude, Perplexity and
Copilot. The full prompt list is in `notes/gtm-plan.md` — 15 app-discovery, 11
website-discovery, 10 translation-and-study, 14 life-guidance, 13 scripture-facts.

Record which brands appear, which sources get cited, and why. This is the measurement loop for
items 10 through 13.

**Crawler policy to settle first.** Review robots/CDN rules for Googlebot, Bingbot,
OAI-SearchBot, GPTBot, ChatGPT-User, and the Perplexity and Anthropic crawlers. OpenAI
separates its search crawler from its training crawler, so don't blanket-block anything with
"GPT" in the name. Whether we allow GPTBot specifically is a deliberate call about training
data, not a default.

---

## 15. OpenBenchmarks collaboration

**Status:** blocked — commercial terms unresolved
**Branch:** n/a — mostly off-domain

A third party (openbenchmarks.com) has proposed collaborating on an independent benchmark of
Bhagavad Gita apps, websites, and AI assistants. The memo's recommendation is to engage.

Three benchmarks proposed: apps (10–15 of them across six scoring categories), websites, and a
Gita AI reliability benchmark pitting Gita AI against ChatGPT, Gemini, Claude and Perplexity on
whether they cite verses correctly. That third one is described as the most valuable output.

**The independence constraint is the whole point.** We'd sponsor the category; they own
methodology, testing, scoring and publication. We can supply domain knowledge and help define
user needs, but if we control the scoring it reads as sponsored content dressed as research and
does us no good with either competitors or LLMs. The memo accepts up front that we may not win
every category, and argues that improves credibility.

**Blocked on:** funding and independence terms, defining the competitor set, and recruiting two
to four qualified Sanskrit or Gita reviewers.

---

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
4. **Two different 100-item AI sets** are floating around and shouldn't be conflated. Item 14 is
   a _visibility_ benchmark (do LLMs mention us). Item 15's is a _reliability_ benchmark (does
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
