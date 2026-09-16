-- P06: 행사 실행과 연결된 후기, 공개 동의 증거, 신고·검수·보유 처리 이력을 추가합니다.
-- D04(보유 기간·탈퇴 처리)와 D09(운영 담당)는 미정입니다. 따라서 자동 삭제·보존 기한·공개 권한을 여기서 추정하지 않습니다.

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.event_run_games'::regclass
      and conname = 'event_run_games_id_run_version_key'
  ) then
    alter table public.event_run_games
      add constraint event_run_games_id_run_version_key unique (id, event_run_id, game_version_id);
  end if;
end;
$$;

create table if not exists public.game_reviews (
  id uuid primary key default gen_random_uuid(),
  event_run_id uuid not null,
  event_run_game_id uuid not null,
  game_version_id uuid not null,
  -- 탈퇴 처리에서 감사·동의 증거를 cascade로 지우지 않도록 nullable + SET NULL로 둡니다.
  -- 생성·수정 자격은 이후 P09 RPC가 인증된 본인 소유 실행으로 별도 확인합니다.
  owner_id uuid references auth.users (id) on delete set null,
  revision integer not null default 1 check (revision >= 1),
  outcome text not null check (outcome in ('fit', 'conditional', 'not_fit')),
  reuse_intent text not null check (reuse_intent in ('yes', 'no', 'unknown')),
  actual_duration_minutes integer check (actual_duration_minutes is null or actual_duration_minutes between 1 and 1440),
  console_elapsed_seconds integer check (console_elapsed_seconds is null or console_elapsed_seconds >= 0),
  issue_tags text[] not null default '{}',
  tip text check (tip is null or char_length(tip) <= 200),
  status text not null default 'private'
    check (status in ('private', 'pending', 'published', 'changes_requested', 'rejected', 'withdrawn', 'hidden')),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{32}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint game_reviews_run_game_version_matches
    foreign key (event_run_game_id, event_run_id, game_version_id)
    references public.event_run_games (id, event_run_id, game_version_id)
    on delete restrict,
  constraint game_reviews_run_owner_matches
    foreign key (event_run_id, owner_id)
    references public.event_runs (id, owner_id)
    on delete restrict,
  constraint game_reviews_issue_tags_allowed check (
    array_position(issue_tags, null) is null
    and issue_tags <@ array[
      'duration_mismatch', 'rules_hard_to_understand', 'low_participation', 'noise',
      'physical_contact', 'preparation', 'technical_issue', 'other'
    ]::text[]
  ),
  unique (event_run_id, game_version_id),
  unique (id, revision),
  unique (id, revision, content_hash)
);

create table if not exists public.game_review_revisions (
  review_id uuid not null references public.game_reviews (id) on delete restrict,
  revision integer not null check (revision >= 1),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object'),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{32}$'),
  created_at timestamptz not null default now(),
  primary key (review_id, revision),
  unique (review_id, revision, content_hash)
);

-- 현재 후기 projection은 해당 revision의 보존된 본문과 해시를 반드시 가리켜야 합니다.
alter table public.game_reviews
  drop constraint if exists game_reviews_current_revision_snapshot_matches,
  add constraint game_reviews_current_revision_snapshot_matches
    foreign key (id, revision, content_hash)
    references public.game_review_revisions (review_id, revision, content_hash)
    on delete restrict
    deferrable initially deferred;

-- 공개 제출은 가입 동의와 다른, 특정 후기 revision의 불변 증거입니다.
create table if not exists public.game_review_public_consents (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null,
  review_revision integer not null,
  document_id text not null check (char_length(document_id) between 1 and 120),
  document_version text not null check (char_length(document_version) between 1 and 120),
  content_hash text not null check (content_hash ~ '^[0-9a-f]{32}$'),
  consented_at timestamptz not null,
  created_at timestamptz not null default now(),
  constraint game_review_public_consents_revision_matches
    foreign key (review_id, review_revision, content_hash)
    references public.game_review_revisions (review_id, revision, content_hash)
    on delete restrict
);

