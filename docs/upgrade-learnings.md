# Learnings to carry into the Bhagavadgita.com (+ app) upgrade

**Ported into `bg-frontend` on 2026-07-25**, from `radhakrishna.net/docs/bhagavadgita-upgrade-learnings.md`,
because the BG upgrade the doc was written for has now started. Keep appending here; the
radhakrishna.net copy stays as the origin.

Read alongside [`ui-reference-analysis.md`](ui-reference-analysis.md), which measures what
bible.com, quran.com and sefaria actually do, and ROADMAP items 19-23 which sequence the work.

> Source context: captured during the Radhakrishna.com revamp (see this repo's `docs/`). bg-frontend is
> currently Next 16 + Tailwind 3 + shadcn/Radix + framer-motion, warm terracotta Prakash/Nisha. It works,
> but it can jump a full tier on polish + stack.

---

## 1. Stack: go latest, go modern

- **Use the latest version of every library, deliberately.** On Radhakrishna we moved to **Tailwind v4**
  (CSS-first `@theme`, `@utility`, no `tailwind.config.js`), latest **Next 16.2.x** (patched; 16.0.x had a
  CVE), **React 19.2**, latest `tailwind-merge` v3 (needed for v4), `lucide-react`, etc. bg-frontend is on
  Tailwind 3 and older pins. Upgrade path: Tailwind 3 to 4 is the biggest change, cheapest done as a token
  pass, not late.
- **Velite for typed MDX content** (Zod-validated frontmatter, generated TS types). If BG adds
  articles/guides/blog, this beats hand-rolled gray-matter and beats `next-mdx-remote` (unstable with RSC).
- **CSS-first, semantic-first design tokens** in one place, mapped to utilities; both themes theme-aware via
  CSS vars so a toggle and `prefers-color-scheme` both work. Reuse-before-add component discipline.
- **Performance budget as a hard gate** (LCP < 2.0s, CLS < 0.05, near-zero client JS on content pages,
  next/font self-hosted, next/image WebP/AVIF). BG's verse pages should stay static + instant.
- **Modern Next 16**: PPR / Cache Components for the few dynamic islands (verse of the day, streak), Node
  runtime (not edge), `proxy` (renamed from middleware).

## 2. Design: the big jump (from "tidy/dashboard" to "immersive/luminous")

The core lesson from studying Calm, Function, Moonly, Duolingo, Co_Mory Sacko: **premium spiritual products
are immersive and atmospheric, not white dashboards.** bg-frontend today is clean but flat; this is the
upgrade.

- **Immersive, imagery-led surfaces.** Calm leads with full-bleed serene imagery. BG should lead with
  beautiful Krishna/Gita art and atmospheric grounds, not text on flat cards. This is the #1 lever.
- **Better colors + gradients.** Move from flat fills to **luminous grounds with soft radial glows**,
  gradient washes, and gold as a precious accent (light/haloes/fine rules, never a flat fill). Keep the
  warm terracotta brand, and add depth with **warm, bright glow**.
- **Brightness guardrail (founder, applies to both sites).** Krishna and the Gita are about **light,
  knowledge, color, and joy**, not gloom. Default to **bright, warm, colorful, alive** surfaces; use deep
  tones only sparingly as a vibrance/contrast accent (a hero moment, a shloka card, Gita GPT), never as the
  base. Do not let it read dull, dark, or somber.
- **Surface moods (bright-led, portable to BG):** _radiant-light_ as the default (~80%: warm cream + bright
  color-washes), _rich-accent_ used sparingly for drama (deep saturated + warm glow). One token system.
- **Nicely themed cards** (Moonly): soft, layered, larger radius, gentle inner gradient, a faint glow, hover
  warmth (a gold ring). BG's chapter/verse/commentary cards can look premium instead of utilitarian.
- **Frosted-glass nav**, pill shapes, translucency (Calm). Refined, not a hard bordered bar.
- **Refined typography** carries polish: an editorial display serif, an _italic_ serif for signature lines
  (the Function move), generous line-height + measure, tasteful letter-spacing, tabular numerals. BG already
  has Crimson Pro + a verse scale; push the display treatment further.
- **A crafted wordmark/logo**, not a thin geometric icon. A real lockup with a gradient + glow mark that
  holds up at favicon size.
- **Calm, ambient motion** only (GPU transform/opacity): gentle fade-ups, a soft glow drift, hover warmth;
  respect `prefers-reduced-motion`. Never busy.

## 3. Duolingo learnings: character + gamification + retention

Duolingo's polish comes from a **character (the owl mascot)** + **gamification** + friendly, confident UI.
Both are transferable to BG, which is a daily-practice product at heart.

- **An avatar / guide character for BG.** Options to explore (pick one, do it with real craft, not clip-art):
  - A friendly **Krishna-as-guide** avatar (the sarathi / charioteer-guide framing fits the Gita perfectly:
    Krishna guiding Arjuna = the app guiding the seeker). Strong, on-theme, emotionally warm.
  - A **Ved Vyas sage** narrator character (ties the whole network to the parent brand).
  - A gentle abstract "diya/flame" companion (lower risk than a deity avatar, still characterful).
  - Reuse across: onboarding, Gita GPT (a face for the AI), daily-verse nudges, empty states, streak
    celebrations. A recurring character is what makes Duolingo feel alive vs a reference app.
  - Caution: a deity avatar must be reverent and tasteful (this is scripture, not a game mascot). Keep it
    dignified; test with the community. The charioteer-guide or diya routes are safer than a cartoon deity.
- **Gamification for daily practice** (Duolingo's real engine): reading **streaks** (chapters/verses read),
  gentle progress rings, a daily goal, "continue where you left off," milestone celebrations. Maps cleanly
  onto BG's verse-by-verse structure and directly serves retention (the metric that matters).
- **Friendly, confident components:** big rounded pill buttons, playful-but-refined cards, clear single
  primary action per screen, delightful micro-moments (a small glow/animation on completing a chapter).

## 4. Other cross-property learnings worth porting

- **Content structure for AI search (GEO/AEO)** from `docs/01`, `docs/06`: answer-first blocks,
  question-led headings, scripture citations with chapter/verse, connected schema `@graph`, semantic HTML,
  information-gain gate. BG's verse + commentary pages are already citable; structure them to win AI
  citations (Bhagavad Gita queries are massive in AI answers).
- **Factual-accuracy / verification pipeline** (`docs/06`, D15): parallel.ai + multi-source corroboration +
  real editorial identity (Samanyou + Ved Vyas Foundation) + a published "How we verify" page. Same trust
  bar for BG's translations/commentaries. No fabricated authority.
- **Daily-habit engine**: verse of the day + streak + share (BG already has verse-of-the-day; add the
  streak + share + notification loop for retention).
- **Dynamic OG images** (next/og), per-page schema, image sitemaps, hreflang done as a build-time invariant
  (BG is multilingual; enforce reciprocal hreflang in CI, no auto-redirect).
- **Shared brand system across the network** (Prakash/Nisha base + per-property signature): Radhakrishna =
  peacock-blue-led; BG stays terracotta-led; both get the luminous-dark/warm-light treatment + gold. Keep
  the family resemblance, give each a distinct signature.
- **The reference-corpus method itself**: use Mobbin (`search_sections` for websites) + scrape the real
  sites, save screenshots to `design/references/`, and run the head-of-brand loop (build → screenshot →
  compare to reference → name gaps → fix) until it matches the bar. Corpus for this project lives in
  `design/references/` (Calm, Function, Moonly, Duolingo, Co_Mory Sacko, 5 Minute Journal, Waking Up,
  mymind).
- **Cross-linking**: keep network links contextual/editorial, not heavy sitewide boilerplate (site-reputation
  hygiene), while still wiring the org entity graph (`sameAs`).

## 5. Open ideas to evaluate for BG (keep adding)

- A **Gita GPT** face/avatar (the guide character) to make the AI feel like a companion, not a text box.
- **Audio-first daily practice** (chanting/recitation) as a luminous-dark surface with a glowing player
  (Calm's audio polish).
- **Chapter "journeys"** (Duolingo-style path) through the 18 chapters, with progress + streaks.
- **A darshan/meditation mode** (ambient, full-screen, gentle motion) for verse contemplation.
- **Premium share cards** (shloka + translation, typography-in-image via gpt-image-2) for Instagram/WhatsApp,
  same engine as Radhakrishna (`docs/04`).

---

_Living doc. Append new learnings as the Radhakrishna build surfaces them. Port to `bg-frontend` when the
BG upgrade begins._
