create extension if not exists pgcrypto;

create type public.phase_status as enum ('planned','active','done','blocked');
create type public.task_status as enum ('planned','active','review','done','blocked');
create type public.task_priority as enum ('low','medium','high','critical');
create type public.milestone_status as enum ('upcoming','ready','approved','delayed');
create type public.payment_status as enum ('pending','due','paid');

create table public.projects (
  id uuid primary key default gen_random_uuid(), slug text not null unique, name text not null, description text not null default '', start_date date,
  target_weeks smallint not null default 10 check (target_weeks between 1 and 12), max_weeks smallint not null default 12 check (max_weeks between 1 and 12 and max_weeks >= target_weeks),
  total_amount numeric(12,2) not null default 7800 check (total_amount >= 0), currency text not null default 'SAR', overall_progress smallint not null default 0 check (overall_progress between 0 and 100),
  current_week smallint not null default 0 check (current_week between 0 and 12), updated_at timestamptz not null default now()
);
create table public.phases (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, name text not null, description text not null default '',
  start_week smallint not null check (start_week between 1 and 12), end_week smallint not null check (end_week between 1 and 12 and end_week >= start_week), progress smallint not null default 0 check (progress between 0 and 100),
  status public.phase_status not null default 'planned', sort_order integer not null default 0, is_public boolean not null default true
);
create table public.tasks (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, phase_id uuid not null references public.phases(id) on delete cascade,
  title text not null, description text not null default '', week smallint not null check (week between 1 and 12), progress smallint not null default 0 check (progress between 0 and 100),
  status public.task_status not null default 'planned', priority public.task_priority not null default 'medium', owner_label text not null default '', notes text not null default '', is_public boolean not null default true, updated_at timestamptz not null default now()
);
create table public.milestones (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, title text not null, week smallint not null check (week between 1 and 12),
  status public.milestone_status not null default 'upcoming', acceptance_summary text not null default '', sort_order integer not null default 0
);
create table public.payments (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, sequence smallint not null check (sequence between 1 and 20),
  percentage numeric(5,2) not null check (percentage between 0 and 100), amount numeric(12,2) not null check (amount > 0), trigger_title text not null, trigger_week smallint check (trigger_week between 1 and 12),
  status public.payment_status not null default 'pending', due_date date, paid_at timestamptz, notes text not null default '', unique(project_id, sequence)
);
create table public.deliverables (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, group_key text not null check (group_key in ('scope','alpha','rc','final')),
  title text not null, is_complete boolean not null default false, sort_order integer not null default 0
);
create table public.updates (
  id uuid primary key default gen_random_uuid(), project_id uuid not null references public.projects(id) on delete cascade, title text not null, body text not null,
  related_phase_id uuid references public.phases(id) on delete set null, published boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade, display_name text not null default 'مدير المشروع', role text not null default 'admin' check (role = 'admin')
);
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger tasks_updated_at before update on public.tasks for each row execute function public.set_updated_at();
create trigger updates_updated_at before update on public.updates for each row execute function public.set_updated_at();
create index phases_project_sort_idx on public.phases(project_id, sort_order);
create index tasks_project_week_idx on public.tasks(project_id, week);
create index tasks_phase_idx on public.tasks(phase_id);
create index updates_project_published_idx on public.updates(project_id, published, created_at desc);
