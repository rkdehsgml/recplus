-- P07 적용 뒤 실행하는 읽기 전용 권한·무결성 대조입니다.
-- RPC 동작(재전송·충돌·타인 접근)은 별도 인증 세션 테스트로 확인합니다.

-- 1. 플랜 항목은 항상 같은 게임의 불변 버전을 가리켜야 합니다.
select count(*) as invalid_plan_item_version_reference_count
from public.event_plan_games item
left join public.game_versions version
  on version.id = item.game_version_id
 and version.game_id = item.game_id
where item.version_resolution_state = 'resolved'
  and version.id is null;

-- 2. 영수증은 소유자와 플랜이 일치하고, 저장된 revision을 가리켜야 합니다.
select count(*) as invalid_plan_receipt_reference_count
from public.event_plan_command_receipts receipt
left join public.event_plans plan
  on plan.id = receipt.event_plan_id
 and plan.owner_id = receipt.owner_id
where plan.id is null or receipt.accepted_revision < 0;

-- 3. authenticated는 읽기와 새 RPC만 가능하며, 플랜 부모·자식 직접 쓰기는 불가능해야 합니다.
select
  has_table_privilege('authenticated', 'public.event_plans', 'SELECT') as can_read_plans,
  has_table_privilege('authenticated', 'public.event_plans', 'INSERT') as can_insert_plans_directly,
  has_table_privilege('authenticated', 'public.event_plans', 'UPDATE') as can_update_plans_directly,
  has_table_privilege('authenticated', 'public.event_plans', 'DELETE') as can_delete_plans_directly,
  has_table_privilege('authenticated', 'public.event_plan_games', 'INSERT') as can_insert_plan_items_directly,
  has_table_privilege('authenticated', 'public.event_plan_games', 'UPDATE') as can_update_plan_items_directly,
  has_table_privilege('authenticated', 'public.event_plan_games', 'DELETE') as can_delete_plan_items_directly,
  has_function_privilege('authenticated', 'public.save_event_plan(jsonb,integer,uuid)', 'EXECUTE') as can_execute_save_rpc,
  has_function_privilege('anon', 'public.save_event_plan(jsonb,integer,uuid)', 'EXECUTE') as anon_can_execute_save_rpc;
