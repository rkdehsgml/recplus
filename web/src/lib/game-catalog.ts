import type { Archetype, GameDefinition, GameItem, GameItemKind } from "./game-types";

export type ItemOrderByGame = Record<string, string[]>;

export function itemKindFor(archetype: Archetype): GameItemKind {
  if (archetype === "QUIZ") return "quiz";
  if (archetype === "PERFORM") return "host-only";
  return "prompt";
}

function legacyItems(game: GameDefinition): GameItem[] {
  return (game.prompts ?? []).map((value, index) => {
    const kind = itemKindFor(game.archetype);
    const [rawPrompt, ...rawAnswer] = value.split("→");
    const answer = kind === "quiz" ? rawAnswer.join("→").trim() : undefined;

    return {
      id: `${game.id}-legacy-${index + 1}`,
      gameId: game.id,
      kind,
      prompt: rawPrompt.trim(),
      ...(answer ? { answer } : {}),
    };
  });
}

/** DB에서 받은 items가 없을 때만 이전 localStorage 형식을 읽습니다. */
export function gameItemsFor(game: GameDefinition): GameItem[] {
  return game.items?.length ? game.items : legacyItems(game);
}

export function attachGameItems(games: GameDefinition[], items: GameItem[]): GameDefinition[] {
  const itemsByGameId = new Map<string, GameItem[]>();
  for (const item of items) {
    const current = itemsByGameId.get(item.gameId) ?? [];
    current.push(item);
    itemsByGameId.set(item.gameId, current);
  }

  return games.map((game) => ({ ...game, items: itemsByGameId.get(game.id) ?? game.items ?? [] }));
}

export function createCustomGameItems(gameId: string, values: Array<{ answer: string; prompt: string }>, archetype: Archetype): GameItem[] {
  const defaultKind = itemKindFor(archetype);

  return values.map((value, index) => {
    const prompt = value.prompt.trim();
    const answer = value.answer.trim();
    const kind = answer ? "quiz" : defaultKind;

    return {
      id: `${gameId}-item-${index + 1}`,
      gameId,
      kind,
      prompt,
      ...(answer ? { answer } : {}),
    };
  });
}

function shuffled(ids: string[]) {
  const next = [...ids];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function validOrder(itemIds: string[], order: string[] | undefined) {
  return Boolean(order)
    && order!.length === itemIds.length
    && order!.every((id) => itemIds.includes(id));
}

/** 세션을 다시 열어도 같은 순서를 유지하고, 한 바퀴 안에서는 중복 출제를 막습니다. */
export function createItemOrders(games: GameDefinition[], previous: ItemOrderByGame = {}): ItemOrderByGame {
  return Object.fromEntries(games.map((game) => {
    const itemIds = gameItemsFor(game).map((item) => item.id);
    const savedOrder = previous[game.id];
    return [game.id, validOrder(itemIds, savedOrder) ? savedOrder : shuffled(itemIds)];
  }));
}

export function orderedGameItems(game: GameDefinition, order: string[] | undefined) {
  const items = gameItemsFor(game);
  const itemsById = new Map(items.map((item) => [item.id, item]));
  const itemIds = order?.length ? order : items.map((item) => item.id);

  return itemIds.flatMap((id) => {
    const item = itemsById.get(id);
    return item ? [item] : [];
  });
}
