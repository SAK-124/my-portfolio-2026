create table if not exists public.resume_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  portfolio jsonb,
  resume_configs jsonb,
  preferences jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.resume_profiles enable row level security;

drop policy if exists "resume_profiles_select_own" on public.resume_profiles;
create policy "resume_profiles_select_own"
on public.resume_profiles
for select
using (auth.uid() = user_id);

drop policy if exists "resume_profiles_insert_own" on public.resume_profiles;
create policy "resume_profiles_insert_own"
on public.resume_profiles
for insert
with check (auth.uid() = user_id);

drop policy if exists "resume_profiles_update_own" on public.resume_profiles;
create policy "resume_profiles_update_own"
on public.resume_profiles
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "resume_profiles_delete_own" on public.resume_profiles;
create policy "resume_profiles_delete_own"
on public.resume_profiles
for delete
using (auth.uid() = user_id);

create or replace function public.set_resume_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_resume_profiles_updated_at on public.resume_profiles;
create trigger set_resume_profiles_updated_at
before update on public.resume_profiles
for each row
execute function public.set_resume_profiles_updated_at();
