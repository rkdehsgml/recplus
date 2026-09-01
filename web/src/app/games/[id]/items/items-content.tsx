"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games } from "@/data/games";
import { itemTargetFor } from "@/data/item-targets";
import { loadCustomGames, updateCustomGame } from "@/lib/custom-games";
import { gameItemsFor, itemKindFor } from "@/lib/game-catalog";
import {
  createPackItem,
  duplicateItemIds,
  hasCategoryPrefix,
  loadItemPacks,
  normalizeItemText,
  parseItemLines,
  saveItemPack,
  usesCategoryPrefix,
} from "@/lib/item-packs";
import { archetypeLabels, type GameDefinition, type GameItem, type GameItemKind } from "@/lib/game-types";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

/** 브리프 2-4의 정답 성격 구분을 진행자에게 그대로 안내합니다. */
const kindGuides: Record<GameItemKind, { label: string; guide: string; placeholder: string }> = {
  quiz: { label: "문제 카드", guide: "정답이 하나인 퀴즈예요. 진행 화면에서는 진행자만 먼저 정답을 확인합니다.", placeholder: "예: [음식] ㄸㅂㅇ" },
  "host-only": { label: "MC 전용 제시어", guide: "제시어 자체가 답이라, 진행 화면에서 참가자에게 보이지 않게 표시됩니다.", placeholder: "예: 기타 치기" },
  prompt: { label: "질문 카드", guide: "정답이 없는 질문·주제예요. 진행 화면에 그대로 보여줍니다.", placeholder: "예: 평생 치킨만 vs 평생 피자만" },
};

