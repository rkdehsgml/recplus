# 레크플러스 1차 제한 파일럿 — DB 적용 감사

> 작성: 2026-09-11 / 마지막 현황 갱신: 2026-09-16
> 범위: P00 환경·기존 데이터·복구 감사의 **로컬 조사와 실행 준비**
> 상태: 스테이징/운영 확인 전 — 배포 또는 복구 통과를 의미하지 않음

## 1. 판정 요약

현재 체크아웃에는 파일럿 실행·후기 원본 구조와 P07/P08 제한 RPC가 있다. 2026-09-16 원격 읽기 감사에서 해당 테이블 이름이 PostgREST의 `permission denied`로 확인되어 대상 DB에도 구조가 존재하는 정황은 확인했지만, migration 원장과 컬럼·제약·함수 본문이 로컬 파일과 동일한지는 아직 SQL Editor로 대조하지 못했다. 대상 프로젝트가 스테이징인지 운영인지, 백업 복구 가능 여부, U1/U2/A1/A2 계정 준비 상태도 미확인이다.

따라서 **P00은 아직 완료가 아니다.** 이 문서와 `web/supabase/audits/001_pilot_readonly_audit.sql`, `web/scripts/audit-supabase-readonly.mjs`를 사용해 실제 대상에서 증거를 채워야 하며, 그 전에는 운영 쓰기 E2E나 파일럿 개방을 완료로 판정하지 않는다.

## 2. 로컬 코드 조사 결과

| 항목 | 확인한 상태 | 파일럿 영향 |
|---|---|---|
| 로컬 migration 최종 파일 | `20260916120000_add_event_plan_archive_rpc.sql` | 대상 DB의 migration 원장과 파일명 순서를 별도 대조한다. |
| 큐시트 | 안정적 `plan_item_id`, plan revision, 명령 영수증과 보관 RPC를 로컬에 구현 | 대상 DB 함수·권한 대조와 실제 JWT 충돌 검증이 필요하다. |
| 진행 세션 | `play_sessions`가 `(event_plan_id, owner_id)` 한 행을 덮어쓴다 | 실행 이력이 아니므로 P05 이후 새 `event_runs` 원본을 써야 한다. |
| 큐시트 저장 | 브라우저가 새 `save_event_plan(jsonb,integer,uuid)` 계약과 원격 version snapshot을 사용 | 대상 DB에 후속 보관 migration을 먼저 적용하고 로그인 브라우저 E2E를 해야 한다. |
| 공개 문항 | 공개 게임의 `game_items` SELECT가 가능하고 `answer`가 같은 행에 있다 | P12 전에는 답안 비공개를 보장할 수 없다. CSS/클라이언트 숨김은 해결책이 아니다. |
| 제출·검수 | 게임 제안은 제출·반려·승인 흐름이 있다 | P03/P10에서 제출본 revision·감사와 호환 전환이 필요하다. |
| 기존 E2E | 한 테스트 사용자를 생성한 뒤 그 계정에 admin 역할을 부여한다 | U1/U2/A1/A2/비회원의 독립 권한 검증을 대신할 수 없다. |
| 백업·복구 | 저장소에 복구 리허설 증거·절차가 없다 | P00 완료 전 실제 스테이징 복원 리허설이 필요하다. |

## 3. 대상 환경 확인표

아래 표는 비밀값·이메일·개인정보 원문을 기록하지 않는다. 프로젝트 참조값은 필요한 경우 마지막 6자만 기록한다.

| 확인 항목 | 스테이징 | 운영 | 증거/실행자 | 상태 |
|---|---|---|---|---|
| 프로젝트 용도와 환경 식별 | 미확인 | 미확인 | Dashboard 프로젝트 설정 | 미확인 |
| 실제 적용 migration 목록과 로컬 파일 대조 | 미확인 | 미확인 | `supabase_migrations.schema_migrations` 읽기 결과 | 미확인 |
| 테이블·함수·RLS·grant 차이 | 미확인 | 미확인 | 읽기 전용 SQL 결과 | 미확인 |
| 백업 생성 시각·보존 위치·복원 권한 | 미확인 | 미확인 | DB 운영 담당 증거 | 미확인 |
| 별도 스테이징 복원 리허설 | 미실행 | 해당 없음 | 행 수/소유/대표 해시 비교 | 미실행 |
| U1·U2·A1·A2·비회원 세션 | 미확보 | 해당 없음 | 계정 별칭만 기록 | 미확보 |
| 파일럿 운영자·검수자·신고 이의제기 연락 경로 | 미확보 | 미확보 | P02 담당자 확인 | 미확보 |

