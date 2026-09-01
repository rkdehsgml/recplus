import { gameItemsFor } from "./game-catalog";
import type { GameDefinition, GameItem, GameItemKind } from "./game-types";

export const ITEM_PACKS_KEY = "recplus.item-packs.v1";

/**
 * 진행자가 공식 게임 위에 직접 얹은 문항입니다.
 * 내 게임은 게임 레코드가 문항을 직접 들고 있어 여기에 저장하지 않습니다.
 * DB 연동 시 game_items의 사용자 생성 레코드로 옮겨갈 값입니다.
 */
export type ItemPacksByGame = Record<string, GameItem[]>;

function isGameItem(value: unknown): value is GameItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<GameItem>;
  return typeof item.id === "string"
    && typeof item.gameId === "string"
    && typeof item.prompt === "string"
    && (item.kind === "prompt" || item.kind === "quiz" || item.kind === "host-only");
}

export function loadItemPacks(): ItemPacksByGame {
  if (typeof window === "undefined") return {};

  try {
    const value = JSON.parse(window.localStorage.getItem(ITEM_PACKS_KEY) ?? "{}") as unknown;
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};

    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .map(([gameId, items]) => [gameId, Array.isArray(items) ? items.filter(isGameItem) : []]));
  } catch {
    return {};
  }
}

export function saveItemPack(gameId: string, items: GameItem[]): ItemPacksByGame {
  const next = { ...loadItemPacks(), [gameId]: items };
  window.localStorage.setItem(ITEM_PACKS_KEY, JSON.stringify(next));
  return next;
}

/** 공식 게임에 얹은 문항만 반환합니다. 내 게임은 항상 비어 있습니다. */
export function addedItemsFor(game: GameDefinition, packs: ItemPacksByGame) {
  return game.source === "custom" ? [] : packs[game.id] ?? [];
}

/**
 * 저장한 큐시트의 스냅샷 대신 지금의 문제팩을 씁니다.
 * 문항을 추가하면 이미 저장해둔 큐시트의 진행 화면에도 바로 반영됩니다.
 */
export function currentItemsFor(game: GameDefinition, packs: ItemPacksByGame, catalog: GameDefinition[]): GameItem[] {
  const live = catalog.find((item) => item.id === game.id) ?? game;
  return [...gameItemsFor(live), ...addedItemsFor(live, packs)];
}

export function createPackItem(gameId: string, kind: GameItemKind, prompt: string, answer?: string, hint?: string): GameItem {
  return {
    id: `${gameId}-pack-${crypto.randomUUID()}`,
    gameId,
    kind,
    prompt: prompt.trim(),
    ...(answer?.trim() ? { answer: answer.trim() } : {}),
    ...(hint?.trim() ? { hint: hint.trim() } : {}),
  };
}

/** 한 줄에 하나씩, 퀴즈는 `문제 → 정답` 형식으로 붙여넣은 텍스트를 문항으로 바꿉니다. */
export function parseItemLines(gameId: string, kind: GameItemKind, text: string): GameItem[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [prompt, ...rest] = line.split(/→|=>/);
      const answer = kind === "quiz" ? rest.join(" ").trim() : undefined;
      return createPackItem(gameId, kind, prompt, answer);
    })
    .filter((item) => Boolean(item.prompt));
}

/** 공백·괄호·문장부호를 걷어내고 비교해 "사실상 같은 문항"을 잡습니다. */
export function normalizeItemText(text: string) {
  return text.toLowerCase().replace(/[\s[\](){}·,.!?~"'’“”\-–—/]/g, "");
}

export function duplicateItemIds(items: GameItem[]) {
  const firstSeen = new Map<string, string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    const key = normalizeItemText(item.prompt);
    if (!key) continue;
    if (firstSeen.has(key)) duplicates.add(item.id);
    else firstSeen.set(key, item.id);
  }

  return duplicates;
}

const categoryPrefix = /^\[[^\]]+\]\s*\S/;

export function hasCategoryPrefix(prompt: string) {
  return categoryPrefix.test(prompt);
}

/** `[음식] ㄸㅂㅇ` 형식을 쓰는 게임에서만 접두어 규칙을 검사하려고, 기본 문항에서 관례를 읽습니다. */
export function usesCategoryPrefix(seedItems: GameItem[]) {
  const quizItems = seedItems.filter((item) => item.kind === "quiz");
  return quizItems.length > 0 && quizItems.every((item) => hasCategoryPrefix(item.prompt));
}
