import type { Archetype } from "./game-types";

export const gamePaletteKeys = ["performance", "talk", "speed", "quiz", "active", "media"] as const;
export type GamePaletteKey = (typeof gamePaletteKeys)[number];

/**
 * 게임의 운영 유형을 첨부된 6개 시각 팔레트에 안정적으로 연결합니다.
 * PICK은 룰렛·시상식처럼 화면/연출 요소가 강해 음악·미디어 팔레트를 공유합니다.
 */
export const gamePaletteByArchetype: Record<Archetype, GamePaletteKey> = {
  PERFORM: "performance",
  TALK: "talk",
  BOMB: "speed",
  QUIZ: "quiz",
  SURVIVAL: "active",
  PICK: "media",
};

export function gamePaletteFor(archetype: Archetype): GamePaletteKey {
  return gamePaletteByArchetype[archetype];
}