### 3.1 구성된 대상의 읽기 전용 스냅샷

2026-09-16에 `pnpm audit:supabase:readonly`를 다시 실행했다. 구성된 프로젝트 참조값 끝 6자는 `wmvexl`이며, 이것만으로 스테이징/운영 용도를 판정하지 않는다. 원문이나 계정 정보는 조회·기록하지 않았다.

| 테이블 | 결과 | 해석 |
|---|---:|---|
| `event_plans` | 1행 | service-role 읽기 접근과 행 수 확인 |
| `play_sessions` | 1행 | service-role 읽기 접근과 행 수 확인 |
| `user_game_item_packs` | 0행 | service-role 읽기 접근과 행 수 확인 |
| `user_roles` | 1행 | service-role 읽기 접근과 행 수 확인 |
| `profiles`, `games`, `game_items`, `event_plan_games`, `game_favorites`, `user_consents`, `game_appearances` | HTTP 403 / `42501` | 현재 `service_role SELECT`가 없음. 행 수 0으로 해석하지 않음. |
| P03~P08 신규 테이블 14개 | HTTP 403 / `42501` | 테이블 이름은 대상 API 스키마에 존재하지만 `service_role SELECT`가 없음. 로컬과 동일한 구조·함수라는 증거는 아님. |

이는 기존 migration의 service-role grant가 일부 테이블에만 있는 로컬 조사와 일치한다. `20260916110000_grant_service_role_audit_reads.sql`을 로컬에 추가했으며 대상 DB 적용 후 같은 명령으로 전체 수량을 다시 확인한다. migration 적용 이력과 실제 RLS/grant 차이는 PostgREST 행 수 조회로 증명할 수 없으므로 SQL Editor의 읽기 전용 감사와 백업 리허설이 여전히 필요하다.

## 4. 읽기 전용 감사 실행 순서

1. **대상 확인:** Dashboard에서 현재 프로젝트가 스테이징인지 운영인지 확인한다. 운영을 대상으로 쓰기 E2E를 실행하지 않는다.
2. **migration 대조:** SQL Editor에서 `web/supabase/audits/001_pilot_readonly_audit.sql`의 migration/권한/데이터 집계 섹션을 실행한다. 결과에는 행 수와 상태별 집계만 보관한다.
3. **REST 접근 확인:** 대상 환경의 비밀값을 출력하지 않는 `pnpm audit:supabase:readonly`를 실행한다. 이 명령은 알려진 테이블의 접근 가능 여부와 행 수만 출력한다.
4. **기준 수량 보관:** 공개/비공개/소유/동의/고아 참조/시드 ID 매핑을 실행 시각과 함께 안전한 운영 기록에 보관한다. 이 저장소 문서에는 원문·이메일·토큰을 넣지 않는다.
5. **복구 리허설:** 승인된 백업을 별도 스테이징에 복원하고, 기준 수량·소유 관계·대표 본문 해시를 대조한다. 실패하면 P03을 시작하지 않고 복구 절차를 보완한다.
6. **계정 분리:** U1/U2/A1/A2는 각각 다른 Auth 사용자로 준비한다. 기존 단일 계정 E2E는 4계정 테스트로 집계하지 않는다.

### 4.1 지금 사용자가 적용할 순서

1. SQL Editor에서 먼저 `web/supabase/audits/001_pilot_readonly_audit.sql`을 실행해 migration 원장과 대상 환경을 확인한다.
2. 원장에 `20260911110000`부터 `20260911160000`까지 모두 있으면 다음 두 파일만 순서대로 적용한다.
   - `web/supabase/migrations/20260916110000_grant_service_role_audit_reads.sql`
   - `web/supabase/migrations/20260916120000_add_event_plan_archive_rpc.sql`
3. 위 여섯 migration 중 하나라도 원장에 없으면 새 두 파일만 먼저 적용하지 말고, 백업을 확보한 뒤 누락 파일부터 전체 파일명 순서로 적용한다.
4. 적용 뒤 `cd web && pnpm audit:supabase:readonly`를 다시 실행한다. 모든 25개 대상 테이블이 행 수 또는 0으로 표시되고 `HTTP 403`이 없어야 한다.
5. SQL Editor에서 `web/supabase/audits/002_*.sql`부터 `008_*.sql`까지 순서대로 실행한다. `invalid_*`, `duplicate_*`, `*_mismatch_count`, `run_started_after_plan_archived_count`는 모두 0이어야 하고, 권한 표는 주석의 허용/거부와 일치해야 한다.
6. 이 확인 전에는 `pnpm e2e:supabase`를 실행하지 않는다. 현재 스크립트는 구 큐시트 RPC 계약과 단일 계정 흐름이라 P24에서 교체해야 한다.

