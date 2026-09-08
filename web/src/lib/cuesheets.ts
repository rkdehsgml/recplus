import type { RecommendedGame, RecommendationInput } from "@/engine/recommend";

export const CUESHEETS_KEY = "recplus.cuesheets.v1";

export type SavedCueSheet = RecommendationInput & {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  games: RecommendedGame[];
};

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
    return Array.isArray(saved) ? saved.filter(isSavedCueSheet) : [];
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

export function saveCueSheet(input: Omit<SavedCueSheet, "id" | "createdAt" | "updatedAt">) {
  const now = new Date().toISOString();
  const cue: SavedCueSheet = {
    ...input,
    id: window.crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  const next = [cue, ...loadCueSheets()];
  window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(next));
  return cue;
}

export function updateCueSheet(cue: SavedCueSheet) {
  const now = new Date().toISOString();
  const nextCue = { ...cue, updatedAt: now };
  cacheCueSheets([nextCue, ...loadCueSheets().filter((item) => item.id !== cue.id)]);
  return nextCue;
}

export function deleteCueSheet(id: string) {
  const next = loadCueSheets().filter((cue) => cue.id !== id);
  window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(next));
  return next;
}
