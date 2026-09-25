-- شغّل هذا الملف مرة واحدة داخل Supabase SQL Editor قبل تفعيل متغيرات البيئة.
create table if not exists public.leads (
  id uuid primary key,
  type text not null check (type in ('staffing','training','service','contact','listing','partner')),
  source text not null default 'website',
  page text not null,
  service text,
  status text not null default 'New' check (status in ('New','Contacted','Qualified','Proposal','Won','Lost')),
  locale text not null default 'ar' check (locale in ('ar','en')),
  contact_phone text not null,
  data jsonb not null default '{}'::jsonb,
  utm jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_type_idx on public.leads (type);
create index if not exists leads_source_idx on public.leads (source);

alter table public.leads enable row level security;

-- لا تُنشأ سياسات وصول عامة. Route Handlers على الخادم تستخدم Service Role فقط.
-- لا تضع SUPABASE_SERVICE_ROLE_KEY في أي متغير يبدأ بـ NEXT_PUBLIC_.
