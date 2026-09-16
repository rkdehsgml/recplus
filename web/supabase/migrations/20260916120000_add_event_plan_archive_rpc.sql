-- 행사 플랜 삭제는 과거 실행 FK와 명령 영수증을 지우지 않는 보관 처리로 바꿉니다.
-- 보관된 플랜은 다시 실행하거나 일반 저장으로 덮어쓸 수 없습니다.

alter table public.event_plans
  add column if not exists archived_at timestamptz;

create index if not exists event_plans_owner_active_updated_idx
on public.event_plans (owner_id, updated_at desc)
where archived_at is null;

create or replace function private.prevent_archived_event_plan_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.archived_at is not null then
    raise exception 'event_plan_archived';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_archived_event_plan_mutation on public.event_plans;
create trigger prevent_archived_event_plan_mutation
before update on public.event_plans
for each row execute function private.prevent_archived_event_plan_mutation();

create or replace function private.prevent_archived_event_plan_run()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if exists (
    select 1
    from public.event_plans
    where id = new.event_plan_id
      and archived_at is not null
  ) then
    raise exception 'event_plan_archived';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_archived_event_plan_run on public.event_runs;
create trigger prevent_archived_event_plan_run
before insert on public.event_runs
for each row execute function private.prevent_archived_event_plan_run();

create or replace function public.archive_event_plan(
  p_event_plan_id uuid,
  p_expected_revision integer,
  p_request_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_owner_id uuid;
  v_revision integer;
  v_archived_at timestamptz;
  v_fingerprint text;
  v_existing_fingerprint text;
  v_existing_response jsonb;
  v_response jsonb;
begin
  if v_user_id is null then raise exception 'authentication_required'; end if;
  if p_event_plan_id is null or p_request_id is null then raise exception 'invalid_archive_command'; end if;
  if p_expected_revision is null or p_expected_revision < 0 then raise exception 'invalid_expected_revision'; end if;

  v_fingerprint := pg_catalog.md5(jsonb_build_object(
    'command', 'archive_event_plan',
    'event_plan_id', p_event_plan_id,
    'expected_revision', p_expected_revision
  )::text);

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(v_user_id::text || ':' || p_request_id::text)
  );

  select request_fingerprint, response_payload
  into v_existing_fingerprint, v_existing_response
  from public.event_plan_command_receipts
  where owner_id = v_user_id and request_id = p_request_id;

  if found then
    if v_existing_fingerprint <> v_fingerprint then raise exception 'request_id_reused'; end if;
    return v_existing_response || jsonb_build_object('reused', true);
  end if;

  select owner_id, revision, archived_at
  into v_owner_id, v_revision, v_archived_at
  from public.event_plans
  where id = p_event_plan_id
  for update;

  if not found or v_owner_id <> v_user_id then raise exception 'forbidden'; end if;
  if v_revision <> p_expected_revision then raise exception 'revision_conflict'; end if;
  if v_archived_at is not null then raise exception 'event_plan_archived'; end if;

  v_revision := v_revision + 1;
  v_archived_at := now();
  update public.event_plans
  set archived_at = v_archived_at,
      revision = v_revision
  where id = p_event_plan_id;

  v_response := jsonb_build_object(
    'id', p_event_plan_id,
    'revision', v_revision,
    'archived_at', v_archived_at,
    'reused', false
  );

  insert into public.event_plan_command_receipts (
    event_plan_id, owner_id, request_id, request_fingerprint,
    response_payload, accepted_revision, accepted_at
  ) values (
    p_event_plan_id, v_user_id, p_request_id, v_fingerprint,
    v_response, v_revision, v_archived_at
  );

  return v_response;
end;
$$;

revoke all on function public.archive_event_plan(uuid, integer, uuid) from public, anon;
grant execute on function public.archive_event_plan(uuid, integer, uuid) to authenticated;

revoke all on function private.prevent_archived_event_plan_mutation() from public, anon, authenticated;
revoke all on function private.prevent_archived_event_plan_run() from public, anon, authenticated;
