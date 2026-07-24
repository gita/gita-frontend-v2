# 06 — The AI video pipeline

How we actually produce ≥1 on-brand video a day. Written 2026-07-25 against the models live in
our Higgsfield account, not from a blog post.

---

## The question is settled

Animated Krishna content is a mainstream, institutionally-backed category. A SERP pull on
2026-07-25 returns:

- **Little Krishna** (Big Animation) — an **ISKCON Bangalore** initiative, still publishing 4K
  marathons in Jan 2026, and **aired on Pogo**
- **Bhagvad Gita animated series** — Shemaroo Bhakti Darshan
- **Bhagavad Gita web series** — Harikatha Studio, 4K, 2024
- **The Bhagavad Gita kids animation** — AppuSeries
- And tellingly: _"Krishna 3d Animation Story video AI Se Kaise Banaye"_ — there is already a
  tutorial economy teaching people to make exactly this with AI

This is a crowded, healthy, high-watch-time category with temple-adjacent producers in it. The
constraint was never permission. **It is quality and consistency**, which is what this doc solves.

## The core mechanic: lock the character once

This is the whole pipeline in one idea.

**Seedance 2.0** (Bytedance, in our account) accepts an `image_references` input and is built for
**consistent identity across generations**. So:

1. Generate **one canonical Krishna reference image**, iconographically perfect
2. Human-validate it _once_, hard, against the checklist below
3. Feed that same reference into **every** video generation, forever

Two things fall out of this, and both matter:

- **Every video has the same Krishna.** That is what makes a channel look like a channel rather
  than a slot machine. It is also the thing most AI devotional content fails at.
- **Iconographic accuracy stops being a per-video risk and becomes a one-time QA task.** The
  colorism problem — generators lightening Krishna's complexion — gets solved once, at the
  reference, and every downstream frame inherits it. This is the single highest-leverage quality
  control available to us.

## The models we actually have

| Model                 | Role                                 | Why                                                                                          |
| --------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Soul Cast**         | Build the canonical character        | Higgsfield's "consistent cinematic character identity" model. Purpose-built for exactly this |
| **Nano Banana Pro**   | Reference stills, shloka/quote cards | Best-in-class text rendering, up to 4K. The one to trust with Devanagari                     |
| **Seedance 2.0**      | The daily workhorse video            | `image_references` + consistent identity, 4–15s, up to 4K, native audio                      |
| **Seedance 2.0 Mini** | High-volume/cheap variant            | Same reference mechanic, 480p/720p, "fast budget"                                            |
| **Kling v3.0**        | Multi-shot sequences                 | Multi-shot, audio sync, motion transfer                                                      |
| **Veo 3**             | Hero pieces only                     | Cinematic, reliable, expensive                                                               |
| **Wan 2.7**           | Character + synced audio             | Alternative when Seedance misses                                                             |

**Budget:** the account holds **5,522 credits** on the creator plan. At roughly 15–25 credits for
a standard video and 40–70 for a premium one, that is **~220–350 videos already paid for** — close
to a year of daily posting with zero incremental spend. This is the answer to the budget problem:
the video engine is effectively pre-funded.

Use **Seedance Mini** for routine daily output and save **Veo 3 / Seedance std at 4K** for the
handful of spectacle pieces per quarter that actually drive reach.

## Higgsfield's bundled workflows

Two of these are built for what we want, and we should use them rather than hand-rolling:

- **`faceless-video`** — narrator-led explainer/story videos for Shorts/Reels. It explicitly
  _"builds a locked visual style + reusable character/location/prop assets, tells a scripted story
  driven by one voiceover"_, with a "Kids / History / Explainer" channel type. That is a Krishna
  story channel described almost exactly.
- **`video-explainer`** — narrated non-photoreal animated explainer, one narrator over stylized
  10-second blocks, a single style key locking the look, optional mascot.

Also available: **`youtube-thumbnail-generator`** for covers, which matters more than it sounds —
thumbnails carry click-through on Shorts and long-form alike.

## The canonical asset set (build once)

Before any daily production, build and lock:

1. **Krishna character reference** — validated against the iconography checklist
2. **Arjuna character reference** — for Gītā upadeśa scenes
3. **Style key** — one locked visual style so every video looks like the same channel
4. **Location plates** — Vrindavan, Kurukshetra chariot, Govardhan, riverbank
5. **Typography template** — verse card layout, in Remotion, for the text-led format

### The iconography checklist

Validate the reference against this, then never re-litigate per video:

- [ ] **Blue/dark complexion, never lightened** — the failure mode generators default to
- [ ] Peacock feather, correct placement
- [ ] Correct flute grip and finger count
- [ ] Yellow _pītāmbara_
- [ ] No extra limbs or digits, no off-model face
- [ ] Not modelled on a specific consecrated temple murti (Jagannath, Tirupati, Banke Bihari)

## The four production tracks

Not everything should be a Krishna animation. Mix by cost and purpose.

| Track                         | What                                             | Cost       | Deity shown? |
| ----------------------------- | ------------------------------------------------ | ---------- | ------------ |
| **1. Verse cards**            | Remotion template, JSON in, video out            | **~$0.02** | No           |
| **2. Real-life scenarios**    | Modern situation → Gita answer, human characters | Low        | No           |
| **3. Krishna story/teaching** | Locked reference → Seedance                      | Medium     | Yes          |
| **4. Gita GPT demos**         | Screen recording, real question answered         | **~$0**    | No           |

**Track 1 is the floor that guarantees the daily post.** Remotion is free for non-profits, renders
at ~$0.02, and is fully deterministic — no model can wander off-brand. It carries the baseline so
the generative budget is spent where it earns.

**Track 2 is the one to lead with.** Modern-life tension is what actually converts — it is the
shape of every hook that works in this niche — it needs no deity depiction, and it is the cheapest
generative content to produce.

**Track 3 is the differentiator**, and where the locked reference pays off.

**Track 4 is free and converts best**, because it demonstrates the product doing the thing.

## Daily pipeline

```
1. SELECT   verse + theme from the vetted bank (or trend, if one passes the gate)
2. SCRIPT   hook (second-person question) → tension → verse → one practical action
            └─ verse text pulled VERBATIM by ID, never generated
3. ASSET    Track 1: Remotion JSON
            Track 2/3: Seedance + locked character reference
            Track 4: screen recording
4. AUDIO    native model audio, or devotional bed (Mahabharat Theme register)
5. GATE     human: iconography (if deity) + verse accuracy + register
6. PUBLISH  native schedulers — IG, FB, YouTube, X, Pinterest
7. LOG      format, hook, verse, views, saves, installs
```

**Step 5 is the only human step**, and once the character reference is locked it is fast — verse
accuracy and register, not a frame-by-frame art review.

Higgsfield's **`virality_predictor`** is available and worth using as a pre-publish filter on
Track 2/3 output, to kill weak hooks before they enter the queue.

## What to build first

1. **Generate and lock the Krishna reference.** Everything else depends on it. Do this properly,
   iterate until the iconography is right, then freeze it.
2. **Build one Remotion verse-card template.** That alone guarantees the daily post at ~$0.
3. **Produce 5 Track-2 real-life videos** and test them against 5 Track-3 Krishna videos. Let the
   data pick the ratio rather than guessing.
4. **Load `faceless-video`** and run one full Krishna story end to end to learn the workflow.
5. Only then automate the loop.

---

**Related:** reverence and register guidance in [03](03-content-engine.md); publishing and
scheduling in [05](05-automation-stack.md).
