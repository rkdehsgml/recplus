import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

/**
 * Route Handler처럼 신뢰할 수 있는 서버 코드에서만 사용합니다.
 * 이 키는 절대 NEXT_PUBLIC_ 접두사를 붙이거나 클라이언트 컴포넌트에서 import하면 안 됩니다.
 */
export function createSupabaseAdminClient() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("SUPABASE_SECRET_KEY가 설정되지 않았습니다.");
  }

  const { url } = getSupabaseConfig();

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
