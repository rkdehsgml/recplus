-- P05: 편집 가능한 행사 플랜과 분리된 실행 원본을 만듭니다.
-- 이 단계는 RPC를 추가하지 않습니다. 이후 P08의 제한 RPC만 실행 상태와 결과를 바꿀 수 있어야 합니다.
-- 기존 play_sessions는 복구 어댑터로 남기며, 과거 실행 이력으로 이관하거나 추정하지 않습니다.

-- 복합 FK가 플랜과 실행의 소유자·항목 관계를 함께 확인하도록, 이미 유일한 조합을 명시합니다.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.event_plans'::regclass
      and conname = 'event_plans_id_owner_id_key'
  ) then
    alter table public.event_plans
      add constraint event_plans_id_owner_id_key unique (id, owner_id);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.event_plan_games'::regclass
      and conname = 'event_plan_games_plan_item_plan_key'
  ) then
    alter table public.event_plan_games
      add constraint event_plan_games_plan_item_plan_key unique (plan_item_id, event_plan_id);
  end if;
end;
$$;

create table if not exists public.event_runs (
  id uuid primary key,
  event_plan_id uuid not null,
  owner_id uuid not null,
  plan_revision integer not null check (plan_revision >= 0),
  plan_snapshot jsonb not null check (jsonb_typeof(plan_snapshot) = 'object'),
  primary_device_id uuid not null,
  status text not null default 'active' check (status in ('active', 'finished', 'aborted')),
  revision integer not null default 0 check (revision >= 0),
  is_practice boolean not null default false,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  constraint event_runs_plan_owner_matches
    foreign key (event_plan_id, owner_id)
    references public.event_plans (id, owner_id)
    on delete restrict,
  constraint event_runs_end_state_matches_timestamp check (
    (status = 'active' and ended_at is null)
    or (status in ('finished', 'aborted') and ended_at is not null)
  ),
  unique (id, owner_id),
  unique (id, event_plan_id)
);

create table if not exists public.event_run_games (
  id uuid primary key default gen_random_uuid(),
  event_run_id uuid not null,
  event_plan_id uuid not null,
  plan_item_id uuid not null,
  game_id text not null,
  game_version_id uuid not null,
  position integer not null check (position >= 0),
  allocated_minutes integer check (allocated_minutes is null or allocated_minutes >= 1),
  game_snapshot jsonb not null check (jsonb_typeof(game_snapshot) = 'object'),
  condition_snapshot jsonb not null check (jsonb_typeof(condition_snapshot) = 'object'),
  status text not null default 'pending' check (status in ('pending', 'playing', 'completed', 'skipped')),
  revision integer not null default 0 check (revision >= 0),
  result_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(result_payload) = 'object'),
  result_reason text,
  started_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  constraint event_run_games_run_plan_matches
    foreign key (event_run_id, event_plan_id)
    references public.event_runs (id, event_plan_id)
    on delete restrict,
  constraint event_run_games_plan_item_matches
    foreign key (plan_item_id, event_plan_id)
    references public.event_plan_games (plan_item_id, event_plan_id)
    on delete restrict,
  constraint event_run_games_version_matches_game
    foreign key (game_version_id, game_id)
    references public.game_versions (id, game_id)
    on delete restrict
    deferrable initially deferred,
  constraint event_run_games_status_times_check check (
    (status = 'pending' and started_at is null and resolved_at is null)
    or (status = 'playing' and started_at is not null and resolved_at is null)
    or (status = 'completed' and started_at is not null and resolved_at is not null)
    or (status = 'skipped' and resolved_at is not null)
  ),
  constraint event_run_games_skipped_reason_required check (
    status <> 'skipped' or nullif(btrim(result_reason), '') is not null
  ),
  constraint event_run_games_result_reason_length check (
    result_reason is null or char_length(result_reason) <= 500
  ),
  unique (event_run_id, position),
  unique (id, event_run_id)
);

-- run_events는 감사 가능한 업무 이벤트만 기록합니다. timer tick이나 참가자 자유입력은 넣지 않습니다.
create table if not exists public.run_events (
  id uuid primary key default gen_random_uuid(),
  event_run_id uuid not null,
  owner_id uuid not null,
  run_game_id uuid,
  event_sequence integer not null check (event_sequence >= 1),
  event_type text not null check (event_type in (
    'run_started', 'game_started', 'game_completed', 'game_skipped',
    'run_finished', 'run_aborted', 'game_corrected'
  )),
  event_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(event_payload) = 'object'),
  request_id uuid not null,
  accepted_at timestamptz not null default now(),
  constraint run_events_run_owner_matches
    foreign key (event_run_id, owner_id)
    references public.event_runs (id, owner_id)
    on delete restrict,
  constraint run_events_game_belongs_to_run
    foreign key (run_game_id, event_run_id)
    references public.event_run_games (id, event_run_id)
    on delete restrict,
  unique (event_run_id, event_sequence),
  unique (owner_id, request_id)
);

