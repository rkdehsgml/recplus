import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  archetypes,
  eventContexts,
  gameOrigins,
  gameSeries,
  phases,
  places,
  type Archetype,
  type EventContext,
  type GameDefinition,
  type GameDifficulty,
  type GameItem,
  type GameItemKind,
  type GameOrigin,
  type GameSeries,
  type Phase,
  type Place,
  type PlayMode,
} from "./game-types";

type DatabaseGameItemRow = {
  answer: string | null;
  game_id: string;
  hint: string | null;
  id: string;
  kind: string;
  position: number;
  prompt: string;
};

export type DatabaseGameRow = {
  archetype: string;
  contexts: unknown;
  description: string;
  difficulty: string | null;
  duration_minutes: number;
  energy: number;
  game_items?: DatabaseGameItemRow[] | null;
  host_script: string;
  id: string;
  mode: string;
  name: string;
  origin: string | null;
  people_max: number | null;
  people_min: number | null;
  phase: string;
  places: unknown;
  preparations: unknown;
  recommended_teams_max: number | null;
  recommended_teams_min: number | null;
  rule_steps: unknown;
  series: unknown;
  source: string;
  created_at?: string;
  updated_at?: string;
  moderation_status?: "archived" | "draft" | "pending_review" | "published" | "rejected";
  review_note?: string | null;
};

const modes: PlayMode[] = ["team", "personal", "both"];
const difficulties: GameDifficulty[] = ["easy", "moderate", "advanced"];
const itemKinds: GameItemKind[] = ["prompt", "quiz", "host-only"];

function isOneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asRuleSteps(value: unknown): string[] {
  return stringArray(value).map((step) => step.trim()).filter(Boolean);
}

function mapItem(row: DatabaseGameItemRow): GameItem | null {
  if (!isOneOf(row.kind, itemKinds) || !row.id || !row.game_id || !row.prompt) return null;

  return {
    id: row.id,
    gameId: row.game_id,
    kind: row.kind,
    prompt: row.prompt,
    ...(row.answer ? { answer: row.answer } : {}),
    ...(row.hint ? { hint: row.hint } : {}),
  };
}

/** Supabase 행을 기존 화면에서 사용하는 GameDefinition으로 변환합니다. */
export function gameFromDatabaseRow(row: DatabaseGameRow): GameDefinition | null {
  if (!row.id || !row.name || !row.description
    || !isOneOf(row.archetype, archetypes)
    || !isOneOf(row.phase, phases)
    || !isOneOf(row.mode, modes)) return null;

  const gamePlaces = stringArray(row.places).filter((item): item is Place => isOneOf(item, places));
  const contexts = stringArray(row.contexts).filter((item): item is EventContext => isOneOf(item, eventContexts));
  const series = stringArray(row.series).filter((item): item is GameSeries => isOneOf(item, gameSeries));
  const mappedItems = (row.game_items ?? [])
    .slice()
    .sort((left, right) => left.position - right.position)
    .map(mapItem)
    .filter((item): item is GameItem => Boolean(item));

  return {
    id: row.id,
    name: row.name,
    archetype: row.archetype as Archetype,
    phase: row.phase as Phase,
    duration: row.duration_minutes,
    places: gamePlaces,
    mode: row.mode,
    energy: Math.min(5, Math.max(1, row.energy)) as GameDefinition["energy"],
    description: row.description,
    hostScript: row.host_script,
    ruleSteps: asRuleSteps(row.rule_steps),
    origin: isOneOf(row.origin, gameOrigins) ? row.origin as GameOrigin : "classic",
    series,
    // 공개 카탈로그에서는 로컬 전용 게임과 구분해 읽기 전용 콘텐츠로 취급합니다.
    source: "official",
    ...(row.created_at ? { createdAt: row.created_at } : {}),
    ...(row.updated_at ? { updatedAt: row.updated_at } : {}),
    ...(row.moderation_status ? { moderationStatus: row.moderation_status } : {}),
    ...(row.review_note ? { reviewNote: row.review_note } : {}),
    profile: {
      people: { min: row.people_min ?? 1, ...(row.people_max ? { max: row.people_max } : {}) },
      ...(row.recommended_teams_min && row.recommended_teams_max ? { recommendedTeams: { min: row.recommended_teams_min, max: row.recommended_teams_max } } : {}),
      places: gamePlaces,
      contexts,
      preparations: stringArray(row.preparations),
      difficulty: isOneOf(row.difficulty, difficulties) ? row.difficulty : "moderate",
    },
    items: mappedItems,
  };
}

export const databaseGameSelect = `
  id, name, archetype, phase, duration_minutes, places, mode, energy, description,
  host_script, rule_steps, people_min, people_max, recommended_teams_min,
  recommended_teams_max, contexts, preparations, difficulty, source, origin, series,
  created_at, updated_at, moderation_status, review_note,
  game_items ( id, game_id, kind, prompt, answer, hint, position )
`;

/** 공개·발행된 게임과 문제팩을 한 번에 읽습니다. */
export async function loadPublishedGames(): Promise<GameDefinition[]> {
  try {
    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("games")
      .select(databaseGameSelect)
      .eq("visibility", "public")
      .eq("moderation_status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return (data as unknown as DatabaseGameRow[])
      .map(gameFromDatabaseRow)
      .filter((game): game is GameDefinition => Boolean(game));
  } catch {
    return [];
  }
}
