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

## Play ratings are regional. State the storefront.

Our app returns different values by storefront, from the same rating count:

| Storefront | Rating | Displays as | Count |
| ---------- | ------ | ----------- | ----- |
| India      | 4.9285 | **4.9**     | 1,681 |
| US         | 4.7777 | **4.8**     | 1,681 |

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

| App | Package | Author | Rating | Ratings | Installs |
| --- | ------- | ------ | ------ | ------- | -------- |
| Bhakti: Gita & Mantras | `com.vlv.aravali.bhakti` | Kuku Technologies | 4.07 | 30,460 | **5M+** |
| Gita Seva: Hindu Books & Aarti | `ct.android.gitasevakotlin` | Gita Seva Trust | 4.87 | 15,751 | 1M+ |
| Bhagavad Gita in Bangla | `in.banaka.mohit.bhagwadgita.bangla` | Banaka | 4.72 | 11,157 | 100K+ |
| Bhagavad Gita Telugu | `telugu.bhagavadgita` | Learning Game Apps | 4.67 | 9,190 | 100K+ |
| Bhagavad Gita in Oriya / Odia | `in.banaka.mohit.bhagwadgita.oriya` | Banaka | 4.69 | 7,154 | 100K+ |
| Learn Geeta | `com.loginwithgoogle` | Learn Geeta, Geeta Pariwar | 4.75 | 1,555 | 100K+ |
| Ask Krishna AI | `com.hnix.bhagavad_gita_ai` | HNIX Innovations | 4.78 | 645 | 10K+ |
| Yatharth Geeta | `com.yatharthgeeta.user` | Swami Adgadanand | 4.83 | 542 | 10K+ |

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
- **iOS:** new build submitted, awaiting Apple review. **Publish no iOS rating** until the new
  build has ratings of its own. The current listing shows 2.0 from 3 ratings on v1.0.5 from
  October 2024, which is not representative and would be misleading either way.
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

| Rating | Ratings | App |
| ------ | ------- | --- |
| **4.93** | 1,681 | **Ours** |
| 4.87 | 15,751 | Gita Seva |
| 4.85 | 4,537 | Krishna Bhakti (ours) |
| 4.81 | 1,590 | Bhagavad Gita App in Hindi |
| 4.75 | 1,555 | Learn Geeta |
| 4.72 | 11,157 | Bhagavad Gita in Bangla |
| 4.66 | 58,560 | Banaka Hindi |

We are the highest-rated Bhagavad Gita app on Play among those with a meaningful rating base.
That is verifiable and it survives being checked, which is the whole standard here.

Publish it with its bounds intact: **"the highest-rated Bhagavad Gita app on Google Play India
among apps with more than 1,000 ratings"**. Dropping the storefront or the threshold turns a
defensible fact into something a competitor can knock down, since the US storefront returns 4.78.

**Categories others win, and should:**

| Category                    | Winner                    | Why                                                                                                                                                                 |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Best for Hindi              | **Banaka**                | 58,560 ratings, 35x our review count in that market                                                                                                                 |
| Best video teaching         | **Bhagavad Gita For All** | Genuinely strong video. Also the most heavily monetised app here: free chapter 1, then a trial, then paid, with book purchase unlocking content. Both facts stated. |
| Best for Prabhupada readers | **BBT**                   | The only rights-holder-published edition. iOS only, $4.99.                                                                                                          |
| Best offline                | **JKYog Song of God**     | Strongest explicit offline claim. Lightweight, English and Hindi only, no audio.                                                                                    |

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
