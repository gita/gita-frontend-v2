-- Newsletter subscriptions and signup attribution
--
-- Two problems this fixes:
--
-- 1. src/lib/subscribeUser.ts has always inserted into `newsletter_subscriptions`,
--    but the table was never created. Every submission failed, and because the
--    helper swallowed the error the form still showed a success modal. Nothing
--    was ever captured.
--
-- 2. We hold roughly 36,000 auth users with no record of where any of them came
--    from, so there is no way to tell whether the Gita GPT rate limit wall is
--    what drives signups.

-- ---------------------------------------------------------------------------
-- Newsletter subscriptions
-- ---------------------------------------------------------------------------

create table if not exists newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  user_email text not null,
  -- Where the subscription came from: 'homepage_form', 'signup_optin', etc.
  source text not null default 'homepage_form',
  -- Locale they subscribed in, so the daily verse can be sent in that language.
  locale text not null default 'en',
  -- Set when someone signs up while already authenticated, or when an opt-in
  -- comes through the auth modal. Null for plain homepage submissions.
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  -- Null means still subscribed. Set on unsubscribe rather than deleting, so a
  -- resubscribe cannot silently lose the original consent date.
  unsubscribed_at timestamptz
);

-- One row per address. Resubscribing updates the existing row.
create unique index if not exists newsletter_subscriptions_email_key
  on newsletter_subscriptions (lower(user_email));

create index if not exists newsletter_subscriptions_active_idx
  on newsletter_subscriptions (created_at desc)
  where unsubscribed_at is null;

create index if not exists newsletter_subscriptions_user_id_idx
  on newsletter_subscriptions (user_id);

alter table newsletter_subscriptions enable row level security;

-- The homepage form posts with the anon key, so anonymous inserts must be
-- allowed. Reads are not: without this split, the anon key would expose the
-- whole mailing list to anyone who found the endpoint.
create policy "Anyone can subscribe"
  on newsletter_subscriptions for insert
  with check (true);

create policy "Users can view their own subscription"
  on newsletter_subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can update their own subscription"
  on newsletter_subscriptions for update
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Signup attribution
-- ---------------------------------------------------------------------------

create table if not exists signup_attribution (
  -- One row per user, written once on first sign-in.
  user_id uuid primary key references auth.users(id) on delete cascade,
  -- 'gitagpt_rate_limit' when they hit the anonymous wall and signed in from
  -- that banner, 'gitagpt' from the chat page otherwise, 'newsletter',
  -- 'nav', 'direct', or another page identifier.
  signup_source text not null default 'unknown',
  -- Path they were on when they started the signup.
  signup_path text,
  -- True when the rate limit banner was on screen at the time. This is the
  -- specific question behind raising the anonymous allowance from 2 to 5.
  hit_rate_limit_before_signup boolean not null default false,
  -- Free-form extras (referrer, locale, campaign) without needing a migration
  -- every time we want one more field.
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists signup_attribution_source_idx
  on signup_attribution (signup_source);

create index if not exists signup_attribution_created_at_idx
  on signup_attribution (created_at desc);

alter table signup_attribution enable row level security;

create policy "Users can view their own attribution"
  on signup_attribution for select
  using (auth.uid() = user_id);

-- Written once from the client after the session lands. There is no update
-- policy on purpose: attribution should not be rewritable after the fact.
create policy "Users can insert their own attribution"
  on signup_attribution for insert
  with check (auth.uid() = user_id);
