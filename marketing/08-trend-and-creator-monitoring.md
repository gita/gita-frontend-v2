# 08 — Trend detection and creator monitoring

How we find out what is working, weekly, without paying for it. Research date 2026-07-25, from
primary API documentation.

---

## The correction that matters most

**Earlier docs in this folder said to "A/B the hook and creative". That is not a valid thing to do
on organic social, and we should stop calling it that.**

The reasons are structural, not fixable with more discipline:

- **View counts are power-law distributed.** Mean and standard deviation are unstable estimators;
  standard significance tests assume conditions that do not hold.
- **There is no randomisation.** Post A and post B go to different, algorithmically-selected
  audiences at different times. That is two observations from different populations, not an
  experiment.
- **Samples are not independent.** Last post's performance influences the next post's distribution.
- **Time confounds everything** — day, hour, news cycle, and ranking changes we are never told about.

With the variance typical of organic view counts, detecting even a 20–30% true effect would need
**well over 50 posts per variant**. At 3–5 posts a week that is **six months per test**, by which
point the algorithm has changed underneath us and invalidated the result. The test can never
finish.

### What to do instead

**1. Outlier mining, not hypothesis testing.** Stop asking "is A better than B". Ask "which posts
landed in the top decile, and what do they share?" That is exploratory pattern-finding on
observational data — useful, and honest about what it is.

**2. Require a repeated effect before believing anything.** A format needs **≥5 posts** and a
**median outlier ratio ≥1.5×** baseline before we commit to it. One viral hit is noise.

**3. For real causal answers, use paid.** This is the genuine unlock and it is cheap:
**₹300–800 (~$5–10) per variant** on Meta or YouTube buys actual randomised delivery, controlled
budget, and clean hook-retention metrics **in 48 hours**. Roughly **$40/month on creative testing
teaches us more than six months of organic guessing.** If we spend money anywhere beyond the
install campaign, spend it here.

## The metrics that actually work

Raw view counts are useless for comparison — confounded by account size and algorithmic
amplification. Use normalised, outlier-oriented measures:

| Metric                 | Formula                                            | What it tells you                                                                                  |
| ---------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Outlier ratio**      | `post_views / median(last 20 posts, same account)` | **The one that matters.** Self-normalises away account size and niche. **≥3.0 = copy this format** |
| **Views per follower** | `view_count / followers_count`                     | >1.0 means the algorithm pushed it beyond the existing audience                                    |
| **ER by reach**        | `(likes + comments) / views`                       | How compelling it was to people actually shown it. High views + low ER = strong hook, weak payoff  |
| **Comments per like**  | `comments / likes`                                 | Proxy for discourse. Drives reach disproportionately                                               |

**Always median, never mean** — one viral post destroys a mean.

**Saves and shares are the highest-intent signals and Instagram weights them most heavily — but we
can only see them on our own content.** So there are two measurement regimes: saves/shares for our
posts, outlier ratio and VPF for competitors. Do not mix them in one comparison.

## YouTube: effectively free and unlimited at our scale

