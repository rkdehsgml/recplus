"use client";

import { useEffect, useState } from "react";
import { syncItemPacksForCurrentUser } from "./item-pack-store";
import { loadItemPacks, type ItemPacksByGame } from "./item-packs";
import { createSupabaseBrowserClient } from "./supabase/client";

export function useItemPacks() {
  const [packs, setPacks] = useState<ItemPacksByGame>({});

  useEffect(() => {
    let active = true;
    const supabase = createSupabaseBrowserClient();

    async function sync() {
      const local = loadItemPacks();
      if (active) setPacks(local);
      const merged = await syncItemPacksForCurrentUser();
      if (active) setPacks(merged);
    }

    void sync();
    const { data: listener } = supabase.auth.onAuthStateChange(() => void sync());
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { packs, setPacks };
}
