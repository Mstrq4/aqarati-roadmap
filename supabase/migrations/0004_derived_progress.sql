create or replace function public.recalculate_phase_progress(p_phase_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_progress smallint;
  v_status public.phase_status;
begin
  select
    coalesce(round(avg(progress))::smallint,0),
    case
      when count(*) = 0 then 'planned'::public.phase_status
      when bool_or(status = 'blocked') then 'blocked'::public.phase_status
      when bool_and(status = 'done' or progress >= 100) then 'done'::public.phase_status
      when bool_or(status in ('active','review','done') or progress > 0) then 'active'::public.phase_status
      else 'planned'::public.phase_status
    end
  into v_progress,v_status
  from public.tasks
  where phase_id = p_phase_id;

  update public.phases
  set progress = v_progress, status = v_status
  where id = p_phase_id;
end;
$$;

create or replace function public.recalculate_project_progress(p_project_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.projects
  set overall_progress = coalesce((select round(avg(progress))::smallint from public.tasks where project_id = p_project_id),0)
  where id = p_project_id;
$$;

create or replace function public.sync_progress_from_tasks()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform public.recalculate_phase_progress(old.phase_id);
    perform public.recalculate_project_progress(old.project_id);
    return old;
  end if;

  if tg_op = 'UPDATE' and old.phase_id is distinct from new.phase_id then
    perform public.recalculate_phase_progress(old.phase_id);
  end if;

  perform public.recalculate_phase_progress(new.phase_id);
  perform public.recalculate_project_progress(new.project_id);
  return new;
end;
$$;

create trigger tasks_sync_progress_insert_delete
after insert or delete on public.tasks
for each row execute function public.sync_progress_from_tasks();

create trigger tasks_sync_progress_update
after update of progress,status,phase_id on public.tasks
for each row execute function public.sync_progress_from_tasks();

select public.recalculate_phase_progress(id) from public.phases;
select public.recalculate_project_progress(id) from public.projects;
