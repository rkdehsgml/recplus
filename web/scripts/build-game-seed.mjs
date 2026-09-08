#!/usr/bin/env node
/**
 * data/games.csv + data/game_items.csv → supabase/seeds/game_catalog_seed.sql
 *
 * 콘텐츠 파이프라인: 스프레드시트 → CSV → 이 스크립트 → SQL(또는 TS 시드)
 * 팀원은 CSV만 편집하고, 코드를 만지지 않습니다.
 *
 *   node scripts/build-game-seed.mjs                  # SQL 생성
 *   node scripts/build-game-seed.mjs --check          # 검증만 (CI용)
 *   node scripts/build-game-seed.mjs --fix-choseong   # 초성 퀴즈 prompt를 answer에서 다시 생성
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GAMES_CSV = join(root, "data", "games.csv");
const ITEMS_CSV = join(root, "data", "game_items.csv");
const OUT_SQL = join(root, "supabase", "seeds", "game_catalog_seed.sql");

const ARCHETYPES = ["QUIZ", "TALK", "SURVIVAL", "PERFORM", "PICK", "BOMB"];
const PHASES = ["opening", "icebreak", "main", "finale"];
const PLACES = ["room", "restaurant", "hall", "bus", "outdoor"];
const CONTEXTS = ["mt", "orientation", "bus", "workshop", "dinner"];
const MODES = ["team", "personal", "both"];
const DIFFICULTIES = ["easy", "moderate", "advanced"];
const ORIGINS = ["variety", "classic", "original"];
const SERIES = ["new-journey", "earth-arcade"];
const ITEM_KINDS = ["prompt", "quiz", "host-only"];

/** RFC 4180 최소 구현. 스프레드시트가 내보낸 따옴표·줄바꿈을 그대로 읽습니다. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^﻿/, "").replace(/\r\n/g, "\n");

  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i += 1; }
        else quoted = false;
      } else field += ch;
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else field += ch;
  }
  if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }

  const [header, ...body] = rows;
  return body
    .filter((cells) => cells.some((cell) => cell.trim() !== ""))
    .map((cells) => Object.fromEntries(header.map((key, i) => [key.trim(), (cells[i] ?? "").trim()])));
}

const CHOSUNG = [..."ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ"];

/** 한글 단어에서 초성만 뽑습니다. 초성 퀴즈 문제를 손으로 세지 않기 위한 도구입니다. */
function toChoseong(word) {
  let out = "";
  for (const ch of word) {
    const code = ch.codePointAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) out += CHOSUNG[Math.floor((code - 0xac00) / 588)];
    else if (ch !== " ") out += ch;
  }
  return out;
}

/** CSV 한 행을 다시 CSV 문자열로. 쉼표·따옴표·줄바꿈이 있으면 감쌉니다. */
const csvCell = (value) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

if (process.argv.includes("--fix-choseong")) {
  const header = ["id", "game_id", "kind", "prompt", "answer", "hint", "position"];
  const rows = parseCsv(readFileSync(ITEMS_CSV, "utf8"));
  let fixed = 0;
  for (const row of rows) {
    if (row.game_id !== "choseong" || !row.answer) continue;
    const category = /^\[([^\]]+)\]/.exec(row.prompt)?.[1] ?? "";
    const next = `${category ? `[${category}] ` : ""}${toChoseong(row.answer)}`;
    if (next !== row.prompt) { row.prompt = next; fixed += 1; }
  }
  const body = rows.map((row) => header.map((key) => csvCell(row[key] ?? "")).join(",")).join("\n");
  writeFileSync(ITEMS_CSV, `﻿${header.join(",")}\n${body}\n`, "utf8");
  console.log(`초성 ${fixed}개 갱신. 이어서 빌드하려면 옵션 없이 다시 실행하세요.`);
  process.exit(0);
}

const errors = [];
const fail = (message) => errors.push(message);

