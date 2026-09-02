"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SidebarNav, { type SidebarNavGroup } from "@/app/sidebar-nav";
import { itemTargetFor, MINIMUM_ITEM_COUNT } from "@/data/item-targets";
import { loadCustomGames } from "@/lib/custom-games";
import { gamePaletteFor } from "@/lib/game-palette";
import { currentItemsFor, loadItemPacks, type ItemPacksByGame } from "@/lib/item-packs";
import { archetypeLabels, archetypes, type Archetype, type GameDefinition } from "@/lib/game-types";
import { useGameCatalog } from "@/lib/use-game-catalog";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

type PackStatus = {
  game: GameDefinition;
  count: number;
  target: number;
  shortfall: number;
};

export default function ItemPacksPage() {
  const { games: catalog } = useGameCatalog();
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
  const [packs, setPacks] = useState<ItemPacksByGame>({});
  const [loaded, setLoaded] = useState(false);
  const [onlyShort, setOnlyShort] = useState(false);
  const [archetype, setArchetype] = useState<"all" | Archetype>("all");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCustomGames(loadCustomGames());
      setPacks(loadItemPacks());
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const statuses = useMemo<PackStatus[]>(() => {
    const fullCatalog = [...customGames, ...catalog];
    return fullCatalog
      .map((game) => {
        const count = currentItemsFor(game, packs, fullCatalog).length;
        const target = itemTargetFor(game);
        return { game, count, target, shortfall: Math.max(0, target - count) };
      })
      .sort((left, right) => right.shortfall - left.shortfall || left.game.name.localeCompare(right.game.name, "ko"));
  }, [catalog, customGames, packs]);

  const totalCount = statuses.reduce((sum, status) => sum + status.count, 0);
  const totalTarget = statuses.reduce((sum, status) => sum + status.target, 0);
  const shortGames = statuses.filter((status) => status.shortfall > 0);
  const scopeVisible = onlyShort ? shortGames : statuses;
  const visible = archetype === "all" ? scopeVisible : scopeVisible.filter((status) => status.game.archetype === archetype);
  const archetypeCounts = useMemo(() => Object.fromEntries(archetypes.map((item) => [item, statuses.filter((status) => status.game.archetype === item).length])) as Record<Archetype, number>, [statuses]);
  const activeLabel = `${onlyShort ? "목표 미달" : "전체 문제팩"}${archetype === "all" ? "" : ` · ${archetypeLabels[archetype]}`}`;
  const sidebarGroups: SidebarNavGroup[] = [
    {
      id: "scope",
      label: "콘텐츠 상태",
      items: [
        { id: "all", label: "전체 문제팩", icon: "▦", badge: statuses.length, active: !onlyShort, onSelect: () => setOnlyShort(false) },
        { id: "short", label: "목표 미달", icon: "!", badge: shortGames.length, active: onlyShort, onSelect: () => setOnlyShort(true) },
      ],
    },
    {
      id: "archetypes",
      label: "게임 유형",
      items: [
        { id: "type-all", label: "모든 유형", icon: "○", badge: statuses.length, active: archetype === "all", onSelect: () => setArchetype("all") },
        ...archetypes.map((item) => ({ id: item, label: archetypeLabels[item], icon: icons[item], badge: archetypeCounts[item], active: archetype === item, palette: gamePaletteFor(item), level: 2 as const, onSelect: () => setArchetype(item) })),
      ],
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p>CONTENT PACKS</p>
        <h1>문제를 채워둬야<br />매번 다른 판이 됩니다.</h1>
        <span>같은 모임에서 두 번째로 열었을 때 &ldquo;또 이거네&rdquo; 소리가 나오지 않도록, 게임마다 문항을 미리 쌓아두세요. 한 세션에서 본 문항은 다시 나오지 않습니다.</span>
      </section>

      {loaded ? (
        <div className={styles.workspace}>
          <SidebarNav
            ariaLabel="문제팩 목록 분류"
            title="문제팩 관리"
            subtitle="상태와 게임 유형"
            activeLabel={activeLabel}
            groups={sidebarGroups}
            footer={<Link href="/games/new"><span aria-hidden="true">＋</span><strong>새 게임 만들기</strong><small>새 게임과 전용 문제팩을 함께 준비하세요.</small></Link>}
          />

          <div className={styles.content}>
            <section className={styles.summary} aria-label="문제팩 현황 요약">
              <article><span>전체 문항</span><strong>{totalCount}<small>개</small></strong></article>
              <article><span>목표 문항</span><strong>{totalTarget}<small>개</small></strong></article>
              <article className={shortGames.length ? styles.warn : styles.done}><span>목표 미달 게임</span><strong>{shortGames.length}<small>개</small></strong></article>
            </section>

            <div className={styles.resultBar}><strong>{activeLabel}</strong><span>{visible.length}개 게임</span></div>

            {visible.length ? (
              <section className={styles.grid}>
                {visible.map(({ game, count, target, shortfall }) => (
                  <Link className={styles.card} data-palette={gamePaletteFor(game.archetype)} href={`/games/${game.id}/items`} key={game.id}>
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
              <section className={styles.empty}><span>✓</span><h2>이 조건에 해당하는 문제팩이 없어요.</h2><p>상태나 게임 유형을 바꾸거나 새 게임을 만들어보세요.</p><Link href="/games">게임 라이브러리 보기</Link></section>
            )}
          </div>
        </div>
      ) : (
        <section className={styles.loading}>문제팩 현황을 불러오고 있어요…</section>
      )}
    </main>
  );
}
