# 게임 데이터셋 (콘텐츠 원본)

게임 카탈로그와 문제팩의 **유일한 원본**입니다. 코드(`src/data/*.ts`)나 DB를 직접 고치지 말고,
여기 CSV만 고친 뒤 빌드 스크립트를 돌리세요.

```
스프레드시트 편집 → CSV 저장 → node scripts/build-game-seed.mjs → supabase/seeds/game_catalog_seed.sql → DB 적용
```

현재 규모: **게임 54종 / 문항 1,801개**

## 파일

| 파일 | 내용 | 대응 테이블 |
|---|---|---|
| `games.csv` | 게임 메타데이터 54행 | `public.games` |
| `game_items.csv` | 문항·제시어 1,801행 | `public.game_items` |

## 편집 규칙

- **여러 값을 넣는 칸은 `|`(파이프)로 구분**합니다. 쉼표 아님. 예: `room|hall|outdoor`
- 스프레드시트에서 열 때 **UTF-8**로 열고, 저장도 UTF-8 CSV로 하세요.
- `id`는 한 번 정하면 바꾸지 마세요. DB의 기본키이고, 저장된 큐시트가 이 값을 참조합니다.
- 행을 지우면 다음 빌드 때 DB에서도 지워집니다. 잠시 숨기고 싶으면 지우지 말고 따로 표시해 두세요.

### games.csv 열 설명

| 열 | 허용 값 / 제약 |
|---|---|
| `id` | 영문 소문자·하이픈. 중복 불가 |
| `name` | 1~100자 |
| `archetype` | `QUIZ` `TALK` `SURVIVAL` `PERFORM` `PICK` `BOMB` |
| `phase` | `opening` `icebreak` `main` `finale` |
| `duration_minutes` | 1~240 |
| `places` | `room` `restaurant` `hall` `bus` `outdoor` 중 `|`로 나열 |
| `mode` | `team` `personal` `both` |
| `energy` | 1~5 (분위기 세기) |
| `description` | 1~1000자. 목록 카드에 보이는 한 줄 소개 |
| `host_script` | 진행자가 그대로 읽는 멘트 |
| `rule_steps` | 진행 순서. `|`로 구분, 2단계 이상 |
| `people_min` / `people_max` | 권장 인원. min ≤ max |
| `recommended_teams_min` / `_max` | 팀전일 때만. 둘 다 쓰거나 둘 다 비우기 |
| `contexts` | `mt` `orientation` `bus` `workshop` `dinner` |
| `preparations` | 준비물. 없으면 `없음` |
| `difficulty` | `easy` `moderate` `advanced` (진행 난이도) |
| `origin` | `variety`(예능 포맷) `classic`(고전 레크) `original`(자체 변형) |
| `series` | 비우거나 `new-journey` `earth-arcade` |

### game_items.csv 열 설명

| 열 | 설명 |
|---|---|
| `id` | `<game_id>-<번호>` 규칙. 중복 불가 |
| `game_id` | `games.csv`에 있는 id여야 함 |
| `kind` | `prompt`(참가자에게 그대로 보여줌) / `quiz`(정답이 있음) / `host-only`(진행자만 봄) |
| `prompt` | 문제·제시어·주제. 1~3000자 |
| `answer` | `quiz`일 때 정답. 나머지는 비움 |
| `hint` | 선택. 안 풀릴 때 추가로 여는 단서 |
| `position` | 출제 순서. 비우면 행 순서대로 자동 부여 |

문항이 많은 게임 상위: 밸런스 게임 90 · 스피드 퀴즈 90 · 초성 퀴즈 80 · 나는 누구일까 61 ·
몸으로 말해요 60 · 넌센스 퀴즈 60 · 벌칙 룰렛 50 · 진실 혹은 도전 50

## 빌드

```bash
cd web
node scripts/build-game-seed.mjs           # 검증 + SQL 생성
node scripts/build-game-seed.mjs --check    # 검증만 (CI에서 사용)
```

검증에 걸리는 것: enum 값 오타, 글자 수 초과, id 중복, 존재하지 않는 `game_id` 참조,
인원 범위 역전, 팀 범위 한쪽만 채움, `rule_steps` 2단계 미만.
하나라도 걸리면 SQL을 만들지 않고 종료 코드 1로 끝납니다.

## DB 적용

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/seeds/game_catalog_seed.sql
```

- 트랜잭션 하나로 실행되고, 여러 번 돌려도 결과가 같습니다(멱등).
- `source = 'official'` 게임의 문항은 매번 비우고 다시 채웁니다. **CSV가 원본**이기 때문입니다.
- 사용자가 만든 게임(`source = 'user'`)과 그 문항은 건드리지 않습니다.

## 초성 퀴즈 주의

`choseong` 문항의 `prompt`는 `[카테고리] ㄸㅂㅇ` 형식입니다.
정답을 바꾸면 초성도 같이 고쳐야 합니다. 초성을 손으로 세지 말고
`answer`만 바꾼 뒤 생성기를 다시 돌리는 쪽이 안전합니다.
