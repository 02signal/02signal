create extension if not exists pgcrypto;

create table if not exists public.diagnostic_leads (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null unique,
  status text not null default 'started' check (status in ('started', 'completed')),
  language text not null default 'et',
  page_path text not null default '/et/kiirkontroll/',
  company text not null,
  person text not null,
  email text not null,
  phone text,
  privacy_consent boolean not null default false,
  started_at timestamptz,
  completed_at timestamptz,
  last_event_type text not null check (last_event_type in ('started', 'completed', 'completed_resend')),
  total_score integer check (total_score between 0 and 100),
  level_title text,
  level_text text,
  dimension_scores jsonb not null default '[]'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  user_agent text,
  source_ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists diagnostic_leads_status_idx on public.diagnostic_leads (status);
create index if not exists diagnostic_leads_email_idx on public.diagnostic_leads (lower(email));
create index if not exists diagnostic_leads_completed_at_idx on public.diagnostic_leads (completed_at desc);
create index if not exists diagnostic_leads_updated_at_idx on public.diagnostic_leads (updated_at desc);

create table if not exists public.diagnostic_events (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null references public.diagnostic_leads (lead_id) on delete cascade,
  event_type text not null check (event_type in ('started', 'completed', 'completed_resend')),
  event_status text not null default 'stored' check (event_status in ('stored', 'stored_email_sent', 'stored_email_failed')),
  total_score integer check (total_score between 0 and 100),
  email_sent boolean not null default false,
  email_error text,
  received_at timestamptz not null default now(),
  user_agent text,
  source_ip_hash text
);

create index if not exists diagnostic_events_lead_id_idx on public.diagnostic_events (lead_id);
create index if not exists diagnostic_events_received_at_idx on public.diagnostic_events (received_at desc);

alter table public.diagnostic_leads enable row level security;
alter table public.diagnostic_events enable row level security;

comment on table public.diagnostic_leads is '02Signal public AI diagnostic leads. Read/write only through server-side functions.';
comment on table public.diagnostic_events is 'Append-only intake event log for started and completed diagnostic submissions.';