**The quota model changed, and it changed in our favour.** Google split it into separate buckets
([Google](https://developers.google.com/youtube/v3/determine_quota_cost)): `search.list` now costs
**1 unit** in its own **100 calls/day** bucket, and the **10,000-unit shared pool is free for
everything else**. Under the old model 100 searches consumed the entire day.

The efficient pattern never touches search:

```
channels.list?id=<50 IDs>            → ceil(N/50) units. Returns stats + uploads playlist ID
playlistItems.list?playlistId=<...>  → 1 unit per channel
videos.list?id=<50 video IDs>        → ceil(V/50) units. Full stats
```

`units = ceil(N/50) + N + ceil(V/50)`

| Channels | New videos/wk | Units/run | % of **one day's** quota |
| -------- | ------------- | --------- | ------------------------ |
| 50       | 400           | **59**    | 0.6%                     |
| 200      | 1,600         | **236**   | 2.4%                     |
| 500      | 4,000         | **590**   | 5.9%                     |

**We could monitor ~2,000 channels weekly without strain.** For 30–100 competitors we will use
under 1% of allowance. We will never pay Google for this.

### India trending, in one call

```
GET /videos?part=snippet,statistics,contentDetails
    &chart=mostPopular&regionCode=IN&maxResults=50
```

**1 unit**, and it returns full video resources so statistics come back in the same call.
Add `videoCategories.list` and loop the ~15 assignable categories: **~17 units for a complete
India trending snapshot sliced by category.** We could run this hourly and use 4% of quota. Daily
snapshots into a table give a velocity and decay curve within two weeks.

### Available fields

`viewCount`, `likeCount`, `commentCount`, `publishedAt`, `title`, `description`, `tags`,
`categoryId`, and `contentDetails.duration` (ISO 8601) — **the best free proxy for Shorts vs
long-form**. Note `dislikeCount` has been private since Dec 2021 and `favoriteCount` is deprecated,
always 0.

One thing to test empirically before designing around it: the docs do not explicitly confirm
`snippet.tags` is returned for videos we do not own. Run one call against a competitor video first.

## Instagram: official, free, and better than expected

**`business_discovery` is alive and Meta is actively investing in it.** The changelog shows a
**June 2025** addition of `view_count` for Reels to this exact endpoint
([changelog](https://developers.facebook.com/docs/instagram-platform/changelog)) — they are adding
fields, not deprecating it.

```
GET /v23.0/{IG_USER_ID}?fields=business_discovery.username(TARGET){
      followers_count, media_count,
      media.limit(12){ id,caption,like_count,comments_count,view_count,
                       media_type,media_product_type,permalink,timestamp } }
```

**Rate limit: 200 calls/hour** — monitoring 60 competitors weekly uses 30% of a _single hour's_
allowance.

### The one hard requirement

There are two Instagram API flavours and only one works:

- **Instagram API with Facebook Login** — requires the IG Business/Creator account **linked to a
  Facebook Page**. This is the flavour that can read other businesses' data. ✅
- **Instagram API with Instagram Login** (standalone, no Page) — own account only. **No
  `business_discovery`.**

**So the account must be linked to a Facebook Page.** Worth confirming before anything else.

Budget for an **App Review** submission. The reference page does not state whether
`business_discovery` specifically requires the Instagram Public Content Access feature, but
`ig_hashtag_search` explicitly does, and historically business_discovery needed Advanced Access.
Development Mode works immediately against our own accounts, so build and test while review runs.

### The blind spots, stated plainly

- **Saves, shares and reposts on competitor posts: never.** Added April 2026 but for our own media
  only. These are the best format-quality signals and we cannot see them on anyone else.
- **Stories: no access at all** for other accounts.
- **Reach, impressions, watch time, retention, follower demographics: none** for competitors.
- Age-gated and personal (non-business) accounts are invisible.

What remains — follower count, per-post likes, comments, Reels views, caption, media type,
timestamp — is enough for engagement rate, views-per-follower, cadence, format mix and outlier
detection. That is roughly 90% of what we need.

### Hashtags, with a hard cap

`ig_hashtag_search` works but: **"a maximum of 30 unique hashtags within a 7 day period."** Pick a
fixed set of ~25 and rotate deliberately. Never build anything that discovers hashtags dynamically.

## Trending audio: there is now an API

**The standout find.** Instagram launched an
[Audio API on 1 June 2026](https://developers.facebook.com/docs/instagram-platform/content-publishing/audio-api):

```
GET /v23.0/ig_audio?audio_type=original_sound&user_id={IG_USER_ID}
```

> "When a search query is omitted, **trending** original sounds or music are returned by default."

**An official, free, programmatic trending-sound feed.** The Professional Dashboard is no longer
the only route. Snapshot it weekly and we get a trending-audio time series that nobody else on a
zero budget has. Same Facebook Login requirement as `business_discovery`, so one setup unlocks both.

Caveat: it returns audio "authorized for third party use", so it is a subset of what the native app
shows — directionally excellent, not exhaustive.

## Two things that will not work, and why

**Meta Ad Library API cannot see India commercial ads.** The decisive line: _"Ads that did not
reach any location in the EU will only return if they are about social issues, elections or
politics"_ ([Meta](https://developers.facebook.com/docs/graph-api/reference/ads_archive/)). A
competitor running India-only commercial campaigns is **invisible to the API**. The public web UI
does show them — so **BGFA ad monitoring stays a 10-minute manual weekly check**, which is how we
counted their ~500 creatives in the first place.

**TikTok is banned in India.** Creative Center has no public API anyway, and India is not in its
region list. Its real value is as a **leading indicator** — format trends migrate TikTok → Reels →
Shorts on a 2–6 week lag. Treat it as a 15-minute manual weekly review, not a pipeline component.

TikTok's Research API returns rich data and notably states it serves "non-academic not-for-profit
orgs within confined parameters" — worth one application, but do not block anything on it.

## Format trends: nobody sells this, so we build it

**No free tool tells you "3-second hook cuts are winning."** Products that claim to (Foreplay,
Motion, and similar) are paid, ad-focused, and out of budget.

But the metadata we can legally get is enough to _classify_ format ourselves:

| Dimension                                  | Free signal                                            |
| ------------------------------------------ | ------------------------------------------------------ |
| Short vs long                              | YT `contentDetails.duration`; IG `media_product_type`  |
| Carousel vs single                         | IG `media_type` = `CAROUSEL_ALBUM` / `IMAGE` / `VIDEO` |
| **Hook style, text overlay, talking-head** | **Vision model on the thumbnail**                      |
| Title/caption pattern                      | Regex + LLM on `title` / `caption`                     |
| Audio-led                                  | Audio API trending list ∩ competitor Reels             |
| Captions burned in                         | YT `contentDetails.caption`                            |
| Cadence and timing                         | `publishedAt` / `timestamp`                            |

**Run ~200 competitor posts a week through a cheap vision+text model against a fixed 8–12 label
taxonomy**, store the label beside the engagement metrics, group by label. A few dollars a month in
tokens, and we have built the "format trends" product ourselves. Nobody sells it because the
taxonomy has to be domain-specific anyway — "shloka card", "leela retelling", "modern-life POV" are
not categories a generic tool would have.

**The taxonomy must be fixed and small, and our own posts must be tagged in the same schema at
publish time.** Without that, the analysis is impossible later.

## How to run it

Two options, and the honest recommendation is to start with the cheaper one.

### Option A — manual, in the weekly session (start here)

The pulls above are a handful of HTTP calls. Done inside the Saturday planning session, they cost
nothing, need no code, and no maintenance. **Start here and prove the ritual is worth keeping.**

### Option B — GitHub Actions (add once it has proven itself)

| Runner          | Free allowance         | Our weekly 10-min job    |
| --------------- | ---------------------- | ------------------------ |
| **Public repo** | **Unlimited, forever** | $0                       |
| Private repo    | 2,000 min/month        | ~43 min/month = **2.2%** |

GitHub Actions beats Vercel cron (Hobby is once-per-day minimum with ±59min jitter and function
timeouts) and beats Supabase `pg_cron` (10-minute job ceiling, awkward retries). It gives a full
runtime, free secrets, built-in retries, and **a log UI a non-technical person can check when
something breaks** — which matters more than it sounds for an organisation with no engineer on
staff.

One gotcha: **GitHub disables scheduled workflows after 60 days of repo inactivity.** Add a
`workflow_dispatch` keepalive.

## What to ask for

**Now, free:**

1. **A YouTube Data API key** — five minutes in Google Cloud Console. Backbone of the whole thing.
2. **Confirm Instagram is a Business/Creator account linked to a Facebook Page** — gates
   `business_discovery`, the Audio API, _and_ Business Suite scheduling.

**Later, only if needed:**

- Apify Starter $29/mo — only if `business_discovery` proves insufficient. At free-tier rates,
  50 competitors × 12 posts weekly runs ~$7/month, just over the $5 free credit.
- ~$40/month paid creative testing — **the one place worth spending**, per the top of this doc.

---

**Related:** [03](03-content-engine.md) trend gates and reverence; [06](06-video-pipeline.md)
production; [02](02-creator-landscape.md) the accounts to monitor.
