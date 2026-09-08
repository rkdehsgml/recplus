"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import BrandSelect from "@/app/ui/brand-select";
import { playModeFor, type RecommendedGame } from "@/engine/recommend";
import { getCueSheet, type SavedCueSheet } from "@/lib/cuesheets";
import { loadCloudCueSheet } from "@/lib/event-plan-store";
import { createItemOrders, gameItemsFor, orderedGameItems, type ItemOrderByGame } from "@/lib/game-catalog";
import type { GameDefinition } from "@/lib/game-types";
import { currentItemsFor, type ItemPacksByGame } from "@/lib/item-packs";
import { clearCloudPlaySession, loadCloudPlaySession, savePlaySessionToCloud } from "@/lib/play-session-store";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useGameCatalog } from "@/lib/use-game-catalog";
import { useCustomGames } from "@/lib/use-custom-games";
import { useItemPacks } from "@/lib/use-item-packs";
import {
  clearPlaySession,
  loadPlaySession,
  savePlaySession,
  type GameProgress,
  type PersonalScore,
} from "@/lib/play-session";
import styles from "./page.module.css";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function createPersonalScores(people: number): PersonalScore[] {
  return Array.from({ length: people }, (_, index) => ({
    id: `player-${index + 1}`,
    name: `참가자 ${index + 1}`,
    score: 0,
  }));
}

function personalScoresForSession(savedScores: PersonalScore[] | undefined, people: number) {
  const defaults = createPersonalScores(people);
  if (!savedScores?.length) return defaults;

  return defaults.map((player, index) => {
    const saved = savedScores[index];
    return saved ? { ...player, name: saved.name, score: Math.max(0, saved.score) } : player;
  });
}

function playerNumber(player: PersonalScore) {
  return Number(player.id.replace("player-", "")) || 0;
}

function teamNamesForCue(cue: SavedCueSheet) {
  const names = cue.teams?.map((team, index) => team.name.trim() || `${index + 1}조`) ?? [];
  return names.length >= 2 ? names : ["A팀", "B팀"];
}

function teamScoresForSession(savedScores: number[] | undefined, teamCount: number) {
  return Array.from({ length: teamCount }, (_, index) => Math.max(0, savedScores?.[index] ?? 0));
}

/** 저장한 큐시트도 공식 게임의 최신 룰·문항을 쓰되, 진행자가 편집한 순서와 시간은 보존합니다. */
function withCurrentCatalog(cue: SavedCueSheet, officialGames: GameDefinition[], customGames: GameDefinition[], packs: ItemPacksByGame): SavedCueSheet {
  const catalog = [...customGames, ...officialGames];

  return {
    ...cue,
    games: cue.games.map((game): RecommendedGame => {
      const latest = catalog.find((candidate) => candidate.id === game.id) ?? game;

      return {
        ...latest,
        allocatedDuration: game.allocatedDuration,
        reason: game.reason,
        playMode: game.playMode ?? playModeFor(latest, cue.mode),
        items: currentItemsFor(latest, packs, catalog),
      };
    }),
  };
}

