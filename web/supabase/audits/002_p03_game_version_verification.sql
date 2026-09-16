-- P03 migration 적용 뒤 실행하는 읽기 전용 무결성 대조입니다.
-- 결과에는 원문·문항 답안·사용자 식별자를 보관하지 않습니다.

-- 1. 모든 게임에는 같은 게임을 가리키는 현재 버전이 하나 있어야 합니다.
select
  count(*) filter (where current_version_id is null) as games_without_current_version,
  count(*) filter (where current_version_id is not null and v.id is null) as games_with_missing_current_version,
  count(*) filter (where v.game_id is distinct from g.id) as games_with_cross_game_current_version
from public.games g
left join public.game_versions v on v.id = g.current_version_id;

-- 2. 저장 해시와 JSONB 스냅샷이 일치해야 합니다.
select count(*) as version_hash_mismatch_count
from public.game_versions
where content_hash <> pg_catalog.md5(snapshot::text);

-- 3. 현재 버전의 문항 수가 현재 게임 문항 수와 일치해야 합니다.
-- 과거 버전의 문항 수 차이는 정상이며, 여기서는 현재 포인터만 비교합니다.
select count(*) as current_version_item_count_mismatch
from public.games g
join public.game_versions v on v.id = g.current_version_id
cross join lateral (
  select count(*) as row_count from public.game_items i where i.game_id = g.id
) live
cross join lateral (
  select jsonb_array_length(coalesce(v.snapshot -> 'items', '[]'::jsonb)) as item_count
) snap
where live.row_count <> snap.item_count;

-- 4. 과거 공개 사용자 게임 중 versioned 공개 동의 증거가 없는 목록입니다.
-- 결과의 game_id만 안전한 운영 기록에 보관하고, 개인 정보나 원문은 기록하지 않습니다.
select g.id as game_id, s.status, s.consent_evidence_status
from public.games g
left join public.game_submissions s
  on s.game_id = g.id
 and s.status = 'published'
where g.source = 'user'
  and g.visibility = 'public'
  and g.moderation_status = 'published'
  and coalesce(s.consent_evidence_status, 'missing') <> 'versioned'
order by g.id;

-- 5. 제출본은 반드시 해당 게임의 불변 버전을 참조해야 합니다.
select count(*) as invalid_submission_version_reference_count
from public.game_submissions s
left join public.game_versions v
  on v.id = s.game_version_id
 and v.game_id = s.game_id
where v.id is null;
