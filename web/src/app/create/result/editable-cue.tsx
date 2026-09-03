"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { RecommendedGame, RecommendationInput } from "@/engine/recommend";
import { saveCueSheet } from "@/lib/cuesheets";
import { saveCueSheetToCloud } from "@/lib/event-plan-store";
import { phaseLabels, placeLabels, type GameDefinition, type Phase } from "@/lib/game-types";
import styles from "./page.module.css";

type EditableCueProps = {
  games: GameDefinition[];
  initialCue: RecommendedGame[];
  input: RecommendationInput;
};

function fitsCurrentConditions(game: GameDefinition, input: RecommendationInput) {
  const people = game.profile?.people;
  const teams = game.profile?.recommendedTeams;
  return game.places.includes(input.place)
    && (game.mode === "both" || game.mode === input.mode)
    && (!people || (input.people >= people.min && (people.max === undefined || input.people <= people.max)))
    && (!input.teams?.length || !teams || (input.teams.length >= teams.min && input.teams.length <= teams.max));
}

export default function EditableCue({ games, initialCue, input }: EditableCueProps) {
  const [cue, setCue] = useState(initialCue);
  const [name, setName] = useState(`${placeLabels[input.place]} ${input.targetMinutes}분 행사 플랜`);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [onlyMatchingGames, setOnlyMatchingGames] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<"all" | Phase>("all");
  const [gameQuery, setGameQuery] = useState("");
  const total = useMemo(() => cue.reduce((sum, game) => sum + game.allocatedDuration, 0), [cue]);
  const addableGames = useMemo(() => {
    const selectedIds = new Set(cue.map((game) => game.id));
    const query = gameQuery.trim().toLocaleLowerCase("ko-KR");
    return games
      .filter((game) => !selectedIds.has(game.id))
      .filter((game) => !onlyMatchingGames || fitsCurrentConditions(game, input))
      .filter((game) => selectedPhase === "all" || game.phase === selectedPhase)
      .filter((game) => !query || `${game.name} ${game.description}`.toLocaleLowerCase("ko-KR").includes(query))
      .sort((left, right) => Number(fitsCurrentConditions(right, input)) - Number(fitsCurrentConditions(left, input)) || left.name.localeCompare(right.name, "ko"));
  }, [cue, gameQuery, games, input, onlyMatchingGames, selectedPhase]);

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

  function addGame(game: GameDefinition) {
    setCue((current) => [...current, {
      ...game,
      allocatedDuration: Math.max(5, game.duration),
      reason: "조건을 확인한 뒤 직접 큐시트에 추가한 게임이에요.",
    }]);
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
        <section className={styles.emptyCue}><h2>큐시트가 비어 있어요.</h2><p>추천 조건에 딱 맞는 게임이 없어도 라이브러리에서 직접 추가할 수 있어요.</p><button type="button" onClick={() => setPickerOpen(true)}>게임 추가하기</button></section>
      )}

      {cue.length > 0 && <section className={styles.addBar}>
        <div><strong>다른 게임도 섞어볼까요?</strong><span>라이브러리에서 검색해 큐시트에 바로 추가할 수 있어요.</span></div>
        <button type="button" onClick={() => setPickerOpen(true)}>＋ 게임 추가</button>
      </section>}

      {pickerOpen && createPortal(<div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setPickerOpen(false)}>
        <section className={styles.gameModal} role="dialog" aria-modal="true" aria-label="라이브러리에서 게임 추가" onMouseDown={(event) => event.stopPropagation()}>
          <div className={styles.modalHead}>
            <div><p>GAME LIBRARY</p><h2>큐시트에 추가할 게임 찾기</h2><span>전체 라이브러리를 검색하고, 필요하면 현재 행사 조건에 맞는 게임만 골라보세요.</span></div>
            <button type="button" onClick={() => setPickerOpen(false)} aria-label="게임 검색 닫기">×</button>
          </div>
          <div className={styles.modalTools}>
            <input autoFocus value={gameQuery} onChange={(event) => setGameQuery(event.target.value)} placeholder="게임 이름 또는 설명으로 검색" aria-label="추가할 게임 검색" />
            <button className={onlyMatchingGames ? styles.filterActive : ""} type="button" onClick={() => setOnlyMatchingGames((current) => !current)}>{onlyMatchingGames ? "조건 맞춤만 표시 중" : "조건 맞춤만 보기"}</button>
          </div>
          <div className={styles.phaseFilters} aria-label="게임 단계 필터">
            {(["all", "opening", "icebreak", "main", "finale"] as const).map((phase) => <button className={selectedPhase === phase ? styles.filterActive : ""} key={phase} type="button" onClick={() => setSelectedPhase(phase)}>{phase === "all" ? "전체 단계" : phaseLabels[phase]}</button>)}
          </div>
          <p className={styles.modalCount}>{onlyMatchingGames ? "현재 행사 조건에 맞는 게임" : "전체 라이브러리"} {addableGames.length}개</p>
          {addableGames.length ? <div className={styles.modalList}>{addableGames.map((game) => <article key={game.id}><div><span>{phaseLabels[game.phase]}</span>{game.source === "custom" && <b>내 게임</b>}</div><h3>{game.name}</h3><p>{game.description}</p><small>{game.duration}분 · {game.mode === "both" ? "팀·개인 가능" : game.mode === "team" ? "팀전" : "개인전"}</small><button type="button" onClick={() => addGame(game)}>큐시트에 추가</button></article>)}</div> : <div className={styles.modalEmpty}><strong>검색 조건에 맞는 게임이 없어요.</strong><span>검색어 또는 필터를 바꿔 다시 찾아보세요.</span><button type="button" onClick={() => { setGameQuery(""); setOnlyMatchingGames(false); setSelectedPhase("all"); }}>필터 초기화</button></div>}
        </section>
      </div>, document.body)}

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