export default function PlayContent({ id }: { id: string }) {
  const { games: catalog } = useGameCatalog();
  const { games: customGames } = useCustomGames();
  const { packs } = useItemPacks();
  const catalogRef = useRef(catalog);
  const customGamesRef = useRef(customGames);
  const packsRef = useRef(packs);
  const lastCloudSaveRef = useRef(0);
  const [cue, setCue] = useState<SavedCueSheet | null>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [scores, setScores] = useState([0, 0]);
  const [personalScores, setPersonalScores] = useState<PersonalScore[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("player-1");
  const [editingNames, setEditingNames] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [itemOrders, setItemOrders] = useState<ItemOrderByGame>({});
  const [answerVisible, setAnswerVisible] = useState(false);
  const [gameProgress, setGameProgress] = useState<GameProgress[]>([]);
  const [restoredAt, setRestoredAt] = useState<string | null>(null);

  useEffect(() => {
    catalogRef.current = catalog;
    customGamesRef.current = customGames;
    packsRef.current = packs;
  }, [catalog, customGames, packs]);

  useEffect(() => {
    let active = true;

    function loadPlan(stored: SavedCueSheet | null | undefined, restoredSession = loadPlaySession(id)) {
      if (!active) return;
      const session = restoredSession;
      const saved = stored ? withCurrentCatalog(stored, catalogRef.current, customGamesRef.current, packsRef.current) : null;

      setCue(saved);
      if (!saved || !saved.games.length) return;

      const currentGameIndex = Math.min(Math.max(session?.currentIndex ?? 0, 0), saved.games.length - 1);
      const currentGame = saved.games[currentGameIndex];
      const maxSeconds = currentGame.allocatedDuration * 60;

      setCurrentIndex(currentGameIndex);
      setSecondsLeft(Math.min(Math.max(session?.secondsLeft ?? maxSeconds, 0), maxSeconds));
      setPromptIndex(Math.min(Math.max(session?.promptIndex ?? 0, 0), Math.max(gameItemsFor(currentGame).length - 1, 0)));
      setScores(teamScoresForSession(session?.scores, teamNamesForCue(saved).length));
      setPersonalScores(personalScoresForSession(session?.personalScores, saved.people));
      setGameProgress(saved.games.map((_, index) => session?.gameProgress[index] ?? "pending"));
      setItemOrders(createItemOrders(saved.games, session?.itemOrders));
      setRestoredAt(session?.updatedAt ?? null);
    }

    if (!isSupabaseConfigured()) {
      window.queueMicrotask(() => loadPlan(getCueSheet(id)));
      return () => {
        active = false;
      };
    }

    const supabase = createSupabaseBrowserClient();

    async function loadPlanForCurrentUser() {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;
      const local = getCueSheet(id);

      if (error || !data.user) {
        loadPlan(local);
        return;
      }

      const [cloud, cloudSession] = await Promise.all([loadCloudCueSheet(id), loadCloudPlaySession(id)]);
      const localSession = loadPlaySession(id);
      const newestSession = cloudSession && (!localSession || cloudSession.updatedAt > localSession.updatedAt) ? cloudSession : localSession;
      loadPlan(cloud ?? local, newestSession);
    }

    void loadPlanForCurrentUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        loadPlan(getCueSheet(id));
        return;
      }
      void loadPlanForCurrentUser();
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!cue) return;

    const saved = savePlaySession(id, { currentIndex, secondsLeft, promptIndex, scores, personalScores, gameProgress, itemOrders });
    if (!saved || !isSupabaseConfigured()) return;

    const elapsed = Date.now() - lastCloudSaveRef.current;
    const delay = Math.max(0, 5000 - elapsed);
    const timer = window.setTimeout(() => {
      lastCloudSaveRef.current = Date.now();
      void savePlaySessionToCloud(id, saved);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [cue, currentIndex, secondsLeft, promptIndex, scores, personalScores, gameProgress, itemOrders, id]);

  const currentCue = useMemo(() => cue ? withCurrentCatalog(cue, catalog, customGames, packs) : cue, [catalog, cue, customGames, packs]);
  const game = currentCue?.games[currentIndex];
  const orderedItems = useMemo(() => game ? orderedGameItems(game, itemOrders[game.id]) : [], [game, itemOrders]);
  const progress = useMemo(() => currentCue?.games.length ? ((currentIndex + 1) / currentCue.games.length) * 100 : 0, [currentCue, currentIndex]);
  const teamNames = currentCue && game?.playMode === "team" ? teamNamesForCue(currentCue) : [];
  const teamScores = teamNames.map((_, index) => scores[index] ?? 0);

  function goTo(index: number) {
    if (!currentCue || index < 0 || index >= currentCue.games.length) return;
    setCurrentIndex(index);
    setSecondsLeft(currentCue.games[index].allocatedDuration * 60);
    setRunning(false);
    setPromptIndex(0);
    setAnswerVisible(false);
  }

  function updateCurrentGameProgress(progress: GameProgress) {
    setGameProgress((current) => current.map((value, index) => index === currentIndex ? progress : value));
  }

  function moveToNext(progress: GameProgress) {
    if (!currentCue) return;
    updateCurrentGameProgress(progress);
    goTo(currentIndex + 1);
  }

  function finishSession() {
    if (!currentCue) return;

    const nextProgress = gameProgress.map((value, index) => index === currentIndex ? "completed" : value);
    setGameProgress(nextProgress);
    savePlaySession(id, { currentIndex, secondsLeft, promptIndex, scores, personalScores, gameProgress: nextProgress, itemOrders });
  }

  function restartSession() {
    if (!currentCue || !window.confirm("현재 진행 기록과 점수를 지우고 처음부터 시작할까요?")) return;

    clearPlaySession(id);
    void clearCloudPlaySession(id);
    setCurrentIndex(0);
    setSecondsLeft((currentCue.games[0]?.allocatedDuration ?? 0) * 60);
    setPromptIndex(0);
    setItemOrders(createItemOrders(currentCue.games));
    setAnswerVisible(false);
    setScores(teamScoresForSession(undefined, teamNamesForCue(currentCue).length));
    setPersonalScores(createPersonalScores(currentCue.people));
    setSelectedPlayerId("player-1");
    setEditingNames(false);
    setGameProgress(currentCue.games.map(() => "pending"));
    setRunning(false);
    setRestoredAt(null);
  }

  function resetTimer() {
    if (!game) return;
    setRunning(false);
    setSecondsLeft(game.allocatedDuration * 60);
  }

  function toggleTimer() {
    if (!game) return;
    if (running) {
      setRunning(false);
      return;
    }
    if (secondsLeft === 0) setSecondsLeft(game.allocatedDuration * 60);
    setRestoredAt(null);
    setRunning(true);
  }

  function score(team: number, amount: number) {
    setScores((current) => current.map((value, index) => index === team ? Math.max(0, value + amount) : value));
  }

  function scorePlayer(amount: number) {
    setPersonalScores((current) => current.map((player) => player.id === selectedPlayerId
      ? { ...player, score: Math.max(0, player.score + amount) }
      : player));
  }

  function renamePlayer(id: string, name: string) {
    setPersonalScores((current) => current.map((player) => player.id === id ? { ...player, name: name.slice(0, 20) } : player));
  }

  function nextItem() {
    if (orderedItems.length < 2) return;
    setPromptIndex((index) => (index + 1) % orderedItems.length);
    setAnswerVisible(false);
  }

  if (currentCue === undefined) return <main className={styles.state}>진행 화면을 준비하고 있어요…</main>;
  if (!currentCue || !game) return <main className={styles.state}><h1>큐시트를 찾지 못했어요.</h1><p>이 기기에 저장한 행사인지, 로그인한 계정의 행사인지 확인해주세요.</p><Link href="/cuesheets">저장한 큐시트 보기</Link></main>;

  const item = orderedItems[promptIndex];
  const completedCount = gameProgress.filter((progress) => progress === "completed").length;
  const skippedCount = gameProgress.filter((progress) => progress === "skipped").length;
  const selectedPlayer = personalScores.find((player) => player.id === selectedPlayerId) ?? personalScores[0];
  const leadingPlayers = [...personalScores]
    .sort((left, right) => right.score - left.score || playerNumber(left) - playerNumber(right))
    .slice(0, 5);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div><Link href="/cuesheets">← 나가기</Link><span>{currentCue.name}</span></div>
        <div className={styles.headerActions}>
          <span>{currentIndex + 1} / {currentCue.games.length}</span>
          <button onClick={restartSession}>처음부터</button>
        </div>
      </header>
      <div className={styles.progress}><i style={{ width: `${progress}%` }} /></div>

      {restoredAt && <p className={styles.restoreNotice}>저장한 진행 상태를 불러왔어요. 타이머는 안전하게 일시정지해뒀어요.</p>}

      <section className={styles.stage}>
        <div className={styles.gameInfo}><span>CURRENT GAME · {game.allocatedDuration}분</span><h1>{game.name}</h1><p>{game.description}</p></div>
        <div className={`${styles.timer} ${secondsLeft === 0 ? styles.timerDone : ""}`}>
          <span>남은 시간</span><strong>{formatTime(secondsLeft)}</strong>
          <div><button onClick={toggleTimer}>{running ? "일시정지" : secondsLeft === 0 ? "다시 시작" : "시작"}</button><button onClick={resetTimer}>초기화</button></div>
        </div>
      </section>

      <section className={styles.console}>
        <article className={styles.script}><span>진행 멘트</span><blockquote>“{game.hostScript}”</blockquote></article>
        <article className={styles.rules}><span>진행 순서</span><ol>{game.ruleSteps.map((step, index) => <li key={`${step}-${index}`}>{step}</li>)}</ol></article>
        {item && <article className={styles.prompt}>
          <span>{item.kind === "host-only" ? "MC 전용 제시어" : item.kind === "quiz" ? "문제 카드" : "질문 카드"}</span>
          {item.kind === "host-only" && <p className={styles.hostOnly}>참가자에게 보이지 않게 진행자만 확인하세요.</p>}
          <strong>{item.prompt}</strong>
          {item.kind === "quiz" && item.answer && (answerVisible
            ? <p className={styles.answer}>정답 <b>{item.answer}</b></p>
            : <button className={styles.revealAnswer} onClick={() => setAnswerVisible(true)}>정답 확인</button>)}
          {orderedItems.length > 1 && <button onClick={nextItem}>다음 카드 →</button>}
        </article>}
        {game.playMode === "team" && <article className={styles.scoreboard}><span>팀 점수판</span><div>{teamScores.map((value, team) => <div key={team}><b>{teamNames[team]}</b><strong>{value}</strong><nav><button onClick={() => score(team, -10)}>−10</button><button onClick={() => score(team, 10)}>＋10</button></nav></div>)}</div></article>}
        {game.playMode === "personal" && selectedPlayer && <article className={styles.personalScoreboard}>
          <div className={styles.personalScoreHeading}><span>개인 점수판</span><button onClick={() => setEditingNames((current) => !current)}>{editingNames ? "이름 편집 완료" : "이름 편집"}</button></div>
          <div className={styles.personalScoreControl}>
            <label>
              <span className={styles.srOnly}>점수를 기록할 참가자</span>
              <BrandSelect aria-label="점수를 기록할 참가자" value={selectedPlayer.id} onValueChange={setSelectedPlayerId} options={personalScores.map((player) => ({ value: player.id, label: player.name.trim() || player.id.replace("player-", "참가자 ") }))} variant="dark" />
            </label>
            <strong>{selectedPlayer.score}<small>점</small></strong>
            <nav><button onClick={() => scorePlayer(-10)}>−10</button><button onClick={() => scorePlayer(10)}>＋10</button></nav>
          </div>
          <ol className={styles.leaderboard}>{leadingPlayers.map((player, index) => <li key={player.id}><span>{index + 1}</span><b>{player.name.trim() || player.id.replace("player-", "참가자 ")}</b><strong>{player.score}점</strong></li>)}</ol>
          {editingNames && <div className={styles.nameEditor}><p>진행 중에도 이름을 바꿀 수 있어요.</p><div>{personalScores.map((player) => <label key={player.id}><span>{player.id.replace("player-", "참가자 ")}</span><input value={player.name} onChange={(event) => renamePlayer(player.id, event.target.value)} placeholder={player.id.replace("player-", "참가자 ")} /></label>)}</div></div>}
        </article>}
        <article className={styles.sessionStatus}><span>진행 현황</span><strong>완료 {completedCount} · 건너뜀 {skippedCount}</strong><p>{gameProgress[currentIndex] === "skipped" ? "이 게임은 건너뛴 상태예요." : gameProgress[currentIndex] === "completed" ? "완료한 게임이에요. 필요하면 다시 진행할 수 있어요." : "끝나면 다음 게임으로 넘어가세요."}</p></article>
      </section>

      <footer className={styles.controls}>
        <button onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>← 이전 게임</button>
        <div><span>현재 게임</span><strong>{game.name}</strong></div>
        {currentIndex === currentCue.games.length - 1 ? <Link href="/cuesheets" onClick={finishSession}>진행 마치기</Link> : <div className={styles.nextActions}><button className={styles.skip} onClick={() => moveToNext("skipped")}>건너뛰기</button><button className={styles.next} onClick={() => moveToNext("completed")}>다음 게임 →</button></div>}
      </footer>
    </main>
  );
}
