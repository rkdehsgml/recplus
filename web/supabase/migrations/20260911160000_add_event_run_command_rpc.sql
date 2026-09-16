-- P08: 실행 시작·게임 상태·종료·정정은 이 RPC만 변경할 수 있습니다.
-- 명령 영수증은 같은 사용자/request_id의 응답 유실 재전송에만 재사용합니다.
create or replace function public.apply_event_run_command(p_command jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_kind text;
  v_run_id uuid;
  v_request_id uuid;
  v_primary_device_id uuid;
  v_plan_id uuid;
  v_expected_revision integer;
  v_expected_plan_revision integer;
  v_status text;
  v_reason text;
  v_elapsed_seconds integer;
  v_practice boolean := false;
  v_fingerprint text;
  v_receipt public.run_command_receipts%rowtype;
  v_run public.event_runs%rowtype;
  v_plan public.event_plans%rowtype;
  v_game public.event_run_games%rowtype;
  v_next_sequence integer;
  v_next_revision integer;
  v_result jsonb;
begin
  if v_user_id is null then raise exception 'authentication_required'; end if;
  if p_command is null or jsonb_typeof(p_command) <> 'object' then raise exception 'invalid_run_command'; end if;

  v_kind := p_command ->> 'kind';
  if v_kind is null
    or v_kind not in ('start_run', 'start_game', 'record_game_result', 'finish_run', 'abort_run', 'correct_game_result') then
    raise exception 'invalid_run_command';
  end if;
  if coalesce(p_command ->> 'run_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    or coalesce(p_command ->> 'request_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    or coalesce(p_command ->> 'primary_device_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then
    raise exception 'invalid_run_command_identity';
  end if;

  v_run_id := (p_command ->> 'run_id')::uuid;
  v_request_id := (p_command ->> 'request_id')::uuid;
  v_primary_device_id := (p_command ->> 'primary_device_id')::uuid;
  v_fingerprint := pg_catalog.md5(p_command::text);

  -- 동시 재전송이 receipt unique 제약 오류로 끝나지 않도록 논리 명령 단위로 직렬화합니다.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(v_user_id::text || ':' || v_request_id::text));
  select * into v_receipt from public.run_command_receipts
  where owner_id = v_user_id and request_id = v_request_id;
  if found then
    if v_receipt.request_fingerprint <> v_fingerprint then raise exception 'request_id_reused'; end if;
    return v_receipt.response_payload || jsonb_build_object('reused', true);
  end if;

  if v_kind = 'start_run' then
    if coalesce(p_command ->> 'plan_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      or coalesce(p_command ->> 'expected_plan_revision', '') !~ '^[0-9]+$' then
      raise exception 'invalid_start_run';
    end if;
    if p_command ? 'practice' and jsonb_typeof(p_command -> 'practice') <> 'boolean' then raise exception 'invalid_practice_flag'; end if;

    v_plan_id := (p_command ->> 'plan_id')::uuid;
    v_expected_plan_revision := (p_command ->> 'expected_plan_revision')::integer;
    v_practice := coalesce((p_command ->> 'practice')::boolean, false);
    select * into v_plan from public.event_plans
    where id = v_plan_id and owner_id = v_user_id for update;
    if not found then raise exception 'forbidden'; end if;
    if v_plan.revision <> v_expected_plan_revision then raise exception 'revision_conflict'; end if;
    if v_plan.condition_completion_state <> 'complete' then raise exception 'plan_conditions_incomplete'; end if;
    if exists (select 1 from public.event_runs where id = v_run_id) then raise exception 'run_id_reused'; end if;
    if not exists (select 1 from public.event_plan_games where event_plan_id = v_plan.id) then raise exception 'empty_plan'; end if;
    if exists (select 1 from public.event_plan_games where event_plan_id = v_plan.id and version_resolution_state <> 'resolved') then
      raise exception 'unresolved_plan_game_version';
    end if;

    insert into public.event_runs (
      id, event_plan_id, owner_id, plan_revision, plan_snapshot, primary_device_id, is_practice
    ) values (
      v_run_id, v_plan.id, v_user_id, v_plan.revision,
      jsonb_build_object(
        'schema_version', 1, 'plan_id', v_plan.id, 'revision', v_plan.revision,
        'conditions', jsonb_build_object(
          'event_group', v_plan.event_group, 'event_type', v_plan.event_type,
          'event_constraints', v_plan.event_constraints, 'place', v_plan.place,
          'people', v_plan.people, 'mode', v_plan.mode, 'target_minutes', v_plan.target_minutes
        )
      ),
      v_primary_device_id, v_practice
    );
    insert into public.event_run_games (
      event_run_id, event_plan_id, plan_item_id, game_id, game_version_id,
      position, allocated_minutes, game_snapshot, condition_snapshot
    )
    select v_run_id, item.event_plan_id, item.plan_item_id, item.game_id,
      item.game_version_id, item.position, item.allocated_minutes, version.snapshot,
      (select plan_snapshot -> 'conditions' from public.event_runs where id = v_run_id)
    from public.event_plan_games item
    join public.game_versions version on version.id = item.game_version_id
    where item.event_plan_id = v_plan.id;

    v_next_revision := 0;
    v_next_sequence := 1;
    insert into public.run_events (event_run_id, owner_id, event_sequence, event_type, request_id)
    values (v_run_id, v_user_id, v_next_sequence, 'run_started', v_request_id);
  else
    if coalesce(p_command ->> 'expected_revision', '') !~ '^[0-9]+$' then raise exception 'invalid_expected_revision'; end if;
    v_expected_revision := (p_command ->> 'expected_revision')::integer;
    select * into v_run from public.event_runs where id = v_run_id for update;
    if not found or v_run.owner_id <> v_user_id then raise exception 'forbidden'; end if;
    if v_run.primary_device_id <> v_primary_device_id then raise exception 'primary_device_mismatch'; end if;
    if v_run.revision <> v_expected_revision then raise exception 'revision_conflict'; end if;
    v_next_revision := v_run.revision + 1;
    select coalesce(max(event_sequence), 0) + 1 into v_next_sequence
    from public.run_events where event_run_id = v_run_id;

    if v_kind in ('start_game', 'record_game_result', 'correct_game_result') then
      if coalesce(p_command ->> 'run_game_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then raise exception 'invalid_run_game_id'; end if;
      select * into v_game from public.event_run_games
      where id = (p_command ->> 'run_game_id')::uuid and event_run_id = v_run_id for update;
      if not found then raise exception 'run_game_not_found'; end if;

      if v_kind = 'start_game' then
        if v_run.status <> 'active' or v_game.status <> 'pending' then raise exception 'state_mismatch'; end if;
        update public.event_run_games set status = 'playing', revision = revision + 1, started_at = now() where id = v_game.id;
        insert into public.run_events (event_run_id, owner_id, run_game_id, event_sequence, event_type, request_id)
        values (v_run_id, v_user_id, v_game.id, v_next_sequence, 'game_started', v_request_id);
      elsif v_kind = 'record_game_result' then
        v_status := p_command ->> 'status';
        if v_run.status <> 'active' or v_status is null or v_status not in ('completed', 'skipped')
          or (v_status = 'completed' and v_game.status <> 'playing')
          or (v_status = 'skipped' and v_game.status not in ('pending', 'playing')) then raise exception 'state_mismatch'; end if;
        v_reason := nullif(btrim(p_command ->> 'reason'), '');
        if v_status = 'skipped' and v_reason is null then raise exception 'skip_reason_required'; end if;
        if p_command ? 'console_elapsed_seconds' then
          if coalesce(p_command ->> 'console_elapsed_seconds', '') !~ '^[0-9]+$' then raise exception 'invalid_console_elapsed_seconds'; end if;
          v_elapsed_seconds := (p_command ->> 'console_elapsed_seconds')::integer;
        else v_elapsed_seconds := null; end if;
        update public.event_run_games
        set status = v_status, revision = revision + 1, result_reason = v_reason,
          result_payload = jsonb_build_object('console_elapsed_seconds', v_elapsed_seconds),
          started_at = coalesce(started_at, now()), resolved_at = now()
        where id = v_game.id;
        insert into public.run_events (
          event_run_id, owner_id, run_game_id, event_sequence, event_type, request_id, event_payload
        ) values (
          v_run_id, v_user_id, v_game.id, v_next_sequence,
          case when v_status = 'completed' then 'game_completed' else 'game_skipped' end,
          v_request_id, jsonb_build_object('status', v_status, 'reason', v_reason, 'console_elapsed_seconds', v_elapsed_seconds)
        );
      else
        v_status := p_command ->> 'status';
        v_reason := nullif(btrim(p_command ->> 'reason'), '');
        if v_run.status not in ('finished', 'aborted') or v_game.status not in ('completed', 'skipped')
          or v_status is null or v_status not in ('completed', 'skipped') or v_reason is null then raise exception 'invalid_result_correction'; end if;
        update public.event_run_games
        set status = v_status, revision = revision + 1, result_reason = v_reason, resolved_at = now()
        where id = v_game.id;
        insert into public.run_events (
          event_run_id, owner_id, run_game_id, event_sequence, event_type, request_id, event_payload
        ) values (
          v_run_id, v_user_id, v_game.id, v_next_sequence, 'game_corrected', v_request_id,
          jsonb_build_object('from_status', v_game.status, 'to_status', v_status, 'reason', v_reason)
        );
      end if;
    else
      if v_run.status <> 'active' then raise exception 'state_mismatch'; end if;
      if exists (select 1 from public.event_run_games where event_run_id = v_run_id and status = 'playing') then
        raise exception 'playing_game_requires_result';
      end if;
      v_reason := nullif(btrim(p_command ->> 'reason'), '');
      update public.event_runs
      set status = case when v_kind = 'finish_run' then 'finished' else 'aborted' end,
        ended_at = now(), revision = v_next_revision
      where id = v_run_id;
      insert into public.run_events (event_run_id, owner_id, event_sequence, event_type, request_id, event_payload)
      values (
        v_run_id, v_user_id, v_next_sequence,
        case when v_kind = 'finish_run' then 'run_finished' else 'run_aborted' end,
        v_request_id, jsonb_build_object('reason', v_reason)
      );
    end if;

    -- 실행 revision은 모든 업무 이벤트마다 증가합니다. 다음 outbox 명령은 이 값을 사용합니다.
    if v_kind in ('start_game', 'record_game_result', 'correct_game_result') then
      update public.event_runs set revision = v_next_revision where id = v_run_id;
    end if;
  end if;

  v_result := jsonb_build_object('id', v_run_id, 'revision', v_next_revision, 'server_received_at', now(), 'reused', false);
  insert into public.run_command_receipts (
    event_run_id, owner_id, request_id, command_type, request_fingerprint, response_payload, run_revision
  ) values (
    v_run_id, v_user_id, v_request_id, v_kind, v_fingerprint, v_result, v_next_revision
  );
  return v_result;
end;
$$;

revoke all on function public.apply_event_run_command(jsonb) from public, anon;
grant execute on function public.apply_event_run_command(jsonb) to authenticated;
