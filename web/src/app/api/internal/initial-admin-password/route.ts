import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { validatePassword } from "@/lib/auth/password-policy";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

function response(message: string, status: number) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function isAllowedLocalRequest(request: Request) {
  if (process.env.NODE_ENV !== "development") return false;

  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const url = new URL(origin);
    return url.protocol === "http:" && LOCAL_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function hasMatchingToken(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function isExpired(expiresAt: string | undefined) {
  if (!expiresAt) return true;

  const timestamp = Date.parse(expiresAt);
  return Number.isNaN(timestamp) || timestamp <= Date.now();
}

export async function POST(request: Request) {
  if (!isAllowedLocalRequest(request)) {
    return response("이 기능은 로컬 개발 환경에서만 사용할 수 있어요.", 404);
  }

  if (process.env.RECPLUS_INITIAL_PASSWORD_SETUP_ENABLED !== "true") {
    return response("초기 비밀번호 설정이 꺼져 있어요.", 403);
  }

  const setupToken = process.env.RECPLUS_INITIAL_PASSWORD_SETUP_TOKEN;
  if (!setupToken || isExpired(process.env.RECPLUS_INITIAL_PASSWORD_SETUP_EXPIRES_AT)) {
    return response("초기 비밀번호 설정 코드가 없거나 만료되었어요.", 403);
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return response("요청 형식이 올바르지 않아요.", 400);
  }

  if (
    !input ||
    typeof input !== "object" ||
    typeof (input as { password?: unknown }).password !== "string" ||
    typeof (input as { setupToken?: unknown }).setupToken !== "string"
  ) {
    return response("비밀번호와 설정 코드를 확인해주세요.", 400);
  }

  const { password, setupToken: receivedToken } = input as { password: string; setupToken: string };
  const passwordError = validatePassword(password);
  if (passwordError) return response(passwordError, 400);

  if (!hasMatchingToken(receivedToken, setupToken)) {
    return response("설정 코드가 맞지 않아요.", 401);
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { data: administrators, error: roleError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .limit(2);

    if (roleError) {
      return response("서버가 user_roles를 읽지 못했어요. SUPABASE_SECRET_KEY에 sb_secret_로 시작하는 Secret key가 들어 있는지 확인해주세요.", 500);
    }

    if (!administrators || administrators.length === 0) {
      return response("관리자 권한을 가진 계정을 찾지 못했어요.", 409);
    }

    if (administrators.length > 1) {
      return response("관리자 계정이 둘 이상이라 초기 비밀번호 설정을 중단했어요.", 409);
    }

    const administratorId = administrators[0].user_id;
    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(administratorId);

    if (userError || !userData.user) {
      return response("관리자 계정을 찾지 못했어요.", 404);
    }

    if (userData.user.app_metadata.recplus_initial_password_set_at) {
      return response("이 관리자 계정의 초기 비밀번호는 이미 설정되었어요.", 409);
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(administratorId, {
      password,
      email_confirm: true,
      app_metadata: {
        ...userData.user.app_metadata,
        recplus_initial_password_set_at: new Date().toISOString(),
      },
    });

    if (updateError) {
      return response("비밀번호를 설정하지 못했어요. 잠시 후 다시 시도해주세요.", 502);
    }
  } catch {
    return response("서버 설정을 확인하지 못했어요.", 500);
  }

  return response("비밀번호를 설정했어요. 이제 이메일과 비밀번호로 로그인할 수 있어요.", 200);
}
