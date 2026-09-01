"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { RecommendedGame, RecommendationInput } from "@/engine/recommend";
import { saveCueSheet } from "@/lib/cuesheets";
import { saveCueSheetToCloud } from "@/lib/event-plan-store";
import { phaseLabels, placeLabels } from "@/lib/game-types";
import styles from "./page.module.css";

type EditableCueProps = {
  initialCue: RecommendedGame[];
  input: RecommendationInput;
};

export default function EditableCue({ initialCue, input }: EditableCueProps) {
  const [cue, setCue] = useState(initialCue);
  const [name, setName] = useState(`${placeLabels[input.place]} ${input.targetMinutes}분 행사 플랜`);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const total = useMemo(() => cue.reduce((sum, game) => sum + game.allocatedDuration, 0), [cue]);

  function move(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= cue.length) return;
    setCue((current) => {
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
    setSavedId(null);
  }

  function changeMinutes(index: number, amount: -5 | 5) {
    setCue((current) => current.map((game, gameIndex) => gameIndex === index
      ? { ...game, allocatedDuration: Math.max(5, game.allocatedDuration + amount) }
      : game));
    setSavedId(null);
  }

  function remove(index: number) {
    setCue((current) => current.filter((_, gameIndex) => gameIndex !== index));
    setSavedId(null);
  }

  async function save() {
    if (!cue.length || !name.trim()) return;
    setSaving(true);
    setSaveMessage("");
    const saved = saveCueSheet({ ...input, name: name.trim(), games: cue });
    const cloud = await saveCueSheetToCloud(saved);
    setSavedId(saved.id);
    setSaving(false);
    setSaveMessage(
      cloud.status === "synced"
        ? "이 기기와 로그인한 계정에 저장했어요."
        : cloud.status === "signed-out"
          ? "이 기기에 저장했어요. 계정 저장은 로그인 후 이용할 수 있어요."
          : "이 기기에는 저장했어요. 계정 저장은 잠시 후 다시 시도해주세요.",
    );
  }

  return (
    <>
      <section className={styles.intro}>
        <p>YOUR EVENT PLAN</p>
        <h1>게임을 고르고 순서를 다듬어<br />행사를 준비하세요.</h1>
        <div className={styles.conditions}>
          <span>📍 {placeLabels[input.place]}</span><span>👥 {input.people}명</span><span>{input.mode === "team" ? `🏆 ${input.teams?.length ?? 2}조 팀전` : "🙋 개인전"}</span>
        </div>
        {input.teams?.length && <div className={styles.teamList}><span>조 이름</span>{input.teams.map((team) => <b key={team.id}>{team.name}</b>)}</div>}
      </section>

      <section className={styles.summary}>
        <div><span>현재 진행 시간</span><strong>{total}분</strong></div>
        <div><span>목표 시간</span><strong>{input.targetMinutes}분</strong></div>
        <p className={total === input.targetMinutes ? styles.matched : styles.unmatched}>
          {total === input.targetMinutes ? "목표 시간에 딱 맞아요." : `목표보다 ${Math.abs(total - input.targetMinutes)}분 ${total > input.targetMinutes ? "길어요" : "짧아요"}.`}
        </p>
      </section>

      <section className={styles.flow}>
        <div><strong>분위기 흐름</strong><span>게임을 위아래로 옮기고, 각 게임 시간을 5분 단위로 조절하세요.</span></div>
        <div className={styles.energy} aria-label="게임별 에너지 흐름">{cue.map((game, index) => <i key={`${game.id}-${index}`} style={{ height: `${game.energy * 18}%` }} />)}</div>
      </section>

      {cue.length ? (
        <section className={styles.list}>
          {cue.map((game, index) => (
            <article className={styles.game} key={`${game.id}-${index}`}>
              <span className={styles.number}>{index + 1}</span>
              <div className={styles.gameBody}>
                <div className={styles.gameTitle}><span>{phaseLabels[game.phase]}</span>{game.source === "custom" && <b>내 게임</b>}</div>
                <h2>{game.name}</h2>
                <p>{game.reason}</p>
                <div className={styles.script}><strong>진행 한마디</strong>{game.hostScript}</div>
              </div>
              <div className={styles.gameControls} aria-label={`${game.name} 편집`}>
                <div className={styles.orderControls}>
                  <button onClick={() => move(index, -1)} disabled={index === 0} aria-label="위로 이동">↑</button>
                  <button onClick={() => move(index, 1)} disabled={index === cue.length - 1} aria-label="아래로 이동">↓</button>
                </div>
                <div className={styles.timeControls}>
                  <button onClick={() => changeMinutes(index, -5)} disabled={game.allocatedDuration <= 5} aria-label="5분 줄이기">−</button>
                  <strong>{game.allocatedDuration}분</strong>
                  <button onClick={() => changeMinutes(index, 5)} aria-label="5분 늘리기">＋</button>
                </div>
                <button className={styles.removeButton} onClick={() => remove(index)}>제외</button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className={styles.emptyCue}><h2>큐시트가 비어 있어요.</h2><p>조건을 다시 골라 새 큐시트를 만들어주세요.</p></section>
      )}

      <section className={styles.savePanel}>
        <div><label htmlFor="cue-name">행사 플랜 이름</label><input id="cue-name" value={name} onChange={(event) => { setName(event.target.value); setSavedId(null); }} /></div>
        <button onClick={save} disabled={!cue.length || !name.trim() || Boolean(savedId) || saving}>{savedId ? "저장 완료" : saving ? "저장 중…" : "행사 플랜 저장"}</button>
        {savedId && <p className={styles.savedMessage}>{saveMessage} <Link href={`/play/${savedId}`}>지금 진행 시작 →</Link></p>}
      </section>

      <section className={styles.actions}>
        <Link className={styles.secondary} href="/games">게임 더 둘러보기</Link>
        <Link className={styles.secondary} href="/cuesheets">저장한 행사</Link>
        <Link className={styles.primary} href="/create">새 조건으로 만들기</Link>
      </section>
    </>
  );
}
