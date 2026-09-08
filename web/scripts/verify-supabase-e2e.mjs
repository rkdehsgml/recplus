import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !publishableKey || !secretKey) {
  throw new Error(".env.local에 Supabase URL, publishable key, secret key가 모두 필요합니다.");
}

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const anonymous = createClient(url, publishableKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const suffix = Date.now().toString(36);
const email = `recplus-e2e-${suffix}@example.invalid`;
const password = `RecPlus!${randomUUID()}Aa1`;
const planId = randomUUID();
const gameId = `e2e-${suffix}`;
const officialGameId = `e2e-official-${suffix}`;
let userId;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function requireNoError(error, step) {
  if (error) throw new Error(`${step}: ${error.message}`);
}

async function run() {
  console.log("1/8 테스트 계정 생성");
  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  requireNoError(created.error, "테스트 계정 생성 실패");
  userId = created.data.user?.id;
  assert(userId, "테스트 사용자 ID를 받지 못했습니다.");

  const user = createClient(url, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const signedIn = await user.auth.signInWithPassword({ email, password });
  requireNoError(signedIn.error, "테스트 계정 로그인 실패");

  console.log("2/8 행사 플랜 원자 저장과 조회");
  const plan = await user.rpc("save_event_plan", {
    p_plan: {
      id: planId,
      name: "E2E 행사",
      place: "room",
      people: 12,
      mode: "both",
      target_minutes: 30,
      teams: [{ id: "team-a", name: "A팀" }],
      games: [{
        snapshot: {
          id: gameId,
          name: "E2E 게임",
          reason: "저장 검증",
          playMode: "personal",
          allocatedDuration: 10,
        },
        allocated_minutes: 10,
      }],
    },
  });
  requireNoError(plan.error, "행사 플랜 저장 실패");
  const storedPlan = await user
    .from("event_plans")
    .select("id, mode, event_plan_games(position, game_snapshot)")
    .eq("id", planId)
    .single();
  requireNoError(storedPlan.error, "행사 플랜 조회 실패");
  assert(storedPlan.data.mode === "both", "혼합 모드가 보존되지 않았습니다.");
  assert(storedPlan.data.event_plan_games?.length === 1, "게임 스냅샷이 저장되지 않았습니다.");

  console.log("3/8 사용자 게임과 문항 원자 저장");
  const gamePayload = {
    id: gameId,
    name: "E2E 사용자 게임",
    archetype: "QUIZ",
    phase: "main",
    duration_minutes: 10,
    places: ["room"],
    mode: "personal",
    energy: 3,
    description: "사용자 게임 저장과 검수 흐름을 확인합니다.",
    host_script: "문제를 읽어주세요.",
    rule_steps: ["문제를 읽습니다.", "정답을 확인합니다."],
    people_min: 2,
    people_max: 20,
    recommended_teams_min: null,
    recommended_teams_max: null,
    contexts: ["mt"],
    preparations: ["없음"],
    difficulty: "easy",
    origin: "original",
    series: [],
  };
  const items = [{ id: `${gameId}-1`, kind: "quiz", prompt: "대한민국의 수도는?", answer: "서울", hint: "두 글자" }];
  const savedGame = await user.rpc("save_user_game", { p_game: gamePayload, p_items: items });
  requireNoError(savedGame.error, "사용자 게임 저장 실패");
  const storedGame = await user
    .from("games")
    .select("id, moderation_status, game_items(id, prompt)")
    .eq("id", gameId)
    .single();
  requireNoError(storedGame.error, "사용자 게임 조회 실패");
  assert(storedGame.data.moderation_status === "draft", "사용자 게임이 초안으로 저장되지 않았습니다.");
  assert(storedGame.data.game_items?.length === 1, "사용자 게임 문항이 저장되지 않았습니다.");

  console.log("4/8 아이템 팩과 진행 세션 저장");
  const itemPack = await user.from("user_game_item_packs").upsert({
    user_id: userId,
    game_id: gameId,
    items: [{ id: `${gameId}-extra`, kind: "prompt", prompt: "추가 문제" }],
  });
  requireNoError(itemPack.error, "아이템 팩 저장 실패");
  const session = await user.from("play_sessions").upsert({
    event_plan_id: planId,
    owner_id: userId,
    state: { cueSheetId: planId, currentIndex: 0, status: "ready" },
  });
  requireNoError(session.error, "진행 세션 저장 실패");

  console.log("5/8 동의 필수, 제출, 제출 후 수정 잠금");
  const withoutConsent = await user.rpc("submit_user_game", {
    p_game_id: gameId,
    p_submission_note: "검수 요청",
    p_sharing_consent: false,
  });
  assert(Boolean(withoutConsent.error), "공유 동의 없이 제출이 허용되었습니다.");
  const submitted = await user.rpc("submit_user_game", {
    p_game_id: gameId,
    p_submission_note: "검수 요청",
    p_sharing_consent: true,
  });
  requireNoError(submitted.error, "사용자 게임 제출 실패");
  const lockedUpdate = await user.from("games").update({ name: "수정되면 안 됨" }).eq("id", gameId).select("id");
  requireNoError(lockedUpdate.error, "제출 후 수정 잠금 확인 실패");
  assert(lockedUpdate.data?.length === 0, "검수 대기 중인 게임을 작성자가 수정했습니다.");

  console.log("6/8 관리자 반려, 재제출, 승인");
  const role = await admin.from("user_roles").insert({ user_id: userId, role: "admin" });
  requireNoError(role.error, "테스트 관리자 권한 생성 실패");
  const official = await user.rpc("save_admin_game", {
    p_game: {
      ...gamePayload,
      id: officialGameId,
      name: "E2E 공식 게임",
    },
    p_items: [{ kind: "prompt", prompt: "공식 게임 문항" }],
    p_publish: true,
  });
  requireNoError(official.error, "공식 게임 저장·공개 실패");
  const publicOfficial = await anonymous.from("games").select("id").eq("id", officialGameId).maybeSingle();
  requireNoError(publicOfficial.error, "공식 게임 공개 조회 실패");
  assert(publicOfficial.data?.id === officialGameId, "공식 게임이 공개 조회되지 않습니다.");
  const rejected = await user.rpc("review_user_game", {
    p_game_id: gameId,
    p_decision: "rejected",
    p_review_note: "E2E 반려 사유",
  });
  requireNoError(rejected.error, "사용자 게임 반려 실패");
  const revised = await user.rpc("save_user_game", {
    p_game: { ...gamePayload, description: "반려 사유를 반영한 설명입니다." },
    p_items: items,
  });
  requireNoError(revised.error, "반려 게임 수정 실패");
  const resubmitted = await user.rpc("submit_user_game", {
    p_game_id: gameId,
    p_submission_note: "반려 사유 반영",
    p_sharing_consent: true,
  });
  requireNoError(resubmitted.error, "사용자 게임 재제출 실패");
  const published = await user.rpc("review_user_game", {
    p_game_id: gameId,
    p_decision: "published",
    p_review_note: "E2E 승인",
  });
  requireNoError(published.error, "사용자 게임 승인 실패");
  const publicGame = await anonymous.from("games").select("id").eq("id", gameId).maybeSingle();
  requireNoError(publicGame.error, "공개 게임 조회 실패");
  assert(publicGame.data?.id === gameId, "승인된 게임이 공개 조회되지 않습니다.");

  console.log("7/8 보관, 공개 제외, 삭제");
  const archived = await user
    .from("games")
    .update({ moderation_status: "archived", visibility: "private" })
    .eq("id", gameId)
    .select("id")
    .single();
  requireNoError(archived.error, "게임 보관 실패");
  const hiddenGame = await anonymous.from("games").select("id").eq("id", gameId).maybeSingle();
  requireNoError(hiddenGame.error, "보관 게임 공개 제외 확인 실패");
  assert(hiddenGame.data === null, "보관된 게임이 공개 조회됩니다.");
  const deletedGame = await user.from("games").delete().eq("id", gameId);
  requireNoError(deletedGame.error, "게임 삭제 실패");
  const deletedOfficial = await user.from("games").delete().eq("id", officialGameId);
  requireNoError(deletedOfficial.error, "공식 게임 삭제 실패");

  console.log("8/8 계정 삭제와 소유 데이터 연쇄 삭제");
  const deletedUser = await admin.auth.admin.deleteUser(userId);
  requireNoError(deletedUser.error, "테스트 계정 삭제 실패");
  userId = undefined;
  const leftovers = await Promise.all([
    admin.from("event_plans").select("id", { count: "exact", head: true }).eq("id", planId),
    admin.from("play_sessions").select("event_plan_id", { count: "exact", head: true }).eq("event_plan_id", planId),
    admin.from("user_game_item_packs").select("game_id", { count: "exact", head: true }).eq("game_id", gameId),
  ]);
  leftovers.forEach((result) => requireNoError(result.error, "연쇄 삭제 확인 실패"));
  assert(leftovers.every((result) => result.count === 0), "계정 소유 데이터가 남아 있습니다.");
  console.log("Supabase E2E 검증을 모두 통과했습니다.");
}

try {
  await run();
} finally {
  if (userId) await admin.auth.admin.deleteUser(userId);
}
