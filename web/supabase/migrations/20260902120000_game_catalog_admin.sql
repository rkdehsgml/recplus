-- 공개 게임 라이브러리, 관리자 권한, 초기 공식 게임 데이터입니다.
-- 이 파일은 기존 initial_platform 마이그레이션을 적용한 뒤 실행합니다.

do $$
begin
  create type public.app_role as enum ('admin');
exception
  when duplicate_object then null;
end;
$$;

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now()
);

revoke all on table public.user_roles from anon, authenticated;
grant select on table public.user_roles to authenticated;
-- 서버 전용 Route Handler는 secret key의 service_role로 관리자 대상을 확인합니다.
grant select on table public.user_roles to service_role;
alter table public.user_roles enable row level security;

drop policy if exists "users can read their own roles" on public.user_roles;
create policy "users can read their own roles"
on public.user_roles for select
to authenticated
using (user_id = (select auth.uid()));

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

-- 공개 API에 노출하지 않는 권한 확인 함수입니다.
create or replace function private.is_game_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function private.is_game_admin() from public;
grant execute on function private.is_game_admin() to authenticated;

-- 공개된 사용자 제작 게임도 검수 후에는 라이브러리에 노출할 수 있게 합니다.
drop policy if exists "published or owned games are readable" on public.games;
create policy "published games and own drafts are readable"
on public.games for select
to anon, authenticated
using (
  (visibility = 'public' and moderation_status = 'published')
  or owner_id = (select auth.uid())
);

create policy "admins can read every game"
on public.games for select
to authenticated
using ((select private.is_game_admin()));

create policy "admins can create managed games"
on public.games for insert
to authenticated
with check ((select private.is_game_admin()));

create policy "admins can update every game"
on public.games for update
to authenticated
using ((select private.is_game_admin()))
with check ((select private.is_game_admin()));

create policy "admins can delete every game"
on public.games for delete
to authenticated
using ((select private.is_game_admin()));

drop policy if exists "items follow game visibility" on public.game_items;
create policy "items follow game visibility"
on public.game_items for select
to anon, authenticated
using (
  exists (
    select 1
    from public.games
    where games.id = game_items.game_id
      and (
        (games.visibility = 'public' and games.moderation_status = 'published')
        or games.owner_id = (select auth.uid())
      )
  )
);

create policy "admins can read every game item"
on public.game_items for select
to authenticated
using ((select private.is_game_admin()));

create policy "admins can manage every game item"
on public.game_items for all
to authenticated
using ((select private.is_game_admin()))
with check ((select private.is_game_admin()));

