# 04 — Retention: email and push across web, iOS and Android

Research date: 2026-07-25. Covers the website plus the Flutter app (`gita-flutter-2.0`).

---

## Recommended stack

| Layer                      | Pick                                                             | Cost at our scale                                          |
| -------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| Push (iOS + Android + web) | **OneSignal** on FCM/APNs                                        | **$0** (free tier), $19/mo when we need branching journeys |
| Email — daily verse blast  | **Resend transactional tier** (or Amazon SES if volume explodes) | $0–90/mo                                                   |
| Email — weekly + festivals | **Resend Broadcasts + Audiences**                                | included above                                             |

**Roughly $0–90/month**, which is the point for a non-profit. Braze (~$50k/yr minimum) and
Airship (~$30k+/yr) are enterprise-only and were ruled out on budget.

### Why OneSignal over raw FCM

FCM is free, unlimited, and has a first-party Flutter plugin — and it ships **no segmentation, no
scheduling beyond basic campaigns, and no lifecycle orchestration**. All of that would have to be
built in-house.

OneSignal wraps FCM + APNs + web push in one console with segmentation, A/B testing, scheduling
and analytics. Free tier gives **unlimited mobile push** plus 10,000 web-push subscribers. It
rides on FCM/APNs anyway, so this is a control-plane decision, not a delivery one.

Free-tier limits worth knowing: 1 journey / 2 steps, and Intelligent Delivery is paid. Growth at
$19/mo lifts both; web push beyond the free cap is $0.004/subscriber.

### Why the email split

This is the one genuinely non-obvious finding. Resend bills on **two separate tracks**:

- **Transactional, volume-priced:** free 3,000/mo → $20 for 50k → $90 for 100k → $1,150 for 2.5M
- **Marketing/Broadcast, contact-priced:** free 1,000 contacts → $40 for 5k → $650 for 150k
  contacts, unlimited sends

A **daily** verse-of-the-day to a large list is a high-volume, low-variety send. Contact-based
pricing punishes that. So:

- **Daily verse → volume-priced sending** (Resend transactional, or **Amazon SES at ~$0.10 per
  1,000** if we get large), with our own List-Unsubscribe headers and suppression table
- **Weekly newsletter + festival blasts → Resend Broadcasts**, where the audience tooling earns
  its cost and RFC 8058 headers are injected automatically

**RFC 8058 one-click unsubscribe** has been mandatory for bulk senders above 5,000 messages/day to
Gmail and Yahoo since June 2024. Resend Broadcasts handles it — **but only when an Audience is
attached**. Without one, the merge variable renders empty and compliance silently fails. That is a
real trap worth a test send before launch.

If we self-manage the daily blast, we own the `List-Unsubscribe` and `List-Unsubscribe-Post`
headers ourselves.

## The retention flows

### Verse of the day

Store each subscriber's **preferred local delivery time and timezone**. Render one templated email
and one push per day at that local time, both fed by **a single content record** so the two
channels never contradict each other.

### Onboarding drip (on signup)

- **Day 0** — welcome, set expectations, let them pick their verse delivery time
- **Day 1** — introduce Gita GPT with a sample question
- **Day 3** — start a reading plan (Chapter 1)
- **Day 7** — nudge the free app install, OS-appropriate store link

### Reading plans

Fire "Continue Chapter X" **only** when the user has an active plan _and_ has not opened in 24–48h.
Deep-link straight to the next unread verse, never the home screen. Suppress the moment they
resume.

### Streaks

Evening "streak at risk" push only to users **who have an active streak** and have not read today.
Celebratory push at 7 / 30 / 108 days. **Never send streak nudges to users with no streak** — it
reads as nagging and drives opt-outs.

### Festivals

Pre-schedule Gita Jayanti (Mokshada Ekadashi), Janmashtami, Ram Navami, Holi and Diwali with the
relevant verse and theme. These are the year's highest-intent and most shareable sends.

### Win-back

14 / 30 / 60 days inactive, progressively spaced: a favourite-verse recap, then "your reading plan
is waiting", then a single soft goodbye that also confirms preferences. **Then stop** — to protect
deliverability and to respect the reader.

## Notification fatigue: the number that matters

Daily push is enormously effective — users receiving it showed **~820% higher retention** than
users receiving none, weekly **~440% higher**
([Pushwoosh](https://www.pushwoosh.com/blog/push-notification-best-practices/)).

And **46% of users opt out after just 2–5 irrelevant messages in a single week.**

Both facts are true at once, which is why the guardrails are not optional:

- **Global frequency cap: max 1 promotional push/day, ≤5/week**
- **Quiet hours** — nothing overnight in the user's local time
- **One shared preference centre** governing _both_ email and push (channel, topic, time)
- **One suppression source of truth** — an email unsubscribe or a push opt-out must be visible to
  the whole system, so a churned reader is never re-hit on the other channel
- Transactional messages (donation receipts) are exempt from the promo cap but must never carry
  promo content
- Use OneSignal segments to give engaged users a slightly higher cap than at-risk ones, rather
  than one blanket frequency

## Open questions

- **What is the actual list size and expected daily volume?** This single number decides
  contact-priced vs volume-priced email, and nothing should be bought before it is known. We know
  there are ~36,000 Supabase users; how many are reachable and opted-in is the open part.
- **Is Firebase already wired into `gita-flutter-2.0`?** If FCM/APNs is set up, OneSignal is mostly
  configuration. If not, budget for APNs `.p8` key creation and a VAPID cert for web push.
- Does web push need to cover **radhakrishna.com** too? That counts against the 10k free cap.
- Do Resend or Loops offer an **unpublished non-profit discount**? None found publicly — worth
  emailing their sales teams as a registered non-profit.
- Confirm current SES pricing and the sandbox ramp before relying on it — new accounts are
  rate-limited until production access is granted.
- Who owns the pipeline that emits the canonical daily verse record feeding both channels?

---

**Related roadmap items:** this supersedes the tooling half of roadmap item 5 (Verse of the Day
emails) and unblocks item 6b (in-app opt-in for the existing user base), which remains the real
gate on sending anything at scale.
