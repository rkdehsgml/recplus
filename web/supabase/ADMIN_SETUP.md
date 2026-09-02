# 게임 관리자 설정과 DB 적용

## 1. 마이그레이션 적용

Supabase Dashboard의 **SQL Editor**에서 아래 파일 내용을 순서대로 실행합니다.

1. `migrations/20260901231500_initial_platform.sql` — 이미 실행했다면 건너뜁니다.
2. `migrations/20260902120000_game_catalog_admin.sql`

두 번째 파일은 기존 공식 게임 15개와 문제팩을 DB에 넣고, 관리자 권한 테이블과 보안 정책을 추가합니다. 같은 파일을 다시 실행해도 이미 존재하는 게임은 덮어쓰지 않습니다.

## 2. 내 계정에 관리자 권한 주기

1. 레크플러스에 로그인합니다.
2. Supabase Dashboard에서 **Authentication → Users**로 이동합니다.
3. 내 사용자 행의 UUID를 복사합니다.
4. SQL Editor에서 아래 SQL의 `내_UUID` 부분만 바꿔 실행합니다.

```sql
insert into public.user_roles (user_id, role)
values ('내_UUID', 'admin')
on conflict (user_id) do update set role = excluded.role;
```

사용자가 브라우저에서 이 역할을 바꾸는 권한은 없습니다. 관리자 등록은 이 SQL처럼 Supabase Dashboard 또는 이후에 별도로 만드는 안전한 운영 도구에서만 할 수 있습니다.

## 3. 관리자 화면 열기

로그인한 뒤 `/admin`으로 이동합니다.

- **공식 게임 등록**: 제목, 진행 규칙, 필터 정보, 문제·제시어를 등록합니다.
- **전체 게임**: 공개 게임을 확인하고, 필요하면 보관하거나 다시 공개합니다.

등록 후 공개한 게임은 게임 찾기 화면과 게임 상세 화면에서 DB 데이터로 표시됩니다.
