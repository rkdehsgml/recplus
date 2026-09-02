import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type AdminAccess =
  | { status: "signed-out" }
  | { status: "not-admin"; userId: string }
  | { status: "admin"; userId: string };

/** RLS로 보호된 user_roles에서 현재 사용자의 관리자 권한만 확인합니다. */
export async function getAdminAccess(): Promise<AdminAccess> {
  const supabase = createSupabaseBrowserClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user;

  if (userError || !user) return { status: "signed-out" };

  const { data: role } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return role?.role === "admin" ? { status: "admin", userId: user.id } : { status: "not-admin", userId: user.id };
}
