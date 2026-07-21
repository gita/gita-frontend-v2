# App comparison — confirmed fact sheet

Source of truth for `/best-bhagavad-gita-apps` (roadmap item 12). Supersedes the raw research in
`app-comparison-research.md`, which contained several errors corrected below.

**Store figures pulled 2026-07-20 from Google Play's own `SoftwareApplication` JSON-LD**, not
scraped from the rendered page. That matters: the visible page carries ratings from "similar
apps" carousels, and scraping those produced a wrong number for our own app earlier.

**Every figure must be re-pulled with a page-identity check on the day the page publishes.**
Play served a substituted listing at least once during research — same URL, 200 OK, a different
app's page.

---

## Re-pull 2026-07-22 — read this before quoting any number below

**The shipped page carries 2026-07-22 figures. The tables further down this document are the
2026-07-20 snapshot and were left as written**, because sweeping twenty figures across two
hundred lines is exactly the edit that silently half-applied once already on this project. Where
the two disagree, the page is right and this section says why.

All eleven Play listings were re-pulled from `SoftwareApplication` JSON-LD and every one returned
the app it was meant to, so no substitution this time. Two days of drift, nothing structural:

| App                         | 07-20          | 07-22           |
| --------------------------- | -------------- | --------------- |
| Ours                        | 4.9285 / 1,681 | 4.9134 / 1,686  |
| Krishna Bhakti              | 4.85 / 4,537   | 4.8537 / 4,542  |
| Banaka Hindi                | 4.66 / 58,560  | 4.6616 / 58,566 |
| Gita Seva                   | 4.87 / 15,751  | 4.8697 / 15,762 |
| Bhagavad Gita For All       | 4.49 / 9,163   | 4.4851 / 9,174  |
| Banaka Bangla               | 4.72 / 11,157  | 4.7183 / 11,158 |
| Telugu (Learning Game Apps) | 4.67 / 9,190   | 4.6722 / 9,189  |
| Banaka Oriya                | 4.69 / 7,154   | 4.6943 / 7,156  |
| Learn Geeta                 | 4.75 / 1,555   | 4.7533 / 1,555  |
| Ask Krishna AI              | 4.78 / 645     | 4.7864 / 646    |
| Song of God                 | 4.66 / 309     | 4.6599 / 309    |
| BBT _As It Is_ (iOS)        | 4.9 / 556      | 4.8851 / 557    |
| Bhakti (Kuku)               | 4.07 / 30,460  | 4.0667 / 30,459 |
| Transcend                   | 4.79 / 1,310   | 4.7982 / 1,312  |

**Two corrections, not drift:**

1. **Krishna Bhakti has an iOS app** — `id6463116386`, 4.93 from 732 (US), 4.95 from 315 (IN).
   The 07-20 sheet treated it as Android-only and the page shipped that error. We built that app,
   so understating its platform coverage is a mistake the disclosure does not excuse. Learn Geeta
   (`id6447505100`) and Bhagavad Gita For All (`id6504813763`) are on iOS too.
2. **Srimad Gita's iOS listing is `id6751432151`**, seller Neeta Belthan, 4.0 from 4 (US) and
   **1.5 from 2 (IN)**. The 07-20 figure of 4.0 from 4 is confirmed; the Indian storefront is new
   information and worse for them.

**Ratings are now stated to two decimals throughout.** Play displays one. Ours reads 4.91 rather
than 4.9 because the underlying value is 4.9134 and the page compares it against Krishna Bhakti's
4.85, a distinction one decimal erases.

---

## Play ratings are regional. State the storefront.

Our app returns different values by storefront, from the same rating count:

| Storefront | Rating | Displays as | Count |
| ---------- | ------ | ----------- | ----- |
| India      | 4.9134 | **4.9**     | 1,686 |
| US         | 4.7778 | **4.8**     | 1,686 |

_Re-pulled 2026-07-22. Was 4.9285 / 1,681 on 2026-07-20._

Publish **"4.9 on Google Play"** with the India storefront noted, since that is where most of our
readers are. Do not print a rating without saying which storefront it came from.

