"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { saveCustomGameToCloud } from "@/lib/custom-game-store";
import { updateCustomGame } from "@/lib/custom-games";
import { gameItemsFor } from "@/lib/game-catalog";
import type { GameDefinition, GameItem } from "@/lib/game-types";
import { useCustomGames } from "@/lib/use-custom-games";
import styles from "../../new/page.module.css";

type ItemDraft = Pick<GameItem, "answer" | "hint" | "id" | "kind" | "prompt">;

function itemDraft(gameId: string): ItemDraft {
  return { id: `${gameId}-item-${crypto.randomUUID()}`, kind: "quiz", prompt: "", answer: "", hint: "" };
}

export default function EditCustomGameContent({ id }: { id: string }) {
  const { games, loaded, setGames } = useCustomGames();
  const game = games.find((candidate) => candidate.id === id && candidate.source === "custom");

  if (!game && !loaded) return <main className={styles.page}><section className={styles.intro}><p>MY GAME</p><h1>게임을 불러오고 있어요.</h1></section></main>;
  if (!game) return <main className={styles.page}><section className={styles.intro}><p>MY GAME</p><h1>수정할 게임을 찾지 못했어요.</h1><span>로그인 계정이나 이 기기에 저장된 게임인지 확인해주세요.</span><Link href="/games">게임 라이브러리로 →</Link></section></main>;
  if (game.moderationStatus === "pending_review" || game.moderationStatus === "published") return <main className={styles.page}><section className={styles.intro}><p>MY GAME</p><h1>현재는 수정할 수 없어요.</h1><span>{game.moderationStatus === "pending_review" ? "검수 대기 중인 게임은 결과가 나올 때까지 내용이 잠깁니다." : "공개된 게임은 운영자에게 문의해 공개를 해제한 뒤 수정할 수 있습니다."}</span><Link href={`/games/${game.id}`}>게임 상세로 →</Link></section></main>;

  return <CustomGameEditForm key={`${game.id}-${game.updatedAt ?? "local"}`} initialGame={game} setGames={setGames} />;
}

function CustomGameEditForm({ initialGame: game, setGames }: { initialGame: GameDefinition; setGames: Dispatch<SetStateAction<GameDefinition[]>> }) {
  const router = useRouter();
  const [name, setName] = useState(game.name);
  const [description, setDescription] = useState(game.description);
  const [hostScript, setHostScript] = useState(game.hostScript);
  const [steps, setSteps] = useState<string[]>(game.ruleSteps);
  const [items, setItems] = useState<ItemDraft[]>(() => gameItemsFor(game).map((item) => ({
    id: item.id,
    kind: item.kind,
    prompt: item.prompt,
    answer: item.answer ?? "",
    hint: item.hint ?? "",
  })));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateItem(itemId: string, patch: Partial<ItemDraft>) {
    setItems((current) => current.map((item) => item.id === itemId ? { ...item, ...patch } : item));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const trimmedSteps = steps.map((step) => step.trim()).filter(Boolean);
    const preparedItems = items
      .map((item) => ({ ...item, prompt: item.prompt.trim(), answer: item.answer?.trim(), hint: item.hint?.trim(), gameId: game.id }))
      .filter((item) => item.prompt);
    if (name.trim().length < 2) return setError("게임 이름을 두 글자 이상 입력해주세요.");
    if (description.trim().length < 8) return setError("게임 설명을 조금 더 적어주세요.");
    if (!hostScript.trim() || trimmedSteps.length < 3) return setError("진행 멘트와 세 단계 이상 진행 순서를 입력해주세요.");
    if (preparedItems.some((item) => item.kind === "quiz" && !item.answer)) return setError("퀴즈 문항에는 정답을 입력해주세요.");

    setSaving(true);
    const updated: GameDefinition = {
      ...game,
      name: name.trim(),
      description: description.trim(),
      hostScript: hostScript.trim(),
      ruleSteps: trimmedSteps,
      items: preparedItems,
      prompts: undefined,
      moderationStatus: "draft",
      reviewNote: undefined,
      updatedAt: new Date().toISOString(),
    };
    setGames(updateCustomGame(game.id, updated));
    const result = await saveCustomGameToCloud(updated);
    setSaving(false);
    if (result === "failed") return setError("이 기기에는 저장했지만 계정에 동기화하지 못했어요. 연결을 확인한 뒤 다시 저장해주세요.");
    router.replace(`/games/${game.id}?updated=1`);
    router.refresh();
  }

  return <main className={styles.page}>
    <form className={styles.form} onSubmit={submit}>
      <section className={styles.intro}><p>EDIT MY GAME</p><h1>게임을 다듬고<br />다시 검수를 요청하세요.</h1><span>반려된 게임은 검토 메모를 확인해 수정하면 다시 초안 상태로 저장됩니다.</span></section>
      <section className={styles.section}><h2>기본 내용</h2><label>게임 이름<input value={name} onChange={(event) => setName(event.target.value)} maxLength={100} /></label><label>게임 설명<textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={1000} /></label><label>진행자 첫 멘트<textarea value={hostScript} onChange={(event) => setHostScript(event.target.value)} maxLength={1000} /></label></section>
      <section className={styles.section}><div className={styles.sectionHead}><div><h2>진행 순서</h2><p>최소 세 단계를 남겨주세요.</p></div><button type="button" onClick={() => setSteps((current) => [...current, ""])}>＋ 단계 추가</button></div>{steps.map((step, index) => <label className={styles.step} key={index}><b>{index + 1}</b><input value={step} onChange={(event) => setSteps((current) => current.map((value, currentIndex) => currentIndex === index ? event.target.value : value))} maxLength={1000} />{steps.length > 3 && <button className={styles.removeStep} type="button" onClick={() => setSteps((current) => current.filter((_, currentIndex) => currentIndex !== index))}>삭제</button>}</label>)}</section>
      <section className={styles.section}><div className={styles.sectionHead}><div><h2>문제·제시어</h2><p>문항 내용과 정답을 함께 고칠 수 있어요.</p></div><button type="button" onClick={() => setItems((current) => [...current, itemDraft(game.id)])}>＋ 문항 추가</button></div><div className={styles.itemList}>{items.map((item, index) => <article className={styles.item} key={item.id}><div className={styles.itemTop}><strong>{index + 1}번 문항</strong><button type="button" onClick={() => setItems((current) => current.filter((candidate) => candidate.id !== item.id))}>삭제</button></div><label>내용<input value={item.prompt} onChange={(event) => updateItem(item.id, { prompt: event.target.value })} maxLength={3000} /></label>{item.kind === "quiz" && <><label>정답<input value={item.answer ?? ""} onChange={(event) => updateItem(item.id, { answer: event.target.value })} maxLength={3000} /></label><label>힌트 <small>선택</small><input value={item.hint ?? ""} onChange={(event) => updateItem(item.id, { hint: event.target.value })} maxLength={3000} /></label></>}</article>)}</div></section>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.submit} type="submit" disabled={saving}>{saving ? "저장 중…" : "수정 내용 저장 →"}</button>
    </form>
  </main>;
}
