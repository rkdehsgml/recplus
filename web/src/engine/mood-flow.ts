import type { RecommendedGame } from "./recommend";
import type { Phase } from "@/lib/game-types";

const phaseOrder: Phase[] = ["opening", "icebreak", "main", "finale"];

/**
 * 행사 초반의 부담을 낮추고, 메인에서 에너지를 끌어올린 뒤
 * 피날레의 여운으로 마무리하는 기본 레크 흐름입니다.
 */
const energyRangeByPhase: Record<Phase, readonly [number, number]> = {
  opening: [1, 2],
  icebreak: [2, 3],
  main: [3, 5],
  finale: [4, 5],
};

function targetEnergy(index: number, count: number, range: readonly [number, number]) {
  if (count <= 1) return (range[0] + range[1]) / 2;
  return range[0] + ((range[1] - range[0]) * index) / (count - 1);
}

/** 같은 단계의 게임은 목표 에너지에 가장 가까운 항목부터 고릅니다. 동점이면 기존 순서를 보존합니다. */
function arrangePhase(games: RecommendedGame[], phase: Phase) {
  const remaining = games.map((game, originalIndex) => ({ game, originalIndex }));
  const ordered: RecommendedGame[] = [];
  const range = energyRangeByPhase[phase];

  while (remaining.length) {
    const desired = targetEnergy(ordered.length, games.length, range);
    let nextIndex = 0;

    for (let index = 1; index < remaining.length; index += 1) {
      const candidateDistance = Math.abs(remaining[index].game.energy - desired);
      const selectedDistance = Math.abs(remaining[nextIndex].game.energy - desired);
      if (candidateDistance < selectedDistance || (candidateDistance === selectedDistance && remaining[index].originalIndex < remaining[nextIndex].originalIndex)) nextIndex = index;
    }

    ordered.push(remaining.splice(nextIndex, 1)[0].game);
  }

  return ordered;
}

/**
 * 게임의 단계는 유지하면서 에너지를 1→5 방향으로 자연스럽게 연결합니다.
 * 시간, 점수 방식, 진행자가 편집한 각 게임 정보는 변경하지 않습니다.
 */
export function arrangeByMoodFlow(games: RecommendedGame[]) {
  return phaseOrder.flatMap((phase) => arrangePhase(games.filter((game) => game.phase === phase), phase));
}
