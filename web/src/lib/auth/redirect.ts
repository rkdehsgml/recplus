const AUTH_CALLBACK_PATH = "/auth/callback";

/**
 * Returns the callback URL for every Supabase authentication flow.
 *
 * Keep this based on the currently open site: the same build can then be used
 * locally and on the production domain, while Supabase URL Configuration
 * controls which origins are permitted.
 */
export function getAuthCallbackUrl(origin: string, nextPath?: string) {
  const callbackUrl = new URL(AUTH_CALLBACK_PATH, origin);

  if (nextPath?.startsWith("/") && !nextPath.startsWith("//")) {
    callbackUrl.searchParams.set("next", nextPath);
  }

  return callbackUrl.toString();
}