---

## The candidate set

| App                                | Package                           | Author                   | Rating          | Ratings    | Relationship                                                                            |
| ---------------------------------- | --------------------------------- | ------------------------ | --------------- | ---------- | --------------------------------------------------------------------------------------- |
| **Bhagavad Gita Hindi & English**  | `com.gitainitiative.bhagavadgita` | Ved Vyas Foundation      | 4.9 IN / 4.8 US | 1,681      | **Ours**                                                                                |
| **Bhagavad Gita — Krishna Bhakti** | `org.jkyog.radhakrishnabhakti`    | JKYOG                    | 4.85            | 4,537      | **Built and maintained by us for JKYog**                                                |
| **Bhagavad Gita — Song of God**    | `in.jkyog.bhagavadgita`           | JKYog India              | 4.66            | 309        | Same organisation, **different team — not built by us**                                 |
| Bhagavad Gita in Hindi             | `in.banaka.mohit.bhagwadgita`     | Banaka                   | 4.66            | **58,560** | Independent                                                                             |
| Bhagavad Gita For All \| Video     | `com.bgfa`                        | Bhagavad Gita For All    | 4.49            | 9,163      | Independent                                                                             |
| Transcend                          | `com.bbt.transcend`               | Bhaktivedanta Book Trust | 4.79            | 1,310      | Independent. **General 600+ eBook library, not a Gita app**                             |
| Bhagavad-gītā As It Is             | `com.acd.acbsp.bg`                | "Shrila Prabhupada das"  | 4.82            | 222        | Independent. **Unofficial** — its own description disclaims responsibility for the text |
| Gita Press                         | `com.gita_press`                  | Gita Press               | 4.45            | 232        | Independent                                                                             |
| Srimad Gita                        | `com.gitachat.app.gita_chat`      | Decentralized Inc        | 4.28            | 44         | Independent. Our citation competitor                                                    |

### Added after a full Play sweep

A search across seven query variants surfaced 117 distinct packages. These are the ones with
enough scale or a distinct role to belong in the comparison. All figures from Play's JSON-LD,
India storefront, 2026-07-20.

| App                            | Package                              | Author                     | Rating | Ratings | Installs |
| ------------------------------ | ------------------------------------ | -------------------------- | ------ | ------- | -------- |
| Bhakti: Gita & Mantras         | `com.vlv.aravali.bhakti`             | Kuku Technologies          | 4.07   | 30,460  | **5M+**  |
| Gita Seva: Hindu Books & Aarti | `ct.android.gitasevakotlin`          | Gita Seva Trust            | 4.87   | 15,751  | 1M+      |
| Bhagavad Gita in Bangla        | `in.banaka.mohit.bhagwadgita.bangla` | Banaka                     | 4.72   | 11,157  | 100K+    |
| Bhagavad Gita Telugu           | `telugu.bhagavadgita`                | Learning Game Apps         | 4.67   | 9,190   | 100K+    |
| Bhagavad Gita in Oriya / Odia  | `in.banaka.mohit.bhagwadgita.oriya`  | Banaka                     | 4.69   | 7,154   | 100K+    |
| Learn Geeta                    | `com.loginwithgoogle`                | Learn Geeta, Geeta Pariwar | 4.75   | 1,555   | 100K+    |
| Ask Krishna AI                 | `com.hnix.bhagavad_gita_ai`          | HNIX Innovations           | 4.78   | 645     | 10K+     |
| Yatharth Geeta                 | `com.yatharthgeeta.user`             | Swami Adgadanand           | 4.83   | 542     | 10K+     |

Two traps found while resolving these, both worth remembering:

- **`com.learngeeta.play` is not Learn Geeta.** It is "Geeta Olympiad 2025", 5.0 from 8 ratings,
  same publisher. The real app is `com.loginwithgoogle`, an odd id but the correct one. Always
  confirm the returned `name` matches the app you meant.
- **Banaka runs one app per language** — Hindi 58,560, Bangla 11,157, Oriya 7,154. Their volume is
  a publishing strategy across several listings, not one dominant app.

