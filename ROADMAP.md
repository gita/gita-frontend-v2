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

**Status:** todo
**Branch:** `feat/app-landing-page`

**URL decision:** the new page lives at `/bhagavad-gita-app`. `/app` 301s to it. The longer
slug matches the head term we're going after, and the redirect keeps every existing link and
whatever authority `/app` has accumulated.

**This is the product landing page, not the comparison page.** The GTM notes are clear that
these are two different intents and both should exist. This page explains our app and converts.
A separate `/best-bhagavad-gita-apps/` page (item 8) compares multiple real apps, including
competitors, and cannot honestly declare us the winner in every category. Don't merge them.
Target keywords here: "Bhagavad Gita app", "Bhagavad Gita app download", "Gita AI app",
"Bhagavad Gita app for Android", "Bhagavad Gita app for iPhone".

Today `/app` is a static dump in `public/app/` — a 29KB `index.html` with jQuery, a 253KB
stylesheet and a 72KB carousel script. The middleware skips `/app` entirely
(`src/proxy.ts:12`), so it never touches Next.js. The page doesn't render properly and
crawlers get nothing useful out of it.

Replace it with a real Next.js route at `src/app/bhagavad-gita-app/[[...locale]]/page.tsx`.

**Research first.** Before writing a line of copy, search Google for "bhagavad gita app" and
related terms, and look at what's ranking:

- how the top pages are structured (section order, what they lead with)
- what they cover that we don't
- what People Also Ask surfaces — those become our FAQ
- keyword coverage: "bhagavad gita app", "best bhagavad gita app", "free bhagavad gita app",
  "bhagavad gita app with audio", "gita app in hindi", "srimad bhagavad gita app"

The `writesonic-marketing` repo has a `.env` with SERP API, Ahrefs and other keys we can use
for the keyword and SERP research.

**Design.** Use our existing brand kit, colors, typography (`docs/FONT_SYSTEM.md`) and button
styles. We're on shadcn/ui — pull in whatever additional components the page needs rather
than hand-rolling.

**Assets.** High-resolution screenshots from the Play Store listing
(https://play.google.com/store/apps/details?id=com.gitainitiative.bhagavadgita). The same
screens may already exist locally in `~/Documents/Bhagavad-Gita-App/Bhagavad Gita App Screens`
or in the `bhagavad-gita-app-2.0` repo — check there first, they'll be higher quality than
anything scraped.

**Content requirements:**

- Store buttons for both Google Play and the App Store, above the fold
- Feature sections built around what the app actually does
- FAQ section driven by People Also Ask, with FAQPage schema
- Real, human-sounding copy. No em dashes, no "unlock", "elevate", "seamless", "dive into",
  no rule-of-three padding. Run it through `/humanizer` or `/stop-slop` before shipping.
- Consider drafting with Codex (GPT 5.6) and editing down — it writes decent long-form.

**Technical requirements:**

- Server-rendered so both Google and LLM crawlers get full HTML with no JS execution
- SoftwareApplication + FAQPage structured data
- Proper title, description, canonical, OG and Twitter tags
- Fast: `next/image` for screenshots, no jQuery, no 253KB stylesheet
- Remove `/app` from the middleware skip list (`src/proxy.ts:12`) and delete `public/app/` once
  the new page is live
- Add the `/app` → `/bhagavad-gita-app` 301 in `vercel.json`, and update the internal links in
  `Footer.tsx:98`, `ModernNav.tsx:106` and `donate/page.tsx:129`
- Add the new URL to `sitemap.ts`

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

## 7. Life-guidance pages

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

## 8. Recommendation and comparison pages

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

## 9. Trust and methodology pages

**Status:** todo
**Branch:** `feat/editorial-standards`

Small pages, disproportionate effect on whether AI systems will cite us:
`/editorial-standards/`, `/translation-methodology/`, `/gita-ai-methodology/`, `/sources/`,
`/contributors/`, `/corrections-policy/`, and `/how-we-tested-gita-ai/`.

They need to explain which editions we use, which translations are licensed, who reviews
explanations, how Gita AI cites verses, what we do when traditions disagree, how corrections
get submitted, and how the recommendation pages were tested.

---

## 10. Chapter and verse page enrichment

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

## 11. AI visibility benchmark

**Status:** todo
**Branch:** n/a — measurement, not code

A tracked set of 100 prompts split across English and Hindi, India and US, recommendation and
informational intent, run against Google AI Mode, ChatGPT, Gemini, Claude, Perplexity and
Copilot. The full prompt list is in `notes/gtm-plan.md` — 15 app-discovery, 11
website-discovery, 10 translation-and-study, 14 life-guidance, 13 scripture-facts.

Record which brands appear, which sources get cited, and why. This is the measurement loop for
items 7 through 10.

**Crawler policy to settle first.** Review robots/CDN rules for Googlebot, Bingbot,
OAI-SearchBot, GPTBot, ChatGPT-User, and the Perplexity and Anthropic crawlers. OpenAI
separates its search crawler from its training crawler, so don't blanket-block anything with
"GPT" in the name. Whether we allow GPTBot specifically is a deliberate call about training
data, not a default.

---

## 12. OpenBenchmarks collaboration

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
4. **Two different 100-item AI sets** are floating around and shouldn't be conflated. Item 11 is
   a _visibility_ benchmark (do LLMs mention us). Item 12's is a _reliability_ benchmark (does
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
