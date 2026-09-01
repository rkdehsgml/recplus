# Supabase 설정

이 폴더의 첫 마이그레이션은 다음 데이터를 서버에 저장할 준비를 합니다.

- 계정 프로필과 인증 소유권
- 공식·사용자 제작 게임, 문제 아이템, 공개·검수 상태
- 저장한 행사 플랜과 게임 스냅샷
- 게임 즐겨찾기

현재 화면은 기존 `localStorage` 흐름을 그대로 사용합니다. 실제 Supabase 프로젝트를 연결한 뒤, 로그인과 동기화를 기능 단위로 옮길 예정입니다.

## 연결 순서

1. Supabase에서 새 프로젝트를 만들고 SQL Editor 또는 Supabase CLI로 `migrations/20260901231500_initial_platform.sql`을 적용합니다.
2. `.env.example`을 복사해 `.env.local`을 만들고, Dashboard의 Connect 화면에서 URL과 publishable key를 입력합니다.
3. 개발 서버를 다시 시작합니다. `src/lib/supabase/client.ts`와 `server.ts`의 클라이언트를 이후 로그인·동기화 기능에서 사용합니다.

`NEXT_PUBLIC_` 변수에는 URL과 publishable key만 넣습니다. 서비스 역할 키는 브라우저나 저장소에 추가하지 않습니다.
