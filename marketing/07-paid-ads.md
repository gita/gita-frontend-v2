# 07 — Paid ads: stop buying installs, start buying readers

Founder note, 2026-07-25: we already run Play Store ads, but they optimise for **installs**. That
is the problem worth fixing before spending another rupee.

> Cross-channel CPI benchmarks (Meta vs Google vs Apple Search Ads) and the Google Ad Grants
> question are still in research. This doc covers the change that matters most and does not depend
> on those numbers.

---

## The problem with install campaigns

An install-optimised campaign optimises for exactly what it says. Google's ML goes and finds the
people **most likely to tap install** — which is not the same population as people most likely to
_read the Gita_. Cheap installs from users who open once and delete are worse than useless for a
non-profit: they cost money, they drag retention cohorts down, and they teach the algorithm to
find more people like them.

We are paying for a number that does not matter to us.

## The fix: optimise for an in-app action

Google App Campaigns can bid toward an **in-app conversion event** instead of an install. You
define the event, fire it from the app, and Google's ML shifts to finding users likely to
_complete that action_. That is precisely the lookalike effect described — the algorithm starts
seeking engaged readers rather than tap-happy installers.

### Which event to pick

The event should mean "this person actually engaged with scripture", and it should fire **early
enough to generate volume**. Candidates, roughly in order:

| Event                             | Signal quality | Volume           |
| --------------------------------- | -------------- | ---------------- |
| `verse_read` (first verse opened) | Good           | Highest          |
| `chapter_opened`                  | Good           | High             |
| `audio_played`                    | Strong         | Medium           |
| `gita_gpt_question_asked`         | **Strongest**  | Lower            |
| `reading_plan_started`            | Strongest      | Lowest           |
| `day_2_retained`                  | Strongest      | Lowest, and slow |

**Start with `verse_read` or `chapter_opened`.** They are the "read at least one word" idea, and
crucially they clear the volume bar. `gita_gpt_question_asked` is a better _quality_ signal but
may not fire often enough to train the model — that is the trade-off, and it is the one that
decides whether this works.

**The volume constraint is the real risk here.** Bidding toward an event that fires only a handful
of times a day leaves the campaign permanently in learning and performing worse than the install
campaign it replaced. If our engaged-user volume is thin, use the broader event, or run
install-optimised with the conversion event merely _tracked_ until volume builds.

### What it requires

1. **Conversion tracking wired.** Firebase / Google Analytics for Firebase is free and the natural
   choice for a Flutter app — check whether `gita-flutter-2.0` already has it, since that
   determines whether this is a day of work or a week. A third-party MMP (AppsFlyer, Adjust,
   Branch, Singular) is the alternative and costs money we do not need to spend.
2. **The event defined and firing** on both iOS and Android, imported into Google Ads as a
   conversion action.
3. **Bidding switched** to target cost-per-action on that event.
4. **iOS caveat:** ATT and SKAdNetwork make iOS in-app-event optimisation materially weaker and
   slower than Android. Expect this to work well on Android first. Given our iOS build shipped on
   21 July 2026 with almost no install base, **Android is where this should run anyway.**

### What to expect

**Cost per install will go up. That is the point.** You are paying more per install and getting a
meaningfully better install. The metric to watch is **cost per engaged reader**, not CPI — and the
honest version of that is retention: D1, D7, D30 on the paid cohort versus organic.

**Do not judge it on install volume.** Volume will fall. If we measure the new campaign with the
old metric we will conclude, wrongly, that it failed.

## Sequencing

1. **Instrument first.** Confirm Firebase in `gita-flutter-2.0`, define `verse_read` and
   `chapter_opened`, verify both fire on real devices.
2. **Run install-optimised for 2–4 weeks with the events merely tracked.** This establishes the
   baseline — what fraction of paid installs ever read a verse — and it is the number that proves
   or kills the whole thesis.
3. **Then switch bidding** to the in-app action, and hold budget constant so the comparison is
   clean.
4. **Compare cohorts on retention**, not installs.

Step 2 is the one to resist skipping. Without a baseline there is no way to show the change
worked, and "it feels better" is not a result.

## Open questions

- Is Firebase already in `gita-flutter-2.0`? Determines the effort entirely.
- What is our current daily install volume, and how many of those users read a verse? This decides
  whether event-optimised bidding can get enough signal at all.
- What are we spending on Play ads today, and what is the current CPI?
- Cross-channel comparison (Meta vs Google App Campaigns vs Apple Search Ads) and whether **Google
  Ad Grants** ($10k/month free Search for non-profits) can be used for app promotion — in research.

---

**Related:** [05](05-automation-stack.md) for the organic stack; [01](01-competitor-bgfa.md) for
what BGFA runs (~500 concurrent Meta creatives plus 55 Google ads, always-on).