**iOS only, no Android listing:** BBT's official _Bhagavad-gita As It Is_, `id1080562426`, **$4.99
one-time**, 4.9 from 556 ratings.

**No mobile app at all:** Vedabase (every candidate package 404s) and Gita Supersite. Both belong
on the websites page, item 13, not here. Drop "best for academic study" from the apps page.

---

## Srimad Gita: claimed against actual

The reason this page exists.

|                   | They publish  | Actual                      |
| ----------------- | ------------- | --------------------------- |
| Rating            | 4.8           | **4.28** Play · **4.0** iOS |
| Reviews           | 2,450+        | **44** Play · **4** iOS     |
| Users / downloads | 75,000+ / 1M+ | **1K+** installs            |

Their download claim is out by roughly three orders of magnitude, and their own pages contradict
each other: "75,000+ users" on the iOS page against "1M+ downloads" on the Android page.

---

## Our app — confirmed by the founder, 2026-07-20

- **Text:** Swami Mukundananda's translation and commentary, in all seven languages.

  Earlier versions carried other authors. Shipping one is a deliberate editorial decision, not a
  gap, and the page should say so in those terms: it is the most in-depth commentary available to
  us, written plainly, and it explains verses through real and often modern examples that land
  with a younger reader in a way the older commentaries do not. A reader who wants Shankaracharya,
  Ramanuja, Sivananda or Chinmayananda has all of them on the website, which is a fair thing to
  point out rather than hide.

  This matters for how we handle the depth category. The honest framing is that BBT wins on
  breadth of the Prabhupada corpus, and we do not compete for "most commentaries in an app". We
  compete on one commentary chosen for how well it teaches.

- **Languages:** English, Hindi, Telugu, Tamil, Gujarati, Odia, Spanish
- **Gita GPT:** 10 messages a day, free, sign-in required. Latest GPT-5 model with a custom
  retrieval system grounding answers in the Gita text, with citations. Voice input uses the
  phone's own speech-to-text. _(The 5/day anonymous tier is the website, not the app.)_
- **Cost:** free, no ads, no sponsorship, no paid placement, no in-app purchases
- **Publisher:** Ved Vyas Foundation
- **iOS: shipped.** Version 2.2.3 went live **2026-07-21**. Confirmed via Apple's lookup API on
  2026-07-22: `currentVersionReleaseDate` 2026-07-21T15:57:28Z, free, seller Ved Vyas Foundation.

  **The earlier "publish no iOS rating" decision is reversed, and the reasoning matters.** The
  listing today shows **2.0 from 3 ratings (US)** and **3.0 from 6 (India)**. Those are the same
  ratings this sheet recorded on 2026-07-20, the day _before_ 2.2.3 shipped, so **all nine
  predate the current build**. Apple carries ratings across versions unless the developer resets
  them, and `averageUserRatingForCurrentVersion` returns the same value as the all-version
  figure, which is Apple reporting the carried-over set rather than three new ratings arriving
  inside a day.

  So the page publishes the number _and_ says the ratings predate the build. Not publishing it
  was defensible while the build was unreleased. It stopped being defensible the moment the app
  went live, because the same page criticises Srimad Gita for advertising 4.8 from 2,450 reviews
  against a store showing 4.28 from 44. A page that runs that criticism and suppresses its own
  2.0 is not worth publishing.

  Re-check once the new build accumulates ratings of its own. If the count climbs well past nine,
  the "these predate the build" line has to come out.

- **Reciter:** not named on the page, by decision.

### Audio — resolved

Sanskrit recitation, plus translation and commentary audio, all ship. Confirmed by the founder
on 2026-07-20.

An earlier draft flagged a contradiction from the Flutter source, where the English, Hindi and
Tamil data files carried byte-identical audio URLs. That source tree is from January 2025 and
the live build is from December 2025, so it predates the work. The founder's account of his own
shipping product supersedes a stale checkout. Recorded here so nobody re-opens it.

### Still to verify on device

- Offline behaviour in aeroplane mode: text yes, audio unknown
- Whether the Hindi build is as complete as the English one

---

## Disclosure