## 5. 대조해야 할 로컬 기준

- migration 파일: `web/supabase/migrations/`의 파일명 순서 전체
- 대상 구조: `games`, `game_items`, `event_plans`, `event_plan_games`, `play_sessions`, `user_game_item_packs`, `game_favorites`, `user_consents`, `user_roles`, `game_appearances`
- 대상 함수: `save_event_plan`, `save_user_game`, `submit_user_game`, `review_user_game`, `save_admin_game`
- 권한 위험 기준: 공개 `game_items.answer`, 큐시트 직접 DML, 넓은 함수 execute, owner 교차 자식 삽입
- 데이터 기준: 공개/비공개·검수 상태·소유자 유무·동의 유무·고아 FK·시드 ID 충돌

## 6. 다음 티켓 시작 판정

| 티켓 | 시작 가능 여부 | 이유 |
|---|---|---|
| P01 상태 계약 | 준비 가능 | 이 문서와 제품 결정문을 바탕으로 초안을 작성할 수 있다. 최종 확정은 D01–D08 결정 후다. |
| P02 운영 정책 | 준비 가능 | 필요한 결정·연락 경로를 문서화할 수 있다. 보유 기간·법적 검토는 담당자 확정 전 미완료다. |
| P03 게임 버전·제출본 migration | 로컬 구현·임시 DB 검증 완료, 대상 원장 대조 전 | 대상 API에서 관련 테이블 이름은 확인했지만 `20260911110000_add_game_versions_and_submission_snapshots.sql`과 동일한 제약·트리거인지는 SQL Editor 대조가 필요하다. |
| P04 플랜 revision·항목 ID·행사 조건 migration | 로컬 구현·임시 DB 검증 완료, 대상 원장 대조 전 | 로컬은 레거시 조건을 `needs_enrichment`로, 버전 미확인 항목을 `needs_version_resolution`로 보존한다. 대상 데이터 대조 결과는 아직 수집하지 않았다. |
| P05 실행 원본·이벤트 migration | 로컬 구현·임시 DB 검증 완료, 대상 원장 대조 전 | 대상 API에서 실행 테이블 이름은 확인했다. 실행 스냅샷·FK·불변 트리거는 SQL Editor 검증이 필요하다. |
| P06 후기·신고·감사·보유 migration | 로컬 구현·임시 DB 검증 완료, 대상 원장 대조 전 | 대상 API에서 관련 테이블 이름은 확인했다. D04/D09 미정이라 로컬에도 자동 삭제 기간이나 운영 권한은 추가하지 않았다. |
| P07 revision 기반 큐시트 저장 RPC | 로컬 구현·임시 DB 검증 완료, 대상 함수 대조 전 | 브라우저 저장 어댑터를 `expected_revision`·`request_id`·안정적 항목 ID 계약으로 전환했다. 실제 JWT 충돌 검증은 남았다. |
| P08 실행 명령 RPC | 로컬 구현·임시 DB 정상 흐름 검증 완료, 대상 함수 대조 전 | 시작→게임 시작→완료→명시적 종료와 같은 요청 재전송을 임시 PostgreSQL에서 확인했다. 실제 JWT 거부 시나리오는 P24와 별도 스테이징에서 필요하다. |
| P07 보완: 큐시트 보관 | 로컬 구현·임시 DB 검증 완료, 대상 DB 적용 전 | `20260916120000_add_event_plan_archive_rpc.sql`은 직접 삭제 대신 이력 보존형 보관을 제공한다. 보관된 플랜의 새 실행을 차단하고 과거 실행은 유지한다. |
| 기존 `e2e:supabase` | 스테이징에서만 조건부 | 계정·데이터를 생성·삭제하므로 대상 확인과 복원 계획 없이 운영에서 실행 금지다. |

## 7. 감사 완료 증거

P00 완료 시 이 문서에 다음만 추가한다: 실행 일시, 환경 구분, migration 차이 요약, 기준 수량 표, 복구 리허설 결과, 4계정 별칭, 미해결 차이와 담당자. 비밀값, 전체 본문, 이메일, 사용자 ID는 기록하지 않는다.
