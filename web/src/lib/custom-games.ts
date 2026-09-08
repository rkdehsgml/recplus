import type { GameDefinition } from "./game-types";

export const CUSTOM_GAMES_KEY = "recplus.custom-games.v1";

export function loadCustomGames(): GameDefinition[] {
  if (typeof window === "undefined") return [];

  try {
    const value = window.localStorage.getItem(CUSTOM_GAMES_KEY);
    return value ? (JSON.parse(value) as GameDefinition[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomGame(game: GameDefinition) {
  const games = loadCustomGames();
  cacheCustomGames([{ ...game, updatedAt: game.updatedAt ?? new Date().toISOString() }, ...games.filter((item) => item.id !== game.id)]);
}

export function cacheCustomGames(games: GameDefinition[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(
    [...new Map(games.map((game) => [game.id, game])).values()],
  ));
}

export function deleteCustomGame(id: string) {
  const games = loadCustomGames().filter((game) => game.id !== id);
  window.localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(games));
  return games;
}

export function updateCustomGame(id: string, patch: Partial<GameDefinition>) {
  const games = loadCustomGames().map((game) => game.id === id ? { ...game, ...patch, updatedAt: new Date().toISOString() } : game);
  window.localStorage.setItem(CUSTOM_GAMES_KEY, JSON.stringify(games));
  return games;
}
