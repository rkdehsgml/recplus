-- 게임을 아카이브에서 먼저 탐색할 수 있도록, 진행 방식과 별도의 계보 분류를 둡니다.
-- 기존 공개 게임과 이미 저장된 게임은 기본적으로 고전 레크로 유지합니다.

alter table public.games
add column if not exists origin text not null default 'classic';

alter table public.games
drop constraint if exists games_origin_check;

alter table public.games
add constraint games_origin_check
check (origin in ('variety', 'classic', 'original'));

update public.games
set origin = 'variety'
where id in (
  'balance',
  'sonbyeongho',
  'choseong',
  'person-quiz',
  'charades',
  'speed-quiz',
  'one-mind',
  'awards'
);

create index if not exists games_public_origin_idx
on public.games (visibility, moderation_status, origin, published_at desc);
