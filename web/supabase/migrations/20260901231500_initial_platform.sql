-- RecPlus의 첫 서버 영속성 기반입니다.
-- 현재 localStorage 데이터는 유지하며, 인증과 동기화 기능을 붙일 때 이 스키마로 점진 이관합니다.

create type public.game_source as enum ('official', 'user');
create type public.game_visibility as enum ('private', 'unlisted', 'public');
create type public.game_moderation_status as enum (
  'draft',
  'pending_review',
  'published',
  'rejected',
  'archived'
);
create type public.game_item_kind as enum ('prompt', 'quiz', 'host-only');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '새 사용자' check (char_length(display_name) between 1 and 40),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.games (
  id text primary key check (char_length(id) between 1 and 120),
  owner_id uuid references auth.users (id) on delete cascade,
  source public.game_source not null,
  visibility public.game_visibility not null default 'private',
  moderation_status public.game_moderation_status not null default 'draft',
  name text not null check (char_length(name) between 1 and 100),
  archetype text not null check (archetype in ('QUIZ', 'TALK', 'SURVIVAL', 'PERFORM', 'PICK', 'BOMB')),
  phase text not null check (phase in ('opening', 'icebreak', 'main', 'finale')),
  duration_minutes integer not null check (duration_minutes between 1 and 240),
  places text[] not null default '{}',
  mode text not null check (mode in ('team', 'personal', 'both')),
  energy smallint not null check (energy between 1 and 5),
  description text not null check (char_length(description) between 1 and 1000),
  host_script text not null default '',
  rule_steps jsonb not null default '[]'::jsonb check (jsonb_typeof(rule_steps) = 'array'),
  people_min integer,
  people_max integer,
  recommended_teams_min integer,
  recommended_teams_max integer,
  contexts text[] not null default '{}',
  preparations text[] not null default '{}',
  difficulty text check (difficulty in ('easy', 'moderate', 'advanced')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  constraint games_people_range check (
    people_min is null or (people_min >= 1 and (people_max is null or people_max >= people_min))
  ),
  constraint games_recommended_teams_range check (
    (recommended_teams_min is null and recommended_teams_max is null)
    or (recommended_teams_min >= 1 and recommended_teams_max >= recommended_teams_min)
  ),
  constraint games_source_owner check (
    (source = 'official' and owner_id is null)
    or (source = 'user' and owner_id is not null)
  ),
  constraint games_published_state check (
    moderation_status <> 'published' or visibility = 'public'
  )
);

create table public.game_items (
  id text primary key check (char_length(id) between 1 and 120),
  game_id text not null references public.games (id) on delete cascade,
  kind public.game_item_kind not null,
  prompt text not null check (char_length(prompt) between 1 and 3000),
  answer text,
  hint text,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now()
);

create table public.event_plans (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 100),
  place text not null check (place in ('room', 'restaurant', 'hall', 'bus', 'outdoor')),
  people integer not null check (people >= 1),
  mode text not null check (mode in ('team', 'personal', 'both')),
  target_minutes integer not null check (target_minutes between 1 and 1440),
  teams jsonb not null default '[]'::jsonb check (jsonb_typeof(teams) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.event_plan_games (
  event_plan_id uuid not null references public.event_plans (id) on delete cascade,
  game_id text references public.games (id) on delete set null,
  game_snapshot jsonb not null check (jsonb_typeof(game_snapshot) = 'object'),
  allocated_minutes integer check (allocated_minutes is null or allocated_minutes >= 1),
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  primary key (event_plan_id, position)
);

create table public.game_favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  game_id text not null references public.games (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create index games_owner_id_idx on public.games (owner_id);
create index games_discovery_idx on public.games (visibility, moderation_status, phase, duration_minutes);
create index game_items_game_id_position_idx on public.game_items (game_id, position);
create index event_plans_owner_id_updated_at_idx on public.event_plans (owner_id, updated_at desc);
create index event_plan_games_game_id_idx on public.event_plan_games (game_id);
create index game_favorites_game_id_idx on public.game_favorites (game_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_games_updated_at
before update on public.games
for each row execute function public.set_updated_at();

create trigger set_event_plans_updated_at
before update on public.event_plans
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1), '새 사용자')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.games from anon, authenticated;
revoke all on table public.game_items from anon, authenticated;
revoke all on table public.event_plans from anon, authenticated;
revoke all on table public.event_plan_games from anon, authenticated;
revoke all on table public.game_favorites from anon, authenticated;

grant select on public.profiles to anon, authenticated;
grant update on public.profiles to authenticated;
grant select on public.games to anon, authenticated;
grant insert, update, delete on public.games to authenticated;
grant select on public.game_items to anon, authenticated;
grant insert, update, delete on public.game_items to authenticated;
grant select, insert, update, delete on public.event_plans to authenticated;
grant select, insert, update, delete on public.event_plan_games to authenticated;
grant select, insert, update, delete on public.game_favorites to authenticated;

alter table public.profiles enable row level security;
alter table public.games enable row level security;
alter table public.game_items enable row level security;
alter table public.event_plans enable row level security;
alter table public.event_plan_games enable row level security;
alter table public.game_favorites enable row level security;

create policy "profiles are readable"
on public.profiles for select
to anon, authenticated
using (true);

create policy "users can update their profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "published or owned games are readable"
on public.games for select
to anon, authenticated
using (
  (source = 'official' and visibility = 'public' and moderation_status = 'published')
  or owner_id = (select auth.uid())
);

create policy "users can create draft games"
on public.games for insert
to authenticated
with check (
  source = 'user'
  and owner_id = (select auth.uid())
  and visibility in ('private', 'unlisted')
  and moderation_status = 'draft'
);

create policy "users can edit their own unpublished games"
on public.games for update
to authenticated
using (owner_id = (select auth.uid()))
with check (
  source = 'user'
  and owner_id = (select auth.uid())
  and visibility in ('private', 'unlisted')
  and moderation_status in ('draft', 'pending_review')
);

create policy "users can delete their own games"
on public.games for delete
to authenticated
using (owner_id = (select auth.uid()));

create policy "items follow game visibility"
on public.game_items for select
to anon, authenticated
using (
  exists (
    select 1
    from public.games
    where games.id = game_items.game_id
      and (
        (games.source = 'official' and games.visibility = 'public' and games.moderation_status = 'published')
        or games.owner_id = (select auth.uid())
      )
  )
);

create policy "owners can manage their game items"
on public.game_items for all
to authenticated
using (
  exists (
    select 1 from public.games
    where games.id = game_items.game_id and games.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.games
    where games.id = game_items.game_id and games.owner_id = (select auth.uid())
  )
);

create policy "users can manage their event plans"
on public.event_plans for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "plan entries follow event plan ownership"
on public.event_plan_games for all
to authenticated
using (
  exists (
    select 1 from public.event_plans
    where event_plans.id = event_plan_games.event_plan_id
      and event_plans.owner_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.event_plans
    where event_plans.id = event_plan_games.event_plan_id
      and event_plans.owner_id = (select auth.uid())
  )
);

create policy "users can manage their favorites"
on public.game_favorites for all
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));
