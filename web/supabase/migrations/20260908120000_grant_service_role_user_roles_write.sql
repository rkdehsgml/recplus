-- 서버 전용 secret key가 초기 관리자 지정과 자동 E2E 테스트에서 역할을 생성할 수 있게 합니다.
-- authenticated/anon에는 어떤 쓰기 권한도 추가하지 않습니다.

grant select, insert, update, delete on table public.user_roles to service_role;
