export const archetypes = ["QUIZ", "TALK", "SURVIVAL", "PERFORM", "PICK", "BOMB"] as const;
export const phases = ["opening", "icebreak", "main", "finale"] as const;
export const places = ["room", "restaurant", "hall", "bus", "outdoor"] as const;
export const eventContexts = ["mt", "orientation", "bus", "workshop", "dinner"] as const;
export const gameOrigins = ["variety", "classic", "original"] as const;
export const gameSeries = ["new-journey", "earth-arcade"] as const;

export type Archetype = (typeof archetypes)[number];
export type Phase = (typeof phases)[number];
export type Place = (typeof places)[number];
export type PlayMode = "team" | "personal" | "both";
export type GameItemKind = "prompt" | "quiz" | "host-only";
export type EventContext = (typeof eventContexts)[number];
export type GameDifficulty = "easy" | "moderate" | "advanced";
export type GameOrigin = (typeof gameOrigins)[number];
export type GameSeries = (typeof gameSeries)[number];

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
  ruleSteps: string[];
  /** 게임의 출발점. 예전 localStorage 데이터에는 없을 수 있습니다. */
  origin?: GameOrigin;
  /** 방송 프로그램에서 확인한 게임 포맷. 하나의 게임이 여러 컬렉션에 속할 수 있습니다. */
  series?: GameSeries[];
  profile?: GameProfile;
  /** DB 또는 임시 시드에서 결합된 콘텐츠 풀 */
  items?: GameItem[];
  /** 이전 localStorage 데이터 호환용. 새 데이터에는 사용하지 않습니다. */
  prompts?: string[];
  source: "official" | "custom";
  createdAt?: string;
  updatedAt?: string;
  moderationStatus?: "archived" | "draft" | "pending_review" | "published" | "rejected";
  reviewNote?: string;
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

export const gameOriginLabels: Record<GameOrigin, string> = {
  variety: "예능 포맷",
  classic: "고전 레크",
  original: "새로운 변형",
};

export const gameOriginDescriptions: Record<GameOrigin, string> = {
  variety: "익숙한 예능 포맷을 현장에 맞게 꺼내 쓸 수 있어요.",
  classic: "세대와 장소를 가리지 않는 기본 레크 게임이에요.",
  original: "운영자가 새롭게 만든 방식으로 분위기를 바꿔보세요.",
};

export const gameSeriesLabels: Record<GameSeries, string> = {
  "new-journey": "신서유기",
  "earth-arcade": "뿅뿅 지구오락실",
};

export const gameSeriesDescriptions: Record<GameSeries, string> = {
  "new-journey": "미션의 긴장감과 말맛이 살아 있는 신서유기 게임들",
  "earth-arcade": "빠른 템포와 승부욕을 끌어올리는 지구오락실 게임들",
};

/**
 * 이전에 저장된 로컬 게임과 origin 컬럼 도입 전 DB 행도 안전하게 읽습니다.
 * 사용자가 직접 만든 게임은 별도 분류가 없으면 새 변형으로 보여줍니다.
 */
export function gameOriginFor(game: Pick<GameDefinition, "origin" | "source">): GameOrigin {
  return game.origin && gameOrigins.includes(game.origin)
    ? game.origin
    : game.source === "custom" ? "original" : "classic";
}

/** DB·localStorage에서 오래되거나 알 수 없는 프로그램 값이 와도 안전하게 무시합니다. */
export function gameSeriesFor(game: Pick<GameDefinition, "series">): GameSeries[] {
  if (!Array.isArray(game.series)) return [];
  return game.series.filter((series): series is GameSeries => gameSeries.includes(series));
}
