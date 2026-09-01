"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteCueSheet, loadCueSheets, type SavedCueSheet } from "@/lib/cuesheets";
import { placeLabels } from "@/lib/game-types";
import styles from "./page.module.css";

function totalMinutes(cue: SavedCueSheet) {
  return cue.games.reduce((sum, game) => sum + game.allocatedDuration, 0);
}

export default function CueSheetsPage() {
  const [cueSheets, setCueSheets] = useState<SavedCueSheet[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCueSheets(loadCueSheets());
      setLoaded(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function remove(cue: SavedCueSheet) {
    if (!window.confirm(`“${cue.name}” 행사 플랜을 삭제할까요?`)) return;
    setCueSheets(deleteCueSheet(cue.id));
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/"><span>R</span> 레크마스터</Link>
        <Link className={styles.newButton} href="/create">＋ 새 행사 준비</Link>
      </header>

      <section className={styles.intro}>
        <p>MY EVENTS</p>
        <h1>저장한 행사 플랜을<br />필요할 때 다시 꺼내세요.</h1>
        <span>이 기기의 브라우저에 저장된 행사 플랜 {cueSheets.length}개</span>
      </section>

      {loaded && cueSheets.length ? (
        <section className={styles.grid}>
          {cueSheets.map((cue) => (
            <article className={styles.card} key={cue.id}>
              <div className={styles.cardTop}><span>{placeLabels[cue.place]}</span><button onClick={() => remove(cue)}>삭제</button></div>
              <h2>{cue.name}</h2>
              <p>{new Date(cue.createdAt).toLocaleDateString("ko-KR")} 저장</p>
              <div className={styles.meta}><span>👥 {cue.people}명</span><span>{cue.mode === "team" ? `🏆 ${cue.teams?.length ?? 2}조 팀전` : "🙋 개인전"}</span><span>🎮 {cue.games.length}게임</span></div>
              <div className={styles.total}><span>예상 진행 시간</span><strong>{totalMinutes(cue)}분</strong></div>
              <Link href={`/play/${cue.id}`}>진행 시작 <span>→</span></Link>
            </article>
          ))}
        </section>
      ) : loaded ? (
        <section className={styles.empty}><span>◷</span><h2>저장한 행사 플랜이 없어요.</h2><p>조건을 고르면 추천 게임을 모아 행사 플랜으로 저장할 수 있어요.</p><Link href="/create">첫 행사 준비하기</Link></section>
      ) : (
        <section className={styles.loading}>행사 플랜을 불러오고 있어요…</section>
      )}
    </main>
  );
}
