-- 서버 전용 E2E와 운영 점검에서 계정 삭제 후 잔여 데이터를 확인할 수 있게 합니다.
-- anon/authenticated에는 추가 권한을 부여하지 않습니다.

grant select on table public.event_plans to service_role;
grant select on table public.play_sessions to service_role;
grant select on table public.user_game_item_packs to service_role;
