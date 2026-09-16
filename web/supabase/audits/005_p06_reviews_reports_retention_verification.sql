-- P06 migration 적용 뒤 실행하는 읽기 전용 후기·신고·감사 대조입니다.
-- P09/P10 RPC 전에는 모든 테이블이 비어 있어도 정상입니다.

-- 1. 후기는 같은 실행 게임·버전·소유자를 가리키며, 실행+게임 버전마다 하나여야 합니다.
select count(*) as invalid_review_run_reference_count
from public.game_reviews review
left join public.event_runs run
  on run.id = review.event_run_id
left join public.event_run_games run_game
  on run_game.id = review.event_run_game_id
 and run_game.event_run_id = review.event_run_id
 and run_game.game_version_id = review.game_version_id
where run.id is null
   or run_game.id is null
   or (review.owner_id is not null and review.owner_id is distinct from run.owner_id);

select count(*) as duplicate_run_game_version_review_count
from (
  select event_run_id, game_version_id
  from public.game_reviews
  group by event_run_id, game_version_id
  having count(*) > 1
) duplicate_review;

-- 2. 현재 후기와 revision·공개 동의 증거의 해시는 모두 보존된 revision과 같아야 합니다.
select count(*) as invalid_review_revision_hash_count
from public.game_reviews review
left join public.game_review_revisions revision
  on revision.review_id = review.id
 and revision.revision = review.revision
 and revision.content_hash = review.content_hash
where revision.review_id is null
;

select count(*) as invalid_stored_review_revision_hash_count
from public.game_review_revisions revision
where revision.content_hash <> pg_catalog.md5(revision.snapshot::text);

select count(*) as invalid_public_consent_hash_count
from public.game_review_public_consents consent
left join public.game_review_revisions revision
  on revision.review_id = consent.review_id
 and revision.revision = consent.review_revision
 and revision.content_hash = consent.content_hash
where revision.review_id is null;

-- 3. 신고·검수·보유 처리 대상은 실제 FK 한 종류만 가리켜야 합니다.
select count(*) as invalid_report_target_count
from public.content_reports report
left join public.game_review_revisions review_revision
  on review_revision.review_id = report.target_review_id
 and review_revision.revision = report.target_review_revision
left join public.game_versions game_version
  on game_version.id = report.target_game_version_id
 and game_version.game_id = report.target_game_id
where (report.target_review_id is not null and review_revision.review_id is null)
   or (report.target_game_id is not null and game_version.id is null);

select count(*) as invalid_moderation_target_count
from public.moderation_actions action
left join public.game_review_revisions review_revision
  on review_revision.review_id = action.target_review_id
 and review_revision.revision = action.target_review_revision
left join public.game_submissions submission
  on submission.id = action.target_game_submission_id
left join public.content_reports report
  on report.id = action.target_content_report_id
where (action.target_review_id is not null and review_revision.review_id is null)
   or (action.target_game_submission_id is not null and submission.id is null)
   or (action.target_content_report_id is not null and report.id is null);

select count(*) as invalid_retention_target_count
from public.data_retention_actions action
left join public.event_runs run on run.id = action.event_run_id
left join public.game_reviews review on review.id = action.game_review_id
left join public.content_reports report on report.id = action.content_report_id
left join public.moderation_actions moderation on moderation.id = action.moderation_action_id
where (action.event_run_id is not null and run.id is null)
   or (action.game_review_id is not null and review.id is null)
   or (action.content_report_id is not null and report.id is null)
   or (action.moderation_action_id is not null and moderation.id is null);
