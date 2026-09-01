import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeNextPath(next: string | null) {
  if (next?.startsWith("/") && !next.startsWith("//")) return next;
  return "/cuesheets";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const response = NextResponse.redirect(new URL(nextPath, requestUrl.origin));
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }
  }

  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set("error", "invalid-link");
  const response = NextResponse.redirect(loginUrl);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
