-- 이미 적용된 관리자 마이그레이션을 보완합니다.
-- 전체 마이그레이션을 시간순으로 처음 적용할 때는 user_roles가 아직 없으므로 건너뜁니다.
-- game_catalog_admin 마이그레이션도 같은 GRANT를 포함하므로 신규 프로젝트와 기존 프로젝트 모두 안전합니다.
do $$
begin
  if pg_catalog.to_regclass('public.user_roles') is not null then
    grant select on table public.user_roles to service_role;
  end if;
end;
$$;
