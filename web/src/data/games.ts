import { generatedFallbackGames } from "@/data/generated-game-catalog";

/**
 * DB가 아직 비어 있거나 오프라인일 때도 CSV 원본과 동일한 카탈로그를 제공합니다.
 * 이 파일을 직접 편집하지 말고 `data/*.csv`를 수정한 뒤 시드 생성기를 실행하세요.
 */
export const games = generatedFallbackGames;
