"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MINIMUM_ITEM_COUNT, RECOMMENDED_ITEM_COUNT, itemTargets } from "@/data/item-targets";
import { getAdminAccess, type AdminAccess } from "@/lib/admin-access";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

type ManagedGame = {
  id: string;
  itemCount: number;
  moderation_status: "archived" | "draft" | "pending_review" | "published" | "rejected";
  name: string;
  source: "official" | "user";
  updated_at: string;
  visibility: "private" | "public" | "unlisted";
};

type GameItemCountRow = { game_id: string };

const statusLabel = {
  archived: "보관됨",
  draft: "초안",
  pending_review: "검수 대기",
  published: "공개됨",
  rejected: "반려됨",
} as const;

function itemTargetForManagedGame(game: ManagedGame) {
  return itemTargets[game.id] ?? (game.source === "official" ? RECOMMENDED_ITEM_COUNT : MINIMUM_ITEM_COUNT);
}

function itemReadinessLabel(game: ManagedGame) {
  const target = itemTargetForManagedGame(game);
  if (game.itemCount >= target) return "목표 충족";
  if (game.itemCount >= MINIMUM_ITEM_COUNT) return "최소 충족";
  return "문항 부족";
}

export default function AdminContent() {
  const [access, setAccess] = useState<AdminAccess | null>(null);
  const [games, setGames] = useState<ManagedGame[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [notice, setNotice] = useState("");

  const loadGames = useCallback(async () => {
    setLoadingGames(true);
    setNotice("");

    try {
      const supabase = createSupabaseBrowserClient();
      const [gameResult, itemResult] = await Promise.all([
        supabase
          .from("games")
          .select("id, name, source, visibility, moderation_status, updated_at")
          .order("updated_at", { ascending: false }),
        supabase.from("game_items").select("game_id"),
      ]);

      if (gameResult.error) {
        setNotice("게임 목록을 불러오지 못했어요. DB 마이그레이션과 관리자 권한 설정을 확인해주세요.");
        return;
      }

      const itemCountByGame = new Map<string, number>();
      if (!itemResult.error) {
        (itemResult.data as GameItemCountRow[] ?? []).forEach((item) => {
          itemCountByGame.set(item.game_id, (itemCountByGame.get(item.game_id) ?? 0) + 1);
        });
      }

      setGames((gameResult.data as Omit<ManagedGame, "itemCount">[] ?? [])
        .map((game) => ({ ...game, itemCount: itemCountByGame.get(game.id) ?? 0 })));
      if (itemResult.error) setNotice("게임 목록은 불러왔지만 문제·제시어 수를 확인하지 못했어요. 문항 권한 설정을 확인해주세요.");
    } catch {
      setNotice("게임 관리 정보를 불러오지 못했어요. 연결과 관리자 설정을 확인해주세요.");
    } finally {
      setLoadingGames(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    void getAdminAccess().then((result) => {
      if (!active) return;
      setAccess(result);
      if (result.status === "admin") void loadGames();
    });

    return () => {
      active = false;
    };
  }, [loadGames]);

  async function changeStatus(game: ManagedGame, next: "archived" | "published") {
    const publishing = next === "published";
    const message = publishing ? `“${game.name}”을 라이브러리에 공개할까요?` : `“${game.name}”을 보관할까요? 공개 라이브러리에서는 숨겨집니다.`;
    if (!window.confirm(message)) return;

    setNotice("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("games")
      .update(publishing
        ? { moderation_status: "published", visibility: "public", published_at: new Date().toISOString() }
        : { moderation_status: "archived", visibility: "private" })
      .eq("id", game.id);

    if (error) {
      setNotice("상태를 바꾸지 못했어요. 관리자 권한을 다시 확인해주세요.");
      return;
    }

    setNotice(publishing ? "게임을 공개했어요." : "게임을 보관했어요.");
    await loadGames();
  }

  async function deleteGame(game: ManagedGame) {
    if (!window.confirm(`“${game.name}”을 완전히 삭제할까요? 연결된 문제·제시어도 함께 삭제되며 되돌릴 수 없습니다.`)) return;

    setNotice("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.from("games").delete().eq("id", game.id);
    if (error) {
      setNotice("게임을 삭제하지 못했어요. 관리자 권한을 다시 확인해주세요.");
      return;
    }

    setNotice("게임과 연결된 문제팩을 삭제했어요.");
    await loadGames();
  }

  if (!access) {
    return <main className={styles.state}>관리자 권한을 확인하고 있어요…</main>;
  }

  if (access.status === "signed-out") {
    return <main className={styles.state}><span>🔐</span><h1>관리자 로그인이 필요해요.</h1><p>게임을 등록하고 공개 상태를 바꾸려면 먼저 로그인해주세요.</p><Link href="/login">로그인하기 →</Link></main>;
  }

  if (access.status === "not-admin") {
    return <main className={styles.state}><span>🛠️</span><h1>관리자 권한을 연결해주세요.</h1><p>현재 계정은 콘텐츠 관리 권한이 없어요. Supabase SQL Editor에서 이 계정의 UUID를 관리자 역할에 한 번만 등록하면 됩니다.</p><code>{access.userId}</code><p className={styles.setupHint}>등록 방법은 프로젝트의 <b>supabase/ADMIN_SETUP.md</b> 파일에 정리해뒀어요.</p></main>;
  }

  const published = games.filter((game) => game.moderation_status === "published").length;
  const drafts = games.filter((game) => game.moderation_status !== "published" && game.moderation_status !== "archived").length;
  const publishedOfficialGames = games.filter((game) => game.source === "official" && game.moderation_status === "published");
  const currentItemCount = publishedOfficialGames.reduce((sum, game) => sum + game.itemCount, 0);
  const targetItemCount = publishedOfficialGames.reduce((sum, game) => sum + itemTargetForManagedGame(game), 0);
  const minimumReadyGames = publishedOfficialGames.filter((game) => game.itemCount >= MINIMUM_ITEM_COUNT).length;
  const targetReadyGames = publishedOfficialGames.filter((game) => game.itemCount >= itemTargetForManagedGame(game)).length;
  const contentProgress = targetItemCount ? Math.min(100, Math.round((currentItemCount / targetItemCount) * 100)) : 0;
  const contentAtRisk = publishedOfficialGames
    .filter((game) => game.itemCount < MINIMUM_ITEM_COUNT)
    .sort((left, right) => left.itemCount - right.itemCount || left.name.localeCompare(right.name, "ko"));

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div><p>CONTENT ADMIN</p><h1>게임 라이브러리를<br />직접 관리하세요.</h1><span>새 게임과 문제팩을 등록하고, 공개 상태를 한 곳에서 관리합니다.</span></div>
        <Link href="/admin/games/new">＋ 공식 게임 등록</Link>
      </section>

      <section className={styles.summary} aria-label="게임 관리 요약">
        <article><span>전체 게임</span><strong>{games.length}</strong></article>
        <article><span>공개 중</span><strong>{published}</strong></article>
        <article><span>검수·초안</span><strong>{drafts}</strong></article>
        <article><span>최소 문항 충족</span><strong>{minimumReadyGames}<small> / {publishedOfficialGames.length}</small></strong></article>
      </section>

      <section className={styles.readiness} aria-label="공개 게임 문제팩 충족도">
        <div className={styles.readinessHead}><div><p>CONTENT READINESS</p><h2>문제팩 충족도</h2><span>공개된 공식 게임만 집계합니다. 최소 {MINIMUM_ITEM_COUNT}개부터 실제 현장 투입 가능으로 봅니다.</span></div><strong>{contentProgress}<small>%</small></strong></div>
        <div className={styles.progressTrack} aria-label={`목표 문항 ${targetItemCount}개 중 ${currentItemCount}개`}><i style={{ width: `${contentProgress}%` }} /></div>
        <div className={styles.progressMeta}><span>현재 <b>{currentItemCount}</b>개</span><span>시즌 목표 <b>{targetItemCount}</b>개 · 목표 충족 {targetReadyGames}게임</span></div>
        {contentAtRisk.length > 0 ? <div className={styles.riskList}><p><b>먼저 채울 게임</b><span>문항 수가 {MINIMUM_ITEM_COUNT}개 미만인 공개 게임이에요.</span></p><div>{contentAtRisk.slice(0, 5).map((game) => <Link href={`/admin/games/${game.id}/edit`} key={game.id}><strong>{game.name}</strong><span>{game.itemCount} / {itemTargetForManagedGame(game)}개 · {MINIMUM_ITEM_COUNT - game.itemCount}개 더 필요</span><b>문항 채우기 →</b></Link>)}</div></div> : publishedOfficialGames.length > 0 ? <p className={styles.readyMessage}>공개 게임이 모두 최소 문항 수를 채웠어요. 이제 목표 수량과 문항 품질을 점검하세요.</p> : <p className={styles.readyMessage}>공개한 공식 게임이 생기면 여기에서 문항 준비 상태를 추적할 수 있어요.</p>}
      </section>

      <section className={styles.list}>
        <div className={styles.listHead}><div><p>GAME LIBRARY</p><h2>전체 게임</h2></div><button type="button" onClick={() => void loadGames()} disabled={loadingGames}>{loadingGames ? "불러오는 중…" : "새로고침"}</button></div>
        {notice && <p className={styles.notice} role="status">{notice}</p>}
        {games.length ? <div className={styles.rows}>{games.map((game) => <article className={styles.row} key={game.id}>
          <div><strong>{game.name}</strong><span>{game.source === "official" ? "공식 게임" : "사용자 제출"} · 문항 {game.itemCount} / {itemTargetForManagedGame(game)}개 · 수정 {new Intl.DateTimeFormat("ko-KR", { month: "short", day: "numeric" }).format(new Date(game.updated_at))}</span></div>
          <div className={styles.rowActions}><i className={`${styles.status} ${styles[game.moderation_status]}`}>{statusLabel[game.moderation_status]}</i><i className={`${styles.itemStatus} ${game.itemCount >= itemTargetForManagedGame(game) ? styles.targetReady : game.itemCount >= MINIMUM_ITEM_COUNT ? styles.minimumReady : styles.itemShort}`}>{itemReadinessLabel(game)}</i><Link href={`/admin/games/${game.id}/edit`}>수정</Link><Link href={`/games/${game.id}`}>보기</Link>{game.moderation_status !== "published" && <button type="button" onClick={() => void changeStatus(game, "published")}>공개</button>}{game.moderation_status !== "archived" && <button type="button" onClick={() => void changeStatus(game, "archived")}>보관</button>}<button className={styles.delete} type="button" onClick={() => void deleteGame(game)}>삭제</button></div>
        </article>)}</div> : <div className={styles.empty}><span>✦</span><h2>아직 DB 게임이 없어요.</h2><p>마이그레이션을 적용하면 기본 공식 게임이 라이브러리에 들어옵니다.</p></div>}
      </section>
    </main>
  );
}
