# Design references

Captured 2026-07-25 for the bhagavadgita.com UI/UX revamp — reading pages first, marketing pages
second. Screenshots sit in `<site>/desktop/` and `<site>/mobile/`.

**Type sizes, line heights and control dimensions below are read from `getComputedStyle` on the
live pages, not eyeballed from screenshots.**

---

## The one number that matters most

**bible.com sets its scripture at 18px with a 36px line-height, in a 480px column.**

That is a **2.0 line-height** and roughly **65 characters per line** — both far more generous than
a typical web page. It is the single most consequential decision in their reading UI, and it is
why the text feels calm rather than dense. Everything else is subordinate to it.

For comparison, most sites ship 16px at 1.5. Reading scripture is not reading a blog post.

---

## bible.com (YouVersion) — the benchmark

500M+ installs. Nav brands itself **"Bible App"**, not Bible.com. The website is openly a funnel
into the app.

### Chapter reader — measured

| Property | Value |
| --- | --- |
| Verse text | **Inter 18px / 36px line-height** |
| Text colour | `rgb(18,18,18)` — near-black, not pure |
| Reading column | **480px** |
| Chapter heading | **18px, weight 700, letter-spacing 1px**, uppercase, sans |
| Nav items | **44px tall** (Bible 64×44, Plans 67×44, Videos 77×44) |
| Icon buttons | **32×32**, `border-radius: 100%` |
| Profile button | 76×40, radius 24px |
| Dropdown triggers | 268×33, 13px text, no border radius, underline only |

**The chapter heading is the same size as the body text.** 18px/700/uppercase with letter-spacing.
It does not shout. Most sites would set this at 32px+; they deliberately refuse to let the
furniture compete with scripture.

Toolbar is five controls only: chapter dropdown, translation dropdown, **Parallel** toggle, audio,
**AA**. Prev/next are large low-contrast chevrons pinned to the far left and right edges.

### Reader settings panel (`09-reader-settings-panel.jpg`)

Four controls, nothing more:

1. **Text size** — three-step segmented control (small / medium / large)
2. **Font** — `Inter` vs `Source Serif Pro`. A sans/serif toggle, nothing else
3. **Footnotes** — checkbox
4. **Numbers and Titles** — checkbox

Worth copying almost exactly. Ours would swap font choice for something Devanagari-aware.

### The app CTA, by surface

| Surface | Desktop | Mobile |
| --- | --- | --- |
| Every page | "Get the app" text link in nav | Collapsed into hamburger |
| Verse page | Static sidebar card **with QR** | **Card removed entirely** |
| `/app` | QR + phone mockup | **QR replaced by store badges** |
| `/app` | Sticky bottom bar | Sticky bottom bar |
| 404 | "Get the app" button | same |

**They delete the QR on mobile rather than shrink it.** srimadgita.com keeps QR codes on mobile,
where they cannot be scanned by the device displaying them.

**Their sticky bar leads with proof, not buttons:** `20M Ratings. 4.9 ★★★★★` sits *left of* the
store badges. And they only run it on `/app` — never while you are reading scripture.

### Other patterns

- **"Continue Reading"** replaces "Start Reading" once you have read something
- Verse page: translation chips inline (`NIV KJV ESV NLT NKJV`); on mobile the Read/Listen/Share
  buttons **stack full-width**
- **Verse Images** — every verse has shareable graphics
- **Reading plans as emotion gradient cards** — Love, Anxiety, Healing, Anger, Hope, Depression,
  Fear (`06-reading-plans-emotion-cards.jpg`)
- Verse of the Day: image first, then verse in a left-ruled blockquote, then a full-width dark CTA
- `/app` page: "100% free. No ads or purchases ever." + phone mockup + testimonials with real faces

---

## quran.com — the closest analogue to us

Free, non-profit, scripture with translations, audio, and commentary. Our exact problem shape.

**UI text: Figtree 16px / 21.66px.** White ground, teal accent (`Navigate Quran` pill).

### What to take

- **"Verse by Verse" / "Reading" mode toggle** in the sticky sub-header. Two genuinely different
  reading experiences from one text. We have the same need — study vs read-through.
- **Per-verse commentary tabs: `Tafsirs | Lessons | Reflections | Answers`.** This is the
  commentary layer done as tabs under each verse rather than a separate page. Directly applicable
  to our translation/commentary picker (roadmap item 8).
- **Per-verse action row** — verse number, play, bookmark on the left; copy, share, note, more on
  the right. Appears per verse, not just per chapter.
- **Surah header card** — calligraphy, number + name + English name, one-line description, then
  Listen / Info / Translation selector.
- **Homepage "Continue Reading" card** with the chapter in calligraphy and a `Verse 1 ›` resume
  link. Same state-memory idea as bible.com.
- **"Achieve Your Quran Goals — Track Streaks, Create Custom Goals, Stay Consistent"** — explicit
  gamification on the homepage.
