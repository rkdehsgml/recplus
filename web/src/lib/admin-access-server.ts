import { createSupabaseServerClient } from "@/lib/supabase/server";

/** 서버에서 현재 요청의 인증 쿠키와 RLS 정책을 함께 확인합니다. */
export async function hasServerAdminAccess() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) return false;

    const { data: role, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .maybeSingle();

    return !roleError && role?.role === "admin";
  } catch {
    // 환경변수 또는 인증 확인에 실패한 경우에는 관리자 화면을 열지 않습니다.
    return false;
  }
}
