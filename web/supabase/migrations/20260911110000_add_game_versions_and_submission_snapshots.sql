-- P03: 게임 본문·문항·출처를 불변 버전으로 보존하고, 제출본을 초안과 분리합니다.
-- 이 migration은 구조와 기존 데이터 스냅샷만 추가합니다. 공개 동의 문안/보유 기간은 별도 정책 확정 전 기본값으로 만들지 않습니다.

alter table public.games
  add column if not exists revision integer not null default 0,
  add column if not exists current_version_id uuid,
  add column if not exists parent_game_id text references public.games (id) on delete restrict,
  add column if not exists credit_name text,
  add column if not exists credit_url text;

alter table public.games
  drop constraint if exists games_revision_positive,
  add constraint games_revision_positive check (revision >= 0),
  drop constraint if exists games_parent_not_self,
  add constraint games_parent_not_self check (parent_game_id is null or parent_game_id <> id),
  drop constraint if exists games_credit_name_length,
  add constraint games_credit_name_length check (credit_name is null or char_length(credit_name) between 1 and 120),
  drop constraint if exists games_credit_url_length,
  add constraint games_credit_url_length check (credit_url is null or char_length(credit_url) <= 2000);

create table if not exists public.game_versions (
  id uuid primary key default gen_random_uuid(),
  game_id text not null references public.games (id) on delete restrict,
  version_number integer not null check (version_number >= 1),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object'),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{32}$'),
  created_at timestamptz not null default now(),
  unique (game_id, version_number),
  unique (id, game_id)
);

alter table public.games
  drop constraint if exists games_current_version_same_game,
  add constraint games_current_version_same_game
  foreign key (current_version_id, id)
  references public.game_versions (id, game_id)
  deferrable initially deferred;

create index if not exists game_versions_game_id_version_number_idx
on public.game_versions (game_id, version_number desc);

-- 이 함수는 trigger와 migration 내부에서만 사용합니다. 외부 호출 권한을 주지 않습니다.
create or replace function private.capture_game_version_for_game(p_game_id text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_game public.games%rowtype;
  v_items jsonb;
  v_snapshot jsonb;
  v_hash text;
  v_current_version_id uuid;
  v_current_hash text;
  v_next_version integer;
  v_new_version_id uuid;
begin
  select * into v_game
  from public.games
  where id = p_game_id;

  -- 게임 삭제 중 cascade로 발생한 문항 trigger는 새 버전을 만들지 않습니다.
  if not found then return null; end if;

  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', i.id,
        'kind', i.kind,
        'prompt', i.prompt,
        'answer', i.answer,
        'hint', i.hint,
        'position', i.position
      )
      order by i.position, i.id
    ),
    '[]'::jsonb
  )
  into v_items
  from public.game_items i
  where i.game_id = v_game.id;

  v_snapshot := jsonb_build_object(
    'schema_version', 1,
    'game', jsonb_build_object(
      'id', v_game.id,
      'owner_id', v_game.owner_id,
      'source', v_game.source,
      'parent_game_id', v_game.parent_game_id,
      'credit_name', v_game.credit_name,
      'credit_url', v_game.credit_url,
      'origin', v_game.origin,
      'name', v_game.name,
      'archetype', v_game.archetype,
      'phase', v_game.phase,
      'duration_minutes', v_game.duration_minutes,
      'places', to_jsonb(v_game.places),
      'mode', v_game.mode,
      'energy', v_game.energy,
      'description', v_game.description,
      'host_script', v_game.host_script,
      'rule_steps', v_game.rule_steps,
      'people_min', v_game.people_min,
      'people_max', v_game.people_max,
      'recommended_teams_min', v_game.recommended_teams_min,
      'recommended_teams_max', v_game.recommended_teams_max,
      'contexts', to_jsonb(v_game.contexts),
      'preparations', to_jsonb(v_game.preparations),
      'difficulty', v_game.difficulty,
      'series', to_jsonb(v_game.series)
    ),
    'items', v_items
  );
  v_hash := pg_catalog.md5(v_snapshot::text);

  select id, content_hash into v_current_version_id, v_current_hash
  from public.game_versions
  where id = v_game.current_version_id;

  if v_current_version_id is not null and v_current_hash = v_hash then
    return v_current_version_id;
  end if;

  select coalesce(max(version_number), 0) + 1 into v_next_version
  from public.game_versions
  where game_id = v_game.id;

  insert into public.game_versions (game_id, version_number, snapshot, content_hash)
  values (v_game.id, v_next_version, v_snapshot, v_hash)
  returning id into v_new_version_id;

  update public.games
  set current_version_id = v_new_version_id,
      revision = v_next_version
  where id = v_game.id;

  return v_new_version_id;
