# 03 — The content engine: daily social, trends, and newsjacking

Research date: 2026-07-25. This is the doc that turns "one post a day, automated, never generic"
into something a machine can actually run without embarrassing us.

---

## The rule everything else hangs off

**The AI never writes scripture.**

A model may classify a theme, draft a caption, or propose a verse _ID_. It may never generate
verse text or a verse number that then gets published. A deterministic function pulls the
Sanskrit, transliteration, translation and chapter.verse **verbatim from our own database by ID**.
Anything the model "writes" as scripture is discarded.

This is not caution for its own sake. Grounded LLMs still produce citation-shaped hallucinations —
a real-looking verse number attached to a claim the verse does not support — at rates measured up
to ~33% in comparable high-stakes retrieval domains
([ACL 2026](https://aclanthology.org/2026.acl-industry.109.pdf)). And distorted-Gita content
already circulates on Indian social media, so a misattributed verse from _us_ would not read as a
one-off slip. It would feed an existing distrust narrative.

Retrieval-only design removes the ability to hallucinate a citation, structurally.

## The reverence gate

Every piece of trend-derived content passes four gates. All four, or it dies.

1. **Reverence** — does this require depicting, voicing, animating, or joking about a deity?
   **If yes, kill or re-vessel.** No exceptions.
2. **Fit** — can it carry a real verse, or the app/Gita GPT, without being a stretch?
3. **Feasibility** — can we ship in under 48h with assets we already hold?
4. **Fallout** — picture the most offended devotee seeing it. If it could read as mockery, kill.

### On the AI-baby trend specifically

You flagged the talking-AI-babies trend as an example of what to ride. **The literal version is
the one thing we must not do**, and the reason is concrete rather than squeamish:

- The format structurally requires putting a **synthetic face and voice on its subject**. Applied
  to Krishna, that is an AI-generated deity.
- AI depictions of Hindu deities have repeatedly triggered removals and organised backlash — Puri
  police had **97 AI images of Jagannath deities removed**
  ([source](https://www.dinalipi.com/97-ai-generated-misleading-images-of-jagannath-temple-deities-removed/)),
  and both Ekta Kapoor and Harvard have drawn Hindu-group backlash over similar.
- It reframes divine teaching as a cutesy meme, which erodes the exact authority the brand exists
  to hold. The earlier GTM plan reached the same conclusion independently.

**The move that keeps the upside:** ride the trend's _energy and audio_, re-vessel the subject.
The format's actual appeal is "wisdom from an unexpected source". Deliver that as a **Gita GPT
screen recording** answering a modern anxiety, with the verse cited on screen. The AI speaks. The
scripture is quoted. No divine figure is animated. That converts your instinct into installs
_and_ keeps the deity out of a meme template.

### Whitelist / blacklist

**Safe to adapt:** trending-audio-only reels over reverent visuals; POV framing; text-on-screen
relatable struggle ("me at 3am overthinking" → 2.47 on action without attachment); green
flags/red flags; typography and carousel trends; "read one shloka with me" morning routines;
expectation vs reality; "things I wish I knew sooner"; **any question-answer trend answered by
Gita GPT**.

**Never, literally:** AI or deepfake faces/voices of any deity; deity as comedic character or
punchline; dance/lip-sync performed by a divine figure; sacred art morphed onto meme templates;
crude or explicit audio over sacred imagery; shock, sexualised, political, or mockery formats.

## Weekly trend scan — 45 minutes, Monday, all free

1. **TikTok Creative Center** → Trends → Songs, filter **Breakout** (not Popular — Breakout is
   pre-peak). Then Hashtags → rising. Then the Videos tab for format ideas.
2. **Instagram** Professional Dashboard → Trending audio (a top-50 list refreshed every few days).
   **This is the fastest reverent lever**, because you adopt the sound, not a meme visual.
3. **YouTube Studio** → Analytics → Trends (your own audience's 28-day searches).
4. **X trends + Grok** (free tier) for real-time topic brainstorming.
5. **Google Trends** "Trending now" + Exploding Topics breakout terms.

Log 5–10 candidates to one sheet. Run each through the four gates.

**Timing discipline:** trends peak in **3–5 days**, and mainstream adoption _shortens_ their life
rather than extending it. Target **spot-to-post within 48–72h**, with a ~90-minute go/no-go
decision rather than reflexive posting. If a sound is already labelled "Popular", skip it — the
window has closed. If a reverent adaptation beats baseline in the first 3–6 hours, immediately
spin 1–2 variants while the sound is still rising.

**Keep an evergreen verse bank** — 20–30 common modern struggles (anxiety, failure, comparison,
grief, procrastination, anger) pre-mapped to specific shlokas, human-vetted once. When a trend
lands, content becomes assembly in minutes rather than research under time pressure.

## Newsjacking: relating current events to the Gita

The design is the same retrieval-only pipeline, plus one extra gate, because **the failure mode
here is taste, not accuracy**.

Every canonical newsjacking disaster was a brand attaching a growth CTA to somebody's suffering:
Kenneth Cole and the Arab Spring, DiGiorno hijacking #WhyIStayed, AT&T's 9/11 promo, the Hurricane
Sandy brands. None of them got a fact wrong. They got the tone catastrophically wrong.

### The solace-vs-sell test

> Read the post as if you just lost someone in the event. If the CTA would feel like
> profiteering, strip the CTA or kill the post.

Comfort is allowed. Capitalising is not. That single test would have caught every example above.

**Tragedy gate, partly automatable:** GDELT tags every story with tone and 100+ themes, so death,
disaster, war, terror, communal conflict, crime and accidents can be auto-flagged. Flagged items
get exactly two permitted outcomes — **skip**, or a **reverent, CTA-free comfort post** with no
link, no install ask, no hashtag stuffing, and only if a human editor opts in. Positive and
neutral cultural moments (festivals, sports wins, space milestones, New Year) are the only lane
for growth-oriented posts with a soft CTA.

### Pipeline

```
GDELT (free, no key, 15-min refresh, theme + tone tags)
  └─> tragedy filter (auto-flag, human-only override)
       └─> LLM classifies ONE evergreen theme, or "no clean match → skip"
            └─> semantic search over the VETTED verse bank only (never all 700)
                 └─> second pass: "does this verse's accepted meaning genuinely support
                     this theme? cite the commentary line"
                      └─> GATE 1 human: verse-support     ─┐
                      └─> GATE 2 human: tone / solace-sell ─┴─> publish
```

**No auto-publish for newsjacking. Ever.** A human yes/no on pre-vetted candidates takes under 10
minutes and is the entire difference between the Oreo outcome and the Kenneth Cole outcome.

**Cadence: 3–4 newsjacks a week, not daily.** Force-fitting a verse to every trend is precisely
how a brand generates slop. The daily quota is filled by evergreen wisdom content; newsjacking is
the opportunistic topper when something genuinely resonant and safe appears.

**Citation format, non-negotiable:** "Bhagavad Gita, Chapter X, Verse Y", translator named, verse
text exactly as stored. Commentary is clearly our voice; the verse is clearly quoted. Never
paraphrase scripture in our own voice and present it as the verse.

**Log every published match** (trend → theme → verse → approver) so we can defend any verse choice
publicly if challenged, and so we build a dataset of what resonated.

## The daily grid

Daily cadence is what keeps an account alive; spectacle and collabs are what actually grow it.
BGFA's daily reels do ~40–50K while their outliers do 1.3M–9.7M. Plan for both.

| Day | Format                                                | Automatable?               |
| --- | ----------------------------------------------------- | -------------------------- |
| Mon | Verse of the day card (Remotion template)             | Yes, with verse-text proof |
| Tue | Reel: trending audio + reverent visual + verse payoff | Draft auto, human gate     |
| Wed | Carousel: one teaching in 5–8 slides                  | Yes, with proof            |
| Thu | Gita GPT answers a real question (screen recording)   | Yes — no deity depicted    |
| Fri | "What the Gita says about [modern struggle]"          | Yes, from verse bank       |
| Sat | Leela art / devotional image                          | Yes, reverence review      |
| Sun | Festival, tithi, or long-form clip                    | Calendar-driven            |

Plus **3–5 engineered spectacle pieces per quarter** (cosmic-form Vishwarupa scale, cinematic
b-roll) budgeted as the reach unlock, and **collab moments** where possible.

**Hooks:** second-person question first, scripture as the payoff. "What if results were never the
point?" outperforms "Bhagavad Gita 2.47 says…". This is the cheapest lever in the entire system.

**CTA:** adopt the comment-to-DM mechanic — "Comment GITA and we'll DM you the free app link."
It works organically at zero media cost, drives the comment signal, and opens a DM path.

## What must be decided before this runs hands-off

- **The deity-depiction policy.** Classical art only? AI-generated reverent scenes with no faces?
  Any AI Krishna at all? Everything above assumes **no AI-generated deity faces or voices**. This
  needs the Foundation's explicit sign-off, and it is the single most important call here.
- **Who holds the go/no-go** when the system is always-on, and their turnaround SLA.
- **Which translation is our public voice** for quoted verses, and whether Sanskrit +
  transliteration must always accompany the English.
- **Where the line sits for deaths of revered figures** — reverent CTA-free condolence, or silence?
  A leadership decision, not an automated default.
- **Which reverent b-roll we hold clear rights to.** This is the actual bottleneck for fast, safe
  production.
- **Whether Gita GPT itself** becomes the theme-classifier and retrieval backbone, and whether its
  current pipeline meets the verbatim-citation requirement above.
