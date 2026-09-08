-- 브라우저 로컬 MVP를 계정 기반 서비스로 옮기기 위한 원자적 저장·동기화 기반입니다.

create table if not exists public.user_game_item_packs (
  user_id uuid not null references auth.users (id) on delete cascade,
  game_id text not null,
  items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array'),
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table if not exists public.play_sessions (
  event_plan_id uuid not null references public.event_plans (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  state jsonb not null check (jsonb_typeof(state) = 'object'),
  updated_at timestamptz not null default now(),
  primary key (event_plan_id, owner_id)
);

revoke all on table public.user_game_item_packs from anon, authenticated;
revoke all on table public.play_sessions from anon, authenticated;
grant select, insert, update, delete on table public.user_game_item_packs to authenticated;
grant select, insert, update, delete on table public.play_sessions to authenticated;

alter table public.user_game_item_packs enable row level security;
alter table public.play_sessions enable row level security;

create policy "users manage their item packs"
on public.user_game_item_packs for all
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "users manage their play sessions"
on public.play_sessions for all
to authenticated
using (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.event_plans
    where event_plans.id = play_sessions.event_plan_id
      and event_plans.owner_id = (select auth.uid())
  )
)
with check (
  owner_id = (select auth.uid())
  and exists (
    select 1 from public.event_plans
    where event_plans.id = play_sessions.event_plan_id
      and event_plans.owner_id = (select auth.uid())
  )
);

-- 제출된 게임은 검토가 끝날 때까지 작성자가 본문·문항을 바꾸지 못하게 합니다.
drop policy if exists "users can edit their own unpublished games" on public.games;
create policy "users can edit their own draft games"
on public.games for update
to authenticated
using (
  owner_id = (select auth.uid())
  and source = 'user'
  and moderation_status in ('draft', 'rejected')
)
with check (
  owner_id = (select auth.uid())
  and source = 'user'
  and visibility = 'private'
  and moderation_status = 'draft'
);

drop policy if exists "owners can manage their game items" on public.game_items;
create policy "owners manage draft game items"
on public.game_items for all
to authenticated
using (
  exists (
    select 1 from public.games
    where games.id = game_items.game_id
      and games.owner_id = (select auth.uid())
      and games.source = 'user'
      and games.moderation_status in ('draft', 'rejected')
  )
)
with check (
  exists (
    select 1 from public.games
    where games.id = game_items.game_id
      and games.owner_id = (select auth.uid())
      and games.source = 'user'
      and games.moderation_status = 'draft'
  )
);

create trigger set_user_game_item_packs_updated_at
before update on public.user_game_item_packs
for each row execute function public.set_updated_at();

-- 행사와 게임 스냅샷을 한 트랜잭션에서 저장합니다.
create or replace function public.save_event_plan(p_plan jsonb)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_plan_id uuid := (p_plan ->> 'id')::uuid;
  v_owner_id uuid;
begin
  if v_user_id is null then raise exception 'authentication required'; end if;
  if v_plan_id is null then raise exception 'event plan id required'; end if;

  select owner_id into v_owner_id from public.event_plans where id = v_plan_id;
  if v_owner_id is not null and v_owner_id <> v_user_id then
    raise exception 'event plan belongs to another user';
  end if;

  insert into public.event_plans (
    id, owner_id, name, place, people, mode, target_minutes, teams
  ) values (
    v_plan_id,
    v_user_id,
    p_plan ->> 'name',
    p_plan ->> 'place',
    (p_plan ->> 'people')::integer,
    p_plan ->> 'mode',
    (p_plan ->> 'target_minutes')::integer,
    coalesce(p_plan -> 'teams', '[]'::jsonb)
  )
  on conflict (id) do update set
    name = excluded.name,
    place = excluded.place,
    people = excluded.people,
    mode = excluded.mode,
    target_minutes = excluded.target_minutes,
    teams = excluded.teams;

  delete from public.event_plan_games where event_plan_id = v_plan_id;

  insert into public.event_plan_games (
    event_plan_id, game_id, game_snapshot, allocated_minutes, position
  )
  select
    v_plan_id,
    null,
    entry.value -> 'snapshot',
    (entry.value ->> 'allocated_minutes')::integer,
    entry.ordinality::integer - 1
  from pg_catalog.jsonb_array_elements(coalesce(p_plan -> 'games', '[]'::jsonb))
    with ordinality as entry(value, ordinality);

  return v_plan_id;
end;
$$;

-- 사용자의 내 게임과 문항을 한 트랜잭션에서 저장합니다. 수정하면 검수 상태는 초안으로 돌아갑니다.
create or replace function public.save_user_game(p_game jsonb, p_items jsonb)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_game_id text := p_game ->> 'id';
  v_owner_id uuid;
  v_source public.game_source;
begin
  if v_user_id is null then raise exception 'authentication required'; end if;
  if v_game_id is null or char_length(v_game_id) < 1 then raise exception 'game id required'; end if;

  select owner_id, source into v_owner_id, v_source from public.games where id = v_game_id;
  if v_source is not null and (v_source <> 'user' or v_owner_id <> v_user_id) then
    raise exception 'game belongs to another owner';
  end if;

  insert into public.games (
    id, owner_id, source, visibility, moderation_status, name, archetype, phase,
    duration_minutes, places, mode, energy, description, host_script, rule_steps,
    people_min, people_max, recommended_teams_min, recommended_teams_max,
    contexts, preparations, difficulty, origin, series,
    submitted_at, sharing_consent_at, reviewed_at, reviewed_by, review_note
  ) values (
    v_game_id, v_user_id, 'user', 'private', 'draft', p_game ->> 'name',
    p_game ->> 'archetype', p_game ->> 'phase', (p_game ->> 'duration_minutes')::integer,
    array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'places', '[]'::jsonb))),
    p_game ->> 'mode', (p_game ->> 'energy')::smallint, p_game ->> 'description',
    coalesce(p_game ->> 'host_script', ''), coalesce(p_game -> 'rule_steps', '[]'::jsonb),
    (p_game ->> 'people_min')::integer, (p_game ->> 'people_max')::integer,
    (p_game ->> 'recommended_teams_min')::integer, (p_game ->> 'recommended_teams_max')::integer,
    array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'contexts', '[]'::jsonb))),
    array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'preparations', '[]'::jsonb))),
    p_game ->> 'difficulty', p_game ->> 'origin',
    array(select pg_catalog.jsonb_array_elements_text(coalesce(p_game -> 'series', '[]'::jsonb))),
    null, null, null, null, null
  )
  on conflict (id) do update set
    visibility = 'private', moderation_status = 'draft', name = excluded.name,
    archetype = excluded.archetype, phase = excluded.phase,
    duration_minutes = excluded.duration_minutes, places = excluded.places,
    mode = excluded.mode, energy = excluded.energy, description = excluded.description,
    host_script = excluded.host_script, rule_steps = excluded.rule_steps,
    people_min = excluded.people_min, people_max = excluded.people_max,
    recommended_teams_min = excluded.recommended_teams_min,
    recommended_teams_max = excluded.recommended_teams_max,
    contexts = excluded.contexts, preparations = excluded.preparations,
    difficulty = excluded.difficulty, origin = excluded.origin, series = excluded.series,
    published_at = null, submitted_at = null, sharing_consent_at = null,
    reviewed_at = null, reviewed_by = null, review_note = null;

  delete from public.game_items where game_id = v_game_id;
  insert into public.game_items (id, game_id, kind, prompt, answer, hint, position)
  select
    coalesce(nullif(entry.value ->> 'id', ''), v_game_id || '-item-' || entry.ordinality::text),
    v_game_id,
    (entry.value ->> 'kind')::public.game_item_kind,
    entry.value ->> 'prompt',
    nullif(entry.value ->> 'answer', ''),
    nullif(entry.value ->> 'hint', ''),
    entry.ordinality::integer - 1
  from pg_catalog.jsonb_array_elements(coalesce(p_items, '[]'::jsonb))
    with ordinality as entry(value, ordinality);

  return v_game_id;