Three apps in this comparison carry Swami Mukundananda's text, and we are connected to all three:
we publish one, we build a second for JKYog, and the third is by JKYog India's own team. That has
to be stated plainly and near the top, not in a footnote.

Be precise about the entities rather than blurring them. **Ved Vyas Foundation is a separate
registered organisation from JKYog.** The link is that we build the Krishna Bhakti app for them
and that both use Swami Mukundananda's text, not that they are one body. Say exactly that; a
vague "we are affiliated" reads as evasive, and an overstated one is simply wrong.

The credibility of this page rests on it. Srimad Gita ranks itself first in every row of its own
table; the moment we do something equivalent without disclosure, we have written the same page
with better typography.

### The rating claim worth making

Ranked by rating among apps with **1,000 or more ratings**, India storefront:

| Rating   | Ratings | App                        |
| -------- | ------- | -------------------------- |
| **4.91** | 1,686   | **Ours**                   |
| 4.87     | 15,762  | Gita Seva                  |
| 4.85     | 4,542   | Krishna Bhakti (ours)      |
| 4.81     | 1,590   | Bhagavad Gita App in Hindi |
| 4.75     | 1,555   | Learn Geeta                |
| 4.72     | 11,157  | Bhagavad Gita in Bangla    |
| 4.66     | 58,560  | Banaka Hindi               |

We are the highest-rated Bhagavad Gita app on Play among those with a meaningful rating base.
That is verifiable and it survives being checked, which is the whole standard here.

Publish it with its bounds intact: **"the highest-rated Bhagavad Gita app on Google Play India
among apps with more than 1,000 ratings"**. Dropping the storefront or the threshold turns a
defensible fact into something a competitor can knock down, since the US storefront returns 4.78.

### Category order

Ordered by what a reader most likely wants, not by whose app it is. Someone searching "best
Bhagavad Gita app" is usually after a good free reader, so that leads. Two of ours sit at the top
as a result, which is defensible **only while the disclosure sits above this table, not beneath
it.** If the disclosure ever moves below the fold, this ordering stops being honest and must change.

| #   | Category                         | Winner                                             | Basis                                                                                                                                                                                                                                                                                                 |
| --- | -------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Best dedicated Gita app**      | **Ours** _(disclosed)_                             | Built for one thing. 18 chapters, 700 verses, seven languages, Sanskrit plus translation and commentary audio, offline, Gita GPT, no ads and nothing paid. Highest rated on Play India among apps with 1,000+ ratings, at 4.93.                                                                       |
| 2   | **Best free, ad-free**           | **Ours** _(disclosed)_                             | No ads, no subscription, no in-app purchases, no sponsorship. Verified against the listing rather than asserted.                                                                                                                                                                                      |
| 3   | **Best all-round devotional**    | **Krishna Bhakti** _(disclosed)_                   | 4.85 from **4,537 ratings**, 2.7x ours, 100K+ installs. Same Mukundananda text plus a virtual temple, Ask Swamiji trained on the Gita and Swamiji's other books, audiobooks, meditations, video lectures, stories, courses, challenges, bhajans and kirtans. Nothing else here attempts that breadth. |
| 4   | **Best audio**                   | **Krishna Bhakti** _(disclosed)_                   | Verse audio alongside audiobooks, bhajans and kirtans. Widest audio library in the set.                                                                                                                                                                                                               |
| 5   | **Best AI**                      | **Ours** and **Krishna Bhakti** _(disclosed)_      | Gita GPT: 10 free messages a day, latest GPT-5 model, custom retrieval grounded in the Gita with citations, voice input. Ask Swamiji covers the wider corpus.                                                                                                                                         |
| 6   | **Best AI alternative**          | **Ask Krishna AI**                                 | 4.78 from 645 ratings. Named rather than ignored; claiming to be the only AI option would be false.                                                                                                                                                                                                   |
| 7   | **Most popular in Hindi**        | **Banaka**                                         | 58,560 ratings, 35x our review count. Popularity is verifiable. See the attribution note below for what is not.                                                                                                                                                                                       |
| 8   | **Best for Bangla**              | **Banaka Bangla**                                  | 11,157 ratings                                                                                                                                                                                                                                                                                        |
| 9   | **Best for Telugu**              | **Learning Game Apps, Bhagavad Gita Telugu**       | 9,190 ratings                                                                                                                                                                                                                                                                                         |
| 10  | **Best for Odia**                | **Banaka Oriya**, with Krishna Bhakti as an option | Banaka 7,154 ratings. Krishna Bhakti also ships Odia.                                                                                                                                                                                                                                                 |
| 11  | **Largest scripture library**    | **Gita Seva**                                      | 15,751 ratings, 1M+ installs. Far broader than the Gita. See the sourcing note below.                                                                                                                                                                                                                 |
| 12  | **Best for structured learning** | **Learn Geeta**, Geeta Pariwar                     | Course-based study with a community around it. Nothing else here offers that. Package is `com.loginwithgoogle`, not `com.learngeeta.play`.                                                                                                                                                            |
| 13  | **Best video teaching**          | **Bhagavad Gita For All**                          | Genuinely strong video. Also the most heavily monetised app here: chapter 1 free, then a trial, then paid, with a book purchase unlocking content. Both stated.                                                                                                                                       |
| 14  | **Best for Prabhupada readers**  | **BBT**                                            | The only rights-holder-published edition. iOS only, $4.99 one-time.                                                                                                                                                                                                                                   |
| 15  | **Best offline**                 | **JKYog Song of God**                              | Strongest explicit offline claim in the set. Lightweight, English and Hindi only, no audio.                                                                                                                                                                                                           |

