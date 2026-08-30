create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$ select exists(select 1 from public.admin_profiles ap where ap.user_id = auth.uid() and ap.role = 'admin'); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.projects enable row level security;
alter table public.phases enable row level security;
alter table public.tasks enable row level security;
alter table public.milestones enable row level security;
alter table public.payments enable row level security;
alter table public.deliverables enable row level security;
alter table public.updates enable row level security;
alter table public.admin_profiles enable row level security;

create policy "public read projects" on public.projects for select to anon,authenticated using (true);
create policy "public read phases" on public.phases for select to anon,authenticated using (is_public or public.is_admin());
create policy "public read tasks" on public.tasks for select to anon,authenticated using (is_public or public.is_admin());
create policy "public read milestones" on public.milestones for select to anon,authenticated using (true);
create policy "public read payments" on public.payments for select to anon,authenticated using (true);
create policy "public read deliverables" on public.deliverables for select to anon,authenticated using (true);
create policy "public read published updates" on public.updates for select to anon,authenticated using (published or public.is_admin());
create policy "admin reads own profile" on public.admin_profiles for select to authenticated using (user_id = auth.uid());

create policy "admin manages projects" on public.projects for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages phases" on public.phases for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages tasks" on public.tasks for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages milestones" on public.milestones for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages payments" on public.payments for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages deliverables" on public.deliverables for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manages updates" on public.updates for all to authenticated using (public.is_admin()) with check (public.is_admin());

alter table public.projects replica identity full;
alter table public.phases replica identity full;
alter table public.tasks replica identity full;
alter table public.milestones replica identity full;
alter table public.payments replica identity full;
alter table public.deliverables replica identity full;
alter table public.updates replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.projects, public.phases, public.tasks, public.milestones, public.payments, public.deliverables, public.updates;
exception when duplicate_object then null;
end $$;
