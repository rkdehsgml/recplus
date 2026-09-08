import type { PlaySession } from "./play-session";
import { createSupabaseBrowserClient } from "./supabase/client";

function isCloudPlaySession(value: unknown): value is PlaySession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<PlaySession>;
  return Number.isFinite(session.currentIndex)
    && Number.isFinite(session.secondsLeft)
    && Number.isFinite(session.promptIndex)
    && Array.isArray(session.scores)
    && Array.isArray(session.gameProgress)
    && typeof session.updatedAt === "string";
}

export async function loadCloudPlaySession(eventPlanId: string): Promise<PlaySession | null> {
  const { data, error } = await createSupabaseBrowserClient()
    .from("play_sessions")
    .select("state, updated_at")
    .eq("event_plan_id", eventPlanId)
    .maybeSingle();
  if (error || !data || !isCloudPlaySession(data.state)) return null;
  return { ...data.state, updatedAt: data.updated_at };
}

export async function savePlaySessionToCloud(eventPlanId: string, session: PlaySession) {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return "signed-out" as const;
  const { error } = await supabase.from("play_sessions").upsert({
    event_plan_id: eventPlanId,
    owner_id: data.user.id,
    state: session,
    updated_at: session.updatedAt,
  }, { onConflict: "event_plan_id,owner_id" });
  return error ? "failed" as const : "saved" as const;
}

export async function clearCloudPlaySession(eventPlanId: string) {
  const { error } = await createSupabaseBrowserClient()
    .from("play_sessions")
    .delete()
    .eq("event_plan_id", eventPlanId);
  return error ? "failed" as const : "deleted" as const;
}
