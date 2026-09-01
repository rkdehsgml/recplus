"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games } from "@/data/games";
import { deleteCustomGame, loadCustomGames } from "@/lib/custom-games";
import { fitsEventContext, gameContextLabel, gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { archetypeLabels, eventContexts, type EventContext, type GameDefinition } from "@/lib/game-types";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;
const contextFilters: { id: "all" | EventContext; label: string }[] = [{ id: "all", label: "전체" }, ...eventContexts.map((context) => ({ id: context, label: gameContextLabel(context) }))];

type PeopleFilter = "all" | "small" | "medium" | "large";
type TimeFilter = "all" | "quick" | "standard" | "long";
type QuickFilter = "all" | "no-prep" | "high-energy" | "easy";
type SortOption = "recommended" | "shortest" | "largest";

const peopleFilters: { id: PeopleFilter; label: string }[] = [{ id: "all", label: "인원 전체" }, { id: "small", label: "10명 이하" }, { id: "medium", label: "11~30명" }, { id: "large", label: "31명 이상" }];
const timeFilters: { id: TimeFilter; label: string }[] = [{ id: "all", label: "시간 전체" }, { id: "quick", label: "10분 안에" }, { id: "standard", label: "15분 안에" }, { id: "long", label: "20분 이상" }];
const quickFilters: { id: QuickFilter; label: string }[] = [{ id: "all", label: "모든 게임" }, { id: "no-prep", label: "준비물 없음" }, { id: "high-energy", label: "텐션 올리기" }, { id: "easy", label: "진행 쉬움" }];

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

export default function GamesContent({ initialContext }: { initialContext: "all" | EventContext }) {
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
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

  const gameList = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matched = [...customGames, ...games]
      .filter((game) => fitsEventContext(game, context))
      .filter((game) => matchesPeople(game, people))
      .filter((game) => matchesTime(game, time))
      .filter((game) => matchesQuickFilter(game, quickFilter))
      .filter((game) => !normalizedQuery || [game.name, game.description, archetypeLabels[game.archetype]].join(" ").toLowerCase().includes(normalizedQuery));
    return sortGames(matched, sort);
  }, [context, customGames, people, query, quickFilter, sort, time]);

  const featuredGame = gameList[0];
  const hasActiveFilters = context !== "all" || people !== "all" || time !== "all" || quickFilter !== "all" || query.length > 0 || sort !== "recommended";

  function clearFilters() {
    setContext("all"); setPeople("all"); setTime("all"); setQuickFilter("all"); setSort("recommended"); setQuery("");
  }

  function removeGame(game: GameDefinition) {
    if (!window.confirm(`“${game.name}”을 내 게임에서 삭제할까요?`)) return;
    setCustomGames(deleteCustomGame(game.id));
  }

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div><p>GAME FINDER</p><h1>오늘의 자리엔<br /><em>어떤 게임</em>이 맞을까요?</h1><span>인원, 시간, 분위기만 고르면 지금 바로 진행하기 좋은 게임부터 골라드려요.</span></div>
        <div className={styles.introStats} aria-label="게임 라이브러리 현황"><span><b>{games.length + customGames.length}</b>개 게임</span><span><b>5</b>가지 모임 상황</span><span><b>3</b>단계 빠른 선택</span></div>
      </section>

      <section className={styles.finder} aria-label="게임 찾기">
        <div className={styles.finderTop}>
          <label className={styles.search}><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="게임 이름이나 유형으로 검색" /></label>
          <label className={styles.sortLabel}>정렬<select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="recommended">추천순</option><option value="shortest">짧은 시간순</option><option value="largest">많은 인원순</option></select></label>
        </div>
        <div className={styles.filterRow}><span>모임 상황</span><nav className={styles.filters} aria-label="행사 상황으로 필터링">{contextFilters.map((filter) => <button className={context === filter.id ? styles.active : ""} aria-pressed={context === filter.id} onClick={() => setContext(filter.id)} key={filter.id}>{filter.label}</button>)}</nav></div>
        <div className={styles.filterColumns}>
          <div className={styles.filterRow}><span>참가 인원</span><nav className={styles.filters} aria-label="참가 인원으로 필터링">{peopleFilters.map((filter) => <button className={people === filter.id ? styles.active : ""} aria-pressed={people === filter.id} onClick={() => setPeople(filter.id)} key={filter.id}>{filter.label}</button>)}</nav></div>
          <div className={styles.filterRow}><span>진행 시간</span><nav className={styles.filters} aria-label="진행 시간으로 필터링">{timeFilters.map((filter) => <button className={time === filter.id ? styles.active : ""} aria-pressed={time === filter.id} onClick={() => setTime(filter.id)} key={filter.id}>{filter.label}</button>)}</nav></div>
        </div>
        <div className={styles.quickRow}><span>바로 고르기</span><div>{quickFilters.map((filter) => <button className={quickFilter === filter.id ? styles.quickActive : ""} aria-pressed={quickFilter === filter.id} onClick={() => setQuickFilter(filter.id)} key={filter.id}>{filter.label}</button>)}</div>{hasActiveFilters && <button className={styles.resetButton} onClick={clearFilters}>초기화</button>}</div>
      </section>

      {featuredGame && <section className={styles.matchCard} aria-live="polite"><div className={styles.matchIcon}>{icons[featuredGame.archetype]}</div><div><span>지금 조건에 가장 먼저 보기 좋은 게임</span><strong>{featuredGame.name}</strong><p>{gamePeopleLabel(featuredGame)} · {featuredGame.duration}분 · {gameTeamLabel(featuredGame)}</p></div><Link href={`/games/${featuredGame.id}`}>게임 보기 <span>→</span></Link></section>}

      <div className={styles.resultBar}><div><strong>{context === "all" ? "둘러보기" : `${gameContextLabel(context)}에 추천하는 게임`}</strong><span>{gameList.length}개 찾음</span></div>{hasActiveFilters && <p>조건을 바꿔 더 넓게 찾아볼 수 있어요.</p>}</div>

      {gameList.length ? <section className={styles.grid}>{gameList.map((game, index) => <article className={`${styles.card} ${index === 0 ? styles.bestCard : ""}`} key={game.id}>
        {index === 0 && <span className={styles.bestBadge}>BEST MATCH</span>}
        <Link className={styles.cardLink} href={`/games/${game.id}`}><div className={styles.cardTop}><span className={styles.badge}>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span><b>{game.duration}분</b></div><h2>{game.name}</h2><p>{game.description}</p><div className={styles.meta}><span>{gamePeopleLabel(game)}</span><span>{gameTeamLabel(game)}</span></div>{game.profile && <div className={styles.contexts}>{game.profile.contexts.slice(0, 3).map((item) => <i key={item}>{gameContextLabel(item)}</i>)}</div>}<strong className={styles.detailLink}>게임 자세히 보기 <span>→</span></strong></Link>
        {game.source === "custom" && <button className={styles.deleteButton} onClick={() => removeGame(game)}>내 게임 삭제</button>}
      </article>)}</section> : <section className={styles.empty}><span>✦</span><h2>조건에 맞는 게임을 찾지 못했어요.</h2><p>인원이나 시간을 조금 넓혀보면 더 많은 게임을 볼 수 있어요.</p><button onClick={clearFilters}>전체 게임 보기</button></section>}
    </main>
  );
}
