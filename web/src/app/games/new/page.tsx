"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCustomGameItems } from "@/lib/game-catalog";
import { saveCustomGame } from "@/lib/custom-games";
import { archetypeLabels, archetypes, phaseLabels, phases, placeLabels, places, type Archetype, type Phase, type Place, type PlayMode } from "@/lib/game-types";
import styles from "./page.module.css";

export default function NewGamePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [archetype, setArchetype] = useState<Archetype>("TALK");
  const [phase, setPhase] = useState<Phase>("main");
  const [duration, setDuration] = useState(10);
  const [mode, setMode] = useState<PlayMode>("both");
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>(["room"]);
  const [steps, setSteps] = useState(["", "", ""]);
  const [prompts, setPrompts] = useState("");
  const [error, setError] = useState("");

  function togglePlace(place: Place) {
    setSelectedPlaces((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  }

  function updateStep(index: number, value: string) {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? value : step));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedSteps = steps.map((step) => step.trim());

    if (name.trim().length < 2) return setError("게임 이름을 두 글자 이상 입력해주세요.");
    if (description.trim().length < 8) return setError("게임을 설명하는 문장을 조금 더 적어주세요.");
    if (!selectedPlaces.length) return setError("가능한 장소를 하나 이상 골라주세요.");
    if (trimmedSteps.some((step) => !step)) return setError("진행 순서 세 칸을 모두 채워주세요.");

    const gameId = `custom-${crypto.randomUUID()}`;
    const itemValues = prompts.split("\n").map((item) => item.trim()).filter(Boolean);

    saveCustomGame({
      id: gameId,
      name: name.trim(),
      archetype,
      phase,
      duration,
      places: selectedPlaces,
      mode,
      energy: 3,
      description: description.trim(),
      hostScript: trimmedSteps[0],
      ruleSteps: trimmedSteps as [string, string, string],
      items: createCustomGameItems(gameId, itemValues, archetype),
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
          <label>게임 설명<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="이 게임이 어떤 분위기에서 재미있는지 짧게 적어주세요." maxLength={150} /></label>
          <div className={styles.twoColumns}>
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
          <h2>이렇게 진행하세요</h2>
          <p className={styles.hint}>진행자가 그대로 읽거나 참고할 수 있는 세 단계예요.</p>
          {steps.map((step, index) => <label className={styles.step} key={index}><b>{index + 1}</b><input value={step} onChange={(event) => updateStep(index, event.target.value)} placeholder={`${index + 1}단계 진행 방법`} maxLength={100} /></label>)}
        </section>

        <section className={styles.section}>
          <h2>문제·제시어 <small>선택</small></h2>
          <p className={styles.hint}>한 줄에 하나씩 적어주세요. 퀴즈는 ‘문제 → 정답’ 형식으로 쓰면 진행자만 정답을 확인할 수 있어요.</p>
          <textarea value={prompts} onChange={(event) => setPrompts(event.target.value)} placeholder={"예: [음식] ㄸㅂㅇ → 떡볶이\n예: 평생 치킨만 vs 평생 피자만"} rows={5} />
        </section>

        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.submit} type="submit">내 게임으로 저장 <span>→</span></button>
      </form>
    </main>
  );
}
