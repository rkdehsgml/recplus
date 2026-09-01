"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games } from "@/data/games";
import { loadCustomGames } from "@/lib/custom-games";
import { gameContextLabel, gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { gameItemsFor } from "@/lib/game-catalog";
import { archetypeLabels, difficultyLabels, placeLabels, type GameDefinition } from "@/lib/game-types";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

export default function GameDetailContent({ id }: { id: string }) {
  const [customGames, setCustomGames] = useState<GameDefinition[]>([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCustomGames(loadCustomGames()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const game = useMemo(() => games.find((item) => item.id === id) ?? customGames.find((item) => item.id === id), [customGames, id]);
  const relatedGames = useMemo(() => {
    if (!game?.profile) return [];
    return games.filter((item) => item.id !== game.id && item.profile?.contexts.some((context) => game.profile?.contexts.includes(context))).slice(0, 3);
  }, [game]);

  if (!game) {
    return <main className={styles.empty}><span>✦</span><h1>게임을 찾지 못했어요.</h1><p>게임 라이브러리에서 다시 찾아주세요.</p><Link href="/games">게임 라이브러리 보기</Link></main>;
  }

  const items = gameItemsFor(game);
  const profile = game.profile;

  return (
    <main className={styles.page}>
      <header className={styles.header}><Link className={styles.brand} href="/"><span>R</span> 레크마스터</Link><Link className={styles.back} href="/games">← 게임 라이브러리</Link></header>

      <section className={styles.hero}>
        <div className={styles.heroIcon}>{icons[game.archetype]}</div>
        <div className={styles.heroCopy}>
          <div className={styles.badges}><span>{archetypeLabels[game.archetype]}</span>{game.source === "custom" && <span>내 게임</span>}</div>
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

          {items.length > 0 && <article className={styles.sectionCard}>
            <div className={styles.sectionTitle}><p>CONTENT PACK</p><h2>문제·제시어 미리보기</h2><span>현재 {items.length}개 · DB 연동 후 문제팩을 확장할 수 있어요.</span></div>
            <div className={styles.itemList}>{items.slice(0, 3).map((item, index) => <div key={item.id}><span>{index + 1}</span><p>{item.prompt}</p>{item.kind === "quiz" && <small>정답은 진행자 화면에서 확인</small>}{item.kind === "host-only" && <small>진행자 전용 제시어</small>}</div>)}</div>
          </article>}
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