-- 철회 뒤 같은 revision을 다시 공개 제출할 때도 새 동의 증거를 보존해야 합니다.
-- 같은 request_id의 중복 처리는 P09 영수증 구조가 담당하며, 이 표의 revision 단일 유일키로 막지 않습니다.
alter table public.game_review_public_consents
  drop constraint if exists game_review_public_consents_review_id_review_revision_key;

-- 동의 철회도 원 증거를 고치지 않고 별도 원본으로 남깁니다.
create table if not exists public.game_review_consent_withdrawals (
  id uuid primary key default gen_random_uuid(),
  public_consent_id uuid not null references public.game_review_public_consents (id) on delete restrict,
  actor_id uuid references auth.users (id) on delete set null,
  reason text check (reason is null or char_length(reason) <= 500),
  withdrawn_at timestamptz not null default now(),
  unique (public_consent_id)
);

-- 신고는 후기 revision 또는 게임의 특정 버전 중 정확히 하나를 실제 FK로 가리킵니다.
create table if not exists public.content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references auth.users (id) on delete set null,
  target_review_id uuid,
  target_review_revision integer,
  target_game_id text,
  target_game_version_id uuid,
  category text not null check (category in ('privacy', 'rights', 'safety', 'other')),
  details text check (details is null or char_length(details) <= 1000),
  status text not null default 'submitted'
    check (status in ('submitted', 'under_review', 'resolved', 'dismissed', 'withdrawn')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_reports_exactly_one_target check (
    (
      target_review_id is not null and target_review_revision is not null
      and target_game_id is null and target_game_version_id is null
    )
    or (
      target_review_id is null and target_review_revision is null
      and target_game_id is not null and target_game_version_id is not null
    )
  ),
  constraint content_reports_review_revision_matches
    foreign key (target_review_id, target_review_revision)
    references public.game_review_revisions (review_id, revision)
    on delete restrict,
  constraint content_reports_game_version_matches
    foreign key (target_game_version_id, target_game_id)
    references public.game_versions (id, game_id)
    on delete restrict
);

-- 검수·숨김·복구는 대상 문자열이 아닌 실제 FK 하나와 당시 revision을 보관합니다.
create table if not exists public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  target_review_id uuid,
  target_review_revision integer,
  target_game_submission_id uuid,
  target_content_report_id uuid,
  action_type text not null check (action_type in (
    'review_submitted', 'review_changes_requested', 'review_published', 'review_rejected',
    'review_hidden', 'review_restored', 'review_withdrawn',
    'report_received', 'report_resolved', 'report_dismissed',
    'submission_changes_requested', 'submission_published', 'submission_rejected'
  )),
  reason text check (reason is null or char_length(reason) <= 1000),
  action_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(action_payload) = 'object'),
  created_at timestamptz not null default now(),
  constraint moderation_actions_exactly_one_target check (
    (
      target_review_id is not null and target_review_revision is not null
      and target_game_submission_id is null and target_content_report_id is null
    )
    or (
      target_review_id is null and target_review_revision is null
      and target_game_submission_id is not null and target_content_report_id is null
    )
    or (
      target_review_id is null and target_review_revision is null
      and target_game_submission_id is null and target_content_report_id is not null
    )
  ),
  constraint moderation_actions_review_revision_matches
    foreign key (target_review_id, target_review_revision)
    references public.game_review_revisions (review_id, revision)
    on delete restrict,
  constraint moderation_actions_submission_matches
    foreign key (target_game_submission_id)
    references public.game_submissions (id)
    on delete restrict,
  constraint moderation_actions_report_matches
    foreign key (target_content_report_id)
    references public.content_reports (id)
    on delete restrict,
  constraint moderation_actions_reason_required check (
    action_type not in (
      'review_changes_requested', 'review_rejected', 'review_hidden', 'review_restored',
      'report_resolved', 'report_dismissed', 'submission_changes_requested', 'submission_rejected'
    ) or nullif(btrim(reason), '') is not null
  )
);

