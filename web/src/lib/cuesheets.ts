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

export function deleteCueSheet(id: string) {
  const next = loadCueSheets().filter((cue) => cue.id !== id);
  window.localStorage.setItem(CUESHEETS_KEY, JSON.stringify(next));
  return next;
}