end;
$$;

-- 기존 게임도 내용과 문항을 한 번만 스냅샷화합니다. 새 동의 증거를 만들지 않습니다.
-- current_version_id/revision 채우기가 기존 콘텐츠의 updated_at을 바꾸지 않도록 이관 중에만 갱신 trigger를 멈춥니다.
alter table public.games disable trigger set_games_updated_at;
select private.capture_game_version_for_game(id)
from public.games;
-- current_version_id의 지연 FK를 먼저 검사해야 같은 테이블의 trigger 상태를 바꿀 수 있습니다.
set constraints all immediate;
alter table public.games enable trigger set_games_updated_at;

create table if not exists public.game_submissions (
  id uuid primary key default gen_random_uuid(),
  game_id text not null references public.games (id) on delete restrict,
  game_version_id uuid not null,
  owner_id uuid not null references auth.users (id) on delete restrict,
  submission_revision integer not null check (submission_revision >= 1),
  status text not null check (status in ('pending_review', 'changes_requested', 'rejected', 'published', 'withdrawn')),
  submission_note text,
  submitted_snapshot jsonb not null check (jsonb_typeof(submitted_snapshot) = 'object'),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{32}$'),
  consent_document_version text,
  consent_recorded_at timestamptz,
  consent_evidence_status text not null check (consent_evidence_status in ('missing', 'legacy_unversioned', 'versioned')),
  submitted_at timestamptz not null,
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users (id) on delete restrict,
  reviewer_note text,
  created_at timestamptz not null default now(),
  unique (game_id, submission_revision),
  foreign key (game_version_id, game_id)
    references public.game_versions (id, game_id)
    on delete restrict
    deferrable initially deferred,
  constraint game_submissions_submission_note_length
    check (submission_note is null or char_length(submission_note) <= 1000),
  constraint game_submissions_reviewer_note_length
    check (reviewer_note is null or char_length(reviewer_note) <= 1000),
  constraint game_submissions_versioned_consent_complete
    check (
      consent_evidence_status <> 'versioned'
      or (consent_document_version is not null and consent_recorded_at is not null)
    )
);

create index if not exists game_submissions_review_queue_idx
on public.game_submissions (status, submitted_at asc);

create index if not exists game_submissions_owner_id_idx
on public.game_submissions (owner_id, submitted_at desc);

-- 현재 공개/검수 상태인 과거 사용자 게임은 제출 시점의 알려진 값만 옮깁니다.
-- 문서 버전이 없으면 legacy_unversioned로 남겨 후속 동의 확인 대상에서 제외되지 않게 합니다.
insert into public.game_submissions (
  game_id, game_version_id, owner_id, submission_revision, status, submission_note,
  submitted_snapshot, content_hash, consent_document_version, consent_recorded_at,
  consent_evidence_status, submitted_at, reviewed_at, reviewed_by, reviewer_note
)
select
  g.id,
  v.id,
  g.owner_id,
  1,
  case
    when g.moderation_status = 'published' then 'published'
    when g.moderation_status = 'rejected' then 'rejected'
    else 'pending_review'
  end,
  g.submission_note,
  v.snapshot,
  v.content_hash,
  null,
  g.sharing_consent_at,
  case when g.sharing_consent_at is null then 'missing' else 'legacy_unversioned' end,
  coalesce(g.submitted_at, g.updated_at, g.created_at),
  g.reviewed_at,
  g.reviewed_by,
  g.review_note
from public.games g
join public.game_versions v on v.id = g.current_version_id
where g.source = 'user'
  and g.owner_id is not null
  and (
    g.submitted_at is not null
    or g.moderation_status in ('pending_review', 'published', 'rejected')
  )