-- 자동 만료일은 D04가 확정될 때까지 만들지 않습니다. 이 표는 처리 근거와 실제 FK만 보존합니다.
create table if not exists public.data_retention_actions (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  event_run_id uuid,
  game_review_id uuid,
  content_report_id uuid,
  moderation_action_id uuid,
  action_type text not null check (action_type in (
    'withdrawal_requested', 'access_restricted', 'retention_hold_applied',
    'retention_hold_released', 'anonymized', 'deletion_requested', 'deletion_completed'
  )),
  policy_reference text check (policy_reference is null or char_length(policy_reference) <= 120),
  reason text check (reason is null or char_length(reason) <= 1000),
  created_at timestamptz not null default now(),
  constraint data_retention_actions_exactly_one_target check (
    num_nonnulls(event_run_id, game_review_id, content_report_id, moderation_action_id) = 1
  ),
  constraint data_retention_actions_run_matches
    foreign key (event_run_id) references public.event_runs (id) on delete restrict,
  constraint data_retention_actions_review_matches
    foreign key (game_review_id) references public.game_reviews (id) on delete restrict,
  constraint data_retention_actions_report_matches
    foreign key (content_report_id) references public.content_reports (id) on delete restrict,
  constraint data_retention_actions_moderation_matches
    foreign key (moderation_action_id) references public.moderation_actions (id) on delete restrict,
  constraint data_retention_actions_reason_required check (
    action_type in ('withdrawal_requested', 'deletion_requested')
    or nullif(btrim(reason), '') is not null
  )
);

create index if not exists game_reviews_owner_status_updated_idx
on public.game_reviews (owner_id, status, updated_at desc);

create index if not exists game_reviews_game_version_status_idx
on public.game_reviews (game_version_id, status, updated_at desc);

create index if not exists content_reports_status_created_idx
on public.content_reports (status, created_at asc);

create index if not exists moderation_actions_created_idx
on public.moderation_actions (created_at desc);

create index if not exists data_retention_actions_created_idx
on public.data_retention_actions (created_at desc);

create or replace function private.prevent_game_review_identity_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_content_changed boolean;
begin
  if tg_op = 'DELETE' then
    raise exception 'game reviews are retained records and cannot be deleted';
  end if;

  if new.id is distinct from old.id
    or new.event_run_id is distinct from old.event_run_id
    or new.event_run_game_id is distinct from old.event_run_game_id
    or new.game_version_id is distinct from old.game_version_id
    or new.owner_id is distinct from old.owner_id
    or new.created_at is distinct from old.created_at then
    raise exception 'game review identity is immutable';
  end if;

  v_content_changed := new.outcome is distinct from old.outcome
    or new.reuse_intent is distinct from old.reuse_intent
    or new.actual_duration_minutes is distinct from old.actual_duration_minutes
    or new.console_elapsed_seconds is distinct from old.console_elapsed_seconds
    or new.issue_tags is distinct from old.issue_tags
    or new.tip is distinct from old.tip
    or new.content_hash is distinct from old.content_hash;

  if v_content_changed and new.revision <> old.revision + 1 then
    raise exception 'review content changes require exactly one new revision';
  end if;

  if not v_content_changed and new.revision <> old.revision then
    raise exception 'review revision cannot change without content changes';
  end if;

  return new;
end;
$$;

create or replace function private.prevent_immutable_pilot_audit_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  raise exception '% rows are immutable audit records', tg_table_name;
end;
$$;

-- revision 스냅샷은 현재 후기 projection의 원문 보존본이어야 합니다.
-- P09는 후기 projection을 새 revision으로 바꾼 같은 트랜잭션에서 이 행을 insert합니다.
create or replace function private.validate_game_review_revision_snapshot()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_review public.game_reviews%rowtype;
  v_expected_snapshot jsonb;
begin
  select * into v_review
  from public.game_reviews
  where id = new.review_id;

  if not found then
    raise exception 'game review does not exist';
  end if;

  v_expected_snapshot := jsonb_build_object(
    'schema_version', 1,
    'outcome', v_review.outcome,
    'reuse_intent', v_review.reuse_intent,
    'actual_duration_minutes', v_review.actual_duration_minutes,
    'console_elapsed_seconds', v_review.console_elapsed_seconds,
    'issue_tags', to_jsonb(v_review.issue_tags),
    'tip', v_review.tip
  );

  if new.revision <> v_review.revision
    or new.snapshot <> v_expected_snapshot
    or new.content_hash <> pg_catalog.md5(new.snapshot::text)
    or new.content_hash <> v_review.content_hash then
    raise exception 'game review revision snapshot does not match current review content';
  end if;

  return new;
