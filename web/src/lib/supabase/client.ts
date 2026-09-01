import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

/** 브라우저 컴포넌트에서만 호출하는 Supabase 클라이언트입니다. */
export function createSupabaseBrowserClient() {
  const { url, publishableKey } = getSupabaseConfig();

  return createBrowserClient(url, publishableKey);
}