on conflict (game_id, submission_revision) do nothing;

-- 새 제출은 당시 버전 스냅샷을 별도 행에 고정합니다. 이전 boolean 동의 경로는
-- 문서 버전이 없으므로 legacy_unversioned로만 기록되며, P10에서 versioned 동의 경로로 교체합니다.
create or replace function private.capture_game_submission_for_game(p_game_id text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_game public.games%rowtype;
  v_version public.game_versions%rowtype;
  v_next_revision integer;
  v_submission_id uuid;
begin
  select * into v_game
  from public.games
  where id = p_game_id;

  if not found or v_game.source <> 'user' or v_game.owner_id is null then return null; end if;

  perform private.capture_game_version_for_game(v_game.id);

  select * into v_version
  from public.game_versions
  where id = (select current_version_id from public.games where id = v_game.id);

  if not found then raise exception 'game version missing'; end if;

  select coalesce(max(submission_revision), 0) + 1 into v_next_revision
  from public.game_submissions
  where game_id = v_game.id;

  insert into public.game_submissions (
    game_id, game_version_id, owner_id, submission_revision, status, submission_note,
    submitted_snapshot, content_hash, consent_document_version, consent_recorded_at,
    consent_evidence_status, submitted_at
  ) values (
    v_game.id, v_version.id, v_game.owner_id, v_next_revision, 'pending_review',
    v_game.submission_note, v_version.snapshot, v_version.content_hash, null,
    v_game.sharing_consent_at,
    case when v_game.sharing_consent_at is null then 'missing' else 'legacy_unversioned' end,
    coalesce(v_game.submitted_at, now())
  ) returning id into v_submission_id;

  return v_submission_id;
end;
$$;

create or replace function private.capture_game_version_from_game_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.capture_game_version_for_game(new.id);
  return null;
end;
$$;

create or replace function private.capture_game_version_from_item_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform private.capture_game_version_for_game(case when tg_op = 'DELETE' then old.game_id else new.game_id end);
  return null;
end;
$$;

create or replace function private.capture_game_submission_from_status_trigger()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.source = 'user'
    and new.moderation_status = 'pending_review'
    and old.moderation_status is distinct from 'pending_review' then
    perform private.capture_game_submission_for_game(new.id);
  end if;
  return null;
end;
$$;

drop trigger if exists capture_game_version_after_insert on public.games;
drop trigger if exists capture_game_version_after_content_update on public.games;
drop trigger if exists capture_game_version_after_item_write on public.game_items;
drop trigger if exists capture_game_submission_after_status_change on public.games;

create constraint trigger capture_game_version_after_insert
after insert on public.games
deferrable initially deferred
for each row execute function private.capture_game_version_from_game_trigger();

create constraint trigger capture_game_version_after_content_update
after update of
  owner_id, source, parent_game_id, credit_name, credit_url, origin, name, archetype, phase,
  duration_minutes, places, mode, energy, description, host_script, rule_steps, people_min,
  people_max, recommended_teams_min, recommended_teams_max, contexts, preparations, difficulty, series
on public.games
deferrable initially deferred
for each row execute function private.capture_game_version_from_game_trigger();

create constraint trigger capture_game_version_after_item_write
after insert or update or delete on public.game_items
deferrable initially deferred
for each row execute function private.capture_game_version_from_item_trigger();

create constraint trigger capture_game_submission_after_status_change
after update of moderation_status on public.games
deferrable initially deferred
for each row execute function private.capture_game_submission_from_status_trigger();

revoke all on table public.game_versions from anon, authenticated;
revoke all on table public.game_submissions from anon, authenticated;
alter table public.game_versions enable row level security;
alter table public.game_submissions enable row level security;

revoke all on function private.capture_game_version_for_game(text) from public, anon, authenticated;
revoke all on function private.capture_game_submission_for_game(text) from public, anon, authenticated;
revoke all on function private.capture_game_version_from_game_trigger() from public, anon, authenticated;
revoke all on function private.capture_game_version_from_item_trigger() from public, anon, authenticated;
revoke all on function private.capture_game_submission_from_status_trigger() from public, anon, authenticated;
