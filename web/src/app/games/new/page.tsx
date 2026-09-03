"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCustomGameItems } from "@/lib/game-catalog";
import { saveCustomGame } from "@/lib/custom-games";
import { archetypeLabels, archetypes, gameOriginLabels, gameOrigins, phaseLabels, phases, placeLabels, places, type Archetype, type GameOrigin, type Phase, type Place, type PlayMode } from "@/lib/game-types";
import styles from "./page.module.css";

type ItemDraft = { answer: string; key: string; prompt: string };

function emptyItem(key: string): ItemDraft {
  return { key, prompt: "", answer: "" };
}

export default function NewGamePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [archetype, setArchetype] = useState<Archetype>("TALK");
  const [origin, setOrigin] = useState<GameOrigin>("original");
  const [phase, setPhase] = useState<Phase>("main");
  const [duration, setDuration] = useState(10);
  const [mode, setMode] = useState<PlayMode>("both");
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>(["room"]);
  const [steps, setSteps] = useState(["", "", ""]);
  const [items, setItems] = useState<ItemDraft[]>([emptyItem("item-1")]);
  const [error, setError] = useState("");

  function togglePlace(place: Place) {
    setSelectedPlaces((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  }

  function updateStep(index: number, value: string) {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? value : step));
  }

  function updateItem(key: string, patch: Partial<ItemDraft>) {
    setItems((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedSteps = steps.map((step) => step.trim());

    if (name.trim().length < 2) return setError("게임 이름을 두 글자 이상 입력해주세요.");
    if (description.trim().length < 8) return setError("게임을 설명하는 문장을 조금 더 적어주세요.");
    if (!selectedPlaces.length) return setError("가능한 장소를 하나 이상 골라주세요.");
    if (trimmedSteps.length < 3 || trimmedSteps.some((step) => !step)) return setError("진행 순서를 세 단계 이상 모두 채워주세요.");

    const gameId = `custom-${crypto.randomUUID()}`;
    const preparedItems = items.map((item) => ({ ...item, prompt: item.prompt.trim(), answer: item.answer.trim() })).filter((item) => item.prompt || item.answer);
    if (preparedItems.some((item) => !item.prompt || !item.answer)) return setError("문제·제시어는 문제와 답을 한 세트로 입력해주세요.");

    saveCustomGame({
      id: gameId,
      name: name.trim(),
      archetype,
      origin,
      phase,
      duration,
      places: selectedPlaces,
      mode,
      energy: 3,
      description: description.trim(),
      hostScript: trimmedSteps[0],
      ruleSteps: trimmedSteps,
      items: createCustomGameItems(gameId, preparedItems, archetype),
      source: "custom",
      createdAt: new Date().toISOString(),
    });

    router.push("/games");
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.intro}><p>MY GAME</p><h1>우리 모임만의<br />게임을 만들어요.</h1><span>저장된 게임은 이 기기에서만 보이며, 나중에 커뮤니티 제안으로 확장할 수 있어요.</span></div>

        <section className={styles.section}>
          <h2>기본 정보</h2>
          <label>게임 이름<input value={name} onChange={(event) => setName(event.target.value)} placeholder="예: 우리 과 밸런스 게임" maxLength={40} /></label>
          <label>게임 설명<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="누가, 어떤 상황에서, 무엇을 하며 즐기는 게임인지 적어주세요. 예: 팀별로 제한 시간 안에 초성을 보고 정답을 많이 맞히는 퀴즈예요." maxLength={150} /></label>
          <div className={styles.twoColumns}>
            <label>게임 계보<select value={origin} onChange={(event) => setOrigin(event.target.value as GameOrigin)}>{gameOrigins.map((item) => <option key={item} value={item}>{gameOriginLabels[item]}</option>)}</select></label>
            <label>게임 유형<select value={archetype} onChange={(event) => setArchetype(event.target.value as Archetype)}>{archetypes.map((item) => <option key={item} value={item}>{archetypeLabels[item]}</option>)}</select></label>
            <label>추천 구간<select value={phase} onChange={(event) => setPhase(event.target.value as Phase)}>{phases.map((item) => <option key={item} value={item}>{phaseLabels[item]}</option>)}</select></label>
          </div>
        </section>

        <section className={styles.section}>
          <h2>진행 환경</h2>
          <span className={styles.label}>가능한 장소</span>
          <div className={styles.chips}>{places.map((item) => <button type="button" className={selectedPlaces.includes(item) ? styles.selected : ""} onClick={() => togglePlace(item)} key={item}>{placeLabels[item]}</button>)}</div>
          <div className={styles.twoColumns}>
            <label>권장 시간<select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>{[5, 10, 15, 20, 30].map((item) => <option key={item} value={item}>{item}분</option>)}</select></label>
            <label>진행 방식<select value={mode} onChange={(event) => setMode(event.target.value as PlayMode)}><option value="both">팀·개인 모두</option><option value="team">팀전</option><option value="personal">개인전</option></select></label>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}><div><h2>이렇게 진행하세요</h2><p>진행자가 그대로 읽거나 참고할 수 있게 순서대로 적어주세요. 최소 3단계부터 자유롭게 늘릴 수 있어요.</p></div><button type="button" onClick={() => setSteps((current) => [...current, ""])}>＋ 단계 추가</button></div>
          {steps.map((step, index) => <label className={styles.step} key={index}><b>{index + 1}</b><input value={step} onChange={(event) => updateStep(index, event.target.value)} placeholder={`${index + 1}단계 진행 방법`} maxLength={100} />{steps.length > 3 && <button type="button" className={styles.removeStep} onClick={() => setSteps((current) => current.filter((_, stepIndex) => stepIndex !== index))}>삭제</button>}</label>)}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}><div><h2>문제·제시어 <small>선택</small></h2><p>문제와 답을 한 세트로 저장합니다. 답은 진행 화면에서 바로 보이지 않고 필요할 때만 확인할 수 있어요.</p></div><button type="button" onClick={() => setItems((current) => [...current, emptyItem(`item-${crypto.randomUUID()}`)])}>＋ 문항 추가</button></div>
          <div className={styles.itemList}>{items.map((item, index) => <article className={styles.item} key={item.key}><div className={styles.itemTop}><strong>{index + 1}번 문항</strong>{items.length > 1 && <button type="button" onClick={() => setItems((current) => current.filter((currentItem) => currentItem.key !== item.key))}>삭제</button>}</div><label>문제·제시어<input value={item.prompt} onChange={(event) => updateItem(item.key, { prompt: event.target.value })} placeholder="예: [음식] ㄸㅂㅇ" maxLength={3000} /></label><label>답<input value={item.answer} onChange={(event) => updateItem(item.key, { answer: event.target.value })} placeholder="예: 떡볶이" maxLength={3000} /></label></article>)}</div>
        </section>

        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.submit} type="submit">내 게임으로 저장 <span>→</span></button>
      </form>
    </main>
  );
}
