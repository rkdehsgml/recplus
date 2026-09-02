"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminAccess, type AdminAccess } from "@/lib/admin-access";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  archetypeLabels,
  archetypes,
  difficultyLabels,
  eventContextLabels,
  eventContexts,
  gameOriginLabels,
  gameOrigins,
  gameSeries,
  gameSeriesLabels,
  phaseLabels,
  phases,
  placeLabels,
  places,
  type Archetype,
  type EventContext,
  type GameDifficulty,
  type GameItemKind,
  type GameOrigin,
  type GameSeries,
  type Phase,
  type Place,
  type PlayMode,
} from "@/lib/game-types";
import styles from "./new/page.module.css";
import editorStyles from "./game-editor.module.css";

type ItemDraft = {
  answer: string;
  hint: string;
  key: string;
  kind: GameItemKind;
  prompt: string;
};

type EditableGameRow = {
  archetype: Archetype;
  contexts: string[];
  description: string;
  difficulty: GameDifficulty | null;
  duration_minutes: number;
  energy: number;
  game_items: Array<{ answer: string | null; hint: string | null; id: string; kind: GameItemKind; position: number; prompt: string }> | null;
  host_script: string;
  mode: PlayMode;
  name: string;
  origin: GameOrigin | null;
  people_max: number | null;
  people_min: number | null;
  phase: Phase;
  places: string[];
  preparations: string[];
  rule_steps: string[];
  series: string[];
  visibility: "private" | "public" | "unlisted";
};

type GameEditorProps = { gameId?: string; mode: "create" | "edit" };

function emptyItem(key: string): ItemDraft {
  return { key, kind: "prompt", prompt: "", answer: "", hint: "" };
}

function asKnownValues<T extends string>(values: readonly T[], input: string[] | null | undefined, fallback: T[]): T[] {
  const selected = (input ?? []).filter((value): value is T => values.includes(value as T));
  return selected.length ? selected : fallback;
}

