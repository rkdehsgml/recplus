import { cacheItemPacks, loadItemPacks, type ItemPacksByGame } from "./item-packs";
import type { GameItem } from "./game-types";
import { createSupabaseBrowserClient } from "./supabase/client";

function validItem(value: unknown): value is GameItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<GameItem>;
  return typeof item.id === "string"
    && typeof item.gameId === "string"
    && typeof item.prompt === "string"
    && (item.kind === "prompt" || item.kind === "quiz" || item.kind === "host-only");
}

export async function loadCloudItemPacks(): Promise<ItemPacksByGame> {
  const { data, error } = await createSupabaseBrowserClient()
    .from("user_game_item_packs")
    .select("game_id, items");
  if (error || !data) return {};

  return Object.fromEntries(data.map((row) => [
    row.game_id,
    Array.isArray(row.items) ? row.items.filter(validItem) : [],
  ]));
}

export async function syncItemPacksForCurrentUser() {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return loadItemPacks();

  const local = loadItemPacks();
  const existingCloud = await loadCloudItemPacks();
  const rows = Object.entries(local).filter(([gameId]) => !(gameId in existingCloud)).map(([gameId, items]) => ({
    user_id: data.user!.id,
    game_id: gameId,
    items,
  }));
  if (rows.length) await supabase.from("user_game_item_packs").upsert(rows, { onConflict: "user_id,game_id" });

  const cloud = rows.length ? await loadCloudItemPacks() : existingCloud;
  const merged = { ...local, ...cloud };
  cacheItemPacks(merged);
  return merged;
}

export async function saveItemPackToCloud(gameId: string, items: GameItem[]) {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return "signed-out" as const;
  const { error } = await supabase.from("user_game_item_packs").upsert({
    user_id: data.user.id,
    game_id: gameId,
    items,
  }, { onConflict: "user_id,game_id" });
  return error ? "failed" as const : "saved" as const;
}
