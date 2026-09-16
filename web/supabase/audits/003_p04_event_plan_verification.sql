-- P04 migration 적용 뒤 실행하는 읽기 전용 플랜 이관 대조입니다.
-- 결과에는 플랜 이름, 팀 이름, 게임 본문 등 원문을 기록하지 않습니다.

-- 1. revision/항목 UUID/position 유일성이 깨진 행은 없어야 합니다.
select
  count(*) filter (where revision < 0) as negative_plan_revision_count,
  count(*) filter (where condition_completion_state = 'complete' and (event_group is null or event_constraints is null))
    as incomplete_completed_condition_count
from public.event_plans;

select
  count(*) filter (where plan_item_id is null) as missing_plan_item_id_count,
  count(*) - count(distinct plan_item_id) as duplicate_plan_item_id_count
from public.event_plan_games;

select count(*) as duplicate_position_count
from (
  select event_plan_id, position
  from public.event_plan_games
  group by event_plan_id, position
  having count(*) > 1
) duplicate_position;

-- 2. resolved 항목의 게임/버전은 같은 게임을 가리켜야 합니다.
select count(*) as invalid_resolved_item_count
from public.event_plan_games item
left join public.game_versions version
  on version.id = item.game_version_id
 and version.game_id = item.game_id
where item.version_resolution_state = 'resolved'
  and version.id is null;

-- 3. 기존 플랜의 미보완 조건과 버전 미해결 항목 수를 기록합니다.
-- 이 수는 오류가 아니라 P17/P07 전 사용자가 보완해야 할 이관 작업량입니다.
select condition_completion_state, count(*) as plan_count
from public.event_plans
group by condition_completion_state
order by condition_completion_state;

select version_resolution_state, count(*) as item_count
from public.event_plan_games
group by version_resolution_state
order by version_resolution_state;
