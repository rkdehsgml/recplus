"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AdminSessionGuardProps = {
  children: React.ReactNode;
};

export default function AdminSessionGuard({ children }: AdminSessionGuardProps) {
  const router = useRouter();
  const [sessionActive, setSessionActive] = useState(true);

  const leaveAdmin = useCallback(() => {
    setSessionActive(false);
    router.replace("/");
    router.refresh();
  }, [router]);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    async function confirmAdminSession() {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        if (active) leaveAdmin();
        return;
      }

      const { data: role, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .maybeSingle();

      if ((roleError || role?.role !== "admin") && active) leaveAdmin();
    }

    void confirmAdminSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && active) {
        leaveAdmin();
        return;
      }

      if (session) void confirmAdminSession();
    });

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") void confirmAdminSession();
    }

    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      listener.subscription.unsubscribe();
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [leaveAdmin]);

  if (!sessionActive) {
    return <main aria-live="polite" style={{ minHeight: "70vh" }} />;
  }

  return children;
}
