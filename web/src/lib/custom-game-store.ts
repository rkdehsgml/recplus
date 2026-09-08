import { cacheCustomGames, loadCustomGames } from "./custom-games";
import { databaseGameSelect, gameFromDatabaseRow, type DatabaseGameRow } from "./game-database";
import { gameItemsFor } from "./game-catalog";
import type { GameDefinition } from "./game-types";
import { createSupabaseBrowserClient } from "./supabase/client";

export type CustomGameCloudResult = "saved" | "signed-out" | "failed";

function customGamePayload(game: GameDefinition) {
  return {
    id: game.id,
    name: game.name,
    archetype: game.archetype,
    phase: game.phase,
    duration_minutes: game.duration,
    places: game.places,
    mode: game.mode,
    energy: game.energy,
    description: game.description,
    host_script: game.hostScript,
    rule_steps: game.ruleSteps,
    people_min: game.profile?.people.min ?? 1,
    people_max: game.profile?.people.max ?? null,
    recommended_teams_min: game.profile?.recommendedTeams?.min ?? null,
    recommended_teams_max: game.profile?.recommendedTeams?.max ?? null,
    contexts: game.profile?.contexts ?? [],
    preparations: game.profile?.preparations ?? [],
    difficulty: game.profile?.difficulty ?? "moderate",
    origin: game.origin ?? "original",
    series: game.series ?? [],
  };
}

function customItemsPayload(game: GameDefinition) {
  return gameItemsFor(game).map((item) => ({
    id: item.id,
    kind: item.kind,
    prompt: item.prompt,
    answer: item.answer ?? "",
    hint: item.hint ?? "",
  }));
}

export async function saveCustomGameToCloud(game: GameDefinition): Promise<CustomGameCloudResult> {
  const supabase = createSupabaseBrowserClient();
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data.user) return "signed-out";

  const { error } = await supabase.rpc("save_user_game", {
    p_game: customGamePayload(game),
    p_items: customItemsPayload(game),
  });
  return error ? "failed" : "saved";
}

export async function loadCloudCustomGames(): Promise<GameDefinition[]> {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("games")
    .select(databaseGameSelect)
    .eq("source", "user")
    .order("updated_at", { ascending: false });
  if (error || !data) return [];

  return (data as unknown as DatabaseGameRow[])
    .map(gameFromDatabaseRow)
    .filter((game): game is GameDefinition => Boolean(game))
    .map((game) => ({ ...game, source: "custom" as const }));
}

export async function syncCustomGamesForCurrentUser() {
  const local = loadCustomGames();
  const existingCloud = await loadCloudCustomGames();
  const cloudById = new Map(existingCloud.map((game) => [game.id, game]));
  const unsynced = local.filter((game) => {
    const cloud = cloudById.get(game.id);
    if (!cloud) return true;
    if (cloud.moderationStatus !== "draft" && cloud.moderationStatus !== "rejected") return false;
    return Boolean(game.updatedAt && (!cloud.updatedAt || game.updatedAt > cloud.updatedAt));
  });
  await Promise.all(unsynced.map((game) => saveCustomGameToCloud(game)));
  const cloud = unsynced.length ? await loadCloudCustomGames() : existingCloud;
  const merged = [...new Map([...local, ...cloud].map((game) => [game.id, game])).values()];
  cacheCustomGames(merged);
  return merged;
}

export async function submitCustomGame(gameId: string, submissionNote: string) {
  const { error } = await createSupabaseBrowserClient().rpc("submit_user_game", {
    p_game_id: gameId,
    p_submission_note: submissionNote,
    p_sharing_consent: true,
  });
  return error ? "failed" as const : "submitted" as const;
}

export async function deleteCustomGameFromCloud(gameId: string) {
  const { error } = await createSupabaseBrowserClient()
    .from("games")
    .delete()
    .eq("id", gameId)
    .eq("source", "user");
  return error ? "failed" as const : "deleted" as const;
}