end;
$$;

create or replace function public.submit_user_game(
  p_game_id text,
  p_submission_note text,
  p_sharing_consent boolean
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then raise exception 'authentication required'; end if;
  if p_sharing_consent is not true then raise exception 'sharing consent required'; end if;

  update public.games set
    visibility = 'unlisted',
    moderation_status = 'pending_review',
    submission_note = nullif(pg_catalog.btrim(p_submission_note), ''),
    submitted_at = now(),
    sharing_consent_at = now(),
    reviewed_at = null,
    reviewed_by = null,
    review_note = null
  where id = p_game_id
    and source = 'user'
    and owner_id = (select auth.uid())
    and moderation_status in ('draft', 'rejected');

  if not found then raise exception 'game is not eligible for submission'; end if;
end;
$$;

-- 관리자 편집도 게임 본문과 문항 교체를 원자적으로 처리합니다.
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
      v_game_id, null, 'official', case when p_publish then 'public' else 'private' end,
      case when p_publish then 'published' else 'draft' end,
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
      visibility = case when source = 'official' then case when p_publish then 'public' else 'private' end else visibility end,
      moderation_status = case when source = 'official' then case when p_publish then 'published' else 'draft' end else moderation_status end,
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
    visibility = case when p_decision = 'published' then 'public' else 'private' end,
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

revoke all on function public.save_event_plan(jsonb) from public, anon;
revoke all on function public.save_user_game(jsonb, jsonb) from public, anon;
revoke all on function public.submit_user_game(text, text, boolean) from public, anon;
revoke all on function public.save_admin_game(jsonb, jsonb, boolean) from public, anon;
revoke all on function public.review_user_game(text, text, text) from public, anon;
grant execute on function public.save_event_plan(jsonb) to authenticated;
grant execute on function public.save_user_game(jsonb, jsonb) to authenticated;
grant execute on function public.submit_user_game(text, text, boolean) to authenticated;
grant execute on function public.save_admin_game(jsonb, jsonb, boolean) to authenticated;
grant execute on function public.review_user_game(text, text, text) to authenticated;
