-- 회원가입 시 필수 약관·개인정보 처리방침 동의를 버전 단위로 기록합니다.
-- 커뮤니티 게임 공개 동의는 실제 제출 기능을 만들 때 별도 테이블과 동의 흐름으로 추가합니다.

create table public.user_consents (
  user_id uuid not null references auth.users (id) on delete cascade,
  document text not null check (document in ('terms', 'privacy')),
  version text not null check (char_length(version) between 1 and 40),
  agreed_at timestamptz not null default now(),
  primary key (user_id, document, version)
);

revoke all on table public.user_consents from anon, authenticated;
grant select on table public.user_consents to authenticated;

alter table public.user_consents enable row level security;

create policy "users can read their own consents"
on public.user_consents for select
to authenticated
using (user_id = (select auth.uid()));

create function public.record_new_user_consents()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  consent_version text := '2026-09-03';
begin
  if new.raw_user_meta_data ->> 'terms_version' = consent_version
    and new.raw_user_meta_data ->> 'privacy_version' = consent_version
    and nullif(new.raw_user_meta_data ->> 'terms_agreed_at', '') is not null
    and nullif(new.raw_user_meta_data ->> 'privacy_agreed_at', '') is not null then
    insert into public.user_consents (user_id, document, version)
    values
      (new.id, 'terms', consent_version),
      (new.id, 'privacy', consent_version)
    on conflict do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_record_consents
after insert on auth.users
for each row execute procedure public.record_new_user_consents();