export default function ItemPackContent({ id }: { id: string }) {
  const [game, setGame] = useState<GameDefinition | null>();
  const [ownItems, setOwnItems] = useState<GameItem[]>([]);
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [bulk, setBulk] = useState("");
  const [bulkOpen, setBulkOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const found = games.find((item) => item.id === id) ?? loadCustomGames().find((item) => item.id === id) ?? null;
      setGame(found);
      if (!found) return;
      setOwnItems(found.source === "custom" ? gameItemsFor(found) : loadItemPacks()[found.id] ?? []);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [id]);

  /** 공식 게임의 배포 문항은 읽기 전용입니다. 내 게임은 모든 문항이 진행자 소유예요. */
  const seedItems = useMemo(() => game?.source === "official" ? gameItemsFor(game) : [], [game]);
  const allItems = useMemo(() => [...seedItems, ...ownItems], [seedItems, ownItems]);
  const duplicates = useMemo(() => duplicateItemIds(allItems), [allItems]);
  const categoryRule = useMemo(() => usesCategoryPrefix(seedItems), [seedItems]);
  const kind = game ? itemKindFor(game.archetype) : "prompt";

  const missingAnswers = allItems.filter((item) => item.kind === "quiz" && !item.answer?.trim());
  const missingCategory = categoryRule ? allItems.filter((item) => !hasCategoryPrefix(item.prompt)) : [];

  function persist(next: GameItem[]) {
    if (!game) return;
    setOwnItems(next);
    if (game.source === "custom") updateCustomGame(game.id, { items: next });
    else saveItemPack(game.id, next);
  }

  function addOne(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!game) return;

    const trimmed = prompt.trim();
    if (!trimmed) return setNotice("문항을 입력해주세요.");
    if (allItems.some((item) => normalizeItemText(item.prompt) === normalizeItemText(trimmed))) return setNotice("이미 같은 문항이 있어요.");

    persist([...ownItems, createPackItem(game.id, kind, trimmed, answer, hint)]);
    setPrompt("");
    setAnswer("");
    setHint("");
    setNotice(`추가했어요. 지금 ${allItems.length + 1}개`);
  }

  function addBulk() {
    if (!game) return;

    const parsed = parseItemLines(game.id, kind, bulk);
    if (!parsed.length) return setNotice("붙여넣은 내용에서 문항을 찾지 못했어요.");

    const seen = new Set(allItems.map((item) => normalizeItemText(item.prompt)));
    const added = parsed.filter((item) => {
      const key = normalizeItemText(item.prompt);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (!added.length) return setNotice("모두 이미 있는 문항이라 추가하지 않았어요.");

    persist([...ownItems, ...added]);
    setBulk("");
    const skipped = parsed.length - added.length;
    setNotice(`${added.length}개 추가했어요.${skipped ? ` 중복 ${skipped}개는 건너뛰었어요.` : ""}`);
  }

  function editItem(itemId: string, patch: Partial<GameItem>) {
    persist(ownItems.map((item) => item.id === itemId ? { ...item, ...patch } : item));
    setNotice("");
  }

  function removeItem(item: GameItem) {
    if (!window.confirm(`“${item.prompt}” 문항을 삭제할까요?`)) return;
    persist(ownItems.filter((current) => current.id !== item.id));
    setNotice("문항을 삭제했어요.");
  }

  if (game === undefined) return <main className={styles.state}>문제팩을 불러오고 있어요…</main>;
  if (!game) return <main className={styles.state}><h1>게임을 찾지 못했어요.</h1><p>게임 라이브러리에서 다시 찾아주세요.</p><Link href="/games">게임 라이브러리 보기</Link></main>;

  const target = itemTargetFor(game);
  const shortfall = Math.max(0, target - allItems.length);
  const guide = kindGuides[kind];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}><Link href="/items">문제팩 현황</Link><span>/</span><Link href={`/games/${game.id}`}>{game.name}</Link></div>
      <section className={styles.intro}>
        <p>CONTENT PACK</p>
        <div className={styles.introHead}>
          <span className={styles.badge}>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span>
          {game.source === "custom" && <b className={styles.own}>내 게임</b>}
        </div>
        <h1>{game.name}</h1>
        <span>{guide.guide}</span>
      </section>

      <section className={styles.status} aria-label="문항 현황">
        <div className={styles.statusHead}>
          <div><span>지금 문항</span><strong>{allItems.length}<small>/ {target}개</small></strong></div>
          <p className={shortfall ? styles.short : styles.done}>{shortfall ? `목표까지 ${shortfall}개 남았어요` : "목표를 채웠어요"}</p>
        </div>
        <div className={styles.bar} aria-hidden="true"><i className={shortfall ? "" : styles.barDone} style={{ width: `${Math.min(100, (allItems.length / target) * 100)}%` }} /></div>
        <p className={styles.statusNote}>한 세션에서 본 문항은 다시 나오지 않고, 한 바퀴를 돌면 다시 섞입니다. 문항이 적으면 같은 모임에서 금방 반복돼요.</p>
      </section>

      {(duplicates.size > 0 || missingAnswers.length > 0 || missingCategory.length > 0) && (
        <section className={styles.checks} aria-label="문항 점검 결과">
          <strong>점검할 문항이 있어요</strong>
          <div>
            {duplicates.size > 0 && <i>중복 {duplicates.size}개</i>}
            {missingAnswers.length > 0 && <i>정답 누락 {missingAnswers.length}개</i>}
            {missingCategory.length > 0 && <i>카테고리 형식 {missingCategory.length}개</i>}
          </div>
          <p>목록에서 표시된 문항을 고쳐주세요. 저장은 막지 않지만, 현장에서 그대로 나옵니다.</p>
        </section>
      )}

      <section className={styles.composer}>
        <div className={styles.composerHead}><h2>문항 추가</h2><button onClick={() => setBulkOpen((current) => !current)}>{bulkOpen ? "한 개씩 추가" : "여러 개 붙여넣기"}</button></div>

        {bulkOpen ? (
          <div className={styles.bulk}>
            <p className={styles.hint}>한 줄에 하나씩 붙여넣으세요.{kind === "quiz" ? " 퀴즈는 “문제 → 정답” 형식으로 쓰면 정답까지 함께 저장됩니다." : ""} 이미 있는 문항은 자동으로 건너뜁니다.</p>
            <textarea value={bulk} onChange={(event) => setBulk(event.target.value)} rows={7} placeholder={kind === "quiz" ? "[음식] ㄱㅂ → 김밥\n[장소] ㄴㅅㅌ → 남산타워" : `${guide.placeholder.replace("예: ", "")}\n...`} />
            <div className={styles.bulkActions}><span>{parseItemLines(game.id, kind, bulk).length}개 인식됨</span><button onClick={addBulk} disabled={!bulk.trim()}>모두 추가</button></div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={addOne}>
            <label>{guide.label}<input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder={guide.placeholder} maxLength={120} /></label>
            {kind === "quiz" && <div className={styles.twoColumns}>
              <label>정답<input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="예: 떡볶이" maxLength={60} /></label>
              <label>힌트 <small>선택</small><input value={hint} onChange={(event) => setHint(event.target.value)} placeholder="예: 분식집 대표 메뉴" maxLength={60} /></label>
            </div>}
            {categoryRule && <p className={styles.hint}>이 게임은 <b>[카테고리] 내용</b> 형식을 씁니다. 예: [음식] ㄸㅂㅇ</p>}
            <button className={styles.submit} type="submit">추가 <span>＋</span></button>
          </form>
        )}

        {notice && <p className={styles.notice} role="status">{notice}</p>}
      </section>

      <section className={styles.list}>
        <div className={styles.listHead}><h2>내가 추가한 문항</h2><span>{ownItems.length}개</span></div>
        {ownItems.length ? (
          <div className={styles.items}>
            {ownItems.map((item, index) => (
              <article className={styles.item} key={item.id}>
                <span className={styles.itemNumber}>{seedItems.length + index + 1}</span>
                <div className={styles.itemBody}>
                  <input aria-label={`${index + 1}번 문항`} value={item.prompt} onChange={(event) => editItem(item.id, { prompt: event.target.value })} maxLength={120} />
                  {item.kind === "quiz" && <input className={styles.itemAnswer} aria-label={`${index + 1}번 정답`} value={item.answer ?? ""} onChange={(event) => editItem(item.id, { answer: event.target.value })} placeholder="정답을 입력하세요" maxLength={60} />}
                  <div className={styles.flags}>
                    {duplicates.has(item.id) && <i className={styles.flagWarn}>중복</i>}
                    {item.kind === "quiz" && !item.answer?.trim() && <i className={styles.flagWarn}>정답 없음</i>}
                    {categoryRule && !hasCategoryPrefix(item.prompt) && <i className={styles.flagWarn}>카테고리 형식</i>}
                  </div>
                </div>
                <button className={styles.removeButton} onClick={() => removeItem(item)}>삭제</button>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyOwn}>아직 직접 추가한 문항이 없어요. 위에서 첫 문항을 추가해보세요.</p>
        )}
      </section>

      {seedItems.length > 0 && (
        <section className={styles.list}>
          <div className={styles.listHead}><h2>기본 제공 문항</h2><span>{seedItems.length}개</span></div>
          <p className={styles.hint}>서비스가 함께 배포하는 문항이라 여기서는 수정하지 않습니다. 바꾸고 싶다면 같은 내용을 직접 추가해서 쓰세요.</p>
          <div className={styles.items}>
            {seedItems.map((item, index) => (
              <article className={`${styles.item} ${styles.seedItem}`} key={item.id}>
                <span className={styles.itemNumber}>{index + 1}</span>
                <div className={styles.itemBody}>
                  <p>{item.prompt}</p>
                  {item.answer && <small>정답 {item.answer}</small>}
                </div>
                <b className={styles.seedBadge}>기본</b>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className={styles.actions}>
        <Link className={styles.secondary} href={`/games/${game.id}`}>게임 상세로</Link>
        <Link className={styles.secondary} href="/items">다른 게임 문제팩</Link>
        <Link className={styles.primary} href="/create">이 게임으로 행사 준비</Link>
      </section>
    </main>
  );
}
