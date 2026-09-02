"use client";

import { useEffect, useState } from "react";
import { games as fallbackGames } from "@/data/games";
import { loadPublishedGames } from "./game-database";
import type { GameDefinition } from "./game-types";

/** DB 전환 중에도 초기 시드가 적용되기 전까지 기존 공식 게임을 안전하게 보여줍니다. */
export function useGameCatalog() {
  const [databaseGames, setDatabaseGames] = useState<GameDefinition[] | null>(null);

  useEffect(() => {
    let active = true;

    void loadPublishedGames().then((games) => {
      if (active && games.length > 0) setDatabaseGames(games);
    });

    return () => {
      active = false;
    };
  }, []);

  return {
    games: databaseGames ?? fallbackGames,
    isDatabaseCatalog: databaseGames !== null,
  };
}
