"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { recommendGames, type RecommendationInput } from "@/engine/recommend";
import { places, type Place } from "@/lib/game-types";
import { useGameCatalog } from "@/lib/use-game-catalog";
import { useCustomGames } from "@/lib/use-custom-games";
import type { EventTeam } from "@/engine/recommend";
import EditableCue from "./editable-cue";
import styles from "./page.module.css";

function validPlace(value: string | null): Place {
  return places.includes(value as Place) ? value as Place : "room";
}

function teamsFromParam(value: string | null): EventTeam[] | undefined {
  if (!value) return undefined;

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    const teams = parsed
      .filter((team): team is EventTeam => Boolean(team) && typeof team === "object" && typeof (team as EventTeam).id === "string" && typeof (team as EventTeam).name === "string")
      .slice(0, 12);
    return teams.length ? teams : undefined;
  } catch {
    return undefined;
  }
}

export default function ResultContent() {
  const params = useSearchParams();
  const { games: catalog } = useGameCatalog();
  const { games: customGames } = useCustomGames();
  const place = validPlace(params.get("place"));
  const peopleParam = params.get("people");
  const peopleValue = Number(peopleParam);
  const people = peopleParam === null || peopleParam === "" || !Number.isFinite(peopleValue) ? 20 : Math.max(0, peopleValue);
  const mode = params.get("mode") === "personal" ? "personal" : params.get("mode") === "both" ? "both" : "team";
  const targetMinutes = Number(params.get("time")) || 90;
  const teams = mode !== "personal" ? teamsFromParam(params.get("teams")) : undefined;

  const input = useMemo<RecommendationInput>(() => ({ place, people, mode, targetMinutes, ...(teams ? { teams } : {}) }), [mode, people, place, targetMinutes, teams]);
  const games = useMemo(() => [...new Map([...catalog, ...customGames].map((game) => [game.id, game])).values()], [catalog, customGames]);
  const cue = useMemo(() => recommendGames(games, input), [games, input]);
  const cueKey = cue.map((game) => `${game.id}:${game.allocatedDuration}`).join("|");

  return (
    <main className={styles.page}>
      <div className={styles.contextAction}><Link href="/create">← 조건 수정</Link></div>
      <EditableCue key={cueKey} initialCue={cue} input={input} games={games} />
    </main>
  );
}
