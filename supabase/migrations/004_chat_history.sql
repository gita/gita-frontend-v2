-- GitaGPT Chat History Tables
-- Stores conversation history for authenticated users

-- Create chats table
create table if not exists chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'New conversation',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Create messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now() not null
);

-- Create indexes for better query performance
create index if not exists chats_user_id_idx on chats(user_id);
create index if not exists chats_updated_at_idx on chats(updated_at desc);
create index if not exists messages_chat_id_idx on messages(chat_id);
create index if not exists messages_created_at_idx on messages(created_at);

-- Enable Row Level Security (RLS)
alter table chats enable row level security;
alter table messages enable row level security;

-- RLS Policies for chats table
-- Users can only see their own chats
create policy "Users can view their own chats"
  on chats for select
  using (auth.uid() = user_id);

-- Users can insert their own chats
create policy "Users can insert their own chats"
  on chats for insert
  with check (auth.uid() = user_id);

-- Users can update their own chats
create policy "Users can update their own chats"
  on chats for update
  using (auth.uid() = user_id);

-- Users can delete their own chats
create policy "Users can delete their own chats"
  on chats for delete
  using (auth.uid() = user_id);

-- RLS Policies for messages table
-- Users can view messages from their own chats
create policy "Users can view messages from their own chats"
  on messages for select
  using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Users can insert messages to their own chats
create policy "Users can insert messages to their own chats"
  on messages for insert
  with check (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Users can update messages in their own chats
create policy "Users can update messages in their own chats"
  on messages for update
  using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Users can delete messages from their own chats
create policy "Users can delete messages from their own chats"
  on messages for delete
  using (
    exists (
      select 1 from chats
      where chats.id = messages.chat_id
      and chats.user_id = auth.uid()
    )
  );

-- Function to automatically update updated_at timestamp
create or replace function update_chat_updated_at()
returns trigger as $$
begin
  update chats
  set updated_at = now()
  where id = new.chat_id;
  return new;
end;
$$ language plpgsql;

-- Trigger to update chat's updated_at when a message is added
create trigger update_chat_timestamp
  after insert on messages
  for each row
  execute function update_chat_updated_at();

