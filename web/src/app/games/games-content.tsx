"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games } from "@/data/games";
import { deleteCustomGame, loadCustomGames } from "@/lib/custom-games";
import { fitsEventContext, gameContextLabel, gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { archetypeLabels, eventContexts, type EventContext, type GameDefinition } from "@/lib/game-types";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;
const contextFilters: { id: "all" | EventContext; label: string }[] = [
  { id: "all", label: "전체" },
  ...eventContexts.map((context) => ({ id: context, label: gameContextLabel(context) })),
];

export default function GamesContent({ initialContext }: { initialContext: "all" | EventContext }) {
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
  const [context, setContext] = useState<"all" | EventContext>(initialContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCustomGames(loadCustomGames()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const gameList = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...customGames, ...games]
      .filter((game) => fitsEventContext(game, context))
      .filter((game) => !normalizedQuery || [game.name, game.description, archetypeLabels[game.archetype]].join(" ").toLowerCase().includes(normalizedQuery));
  }, [customGames, context, query]);

  function removeGame(game: GameDefinition) {
    if (!window.confirm(`“${game.name}”을 내 게임에서 삭제할까요?`)) return;
    setCustomGames(deleteCustomGame(game.id));
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/"><span>R</span> 레크마스터</Link>
        <div className={styles.headerActions}><Link href="/create">행사 준비</Link><Link className={styles.newButton} href="/games/new">＋ 내 게임</Link></div>
      </header>

      <section className={styles.intro}>
        <p>GAME LIBRARY</p>
        <h1>오늘의 자리에 맞는<br />게임을 찾아보세요.</h1>
        <span>예능에서 검증된 포맷과 현장에서 자주 쓰이는 레크 게임을 모았어요.</span>
      </section>

      <section className={styles.finder} aria-label="게임 찾기">
        <label className={styles.search}><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="게임 이름이나 유형으로 검색" /></label>
        <nav className={styles.filters} aria-label="행사 상황으로 필터링">
          {contextFilters.map((filter) => <button className={context === filter.id ? styles.active : ""} onClick={() => setContext(filter.id)} key={filter.id}>{filter.label}</button>)}
        </nav>
      </section>

      <div className={styles.resultBar}><strong>{context === "all" ? "전체 게임" : `${gameContextLabel(context)}에 추천하는 게임`}</strong><span>{gameList.length}개 찾음</span></div>

      {gameList.length ? (
        <section className={styles.grid}>
          {gameList.map((game) => (
            <article className={styles.card} key={game.id}>
              <Link className={styles.cardLink} href={`/games/${game.id}`}>
                <div className={styles.cardTop}><span className={styles.badge}>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span><b>{game.duration}분</b></div>
                <h2>{game.name}</h2>
                <p>{game.description}</p>
                <div className={styles.meta}><span>{gamePeopleLabel(game)}</span><span>{gameTeamLabel(game)}</span></div>
                {game.profile && <div className={styles.contexts}>{game.profile.contexts.slice(0, 3).map((item) => <i key={item}>{gameContextLabel(item)}</i>)}</div>}
                <strong className={styles.detailLink}>게임 자세히 보기 <span>→</span></strong>
              </Link>
              {game.source === "custom" && <button className={styles.deleteButton} onClick={() => removeGame(game)}>내 게임 삭제</button>}
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.empty}><span>✦</span><h2>조건에 맞는 게임을 찾지 못했어요.</h2><p>다른 상황을 선택하거나 검색어를 지워보세요.</p><button onClick={() => { setContext("all"); setQuery(""); }}>전체 게임 보기</button></section>
      )}
    </main>
  );
}
