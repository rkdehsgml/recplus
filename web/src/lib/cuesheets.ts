import type { RecommendedGame, RecommendationInput } from "@/engine/recommend";
import type { EventGroup, EventPlanConditionCompletionState } from "./event-plan-contract";

export const CUESHEETS_KEY = "recplus.cuesheets.v1";

export type SavedCueSheetGame = RecommendedGame & {
  planItemId: string;
};

export type SavedCueSheet = RecommendationInput & {
  cloudRevision?: number;
  conditionCompletionState?: EventPlanConditionCompletionState;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  eventConstraints?: string[];
  eventGroup?: EventGroup;
  eventType?: string;
  games: SavedCueSheetGame[];
};

type SavedCueSheetInput = Omit<SavedCueSheet, "cloudRevision" | "createdAt" | "games" | "id" | "updatedAt"> & {
  games: RecommendedGame[];
};

type SavedCueSheetUpdate = Omit<SavedCueSheet, "games"> & {
  games: RecommendedGame[];
};

function isUuid(value: unknown): value is string {
  return typeof value === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function withPlanItemIds(games: RecommendedGame[]): SavedCueSheetGame[] {
  const used = new Set<string>();
  return games.map((game) => {
    const current = (game as Partial<SavedCueSheetGame>).planItemId;
    const planItemId = isUuid(current) && !used.has(current) ? current : window.crypto.randomUUID();
    used.add(planItemId);
    return { ...game, planItemId };
  });
}

function isSavedCueSheet(value: unknown): value is SavedCueSheet {
  if (!value || typeof value !== "object") return false;
  const cue = value as Partial<SavedCueSheet>;
  return typeof cue.id === "string"
    && typeof cue.name === "string"
    && Array.isArray(cue.games)
    && typeof cue.targetMinutes === "number";
}

export function loadCueSheets(): SavedCueSheet[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(window.localStorage.getItem(CUESHEETS_KEY) ?? "[]") as unknown;
    if (!Array.isArray(saved)) return [];
    const normalized = saved
      .filter(isSavedCueSheet)
      .map((cue) => ({ ...cue, games: withPlanItemIds(cue.games) }));
    window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    return [];
  }
}

export function getCueSheet(id: string) {
  return loadCueSheets().find((cue) => cue.id === id);
}

export function cacheCueSheets(cues: SavedCueSheet[]) {
  if (typeof window === "undefined") return;
  const unique = [...new Map(cues.map((cue) => [cue.id, cue])).values()]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(unique));
}

export function cacheCueSheet(cue: SavedCueSheet) {
  cacheCueSheets([cue, ...loadCueSheets().filter((item) => item.id !== cue.id)]);
}

export function saveCueSheet(input: SavedCueSheetInput) {
  const now = new Date().toISOString();
  const cue: SavedCueSheet = {
    ...input,
    id: window.crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    games: withPlanItemIds(input.games),
  };
  const next = [cue, ...loadCueSheets()];
  window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(next));
  return cue;
}

export function updateCueSheet(cue: SavedCueSheetUpdate) {
  const now = new Date().toISOString();
  const nextCue: SavedCueSheet = { ...cue, games: withPlanItemIds(cue.games), updatedAt: now };
  cacheCueSheets([nextCue, ...loadCueSheets().filter((item) => item.id !== cue.id)]);
  return nextCue;
}

export function deleteCueSheet(id: string) {
  const next = loadCueSheets().filter((cue) => cue.id !== id);
  window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(next));
  return next;
}
