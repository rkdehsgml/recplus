import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !secretKey) {
  throw new Error(".env.local에 Supabase URL과 secret key가 필요합니다.");
}

const admin = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const tables = [
  "profiles",
  "games",
  "game_items",
  "event_plans",
  "event_plan_games",
  "play_sessions",
  "user_game_item_packs",
  "game_favorites",
  "user_consents",
  "user_roles",
  "game_appearances",
  "game_versions",
  "game_submissions",
  "event_plan_command_receipts",
  "event_runs",
  "event_run_games",
  "run_events",
  "run_command_receipts",
  "game_reviews",
  "game_review_revisions",
  "game_review_public_consents",
  "game_review_consent_withdrawals",
  "content_reports",
  "moderation_actions",
  "data_retention_actions",
];

async function countRows(table) {
  const result = await admin
    .from(table)
    .select("*", { count: "exact", head: true });
  const { count, error, status, statusText } = result;
  if (error) {
    // 일부 PostgREST 배포는 HEAD 오류 본문을 비워 둡니다. 0행 GET으로 오류 코드만 보완합니다.
    const fallback =
      error.code || error.message
        ? undefined
        : await admin.from(table).select("*").limit(0);
    const fallbackError = fallback?.error;
    const detail = [
      fallbackError?.code || error.code,
      fallbackError?.message || error.message,
      fallback?.status || status ? `HTTP ${fallback?.status || status}` : undefined,
      fallback?.statusText || statusText,
    ]
      .filter(Boolean)
      .join(" · ");

    return {
      table,
      status: "unavailable",
      detail: detail || error.name || "unknown",
    };
  }
  return { table, status: "available", count: count ?? 0 };
}

const results = await Promise.all(tables.map(countRows));

console.log("Supabase P00 읽기 전용 감사 (데이터 원문·비밀값 미출력)");
for (const result of results) {
  if (result.status === "available") {
    console.log(`${result.table}: ${result.count}`);
  } else {
    console.log(`${result.table}: 접근 불가 (${result.detail})`);
  }
}

console.log("migration/RLS/grant 대조와 백업 복원은 SQL Editor 및 운영 절차에서 별도로 확인해야 합니다.");
