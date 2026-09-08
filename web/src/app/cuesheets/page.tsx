"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cacheCueSheets, deleteCueSheet, loadCueSheets, type SavedCueSheet } from "@/lib/cuesheets";
import { deleteCueSheetFromCloud, loadCloudCueSheets, mergeCueSheets, syncLocalCueSheetsToCloud } from "@/lib/event-plan-store";
import { placeLabels } from "@/lib/game-types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

function totalMinutes(cue: SavedCueSheet) {
  return cue.games.reduce((sum, game) => sum + game.allocatedDuration, 0);
}

export default function CueSheetsPage() {
  const [cueSheets, setCueSheets] = useState<SavedCueSheet[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let active = true;
    const supabase = createSupabaseBrowserClient();

    async function loadForSignedInUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;

      if (error || !data.user) {
        setCueSheets([]);
        setSignedOut(true);
        setLoaded(true);
        return;
      }

      const initialCloud = await loadCloudCueSheets();
      const synced = await syncLocalCueSheetsToCloud(initialCloud);
      const cloud = synced ? await loadCloudCueSheets() : initialCloud;
      if (!active) return;

      const merged = mergeCueSheets(cloud, loadCueSheets());
      cacheCueSheets(merged);
      setCueSheets(merged);
      if (!synced) setDeleteError("일부 기기 저장 플랜을 계정에 동기화하지 못했어요. 연결을 확인한 뒤 다시 열어주세요.");
      setSignedOut(false);
      setLoaded(true);
    }

    const frame = window.requestAnimationFrame(() => {
      void loadForSignedInUser();
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setCueSheets([]);
        setSignedOut(true);
        setLoaded(true);
        return;
      }
      void loadForSignedInUser();
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      listener.subscription.unsubscribe();
    };
  }, []);

  async function remove(cue: SavedCueSheet) {
    if (!window.confirm(`“${cue.name}” 행사 플랜을 삭제할까요?`)) return;
    setDeleteError("");
    const cloud = await deleteCueSheetFromCloud(cue.id);
    if (cloud === "failed") {
      setDeleteError("계정에 저장된 행사 플랜을 삭제하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }
    setCueSheets(deleteCueSheet(cue.id));
  }

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <p>MY EVENTS</p>
        <h1>저장한 행사 플랜을<br />필요할 때 다시 꺼내세요.</h1>
        <span>{signedOut ? "로그인한 계정의 행사 플랜만 표시됩니다." : `이 기기와 로그인한 계정에서 불러온 행사 플랜 ${cueSheets.length}개`}</span>
      </section>

      {deleteError && <p className={styles.error} role="alert">{deleteError}</p>}

      {signedOut ? (
        <section className={styles.signInEmpty}>
          <span>◷</span>
          <h2>행사 플랜을 보려면 로그인하세요.</h2>
          <p>로그인한 계정의 행사 플랜만 이 화면에 표시됩니다.</p>
          <Link href="/login">로그인하기</Link>
        </section>
      ) : loaded && cueSheets.length ? (
        <section className={styles.grid}>
          {cueSheets.map((cue) => (
            <article className={styles.card} key={cue.id}>
              <div className={styles.cardTop}><span>{placeLabels[cue.place]}</span><button onClick={() => remove(cue)}>삭제</button></div>
              <h2>{cue.name}</h2>
              <p>{new Date(cue.createdAt).toLocaleDateString("ko-KR")} 저장</p>
              <div className={styles.meta}><span>👥 {cue.people}명</span><span>{cue.mode === "team" ? `🏆 ${cue.teams?.length ?? 2}조 팀전` : cue.mode === "personal" ? "🙋 개인전" : `🔀 ${cue.teams?.length ?? 2}조 + 개인 이벤트`}</span><span>🎮 {cue.games.length}게임</span></div>
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
