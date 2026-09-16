import type { EventTeam, RecommendedGame, RecommendationInput } from "@/engine/recommend";
import { places, type Place } from "@/lib/game-types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { cacheCueSheet, loadCueSheets, type SavedCueSheet, type SavedCueSheetGame } from "./cuesheets";
import { eventGroups, type EventGroup, type EventPlanConditionCompletionState } from "./event-plan-contract";
import { gameFromDatabaseRow, type DatabaseGameRow } from "./game-database";

type CloudSaveResult =
  | { status: "synced"; revision: number }
  | { status: "signed-out" }
  | { status: "failed" };

type CloudDeleteResult = "deleted" | "signed-out" | "failed";

type CloudPlanGameRow = {
  allocated_minutes: number | null;
  game_id: string;
  game_snapshot: unknown;
  plan_item_id: string;
  position: number;
};

type CloudPlanRow = {
  archived_at: string | null;
  condition_completion_state: string;
  created_at: string;
  event_constraints: unknown;
  event_group: string | null;
  event_plan_games?: CloudPlanGameRow[] | null;
  event_type: string | null;
  id: string;
  mode: string;
  name: string;
  people: number;
  place: string;
  revision: number;
  target_minutes: number;
  teams: unknown;
  updated_at: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isTeam(value: unknown): value is EventTeam {
  return isRecord(value) && typeof value.id === "string" && typeof value.name === "string";
}

function isRecommendedGame(value: unknown): value is RecommendedGame {
  return isRecord(value)
    && typeof value.id === "string"
    && typeof value.name === "string"
    && typeof value.allocatedDuration === "number"
    && typeof value.reason === "string"
    && (value.playMode === undefined || value.playMode === "team" || value.playMode === "personal");
}

function isConditionCompletionState(value: unknown): value is EventPlanConditionCompletionState {
  return value === "needs_enrichment" || value === "complete";
}

function gameFromSnapshot(row: CloudPlanGameRow, eventMode: RecommendationInput["mode"]): SavedCueSheetGame | null {
  if (isRecommendedGame(row.game_snapshot)) {
    return {
      ...row.game_snapshot,
      allocatedDuration: row.allocated_minutes ?? row.game_snapshot.allocatedDuration,
      planItemId: row.plan_item_id,
    };
  }
  if (!isRecord(row.game_snapshot) || !isRecord(row.game_snapshot.game)) return null;

  const game = row.game_snapshot.game;
  const items = Array.isArray(row.game_snapshot.items)
    ? row.game_snapshot.items.filter(isRecord).map((item) => ({ ...item, game_id: game.id }))
    : [];
  const mapped = gameFromDatabaseRow({
    ...game,
    game_appearances: [],
    game_items: items,
  } as unknown as DatabaseGameRow);
  if (!mapped) return null;

  return {
    ...mapped,
    source: game.source === "user" ? "custom" : "official",
    allocatedDuration: row.allocated_minutes ?? mapped.duration,
    reason: "저장된 행사 플랜에 포함된 게임이에요.",
    playMode: mapped.mode === "personal" || mapped.mode === "team"
      ? mapped.mode
      : eventMode === "personal" ? "personal" : "team",
    planItemId: row.plan_item_id,
  };
}

function cloudRowToCueSheet(row: CloudPlanRow): SavedCueSheet | null {
  if (!places.includes(row.place as Place)) return null;
  if (row.mode !== "team" && row.mode !== "personal" && row.mode !== "both") return null;
  if (!Number.isFinite(row.people) || !Number.isFinite(row.target_minutes)) return null;

  const games = (row.event_plan_games ?? [])
    .sort((left, right) => left.position - right.position)
    .map((game) => gameFromSnapshot(game, row.mode as RecommendationInput["mode"]))
    .filter((game): game is SavedCueSheetGame => Boolean(game));
  const teams = Array.isArray(row.teams) ? row.teams.filter(isTeam) : undefined;
  const input: RecommendationInput = {
    place: row.place as Place,
    people: row.people,
    mode: row.mode,
    targetMinutes: row.target_minutes,
    ...(teams?.length ? { teams } : {}),
  };

  return {
    ...input,
    id: row.id,
    name: row.name,
    games,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cloudRevision: row.revision,
    ...(eventGroups.includes(row.event_group as EventGroup) ? { eventGroup: row.event_group as EventGroup } : {}),
    ...(row.event_type ? { eventType: row.event_type } : {}),
    ...(Array.isArray(row.event_constraints)
      ? { eventConstraints: row.event_constraints.filter((item): item is string => typeof item === "string") }
      : {}),
    ...(isConditionCompletionState(row.condition_completion_state)
      ? { conditionCompletionState: row.condition_completion_state }
      : {}),
  };
}

function planQuery() {
  return createSupabaseBrowserClient()
    .from("event_plans")
    .select("id, name, place, people, mode, target_minutes, teams, revision, event_group, event_type, event_constraints, condition_completion_state, archived_at, created_at, updated_at, event_plan_games(plan_item_id, game_id, position, allocated_minutes, game_snapshot)")
    .is("archived_at", null);
}

/** 로그인 계정에 저장된 행사 플랜을 가져옵니다. RLS가 다른 사용자의 행을 자동으로 제외합니다. */
export async function loadCloudCueSheets(): Promise<SavedCueSheet[]> {
  const { data, error } = await planQuery().order("updated_at", { ascending: false });
  if (error || !data) return [];

  return (data as unknown as CloudPlanRow[])
    .map(cloudRowToCueSheet)
    .filter((cue): cue is SavedCueSheet => Boolean(cue));
}

export async function loadCloudCueSheet(id: string): Promise<SavedCueSheet | null> {
  const { data, error } = await planQuery().eq("id", id).maybeSingle();
  if (error || !data) return null;

  return cloudRowToCueSheet(data as unknown as CloudPlanRow);
}

/** 이 기기에 저장한 큐시트를 로그인 계정에도 복제합니다. */
export async function saveCueSheetToCloud(cue: SavedCueSheet): Promise<CloudSaveResult> {
  const supabase = createSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;
  if (userError || !user) return { status: "signed-out" };

  const { data, error } = await supabase.rpc("save_event_plan", {
    p_plan: {
      id: cue.id,
      name: cue.name,
      place: cue.place,
      people: cue.people,
      mode: cue.mode,
      target_minutes: cue.targetMinutes,
      teams: cue.teams ?? [],
      ...(cue.eventGroup ? { event_group: cue.eventGroup } : {}),
      ...(cue.eventType ? { event_type: cue.eventType } : {}),
      ...(cue.eventConstraints ? { event_constraints: cue.eventConstraints } : {}),
      games: cue.games.map((game) => ({
        plan_item_id: game.planItemId,
        game_id: game.id,
        allocated_minutes: game.allocatedDuration,
      })),
    },
    p_expected_revision: cue.cloudRevision ?? null,
    p_request_id: window.crypto.randomUUID(),
  });

  if (error || !isRecord(data) || !Number.isInteger(data.revision)) return { status: "failed" };
  return { status: "synced", revision: data.revision as number };
}

/** 로그인 직전에 기기에만 저장된 플랜도 계정으로 안전하게 옮깁니다. */
export async function syncLocalCueSheetsToCloud(existingCloud?: SavedCueSheet[]) {
  const currentCloud = existingCloud ?? await loadCloudCueSheets();
  const local = loadCueSheets();
  const cloudById = new Map(currentCloud.map((cue) => [cue.id, cue]));
  const needsUpload = local.filter((cue) => {
    const cloud = cloudById.get(cue.id);
    return !cloud || cue.updatedAt > cloud.updatedAt;
  });
  const results = await Promise.all(needsUpload.map(async (cue) => {
    const cloud = cloudById.get(cue.id);
    const cloudGamesById = new Map<string, SavedCueSheetGame[]>();
    cloud?.games.forEach((game) => {
      const matches = cloudGamesById.get(game.id) ?? [];
      matches.push(game);
      cloudGamesById.set(game.id, matches);
    });
    const candidate = cloud ? {
      ...cue,
      cloudRevision: cloud.cloudRevision,
      games: cue.games.map((game) => {
        const match = cloudGamesById.get(game.id)?.shift();
        return match ? { ...game, planItemId: match.planItemId } : game;
      }),
    } : cue;
    const result = await saveCueSheetToCloud(candidate);
    if (result.status === "synced") cacheCueSheet({ ...candidate, cloudRevision: result.revision });
    return result;
  }));
  return results.every((result) => result.status === "synced");
}

export async function deleteCueSheetFromCloud(cue: SavedCueSheet): Promise<CloudDeleteResult> {
  const supabase = createSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "signed-out";

  const current = await supabase
    .from("event_plans")
    .select("revision")
    .eq("id", cue.id)
    .is("archived_at", null)
    .maybeSingle();
  if (current.error) return "failed";
  if (!current.data) return "deleted";

  const { error } = await supabase.rpc("archive_event_plan", {
    p_event_plan_id: cue.id,
    p_expected_revision: cue.cloudRevision ?? current.data.revision,
    p_request_id: window.crypto.randomUUID(),
  });
  return error ? "failed" : "deleted";
}

export function mergeCueSheets(cloud: SavedCueSheet[], local: SavedCueSheet[]) {
  const byId = new Map<string, SavedCueSheet>();
  cloud.forEach((cue) => byId.set(cue.id, cue));
  local.forEach((cue) => {
    if (!byId.has(cue.id)) byId.set(cue.id, cue);
  });

  return [...byId.values()].sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}
