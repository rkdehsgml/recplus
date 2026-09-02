"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SidebarNav, { type SidebarNavGroup } from "@/app/sidebar-nav";
import { deleteCustomGame, loadCustomGames } from "@/lib/custom-games";
import { fitsEventContext, gameContextLabel, gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { gamePaletteFor } from "@/lib/game-palette";
import { archetypeLabels, difficultyLabels, eventContexts, gameOriginDescriptions, gameOriginFor, gameOriginLabels, gameOrigins, gameSeries, gameSeriesDescriptions, gameSeriesFor, gameSeriesLabels, type EventContext, type GameDefinition, type GameOrigin, type GameSeries } from "@/lib/game-types";
import { useGameCatalog } from "@/lib/use-game-catalog";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;
const contextFilters: { id: "all" | EventContext; label: string }[] = [{ id: "all", label: "모든 상황" }, ...eventContexts.map((context) => ({ id: context, label: gameContextLabel(context) }))];

type PeopleFilter = "all" | "small" | "medium" | "large";
type TimeFilter = "all" | "quick" | "standard" | "long";
type QuickFilter = "all" | "no-prep" | "high-energy" | "easy";
type SortOption = "recommended" | "shortest" | "largest";
type OriginFilter = "all" | GameOrigin;
type SeriesFilter = "all" | GameSeries;

const quickFilters: { id: QuickFilter; label: string }[] = [{ id: "all", label: "전체" }, { id: "no-prep", label: "준비물 없음" }, { id: "high-energy", label: "텐션 올리기" }, { id: "easy", label: "진행 쉬움" }];

function matchesPeople(game: GameDefinition, filter: PeopleFilter) {
  if (filter === "all") return true;
  const people = game.profile?.people;
  if (!people) return false;
  const max = people.max ?? Number.POSITIVE_INFINITY;
  if (filter === "small") return people.min <= 10;
  if (filter === "medium") return people.min <= 30 && max >= 11;
  return max >= 31;
}

function matchesTime(game: GameDefinition, filter: TimeFilter) {
  if (filter === "all") return true;
  if (filter === "quick") return game.duration <= 10;
  if (filter === "standard") return game.duration <= 15;
  return game.duration >= 20;
}

function matchesQuickFilter(game: GameDefinition, filter: QuickFilter) {
  if (filter === "all") return true;
  if (filter === "no-prep") return game.profile?.preparations.includes("없음") === true;
  if (filter === "high-energy") return game.energy >= 4;
  return game.profile?.difficulty === "easy";
}

function sortGames(list: GameDefinition[], sort: SortOption) {
  return [...list].sort((left, right) => {
    if (sort === "shortest") return left.duration - right.duration || right.energy - left.energy;
    if (sort === "largest") return (right.profile?.people.max ?? 0) - (left.profile?.people.max ?? 0) || left.duration - right.duration;
    return Number(right.source === "custom") - Number(left.source === "custom") || right.energy - left.energy || left.duration - right.duration;
  });
}

type GamesContentProps = { initialContext: "all" | EventContext; initialOrigin: OriginFilter; initialSeries: SeriesFilter };

export default function GamesContent({ initialContext, initialOrigin, initialSeries }: GamesContentProps) {
  const { games: catalog } = useGameCatalog();
  const searchRef = useRef<HTMLInputElement>(null);
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
  const [series, setSeries] = useState<SeriesFilter>(initialSeries);
  const [origin, setOrigin] = useState<OriginFilter>(initialOrigin);
  const [context, setContext] = useState<"all" | EventContext>(initialContext);
  const [people, setPeople] = useState<PeopleFilter>("all");
  const [time, setTime] = useState<TimeFilter>("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sort, setSort] = useState<SortOption>("recommended");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCustomGames(loadCustomGames()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const allGames = useMemo(() => [...customGames, ...catalog], [catalog, customGames]);
  const seriesCounts = useMemo(() => Object.fromEntries(gameSeries.map((item) => [item, allGames.filter((game) => gameSeriesFor(game).includes(item)).length])) as Record<GameSeries, number>, [allGames]);
  const originCounts = useMemo(() => Object.fromEntries(gameOrigins.map((item) => [item, allGames.filter((game) => gameOriginFor(game) === item).length])) as Record<GameOrigin, number>, [allGames]);

  const gameList = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matched = allGames
      .filter((game) => series === "all" || gameSeriesFor(game).includes(series))
      .filter((game) => origin === "all" || gameOriginFor(game) === origin)
      .filter((game) => fitsEventContext(game, context))
      .filter((game) => matchesPeople(game, people))
      .filter((game) => matchesTime(game, time))
      .filter((game) => matchesQuickFilter(game, quickFilter))
      .filter((game) => !normalizedQuery || [game.name, game.description, archetypeLabels[game.archetype], gameOriginLabels[gameOriginFor(game)], ...gameSeriesFor(game).map((item) => gameSeriesLabels[item])].join(" ").toLowerCase().includes(normalizedQuery));
    return sortGames(matched, sort);
  }, [allGames, context, origin, people, query, quickFilter, series, sort, time]);

  const hasActiveFilters = series !== "all" || origin !== "all" || context !== "all" || people !== "all" || time !== "all" || quickFilter !== "all" || query.trim().length > 0 || sort !== "recommended";
  const collectionTitle = series !== "all" ? gameSeriesLabels[series] : origin !== "all" ? gameOriginLabels[origin] : "모든 게임";
  const resultTitle = context === "all" ? collectionTitle : `${collectionTitle} · ${gameContextLabel(context)}`;
  const collectionDescription = series !== "all"
    ? gameSeriesDescriptions[series]
    : origin !== "all"
      ? gameOriginDescriptions[origin]
      : "프로그램이나 포맷을 하나 고르거나, 모임 조건으로 바로 좁혀보세요.";
  const sidebarGroups: SidebarNavGroup[] = [
    {
      id: "library",
      label: "라이브러리",
      items: [{ id: "all", label: "전체 게임", icon: "⌂", badge: allGames.length, active: series === "all" && origin === "all", onSelect: showAllCollections }],
    },
    {
      id: "programs",
      label: "프로그램",
      items: gameSeries.map((item) => ({ id: item, label: gameSeriesLabels[item], icon: "▦", badge: seriesCounts[item], active: series === item, onSelect: () => selectSeries(item) })),
    },
    {
      id: "roots",
      label: "게임의 출발점",
      items: gameOrigins.map((item) => ({ id: item, label: gameOriginLabels[item], icon: "◇", badge: originCounts[item], active: origin === item, onSelect: () => selectOrigin(item) })),
    },
    {
      id: "occasion",
      label: "모임 상황",
      items: contextFilters.map((filter) => ({ id: filter.id, label: filter.label, icon: filter.id === "all" ? "○" : "·", active: context === filter.id, level: filter.id === "all" ? 1 : 2, onSelect: () => setContext(filter.id) })),
    },
  ];

  function clearFilters() {
    setSeries("all"); setOrigin("all"); setContext("all"); setPeople("all"); setTime("all"); setQuickFilter("all"); setSort("recommended"); setQuery("");
  }

  function selectSeries(nextSeries: SeriesFilter) {
    setSeries(nextSeries);
    setOrigin("all");
  }

  function selectOrigin(nextOrigin: OriginFilter) {
    setOrigin(nextOrigin);
    setSeries("all");
  }

  function showAllCollections() {
    setSeries("all");
    setOrigin("all");
  }

  function removeGame(game: GameDefinition) {
    if (!window.confirm(`“${game.name}”을 내 게임에서 삭제할까요?`)) return;
    setCustomGames(deleteCustomGame(game.id));
  }

  return (
    <main className={styles.page}>
      <div className={styles.libraryLayout}>
        <SidebarNav
          ariaLabel="게임 라이브러리 분류"
          title="게임 라이브러리"
          subtitle="컬렉션으로 빠르게 찾기"
          activeLabel={resultTitle}
          groups={sidebarGroups}
          footer={<Link href="/games/new"><span aria-hidden="true">＋</span><strong>내 게임 추가</strong><small>자주 쓰는 진행 게임을 라이브러리에 저장하세요.</small></Link>}
        />

        <section className={styles.catalog} aria-label="게임 목록">
          <header className={styles.catalogHeader}>
            <div><p>GAME LIBRARY</p><h1>{resultTitle}</h1><span>{collectionDescription}</span></div>
            <Link className={styles.planButton} href="/create">행사 플랜 만들기 <i aria-hidden="true">→</i></Link>
          </header>
          <div className={styles.toolbar}>
            <label className={styles.search}><span aria-hidden="true">⌕</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="게임 이름, 프로그램, 유형 검색" /><kbd>⌘ K</kbd></label>
            <label className={styles.sort}>정렬<select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="recommended">추천순</option><option value="shortest">짧은 시간순</option><option value="largest">많은 인원순</option></select></label>
          </div>
          <div className={styles.catalogHead}><p><b>{gameList.length}</b>개의 게임</p><span>빠른 조건</span></div>
          <div className={styles.quickControls}><nav aria-label="빠른 게임 조건">{quickFilters.map((filter) => <button className={quickFilter === filter.id ? styles.quickActive : ""} aria-pressed={quickFilter === filter.id} onClick={() => setQuickFilter(filter.id)} key={filter.id}>{filter.label}</button>)}</nav>{hasActiveFilters && <button className={styles.resetButton} onClick={clearFilters}>초기화</button>}</div>

          {gameList.length ? <div className={styles.gameGrid} role="list">{gameList.map((game) => <article className={styles.gameCard} data-palette={gamePaletteFor(game.archetype)} role="listitem" key={game.id}><Link href={`/games/${game.id}`}><div className={styles.rowBadges}>{gameSeriesFor(game).map((item) => <i className={styles.seriesBadge} key={item}>{gameSeriesLabels[item]}</i>)}<i>{gameOriginLabels[gameOriginFor(game)]}</i></div><div className={styles.gameIcon} aria-hidden="true">{icons[game.archetype]}</div><h3>{game.name}</h3><p>{game.description}</p><div className={styles.cardMeta}><span>{gamePeopleLabel(game)}</span><span>{game.duration}분</span><span>{gameTeamLabel(game)}</span></div><footer><span>{game.profile ? difficultyLabels[game.profile.difficulty] : archetypeLabels[game.archetype]}</span><b>게임 보기 <i>→</i></b></footer></Link>{game.source === "custom" && <button className={styles.deleteButton} onClick={() => removeGame(game)}>삭제</button>}</article>)}</div> : <section className={styles.empty}><span>✦</span><h2>조건에 맞는 게임을 찾지 못했어요.</h2><p>컬렉션은 하나만 선택되고 있어요. 모임 상황이나 빠른 조건을 조금 넓혀보세요.</p><button onClick={clearFilters}>전체 게임 보기</button></section>}
        </section>
      </div>
    </main>
  );
}