end;
$$;

create or replace function private.prevent_content_report_target_mutation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'content reports are retained records and cannot be deleted';
  end if;

  if new.id is distinct from old.id
    or new.reporter_id is distinct from old.reporter_id
    or new.target_review_id is distinct from old.target_review_id
    or new.target_review_revision is distinct from old.target_review_revision
    or new.target_game_id is distinct from old.target_game_id
    or new.target_game_version_id is distinct from old.target_game_version_id
    or new.category is distinct from old.category
    or new.details is distinct from old.details
    or new.created_at is distinct from old.created_at then
    raise exception 'content report target and submission are immutable';
  end if;

  return new;
end;
$$;

drop trigger if exists set_game_reviews_updated_at on public.game_reviews;
create trigger set_game_reviews_updated_at
before update on public.game_reviews
for each row execute function public.set_updated_at();

drop trigger if exists prevent_game_review_identity_mutation on public.game_reviews;
create trigger prevent_game_review_identity_mutation
before update or delete on public.game_reviews
for each row execute function private.prevent_game_review_identity_mutation();

drop trigger if exists prevent_game_review_revisions_mutation on public.game_review_revisions;
create trigger prevent_game_review_revisions_mutation
before update or delete on public.game_review_revisions
for each row execute function private.prevent_immutable_pilot_audit_mutation();

drop trigger if exists validate_game_review_revision_snapshot on public.game_review_revisions;
create trigger validate_game_review_revision_snapshot
before insert on public.game_review_revisions
for each row execute function private.validate_game_review_revision_snapshot();

drop trigger if exists prevent_game_review_public_consents_mutation on public.game_review_public_consents;
create trigger prevent_game_review_public_consents_mutation
before update or delete on public.game_review_public_consents
for each row execute function private.prevent_immutable_pilot_audit_mutation();

drop trigger if exists prevent_game_review_consent_withdrawals_mutation on public.game_review_consent_withdrawals;
create trigger prevent_game_review_consent_withdrawals_mutation
before update or delete on public.game_review_consent_withdrawals
for each row execute function private.prevent_immutable_pilot_audit_mutation();

drop trigger if exists set_content_reports_updated_at on public.content_reports;
create trigger set_content_reports_updated_at
before update on public.content_reports
for each row execute function public.set_updated_at();

drop trigger if exists prevent_content_report_target_mutation on public.content_reports;
create trigger prevent_content_report_target_mutation
before update or delete on public.content_reports
for each row execute function private.prevent_content_report_target_mutation();

drop trigger if exists prevent_moderation_actions_mutation on public.moderation_actions;
create trigger prevent_moderation_actions_mutation
before update or delete on public.moderation_actions
for each row execute function private.prevent_immutable_pilot_audit_mutation();

drop trigger if exists prevent_data_retention_actions_mutation on public.data_retention_actions;
create trigger prevent_data_retention_actions_mutation
before update or delete on public.data_retention_actions
for each row execute function private.prevent_immutable_pilot_audit_mutation();

revoke all on table public.game_reviews from anon, authenticated;
revoke all on table public.game_review_revisions from anon, authenticated;
revoke all on table public.game_review_public_consents from anon, authenticated;
revoke all on table public.game_review_consent_withdrawals from anon, authenticated;
revoke all on table public.content_reports from anon, authenticated;
revoke all on table public.moderation_actions from anon, authenticated;
revoke all on table public.data_retention_actions from anon, authenticated;

alter table public.game_reviews enable row level security;
alter table public.game_review_revisions enable row level security;
alter table public.game_review_public_consents enable row level security;
alter table public.game_review_consent_withdrawals enable row level security;
alter table public.content_reports enable row level security;
alter table public.moderation_actions enable row level security;
alter table public.data_retention_actions enable row level security;