-- 현재 코드로 제공하던 공식 게임 15종을 한 번만 DB로 옮깁니다.
insert into public.games (
  id, source, visibility, moderation_status, name, archetype, phase, duration_minutes,
  places, mode, energy, description, host_script, rule_steps,
  people_min, people_max, recommended_teams_min, recommended_teams_max,
  contexts, preparations, difficulty, published_at
)
values
  ('chungazame', 'official', 'public', 'published', '청개구리 가위바위보', 'SURVIVAL', 'opening', 5, array['room','hall','outdoor','bus'], 'both', 2, '반대로 이겨야 하는 가위바위보로 가볍게 몸을 풉니다.', '제가 낸 것을 이기면 지고, 지면 이기는 거예요. 가위바위보!', '["진행자가 가위·바위·보 중 하나를 냅니다.","참가자는 반대로 이기는 손을 냅니다.","틀린 사람은 탈락하거나 가벼운 벌칙을 합니다."]'::jsonb, 4, 80, null, null, array['mt','orientation','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('nunchi', 'official', 'public', 'published', '눈치 게임', 'SURVIVAL', 'opening', 5, array['room','restaurant','bus'], 'personal', 2, '순서 없이 숫자를 외치며 서로의 눈치를 보는 대표 게임입니다.', '순서 없이 아무나 1부터 외쳐요. 동시에 외치면 둘 다 탈락입니다!', '["목표 숫자를 정합니다.","참가자가 아무 순서 없이 숫자를 외칩니다.","동시에 외치거나 망설인 사람에게 벌칙을 줍니다."]'::jsonb, 4, 30, null, null, array['mt','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('game369', 'official', 'public', 'published', '369 게임', 'SURVIVAL', 'opening', 5, array['room','restaurant','bus'], 'personal', 3, '숫자를 세다가 3·6·9에서 박수치는 빠른 템포의 게임입니다.', '돌아가며 숫자를 세는데 3, 6, 9가 들어가면 박수예요!', '["차례대로 숫자를 셉니다.","3·6·9가 있으면 숫자 대신 박수칩니다.","실수하면 벌칙 또는 다음 라운드 관전입니다."]'::jsonb, 4, 30, null, null, array['mt','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('balance', 'official', 'public', 'published', '밸런스 게임', 'TALK', 'icebreak', 15, array['room','restaurant','hall','bus'], 'both', 3, '둘 중 하나를 고르고 이유를 나누며 대화를 엽니다.', '둘 중 하나를 고르고, 왜 골랐는지 한마디씩 말해주세요.', '["질문 하나를 읽습니다.","참가자가 둘 중 하나를 고릅니다.","재미있는 이유를 골라 더 이야기합니다."]'::jsonb, 4, 50, null, null, array['mt','orientation','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('word-chain', 'official', 'public', 'published', '이어 말하기', 'TALK', 'icebreak', 10, array['room','restaurant','bus'], 'both', 3, '주제 안에서 빠르게 단어를 이어 말하는 준비물 없는 게임입니다.', '주제 안에서 돌아가며 말하세요. 3초 안에 못 대거나 중복이면 탈락!', '["주제를 하나 고릅니다.","한 명씩 관련 단어를 말합니다.","중복·지연·오답이면 라운드에서 빠집니다."]'::jsonb, 4, 40, null, null, array['mt','orientation','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('what-if', 'official', 'public', 'published', '만약에', 'TALK', 'icebreak', 10, array['room','restaurant','bus'], 'both', 2, '상상 질문으로 자연스러운 대화를 만드는 토크 게임입니다.', '만약에 질문을 듣고, 떠오르는 답을 편하게 말해주세요.', '["질문 하나를 읽습니다.","각자 답을 말합니다.","특히 재미있는 답을 이어서 물어봅니다."]'::jsonb, 4, 40, null, null, array['mt','orientation','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('sonbyeongho', 'official', 'public', 'published', '손병호 게임', 'SURVIVAL', 'icebreak', 10, array['room','restaurant','hall'], 'personal', 3, '공통점을 발견하며 서로 알아가는 손가락 생존 게임입니다.', '손가락 다섯 개를 펴고, 해당되면 하나씩 접어주세요.', '["모두 손가락 다섯 개를 폅니다.","질문에 해당하면 손가락을 접습니다.","손가락을 모두 접은 사람에게 가벼운 벌칙을 줍니다."]'::jsonb, 5, 40, null, null, array['mt','orientation','workshop','dinner'], array['없음'], 'easy', now()),
  ('choseong', 'official', 'public', 'published', '카테고리 초성 퀴즈', 'QUIZ', 'main', 20, array['room','hall','outdoor'], 'both', 4, '카테고리와 초성을 보고 정답을 맞히는 퀴즈입니다.', '카테고리와 초성을 보고 답을 외쳐주세요. 먼저 맞히면 점수!', '["문제와 카테고리를 보여줍니다.","참가자가 정답을 외칩니다.","정답을 확인하고 점수를 기록합니다."]'::jsonb, 8, 80, 2, 8, array['mt','orientation','workshop'], array['점수 기록 도구'], 'easy', now()),
  ('person-quiz', 'official', 'public', 'published', '인물 퀴즈', 'QUIZ', 'main', 15, array['room','hall'], 'both', 4, '힌트를 보고 인물을 맞히는 팀 대항 퀴즈입니다.', '힌트 세 개를 보고 누군지 맞혀주세요!', '["힌트를 하나씩 읽습니다.","참가자가 정답을 말합니다.","정답 팀에 점수를 줍니다."]'::jsonb, 8, 60, 2, 6, array['mt','orientation','workshop'], array['점수 기록 도구'], 'easy', now()),
  ('charades', 'official', 'public', 'published', '몸으로 말해요', 'PERFORM', 'main', 15, array['room','hall','outdoor'], 'team', 4, '말 없이 몸으로 제시어를 표현하는 팀전 게임입니다.', '말 없이 몸으로만 표현하세요. 팀원이 맞히면 하나씩 넘어갑니다!', '["팀별 출제자를 정합니다.","제한 시간 동안 제시어를 표현합니다.","맞힌 개수로 점수를 계산합니다."]'::jsonb, 6, 60, 2, 6, array['mt','orientation','workshop'], array['제시어를 볼 진행자 기기'], 'moderate', now()),
  ('speed-quiz', 'official', 'public', 'published', '스피드 퀴즈', 'QUIZ', 'main', 15, array['room','hall','outdoor'], 'team', 4, '설명하는 사람과 맞히는 사람이 호흡을 맞추는 팀전 게임입니다.', '출제자가 설명하고 팀원이 맞혀요. 모르면 통과할 수 있어요!', '["팀별 출제자를 정합니다.","제한 시간에 제시어를 설명합니다.","정답 수를 세어 점수를 줍니다."]'::jsonb, 6, 60, 2, 8, array['mt','orientation','workshop'], array['제시어를 볼 진행자 기기'], 'moderate', now()),
  ('one-mind', 'official', 'public', 'published', '이심전심', 'TALK', 'main', 15, array['room','restaurant','hall'], 'team', 3, '같은 질문에 같은 답을 적어 팀의 궁합을 겨룹니다.', '질문을 듣고 동시에 답을 적으세요. 답이 겹치면 점수입니다!', '["팀원 모두 답을 생각합니다.","동시에 답을 공개합니다.","겹친 답이 많을수록 점수를 얻습니다."]'::jsonb, 6, 50, 2, 6, array['mt','orientation','workshop','dinner'], array['종이와 펜'], 'easy', now()),
  ('penalty-wheel', 'official', 'public', 'published', '벌칙 룰렛', 'PICK', 'finale', 5, array['room','restaurant','hall','bus'], 'both', 4, '가벼운 벌칙이나 다음 진행자를 정하는 룰렛입니다.', '룰렛을 돌려서 오늘의 미션을 정해볼게요!', '["순한 미션 목록을 확인합니다.","룰렛을 돌립니다.","뽑힌 미션을 즐겁게 수행합니다."]'::jsonb, 4, 60, null, null, array['mt','orientation','bus','workshop','dinner'], array['없음'], 'easy', now()),
  ('time-bomb', 'official', 'public', 'published', '시한폭탄', 'BOMB', 'finale', 5, array['room','restaurant'], 'personal', 5, '언제 끝날지 모르는 폭탄을 넘기며 긴장감을 높입니다.', '폭탄을 들고 미션을 한 뒤 다음 사람에게 넘겨주세요!', '["랜덤 타이머를 시작합니다.","참가자가 미션 후 폭탄을 넘깁니다.","터질 때 들고 있던 사람이 벌칙을 받습니다."]'::jsonb, 5, 40, null, null, array['mt','orientation','workshop','dinner'], array['없음'], 'moderate', now()),
  ('awards', 'official', 'public', 'published', '연말 시상식', 'PICK', 'finale', 10, array['room','restaurant','hall'], 'both', 4, '오늘의 활약과 추억을 재미있는 상으로 마무리합니다.', '오늘의 활약을 떠올리면서 각 부문 수상자를 정해볼게요!', '["상 부문을 하나씩 읽습니다.","참가자가 후보를 추천합니다.","박수와 함께 수상자를 발표합니다."]'::jsonb, 6, 80, null, null, array['mt','orientation','workshop','dinner'], array['없음'], 'easy', now())
on conflict (id) do nothing;

insert into public.game_items (id, game_id, kind, prompt, answer, hint, position)
values
  ('balance-1','balance','prompt','평생 치킨만 vs 평생 피자만',null,null,0), ('balance-2','balance','prompt','여름만 있는 세상 vs 겨울만 있는 세상',null,null,1), ('balance-3','balance','prompt','계획 여행 vs 즉흥 여행',null,null,2),
  ('word-chain-1','word-chain','prompt','동물 이름',null,null,0), ('word-chain-2','word-chain','prompt','한국 음식',null,null,1), ('word-chain-3','word-chain','prompt','영화 제목',null,null,2),
  ('what-if-1','what-if','prompt','하루 동안 투명인간이 된다면?',null,null,0), ('what-if-2','what-if','prompt','초능력 하나를 고른다면?',null,null,1), ('what-if-3','what-if','prompt','무인도에 물건 3개만 가져간다면?',null,null,2),
  ('sonbyeongho-1','sonbyeongho','prompt','오늘 지각한 사람',null,null,0), ('sonbyeongho-2','sonbyeongho','prompt','자취하는 사람',null,null,1), ('sonbyeongho-3','sonbyeongho','prompt','아침을 안 먹고 온 사람',null,null,2),
  ('choseong-1','choseong','quiz','[음식] ㄸㅂㅇ','떡볶이',null,0), ('choseong-2','choseong','quiz','[동물] ㅋㅍㄹ','카피바라',null,1), ('choseong-3','choseong','quiz','[장소] ㅎㅇㄷ','해운대',null,2),
  ('person-quiz-1','person-quiz','quiz','만원권 / 한글 창제','세종대왕',null,0), ('person-quiz-2','person-quiz','quiz','거북선 / 조선 장군','이순신',null,1), ('person-quiz-3','person-quiz','quiz','E=mc² / 물리학자','아인슈타인',null,2),
  ('charades-1','charades','host-only','기타 치기',null,null,0), ('charades-2','charades','host-only','좀비 걷기',null,null,1), ('charades-3','charades','host-only','김밥 말기',null,null,2),
  ('speed-quiz-1','speed-quiz','host-only','아이스아메리카노',null,null,0), ('speed-quiz-2','speed-quiz','host-only','시험기간',null,null,1), ('speed-quiz-3','speed-quiz','host-only','노래방',null,null,2),
  ('one-mind-1','one-mind','prompt','치킨 하면 떠오르는 부위는?',null,null,0), ('one-mind-2','one-mind','prompt','초록색 하면 떠오르는 것은?',null,null,1), ('one-mind-3','one-mind','prompt','겨울 간식 하나?',null,null,2),
  ('penalty-wheel-1','penalty-wheel','prompt','옆 사람 칭찬 10초',null,null,0), ('penalty-wheel-2','penalty-wheel','prompt','웃긴 표정 5초',null,null,1), ('penalty-wheel-3','penalty-wheel','prompt','유행어 외치기',null,null,2),
  ('time-bomb-1','time-bomb','prompt','오늘 가장 웃겼던 사람 말하기',null,null,0), ('time-bomb-2','time-bomb','prompt','왼쪽 사람 칭찬하기',null,null,1), ('time-bomb-3','time-bomb','prompt','좋아하는 간식 말하기',null,null,2),
  ('awards-1','awards','prompt','오늘의 MVP',null,null,0), ('awards-2','awards','prompt','분위기 메이커상',null,null,1), ('awards-3','awards','prompt','최다 정답상',null,null,2)
on conflict (id) do nothing;
