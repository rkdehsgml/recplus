"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BrandSelect from "@/app/ui/brand-select";
import { saveCustomGameToCloud, submitCustomGame } from "@/lib/custom-game-store";
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
  const [gameId] = useState(() => `custom-${crypto.randomUUID()}`);
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
  const [saving, setSaving] = useState(false);
  const [requestReview, setRequestReview] = useState(false);
  const [sharingConsent, setSharingConsent] = useState(false);
  const [submissionNote, setSubmissionNote] = useState("");

  function togglePlace(place: Place) {
    setSelectedPlaces((current) => current.includes(place) ? current.filter((item) => item !== place) : [...current, place]);
  }

  function updateStep(index: number, value: string) {
    setSteps((current) => current.map((step, stepIndex) => stepIndex === index ? value : step));
  }

  function updateItem(key: string, patch: Partial<ItemDraft>) {
    setItems((current) => current.map((item) => item.key === key ? { ...item, ...patch } : item));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const trimmedSteps = steps.map((step) => step.trim());

    if (name.trim().length < 2) return setError("게임 이름을 두 글자 이상 입력해주세요.");
    if (description.trim().length < 8) return setError("게임을 설명하는 문장을 조금 더 적어주세요.");
    if (!selectedPlaces.length) return setError("가능한 장소를 하나 이상 골라주세요.");
    if (trimmedSteps.length < 3 || trimmedSteps.some((step) => !step)) return setError("진행 순서를 세 단계 이상 모두 채워주세요.");

    const preparedItems = items.map((item) => ({ ...item, prompt: item.prompt.trim(), answer: item.answer.trim() })).filter((item) => item.prompt || item.answer);
    if (preparedItems.some((item) => !item.prompt || !item.answer)) return setError("문제·제시어는 문제와 답을 한 세트로 입력해주세요.");
    if (requestReview && !sharingConsent) return setError("커뮤니티 공개 검수를 요청하려면 공개 동의가 필요해요.");

    const game = {
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
    } as const;
    saveCustomGame(game);

    setSaving(true);
    const cloud = await saveCustomGameToCloud(game);
    if (cloud === "signed-out") {
      setSaving(false);
      if (requestReview) {
        setError("게임은 이 기기에 저장했어요. 공개 검수를 요청하려면 먼저 로그인해주세요.");
        return;
      }
      router.push("/games");
      return;
    }
    if (cloud === "failed") {
      setSaving(false);
      setError("게임은 이 기기에 저장했지만 계정에 동기화하지 못했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (requestReview) {
      const submitted = await submitCustomGame(gameId, submissionNote);
      if (submitted === "failed") {
        setSaving(false);
        setError("게임은 계정에 저장했지만 검수 요청을 보내지 못했어요. 다시 시도해주세요.");
        return;
      }
    }

    router.push(requestReview ? "/games?submitted=1" : "/games?created=1");
  }

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.intro}><p>MY GAME</p><h1>우리 모임만의<br />게임을 만들어요.</h1><span>먼저 이 기기에 안전하게 저장하고, 로그인한 경우 계정에도 동기화해 어디서든 다시 열 수 있어요.</span></div>

        <section className={styles.section}>
          <h2>기본 정보</h2>
          <label>게임 이름<input value={name} onChange={(event) => setName(event.target.value)} placeholder="예: 우리 과 밸런스 게임" maxLength={40} /></label>
          <label>게임 설명<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="누가, 어떤 상황에서, 무엇을 하며 즐기는 게임인지 적어주세요. 예: 팀별로 제한 시간 안에 초성을 보고 정답을 많이 맞히는 퀴즈예요." maxLength={150} /></label>
          <div className={styles.twoColumns}>
            <label>게임 계보<BrandSelect value={origin} onValueChange={setOrigin} options={gameOrigins.map((item) => ({ value: item, label: gameOriginLabels[item] }))} /></label>
            <label>게임 유형<BrandSelect value={archetype} onValueChange={setArchetype} options={archetypes.map((item) => ({ value: item, label: archetypeLabels[item] }))} /></label>
            <label>추천 구간<BrandSelect value={phase} onValueChange={setPhase} options={phases.map((item) => ({ value: item, label: phaseLabels[item] }))} /></label>
          </div>
        </section>

        <section className={styles.section}>
          <h2>진행 환경</h2>
          <span className={styles.label}>가능한 장소</span>
          <div className={styles.chips}>{places.map((item) => <button type="button" className={selectedPlaces.includes(item) ? styles.selected : ""} onClick={() => togglePlace(item)} key={item}>{placeLabels[item]}</button>)}</div>
          <div className={styles.twoColumns}>
            <label>권장 시간<BrandSelect value={duration} onValueChange={setDuration} options={[5, 10, 15, 20, 30].map((item) => ({ value: item, label: `${item}분` }))} /></label>
            <label>진행 방식<BrandSelect value={mode} onValueChange={setMode} options={[{ value: "both", label: "팀·개인 모두" }, { value: "team", label: "팀전" }, { value: "personal", label: "개인전" }] as const} /></label>
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

        <section className={styles.section}>
          <div className={styles.sectionHead}><div><h2>커뮤니티 공개 <small>선택</small></h2><p>다른 진행자도 볼 수 있도록 운영자 검수를 요청할 수 있어요.</p></div></div>
          <label className={styles.consentRow}><input type="checkbox" checked={requestReview} onChange={(event) => setRequestReview(event.target.checked)} /><span>이 게임의 공개 검수를 요청할게요.</span></label>
          {requestReview && <div className={styles.reviewFields}>
            <label>운영자에게 남길 말 <small>선택</small><textarea value={submissionNote} onChange={(event) => setSubmissionNote(event.target.value)} maxLength={1000} placeholder="게임의 출처나 진행 팁을 알려주세요." /></label>
            <label className={styles.consentRow}><input type="checkbox" checked={sharingConsent} onChange={(event) => setSharingConsent(event.target.checked)} /><span>입력한 게임 내용과 문항이 검수 후 레크플러스 라이브러리에 공개되는 것에 동의합니다.</span></label>
          </div>}
        </section>

        {error && <p className={styles.error} role="alert">{error}</p>}
        <button className={styles.submit} type="submit" disabled={saving}>{saving ? "저장 중…" : requestReview ? "저장하고 검수 요청" : "내 게임으로 저장"} <span>→</span></button>
      </form>
    </main>
  );
}
