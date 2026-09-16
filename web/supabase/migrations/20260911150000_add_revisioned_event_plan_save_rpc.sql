-- P07: 큐시트 저장은 revision과 request_id를 가진 RPC만 허용합니다.
-- 기존 save_event_plan(jsonb)은 항목 전체 삭제·재삽입과 마지막 저장 우선을 허용하므로 제거합니다.

create table if not exists public.event_plan_command_receipts (
  id uuid primary key default gen_random_uuid(),
  event_plan_id uuid not null references public.event_plans (id) on delete restrict,
  owner_id uuid not null references auth.users (id) on delete restrict,
  request_id uuid not null,
  request_fingerprint text not null check (request_fingerprint ~ '^[0-9a-f]{32}$'),
  response_payload jsonb not null check (jsonb_typeof(response_payload) = 'object'),
  accepted_revision integer not null check (accepted_revision >= 0),
  accepted_at timestamptz not null default now(),
  unique (owner_id, request_id)
);

create index if not exists event_plan_command_receipts_plan_accepted_idx
on public.event_plan_command_receipts (event_plan_id, accepted_at desc);

-- 과거 RPC는 revision/request_id 계약을 우회하므로 새 함수 설치 전에 제거합니다.
drop function if exists public.save_event_plan(jsonb);

