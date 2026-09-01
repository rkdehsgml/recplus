import type { ItemOrderByGame } from "./game-catalog";

export const PLAY_SESSION_PREFIX = "recplus.play-session.v1";

export type GameProgress = "pending" | "completed" | "skipped";

export type PersonalScore = {
  id: string;
  name: string;
  score: number;
};

export type PlaySession = {
  currentIndex: number;
  secondsLeft: number;
  promptIndex: number;
  scores: number[];
  personalScores?: PersonalScore[];
  gameProgress: GameProgress[];
  itemOrders?: ItemOrderByGame;
  updatedAt: string;
};

function isGameProgress(value: unknown): value is GameProgress {
  return value === "pending" || value === "completed" || value === "skipped";
}

function isPersonalScore(value: unknown): value is PersonalScore {
  if (!value || typeof value !== "object") return false;

  const score = value as Partial<PersonalScore>;
  return typeof score.id === "string"
    && typeof score.name === "string"
    && Number.isFinite(score.score);
}

function isItemOrders(value: unknown): value is ItemOrderByGame {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  return Object.values(value).every((order) => Array.isArray(order) && order.every((itemId) => typeof itemId === "string"));
}

function isPlaySession(value: unknown): value is PlaySession {
  if (!value || typeof value !== "object") return false;

  const session = value as Partial<PlaySession>;
  return Number.isFinite(session.currentIndex)
    && Number.isFinite(session.secondsLeft)
    && Number.isFinite(session.promptIndex)
    && Array.isArray(session.scores)
    && session.scores.every(Number.isFinite)
    && (session.personalScores === undefined || (Array.isArray(session.personalScores) && session.personalScores.every(isPersonalScore)))
    && Array.isArray(session.gameProgress)
    && session.gameProgress.every(isGameProgress)
    && (session.itemOrders === undefined || isItemOrders(session.itemOrders))
    && typeof session.updatedAt === "string";
}

function sessionKey(cueSheetId: string) {
  return `${PLAY_SESSION_PREFIX}.${cueSheetId}`;
}

export function loadPlaySession(cueSheetId: string): PlaySession | null {
  if (typeof window === "undefined") return null;

  try {
    const value = JSON.parse(window.localStorage.getItem(sessionKey(cueSheetId)) ?? "null") as unknown;
    return isPlaySession(value) ? value : null;
  } catch {
    return null;
  }
}

export function savePlaySession(cueSheetId: string, session: Omit<PlaySession, "updatedAt">) {
  if (typeof window === "undefined") return;

  const next: PlaySession = { ...session, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(sessionKey(cueSheetId), JSON.stringify(next));
}

export function clearPlaySession(cueSheetId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(sessionKey(cueSheetId));
}
