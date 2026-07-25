# UI/UX reference analysis — what the leaders do that we don't

Captured 2026-07-25 with Playwright using **real device profiles**, not window resizing. 118 screenshots, organised `<site>/<profile>/<page>-{full,fold}.jpg`
— `full` is the entire page, so every section is visible, not just the hero.

| Profile | Viewport | DPR       | Touch   | User agent                 |
| ------- | -------- | --------- | ------- | -------------------------- |
| desktop | 1440×900 | 2         | no      | Macintosh                  |
| iphone  | 393×852  | **3**     | **yes** | iPhone; CPU iPhone OS 17_5 |
| android | 412×915  | **2.625** | **yes** | Linux; Android 14; Pixel 7 |

Reproduce with [`design-capture/capture.mjs`](design-capture/capture.mjs). Raw device probe data in [`design-capture/probe.json`](design-capture/probe.json).

Sites: **bible.com** (YouVersion, 500M+ installs), **quran.com**, **sefaria.org**, **hallow.com**,
**abide.com**, **glorify-app.com**, **calm.com**.

> **Screenshots are local-only** and git-ignored — they are large and regenerate in a few
> minutes. Run `node docs/design-capture/capture.mjs` with Playwright installed to rebuild them
> into `design-refs/`.

---

## 1. The device-detection question, answered

You asked whether these sites show only the iOS CTA on iPhone, only Play on Android, and both on
desktop. **They don't. Nobody does.**

bible.com's `/app` page, measured on all three profiles:

| Profile | App Store badge | Google Play badge | QR code    |
| ------- | --------------- | ----------------- | ---------- |
| desktop | ✅ visible      | ✅ visible        | ✅ visible |
| iPhone  | ✅ visible      | ✅ visible        | ❌ removed |
| Android | ✅ visible      | ✅ visible        | ❌ removed |

quran.com, hallow, abide: same story — both badges on every profile.

**The only device adaptation any of them makes is dropping the QR on mobile.** Which is the one
change that has to happen, because you cannot scan a QR with the screen displaying it.

### Why showing both is actually right

1. **iOS device detection is already free.** Safari renders the Smart App Banner from a meta tag
   _only on iOS_. Apple does the detection; you ship one line. bible.com's, with the deep link:

   ```html
   <meta name="apple-itunes-app"
         content="app-id=282935706,
                  app-argument=youversion://bible?reference=JHN.3.16&version_id=111">
   ```

   The `app-argument` opens the app **at that verse**, not the home screen.

2. **UA sniffing is fragile and it costs you.** iPads report desktop UAs. Android tablets and
   ChromeOS are ambiguous. Get it wrong and you have hidden the only button that mattered.
   Showing both costs one badge of space; guessing wrong costs the install.

3. **People share links across devices.** Someone reads on a laptop and installs on their phone.

**Recommendation:** show both badges everywhere, drop the QR on mobile, and add the iOS Smart App
Banner with a verse deep link. Don't build UA detection.

### One thing worth stealing outright

bible.com routes store links through **branded redirects** — `app.bible.com/app-ios` and
`app.bible.com/app-android` — rather than linking stores directly. That gives them click
measurement and lets them change destinations without a deploy. Ours would be
`bhagavadgita.com/go/ios` and `/go/android`. This is exactly the attribution discipline the
signup-attribution work (roadmap item 6) established, applied to installs.

---

## 2. What they have on mobile that we don't

**These are the findings window-resizing could not have produced** — they only appear under a real
mobile UA with touch.

### A bottom tab bar (bible.com)

On iPhone and Android, bible.com renders a **persistent bottom navigation**: `Home · Bible · Plans
· Videos`. Not present on desktop. The mobile web deliberately feels like an app.

quran.com does the same with `Surah · Verse · Juz · Page`.

**We have nothing like this.** Our mobile navigation is a hamburger, which hides everything behind
a tap and gives no sense of place.

### A contextual verse action sheet (bible.com)

Select a verse on mobile and a bottom sheet appears:

> `Currently Selected: Psalms 23: NIV` — **Highlight · Copy · Compare · Share** — _"Want to have
> your highlights saved?"_

Selection-driven, contextual, and it upsells account creation at the exact moment the action has
value. **We have no verse-selection interaction at all.**

### Language selector as a bottom sheet (quran.com)

Full-width bottom sheet listing English, العربية, বাংলা, فارسی, Français, Indonesia, Italiano,
Dutch, Português, русский. A native-feeling pattern; we use a dropdown.

---

## 3. Feature gaps, by site

### bible.com — the benchmark

| They have                                                                   | We have                     | Gap           |
| --------------------------------------------------------------------------- | --------------------------- | ------------- |
| Bottom tab bar on mobile                                                    | Hamburger                   | **Large**     |
| Verse-selection action sheet (highlight/copy/compare/share)                 | Nothing                     | **Large**     |
| **Parallel** translation view                                               | Single translation          | **Large**     |
| Reading plans (12/21/7-day, third-party publishers)                         | Nothing                     | **Large**     |
| Verse Images — shareable graphic per verse                                  | Nothing                     | **Large**     |
| Video per verse                                                             | Nothing                     | Medium        |
| Reader settings: size, sans/serif font, footnotes, numbers                  | Nothing                     | Medium        |
| "Continue Reading" state memory                                             | Nothing                     | Medium        |
| Emotion/topic cards (Love, Anxiety, Healing, Anger, Hope, Depression, Fear) | Nothing                     | **Large**     |
| Audio "Listen" alongside every chapter                                      | Audio exists                | Small         |
| Sticky app bar with social proof (`20M Ratings. 4.9`)                       | Nothing                     | Medium        |
| Dedicated `/app` page with mockup + testimonials                            | `/bhagavad-gita-app` exists | Small         |
| Smart App Banner with verse deep link                                       | Nothing                     | **Quick win** |
| Branded redirect links for attribution                                      | Nothing                     | **Quick win** |
| "Get the app" permanently in nav                                            | Footer only                 | **Quick win** |

