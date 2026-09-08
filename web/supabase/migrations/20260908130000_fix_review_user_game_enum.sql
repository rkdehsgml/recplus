-- p_decision이 text이므로 CASE 결과를 games enum 타입으로 명시적으로 변환합니다.

create or replace function public.review_user_game(
  p_game_id text,
  p_decision text,
  p_review_note text
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not (select private.is_game_admin()) then raise exception 'admin required'; end if;
  if p_decision not in ('published', 'rejected') then raise exception 'invalid review decision'; end if;
  if p_decision = 'rejected' and nullif(pg_catalog.btrim(p_review_note), '') is null then
    raise exception 'review note required for rejection';
  end if;

  update public.games set
    visibility = (case when p_decision = 'published' then 'public' else 'private' end)::public.game_visibility,
    moderation_status = p_decision::public.game_moderation_status,
    published_at = case when p_decision = 'published' then now() else null end,
    reviewed_at = now(),
    reviewed_by = (select auth.uid()),
    review_note = nullif(pg_catalog.btrim(p_review_note), '')
  where id = p_game_id
    and source = 'user'
    and moderation_status = 'pending_review'
    and sharing_consent_at is not null;

  if not found then raise exception 'game is not eligible for review'; end if;
end;
$$;

revoke all on function public.review_user_game(text, text, text) from public, anon;
grant execute on function public.review_user_game(text, text, text) to authenticated;

-- 관리자 저장 함수의 공개 여부 CASE도 enum으로 명시 변환합니다.
create or replace function public.save_admin_game(p_game jsonb, p_items jsonb, p_publish boolean)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_game_id text := p_game ->> 'id';
  v_existing_source public.game_source;
begin
  if not (select private.is_game_admin()) then raise exception 'admin required'; end if;
  select source into v_existing_source from public.games where id = v_game_id;

  if v_existing_source is null then
    insert into public.games (
      id, owner_id, source, visibility, moderation_status, name, archetype, phase,
      duration_minutes, places, mode, energy, description, host_script, rule_steps,
      people_min, people_max, recommended_teams_min, recommended_teams_max,
      contexts, preparations, difficulty, origin, series, published_at
    ) values (
      v_game_id, null, 'official',
      (case when p_publish then 'public' else 'private' end)::public.game_visibility,
      (case when p_publish then 'published' else 'draft' end)::public.game_moderation_status,
      p_game ->> 'name', p_game ->> 'archetype', p_game ->> 'phase',
      (p_game ->> 'duration_minutes')::integer,
      array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'places', '[]'::jsonb))),
      p_game ->> 'mode', (p_game ->> 'energy')::smallint, p_game ->> 'description',
      p_game ->> 'host_script', coalesce(p_game -> 'rule_steps', '[]'::jsonb),
      (p_game ->> 'people_min')::integer, (p_game ->> 'people_max')::integer,
      (p_game ->> 'recommended_teams_min')::integer, (p_game ->> 'recommended_teams_max')::integer,
      array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'contexts', '[]'::jsonb))),
      array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'preparations', '[]'::jsonb))),
      p_game ->> 'difficulty', p_game ->> 'origin',
      array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'series', '[]'::jsonb))),
      case when p_publish then now() else null end
    );
  else
    update public.games set
      name = p_game ->> 'name', archetype = p_game ->> 'archetype', phase = p_game ->> 'phase',
      duration_minutes = (p_game ->> 'duration_minutes')::integer,
      places = array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'places', '[]'::jsonb))),
      mode = p_game ->> 'mode', energy = (p_game ->> 'energy')::smallint,
      description = p_game ->> 'description', host_script = p_game ->> 'host_script',
      rule_steps = coalesce(p_game -> 'rule_steps', '[]'::jsonb),
      people_min = (p_game ->> 'people_min')::integer,
      people_max = (p_game ->> 'people_max')::integer,
      recommended_teams_min = (p_game ->> 'recommended_teams_min')::integer,
      recommended_teams_max = (p_game ->> 'recommended_teams_max')::integer,
      contexts = array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'contexts', '[]'::jsonb))),
      preparations = array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'preparations', '[]'::jsonb))),
      difficulty = p_game ->> 'difficulty', origin = p_game ->> 'origin',
      series = array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'series', '[]'::jsonb))),
      visibility = case when source = 'official' then (case when p_publish then 'public' else 'private' end)::public.game_visibility else visibility end,
      moderation_status = case when source = 'official' then (case when p_publish then 'published' else 'draft' end)::public.game_moderation_status else moderation_status end,
      published_at = case when source = 'official' then case when p_publish then now() else null end else published_at end
    where id = v_game_id;
  end if;

  delete from public.game_items where game_id = v_game_id;
  insert into public.game_items (id, game_id, kind, prompt, answer, hint, position)
  select
    v_game_id || '-item-' || pg_catalog.gen_random_uuid()::text,
    v_game_id,
    (entry.value ->> 'kind')::public.game_item_kind,
    entry.value ->> 'prompt', nullif(entry.value ->> 'answer', ''), nullif(entry.value ->> 'hint', ''),
    entry.ordinality::integer - 1
  from pg_catalog.jsonb_array_elements(coalesce(p_items, '[]'::jsonb))
    with ordinality as entry(value, ordinality);

  return v_game_id;
end;
$$;

revoke all on function public.save_admin_game(jsonb, jsonb, boolean) from public, anon;
grant execute on function public.save_admin_game(jsonb, jsonb, boolean) to authenticated;
