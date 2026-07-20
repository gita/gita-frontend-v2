<!--
REVIEW DOCUMENT — NOT PUBLISHABLE.
Produced by a 24-agent research workflow on 2026-07-20 for roadmap item 12.
Everything here is store-listing evidence. No app was installed or used.
Do not lift any number onto a live page until the "Must-check" section is cleared.
-->

# Bhagavad Gita App Comparison — Fact-Check Review Document

**Status:** DRAFT FOR HUMAN VERIFICATION. Not publishable. No number below should reach a live page until the "Must-check" and "Open questions" sections are cleared.
**Data pulled:** 2026-07-20. **Author of this doc:** research agent. **Device testing performed:** none.

---

## 0. Read this first — three structural problems

1. **Nothing in this document has been verified in-app.** Every content claim (verse counts, audio, offline, AI grounding, reading features) is a *store-listing claim*. The rubric's own rule — "if a criterion cannot be verified in 30 minutes of hands-on use, it is scored as not met" — has **not** been applied, because nobody installed anything. Scores below are therefore **provisional and inflated**.
2. **The research payload was truncated.** Full verified profiles exist for only 3 of the 10 apps (BhagavadGita.com, Bhagavad Gita For All, BBT *As It Is*). The other 7 rows are reconstructed from local Play HTML captures taken today and are **thinner and less trustworthy**. Marked ⚠ throughout.
3. **Google Play served a substituted listing at least once during research** — an identical URL returned a different app's page with a 200 response, silently. Every Play figure must be re-pulled with a page-identity check (`itemprop="name"`) immediately before publication.

---

## 1. Comparison matrix

Confidence key: **A** = store-generated, re-fetched and identity-checked · **B** = single fetch from local capture today, not re-verified · **C** = developer's own description text · **U** = not verified / unknown.

