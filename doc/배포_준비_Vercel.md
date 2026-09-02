# Vercel 배포 준비 체크리스트

작성: 2026-09-02 / 대상: `web/` (Next.js 16.3.3 App Router)

## 0. 현재 코드 상태 요약

| 항목 | 상태 |
| --- | --- |
| 프레임워크 | Next.js 16.3.3 (Turbopack), React 19.2.8, TypeScript 5, Tailwind v4 |
| 패키지 매니저 | pnpm 11.24.0 (`packageManager` 필드로 고정됨) |
| 리포 구조 | 루트 = `RecPlus`, 앱 = `RecPlus/web` (모노레포성 구조) |
| 인증 | Supabase Auth + `src/proxy.ts`(구 middleware)로 세션 쿠키 갱신, `/auth/callback`에서 코드 교환 |
| 데이터 | localStorage 6개 모듈(큐시트·커스텀게임·문제팩·진행세션·카탈로그) + Supabase 클라우드 동기화(행사 플랜, 게임 DB) |
| PWA | `manifest.ts` + `public/sw.js` + `/offline` — HTTPS 필요, Vercel에서 정상 동작 |
| 타입 검사 | `tsc --noEmit` 통과 확인 |
| 미커밋 변경 | 24개 파일 수정 + doc 5개 신규 (2026-09-02 기준) |

> Vercel은 GitHub의 커밋을 빌드한다. 지금 상태로 연결하면 **최신 UI 작업이 반영되지 않은 예전 버전**이 배포된다. 커밋·푸시가 첫 단계다.

## 1. 배포 전 반드시 (블로커)

1. **로컬에서 프로덕션 빌드 1회 성공시키기**
   ```bash
   cd web && pnpm build
   ```
   dev 서버에서만 돌려본 코드는 빌드에서 깨지는 경우가 흔하다 (서버 컴포넌트에서 브라우저 API 접근 등). 여기서 통과해야 Vercel에서도 통과한다.

