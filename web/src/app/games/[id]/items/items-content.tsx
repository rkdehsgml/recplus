"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { itemTargetFor } from "@/data/item-targets";
import { gameItemsFor } from "@/lib/game-catalog";
import { addedItemsFor } from "@/lib/item-packs";
import { archetypeLabels, type GameItem } from "@/lib/game-types";
import { useGameCatalog } from "@/lib/use-game-catalog";
import { useCustomGames } from "@/lib/use-custom-games";
import { useItemPacks } from "@/lib/use-item-packs";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

function ItemAnswer({ item }: { item: GameItem }) {
  const [visible, setVisible] = useState(false);

  if (item.kind !== "quiz" || !item.answer) return null;

  return (
    <button
      className={`${styles.answerButton} ${visible ? styles.answerVisible : ""}`}
      type="button"
      aria-pressed={visible}
      onClick={() => setVisible((current) => !current)}
    >
      <span>{visible ? `정답 · ${item.answer}` : "정답"}</span>
      <small>{visible ? "다시 가리기" : "클릭해서 확인"}</small>
    </button>
  );
}

export default function ItemPackContent({ id }: { id: string }) {
  const { games: catalog } = useGameCatalog();
  const { games: customGames } = useCustomGames();
  const { packs } = useItemPacks();

  const game = useMemo(
    () => customGames.find((item) => item.id === id) ?? catalog.find((item) => item.id === id) ?? null,
    [catalog, customGames, id],
  );
  const items = useMemo(() => {
    if (!game) return [];
    return [...gameItemsFor(game), ...addedItemsFor(game, packs)];
  }, [game, packs]);

  if (!game) return <main className={styles.state}><h1>게임을 찾지 못했어요.</h1><p>게임 라이브러리에서 다시 찾아주세요.</p><Link href="/games">게임 라이브러리 보기</Link></main>;

  const target = itemTargetFor(game);
  const quizCount = items.filter((item) => item.kind === "quiz" && item.answer).length;

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}><Link href={`/games/${game.id}`}>{game.name}</Link><span>/</span><span>문항 세트</span></div>
      <section className={styles.intro}>
        <p>ITEM SET</p>
        <div className={styles.introHead}>
          <span className={styles.badge}>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span>
          {game.source === "custom" && <b className={styles.own}>내 게임</b>}
        </div>
        <h1>{game.name}<br />문항 세트</h1>
        <span>이 게임에 준비된 문제·제시어를 미리 볼 수 있어요. 퀴즈 정답은 필요할 때만 눌러 확인하세요.</span>
      </section>

      <section className={styles.status} aria-label="문항 세트 현황">
        <div className={styles.statusHead}>
          <div><span>등록된 문항</span><strong>{items.length}<small>개</small></strong></div>
          <p className={items.length >= target ? styles.done : styles.short}>{quizCount ? `정답이 있는 퀴즈 ${quizCount}개 포함` : "진행용 제시어와 질문 카드"}</p>
        </div>
        <div className={styles.bar} aria-hidden="true"><i className={items.length >= target ? styles.barDone : ""} style={{ width: `${Math.min(100, (items.length / target) * 100)}%` }} /></div>
        <p className={styles.statusNote}>현장 진행에서는 문항이 섞여 나오며, 한 세션에서 본 문항은 다시 나오지 않습니다.</p>
      </section>

      <section className={styles.list} aria-label="등록된 문항 목록">
        <div className={styles.listHead}><h2>등록된 문항</h2><span>{items.length}개</span></div>
        {items.length ? (
          <div className={styles.items}>
            {items.map((item, index) => (
              <article className={styles.item} key={item.id}>
                <span className={styles.itemNumber}>{index + 1}</span>
                <div className={styles.itemBody}>
                  <p>{item.prompt}</p>
                  {item.kind === "host-only" && <small>진행자 전용 제시어</small>}
                  {item.kind === "prompt" && <small>질문 카드</small>}
                </div>
                <ItemAnswer item={item} />
              </article>
            ))}
          </div>
        ) : <p className={styles.emptyOwn}>아직 공개된 문항이 없어요. 게임 진행 방식은 게임 상세에서 확인할 수 있어요.</p>}
      </section>

      <section className={styles.actions}>
        <Link className={styles.secondary} href={`/games/${game.id}`}>게임 상세로</Link>
        <Link className={styles.primary} href="/create">이 게임으로 행사 준비</Link>
      </section>
    </main>
  );
}
