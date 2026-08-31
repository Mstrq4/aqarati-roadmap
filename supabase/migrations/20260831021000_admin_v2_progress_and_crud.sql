create or replace function public.enforce_task_progress_by_status()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  case new.status
    when 'planned' then
      new.progress := 0;
    when 'active' then
      new.progress := greatest(0,least(79,coalesce(new.progress,0)));
    when 'review' then
      new.progress := 80;
    when 'done' then
      new.progress := 100;
    when 'blocked' then
      if tg_op = 'UPDATE' then
        new.progress := old.progress;
      else
        new.progress := greatest(0,least(100,coalesce(new.progress,0)));
      end if;
  end case;
  return new;
end;
$$;

drop trigger if exists tasks_enforce_progress_by_status on public.tasks;
create trigger tasks_enforce_progress_by_status
before insert or update of status,progress on public.tasks
for each row execute function public.enforce_task_progress_by_status();

-- Re-run derived calculations so existing rows conform to the same source of truth.
update public.tasks set progress = progress;
select public.recalculate_phase_progress(id) from public.phases;
select public.recalculate_project_progress(id) from public.projects;