- **Voice search** — a mic in the search field.
- **"Explore Topics"** chips, same as bible.com's topic layer.

Note they run a **newsletter popup** ("Stay Connected to the Quran ❤️") bottom-right. Given ours
converts badly, this is a pattern to observe rather than copy.

---

## sefaria.org — for the library and commentary problem

Non-profit, 3,000 years of Jewish texts, free. Strongest reference for **browsing a large corpus**.

- **Library browse**: two-column card grid, each category topped by a **coloured rule** in a
  distinct hue (Tanakh blue, Talmud gold, Halakhah maroon, Kabbalah indigo). Serif headings, one
  sentence of description each. Colour carries the taxonomy.
- **Right sidebar**: "A Living Library of Torah" with the non-profit mission stated plainly, a
  `Getting Started (2 min)` button, a **Translations** list rendered as inline language names, and
  **Learning Schedules** (Weekly Torah Portion, Haftarah).
- Text page chrome is minimal: title centred, bookmark and a serif **`A`** for text size.
- A dismissible bar: *"Want to change the translation? → Go to translations"*.

The mission-statement-in-the-sidebar is worth stealing. We are also a non-profit giving something
away, and we barely say so on reading pages.

---

## hallow.com — what not to do

**Their homepage is a signup wall.** "Find Peace in Prayer", celebrity names (Mark Wahlberg,
Jonathan Roumie), "#1 prayer app", then Continue with Email / Google / Apple.

Beautiful gradient work, but they are a paid app buying users aggressively. For a free non-profit
whose entire pitch is open access, gating the front door would contradict the product. Filed as a
counter-example.

---

## calm.com — atmosphere only

Full-bleed nature photograph as hero, `Calm your mind. Change your life.` in a deep navy, `Try
Calm for Free` as a white pill in the nav. Worth noting how much work one enormous, calm image
does — but their content model is nothing like ours.

---

## What I would take, ranked

1. **18px / 36px line-height / ~480px column** for verse text. The highest-impact change available.
2. **Reader settings panel** — text size, font, footnotes, numbers/titles. Four controls.
3. **Quiet chapter headings** — same size as body, uppercase, letter-spaced. Stop shouting.
4. **44px minimum tap targets**, 32px circular icon buttons.
5. **Per-verse action row** (play, bookmark, copy, share, note) — quran.com's version.
6. **Verse by Verse / Reading toggle** — study mode vs read-through.
7. **Commentary as per-verse tabs** rather than a separate page.
8. **"Continue reading"** state memory on the homepage.
9. **Emotion/topic cards** — the life-situation layer, as gradient tiles.
10. **Verse images** — shareable graphics per verse, which also feed the social engine.
11. **Sticky app bar on mobile with social proof first** — ours reads `4.9 ★★★★★ · 500,000+
    downloads`. Never over scripture.
12. **Non-profit mission stated on reading pages**, sefaria-style.

---

## Smart App Banner — bible.com's actual implementation

Pulled from the mobile HTML:

```html
<meta name="apple-itunes-app"
      content="app-id=282935706,
               app-argument=youversion://bible?reference=JHN.3.16&version_id=111">
```

They pass **`app-argument` carrying the specific verse**, so tapping the banner opens the app *at
that verse* rather than at the home screen. Ours would be
`app-argument=bhagavadgita://chapter/2/verse/47` alongside `app-id=1602895635`.

One meta tag, rendered by Apple, deep-linked. This is the cheapest win on the whole list.

## Method, and its limits

**Mobile screenshots were taken by resizing the browser window, not by Chrome device emulation.**
That was a shortcut and it is worth knowing about before trusting these images.

What the page actually saw during "mobile" capture:

```
ua: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ...
touch: false, maxTouchPoints: 0, dpr: 2
```

A desktop Mac with no touch. So **only CSS media queries responded** — not user-agent detection,
not touch behaviour, not device pixel ratio.

**How much that mattered, measured:** fetching both pages with a desktop UA and an iPhone UA
returns **byte-identical HTML** (bible.com 90,100b both; quran.com 291,605b both). Both sites are
purely CSS-responsive, so the captured layouts are correct despite the flawed method.

**What is still unverified:** DPR-dependent assets, touch-only interactions (swipe between
chapters), iOS Safari rendering quirks, and whether hallow/calm serve by UA — they were captured
desktop-only.

## Gaps in this capture

- **Mobile screenshots only completed for bible.com**, and by window-resize rather than device
  emulation (see Method above). quran.com, sefaria, hallow and calm are desktop-only.
- **Proper device emulation could not be driven** through the browser tooling here: the screenshot
  API captures page content only, not browser chrome, so DevTools device mode is invisible and
  unclickable. Genuine iPhone/Android captures need either a human with DevTools open, or a
  Playwright-style script with a real device profile.
- Sefaria's text page had not finished loading when captured — only the chrome is visible.
- No Mobin MCP available in this session, so everything here is direct browser capture. App-store
  UI references are a separate exercise.
