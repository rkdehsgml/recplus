-- 이미 적용된 관리자 마이그레이션을 보완합니다.
-- 이 권한은 서버 전용 secret key에만 적용되며 브라우저 publishable key에는 부여되지 않습니다.
grant select on table public.user_roles to service_role;
