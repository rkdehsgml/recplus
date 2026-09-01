"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { games } from "@/data/games";
import { recommendGames, type RecommendationInput } from "@/engine/recommend";
import { loadCustomGames } from "@/lib/custom-games";
import { places, type GameDefinition, type Place } from "@/lib/game-types";
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
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
  const place = validPlace(params.get("place"));
  const people = Number(params.get("people")) || 20;
  const mode = params.get("mode") === "personal" ? "personal" : "team";
  const targetMinutes = Number(params.get("time")) || 90;
  const teams = mode === "team" ? teamsFromParam(params.get("teams")) : undefined;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCustomGames(loadCustomGames()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const input = useMemo<RecommendationInput>(() => ({ place, people, mode, targetMinutes, ...(teams ? { teams } : {}) }), [mode, people, place, targetMinutes, teams]);
  const cue = useMemo(() => recommendGames([...customGames, ...games], input), [customGames, input]);
  const cueKey = cue.map((game) => `${game.id}:${game.allocatedDuration}`).join("|");

  return (
    <main className={styles.page}>
      <div className={styles.contextAction}><Link href="/create">← 조건 수정</Link></div>
      <EditableCue key={cueKey} initialCue={cue} input={input} />
    </main>
  );
}