**We take 5 of 15 and are connected to 6.** Keep that count honest. If it creeps upward while the
page is being written, something has gone wrong.

### Ours and Krishna Bhakti — state the difference plainly

They share a codebase, the same Mukundananda translation and commentary, and much of the same
interface. A reader deserves to know which to pick rather than being sold both.

- **Ours** is the dedicated Gita app. Only the Gita, seven languages, nothing else competing for
  attention.
- **Krishna Bhakti** is the wider devotional app. The same Gita text, plus everything above.

Someone who wants only the Gita should be sent to ours. Someone who wants a whole practice should
be sent to Krishna Bhakti. Saying that plainly costs us nothing, and it is exactly what a
self-ranking competitor page structurally cannot do.

### Popularity is not quality, and only one of them is evidenced

Banaka is comfortably the most-reviewed Hindi app here. It is not the best-attributed one, and
the distinction matters because we can prove one claim and not the other.

**What we can evidence, from their own Play listing:** it names **no translator and no
commentator**, and states verbatim:

> "Assuming it is out of copyright protection."

For a scripture app that is a real and citable weakness. Every translation and commentary we
ship is named, dated and credited to its publisher, and the acknowledgements page lists the
editions. That contrast is factual and defensible.

**What we must not publish without proof:** that their text contains scraping errors or has been
watered down. That may well be true, and the founder reports it, but "their translation has
errors" is a quality judgement about a competitor's product and it needs a concrete example
before it appears on our page. If we want to make it, pull two or three specific verses and show
the problem side by side. Otherwise the attribution point above carries the argument on its own
and cannot be argued with.

**Also do not claim** that our recent ratings outpace theirs. Play does not publish rating
recency, so there is no way to show it.

---

## Corrections to the raw research document

- Play rating for our app: research said 4.8 from a US scrape. It is **4.9 in India, 4.8 in the
  US**, and the number must carry its storefront.
- Song of God: research said 4.9. Actual is **4.66 from 309 ratings**, package
  `in.jkyog.bhagavadgita`, author **JKYog India**.
- Song of God is **not built by us**. Research implied a single team behind all JKYog apps.
- The Apple developer anomaly was a **research error**. `artistId` 1602895637 resolves to
  `ved-vyas-foundation`. "Govind Bhawan Karyalaya" is Gita Press's parent organisation and appears
  on our own acknowledgements page, which is presumably where the agent picked it up.
- Gita Supersite and Vedabase have no Android apps, so neither belongs in an app comparison.
