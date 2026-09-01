# Google · 카카오 로그인 연결

로그인 화면의 버튼과 콜백 처리는 이미 구현되어 있습니다. 각 서비스의 비밀 키는 코드나 `.env.local`에 넣지 말고, 제공자 콘솔과 Supabase Dashboard에만 등록합니다.

## 공통 준비

1. Supabase Dashboard에서 **Authentication → URL Configuration**을 엽니다.
2. 개발 중에는 `Site URL`을 `http://localhost:3000`으로 둡니다.
3. `Redirect URLs`에 `http://localhost:3000/auth/callback`을 등록합니다.
4. 배포하면 `Site URL`을 실제 도메인으로 바꾸고, `https://실제도메인/auth/callback`도 추가합니다.

앱이 제공자 인증을 마치고 돌아오는 주소는 위의 `/auth/callback`입니다. 제공자 콘솔에 등록할 콜백 주소는 이 주소가 아니라 **Supabase Provider 화면에 보이는** `https://<project-ref>.supabase.co/auth/v1/callback`입니다.

## Google 로그인

1. Google Cloud Console에서 프로젝트를 만든 뒤 **Google Auth Platform → Clients**로 이동합니다.
2. **Web application** 유형의 OAuth Client ID를 생성합니다.
3. `Authorized JavaScript origins`에 개발 주소 `http://localhost:3000`을 추가합니다.
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
