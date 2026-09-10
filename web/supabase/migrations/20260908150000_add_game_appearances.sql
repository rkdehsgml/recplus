-- 하나의 현장용 게임과 방송 속 시즌·회차별 변형을 분리해 관리합니다.

create table public.game_appearances (
  id text primary key check (char_length(id) between 1 and 120),
  game_id text not null references public.games (id) on delete cascade,
  series text not null check (series in ('new-journey', 'earth-arcade')),
  season smallint not null check (season between 1 and 99),
  episode smallint check (episode between 1 and 999),
  variant_name text not null check (char_length(variant_name) between 1 and 100),
  evidence_title text not null default '' check (char_length(evidence_title) <= 200),
  evidence_url text,
  verification_status text not null default 'needs-verification'
    check (verification_status in ('verified', 'needs-verification')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (game_id, series, season, episode, variant_name),
  constraint verified_appearance_has_evidence check (
    verification_status <> 'verified' or evidence_url is not null
  )
);

create index game_appearances_series_season_idx
on public.game_appearances (series, season, episode);

create index game_appearances_game_id_idx
on public.game_appearances (game_id);

create trigger set_game_appearances_updated_at
before update on public.game_appearances
for each row execute function public.set_updated_at();

alter table public.game_appearances enable row level security;

grant select on public.game_appearances to anon, authenticated;

create policy "appearances follow game visibility"
on public.game_appearances for select
to anon, authenticated
using (
  exists (
    select 1 from public.games
    where games.id = game_appearances.game_id
      and ((games.source = 'official' and games.visibility = 'public' and games.moderation_status = 'published')
        or games.owner_id = (select auth.uid()))
  )
);
