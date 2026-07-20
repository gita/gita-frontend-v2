# Email provider research: Resend vs Loops vs AWS SES

Researched 2026-07-20 for the Verse of the Day daily send (roadmap item 5b).

**Decision: Resend, when we build it. Deferred until the list is large enough to be
worth sending to.**

---

## The framing correction

The daily verse is **not transactional**, despite feeling like it. A recurring email to a
subscribed list is marketing-class content. It legally requires an unsubscribe link, and at
any real volume we are a "bulk sender" under Gmail and Yahoo rules, so RFC 8058 one-click
unsubscribe is mandatory. That single distinction decides most of this comparison.

---

## Loops is disqualified, on product fit rather than price

Their own documentation says transactional emails have no unsubscribe links, no tracking, and
that unsubscribed contacts still receive them, followed by "Marketing content shouldn't be
sent this way." So the daily verse cannot go down that path.

The correct Loops surface is Campaigns, but the Campaigns API creates **drafts only**, with no
documented draft-to-send endpoint. Automating "create campaign, inject today's verse in seven
languages, publish" every day means fighting the product forever. Loops is built for a
marketer clicking Send, not a cron job.

---

## Pricing at realistic list sizes

Resend now runs **both** pricing models: the transactional Emails API is per-email, and
Broadcasts/Marketing is per-contact with no stated volume cap. The contact-pricing advantage
that used to be Loops' moat is available inside Resend. Use Broadcasts, not the transactional
API: at ~18k subscribers that is roughly $180/month against $350/month for identical volume.

| Subscribers | Emails/month | Resend Broadcasts | AWS SES | Saving per year |
| ----------- | ------------ | ----------------- | ------- | --------------- |
| 5,000       | 150K         | $40               | ~$15    | $300            |
| 10,000      | 300K         | $80               | ~$30    | $600            |
| 20,000      | 600K         | $180              | ~$75    | $1,260          |
| 36,000      | 1.08M        | $250              | ~$123   | $1,524          |

SES is $0.10 per 1,000 emails, plus $15/month for managed dedicated IPs, which handle per-ISP
warm-up automatically.

**Even at 36,000 subscribers the saving is about $1,500 a year**, against three to five days of
build plus permanent ownership of deliverability. At the list size we will realistically reach
first, it is $300 to $600 a year. Not a good trade for a small team.

---

## What Resend actually buys us

Not templates. **React Email renders to plain HTML and works with SES too**, so it is not a
reason to choose Resend, and templating was SES's old weak point rather than a current one.

What we are paying for is the compliance and operations layer:

- RFC 8058 one-click unsubscribe headers, injected automatically on Broadcasts
- Suppression list handling
- Bounce and complaint webhooks
- A dashboard that tells us whether today's send actually went out

On SES every one of those is ours to build and own forever.

---

## Revisit SES when

The list passes roughly 50,000 genuinely engaged subscribers, or if AWS non-profit credits
come through. Build the send behind a single `sendDailyVerse()` module so the swap is days
rather than a rewrite.

---

## Open questions before we commit money

1. **Ask Resend two things.** Is 30 broadcasts a month to a large audience within the Marketing
   plan's "no email volume limits"? And do they offer non-profit or open-source pricing? Ved
   Vyas Foundation is a registered non-profit running an open-source project, which is a strong
   case. Both answers could move the numbers.
2. **Indic script rendering is untested and no vendor documents it.** All three send standard
   UTF-8, so rendering depends on our font stack and the recipient's client. Outlook desktop
   has historically had complex-script shaping bugs. Send real test renders to Gmail, Apple
   Mail and Outlook before launch, and avoid webfonts for Indic scripts.
3. **Data residency.** Resend stores account data, metadata and logs in the US regardless of
   sending region, and none of the three has an India region. Check whether the foundation has
   any DPDP Act obligation on subscriber emails.

---

## Why we are not importing the 36,000 existing auth users

See roadmap item 6b. Short version: they authenticated to use Gita GPT and were never asked
about email, so under the DPDP Act there is no consent for this purpose. More practically,
sending to 36,000 cold addresses from a domain with no sending history would produce high
bounces and a complaint rate well past Gmail's 0.3% threshold, getting the domain throttled.
That would stop delivery for the people who genuinely did opt in. The list is worth more than
the blast.

---

## Sources

- https://resend.com/pricing
- https://resend.com/docs/api-reference/emails/send-batch-emails
- https://resend.com/blog/broadcast-api
- https://loops.so/docs/transactional
- https://loops.so/docs/api-reference/create-campaign
- https://aws.amazon.com/ses/pricing/
- https://docs.aws.amazon.com/ses/latest/dg/managed-dedicated-sending.html
- https://datatracker.ietf.org/doc/html/rfc8058

Loops tier prices ($49 at 5k contacts, $249 at 50k) are third-party sourced. Their pricing
page is a JavaScript slider that could not be read directly.
