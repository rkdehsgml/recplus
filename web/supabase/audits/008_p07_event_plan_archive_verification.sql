-- 큐시트 보관 RPC 적용 뒤 실행하는 읽기 전용 검증입니다.

-- 1. 보관 뒤 새 실행이 만들어진 기록은 없어야 합니다.
select count(*) as run_started_after_plan_archived_count
from public.event_runs run
join public.event_plans plan on plan.id = run.event_plan_id
where plan.archived_at is not null
  and run.started_at > plan.archived_at;

-- 2. 보관 영수증은 현재 플랜과 같은 소유자이며 수락 revision을 보존해야 합니다.
select count(*) as invalid_archive_receipt_count
from public.event_plan_command_receipts receipt
left join public.event_plans plan
  on plan.id = receipt.event_plan_id
 and plan.owner_id = receipt.owner_id
where receipt.response_payload ? 'archived_at'
  and (
    plan.id is null
    or plan.archived_at is null
    or receipt.accepted_revision > plan.revision
  );

-- 3. 직접 삭제는 막고 인증 사용자만 보관 RPC를 실행할 수 있어야 합니다.
select
  has_table_privilege('authenticated', 'public.event_plans', 'DELETE') as can_delete_plans_directly,
  has_function_privilege('authenticated', 'public.archive_event_plan(uuid,integer,uuid)', 'EXECUTE') as can_execute_archive_rpc,
  has_function_privilege('anon', 'public.archive_event_plan(uuid,integer,uuid)', 'EXECUTE') as anon_can_execute_archive_rpc;
