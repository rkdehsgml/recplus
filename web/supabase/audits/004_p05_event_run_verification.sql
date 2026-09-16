-- P05 migration 적용 뒤 실행하는 읽기 전용 실행 원본 대조입니다.
-- 현재 단계에서는 event_runs를 생성하는 RPC가 아직 없으므로 빈 결과도 정상입니다.

-- 1. 실행의 소유자·플랜 관계와 종료 상태/기술 시각은 일치해야 합니다.
select
  count(*) filter (where plan.owner_id is distinct from run.owner_id) as cross_owner_run_count,
  count(*) filter (where (run.status = 'active') <> (run.ended_at is null)) as invalid_run_end_state_count
from public.event_runs run
left join public.event_plans plan on plan.id = run.event_plan_id;

-- 2. 실행 게임은 같은 플랜 항목과 같은 게임의 불변 버전을 가리켜야 합니다.
select count(*) as invalid_run_game_reference_count
from public.event_run_games run_game
left join public.event_runs run
  on run.id = run_game.event_run_id
 and run.event_plan_id = run_game.event_plan_id
left join public.event_plan_games plan_item
  on plan_item.plan_item_id = run_game.plan_item_id
 and plan_item.event_plan_id = run_game.event_plan_id
left join public.game_versions version
  on version.id = run_game.game_version_id
 and version.game_id = run_game.game_id
where run.id is null or plan_item.plan_item_id is null or version.id is null;

-- 3. 주요 이벤트는 실행별로 1부터 연속된 순서이며 요청 ID는 소유자마다 하나여야 합니다.
select count(*) as invalid_event_sequence_count
from (
  select event_run_id, event_sequence,
    row_number() over (partition by event_run_id order by event_sequence) as expected_sequence
  from public.run_events
) sequenced
where event_sequence <> expected_sequence;

select count(*) as duplicate_owner_request_id_count
from (
  select owner_id, request_id
  from public.run_events
  group by owner_id, request_id
  having count(*) > 1
) duplicate_request;

-- 4. 영수증은 이벤트와 동일한 실행·소유자·요청 ID를 가리켜야 합니다.
-- P08 이전에는 두 테이블 모두 비어 있어도 정상입니다.
select count(*) as receipt_without_matching_event_count
from public.run_command_receipts receipt
left join public.run_events event
  on event.owner_id = receipt.owner_id
 and event.request_id = receipt.request_id
 and event.event_run_id = receipt.event_run_id
where event.id is null;
