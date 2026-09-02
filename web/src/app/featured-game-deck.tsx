"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { gamePaletteFor } from "@/lib/game-palette";
import type { GameDefinition } from "@/lib/game-types";
import styles from "./page.module.css";

const deckIcons = ["💬", "🧠", "🎭", "⚡"];

type FeaturedGameDeckProps = {
  games: GameDefinition[];
};

export function FeaturedGameDeck({ games }: FeaturedGameDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const gameCount = games.length;

  useEffect(() => {
    if (gameCount < 2 || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % gameCount);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [gameCount, isPaused]);

  if (!gameCount) return null;

  const activeGame = games[activeIndex];
  const orderedGames = games.map((game, index) => ({
    game,
    offset: (index - activeIndex + gameCount) % gameCount,
  })).sort((a, b) => b.offset - a.offset);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + gameCount) % gameCount);
  const showNext = () => setActiveIndex((current) => (current + 1) % gameCount);
  const handlePointerDown = (clientX: number) => {
    pointerStartX.current = clientX;
    didSwipe.current = false;
  };
  const handlePointerUp = (clientX: number) => {
    if (pointerStartX.current === null) return;
    const distance = clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 36) return;
    didSwipe.current = true;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <div
      className={styles.deckWrap}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
    >
      <div className={styles.deckControls}>
        <span>오늘 바로 할 게임</span>
        <div>
          <b>추천 게임</b>
          <button type="button" onClick={showPrevious} aria-label="이전 추천 게임">←</button>
          <button type="button" onClick={showNext} aria-label="다음 추천 게임">→</button>
        </div>
      </div>

      <div
        className={styles.deckStage}
        aria-live="polite"
        onPointerDown={(event) => handlePointerDown(event.clientX)}
        onPointerUp={(event) => handlePointerUp(event.clientX)}
        onPointerCancel={() => { pointerStartX.current = null; }}
      >
        {orderedGames.map(({ game, offset }) => {
          const isActive = offset === 0;
          return (
            <Link
              className={styles.deckCard}
              data-offset={offset}
              data-palette={gamePaletteFor(game.archetype)}
              href={`/games/${game.id}`}
              key={game.id}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${game.name} 게임 자세히 보기`}
              onClick={(event) => {
                if (didSwipe.current) {
                  event.preventDefault();
                  didSwipe.current = false;
                  return;
                }
                if (!isActive) {
                  event.preventDefault();
                  setActiveIndex(games.indexOf(game));
                }
              }}
            >
              <div className={styles.deckCardTop}><span>{deckIcons[games.indexOf(game) % deckIcons.length]}</span><i>{game.duration}분</i></div>
              <small>{gamePeopleLabel(game)} · {gameTeamLabel(game)}</small>
              <strong>{game.name}</strong>
              <p>{game.description}</p>
              <em>게임 자세히 보기 <span>→</span></em>
            </Link>
          );
        })}
      </div>

      <div className={styles.deckFooter}>
        <span><b>{activeIndex + 1}</b> / {gameCount}</span>
        <div aria-label="추천 게임 선택">
          {games.map((game, index) => <button className={index === activeIndex ? styles.deckDotActive : undefined} type="button" onClick={() => setActiveIndex(index)} key={game.id} aria-label={`${game.name} 보기`} aria-current={index === activeIndex ? "true" : undefined} />)}
        </div>
        <Link href={`/games/${activeGame.id}`}>현재 게임 보기 <span>→</span></Link>
      </div>
    </div>
  );
}