2. **커밋 & 푸시** (`origin` = https://github.com/rkdehsgml/recplus.git)
   - `.env.local`은 `.gitignore`에 잡혀 있음 ✅
   - Secret key에 `NEXT_PUBLIC_` 접두사 없음 ✅

3. **Vercel 프로젝트 설정**
   - Root Directory: **`web`** ← 이걸 안 바꾸면 빌드 자체가 실패한다
   - Framework Preset: Next.js (자동)
   - Install Command: 기본값 (packageManager 필드로 pnpm 자동 인식)
   - Node.js Version: 22.x

4. **환경 변수** (Vercel > Settings > Environment Variables)

   | 변수 | Production | 비고 |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | ✅ 필수 | 없으면 `getSupabaseConfig()`가 throw → 로그인·게임DB 화면 런타임 에러 |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ 필수 | 위와 동일 |
   | `SUPABASE_SECRET_KEY` | ❌ 넣지 말 것 | 현재 유일한 사용처인 `/api/internal/initial-admin-password`가 dev 전용. 프로덕션에 두면 유출 표면만 늘어난다 |
   | `RECPLUS_INITIAL_PASSWORD_SETUP_*` | ❌ 넣지 말 것 | `NODE_ENV=production`에서 라우트가 404 반환 |

   Preview 환경도 같은 값을 넣어야 PR 프리뷰에서 로그인이 동작한다 (프리뷰용 Supabase 프로젝트를 따로 두면 더 안전).

5. **Supabase 프로덕션 준비**
   - 마이그레이션 5개를 **순서대로** 적용:
     `20260901231500_initial_platform` → `20260902095200_grant_service_role_user_roles` → `20260902120000_game_catalog_admin` → `20260902150000_add_game_origin` → `20260902163000_add_game_series`
   - Authentication → URL Configuration
     - Site URL: `https://<배포도메인>`
     - Redirect URLs: `https://<배포도메인>/auth/callback` (+ 프리뷰를 쓸 거면 `https://*.vercel.app/auth/callback`)
   - Google Cloud Console / Kakao Developers의 Authorized origins·redirect에 배포 도메인 추가
   - **관리자 계정**: 프로덕션에서는 `/setup-password`가 동작하지 않는다. Supabase Dashboard에서 계정 생성 → SQL로 `user_roles`에 admin insert (`supabase/ADMIN_SETUP.md` 2번 참고)

## 2. 배포 전에 손보면 좋은 것 (품질)

- **`metadataBase` 누락** — `src/app/layout.tsx`의 metadata에 `metadataBase: new URL("https://<도메인>")` 추가. 없으면 OG 이미지 경로가 상대경로로 남아 카카오톡·인스타 공유 시 썸네일이 안 뜬다. 11월 공개 = 링크 공유가 핵심이므로 중요.
- **아이콘이 SVG only** — iOS 홈 화면 추가/스플래시에서 SVG를 안 받는 경우가 있다. 192·512 PNG와 apple-touch-icon 180 PNG 추가 권장.
- **서비스워커 캐시 버전 고정** — `public/sw.js`의 `recplus-shell-v1`이 하드코딩. 재배포해도 사용자 브라우저에 옛 셸이 남을 수 있다. 배포마다 문자열을 올리거나 빌드 시 치환할 것. **현장 진행 중 옛 버전이 뜨는 사고**의 원인이 되므로 종강총회 전에 정리 필요.
- **robots.txt / sitemap 없음** — 공개 시점에 `app/robots.ts`, `app/sitemap.ts` 추가.
- **README가 create-next-app 기본값** — 공개 리포면 교체.
- 관리자 화면 `/admin`은 서버(`hasServerAdminAccess`)와 클라이언트 양쪽에서 검사 중 ✅. RLS가 실제로 켜져 있는지 프로덕션 DB에서 한 번 더 확인.

## 3. 요금제 리스크 (실사용 전 판단 필요)

- **Vercel Hobby는 비상업적 용도 전용.** 개인/동아리 프로젝트로 무료 운영은 가능하지만, 수익화하거나 팀 계정으로 운영하면 Pro($20/월/seat)로 올라가야 한다.
- **Supabase 무료 티어는 1주일 무활동 시 프로젝트 일시정지.** 9월에 배포해두고 11월 공개까지 방치하면 그 사이 멈춘다. 정지된 프로젝트는 대시보드에서 수동 복구해야 하고 복구가 실패하는 사례도 보고된다.
  - → 9월 1일에 정한 "12월 MVP에서 Supabase 제외" 결정과 충돌한다. **배포를 지금 한다면 그 결정을 다시 볼 것.** 선택지는 (a) 정적/localStorage만으로 먼저 Vercel 배포하고 Supabase는 나중에 붙이기, (b) 지금부터 Supabase까지 붙여 운영하며 주기적 핑으로 정지 방지, (c) 유료 전환.
  - 현재 코드는 Supabase 환경변수가 없으면 로그인·게임DB·행사플랜 저장이 죽는다. (a)를 고르려면 `isSupabaseConfigured()` 기반의 우아한 폴백이 화면 단에도 필요하다.

## 4. 배포 후 확인

- [ ] `/` `/games` `/create` `/items` `/cuesheets` 렌더링
- [ ] `/login` → Google·Kakao 로그인 → `/cuesheets` 복귀
- [ ] 행사 플랜 저장 → 로그아웃 → 재로그인 시 내 플랜만 보임
- [ ] `/admin` — 관리자 계정만 진입, 비관리자는 차단
- [ ] 모바일에서 `/play/[id]` 다크 화면·타이머 동작
- [ ] 홈 화면에 추가(PWA) → 비행기 모드에서 `/offline` 및 캐시된 화면 동작
- [ ] Vercel Functions 로그에 env 관련 에러 없음

## 참고
- Vercel Hobby 플랜 약관: https://vercel.com/docs/plans/hobby
- Supabase 프로젝트 일시정지: https://supabase.com/docs/guides/platform/free-project-pausing
