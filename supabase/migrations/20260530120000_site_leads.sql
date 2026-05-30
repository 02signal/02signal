create table if not exists public.site_leads (
  id uuid primary key default gen_random_uuid(),
  lead_id text not null unique,
  source_site text not null check (source_site in ('02signal.ai', 'automatiseerimine.ee', 'digiteekaart.ee')),
  source_path text not null default '/',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  company text not null,
  registry_code text,
  person text not null,
  role text,
  email text not null,
  phone text,
  company_size text,
  topic text not null,
  message text,
  consent_contact boolean not null default false,
  consent_funding_updates boolean not null default false,
  consent_version text not null default '2026-05-30',
  user_agent text,
  source_ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_leads_source_site_idx on public.site_leads (source_site);
create index if not exists site_leads_email_idx on public.site_leads (lower(email));
create index if not exists site_leads_registry_code_idx on public.site_leads (registry_code);
create index if not exists site_leads_created_at_idx on public.site_leads (created_at desc);
create index if not exists site_leads_funding_updates_idx on public.site_leads (consent_funding_updates) where consent_funding_updates = true;

alter table public.site_leads enable row level security;

comment on table public.site_leads is 'Public sales-site leads from 02Signal, Automatiseerimine.ee and Digiteekaart.ee. Write only through server-side Edge Functions.';
