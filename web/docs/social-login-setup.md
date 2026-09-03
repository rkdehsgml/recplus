# Google · 카카오 로그인 연결

이 앱은 이메일 인증과 소셜 로그인이 공통으로 쓰는 `/auth/callback` 경로를 제공합니다. 실제 Google·카카오 로그인 버튼과 `signInWithOAuth` 호출은 제공자 설정을 마친 뒤 추가합니다. 각 서비스의 비밀 키는 코드나 `.env.local`에 넣지 말고, 제공자 콘솔과 Supabase Dashboard에만 등록합니다.

## 공통 준비

1. Supabase Dashboard에서 **Authentication → URL Configuration**을 엽니다.
2. **Site URL**에는 사용자에게 안내하는 배포 주소 하나를 정확히 입력합니다. 예: `https://your-app.vercel.app`.
   `http://localhost:3000`은 로컬 개발 전용이므로, 배포를 시작한 뒤에도 Site URL로 남겨두면 이메일 링크 오류가 로컬호스트로 돌아갑니다.
3. **Redirect URLs**에는 아래처럼 실제로 사용할 모든 콜백 주소를 추가합니다.
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (로컬 개발용)
4. Vercel의 커스텀 도메인을 쓴다면 그 주소의 `/auth/callback`도 추가하고, 그 도메인을 **Site URL**로 사용합니다.
5. 저장한 뒤 새 이메일 인증·매직 링크·비밀번호 재설정 메일을 발송해 확인합니다. 이미 발송된 링크는 설정을 고쳐도 재사용할 수 없고, 일반적으로 1회용이며 만료될 수 있습니다.

앱의 이메일 인증, 매직 링크, 비밀번호 재설정, 그리고 앞으로 추가할 소셜 로그인은 모두 현재 접속 중인 사이트의 `/auth/callback`을 사용합니다. Supabase는 **Redirect URLs**에 등록된 주소만 허용하고, 등록되지 않은 주소 요청은 **Site URL**로 되돌립니다.

제공자 콘솔에 등록할 OAuth 콜백 주소는 위 앱 주소가 아니라 **Supabase Provider 화면에 보이는** `https://<project-ref>.supabase.co/auth/v1/callback`입니다.

## Google 로그인

1. Google Cloud Console에서 프로젝트를 만든 뒤 **Google Auth Platform → Clients**로 이동합니다.
2. **Web application** 유형의 OAuth Client ID를 생성합니다.
3. `Authorized JavaScript origins`에 배포 주소와 개발 주소 `http://localhost:3000`을 각각 추가합니다.
4. `Authorized redirect URIs`에는 Supabase의 Google Provider 화면에 표시되는 콜백 주소를 등록합니다.
5. 생성된 Client ID와 Client Secret을 복사합니다.
6. Supabase Dashboard에서 **Authentication → Sign In / Providers → Google**을 열고 Enabled를 켭니다.
7. Client ID와 Client Secret을 넣고 저장합니다.

## 카카오 로그인

1. Kakao Developers에서 앱을 만들고 웹 플랫폼에 개발 주소를 등록합니다.
2. **Kakao Login** 사용 상태를 켭니다.
3. 앱 설정의 `REST API key`와 활성화한 `Kakao Login Client Secret`을 준비합니다.
4. Kakao Login Redirect URI에 Supabase의 Kakao Provider 화면에 표시되는 콜백 주소를 등록합니다.
5. Supabase Dashboard에서 **Authentication → Sign In / Providers → Kakao**를 열고 Enabled를 켭니다.
6. Kakao REST API key를 Client ID로, Kakao Login Client Secret을 Client Secret으로 넣고 저장합니다.
7. 카카오 이메일 동의를 받지 않을 경우에는 Supabase Kakao Provider의 **Allow users without an email**도 켭니다.

## 테스트 순서

1. 개발 서버를 연 상태에서 `/login`으로 이동합니다.
2. Google 또는 카카오 버튼을 누릅니다.
3. 제공자 로그인과 동의를 마치면 `/auth/callback`을 거쳐 `/cuesheets`로 돌아오는지 확인합니다.
4. 새 계정으로 행사 플랜을 하나 저장한 뒤 로그아웃·로그인하여 해당 계정의 플랜만 보이는지 확인합니다.
