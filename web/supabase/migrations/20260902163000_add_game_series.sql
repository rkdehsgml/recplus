-- 방송 프로그램 컬렉션에서 게임을 탐색할 수 있도록 다중 시리즈 태그를 추가합니다.

alter table public.games
add column if not exists series text[] not null default '{}';

alter table public.games
drop constraint if exists games_series_check;

alter table public.games
add constraint games_series_check
check (series <@ array['new-journey', 'earth-arcade']::text[]);

update public.games
set series = array['new-journey']
where id = 'person-quiz';

insert into public.games (
  id, source, visibility, moderation_status, name, archetype, phase, duration_minutes,
  places, mode, energy, description, host_script, rule_steps,
  people_min, people_max, recommended_teams_min, recommended_teams_max,
  contexts, preparations, difficulty, origin, series, published_at
)
values
  ('silent-shout', 'official', 'public', 'published', '고요 속의 외침', 'PERFORM', 'main', 15, array['room','hall'], 'team', 5, '큰 소리 때문에 들리지 않는 상황에서 입모양과 몸짓만으로 제시어를 전달합니다.', '한 명은 음악 때문에 듣지 못하고, 한 명은 입모양과 몸짓으로만 제시어를 설명합니다!', '["팀별로 설명자와 맞히는 사람을 정합니다.","맞히는 사람은 소리를 듣지 못하게 하고 제시어를 설명합니다.","제한 시간 안에 맞힌 개수로 점수를 정합니다."]'::jsonb, 4, 40, 2, 6, array['mt','orientation','workshop'], array['음악을 들을 기기','제시어'], 'moderate', 'variety', array['new-journey'], now()),
  ('hunminjeongeum', 'official', 'public', 'published', '훈민정음', 'TALK', 'main', 10, array['room','restaurant','hall'], 'both', 4, '지정한 자음만 써서 제시어를 설명하고, 제한 시간 안에 정답을 맞힙니다.', '오늘은 특정 자음만 쓸 수 있어요. 말이 막히면 통과, 팀원이 맞히면 점수입니다!', '["라운드에서 쓸 수 있는 자음을 정합니다.","설명자는 그 자음만 써서 제시어를 설명합니다.","제한 시간에 맞힌 개수를 기록합니다."]'::jsonb, 4, 40, 2, 6, array['mt','orientation','workshop','dinner'], array['제시어'], 'moderate', 'variety', array['new-journey'], now()),
  ('music-quiz-2v2', 'official', 'public', 'published', '2:2 음악 퀴즈', 'QUIZ', 'main', 15, array['room','hall'], 'team', 5, '짧게 들려주는 노래 도입부를 듣고 제목 또는 가수를 먼저 맞히는 팀전 퀴즈입니다.', '도입부를 짧게 들려드릴게요. 팀원 둘이 빠르게 상의해서 정답을 외쳐주세요!', '["팀별로 대답 순서와 점수를 정합니다.","진행자가 준비한 음악 도입부를 짧게 재생합니다.","제목 또는 가수를 먼저 맞힌 팀에 점수를 줍니다."]'::jsonb, 4, 40, 2, 6, array['mt','orientation','workshop'], array['음악 재생 기기','스피커'], 'moderate', 'variety', array['earth-arcade'], now()),
  ('snack-quiz', 'official', 'public', 'published', '실물 과자 퀴즈', 'QUIZ', 'icebreak', 10, array['room','restaurant','hall'], 'both', 4, '포장의 일부, 모양 또는 힌트를 보고 과자 이름을 맞히는 빠른 퀴즈입니다.', '화면이나 실물로 힌트를 보여드릴게요. 가장 먼저 과자 이름을 맞히면 점수입니다!', '["진행자가 과자 포장 일부나 힌트를 준비합니다.","참가자가 보이는 단서로 과자 이름을 맞힙니다.","정답을 확인하고 다음 문제로 넘어갑니다."]'::jsonb, 4, 50, null, null, array['mt','orientation','workshop','dinner'], array['과자 포장 또는 사진'], 'easy', 'variety', array['earth-arcade'], now())
on conflict (id) do nothing;

create index if not exists games_series_idx
on public.games using gin (series);
