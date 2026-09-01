"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games } from "@/data/games";
import { itemTargetFor, MINIMUM_ITEM_COUNT } from "@/data/item-targets";
import { loadCustomGames } from "@/lib/custom-games";
import { currentItemsFor, loadItemPacks, type ItemPacksByGame } from "@/lib/item-packs";
import { archetypeLabels, type GameDefinition } from "@/lib/game-types";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

type PackStatus = {
  game: GameDefinition;
  count: number;
  target: number;
  shortfall: number;
};

export default function ItemPacksPage() {
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
  const [packs, setPacks] = useState<ItemPacksByGame>({});
  const [loaded, setLoaded] = useState(false);
  const [onlyShort, setOnlyShort] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCustomGames(loadCustomGames());
      setPacks(loadItemPacks());
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const statuses = useMemo<PackStatus[]>(() => {
    const catalog = [...customGames, ...games];
    return catalog
      .map((game) => {
        const count = currentItemsFor(game, packs, catalog).length;
        const target = itemTargetFor(game);
        return { game, count, target, shortfall: Math.max(0, target - count) };
      })
      .sort((left, right) => right.shortfall - left.shortfall || left.game.name.localeCompare(right.game.name, "ko"));
  }, [customGames, packs]);

  const totalCount = statuses.reduce((sum, status) => sum + status.count, 0);
  const totalTarget = statuses.reduce((sum, status) => sum + status.target, 0);
  const shortGames = statuses.filter((status) => status.shortfall > 0);
  const visible = onlyShort ? shortGames : statuses;

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p>CONTENT PACKS</p>
        <h1>문제를 채워둬야<br />매번 다른 판이 됩니다.</h1>
        <span>같은 모임에서 두 번째로 열었을 때 &ldquo;또 이거네&rdquo; 소리가 나오지 않도록, 게임마다 문항을 미리 쌓아두세요. 한 세션에서 본 문항은 다시 나오지 않습니다.</span>
      </section>

      {loaded ? (
        <>
          <section className={styles.summary} aria-label="문제팩 현황 요약">
            <article><span>전체 문항</span><strong>{totalCount}<small>개</small></strong></article>
            <article><span>목표 문항</span><strong>{totalTarget}<small>개</small></strong></article>
            <article className={shortGames.length ? styles.warn : styles.done}><span>목표 미달 게임</span><strong>{shortGames.length}<small>개</small></strong></article>
          </section>

          <div className={styles.resultBar}>
            <strong>{onlyShort ? "문항이 모자란 게임" : "전체 게임"}</strong>
            <nav className={styles.filters} aria-label="목록 범위">
              <button className={onlyShort ? "" : styles.active} onClick={() => setOnlyShort(false)}>전체 {statuses.length}</button>
              <button className={onlyShort ? styles.active : ""} onClick={() => setOnlyShort(true)}>목표 미달 {shortGames.length}</button>
            </nav>
          </div>

          {visible.length ? (
            <section className={styles.grid}>
              {visible.map(({ game, count, target, shortfall }) => (
                <Link className={styles.card} href={`/games/${game.id}/items`} key={game.id}>
                  <div className={styles.cardTop}>
                    <span className={styles.badge}>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span>
                    {game.source === "custom" && <b className={styles.own}>내 게임</b>}
                  </div>
                  <h2>{game.name}</h2>
                  <div className={styles.count}><strong>{count}</strong><span>/ {target}개</span></div>
                  <div className={styles.bar} aria-hidden="true"><i className={shortfall ? "" : styles.barDone} style={{ width: `${Math.min(100, (count / target) * 100)}%` }} /></div>
                  <p className={shortfall ? styles.shortNote : styles.doneNote}>
                    {shortfall ? `${shortfall}개 더 필요해요` : "목표를 채웠어요"}
                    {count > 0 && count < MINIMUM_ITEM_COUNT ? " · 지금은 금방 한 바퀴 돌아요" : ""}
                  </p>
                  <strong className={styles.cardLink}>문항 관리 <span>→</span></strong>
                </Link>
              ))}
            </section>
          ) : (
            <section className={styles.empty}><span>✓</span><h2>모든 게임이 목표 문항을 채웠어요.</h2><p>이제 문항을 더 다듬거나 새 게임을 만들어보세요.</p><Link href="/games">게임 라이브러리 보기</Link></section>
          )}
        </>
      ) : (
        <section className={styles.loading}>문제팩 현황을 불러오고 있어요…</section>
      )}
    </main>
  );
}
