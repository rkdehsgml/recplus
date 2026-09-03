-- 향후 사용자 제작 게임 신청과 관리자 검토를 위한 운영 이력입니다.
-- 공개 신청 시점의 동의와 검토 결과를 게임 본문과 분리해 추적합니다.

alter table public.games
  add column if not exists submission_note text,
  add column if not exists submitted_at timestamptz,
  add column if not exists sharing_consent_at timestamptz,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users (id) on delete set null,
  add column if not exists review_note text;

alter table public.games
  drop constraint if exists games_submission_note_length,
  add constraint games_submission_note_length check (submission_note is null or char_length(submission_note) <= 1000),
  drop constraint if exists games_review_note_length,
  add constraint games_review_note_length check (review_note is null or char_length(review_note) <= 1000);

create index if not exists games_review_queue_idx
on public.games (source, moderation_status, submitted_at desc);