-- 성공한 명령의 지문과 서버 응답을 보관해 응답 유실 뒤 같은 request_id를 안전하게 재전송합니다.
-- 원문 명령은 보관하지 않아 참가자 이름 같은 자유입력 데이터가 감사 구조에 섞이지 않습니다.
create table if not exists public.run_command_receipts (
  id uuid primary key default gen_random_uuid(),
  event_run_id uuid not null,
  owner_id uuid not null,
  request_id uuid not null,
  command_type text not null check (command_type in (
    'start_run', 'start_game', 'record_game_result', 'finish_run', 'abort_run', 'correct_game_result'
  )),
  request_fingerprint text not null check (request_fingerprint ~ '^[0-9a-f]{32}$'),
  response_payload jsonb not null check (jsonb_typeof(response_payload) = 'object'),
  run_revision integer not null check (run_revision >= 0),
  accepted_at timestamptz not null default now(),
  constraint run_command_receipts_run_owner_matches
    foreign key (event_run_id, owner_id)
    references public.event_runs (id, owner_id)
    on delete restrict,
  unique (owner_id, request_id)
);

create index if not exists event_runs_owner_status_started_idx
on public.event_runs (owner_id, status, started_at desc);

create index if not exists event_run_games_run_status_position_idx
on public.event_run_games (event_run_id, status, position);

create index if not exists run_events_run_accepted_idx
on public.run_events (event_run_id, accepted_at);

create index if not exists run_command_receipts_run_accepted_idx
on public.run_command_receipts (event_run_id, accepted_at);

-- 이벤트는 실행 안에서 빈틈 없이 증가합니다. 동시 삽입도 실행 행 잠금으로 직렬화합니다.
create or replace function private.enforce_run_event_sequence()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_next_sequence integer;
begin
  perform 1
  from public.event_runs
  where id = new.event_run_id
  for update;

  if not found then
    raise exception 'event run does not exist';
  end if;

  select coalesce(max(event_sequence), 0) + 1
  into v_next_sequence
  from public.run_events
  where event_run_id = new.event_run_id;

  if new.event_sequence <> v_next_sequence then
    raise exception 'run event sequence must be %, got %', v_next_sequence, new.event_sequence;
  end if;

  return new;
end;
$$;

create or replace function private.prevent_event_run_snapshot_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'event runs are retained audit records and cannot be deleted';
  end if;

  if new.id is distinct from old.id
    or new.event_plan_id is distinct from old.event_plan_id
    or new.owner_id is distinct from old.owner_id
    or new.plan_revision is distinct from old.plan_revision
    or new.plan_snapshot is distinct from old.plan_snapshot
    or new.primary_device_id is distinct from old.primary_device_id
    or new.is_practice is distinct from old.is_practice
    or new.started_at is distinct from old.started_at then
    raise exception 'event run start snapshot is immutable';
  end if;

  if old.ended_at is not null and new.ended_at is distinct from old.ended_at then
    raise exception 'event run end timestamp is immutable';
  end if;

  if old.status in ('finished', 'aborted') and new.status is distinct from old.status then
    raise exception 'a finished or aborted event run cannot be reopened';
  end if;

  return new;
end;
$$;

create or replace function private.prevent_event_run_game_snapshot_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'event run games are retained audit records and cannot be deleted';
  end if;

  if new.id is distinct from old.id
    or new.event_run_id is distinct from old.event_run_id
    or new.event_plan_id is distinct from old.event_plan_id
    or new.plan_item_id is distinct from old.plan_item_id
    or new.game_id is distinct from old.game_id
    or new.game_version_id is distinct from old.game_version_id
    or new.position is distinct from old.position
    or new.allocated_minutes is distinct from old.allocated_minutes
    or new.game_snapshot is distinct from old.game_snapshot
    or new.condition_snapshot is distinct from old.condition_snapshot
    or new.created_at is distinct from old.created_at then
    raise exception 'event run game snapshot is immutable';
  end if;

  return new;
end;
$$;

create or replace function private.prevent_run_audit_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  raise exception '% rows are immutable audit records', tg_table_name;
end;
$$;

drop trigger if exists enforce_run_event_sequence on public.run_events;
create trigger enforce_run_event_sequence
before insert on public.run_events
for each row execute function private.enforce_run_event_sequence();

drop trigger if exists prevent_event_run_snapshot_mutation on public.event_runs;
create trigger prevent_event_run_snapshot_mutation
before update or delete on public.event_runs
for each row execute function private.prevent_event_run_snapshot_mutation();

drop trigger if exists prevent_event_run_game_snapshot_mutation on public.event_run_games;
create trigger prevent_event_run_game_snapshot_mutation
before update or delete on public.event_run_games
for each row execute function private.prevent_event_run_game_snapshot_mutation();

drop trigger if exists prevent_run_events_mutation on public.run_events;
create trigger prevent_run_events_mutation
before update or delete on public.run_events
for each row execute function private.prevent_run_audit_mutation();

drop trigger if exists prevent_run_command_receipts_mutation on public.run_command_receipts;
create trigger prevent_run_command_receipts_mutation
before update or delete on public.run_command_receipts
for each row execute function private.prevent_run_audit_mutation();

revoke all on table public.event_runs from anon, authenticated;
revoke all on table public.event_run_games from anon, authenticated;
revoke all on table public.run_events from anon, authenticated;
revoke all on table public.run_command_receipts from anon, authenticated;

alter table public.event_runs enable row level security;
alter table public.event_run_games enable row level security;
alter table public.run_events enable row level security;
alter table public.run_command_receipts enable row level security;
