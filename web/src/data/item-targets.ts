import type { GameDefinition } from "@/lib/game-types";

/**
 * 실행계획 2026겨울 6항의 게임별 목표 문항 수입니다.
 * 문제 데이터가 채워졌는지 한눈에 보기 위한 기준값이며, 추천 로직에는 쓰지 않습니다.
 */
export const itemTargets: Record<string, number> = {
  choseong: 100,
  "speed-quiz": 80,
  balance: 60,
  charades: 60,
  "what-if": 50,
  "word-chain": 40,
  "person-quiz": 40,
  "penalty-wheel": 40,
  "one-mind": 30,
  sonbyeongho: 30,
  chungazame: 20,
  nunchi: 15,
  game369: 15,
  "time-bomb": 15,
  awards: 30,
};

/** 브리프 2-5: 게임당 최소 8개, 권장 30개 이상 */
export const MINIMUM_ITEM_COUNT = 8;
export const RECOMMENDED_ITEM_COUNT = 30;

export function itemTargetFor(game: GameDefinition) {
  return itemTargets[game.id] ?? (game.source === "custom" ? MINIMUM_ITEM_COUNT : RECOMMENDED_ITEM_COUNT);
}
