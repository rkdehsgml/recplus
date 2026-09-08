# Supabase 설정과 운영 확인

레크플러스는 다음 데이터를 Supabase에 저장합니다.

- 계정 프로필과 인증 소유권
- 공식·사용자 제작 게임, 문제 아이템, 공개·검수 상태
- 저장한 행사 플랜과 게임 스냅샷
- 사용자별 추가 문제 팩과 현장 진행 상태
- 게임 즐겨찾기

## 1. 마이그레이션 적용

Supabase SQL Editor 또는 CLI에서 `migrations/` 파일을 파일명 순서대로 적용합니다. 이미 앞선 파일을 적용한 프로젝트라면 아직 적용하지 않은 파일부터 실행합니다.

가장 마지막 서비스 기반 마이그레이션은 `20260906120000_service_foundation.sql`입니다. 이 파일은 원자적 저장 RPC, 로컬 데이터 동기화 대상 테이블, 제출 후 수정 잠금, 관리자 검수 RPC를 추가합니다.

## 2. 환경 변수

`.env.example`을 `.env.local`로 복사하고 다음 값을 설정합니다.

- `NEXT_PUBLIC_SUPABASE_URL`: Project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: 브라우저용 publishable key
- `SUPABASE_SECRET_KEY`: 서버 Route Handler와 E2E 전용 secret key
- `NEXT_PUBLIC_SUPPORT_EMAIL`: 사용자에게 보여줄 문의 이메일

`SUPABASE_SECRET_KEY`에는 `NEXT_PUBLIC_` 접두사를 붙이거나 브라우저 코드에서 import하면 안 됩니다. Vercel에서는 Production, Preview 등 필요한 환경마다 별도로 등록한 뒤 재배포합니다.

## 3. 이메일 인증 운영 설정

Supabase Dashboard의 Authentication 설정에서 다음을 확인합니다.

1. Site URL을 실제 배포 주소로 지정합니다.
2. Redirect URLs에 `https://배포주소/auth/callback`과 개발용 `http://localhost:3000/auth/callback`을 추가합니다.
3. 운영 SMTP 공급자의 Host, Port, Username, Password, Sender email/name을 등록합니다.
4. 가입 확인, 매직 링크, 비밀번호 재설정 메일을 실제 수신 가능한 테스트 계정으로 각각 확인합니다.

기본 메일 발송기는 개발·초기 확인 용도입니다. 정식 공개 전에는 전용 SMTP와 발신 도메인의 SPF/DKIM 설정을 완료해야 합니다. SMTP 비밀번호는 Supabase Dashboard에만 저장하고 저장소나 `NEXT_PUBLIC_` 환경 변수에 넣지 않습니다.

## 4. 라이브 E2E 검증

마이그레이션을 적용한 테스트 또는 스테이징 프로젝트에서 실행합니다.

```bash
pnpm e2e:supabase
```

이 검증은 테스트 계정 하나를 만들고 다음 흐름을 실제로 실행합니다.

- 로그인 → 행사 플랜·게임 스냅샷 저장
- 사용자 게임·문항·추가 문제 팩·진행 상태 저장
- 공유 동의 없는 제출 차단 → 검수 제출 → 제출 후 수정 차단
- 관리자 반려 → 작성자 수정 → 재제출 → 공개 승인
- 공개 조회 → 보관 → 공개 제외 → 삭제
- 계정 삭제 → 소유 데이터 연쇄 삭제

테스트 계정과 데이터는 성공 여부와 관계없이 마지막에 정리합니다. 운영 프로젝트에서도 실행할 수 있지만 Auth 감사 로그는 남으므로 가능하면 스테이징 프로젝트를 사용합니다.
