/** P04 이후 DB 플랜과 P17 입력 화면이 공유할 행사 조건 계약입니다. */
export const eventGroups = ["school", "university", "company", "private_or_other"] as const;
export const eventPlanPlaces = ["room", "restaurant", "hall", "bus", "outdoor", "other"] as const;

export type EventGroup = (typeof eventGroups)[number];
export type EventPlanPlace = (typeof eventPlanPlaces)[number];
export type EventPlanConditionCompletionState = "needs_enrichment" | "complete";
export type EventPlanItemVersionResolutionState = "needs_version_resolution" | "resolved";

/**
 * null은 기존 플랜에서 수집하지 않은 값이며, 빈 배열은 사용자가 제약이 없다고 명시한 값입니다.
 * P17은 complete 상태를 저장하기 전에 필수 축과 제약 배열을 모두 채워야 합니다.
 */
export type EventPlanConditions = {
  eventGroup: EventGroup | null;
  eventType: string | null;
  eventConstraints: string[] | null;
  completionState: EventPlanConditionCompletionState;
};

/** 플랜 항목의 UUID는 position 변경에도 유지됩니다. */
export type EventPlanItemVersionReference = {
  planItemId: string;
  gameId: string | null;
  gameVersionId: string | null;
  versionResolutionState: EventPlanItemVersionResolutionState;
};
