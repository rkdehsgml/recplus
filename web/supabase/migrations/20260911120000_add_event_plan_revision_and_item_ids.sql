-- P04: 편집 가능한 행사 플랜에 revision·조건 보완 상태를, 항목에 안정적 UUID와 게임 버전 참조를 추가합니다.
-- 기존 플랜의 행사군/제약은 추정하지 않습니다. null + needs_enrichment는 새 실행 전에 사용자가 보완해야 함을 뜻합니다.

alter table public.event_plans
  add column if not exists revision integer not null default 0,
  add column if not exists event_group text,
  add column if not exists event_type text,
  add column if not exists event_constraints text[],
  add column if not exists condition_completion_state text not null default 'needs_enrichment';

alter table public.event_plans
  drop constraint if exists event_plans_revision_nonnegative,
  add constraint event_plans_revision_nonnegative check (revision >= 0),
  drop constraint if exists event_plans_place_check,
  add constraint event_plans_place_check
    check (place in ('room', 'restaurant', 'hall', 'bus', 'outdoor', 'other')),
  drop constraint if exists event_plans_event_group_check,
  add constraint event_plans_event_group_check
    check (event_group is null or event_group in ('school', 'university', 'company', 'private_or_other')),
  drop constraint if exists event_plans_event_type_length,
  add constraint event_plans_event_type_length
    check (event_type is null or char_length(event_type) between 1 and 80),
  drop constraint if exists event_plans_condition_completion_state_check,
  add constraint event_plans_condition_completion_state_check
    check (condition_completion_state in ('needs_enrichment', 'complete')),
  drop constraint if exists event_plans_complete_conditions_present,
  add constraint event_plans_complete_conditions_present
    check (
      condition_completion_state <> 'complete'
      or (event_group is not null and event_constraints is not null)
    );

create index if not exists event_plans_owner_condition_state_updated_idx
on public.event_plans (owner_id, condition_completion_state, updated_at desc);

alter table public.event_plan_games
  add column if not exists plan_item_id uuid,
  add column if not exists game_version_id uuid,
  add column if not exists version_resolution_state text not null default 'needs_version_resolution';

-- 기존 position 기반 항목에 한 번만 UUID를 부여합니다.
update public.event_plan_games
set plan_item_id = gen_random_uuid()
where plan_item_id is null;

-- DB 카탈로그에서 확인 가능한 기존 snapshot만 현재 게임·버전으로 연결합니다.
-- 로컬 전용/삭제됨/확인 불가 snapshot은 null과 needs_version_resolution으로 남깁니다.
update public.event_plan_games item
set game_id = coalesce(item.game_id, game.id),
    game_version_id = game.current_version_id,
    version_resolution_state = case
      when game.current_version_id is not null then 'resolved'
      else 'needs_version_resolution'
    end
from public.games game
where game.id = coalesce(item.game_id, nullif(item.game_snapshot ->> 'id', ''));

update public.event_plan_games
set version_resolution_state = 'resolved'
where game_id is not null
  and game_version_id is not null;

alter table public.event_plan_games
  alter column plan_item_id set not null,
  drop constraint if exists event_plan_games_plan_item_id_key,
  add constraint event_plan_games_plan_item_id_key unique (plan_item_id),
  drop constraint if exists event_plan_games_version_resolution_state_check,
  add constraint event_plan_games_version_resolution_state_check
    check (version_resolution_state in ('needs_version_resolution', 'resolved')),
  drop constraint if exists event_plan_games_resolved_version_present,
  add constraint event_plan_games_resolved_version_present
    check (
      version_resolution_state <> 'resolved'
      or (game_id is not null and game_version_id is not null)
    ),
  drop constraint if exists event_plan_games_version_matches_game,
  add constraint event_plan_games_version_matches_game
    foreign key (game_version_id, game_id)
    references public.game_versions (id, game_id)
    on delete restrict
    deferrable initially deferred;

create index if not exists event_plan_games_plan_item_id_idx
on public.event_plan_games (plan_item_id);

create index if not exists event_plan_games_game_version_id_idx
on public.event_plan_games (game_version_id);
