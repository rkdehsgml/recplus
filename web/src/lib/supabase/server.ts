import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

/**
 * 서버 컴포넌트와 Route Handler에서 쓰는 요청 단위 클라이언트입니다.
 * 쿠키를 갱신하는 인증 플로우는 이후 Route Handler/Proxy에서 연결합니다.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, publishableKey } = getSupabaseConfig();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, options, value }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component 렌더링 중에는 쿠키를 쓸 수 없습니다.
          // 인증 세션 갱신은 Route Handler 또는 Proxy에서 처리합니다.
        }
      },
    },
  });
}