const list = (value) => (value ? value.split("|").map((part) => part.trim()).filter(Boolean) : []);
const num = (value) => (value === "" ? null : Number(value));
const oneOf = (value, allowed, label, id) => {
  if (!allowed.includes(value)) fail(`${id}: ${label} 값이 잘못됨 → "${value}"`);
  return value;
};

const games = parseCsv(readFileSync(GAMES_CSV, "utf8")).map((row) => {
  const id = row.id;
  if (!id) fail("id가 빈 행이 있습니다");
  const game = {
    id,
    name: row.name,
    archetype: oneOf(row.archetype, ARCHETYPES, "archetype", id),
    phase: oneOf(row.phase, PHASES, "phase", id),
    duration: num(row.duration_minutes),
    places: list(row.places),
    mode: oneOf(row.mode, MODES, "mode", id),
    energy: num(row.energy),
    description: row.description,
    hostScript: row.host_script,
    ruleSteps: list(row.rule_steps),
    peopleMin: num(row.people_min),
    peopleMax: num(row.people_max),
    teamsMin: num(row.recommended_teams_min),
    teamsMax: num(row.recommended_teams_max),
    contexts: list(row.contexts),
    preparations: list(row.preparations),
    difficulty: oneOf(row.difficulty, DIFFICULTIES, "difficulty", id),
    origin: oneOf(row.origin, ORIGINS, "origin", id),
    series: list(row.series),
  };

  for (const place of game.places) if (!PLACES.includes(place)) fail(`${id}: places "${place}"`);
  for (const context of game.contexts) if (!CONTEXTS.includes(context)) fail(`${id}: contexts "${context}"`);
  for (const series of game.series) if (!SERIES.includes(series)) fail(`${id}: series "${series}"`);
  if (!game.name || game.name.length > 100) fail(`${id}: name 길이(1~100)`);
  if (!game.description || game.description.length > 1000) fail(`${id}: description 길이(1~1000)`);
  if (!(game.duration >= 1 && game.duration <= 240)) fail(`${id}: duration_minutes(1~240)`);
  if (!(game.energy >= 1 && game.energy <= 5)) fail(`${id}: energy(1~5)`);
  if (game.ruleSteps.length < 2) fail(`${id}: rule_steps가 2개 미만`);
  if (game.places.length === 0) fail(`${id}: places 비어 있음`);
  if (game.peopleMin !== null && game.peopleMax !== null && game.peopleMin > game.peopleMax) fail(`${id}: 인원 범위 역전`);
  if ((game.teamsMin === null) !== (game.teamsMax === null)) fail(`${id}: 팀 범위는 둘 다 있거나 둘 다 비어야 함`);
  return game;
});

const gameIds = new Set();
for (const game of games) {
  if (gameIds.has(game.id)) fail(`게임 id 중복: ${game.id}`);
  gameIds.add(game.id);
}

const positionByGame = new Map();
const itemIds = new Set();
const items = parseCsv(readFileSync(ITEMS_CSV, "utf8")).map((row) => {
  if (!gameIds.has(row.game_id)) fail(`문항 ${row.id}: 존재하지 않는 game_id "${row.game_id}"`);
  if (itemIds.has(row.id)) fail(`문항 id 중복: ${row.id}`);
  itemIds.add(row.id);
  if (!ITEM_KINDS.includes(row.kind)) fail(`문항 ${row.id}: kind "${row.kind}"`);
  if (!row.prompt || row.prompt.length > 3000) fail(`문항 ${row.id}: prompt 길이(1~3000)`);
  const next = positionByGame.get(row.game_id) ?? 0;
  positionByGame.set(row.game_id, next + 1);
  return {
    id: row.id,
    gameId: row.game_id,
    kind: row.kind,
    prompt: row.prompt,
    answer: row.answer || null,
    hint: row.hint || null,
    position: row.position === "" ? next : Number(row.position),
  };
});

if (errors.length > 0) {
  console.error(`검증 실패 ${errors.length}건`);
  for (const message of errors) console.error("  -", message);
  process.exit(1);
}

