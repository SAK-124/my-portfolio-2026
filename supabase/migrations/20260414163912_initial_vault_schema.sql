create extension if not exists pgcrypto;
create extension if not exists pg_trgm;
create table if not exists vault_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('note', 'link', 'file')),
  title text not null,
  body text,
  url text,
  source text not null check (source in ('app', 'drive')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists vault_files (
  item_id uuid primary key references vault_items(id) on delete cascade,
  drive_file_id text not null,
  mime_type text,
  size bigint,
  checksum text,
  extracted_text text,
  extraction_status text not null default 'pending' check (extraction_status in ('pending', 'done', 'error')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists vault_tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz not null default now()
);
create table if not exists vault_item_tags (
  item_id uuid not null references vault_items(id) on delete cascade,
  tag_id uuid not null references vault_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (item_id, tag_id)
);
create table if not exists vault_search (
  item_id uuid primary key references vault_items(id) on delete cascade,
  normalized_text text not null,
  tags text[] not null default '{}',
  document tsvector generated always as (to_tsvector('english', normalized_text)) stored,
  updated_at timestamptz not null default now()
);
create table if not exists app_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
create index if not exists idx_vault_items_type on vault_items(type);
create index if not exists idx_vault_items_updated_at on vault_items(updated_at desc);
create index if not exists idx_vault_search_document on vault_search using gin(document);
create index if not exists idx_vault_search_trgm on vault_search using gin(normalized_text gin_trgm_ops);
create index if not exists idx_vault_search_tags on vault_search using gin(tags);
