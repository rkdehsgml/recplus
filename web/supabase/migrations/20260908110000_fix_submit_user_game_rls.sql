-- 제출 함수는 RLS가 허용하는 draft 상태에서 pending_review 상태로 전환합니다.
-- 일반적인 작성자 수정 정책은 pending_review를 허용하지 않으므로, 소유권·동의를
-- 함수 안에서 검증한 뒤 보안 정의자 권한으로 상태 전환만 수행합니다.

create or replace function public.submit_user_game(
  p_game_id text,
  p_submission_note text,
  p_sharing_consent boolean
)
returns void
language plpgsql
security definer
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

revoke all on function public.submit_user_game(text, text, boolean) from public, anon;
grant execute on function public.submit_user_game(text, text, boolean) to authenticated;
