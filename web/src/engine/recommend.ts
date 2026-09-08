import type { GameDefinition, Phase, Place, PlayMode } from "@/lib/game-types";

export type RecommendationInput = {
  place: Place;
  people: number;
  /** `both` means a single event plan can include team and personal games. */
  mode: PlayMode;
  targetMinutes: number;
  teams?: EventTeam[];
};

export type EventTeam = {
  id: string;
  name: string;
};

export type RecommendedGame = GameDefinition & {
  allocatedDuration: number;
  reason: string;
  /** The scoring/operation mode selected for this entry in the cue sheet. */
  playMode: "team" | "personal";
};

const phaseOrder: Phase[] = ["opening", "icebreak", "main", "finale"];
const phaseRatios: Record<Phase, number> = { opening: 0.1, icebreak: 0.15, main: 0.55, finale: 0.2 };

function supportsMode(game: GameDefinition, mode: RecommendationInput["mode"]) {
  return mode === "both" || game.mode === "both" || game.mode === mode;
}

function supportsPeople(game: GameDefinition, people: number) {
  const range = game.profile?.people;
  return !range || (people >= range.min && (range.max === undefined || people <= range.max));
}

function supportsTeamCount(game: GameDefinition, teams: EventTeam[] | undefined) {
  const range = game.profile?.recommendedTeams;
  return !teams?.length || !range || (teams.length >= range.min && teams.length <= range.max);
}

export function playModeFor(game: Pick<GameDefinition, "mode">, eventMode: RecommendationInput["mode"]): "team" | "personal" {
  if (game.mode === "team" || game.mode === "personal") return game.mode;
  return eventMode === "personal" ? "personal" : "team";
}

function reasonFor(game: GameDefinition, input: RecommendationInput) {
  if (game.source === "custom") return "직접 만든 게임이라 이번 큐시트에 우선 담았어요.";
  if (game.phase === "opening") return `${input.people}명이 부담 없이 시작하기 좋은 게임이에요.`;
  if (game.phase === "icebreak") return "대화를 열고 다음 게임으로 자연스럽게 이어줘요.";
  if (game.phase === "main") return playModeFor(game, input.mode) === "team" ? "팀 간 호흡과 경쟁을 끌어올리는 메인 게임이에요." : "개인전의 집중도와 속도를 높이는 메인 게임이에요.";
  return "높아진 분위기를 기분 좋게 마무리해줘요.";
}

export function recommendGames(allGames: GameDefinition[], input: RecommendationInput): RecommendedGame[] {
  const available = allGames.filter((game) => game.places.includes(input.place)
    && supportsMode(game, input.mode)
    && supportsPeople(game, input.people)
    && (game.mode === "personal" || supportsTeamCount(game, input.teams)));
  const selected: GameDefinition[] = [];

  for (const phase of phaseOrder) {
    const target = input.targetMinutes * phaseRatios[phase];
    const candidates = available
      .filter((game) => game.phase === phase)
      .sort((a, b) => Number(b.source === "custom") - Number(a.source === "custom") || a.energy - b.energy);

    let phaseMinutes = 0;
    for (const game of candidates) {
      if (phaseMinutes >= target && selected.length > 0) break;
      selected.push(game);
      phaseMinutes += game.duration;
    }
  }

  const selectedIds = new Set(selected.map((game) => game.id));
  const extras = available
    .filter((game) => !selectedIds.has(game.id))
    .sort((a, b) => b.energy - a.energy || a.duration - b.duration);

  let currentMinutes = selected.reduce((sum, game) => sum + game.duration, 0);
  for (const game of extras) {
    if (currentMinutes >= input.targetMinutes - 5) break;
    selected.push(game);
    currentMinutes += game.duration;
  }

  const result = selected
    .sort((a, b) => phaseOrder.indexOf(a.phase) - phaseOrder.indexOf(b.phase) || a.energy - b.energy)
    .map((game) => ({ ...game, allocatedDuration: game.duration, reason: reasonFor(game, input), playMode: playModeFor(game, input.mode) }));

  let total = result.reduce((sum, game) => sum + game.allocatedDuration, 0);
  while (total > input.targetMinutes) {
    const reducible = [...result].reverse().find((game) => game.allocatedDuration > 5);
    if (!reducible) break;
    reducible.allocatedDuration -= 5;
    total -= 5;
  }

  const expandable = result.filter((game) => game.phase === "main").concat(result.filter((game) => game.phase !== "main"));
  let cursor = 0;
  while (total < input.targetMinutes && expandable.length) {
    expandable[cursor % expandable.length].allocatedDuration += 5;
    total += 5;
    cursor += 1;
  }

  return result;
}
