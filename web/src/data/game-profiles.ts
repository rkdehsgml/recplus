import type { GameProfile } from "@/lib/game-types";

/**
 * 기본 게임 카탈로그의 현장 운영 정보입니다. 문항을 추가하지 않고,
 * 게임 DB가 제공해야 할 탐색·판단 데이터를 먼저 분리합니다.
 */
export const gameProfiles: Record<string, GameProfile> = {
  chungazame: { people: { min: 4, max: 80 }, places: ["room", "hall", "outdoor", "bus"], contexts: ["mt", "orientation", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  nunchi: { people: { min: 4, max: 30 }, places: ["room", "restaurant", "bus"], contexts: ["mt", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  game369: { people: { min: 4, max: 30 }, places: ["room", "restaurant", "bus"], contexts: ["mt", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  balance: { people: { min: 4, max: 50 }, places: ["room", "restaurant", "hall", "bus"], contexts: ["mt", "orientation", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  "word-chain": { people: { min: 4, max: 40 }, places: ["room", "restaurant", "bus"], contexts: ["mt", "orientation", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  "what-if": { people: { min: 4, max: 40 }, places: ["room", "restaurant", "bus"], contexts: ["mt", "orientation", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  sonbyeongho: { people: { min: 5, max: 40 }, places: ["room", "restaurant", "hall"], contexts: ["mt", "orientation", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  choseong: { people: { min: 8, max: 80 }, recommendedTeams: { min: 2, max: 8 }, places: ["room", "hall", "outdoor"], contexts: ["mt", "orientation", "workshop"], preparations: ["점수 기록 도구"], difficulty: "easy" },
  "person-quiz": { people: { min: 8, max: 60 }, recommendedTeams: { min: 2, max: 6 }, places: ["room", "hall"], contexts: ["mt", "orientation", "workshop"], preparations: ["점수 기록 도구"], difficulty: "easy" },
  charades: { people: { min: 6, max: 60 }, recommendedTeams: { min: 2, max: 6 }, places: ["room", "hall", "outdoor"], contexts: ["mt", "orientation", "workshop"], preparations: ["제시어를 볼 진행자 기기"], difficulty: "moderate" },
  "speed-quiz": { people: { min: 6, max: 60 }, recommendedTeams: { min: 2, max: 8 }, places: ["room", "hall", "outdoor"], contexts: ["mt", "orientation", "workshop"], preparations: ["제시어를 볼 진행자 기기"], difficulty: "moderate" },
  "one-mind": { people: { min: 6, max: 50 }, recommendedTeams: { min: 2, max: 6 }, places: ["room", "restaurant", "hall"], contexts: ["mt", "orientation", "workshop", "dinner"], preparations: ["종이와 펜"], difficulty: "easy" },
  "penalty-wheel": { people: { min: 4, max: 60 }, places: ["room", "restaurant", "hall", "bus"], contexts: ["mt", "orientation", "bus", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  "time-bomb": { people: { min: 5, max: 40 }, places: ["room", "restaurant", "hall"], contexts: ["mt", "orientation", "workshop", "dinner"], preparations: ["없음"], difficulty: "moderate" },
  awards: { people: { min: 6, max: 80 }, places: ["room", "restaurant", "hall"], contexts: ["mt", "orientation", "workshop", "dinner"], preparations: ["없음"], difficulty: "easy" },
  "silent-shout": { people: { min: 4, max: 40 }, recommendedTeams: { min: 2, max: 6 }, places: ["room", "hall"], contexts: ["mt", "orientation", "workshop"], preparations: ["음악을 들을 기기", "제시어"], difficulty: "moderate" },
  hunminjeongeum: { people: { min: 4, max: 40 }, recommendedTeams: { min: 2, max: 6 }, places: ["room", "restaurant", "hall"], contexts: ["mt", "orientation", "workshop", "dinner"], preparations: ["제시어"], difficulty: "moderate" },
  "music-quiz-2v2": { people: { min: 4, max: 40 }, recommendedTeams: { min: 2, max: 6 }, places: ["room", "hall"], contexts: ["mt", "orientation", "workshop"], preparations: ["음악 재생 기기", "스피커"], difficulty: "moderate" },
  "snack-quiz": { people: { min: 4, max: 50 }, places: ["room", "restaurant", "hall"], contexts: ["mt", "orientation", "workshop", "dinner"], preparations: ["과자 포장 또는 사진"], difficulty: "easy" },
};
