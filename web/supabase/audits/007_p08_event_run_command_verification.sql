-- P08 적용 뒤 실행하는 읽기 전용 상태·권한 대조입니다.
-- 실제 JWT 재전송/충돌 시나리오는 P24의 별도 인증 세션 테스트에서 확인합니다.

-- 1. 현재 투영 상태와 업무 이벤트가 서로 모순되지 않아야 합니다.
select count(*) as invalid_resolved_run_game_count
from public.event_run_games
where (status = 'pending' and (started_at is not null or resolved_at is not null))
   or (status = 'playing' and (started_at is null or resolved_at is not null))
   or (status in ('completed', 'skipped') and resolved_at is null);

-- 2. start_run은 revision 0이고 이후 각 업무 이벤트마다 revision이 1씩 증가합니다.
select count(*) as invalid_run_revision_count
from public.event_runs run
where run.revision <> greatest(
  (select count(*) from public.run_events event where event.event_run_id = run.id) - 1,
  0
);

-- 3. 직접 테이블 쓰기는 막히고 인증 사용자만 제한 RPC를 실행할 수 있어야 합니다.
select
  has_table_privilege('authenticated', 'public.event_runs', 'INSERT') as can_insert_runs_directly,
  has_table_privilege('authenticated', 'public.event_run_games', 'UPDATE') as can_update_run_games_directly,
  has_table_privilege('authenticated', 'public.run_events', 'INSERT') as can_insert_run_events_directly,
  has_function_privilege('authenticated', 'public.apply_event_run_command(jsonb)', 'EXECUTE') as can_execute_run_rpc,
  has_function_privilege('anon', 'public.apply_event_run_command(jsonb)', 'EXECUTE') as anon_can_execute_run_rpc;
