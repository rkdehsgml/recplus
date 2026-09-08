import type { EventTeam, RecommendedGame, RecommendationInput } from "@/engine/recommend";
import { places, type Place } from "@/lib/game-types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { loadCueSheets, type SavedCueSheet } from "./cuesheets";

type CloudSaveResult =
  | { status: "synced" }
  | { status: "signed-out" }
  | { status: "failed" };

type CloudDeleteResult = "deleted" | "signed-out" | "failed";

type CloudPlanGameRow = {
  game_snapshot: unknown;
  position: number;
};

type CloudPlanRow = {
  created_at: string;
  event_plan_games?: CloudPlanGameRow[] | null;
  id: string;
  mode: string;
  name: string;
  people: number;
  place: string;
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

function cloudRowToCueSheet(row: CloudPlanRow): SavedCueSheet | null {
  if (!places.includes(row.place as Place)) return null;
  if (row.mode !== "team" && row.mode !== "personal" && row.mode !== "both") return null;
  if (!Number.isFinite(row.people) || !Number.isFinite(row.target_minutes)) return null;

  const games = (row.event_plan_games ?? [])
    .sort((left, right) => left.position - right.position)
    .map((game) => game.game_snapshot)
    .filter(isRecommendedGame);
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
  };
}

function planQuery() {
  return createSupabaseBrowserClient()
    .from("event_plans")
    .select("id, name, place, people, mode, target_minutes, teams, created_at, updated_at, event_plan_games(position, game_snapshot)");
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

  const { error } = await supabase.rpc("save_event_plan", {
    p_plan: {
      id: cue.id,
      name: cue.name,
      place: cue.place,
      people: cue.people,
      mode: cue.mode,
      target_minutes: cue.targetMinutes,
      teams: cue.teams ?? [],
      games: cue.games.map((game) => ({
        snapshot: game,
        allocated_minutes: game.allocatedDuration,
      })),
    },
  });

  return error ? { status: "failed" } : { status: "synced" };
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
  const results = await Promise.all(needsUpload.map((cue) => saveCueSheetToCloud(cue)));
  return results.every((result) => result.status === "synced");
}

export async function deleteCueSheetFromCloud(id: string): Promise<CloudDeleteResult> {
  const supabase = createSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return "signed-out";

  const { error } = await supabase.from("event_plans").delete().eq("id", id);
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
