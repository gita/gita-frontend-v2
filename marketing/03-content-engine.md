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

## Depicting Krishna: the corrected position

**An earlier version of this doc said "no AI-generated deity faces or voices". That was wrong,
and it was wrong in a way worth recording so we do not re-derive it.**

Dedicated research on 2026-07-25 examined seven backlash cases. **Not one of them objected to the
technology of depiction. Every single one objected to how the deity was portrayed.**

### Depicting Krishna is the tradition, not a departure from it

Hinduism is emphatically iconic. `murti`/`pratimā` — the latter explicitly including paintings —
are central, with anthropomorphic form the dominant mode governed by the _Shilpa Shastras_
([Britannica](https://www.britannica.com/topic/murti)).

The tradition has **already absorbed one mass-reproduction shock**. Raja Ravi Varma's oleographs
were commercial, machine-printed, in a then-foreign European naturalist idiom — and they _became_
the standard devotional vocabulary, flowing into prayer rooms, calendars, Amar Chitra Katha,
cinema and digital imagery
([ThePrint](https://theprint.in/ground-reports/calendar-artist-to-rs-167-cr-sale-how-raja-ravi-varma-still-defines-indias-imagination/2917079/)).
AI is structurally the next instance of that pattern.

Animated Krishna is **endorsed from inside the tradition**: _Little Krishna_ was an ISKCON
Bangalore initiative built on seven years of devotee research
([ISKCON Bangalore](https://www.iskconbangalore.org/project/little-krishna/)); _Krishna Aur Kans_
was based on Prabhupāda's _Kṛṣṇa_ book. Where ISKCON-adjacent critics complained, it was that the
animation looked "cartoonish" — a **dignity complaint, not a depiction complaint**.

ISKCON itself now runs AI outreach approvingly, including an official Bhakti Song Contest seeded
with AI-generated songs
([ISKCON News](https://iskconnews.org/bhakti-song-contest-using-ai-and-music-for-krishna-conscious-outreach/)).

**No documented case was found of reverent, iconographically-correct AI Krishna imagery drawing
religious backlash.** The researcher searched adversarially for one.

### What actually triggered each backlash

| Case                               | Real trigger                                                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Puri Jagannath, 97 images          | Deities shown **literally sick** — thermometers in mouths, compresses on foreheads. Comic literalization of the esoteric _anasara_ seclusion                  |
| Puri Jagannath, SJTA complaint     | A **fabricated ritual** — milk poured by crane, "alien to established temple rituals"                                                                         |
| Ekta Kapoor, AI Krishna (Jul 2026) | **Visible cheapness + wrong register.** "Krishna Bhagwan Hin-English bol rhe hn", "why jail and not karagaar?" No religious body objected — a _taste_ failure |
| Ekta Kapoor, _XXX_ (2020)          | Deities in an **erotic** drama. FIR                                                                                                                           |
| Ash Naidoo, Durban                 | AI images of himself **hand-in-hand with deities, wearing shoes**, positioned as their equal. Sincere intent did not save it                                  |
| Harvard (Mar 2026)                 | Krishna as a **sinister puppeteer** dangling the Pandavas. Not verified as AI at all                                                                          |
| _Adipurush_ (2023)                 | Hanuman's _tapori_ dialogue and weak VFX. **No AI involved** — proving the trigger was never the technology                                                   |

### The one real doctrinal constraint

The Hindu American Foundation has published directly on this
([HAF, Oct 2025](https://www.hinduamerican.org/blog/can-i-use-ai-generated-images-for-my-daily-prayers)),
and its position is narrower than it first sounds:

- **Not for veneration.** A worship image should interpret the deity's _dhyāna mantra_, and AI
  "has no capacity to meditate".
- **Decorative and commercial uses are explicitly permitted**, with attribution and iconographic
  accuracy.
- _"There is a real and intrinsic value in the correctness of the image, independent of sincerity
  of devotional intent."_

**HAF is not saying do not depict. It is saying do not put an AI image on the altar, and get the
iconography right.** Daily social content sits squarely inside its permitted zone.

## The actual gate

### Iconographic accuracy — our number one controllable risk

**AI generators systematically whitewash Krishna.** This is documented and specifically criticised
([Outlook India](https://www.outlookindia.com/society/imagining-white-gods-colourism-in-hindu-calendar-art-and-amar-chitra-kathas-news-297487)),
and image models carry general racial bias
([WaPo](https://www.washingtonpost.com/technology/interactive/2023/ai-generated-images-bias-racism-sexism-stereotypes/)).
Every frame gets human review against this checklist before publish:

- **Blue/dark complexion** — never lightened
- Peacock feather, correct flute grip, yellow _pītāmbara_
- Correct hand and finger count, no extra limbs or digits
- No grotesque or off-model faces

This single check would have prevented most of the quality criticism levelled at devotional AI art.

### Register

The deity may be the **subject** of an aesthetically elevated format. The deity must never be the
**punchline, the reactor, or the straight man**.

Krishna speaking modern language is fine if the register stays elevated. **No code-mixed
Hindi-English** — _karāgāra_, not "jail". That is exactly what got Ekta Kapoor mocked.

### Named living temple deities

**Avoid depicting or animating specific consecrated murtis** — Jagannath, Tirupati, Nathdwara,
Banke Bihari. These carry a protective servitor establishment and an active police posture that
generic Krishna iconography does not. Both Puri cases were about _that specific deity_.

### Genuinely off-limits

- Krishna as comedic character, punchline, reactor, or **lip-sync / "AI baby" talking-head novelty**
- Any sexualized or romantically suggestive rendering — this, not AI, is what produces FIRs
- **Fabricated rituals** presented as real
- Sinister, grotesque, horror or manipulator framing
- A human positioned as Krishna's peer; shoes or casual dress in his presence
- Presenting AI images as **objects of worship** or as photographs of real temple deities — the one
  place HAF draws a hard line and the one place "AI" genuinely matters
- Doctrinally invented teachings attributed to Krishna

### On the AI-baby format specifically

This one stays off-limits, on narrower grounds than before. The evidence cuts both ways: the
deity-in-luxury-car "aura farming" trend is a meme format, is enormous, and drew no documented
backlash. But the Jagannath thermometer images were _also_ a meme format and drew police action.

The difference is that they made the deity the **object of pity or the joke**. A talking-head
lip-sync novelty derives its entire comedic charge from incongruity — from lowering its subject.
No successful devotional precedent for it was found.

**The re-vessel alternative still stands and is better anyway:** deliver "wisdom from an
unexpected source" as a **Gita GPT screen recording** answering a modern anxiety with the verse
cited on screen. And the founder's own suggestion — **real-life situations with human
characters** — sidesteps the question entirely for a large share of content, is cheaper to
generate, and matches the modern-life-tension hooks that actually perform.

### Two cheap insurance policies

1. **Label AI-assisted imagery.** Costs nothing, pre-empts the deception objection, and distances
   us from the "mistaken for a real temple deity" failure mode.
2. **Publish a one-paragraph art policy** — we follow traditional iconography, review every image,
   and never present images as objects of worship. If challenged, this turns a controversy into a
   non-story.

### The four gates, revised

1. **Register** — is the deity the subject of something elevated, or the punchline? Punchline kills it.
2. **Iconography** — blue complexion, correct attributes, no anatomical errors, not a named temple murti.
3. **Fit** — can it carry a real verse or the app without being a stretch?
4. **Fallout** — picture the most offended devotee. Mockery, fabricated ritual, or visible cheapness kills it.

**The honest summary: a reverent non-profit Gita brand producing daily AI Krishna content is
operating well inside established practice. The real risks are iconographic sloppiness and visible
cheapness — both fully controllable — not the act of depiction.**

### Trend whitelist

**Safe to adapt:** trending-audio reels over reverent visuals; POV framing; text-on-screen
relatable struggle ("me at 3am overthinking" → 2.47); green flags/red flags; typography and
carousel trends; "read one shloka with me" routines; expectation vs reality; "things I wish I knew
sooner"; **any question-answer trend answered by Gita GPT**; **real-life scenarios with human
characters**; cinematic reverent Krishna in the "aura farming" register minus the joke.

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

- **Sign off the art policy** above (traditional iconography, human review of every frame, never
  presented as an object of worship) and publish it. The research says depiction is fine; what
  needs a decision is that we commit to the accuracy standard in writing.
- **Who holds the go/no-go** when the system is always-on, and their turnaround SLA.
- **Which translation is our public voice** for quoted verses, and whether Sanskrit +
  transliteration must always accompany the English.
- **Where the line sits for deaths of revered figures** — reverent CTA-free condolence, or silence?
  A leadership decision, not an automated default.
- **Which reverent b-roll we hold clear rights to.** This is the actual bottleneck for fast, safe
  production.
- **Whether Gita GPT itself** becomes the theme-classifier and retrieval backbone, and whether its
  current pipeline meets the verbatim-citation requirement above.
