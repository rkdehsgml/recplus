"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { itemTargetFor } from "@/data/item-targets";
import { loadCustomGames } from "@/lib/custom-games";
import { gameContextLabel, gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { gameItemsFor } from "@/lib/game-catalog";
import { addedItemsFor, loadItemPacks, type ItemPacksByGame } from "@/lib/item-packs";
import { archetypeLabels, difficultyLabels, gameOriginFor, gameOriginLabels, gameSeriesLabels, placeLabels, type GameDefinition } from "@/lib/game-types";
import { useGameCatalog } from "@/lib/use-game-catalog";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

export default function GameDetailContent({ id }: { id: string }) {
  const { games: catalog } = useGameCatalog();
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);
  const [packs, setPacks] = useState<ItemPacksByGame>({});

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCustomGames(loadCustomGames());
      setPacks(loadItemPacks());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const game = useMemo(() => catalog.find((item) => item.id === id) ?? customGames.find((item) => item.id === id), [catalog, customGames, id]);
  const relatedGames = useMemo(() => {
    if (!game?.profile) return [];
    return catalog.filter((item) => item.id !== game.id && item.profile?.contexts.some((context) => game.profile?.contexts.includes(context))).slice(0, 3);
  }, [catalog, game]);

  if (!game) {
    return <main className={styles.empty}><span>✦</span><h1>게임을 찾지 못했어요.</h1><p>게임 라이브러리에서 다시 찾아주세요.</p><Link href="/games">게임 라이브러리 보기</Link></main>;
  }

  const addedItems = addedItemsFor(game, packs);
  const items = [...gameItemsFor(game), ...addedItems];
  const itemTarget = itemTargetFor(game);
  const profile = game.profile;

  return (
    <main className={styles.page}>
      <Link className={styles.breadcrumb} href="/games">← 게임 라이브러리</Link>
      <section className={styles.hero}>
        <div className={styles.heroIcon}>{icons[game.archetype]}</div>
        <div className={styles.heroCopy}>
          <div className={styles.badges}>{game.series?.map((series) => <span key={series}>{gameSeriesLabels[series]}</span>)}<span>{gameOriginLabels[gameOriginFor(game)]}</span><span>{archetypeLabels[game.archetype]}</span>{game.source === "custom" && <span>내 게임</span>}</div>
          <h1>{game.name}</h1>
          <p>{game.description}</p>
          {profile && <div className={styles.contexts}>{profile.contexts.map((context) => <span key={context}>{gameContextLabel(context)}</span>)}</div>}
        </div>
        <div className={styles.heroActions}><Link className={styles.primary} href="/create">이 게임으로 행사 준비 <span>→</span></Link><span>게임을 고른 뒤 행사 순서를 구성할 수 있어요.</span></div>
      </section>

      <section className={styles.overview} aria-label="게임 운영 정보">
        <article><span>권장 인원</span><strong>{gamePeopleLabel(game)}</strong></article>
        <article><span>팀 운영</span><strong>{gameTeamLabel(game)}</strong></article>
        <article><span>권장 시간</span><strong>{game.duration}분</strong></article>
        <article><span>진행 난이도</span><strong>{profile ? difficultyLabels[profile.difficulty] : "정보 준비 중"}</strong></article>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.mainContent}>
          <article className={styles.sectionCard}>
            <div className={styles.sectionTitle}><p>HOW TO PLAY</p><h2>현장에서는 이렇게 진행하세요</h2></div>
            <blockquote>“{game.hostScript}”</blockquote>
            <ol>{game.ruleSteps.map((step, index) => <li key={`${step}-${index}`}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
          </article>

          <article className={styles.sectionCard}>
            <div className={styles.sectionTitle}><p>CONTENT PACK</p><h2>문제·제시어</h2><span>지금 {items.length}개 · 목표 {itemTarget}개{addedItems.length > 0 ? ` · 직접 추가한 ${addedItems.length}개 포함` : ""}</span></div>
            {items.length > 0
              ? <div className={styles.itemList}>{items.slice(0, 3).map((item, index) => <div key={item.id}><span>{index + 1}</span><p>{item.prompt}</p>{item.kind === "quiz" && <small>정답은 진행자 화면에서 확인</small>}{item.kind === "host-only" && <small>진행자 전용 제시어</small>}</div>)}</div>
              : <p className={styles.packEmpty}>아직 등록된 문항이 없어요. 진행 중에 꺼내 쓸 문항을 채워두세요.</p>}
            <Link className={styles.packLink} href={`/games/${game.id}/items`}>문제팩 관리 <span>→</span></Link>
          </article>
        </section>

        <aside className={styles.sideContent}>
          <article className={styles.sideCard}><span>가능한 장소</span><div>{profile?.places.map((place) => <b key={place}>{placeLabels[place]}</b>) ?? <b>정보 준비 중</b>}</div></article>
          <article className={styles.sideCard}><span>준비물</span><div>{profile?.preparations.map((item) => <b key={item}>{item}</b>) ?? <b>정보 준비 중</b>}</div></article>
          <article className={styles.tip}><span>진행 전 체크</span><p>시작 전 팀 수와 게임 시간을 정하고, 진행 멘트를 한 번만 읽어보세요.</p></article>
        </aside>
      </div>

      {relatedGames.length > 0 && <section className={styles.related}><div><p>MORE FOR THIS OCCASION</p><h2>이런 게임도 함께 보세요</h2></div><div>{relatedGames.map((item) => <Link href={`/games/${item.id}`} key={item.id}><span>{icons[item.archetype]}</span><strong>{item.name}</strong><small>{gamePeopleLabel(item)} · {item.duration}분</small><b>→</b></Link>)}</div></section>}
    </main>
  );
}
