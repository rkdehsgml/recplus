-- 레크플러스 파일럿 P00 읽기 전용 감사
-- SQL Editor에서 대상 환경을 확인한 뒤 실행한다.
-- INSERT/UPDATE/DELETE/DDL을 포함하지 않는다. 결과에는 집계와 메타데이터만 남긴다.

-- 1. 대상 확인. 이 프로젝트는 SQL로 조회 가능한 migration 기록 테이블이 없을 수 있다.
--    적용 이력은 Dashboard의 Database > Migrations에서 별도로 확인한다.
select current_database() as database_name,
       current_user as executed_as,
       current_setting('server_version') as postgres_version;

-- 2. 공개 스키마의 대상 테이블 존재와 RLS 활성화 상태.
select c.relname as table_name, c.relrowsecurity as rls_enabled
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relkind = 'r'
  and c.relname in (
    'games', 'game_items', 'event_plans', 'event_plan_games', 'play_sessions',
    'user_game_item_packs', 'game_favorites', 'user_consents', 'user_roles',
    'game_appearances'
  )
order by c.relname;

-- 3. 역할에 부여된 테이블 권한. public/anon/authenticated/service_role을 비교한다.
select grantee, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in (
    'games', 'game_items', 'event_plans', 'event_plan_games', 'play_sessions',
    'user_game_item_packs', 'game_favorites', 'user_consents', 'user_roles',
    'game_appearances'
  )
  and grantee in ('anon', 'authenticated', 'service_role', 'postgres')
order by table_name, grantee, privilege_type;

-- 4. RLS 정책의 명령별 적용 범위. expression에는 개인 데이터가 없어야 한다.
select tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'games', 'game_items', 'event_plans', 'event_plan_games', 'play_sessions',
    'user_game_item_packs', 'game_favorites', 'user_consents', 'user_roles',
    'game_appearances'
  )
order by tablename, policyname;

-- 5. 관련 함수의 실행 권한과 보안 모드. 새 파일럿 명령을 추가할 때 같은 형식으로 대조한다.
select routine_name, grantee, privilege_type
from information_schema.routine_privileges
where routine_schema = 'public'
  and routine_name in (
    'save_event_plan', 'save_user_game', 'submit_user_game',
    'review_user_game', 'save_admin_game'
  )
order by routine_name, grantee;

-- 6. 원문을 노출하지 않는 상태별 기준 수량.
select 'games' as entity, visibility || ':' || moderation_status as bucket, count(*) as row_count
from public.games
group by visibility, moderation_status
union all
select 'event_plans', 'all', count(*) from public.event_plans
union all
select 'event_plan_games', 'all', count(*) from public.event_plan_games
union all
select 'play_sessions', 'all', count(*) from public.play_sessions
union all
select 'game_favorites', 'all', count(*) from public.game_favorites
union all
select 'user_consents', document || ':' || version, count(*)
from public.user_consents
group by document, version
order by entity, bucket;

-- 7. 이관 전 해결해야 하는 참조 이상. 결과가 0인지 기록한다.
select 'event_plan_games_without_plan' as check_name, count(*) as row_count
from public.event_plan_games pg
left join public.event_plans p on p.id = pg.event_plan_id
where p.id is null
union all
select 'event_plan_games_missing_game_snapshot_id', count(*)
from public.event_plan_games
where nullif(game_snapshot ->> 'id', '') is null;
