-- 서버 전용 읽기 감사와 계정 삭제 후 잔여 데이터 검증에 필요한 최소 조회 권한입니다.
-- anon/authenticated에는 권한을 추가하지 않으며, service_role 키는 서버와 운영 감사에서만 사용합니다.

grant select on table
  public.profiles,
  public.games,
  public.game_items,
  public.event_plans,
  public.event_plan_games,
  public.play_sessions,
  public.user_game_item_packs,
  public.game_favorites,
  public.user_consents,
  public.user_roles,
  public.game_appearances,
  public.game_versions,
  public.game_submissions,
  public.event_plan_command_receipts,
  public.event_runs,
  public.event_run_games,
  public.run_events,
  public.run_command_receipts,
  public.game_reviews,
  public.game_review_revisions,
  public.game_review_public_consents,
  public.game_review_consent_withdrawals,
  public.content_reports,
  public.moderation_actions,
  public.data_retention_actions
to service_role;