### quran.com — the closest analogue

Free, non-profit, scripture with translations, audio and commentary. Our exact shape.

| They have                                                           | Gap for us                                         |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| **"Verse by Verse" / "Reading" mode toggle**                        | **Large** — study vs read-through from one text    |
| **Per-verse tabs: Tafsirs / Lessons / Reflections / Answers**       | **Large** — commentary inline, not a separate page |
| Per-verse action row: play, bookmark, copy, share, note, more       | **Large**                                          |
| Word-by-word meaning and transliteration                            | We have some                                       |
| Reciter selection (a whole `/reciters` page)                        | **Medium** — we don't name our reciter             |
| Translation selector in the chapter header                          | Roadmap item 8                                     |
| "Achieve Your Goals — Track Streaks, Custom Goals, Stay Consistent" | **Medium** — gamification                          |
| Voice search (mic in the search field)                              | Medium                                             |
| Explore Topics chips                                                | Overlaps item 11                                   |
| Juz / Hizb / Page navigation alongside chapter                      | Small                                              |

### sefaria.org — for corpus browsing

- **Library browse** as a two-column card grid, each category topped by a coloured rule in its own
  hue. Colour carries the taxonomy.
- **Non-profit mission stated in the reading sidebar** — "We are a nonprofit organization offering
  free access to texts, translations, and commentaries." **We barely say this anywhere**, and it
  is our single strongest differentiator against a ₹79/month competitor.
- `Getting Started (2 min)` video button.
- **Learning Schedules** — Weekly Torah Portion, Haftarah. A calendar-driven reading rhythm.
- Translations listed as inline language names, not a dropdown.

### hallow.com — a counter-example

Their homepage **is a signup wall**: "Find Peace in Prayer", Mark Wahlberg and Jonathan Roumie
named, then Continue with Email / Google / Apple. Beautiful gradients, aggressive funnel.

For a free non-profit whose entire pitch is open access, gating the front door would contradict
the product. **Do not copy.** Filed to make the reasoning explicit.

### abide / glorify / calm

Christian meditation apps plus the category leader. All three are **paywalled subscription
products** whose sites are pure marketing — no scripture to read. Useful only for hero craft and
atmosphere. calm.com in particular does enormous work with one full-bleed photograph.

**calm.com bot-blocks headless Chrome, inconsistently.** Re-tested: desktop and iPhone both
returned _"Access to this page has been denied"_ (iPhone with a Press-&-Hold challenge), while
**Android loaded the real page**. So `calm/android/` is genuine; the desktop fold is a capture from
a real (non-headless) browser instead, and the iPhone capture is dropped rather than kept as a
misleading error page.

---

## 4. Ranked, for the roadmap

**Quick wins — days, not weeks**

1. **iOS Smart App Banner** with verse deep link. One meta tag.
2. **Branded redirect links** (`/go/ios`, `/go/android`) so installs are measurable.
3. **"Get the app" in the nav**, not just the footer.
4. **Sticky mobile app bar** with social proof first — `4.9 ★★★★★ · 500,000+ downloads`. Never
   over scripture. Dismissible for 30 days.

**Reading UI — the real revamp**

5. **Bottom tab bar on mobile.** The largest single gap. Home · Read · Gita GPT · More.
6. **Verse-selection action sheet** — highlight, copy, share, note.
7. **Verse by Verse / Reading mode toggle.**
8. **Commentary as per-verse tabs** — folds roadmap item 8 into the reading page instead of a
   separate picker.
9. **Reader settings**: text size, font, show/hide verse numbers. Devanagari-aware.
10. **"Continue reading"** state memory.

**Content and growth**

11. **Emotion/topic cards** — the life-situation layer (item 11), as gradient tiles.
12. **Verse Images** — shareable graphic per verse. Also feeds the social engine in `marketing/06`.
13. **Reading plans** with streaks — the retention mechanism behind item 5's push work.
14. **Name the reciter** and give audio a proper surface.
15. **State the non-profit mission on reading pages**, sefaria-style.

---

## Method notes and limits

- Real device emulation via Playwright. UA, DPR and touch verified per profile and recorded in
  `probe.json`.
- Cookie/consent dismissal is attempted before capture, so some folds differ slightly from a first
  visit.
- `quran-com/desktop/02-surah-full` failed — the page is too tall for a single screenshot. The
  iPhone and Android captures of it succeeded.
- calm.com's iPhone capture is a bot challenge, not the site.
- Screenshots downscaled (full pages to 1400px, folds to 900px) to keep the repo reasonable at
  ~9 MB.
- These are **behavioural and structural** observations. Type scales and control dimensions are in
  the capture script's output; per your note, detailed style replication
  comes later, item by item.
