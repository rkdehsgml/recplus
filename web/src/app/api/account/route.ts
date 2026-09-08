import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(message: string, status: number) {
  return NextResponse.json({ message }, {
    status,
    headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" },
  });
}

export async function DELETE(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return json("요청 출처를 확인할 수 없어요.", 403);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return json("로그인이 필요해요.", 401);

  try {
    const { error: deleteError } = await createSupabaseAdminClient().auth.admin.deleteUser(data.user.id);
    if (deleteError) return json("계정 데이터를 삭제하지 못했어요. 잠시 후 다시 시도해주세요.", 502);
    return json("계정과 서버 데이터를 삭제했어요.", 200);
  } catch {
    return json("계정 삭제 서버 설정을 확인해주세요.", 500);
  }
}
