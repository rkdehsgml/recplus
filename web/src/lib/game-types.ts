export const archetypes = ["QUIZ", "TALK", "SURVIVAL", "PERFORM", "PICK", "BOMB"] as const;
export const phases = ["opening", "icebreak", "main", "finale"] as const;
export const places = ["room", "restaurant", "hall", "bus", "outdoor"] as const;
export const eventContexts = ["mt", "orientation", "bus", "workshop", "dinner"] as const;

export type Archetype = (typeof archetypes)[number];
export type Phase = (typeof phases)[number];
export type Place = (typeof places)[number];
export type PlayMode = "team" | "personal" | "both";
export type GameItemKind = "prompt" | "quiz" | "host-only";
export type EventContext = (typeof eventContexts)[number];
export type GameDifficulty = "easy" | "moderate" | "advanced";

/**
 * 게임 상세와 추천 필터에 쓰는 현장 운영 정보입니다.
 * DB에서는 games 테이블의 운영 메타데이터로 저장할 값입니다.
 */
export type GameProfile = {
  people: { min: number; max?: number };
  recommendedTeams?: { min: number; max: number };
  places: Place[];
  contexts: EventContext[];
  preparations: string[];
  difficulty: GameDifficulty;
};

/**
 * `game_items` 테이블에 그대로 매핑할 콘텐츠 레코드입니다.
 * 게임 메타데이터와 문제 풀은 DB 연동 시 별도로 조회한 뒤 결합합니다.
 */
export type GameItem = {
  id: string;
  gameId: string;
  kind: GameItemKind;
  prompt: string;
  answer?: string;
  hint?: string;
};

export type GameDefinition = {
  id: string;
  name: string;
  archetype: Archetype;
  phase: Phase;
  duration: number;
  places: Place[];
  mode: PlayMode;
  energy: 1 | 2 | 3 | 4 | 5;
  description: string;
  hostScript: string;
  ruleSteps: [string, string, string];
  profile?: GameProfile;
  /** DB 또는 임시 시드에서 결합된 콘텐츠 풀 */
  items?: GameItem[];
  /** 이전 localStorage 데이터 호환용. 새 데이터에는 사용하지 않습니다. */
  prompts?: string[];
  source: "official" | "custom";
  createdAt?: string;
};

export const archetypeLabels: Record<Archetype, string> = {
  QUIZ: "퀴즈형",
  TALK: "토크형",
  SURVIVAL: "서바이벌형",
  PERFORM: "퍼포먼스형",
  PICK: "룰렛·추첨형",
  BOMB: "폭탄·긴장형",
};

export const phaseLabels: Record<Phase, string> = {
  opening: "오프닝",
  icebreak: "아이스브레이킹",
  main: "메인",
  finale: "피날레",
};

export const placeLabels: Record<Place, string> = {
  room: "과방·강의실",
  restaurant: "술집·식당",
  hall: "강당·대형 공간",
  bus: "버스 이동",
  outdoor: "야외",
};

export const eventContextLabels: Record<EventContext, string> = {
  mt: "MT·친구 모임",
  orientation: "새터·OT",
  bus: "버스 이동",
  workshop: "워크숍",
  dinner: "회식",
};

export const difficultyLabels: Record<GameDifficulty, string> = {
  easy: "진행 쉬움",
  moderate: "보통",
  advanced: "진행 숙련 필요",
};