| App | Platforms | Price | Ads badge | IAP badge | Play rating (n) | Play installs | iOS rating (n) | Last updated | Named commentator | Conf. |
|---|---|---|---|---|---|---|---|---|---|---|
| **Bhagavad Gita Hindi & English** (ours, Ved Vyas Foundation) `com.gitainitiative.bhagavadgita` / iOS `1602895635` | Android + iOS (iPhone only) | Free, no IAP declared | None | None | 4.8 — histogram sums to **1,603 ratings**; header rounds to 1.68K | 500K+ | **2.0 (3 ratings)** | Play **Dec 8, 2025**; iOS **v1.0.5, Oct 4, 2024** | Swami Mukundananda (Play only) | **A** |
| **Bhagavad Gita For All \| Video** `com.bgfa` / iOS `com.asestore.bgfa` | Android + iOS | Free install; Ch.1 free; 7-day trial; **subscription price published nowhere** | None | **None on either store** (yet subscription + UPI AutoPay marketed) | 4.6 (9,161 reviews; histogram 763/0/0/508/7,888 = 9,159) | 1M+ (raw counter 1,388,352) | 4.65 US (60) / 4.697 IN (1,307) | Play Jul 20, 2026; iOS v7.0 Jul 18, 2026 | **None named** | **A** |
| **Bhagavad-gita As It Is** (Bhaktivedanta Book Trust) iOS `1080562426` | **iOS/iPad/Mac/Vision only — no Play listing** (`com.bbt.bgaii` = 404) | **$4.99 one-time** (US) | n/a | None | n/a | n/a | 4.9 (556) | v1.5.9, Mar 12, 2025 | A. C. Bhaktivedanta Swami Prabhupada, © BBT 2019–2025 | **A** |
| **Bhagavad Gita — Song of God** (JKYog India) | Android (iOS not checked) | Free; "No advertisement" | None | None | 4.9 (309) | 10K+ | not verified | Jun 2, 2025 | Swami Mukundananda | **B/C** ⚠ |
| **Bhagavad Gita — Krishna Bhakti** `org.jkyog.radhakrishnabhakti` | Android (iOS not checked) | Free | None | None | 4.8 (4.54K) | 100K+ | not verified | Jul 15, 2026 | not verified | **B** ⚠ |
| **Bhagavad-Gita in Hindi** (Banaka / Mohit Agarwal) | Android | Free | **Contains ads** | **In-app purchases** | 4.7 (58.6K) | 1M+ | not verified | Jun 14, 2026 | **None** — "Assuming it is out of copyright protection" | **B/C** ⚠ |
| **Gita Press** `com.gita_press` | Android | Free | None | **In-app purchases** | 4.4 (232) | 50K+ | not verified | **not verified** | not verified | **B** ⚠ |
| **Bhagavad-gītā As It Is** (unofficial) `com.acd.acbsp.bg`, dev "Shrila Prabhupada das" | Android | Free | None | None | **CONFLICT: 4.8 (capture) vs 4.5 (earlier pass)** — 222 reviews | 10K+ | n/a | Dec 10, 2025 | Prabhupada text, but description says texts are "freely available on the Internet" and devs "do not bear any responsibility" | **B — DO NOT PUBLISH** ⚠ |
| **Transcend** (BBT's actual Android app — different product) `com.bbt.transcend` | Android + iOS | Free | None | None | **CONFLICT: 4.8 (capture) vs 4.6 (earlier pass)** — 1.31K reviews | 100K+ | 4.7 (56) | Jun 8, 2026 | n/a (library app, 600+ eBooks) | **B — DO NOT PUBLISH** ⚠ |
| **Srimad Gita** `com.gitachat.app.gita_chat` / iOS `6751432151` (Decentralized Inc) | Android + iOS | Free | None | None | 4.3 (44) | 1K+ | **4.0 (4 ratings)** | Oct 17, 2025 | not verified | **B/A** ⚠ |

### Feature matrix — all cells are listing claims unless marked

| App | Languages | Audio | Offline | AI | Account required |
|---|---|---|---|---|---|
| **Ours** | **Play: 7** (Hi, En, Te, Gu, Ta, Or, Es) — **iOS store metadata says English only** | Sanskrit + 7-language translation audio (C). Reciter unnamed. Background playback: **not verified** | "Complete offline access" (C); audio-offline: **not verified** | Gita GPT chatbot (C, Play only; absent from iOS listing). Model, grounding, quota: **not verified** | **not verified** |
| **BGFA** | Claims Hi+En; **App Store metadata = EN only** | "Audio notes"; site claims Sanskrit/Hindi/English narration (C) | **Never mentioned on any surface** — treat as unknown | "My Krishna AI Chat", claims verse-rooted answers (C) | **not verified**; Play data safety collects name/email/phone/financial |
| **BBT As It Is** | Description: **5** full-text (En, De, Fr, Hu, Ru); metadata lists **8** locales — unresolved | **No recitation described.** Only a "Sanskrit pronunciation guide" | **Never stated.** 290.8 MB bundle implies it; that's inference | **None** | **not verified** |
| **Song of God** | not verified (one user review says En/Hi/Te/Or — a review, not evidence) | "Audio available for each shloka" (C) | **"No internet required after downloading"** (C) — the most explicit offline claim in the set | None | **not verified** |
| **Banaka Hindi** | Hindi only | None mentioned | "Fully functional without internet" (C) | None | **not verified** |

---

## 2. Provisional scores (rubric v1.0)

**These are not publishable scores.** They accept listing claims at face value where the listing is explicit, and score untested dimensions at 0. D6 (reading experience) and D10 (accessibility) cannot be honestly scored without device testing; D10 is 0 for every app because nobody ran a screen reader.

Per-dimension confidence: **V** = store-verified · **C** = listing claim · **U** = untested (scored 0 or capped).

| Dim (weight) | Ours | BGFA | BBT As It Is | Song of God | Banaka Hindi |
|---|---|---|---|---|---|
| D1 Completeness (12) | 8 C | 4 C | 8 C | 8 C | 4 C |
| D2 Depth + attribution (15) | **4 V** (gate fail) | **0 V** | **4 V** (T=1,C=1, gate passes) | 4 C | **0 V** |
| D3 Languages (10) | 8 C | 4 C | 8 C | 4 U | 0 V |
| D4 Audio (10) | 6 C | 2 C | **0 V** | 4 C | **0 V** |
| D5 Offline (8) | 6 C | 0 U | 0 U | 8 C | 6 C |
| D6 Reading experience (10) | 6 C | 2 U | 7 C | 3 C | 2 C |
| D7 AI (7) | 4 C | 4 C | 0 V | 0 V | 0 V |
| D8 Cost & ads (13) | 8 V | 2 C | **0 V** (paid up front) | 8 V | 4 C |
| D9 Trust (10) | 4 V | 4 V | 6 V | 6 C | **0 V** |
| D10 Accessibility (5) | 0 U | 0 U | 0 U | 0 U | 0 U |
| **Total /100** | **57.6** | **22.2** | **36.6** | **49.4** | **16.8** |

### Working (auditable)

- **Ours** = (8×12 + 4×15 + 8×10 + 6×10 + 6×8 + 6×10 + 4×7 + 8×13 + 4×10 + 0×5) ÷ 10 = (96+60+80+60+48+60+28+104+40+0) ÷ 10 = **576/10 = 57.6**
- **BGFA** = (48+0+40+20+0+20+28+26+40+0) ÷ 10 = **222/10 = 22.2**
- **BBT** = (96+60+80+0+0+70+0+0+60+0) ÷ 10 = **366/10 = 36.6**
- **Song of God** = (96+60+40+40+64+30+0+104+60+0) ÷ 10 = **494/10 = 49.4**
- **Banaka** = (48+0+0+0+48+20+0+52+0+0) ÷ 10 = **168/10 = 16.8**

### Why each contested band was awarded

- **Ours D2 = 4:** the attribution gate caps the dimension at 4. Only one commentator is named (Mukundananda, Play only), no source edition, no publisher, no license statement anywhere. The iOS subtitle "20+ Authors and Translations" names nobody, so it counts for nothing. **This is our own worst score and it is entirely self-inflicted — it is fixable by editing our listing and adding an attribution page.**
- **Ours D8 = 8, not 10:** band 10 requires a publicly stated funding source. Ved Vyas Foundation's identity is disclosed; how the app is funded is not.
- **Ours D9 = 4:** missing (b) about page naming people, (c) source editions, (d) license statements, (g) funding disclosure, (h) report-an-error channel. Five checks missing → band 4.
- **BGFA D2 = 0:** the rubric's band 0 is "translation present but anonymous". No translator, commentator or author is named on Play, on the App Store, or on the homepage. Celebrity endorsements are not attribution.
- **BGFA D8 = 2:** free chapter 1 of 18 plus a 7-day trial is "substantial scripture paywalled". The subscription price is published nowhere.
- **BBT D8 = 0:** $4.99 paid up front, paywall before any verse. Band 0 by definition. This is the rubric working as designed — it penalises the most scholarly app hardest on cost, which is the anti-rigging behaviour the rubric intends.
- **BBT D5 = 0 (U):** almost certainly wrong in reality. The listing never says "offline"; a 290.8 MB bundle strongly implies offline text. **This single untested dimension is worth up to +8.0 points.**
- **Banaka D9 = 0:** the description states "Assuming it is out of copyright protection" — an explicit non-claim of rights. Data safety declares data shared with third parties, not encrypted, not deletable.

### Score-integrity check against the rubric's conflict matrix
The rubric predicts a realistic ceiling of 82–88 and warns that anything above 90 means misapplication. Top score here is 57.6 — well inside bounds, and the spread is driven by *disclosure failures*, not product quality. **Do not publish these as "we scored X" — publish the rubric and the per-dimension evidence, or publish nothing.**

---

## 3. Per-category winners — including the ones we lose

| Category | Winner | We win / lose | Basis |
|---|---|---|---|
| **Best free, ad-free** | **Ours** (Android) | **WIN** | Only app combining: no ads badge, no IAP badge, "No data collected / No data shared" data safety, 500K+ installs, 4.8 from ~1,600 ratings. Closest rival JKYog Song of God matches on cleanliness at 1/50th the scale. |
| **Best for Hindi** | **Ours** — *weakest of our awards* | **WIN (contested)** | We ship Hindi + 6 more with audio and no ads. But **Banaka's Hindi-only app has 58.6K reviews and 1M+ installs — 36× our review volume in Hindi** — and we have zero in-app verification of our Hindi build. If a device test shows thin Hindi, this award must be withdrawn. |
| **Best for beginners** | **Bhagavad Gita For All** | **WE LOSE** | Topic-first navigation (anxiety, grief, failure, "Why Good People Suffer") plus a video per verse is a genuinely better on-ramp than chapter 1 verse 1. This is their real differentiator and we should say so. |
| **Best audio** | **Not awarded** | **NO WINNER** | No app in the set names a reciter. Ours claims 7-language audio; JKYog claims per-shloka audio; neither states background playback. Award this only after a device test. |
| **Best offline** | **JKYog "Bhagavad Gita — Song of God"** | **WE LOSE** | Only unambiguous claim in the set: "Read Anytime, Anywhere. No internet required after downloading the App," corroborated by a dated user review. Our "Complete offline access" doesn't distinguish text from audio. |
| **Best commentary depth** | **Bhagavad-gita As It Is (BBT)** | **WE LOSE** | The only fully attributed, rights-holder-published edition in the set. **Caveat to state honestly: no app here clears the rubric's depth bar (T≥3, C≥2 with licences). The whole category is single-commentary.** |
| **Best AI** | **Ours** (provisional) | **WIN (provisional)** | Gita GPT is free; BGFA's Krishna Chat sits behind a trial with an unpublished price. Neither is verified for grounding, citations, or model. If our chatbot returns uncited answers, withdraw this award. |
| **Best for academic study** | **Bhagavad-gita As It Is (BBT)** — and honestly, **IIT Kanpur's Gita Supersite** (web, outside the app set) | **WE LOSE** | Per-element toggles (devanagari / transliteration / word-for-word / translation / purport), full-text search scoped to purports, two languages side by side. We ship none of that. |

**Net: we win 3 of 8 outright, hold 1 contested, and lose 4.** That is the honest count and it is the credibility argument for the whole page.

---

## 4. Everything that could NOT be verified

### About our own app — must be resolved before publication
1. Whether an account or sign-in is required. Not stated on either listing.
2. Whether Gita GPT works offline, requires an account, what model powers it, what quota applies, and how it squares with the "No data collected" data-safety declaration.
3. Whether audio is downloadable for offline playback, or only text.
4. Who recites the audio. No reciter named anywhere.
5. Which translations we actually ship. "20+ Authors and Translations" (iOS subtitle) is unsubstantiated by anything on either listing.
6. Whether Devanagari is present (never explicitly stated on either listing).
7. Whether the 7 languages are full 700-verse translations or partial, and how many the UI is localised into.
8. Google Play app version number, APK size, and minimum Android version — none appear on the public listing.
9. Exact download count. Play publishes only "500K+". Apple publishes nothing. **A combined install figure cannot be stated honestly.**
10. **Developer-identity anomaly on Apple's side:** `sellerName` = "Ved Vyas Foundation" but `artistId` 1822986162 resolves to `apps.apple.com/in/developer/gobind-bhawan-karyalaya/id1822986162`. Unresolved.
11. Whether the iOS app still functions / whether its backend is live.
12. Play rating histogram is internally inconsistent with the header (1,603 vs 1.68K).
13. Whether `bhagavadgita.com` / Gita AI has any paid or rate-limited tier — the "no paid tier" claim was scoped to store listings only.

### About competitors
14. BGFA's recurring subscription price and billing period — not published on Play, the App Store, or their website. **Verified as unpublished, which is itself a publishable fact.**
15. Whether BGFA billing runs through store rails or their own UPI AutoPay. Inference only.
16. What is free vs paid in BGFA after the trial — three mutually unreconciled statements (free Ch.1 / "Dynamic Free Content" / trial unlocks "the full app").
17. BGFA's "700+ video explanations", "100+ hours", "50+ situational topics", "10,000+ Happy Readers", "3000+ devotees", "4.8 rating" — all unsourced marketing.
18. BGFA celebrity endorsements — appear only in the developer's own description; nature (paid/organic/licensed) unknown.
19. BBT: offline capability, account requirement, whether the pronunciation guide has playable audio, non-US pricing, non-US ratings, and whether the 8 metadata locales are full text or UI-only.
20. Gita Press: last-updated date, translator, languages, offline, audio — nothing verified beyond rating/reviews/installs/IAP badge.
21. JKYog Krishna Bhakti: everything except rating, reviews, installs, update date.
22. **Rating conflicts requiring re-pull:** unofficial *As It Is* (`com.acd.acbsp.bg`) reads **4.8** in today's capture vs **4.5** in the earlier pass; Transcend (`com.bbt.transcend`) reads **4.8** vs **4.6**. One of the two passes is wrong. **Do not publish either number until re-fetched with an identity check.**
23. Every "Contains ads" / "In-app purchases" absence is a *badge-absence* fact, not a product fact. Neither badge covers server-side paywalls, donation prompts, or gating inside a chatbot. Publish as "no ads or IAP declared on the store listing", never "this app has no ads".
24. Every Play "No data collected" declaration is a **developer self-declaration Google renders unverified**. Attribute it; never assert it.

### Corrections already identified in our own research (fix before drafting)
- `features: ["iosUniversal"]` for our iOS app is **false** — the lookup returns `features: []`. Drop the "universal binary vs iPhone-only contradiction" line entirely. Safe published line: "iPhone-only on the App Store; no iPad build advertised."
- "The exact Play review count is unknowable" is **false**. The histogram exposes 5★1,460 / 4★41 / 3★20 / 2★41 / 1★41 = **1,603**, whose weighted mean (4.77) matches the embedded 4.766234. Publish "~1,600 ratings (histogram sums to 1,603; Play's header rounds to 1.68K)".
- Our app's iOS `trackName` carries a colon — "Bhagavad Gita**:** Hindi & English" — while the Play title does not. Use the colon form next to App Store links.
- BGFA "access is gated behind a trial" is **wrong**: Chapter 1 is permanently free, plus "Dynamic Free Content".
- BGFA "no commentaries" would be refutable — their site says "interactive video commentaries". Say **"no named commentator or translator"** instead.
- BGFA iOS: publish "4.7 displayed (4.65 raw, US storefront)". The storefront page shows 4.7.
- "GitaGram" does not appear on any BGFA surface. Do not use it as a brand name.

---

## 5. Recommended page structure for `/best-bhagavad-gita-apps`

Grounded in the AEO research; each section notes whether the justification is measured (▲) or mechanism-plausible.

| # | Section | Rationale |
|---|---|---|
| 1 | **H1: ranked Top-N framing** — "The 9 Best Bhagavad Gita Apps, Tested" | ▲ 63% of LLM citations go to listicles; 71–86% of cited listicles are ranked Top-N. Year in title **only if** we commit to annual re-testing (see §5 note). |
| 2 | **Verdict block, 40–80 words, immediately under H1** | ▲ 44.2% of citations are extracted from the first 30% of a document; "answer near the top" scores 8.8/10 in the 54-study meta-analysis. Name winner + 2–3 runners-up *by name*, one clause each, no pronouns, survives being lifted out of context. |
| 3 | **Per-category winners as a short bulleted list** | Mechanism-plausible, not measured. Supports query fan-out (62% of AI Overview citations don't come from the head term's top 10). Each line self-contained. **Must include the four categories we lose.** |
| 4 | **Comparison table — real HTML `<table>`, never an image or JS-rendered grid** | ▲ folded into the 8.6 "AI-ready structure" factor. Columns must carry evidence, not ✓/✗: price with basis, rating **with n**, platform, standout limitation, **"verified [date]" per row**. Add one plain-prose sentence summarising the table beneath it — retrieval handles prose more reliably than cells. |
| 5 | **Methodology / how we scored — ABOVE the first app** | ▲ Google's helpful-content guidance explicitly demands "the number of products tested, what the test results were, how the tests were conducted… accompanied by evidence". Publish the rubric, the weights, the device, the date window, and the two-rater protocol. This is also the primary defence against the scaled-content-abuse and "commodity content" classifications that are demoting comparison pages. |
| 6 | **Ranked entries, one H2 per app, identical internal shape** | ▲ "self-contained passages" 8.0. Fixed lattice: verdict sentence → who it's for → who it's *not* for → price (with check date) → 3 pros / 3 cons → **one original observation from our own testing** → store links. |
| 7 | **"Where our app falls short"** — explicit, named, unhedged | Every credible exemplar criticises its own winner (Wirecutter's "Flaws but not dealbreakers"). srimadgita lists zero cons for its house app; that is the tell we differentiate against. Ours writes itself: stale iOS build, 2.0 iOS rating, no source editions or licences published, no named reciter. |
| 8 | **How to choose** — fit, trade-offs, pricing, limitations | Aleyda Solis' checklist: these must be prominent, not inferred. |
| 9 | **"Also considered / why we didn't rank these"** | Wirecutter's "The competition". Covers fan-out queries; signals genuine helpfulness. Put the unofficial *As It Is* clone and Transcend here, clearly labelled. |
| 10 | **FAQ — 5–8 real questions, answer in the first sentence under a question-phrased H3** | ▲ question-led heading + answer-first is the repeatedly-correlated pattern. Expect **no** FAQ rich result (restricted to gov/health since 2023) — do it for the content, not the SERP. |
| 11 | **Named author with credentials + dated changelog** | ▲ Google's who/how/why. "Srimad Gita Team" is what the competitor does; a real bylined person with a linked profile is the differentiator. |

**Note on year-stamping:** no controlled study exists in either direction. Put "2026" in the H1 only if we genuinely re-test annually, and pair it with a visible "Last updated — what changed" line. Otherwise use an evergreen title with an on-page updated date. This is judgement, not evidence.

### Schema

| Type | Verdict |
|---|---|
| `ItemList` | **Primary type.** All items same `@type` (all `SoftwareApplication` or all `Product` — don't mix). Must be complete: every app on the page appears in the list. Visible text must match the markup. |
| `SoftwareApplication` / `Product` per item | Yes, nested in the ItemList: name, image, url, description, `offers` with price + currency. |
| `Article` / `BlogPosting` | Yes — with `author` as a real `Person` with `sameAs`, plus `datePublished` and `dateModified`. |
| `Organization` (with `sameAs`), `BreadcrumbList` | Yes. Cheap, standard. |
| `FAQPage` | Implement, expect nothing. Rich result is restricted to government/health sites. |
| `AggregateRating` on the page as a whole | **Never.** Google: "Provide review information about a specific item, not about a category or a list of items." |

**⚠ Self-serving review rule — read carefully.** Google's rule: *"If the entity that's being reviewed controls the reviews about itself, their pages that use `LocalBusiness` or any other type of `Organization` structured data are ineligible for star review feature"* — and this includes reviews pulled in via third-party widgets.

For this page specifically:
- **Do not mark up our own editorial score as `AggregateRating`.** `AggregateRating` implies aggregated *user* ratings. Our rubric score is a critic review. Marking it as AggregateRating is misrepresentation and is precisely the "spammy structured data" pattern associated with visibility loss.
- If we mark our score at all, use `Review` with an explicit `author` (`@type: Person`, our named reviewer) and `reviewRating`.
- Reserve `aggregateRating` for genuinely aggregated third-party data — i.e. **the store ratings, attributed to the store**, with `ratingValue` + `ratingCount`, and only on the individual app entity.
- Expected value from schema for AI citation is roughly zero (Ahrefs, 1,885 pages vs 4,000 controls: AI Overviews −4.6%, AI Mode +2.4%, ChatGPT +2.2%). Implement it for classic rich-result eligibility, not for LLM visibility.

**Also required, per the meta-analysis:** the page must be crawlable and server-rendered (URL accessibility scores 9.5 — the single highest factor), and must not carry `nosnippet` or a restrictive `max-snippet` (9.2). Check these before anything else.

---

## 6. Contradictions inside srimadgita's own pages

Their app is `apps.apple.com/us/app/srimad-gita/id6751432151` — **4.0 stars from 4 ratings, released 2025-08-26**. Play `com.gitachat.app.gita_chat`: 4.3 from 44 reviews, 1K+ installs.

**Fabricated against that baseline:**

| Claim | Where | Reality |
|---|---|---|
| "4.8/5 (75,000+ users)" | page 1 body | 4 iOS ratings |
| `"ratingValue":"4.8","reviewCount":"1247"` | page 1 JSON-LD | 4 ratings |
| "4.8/5 (15,420 reviews)" | page 2 | 4 ratings |
| "4.8 Rating / 2,450+ Reviews" | page 3 | 4 ratings |
| `"datePublished":"2023-01-01"` | page 1 JSON-LD | App released Aug 2025 |
| Named `Review` objects — Priya Sharma (2024-12-15), Arjun Patel (2024-11-28), Sarah Chen (2024-10-20) | page 1 JSON-LD | **Reviews dated 8–14 months before the app existed** |
| "verified through direct testing on iOS and Android (March 2026)" | page 2 | Same page's `dateModified` is **2025-01-15** |
| "testing and analysis of over 50 Bhagavad Gita applications" | page 2 | 14 in the table, 5 reviewed |
| `play.google.com/store/apps/details?id=com.srimadgita` | pages 1 & 2 | **404** |

**Self-contradictions across their three pages:**
- Their own audience size: 75,000+ users / 15,420 reviews / 2,450+ reviews / 1,247 reviews — four numbers, one unchanging 4.8 rating.
- "Best for Beginners" = Srimad Gita (p1, p3) vs **Eknath Easwaran** (p2). Direct contradiction on the same query.
- "Best free" = GitaPress (p2) vs Srimad Gita (p3).
- Gita Press 4.4 (p1) vs 4.5 (p2, p3). Chinmaya 4.3 (p1) vs 4.5 (p2). JKYog 4.2 (p1) vs 4.3 (p2). ISKCON "100,000+ users" (p1) vs "11,200 reviews" (p2).
- Top-5 set differs on all three pages; p1 ranks Chinmaya and JKYog, p3 drops both for Easwaran and Mukundananda.
- Freshness: p1 "January 31, 2025"; p2 schema 2025-01-15 but body claims March 2026 testing; p3 "February 19, 2026" while H1 and title still say "2025".
- Three near-duplicate H1s targeting one query — self-cannibalising.
- "User Testimonials" on p2 is a single schema `Review` by "Spiritual Seeker" — an anonymous 5/5 self-review, marked up as structured data.

**Our differentiator, stated plainly:** every rating on our page carries a store link, an *n*, and a verification date; every claim we can't verify is labelled unverified rather than rounded up.

**Do not repeat their mistakes:** their pages independently fail on thinness (1,166–2,123 words vs 4,300–22,000 for Zapier/Wirecutter/Tech.co), no named author, no methodology above the fold, no rejected-options section, zero cons for the house app, and ✓/✗ tables with no price and no verification date.

---

## 7. Open questions for the human

**Blocking — must be answered before a page is drafted**
1. **Will we run real device tests?** Without them, D6 and D10 are 0 for everyone, D5 is 0 for BBT (worth 8 points), and we cannot legally claim "tested" under Google's product-review guidance. If the answer is no, the page must not use the word "tested" and the scores must not be published as scores.
2. **Do we fix our own store listings first?** Publishing a page that criticises unsourced claims while our own Play description says "World's most loved Bhagavad Gita app" and our iOS subtitle says "20+ Authors and Translations" (naming none) is indefensible. This is also the cheapest 11 rubric points available to us (D2 gate + D9).
3. **What do we say about our iOS app?** It's v1.0.5 from Oct 2024, 2.0 stars from 3 ratings, English-only in metadata, with no audio, no AI, and no offline claim. Options: (a) state plainly that the feature set is Android-first and iOS is behind; (b) delay the page until iOS ships. Do not present the 4.8 rating or the 7 languages without an "Android" label.
4. **Which of the 7 thin apps do we keep?** Rows marked ⚠ need a full verification pass or removal. My recommendation: keep Gita Press, JKYog Krishna Bhakti and Song of God (verify properly); move the unofficial *As It Is* clone and Transcend into an "also considered" section with explicit labels; drop nothing silently.

**Decisions needed**
5. Do we award "Best for Hindi" to ourselves? I've provisionally awarded it, but Banaka has 36× our Hindi review volume and we have zero in-app Hindi evidence. A single device test settles it.
6. Do we award "Best audio" at all? Currently unawarded because no app names a reciter and none documents background playback.
7. Year in the H1 — only if we commit to annual re-testing with a visible changelog.
8. Who is the named author of the page, with what credentials and what public profile to link?
9. Do we disclose that this is our own product's comparison page, and where? (Own-domain comparison pages earn far fewer LLM citations — ~7% of ChatGPT and 4% of Claude citations go to brand homepages. Realistic goals are Google rankings, branded/"alternatives" queries, and supplying facts that third-party listicles copy.)

**Facts to obtain**
10. Our funding model, in one publishable sentence (worth D8 8→10).
11. Source edition, publisher and licence for every translation and commentary we ship (worth D2 4→up to 10 and D9 4→up to 8). This is the single largest scoring lever we have.
12. Named reciter(s) for our audio.
13. What model powers Gita GPT, whether it cites chapter:verse, its free quota, and whether it's disclosed in our privacy policy — required before we claim "Best AI".
14. Resolution of the Apple developer-page anomaly (`gobind-bhawan-karyalaya` slug under a "Ved Vyas Foundation" seller name).
15. Re-pull, with page-identity checks, on the same day the page publishes: every Play figure in §1, plus the two conflicted ratings in row 8 and 9.

---

**Evidence artefacts:** `/private/tmp/claude-501/-Users-radhakrishna-Documents-bg-frontend/0328a5bc-cf98-417a-83f1-ed95141918f7/scratchpad/` — `play2.html` (ours), `verify_play.html` + `ds.html` + `verify_ios.html` + `verify_ios_in.html` + `us.json` + `in.json` (BGFA), `ios.json` (BBT), `play_sg.html` + `play.txt` (Song of God), `play_kb.html` (Krishna Bhakti), `banaka_2.html` + `banaka.txt` (Banaka), `p_com.gita_press.html`, `acd.html`, `tr.html`, `pin.html` (Srimad Gita), `bhagavad-gita-app-comparison.html` / `compare_gita-apps-comparison.html` / `best-bhagavad-gita-app.html` (competitor captures), `an.py` (extractor).