create or replace function public.save_event_plan(
  p_plan jsonb,
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
  v_plan_id uuid;
  v_existing_owner_id uuid;
  v_existing_revision integer;
  v_next_revision integer;
  v_name text;
  v_place text;
  v_people integer;
  v_mode text;
  v_target_minutes integer;
  v_teams jsonb;
  v_event_group text;
  v_event_type text;
  v_event_constraints text[];
  v_condition_completion_state text;
  v_item jsonb;
  v_item_position integer;
  v_plan_item_id uuid;
  v_game_id text;
  v_game_version_id uuid;
  v_game_snapshot jsonb;
  v_allocated_minutes integer;
  v_input_plan_item_ids uuid[] := '{}';
  v_position_offset integer;
  v_fingerprint text;
  v_existing_fingerprint text;
  v_existing_response jsonb;
  v_response jsonb;
  v_accepted_at timestamptz := now();
begin
  if v_user_id is null then
    raise exception 'authentication_required';
  end if;

  if p_request_id is null then
    raise exception 'request_id_required';
  end if;

  if p_plan is null or jsonb_typeof(p_plan) <> 'object' then
    raise exception 'invalid_event_plan';
  end if;

  if p_plan ? 'owner_id' then
    raise exception 'owner_id_must_not_be_supplied';
  end if;

  if coalesce(p_plan ->> 'id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    raise exception 'event_plan_id_required';
  end if;
  v_plan_id := (p_plan ->> 'id')::uuid;

  if p_expected_revision is not null and p_expected_revision < 0 then
    raise exception 'invalid_expected_revision';
  end if;

  v_fingerprint := pg_catalog.md5(
    jsonb_build_object(
      'plan', p_plan,
      'expected_revision', p_expected_revision
    )::text
  );

  -- 동시 재전송도 같은 결과를 보도록 사용자·요청 단위 advisory lock을 잡습니다.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtext(v_user_id::text || ':' || p_request_id::text)
  );

  select request_fingerprint, response_payload
  into v_existing_fingerprint, v_existing_response
  from public.event_plan_command_receipts
  where owner_id = v_user_id and request_id = p_request_id;

  if found then
    if v_existing_fingerprint <> v_fingerprint then
      raise exception 'request_id_reused';
    end if;
    return v_existing_response || jsonb_build_object('reused', true);
  end if;

  if jsonb_typeof(coalesce(p_plan -> 'games', '[]'::jsonb)) <> 'array' then
    raise exception 'invalid_event_plan_games';
  end if;

  if jsonb_typeof(coalesce(p_plan -> 'teams', '[]'::jsonb)) <> 'array' then
    raise exception 'invalid_event_plan_teams';
  end if;

  if p_plan ? 'event_constraints'
    and jsonb_typeof(p_plan -> 'event_constraints') <> 'array' then
    raise exception 'invalid_event_constraints';
  end if;

  v_name := p_plan ->> 'name';
  v_place := p_plan ->> 'place';
  v_mode := p_plan ->> 'mode';
  v_event_group := nullif(p_plan ->> 'event_group', '');
  v_event_type := nullif(p_plan ->> 'event_type', '');
  v_teams := coalesce(p_plan -> 'teams', '[]'::jsonb);

  if coalesce(p_plan ->> 'people', '') !~ '^[0-9]+$'
    or coalesce(p_plan ->> 'target_minutes', '') !~ '^[0-9]+$' then
    raise exception 'invalid_event_plan_numbers';
  end if;
  v_people := (p_plan ->> 'people')::integer;
  v_target_minutes := (p_plan ->> 'target_minutes')::integer;

  if p_plan ? 'event_constraints' then
    select coalesce(array_agg(constraint_value), '{}')
    into v_event_constraints
    from jsonb_array_elements_text(p_plan -> 'event_constraints') as constraints(constraint_value);
  else
    v_event_constraints := null;
  end if;

  -- 빈 배열은 사용자가 "제약 없음"을 명시한 완전한 조건입니다. 키 자체가 없으면 레거시 미보완입니다.
  if v_event_group is not null and p_plan ? 'event_constraints' then
    v_condition_completion_state := 'complete';
  else
    v_condition_completion_state := 'needs_enrichment';
  end if;

  select owner_id, revision
  into v_existing_owner_id, v_existing_revision
  from public.event_plans
  where id = v_plan_id
  for update;

  if found then
    if v_existing_owner_id <> v_user_id then
      raise exception 'forbidden';
    end if;
    if p_expected_revision is null or p_expected_revision <> v_existing_revision then
      raise exception 'revision_conflict';
    end if;
    v_next_revision := v_existing_revision + 1;
  else
    if p_expected_revision is not null then
      raise exception 'revision_conflict';
    end if;
    v_next_revision := 0;
  end if;

  -- 모든 입력 항목을 먼저 검증합니다. 게임 버전과 본문은 서버가 현재 접근 가능한 카탈로그에서 고정합니다.
  for v_item, v_item_position in
    select value, ordinality::integer - 1
    from jsonb_array_elements(coalesce(p_plan -> 'games', '[]'::jsonb)) with ordinality
  loop
    if jsonb_typeof(v_item) <> 'object' then
      raise exception 'invalid_event_plan_game';
    end if;

    if coalesce(v_item ->> 'plan_item_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
      raise exception 'plan_item_id_required';
    end if;
    v_plan_item_id := (v_item ->> 'plan_item_id')::uuid;

    if v_plan_item_id = any(v_input_plan_item_ids) then
      raise exception 'duplicate_plan_item_id';
    end if;
    v_input_plan_item_ids := array_append(v_input_plan_item_ids, v_plan_item_id);

    v_game_id := nullif(v_item ->> 'game_id', '');
    if v_game_id is null then
      raise exception 'game_id_required';
    end if;

    if v_item ? 'allocated_minutes'
      and coalesce(v_item ->> 'allocated_minutes', '') !~ '^[0-9]+$' then
      raise exception 'invalid_allocated_minutes';
    end if;
    v_allocated_minutes := case
      when v_item ? 'allocated_minutes' then (v_item ->> 'allocated_minutes')::integer
      else null
    end;

    select game.current_version_id, version.snapshot
    into v_game_version_id, v_game_snapshot
    from public.games game
    join public.game_versions version on version.id = game.current_version_id
    where game.id = v_game_id
      and (
        game.owner_id = v_user_id
        or (game.visibility = 'public' and game.moderation_status = 'published')
      );

    if not found then
      raise exception 'game_version_not_available';
    end if;

    if exists (
      select 1
      from public.event_plan_games existing_item
      where existing_item.plan_item_id = v_plan_item_id
        and existing_item.event_plan_id <> v_plan_id
    ) then
      raise exception 'plan_item_belongs_to_another_plan';
    end if;
  end loop;

  insert into public.event_plans (
    id, owner_id, name, place, people, mode, target_minutes, teams,
    revision, event_group, event_type, event_constraints, condition_completion_state
  ) values (
    v_plan_id, v_user_id, v_name, v_place, v_people, v_mode, v_target_minutes, v_teams,
    v_next_revision, v_event_group, v_event_type, v_event_constraints, v_condition_completion_state
  )
  on conflict (id) do update set
    name = excluded.name,
    place = excluded.place,
    people = excluded.people,
    mode = excluded.mode,
    target_minutes = excluded.target_minutes,
    teams = excluded.teams,
    revision = excluded.revision,
    event_group = excluded.event_group,
    event_type = excluded.event_type,
    event_constraints = excluded.event_constraints,
    condition_completion_state = excluded.condition_completion_state;

  -- 실행이 이미 참조하는 항목은 삭제하지 않습니다. 재정렬은 같은 plan_item_id의 position만 바꿉니다.
  if exists (
    select 1
    from public.event_plan_games existing_item
    join public.event_run_games run_game on run_game.plan_item_id = existing_item.plan_item_id
    where existing_item.event_plan_id = v_plan_id
      and not (existing_item.plan_item_id = any(v_input_plan_item_ids))
  ) then
    raise exception 'plan_item_in_use';
  end if;

  -- (event_plan_id, position)는 유일하므로 재정렬 전에 기존 위치를 충돌하지 않는 범위로 옮깁니다.
  select coalesce(max(position), -1) + coalesce(array_length(v_input_plan_item_ids, 1), 0) + 1
  into v_position_offset
  from public.event_plan_games
  where event_plan_id = v_plan_id;

  update public.event_plan_games
  set position = position + v_position_offset
  where event_plan_id = v_plan_id;

  delete from public.event_plan_games
  where event_plan_id = v_plan_id
    and not (plan_item_id = any(v_input_plan_item_ids));

  for v_item, v_item_position in
    select value, ordinality::integer - 1
    from jsonb_array_elements(coalesce(p_plan -> 'games', '[]'::jsonb)) with ordinality
  loop
    v_plan_item_id := (v_item ->> 'plan_item_id')::uuid;
    v_game_id := v_item ->> 'game_id';
    v_allocated_minutes := case
      when v_item ? 'allocated_minutes' then (v_item ->> 'allocated_minutes')::integer
      else null
    end;

    select game.current_version_id, version.snapshot
    into v_game_version_id, v_game_snapshot
    from public.games game
    join public.game_versions version on version.id = game.current_version_id
    where game.id = v_game_id
      and (
        game.owner_id = v_user_id
        or (game.visibility = 'public' and game.moderation_status = 'published')
      );

    insert into public.event_plan_games (
      event_plan_id, game_id, game_snapshot, allocated_minutes, position,
      plan_item_id, game_version_id, version_resolution_state
    ) values (
      v_plan_id, v_game_id, v_game_snapshot, v_allocated_minutes, v_item_position,
      v_plan_item_id, v_game_version_id, 'resolved'
    )
    on conflict (plan_item_id) do update set
      game_id = excluded.game_id,
      game_snapshot = excluded.game_snapshot,
      allocated_minutes = excluded.allocated_minutes,
      position = excluded.position,
      game_version_id = excluded.game_version_id,
      version_resolution_state = 'resolved';
  end loop;

  v_response := jsonb_build_object(
    'id', v_plan_id,
    'revision', v_next_revision,
    'server_received_at', v_accepted_at,
    'reused', false
  );

  insert into public.event_plan_command_receipts (
    event_plan_id, owner_id, request_id, request_fingerprint,
    response_payload, accepted_revision, accepted_at
  ) values (
    v_plan_id, v_user_id, p_request_id, v_fingerprint,
    v_response, v_next_revision, v_accepted_at
  );

  return v_response;
end;
$$;

revoke all on function public.save_event_plan(jsonb, integer, uuid) from public, anon;
grant execute on function public.save_event_plan(jsonb, integer, uuid) to authenticated;

-- 소유자는 읽을 수 있지만, 부모·자식 직접 변경은 revision/RPC 검증을 건너뛸 수 없게 막습니다.
revoke all on table public.event_plans from anon, authenticated;
revoke all on table public.event_plan_games from anon, authenticated;
revoke all on table public.event_plan_command_receipts from anon, authenticated;
grant select on table public.event_plans to authenticated;
grant select on table public.event_plan_games to authenticated;

drop policy if exists "users can manage their event plans" on public.event_plans;
drop policy if exists "users can read their event plans" on public.event_plans;
create policy "users can read their event plans"
on public.event_plans for select
to authenticated
using (owner_id = (select auth.uid()));

drop policy if exists "plan entries follow event plan ownership" on public.event_plan_games;
drop policy if exists "users can read their event plan entries" on public.event_plan_games;
create policy "users can read their event plan entries"
on public.event_plan_games for select
to authenticated
using (
  exists (
    select 1 from public.event_plans
    where event_plans.id = event_plan_games.event_plan_id
      and event_plans.owner_id = (select auth.uid())
  )
);

alter table public.event_plan_command_receipts enable row level security;