export default function GameEditor({ gameId, mode: editorMode }: GameEditorProps) {
  const router = useRouter();
  const [access, setAccess] = useState<AdminAccess | null>(null);
  const [loaded, setLoaded] = useState(editorMode === "create");
  const [loadError, setLoadError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [archetype, setArchetype] = useState<Archetype>("TALK");
  const [origin, setOrigin] = useState<GameOrigin>("classic");
  const [selectedSeries, setSelectedSeries] = useState<GameSeries[]>([]);
  const [phase, setPhase] = useState<Phase>("main");
  const [duration, setDuration] = useState(10);
  const [mode, setMode] = useState<PlayMode>("both");
  const [energy, setEnergy] = useState(3);
  const [difficulty, setDifficulty] = useState<GameDifficulty>("easy");
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>(["room"]);
  const [selectedContexts, setSelectedContexts] = useState<EventContext[]>(["mt"]);
  const [peopleMin, setPeopleMin] = useState(4);
  const [peopleMax, setPeopleMax] = useState(30);
  const [preparations, setPreparations] = useState("없음");
  const [hostScript, setHostScript] = useState("");
  const [steps, setSteps] = useState(["", "", ""]);
  const [items, setItems] = useState<ItemDraft[]>([emptyItem("item-1")]);
  const [publishNow, setPublishNow] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const currentAccess = await getAdminAccess();
      if (!active) return;
      setAccess(currentAccess);
      if (currentAccess.status !== "admin" || editorMode !== "edit" || !gameId) return;

      const supabase = createSupabaseBrowserClient();
      const { data, error: gameError } = await supabase
        .from("games")
        .select("name, archetype, origin, series, phase, duration_minutes, places, mode, energy, description, host_script, rule_steps, people_min, people_max, contexts, preparations, difficulty, visibility, game_items ( id, kind, prompt, answer, hint, position )")
        .eq("id", gameId)
        .single();

      if (!active) return;
      if (gameError || !data) {
        setLoadError("게임 정보를 불러오지 못했어요. 게임이 삭제되었거나 관리자 권한을 확인해주세요.");
        return;
      }

      const game = data as unknown as EditableGameRow;
      setName(game.name);
      setDescription(game.description);
      setArchetype(game.archetype);
      setOrigin(gameOrigins.includes(game.origin as GameOrigin) ? game.origin as GameOrigin : "classic");
      setSelectedSeries(asKnownValues(gameSeries, game.series, []));
      setPhase(game.phase);
      setDuration(game.duration_minutes);
      setMode(game.mode);
      setEnergy(game.energy);
      setDifficulty(game.difficulty ?? "moderate");
      setSelectedPlaces(asKnownValues(places, game.places, ["room"]));
      setSelectedContexts(asKnownValues(eventContexts, game.contexts, ["mt"]));
      setPeopleMin(game.people_min ?? 1);
      setPeopleMax(game.people_max ?? Math.max(1, game.people_min ?? 1));
      setPreparations((game.preparations ?? []).join(", "));
      setHostScript(game.host_script);
      setSteps([game.rule_steps?.[0] ?? "", game.rule_steps?.[1] ?? "", game.rule_steps?.[2] ?? ""]);
      setItems((game.game_items ?? []).slice().sort((left, right) => left.position - right.position).map((item) => ({
        key: item.id,
        kind: item.kind,
        prompt: item.prompt,
        answer: item.answer ?? "",
        hint: item.hint ?? "",
      })));
      setPublishNow(game.visibility === "public");
      setLoaded(true);
    }

    void load();
    return () => { active = false; };
  }, [editorMode, gameId]);

  function togglePlace(place: Place) {
    setSelectedPlaces((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  }

  function toggleContext(context: EventContext) {
    setSelectedContexts((current) => current.includes(context) ? current.filter((item) => item !== context) : [...current, context]);
  }

  function toggleSeries(series: GameSeries) {
    setSelectedSeries((current) => current.includes(series) ? current.filter((item) => item !== series) : [...current, series]);
  }

  function updateStep(index: number, value: string) {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? value : step));
  }

  function updateItem(key: string, patch: Partial<ItemDraft>) {
    setItems((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setItems((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedSteps = steps.map((step) => step.trim());
    const preparedItems = items
      .map((item) => ({ ...item, prompt: item.prompt.trim(), answer: item.answer.trim(), hint: item.hint.trim() }))
      .filter((item) => item.prompt);
    if (name.trim().length < 2) return setError("게임 이름을 두 글자 이상 입력해주세요.");
    if (description.trim().length < 8) return setError("게임을 설명하는 문장을 조금 더 적어주세요.");
    if (!selectedPlaces.length || !selectedContexts.length) return setError("가능한 장소와 추천 상황을 각각 하나 이상 골라주세요.");
    if (!hostScript.trim() || trimmedSteps.some((step) => !step)) return setError("진행 멘트와 세 단계 진행 순서를 모두 채워주세요.");
    if (peopleMin < 1 || peopleMax < peopleMin) return setError("권장 인원 범위를 다시 확인해주세요.");
    if (preparedItems.some((item) => item.kind === "quiz" && !item.answer)) return setError("퀴즈 문항에는 정답을 입력해주세요.");

    const currentAccess = await getAdminAccess();
    if (currentAccess.status !== "admin") return setError("관리자 권한을 다시 확인해주세요.");

    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const id = editorMode === "create" ? `official-${crypto.randomUUID()}` : gameId;
    if (!id) {
      setSaving(false);
      setError("게임 식별자를 확인하지 못했어요.");
      return;
    }

    const gamePayload = {
      visibility: publishNow ? "public" : "private",
      moderation_status: publishNow ? "published" : "draft",
      name: name.trim(),
      archetype,
      origin,
      series: selectedSeries,
      phase,
      duration_minutes: duration,
      places: selectedPlaces,
      mode,
      energy,
      description: description.trim(),
      host_script: hostScript.trim(),
      rule_steps: trimmedSteps,
      people_min: peopleMin,
      people_max: peopleMax,
      contexts: selectedContexts,
      preparations: preparations.split(/[\n,]/).map((item) => item.trim()).filter(Boolean),
      difficulty,
      published_at: publishNow ? new Date().toISOString() : null,
    };

    const { error: gameError } = editorMode === "create"
      ? await supabase.from("games").insert({ id, source: "official", ...gamePayload })
      : await supabase.from("games").update(gamePayload).eq("id", id);

    if (gameError) {
      setSaving(false);
      setError(editorMode === "create" ? "게임을 저장하지 못했어요. 관리자 권한과 DB 마이그레이션을 확인해주세요." : "게임 기본 정보를 저장하지 못했어요. 관리자 권한을 확인해주세요.");
      return;
    }

    if (editorMode === "edit") {
      const { error: deleteItemsError } = await supabase.from("game_items").delete().eq("game_id", id);
      if (deleteItemsError) {
        setSaving(false);
        setError("기존 문제팩을 교체하지 못했어요. 기본 정보는 저장되었으니 다시 시도해주세요.");
        return;
      }
    }

    if (preparedItems.length) {
      const { error: itemError } = await supabase.from("game_items").insert(preparedItems.map((item, index) => ({
        id: `${id}-item-${crypto.randomUUID()}`,
        game_id: id,
        kind: item.kind,
        prompt: item.prompt,
        ...(item.kind === "quiz" && item.answer ? { answer: item.answer } : {}),
        ...(item.kind === "quiz" && item.hint ? { hint: item.hint } : {}),
        position: index,
      })));

      if (itemError) {
        if (editorMode === "create") await supabase.from("games").delete().eq("id", id);
        setSaving(false);
        setError(editorMode === "create" ? "문제팩 저장에 실패해 게임 등록을 되돌렸어요. 다시 시도해주세요." : "문제팩 저장에 실패했어요. 문항을 다시 확인한 뒤 저장해주세요.");
        return;
      }
    }

    router.replace("/admin");
    router.refresh();
  }

  if (!access) return <main className={styles.state}>관리자 권한을 확인하고 있어요…</main>;
  if (access.status !== "admin") return <main className={styles.state}><span>🔐</span><h1>관리자만 게임을 {editorMode === "create" ? "등록" : "수정"}할 수 있어요.</h1><p>관리자 역할을 연결한 뒤 다시 시도해주세요.</p><Link href="/admin">관리 화면으로</Link></main>;
  if (loadError) return <main className={styles.state}><span>⚠️</span><h1>게임을 열 수 없어요.</h1><p>{loadError}</p><Link href="/admin">관리 화면으로</Link></main>;
  if (!loaded) return <main className={styles.state}>게임 정보를 불러오고 있어요…</main>;

  const creating = editorMode === "create";
  return (
    <main className={styles.page}>
      <div className={styles.header}><Link href="/admin">← 관리 화면</Link><span>{creating ? "공식 게임 등록" : "공식 게임 편집"}</span></div>
      <form className={styles.form} onSubmit={submit}>
        <section className={styles.intro}><p>{creating ? "NEW OFFICIAL GAME" : "EDIT OFFICIAL GAME"}</p><h1>{creating ? <>게임 하나를<br />라이브러리에 추가하세요.</> : <>게임 내용을<br />최신 상태로 관리하세요.</>}</h1><span>게임 계보와 프로그램 컬렉션, 기본 정보, 문제팩을 함께 저장하면 라이브러리에 같은 기준으로 반영됩니다.</span></section>

        <section className={styles.section}>
          <h2>기본 정보</h2>
          <label>게임 이름<input value={name} onChange={(event) => setName(event.target.value)} placeholder="예: 팀 대항 초성 퀴즈" maxLength={100} /></label>
          <label>게임 설명<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="어떤 자리에서 어떻게 즐기는 게임인지 짧게 적어주세요." maxLength={1000} /></label>
          <div className={styles.columns}><label>게임 계보<select value={origin} onChange={(event) => setOrigin(event.target.value as GameOrigin)}>{gameOrigins.map((item) => <option key={item} value={item}>{gameOriginLabels[item]}</option>)}</select></label><label>게임 유형<select value={archetype} onChange={(event) => setArchetype(event.target.value as Archetype)}>{archetypes.map((item) => <option key={item} value={item}>{archetypeLabels[item]}</option>)}</select></label><label>추천 구간<select value={phase} onChange={(event) => setPhase(event.target.value as Phase)}>{phases.map((item) => <option key={item} value={item}>{phaseLabels[item]}</option>)}</select></label></div>
          <span className={styles.label}>프로그램 컬렉션 <small>방송에서 확인한 포맷일 때만 선택</small></span><div className={styles.chips}>{gameSeries.map((series) => <button className={selectedSeries.includes(series) ? styles.selected : ""} type="button" onClick={() => toggleSeries(series)} key={series}>{gameSeriesLabels[series]}</button>)}</div>
        </section>

        <section className={styles.section}>
          <h2>추천 조건</h2>
          <span className={styles.label}>가능한 장소</span><div className={styles.chips}>{places.map((place) => <button className={selectedPlaces.includes(place) ? styles.selected : ""} type="button" onClick={() => togglePlace(place)} key={place}>{placeLabels[place]}</button>)}</div>
          <span className={styles.label}>추천 모임 상황</span><div className={styles.chips}>{eventContexts.map((context) => <button className={selectedContexts.includes(context) ? styles.selected : ""} type="button" onClick={() => toggleContext(context)} key={context}>{eventContextLabels[context]}</button>)}</div>
          <div className={styles.columns}><label>권장 최소 인원<input type="number" min="1" value={peopleMin} onChange={(event) => setPeopleMin(Number(event.target.value))} /></label><label>권장 최대 인원<input type="number" min="1" value={peopleMax} onChange={(event) => setPeopleMax(Number(event.target.value))} /></label></div>
          <div className={styles.columns}><label>권장 시간<select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{[5, 10, 15, 20, 30, 45, 60].map((item) => <option key={item} value={item}>{item}분</option>)}</select></label><label>진행 방식<select value={mode} onChange={(event) => setMode(event.target.value as PlayMode)}><option value="both">팀·개인 모두</option><option value="team">팀전</option><option value="personal">개인전</option></select></label></div>
          <div className={styles.columns}><label>에너지<select value={energy} onChange={(event) => setEnergy(Number(event.target.value))}>{[1, 2, 3, 4, 5].map((item) => <option key={item} value={item}>{item}단계</option>)}</select></label><label>진행 난이도<select value={difficulty} onChange={(event) => setDifficulty(event.target.value as GameDifficulty)}>{Object.entries(difficultyLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></div>
          <label>준비물 <small>쉼표 또는 줄바꿈으로 구분</small><input value={preparations} onChange={(event) => setPreparations(event.target.value)} placeholder="예: 점수판, 펜" maxLength={300} /></label>
        </section>

        <section className={styles.section}>
          <h2>진행 방법</h2>
          <label>진행자 첫 멘트<textarea value={hostScript} onChange={(event) => setHostScript(event.target.value)} placeholder="진행자가 그대로 읽을 수 있는 첫 안내 멘트를 적어주세요." maxLength={1000} /></label>
          <p className={styles.hint}>참가자에게 보여줄 흐름을 세 단계로 정리해주세요.</p>
          {steps.map((step, index) => <label className={styles.step} key={index}><b>{index + 1}</b><input value={step} onChange={(event) => updateStep(index, event.target.value)} placeholder={`${index + 1}단계 진행 방법`} maxLength={1000} /></label>)}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}><div><h2>문제·제시어</h2><p>문항을 고치거나 삭제하고, 위·아래 버튼으로 노출 순서를 바꿀 수 있어요.</p></div><button type="button" onClick={() => setItems((current) => [...current, emptyItem(`item-${crypto.randomUUID()}`)])}>＋ 문항 추가</button></div>
          <div className={styles.itemList}>{items.map((item, index) => <article className={styles.item} key={item.key}>
            <div className={styles.itemTop}><strong>{index + 1}번 문항</strong><span className={editorStyles.itemActions}><button type="button" onClick={() => moveItem(index, -1)} disabled={index === 0}>위로</button><button type="button" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>아래로</button><button type="button" onClick={() => setItems((current) => current.filter((currentItem) => currentItem.key !== item.key))}>삭제</button></span></div>
            <div className={styles.columns}><label>유형<select value={item.kind} onChange={(event) => updateItem(item.key, { kind: event.target.value as GameItemKind })}><option value="prompt">질문 카드</option><option value="quiz">퀴즈</option><option value="host-only">진행자 전용 제시어</option></select></label><label>내용<input value={item.prompt} onChange={(event) => updateItem(item.key, { prompt: event.target.value })} placeholder="예: 평생 치킨만 vs 평생 피자만" maxLength={3000} /></label></div>
            {item.kind === "quiz" && <div className={styles.columns}><label>정답<input value={item.answer} onChange={(event) => updateItem(item.key, { answer: event.target.value })} placeholder="예: 떡볶이" maxLength={3000} /></label><label>힌트 <small>선택</small><input value={item.hint} onChange={(event) => updateItem(item.key, { hint: event.target.value })} placeholder="예: 분식집 대표 메뉴" maxLength={3000} /></label></div>}
          </article>)}</div>
        </section>

        <label className={styles.publish}><input type="checkbox" checked={publishNow} onChange={(event) => setPublishNow(event.target.checked)} /><span><b>{creating ? "등록 직후 라이브러리에 공개" : "저장 후 라이브러리에 공개"}</b><small>끄면 라이브러리에서 숨긴 초안으로 저장합니다.</small></span></label>
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.submit} type="submit" disabled={saving}>{saving ? "저장 중…" : publishNow ? (creating ? "공식 게임 등록 및 공개 →" : "변경사항 저장 및 공개 →") : "초안으로 저장 →"}</button>
      </form>
    </main>
  );
}
