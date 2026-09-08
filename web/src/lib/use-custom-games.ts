"use client";

import { useEffect, useState } from "react";
import { loadCustomGames } from "./custom-games";
import { syncCustomGamesForCurrentUser } from "./custom-game-store";
import type { GameDefinition } from "./game-types";
import { createSupabaseBrowserClient } from "./supabase/client";

export function useCustomGames() {
  const [games, setGames] = useState<GameDefinition[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = createSupabaseBrowserClient();

    async function sync() {
      const local = loadCustomGames();
      if (active) setGames(local);
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        if (active) setLoaded(true);
        return;
      }
      const merged = await syncCustomGamesForCurrentUser();
      if (active) {
        setGames(merged);
        setLoaded(true);
      }
    }

    void sync();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        if (active) setGames(loadCustomGames());
        if (active) setLoaded(true);
        return;
      }
      void sync();
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { games, loaded, setGames };
}
