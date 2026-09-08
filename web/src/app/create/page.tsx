"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PlayMode } from "@/lib/game-types";
import MobileStepFooter from "./mobile-step-footer";
import styles from "./page.module.css";

const places = [
  { id: "room", icon: "🏠", title: "과방 · 강의실", description: "앉아서 할 수 있는 실내 레크" },
  { id: "restaurant", icon: "🍻", title: "술집 · 식당", description: "테이블 중심의 가벼운 진행" },
  { id: "hall", icon: "🎤", title: "강당 · 대형 공간", description: "여럿이 움직이며 즐기는 레크" },
  { id: "bus", icon: "🚌", title: "버스 이동", description: "앉은 자리에서 바로 시작하는 게임" },
  { id: "outdoor", icon: "🌿", title: "야외", description: "움직임이 있는 단체 레크" },
];

const peopleOptions = [8, 20, 40, 80];
const timeOptions = [30, 60, 90, 120];

type Place = (typeof places)[number]["id"];
export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [place, setPlace] = useState<Place>("room");
  const [people, setPeople] = useState(20);
  const [peopleInput, setPeopleInput] = useState("20");
  const [mode, setMode] = useState<PlayMode>("team");
  const [teamCount, setTeamCount] = useState(4);
  const [teamCountInput, setTeamCountInput] = useState("4");
  const [teamNames, setTeamNames] = useState(["1조", "2조", "3조", "4조"]);
  const [time, setTime] = useState(90);

  const selectedPlace = places.find((item) => item.id === place)!;
  const next = () => setStep((current) => Math.min(current + 1, 3));
  const previous = () => setStep((current) => Math.max(current - 1, 1));

  function updatePeople(value: string) {
    if (!/^\d*$/.test(value)) return;
    setPeopleInput(value);
    setPeople(value === "" ? 0 : Number(value));
  }

  function selectPeople(value: number) {
    setPeople(value);
    setPeopleInput(String(value));
  }

  function updateTeamTotal(value: string) {
    if (!/^\d*$/.test(value)) return;
    const nextTotal = value === "" ? 0 : Number(value);
    setTeamCountInput(value);
    setTeamCount(nextTotal);
    setTeamNames((current) => Array.from({ length: nextTotal }, (_, index) => current[index] || `${index + 1}조`));
  }

  function updateTeamName(index: number, value: string) {
    setTeamNames((current) => current.map((name, teamIndex) => teamIndex === index ? value.slice(0, 20) : name));
  }

  function createEventPlan() {
    const params = new URLSearchParams({ place, people: String(people), mode, time: String(time) });
    if (mode !== "personal") params.set("teams", JSON.stringify(teamNames.map((name, index) => ({ id: `team-${index + 1}`, name: name.trim() || `${index + 1}조` }))));
    router.push(`/create/result?${params.toString()}`);
  }

  return (
    <main className={styles.page}>
      <div className={styles.workspace}>
        <aside className={styles.desktopRail} aria-label="행사 준비 단계">
          <div className={styles.railIntro}><p>EVENT BUILDER</p><h1>모임 정보를<br />먼저 맞춰볼까요?</h1><span>세 가지 정보만 고르면 바로 쓸 수 있는 행사 플랜을 만들어드려요.</span></div>
          <nav className={styles.stepNav} aria-label="단계 이동">
            {[{ id: 1, label: "장소", value: selectedPlace.title }, { id: 2, label: "인원·방식", value: `${people}명 · ${mode === "team" ? `${teamCount}조 팀전` : mode === "personal" ? "개인전" : `${teamCount}조 + 개인 이벤트`}` }, { id: 3, label: "진행 시간", value: `${time}분` }].map((item) => <button className={step === item.id ? styles.stepNavActive : ""} type="button" onClick={() => setStep(item.id)} key={item.id}><i>{item.id}</i><span><strong>{item.label}</strong><small>{item.value}</small></span></button>)}
          </nav>
          <div className={styles.railTip}><span>✦</span><p>플랜은 만든 뒤에도 게임 순서와 시간을 자유롭게 바꿀 수 있어요.</p></div>
        </aside>

        <section className={styles.wizard}>
        <div className={styles.progress} aria-label={`${step} / 3 단계`}>
          {[1, 2, 3].map((item) => <span className={item <= step ? styles.active : ""} key={item} />)}
        </div>

        {step === 1 && (
          <div className={styles.step}>
            <p className={styles.stepLabel}>STEP 1 / 3</p>
            <h1>어떤 환경에서<br />모이나요?</h1>
            <p className={styles.description}>장소에 맞춰 실제로 진행 가능한 게임부터 추천해드려요.</p>
            <div className={styles.options}>
              {places.map((item) => (
                <button className={`${styles.option} ${place === item.id ? styles.selected : ""}`} key={item.id} onClick={() => setPlace(item.id)}>
                  <span className={styles.optionIcon}>{item.icon}</span>
                  <span><strong>{item.title}</strong><small>{item.description}</small></span>
                  <b aria-hidden="true">{place === item.id ? "✓" : ""}</b>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <p className={styles.stepLabel}>STEP 2 / 3</p>
            <h1>몇 명이서<br />어떻게 하나요?</h1>
            <p className={styles.description}>팀전 사이에 개인전 이벤트를 넣을 계획이라면 혼합 진행을 골라보세요.</p>
            <div className={styles.choiceGroup}>
              <span className={styles.choiceLabel}>참가 인원</span>
              <div className={styles.peopleInput}><input aria-label="참가 인원" type="number" min="0" inputMode="numeric" value={peopleInput} onChange={(event) => updatePeople(event.target.value)} /><span>명</span></div>
              <div className={styles.chips}>{peopleOptions.map((item) => <button className={people === item ? styles.chipSelected : ""} key={item} onClick={() => selectPeople(item)}>{item}명</button>)}</div>
            </div>
            <div className={styles.choiceGroup}>
              <span className={styles.choiceLabel}>진행 방식</span>
              <div className={styles.modeCards}>
                <button className={mode === "team" ? styles.modeSelected : ""} aria-pressed={mode === "team"} onClick={() => setMode("team")}><span>🏆</span><strong>팀전</strong><small>조별 점수로 더 신나게</small><b>{mode === "team" ? "선택됨" : "선택"}</b></button>
                <button className={mode === "personal" ? styles.modeSelected : ""} aria-pressed={mode === "personal"} onClick={() => setMode("personal")}><span>🙋</span><strong>개인전</strong><small>가볍고 빠르게 진행</small><b>{mode === "personal" ? "선택됨" : "선택"}</b></button>
                <button className={`${styles.modeMixed} ${mode === "both" ? styles.modeSelected : ""}`} aria-pressed={mode === "both"} onClick={() => setMode("both")}><span>🔀</span><strong>혼합 진행</strong><small>팀전 중간에 개인 이벤트도</small><b>{mode === "both" ? "선택됨" : "선택"}</b></button>
              </div>
            </div>
            {mode !== "personal" && <div className={styles.choiceGroup}>
              <div className={styles.teamHeading}><span className={styles.choiceLabel}>조 구성</span><label><input aria-label="조 수" type="number" min="0" inputMode="numeric" value={teamCountInput} onChange={(event) => updateTeamTotal(event.target.value)} /><span>조</span></label></div>
              <p className={styles.teamHint}>{mode === "both" ? "팀전은 이 조 구성으로 진행하고, 개인전 이벤트는 참가자별로 점수를 기록할 수 있어요." : "기본 조 이름은 지금 바꿀 수 있고, 구성원 배정은 나중에 추가할 수 있어요."}</p>
              <div className={styles.teamNames}>{teamNames.map((name, index) => <label key={index}><span>{index + 1}</span><input value={name} onChange={(event) => updateTeamName(index, event.target.value)} placeholder={`${index + 1}조`} /></label>)}</div>
            </div>}
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <p className={styles.stepLabel}>STEP 3 / 3</p>
            <h1>얼마나<br />진행하나요?</h1>
            <p className={styles.description}>게임별 시간을 자동으로 나눠드릴게요.</p>
            <div className={styles.timeOptions}>{timeOptions.map((item) => <button className={time === item ? styles.timeSelected : ""} key={item} onClick={() => setTime(item)}>{item}<small>분</small></button>)}</div>
            <div className={styles.selectionPreview}>
              <span>이렇게 만들어드려요</span>
              <strong>{selectedPlace.icon} {selectedPlace.title} · 👥 {people}명 {mode === "team" ? `· 🏆 ${teamCount}조 팀전` : mode === "personal" ? "· 🙋 개인전" : `· 🏆 ${teamCount}조 + 🙋 개인 이벤트`} · ⏱ {time}분</strong>
            </div>
          </div>
        )}
        </section>
      </div>

      <footer className={styles.desktopFooter}>
        {step > 1 ? <button className={styles.backButton} onClick={previous}><span aria-hidden="true">←</span> 이전 단계</button> : <span />}
        {step < 3 ? <button className={styles.primaryButton} onClick={next}>다음 단계 <span aria-hidden="true">→</span></button> : <button className={styles.primaryButton} onClick={createEventPlan}>행사 플랜 만들기 <span aria-hidden="true">→</span></button>}
      </footer>
      <MobileStepFooter className={styles.mobileFooter} currentStep={step} onNext={next} onPrevious={previous} onSubmit={createEventPlan} />
    </main>
  );
}