const withoutItems = games.filter((game) => !positionByGame.has(game.id)).map((game) => game.id);
console.log(`게임 ${games.length}종 / 문항 ${items.length}개`);
if (withoutItems.length > 0) console.log(`문항 없는 게임: ${withoutItems.join(", ")}`);

if (process.argv.includes("--check")) {
  console.log("검증만 수행하고 종료합니다.");
  process.exit(0);
}

// ── SQL 생성 ────────────────────────────────────────────────────────────────
const q = (value) => (value === null || value === undefined ? "null" : `'${String(value).replace(/'/g, "''")}'`);
const arr = (values) => (values.length === 0 ? "'{}'" : `array[${values.map(q).join(",")}]`);
const jsonArr = (values) => `${q(JSON.stringify(values))}::jsonb`;
const int = (value) => (value === null ? "null" : String(value));

const gameValues = games.map((game) => `  (${[
  q(game.id), "'official'", "'public'", "'published'", q(game.name), q(game.archetype),
  q(game.phase), int(game.duration), arr(game.places), q(game.mode), int(game.energy),
  q(game.description), q(game.hostScript), jsonArr(game.ruleSteps),
  int(game.peopleMin), int(game.peopleMax), int(game.teamsMin), int(game.teamsMax),
  arr(game.contexts), arr(game.preparations), q(game.difficulty), q(game.origin),
  arr(game.series), "now()",
].join(", ")})`).join(",\n");

const itemValues = items.map((item) => `  (${[
  q(item.id), q(item.gameId), q(item.kind), q(item.prompt), q(item.answer), q(item.hint), int(item.position),
].join(", ")})`).join(",\n");

const sql = `-- 자동 생성 파일입니다. 직접 수정하지 마세요.
-- 원본: data/games.csv, data/game_items.csv
-- 재생성: node scripts/build-game-seed.mjs
-- 게임 ${games.length}종 / 문항 ${items.length}개

begin;

insert into public.games (
  id, source, visibility, moderation_status, name, archetype, phase, duration_minutes,
  places, mode, energy, description, host_script, rule_steps,
  people_min, people_max, recommended_teams_min, recommended_teams_max,
  contexts, preparations, difficulty, origin, series, published_at
)
values
${gameValues}
on conflict (id) do update set
  name = excluded.name,
  archetype = excluded.archetype,
  phase = excluded.phase,
  duration_minutes = excluded.duration_minutes,
  places = excluded.places,
  mode = excluded.mode,
  energy = excluded.energy,
  description = excluded.description,
  host_script = excluded.host_script,
  rule_steps = excluded.rule_steps,
  people_min = excluded.people_min,
  people_max = excluded.people_max,
  recommended_teams_min = excluded.recommended_teams_min,
  recommended_teams_max = excluded.recommended_teams_max,
  contexts = excluded.contexts,
  preparations = excluded.preparations,
  difficulty = excluded.difficulty,
  origin = excluded.origin,
  series = excluded.series;

-- 공식 게임의 문항은 CSV가 유일한 원본입니다. 한 번 비우고 다시 채웁니다.
-- 사용자 제작 게임(source = 'user')의 문항은 건드리지 않습니다.
delete from public.game_items
where game_id in (select id from public.games where source = 'official');

insert into public.game_items (id, game_id, kind, prompt, answer, hint, position)
values
${itemValues}
on conflict (id) do update set
  game_id = excluded.game_id,
  kind = excluded.kind,
  prompt = excluded.prompt,
  answer = excluded.answer,
  hint = excluded.hint,
  position = excluded.position;

commit;
`;

mkdirSync(dirname(OUT_SQL), { recursive: true });
writeFileSync(OUT_SQL, sql, "utf8");
console.log(`생성 완료: supabase/seeds/game_catalog_seed.sql (${(sql.length / 1024).toFixed(0)}KB)`);
