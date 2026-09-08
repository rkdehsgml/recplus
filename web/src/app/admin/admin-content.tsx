"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAdminAccess, type AdminAccess } from "@/lib/admin-access";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

type GameStatus = "archived" | "draft" | "pending_review" | "published" | "rejected";
type DashboardFilter = "all" | GameStatus;
type ManagedGame = { id: string; itemCount: number; moderation_status: GameStatus; name: string; reviewed_at: string | null; source: "official" | "user"; submitted_at: string | null; updated_at: string; visibility: "private" | "public" | "unlisted" };
type GameItemCountRow = { game_id: string };

const statusLabel: Record<GameStatus, string> = { archived: "보관됨", draft: "개발 중", pending_review: "검수 대기", published: "공개 중", rejected: "검토 보류" };
const filters: DashboardFilter[] = ["all", "published", "draft", "pending_review", "rejected", "archived"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", { month: "short", day: "numeric" }).format(new Date(value));
}

function sourceLabel(game: ManagedGame) {
  return game.source === "official" ? "공식 게임" : "사용자 신청";
}

export default function AdminContent() {
  const [access, setAccess] = useState<AdminAccess | null>(null);
  const [games, setGames] = useState<ManagedGame[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState<DashboardFilter>("all");

  const loadGames = useCallback(async () => {
    setLoadingGames(true);
    setNotice("");
    try {
      const supabase = createSupabaseBrowserClient();
      const [gameResult, itemResult] = await Promise.all([
        supabase.from("games").select("id, name, source, visibility, moderation_status, updated_at, submitted_at, reviewed_at").order("updated_at", { ascending: false }),
        supabase.from("game_items").select("game_id"),
      ]);
      if (gameResult.error) {
        setNotice("게임 현황을 불러오지 못했어요. 최신 운영 대시보드 마이그레이션과 관리자 권한을 확인해주세요.");
        return;
      }
      const itemCountByGame = new Map<string, number>();
      if (!itemResult.error) (itemResult.data as GameItemCountRow[] ?? []).forEach((item) => itemCountByGame.set(item.game_id, (itemCountByGame.get(item.game_id) ?? 0) + 1));
      setGames((gameResult.data as Omit<ManagedGame, "itemCount">[] ?? []).map((game) => ({ ...game, itemCount: itemCountByGame.get(game.id) ?? 0 })));
      if (itemResult.error) setNotice("게임은 불러왔지만 문항 수를 확인하지 못했어요. 문항 권한 설정을 확인해주세요.");
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
    return () => { active = false; };
  }, [loadGames]);

  async function changeStatus(game: ManagedGame, next: "archived" | "published") {
    if (next === "published" && game.source === "user") {
      setNotice("사용자 신청은 검토 화면에서 공개 동의와 메모를 확인한 뒤 승인해주세요.");
      return;
    }
    const publishing = next === "published";
    if (!window.confirm(publishing ? `“${game.name}”을 라이브러리에 공개할까요?` : `“${game.name}”을 보관할까요? 공개 라이브러리에서는 숨겨집니다.`)) return;
    setNotice("");
    const now = new Date().toISOString();
    const { error } = await createSupabaseBrowserClient().from("games").update(publishing
      ? { moderation_status: "published", visibility: "public", published_at: now, reviewed_at: now }
      : { moderation_status: "archived", visibility: "private", reviewed_at: now }).eq("id", game.id);
    if (error) { setNotice("상태를 바꾸지 못했어요. 관리자 권한을 다시 확인해주세요."); return; }
    setNotice(publishing ? "게임을 공개했어요." : "게임을 보관했어요.");
    await loadGames();
  }

  async function deleteGame(game: ManagedGame) {
    if (!window.confirm(`“${game.name}”을 완전히 삭제할까요? 연결된 문제·제시어도 함께 삭제되며 되돌릴 수 없습니다.`)) return;
    setNotice("");
    const { error } = await createSupabaseBrowserClient().from("games").delete().eq("id", game.id);
    if (error) { setNotice("게임을 삭제하지 못했어요. 관리자 권한을 다시 확인해주세요."); return; }
    setNotice("게임과 연결된 문항을 삭제했어요.");
    await loadGames();
  }

  const groups = useMemo(() => ({
    archived: games.filter((game) => game.moderation_status === "archived"),
    draft: games.filter((game) => game.source === "official" && game.moderation_status === "draft"),
    pending: games.filter((game) => game.source === "user" && game.moderation_status === "pending_review"),
    published: games.filter((game) => game.moderation_status === "published"),
  }), [games]);
  const totalItems = games.reduce((sum, game) => sum + game.itemCount, 0);
  const visibleGames = filter === "all" ? games : games.filter((game) => game.moderation_status === filter);
  const recentGames = games.slice(0, 6);

  if (!access) return <main className={styles.state}>관리자 권한을 확인하고 있어요…</main>;
  if (access.status === "signed-out") return <main className={styles.state}><span>🔐</span><h1>관리자 로그인이 필요해요.</h1><p>게임을 등록하고 공개 상태를 바꾸려면 먼저 로그인해주세요.</p><Link href="/login">로그인하기 →</Link></main>;
  if (access.status === "not-admin") return <main className={styles.state}><span>🛠️</span><h1>관리자 권한을 연결해주세요.</h1><p>현재 계정은 콘텐츠 관리 권한이 없어요. Supabase SQL Editor에서 이 계정의 UUID를 관리자 역할에 한 번만 등록하면 됩니다.</p><code>{access.userId}</code></main>;

  return <main className={styles.page}>
    <section className={styles.intro}><div><p>GAME OPERATIONS</p><h1>게임 운영 현황을<br />한눈에 보세요.</h1><span>공개 라이브러리, 개발 중인 게임, 향후 사용자 신청 게임까지 한곳에서 정리합니다.</span></div><Link href="/admin/games/new">＋ 공식 게임 등록</Link></section>
    <section className={styles.summary} aria-label="게임 운영 요약">
      <article><span>전체 게임</span><strong>{games.length}</strong><small>관리 대상 전체</small></article><article><span>공개 중</span><strong>{groups.published.length}</strong><small>라이브러리 노출</small></article><article><span>개발 중</span><strong>{groups.draft.length}</strong><small>공식 초안</small></article><article><span>검수 대기</span><strong>{groups.pending.length}</strong><small>사용자 신청</small></article><article><span>전체 문항</span><strong>{totalItems}</strong><small>문제·제시어</small></article>
    </section>
    <section className={styles.workboard} aria-label="운영 작업 보드"><div className={styles.sectionHeading}><div><p>WORK QUEUE</p><h2>지금 살펴볼 게임</h2><span>우선순위가 높은 운영 항목만 모았습니다.</span></div></div><div className={styles.queueGrid}>
      <QueueCard label="검수 대기" count={groups.pending.length} description="사용자 게임 신청은 제출 동의와 검토 메모를 함께 확인한 뒤 공개합니다." empty="아직 신청된 게임이 없어요." href={groups.pending[0] ? `/admin/games/${groups.pending[0].id}/edit` : undefined} action="검토 시작 →" />
      <QueueCard label="개발 중" count={groups.draft.length} description="아직 공개하지 않은 공식 게임입니다. 규칙·문항을 다듬은 뒤 라이브러리에 올리세요." empty="개발 중인 공식 게임이 없어요." href={groups.draft[0] ? `/admin/games/${groups.draft[0].id}/edit` : undefined} action="개발 게임 열기 →" />
      <QueueCard label="보관됨" count={groups.archived.length} description="현재 라이브러리에서는 숨긴 게임입니다. 필요하면 수정 후 다시 공개할 수 있어요." empty="보관한 게임이 없어요." action="보관함 보기 →" onAction={() => setFilter("archived")} />
    </div></section>
    <section className={styles.recent} aria-label="최근 수정 게임"><div className={styles.sectionHeading}><div><p>RECENTLY UPDATED</p><h2>최근 수정 게임</h2></div><button type="button" onClick={() => void loadGames()} disabled={loadingGames}>{loadingGames ? "불러오는 중…" : "새로고침"}</button></div>{notice && <p className={styles.notice} role="status">{notice}</p>}{recentGames.length ? <div className={styles.recentRows}>{recentGames.map((game) => <Link href={`/admin/games/${game.id}/edit`} key={game.id}><div><strong>{game.name}</strong><span>{sourceLabel(game)} · 문항 {game.itemCount}개 · {formatDate(game.updated_at)} 수정</span></div><i className={`${styles.status} ${styles[game.moderation_status]}`}>{statusLabel[game.moderation_status]}</i><b>수정 →</b></Link>)}</div> : <Empty text="공식 게임을 등록하면 여기에서 운영 상태를 관리할 수 있어요." />}</section>
    <section className={styles.list}><div className={styles.sectionHeading}><div><p>GAME DIRECTORY</p><h2>전체 게임</h2><span>상태별로 모아보고, 수정·공개·보관 작업을 처리하세요.</span></div></div><div className={styles.filters} aria-label="게임 상태 필터">{filters.map((value) => <button className={filter === value ? styles.activeFilter : ""} key={value} type="button" onClick={() => setFilter(value)}>{value === "all" ? `전체 ${games.length}` : `${statusLabel[value]} ${games.filter((game) => game.moderation_status === value).length}`}</button>)}</div>{visibleGames.length ? <div className={styles.rows}>{visibleGames.map((game) => <article className={styles.row} key={game.id}><div><strong>{game.name}</strong><span>{sourceLabel(game)} · 문항 {game.itemCount}개 · {game.submitted_at ? `${formatDate(game.submitted_at)} 신청` : `${formatDate(game.updated_at)} 수정`}</span></div><div className={styles.rowActions}><i className={`${styles.status} ${styles[game.moderation_status]}`}>{statusLabel[game.moderation_status]}</i><Link href={`/admin/games/${game.id}/edit`}>{game.moderation_status === "pending_review" ? "검토" : "수정"}</Link><Link href={`/games/${game.id}`}>보기</Link>{game.source === "official" && game.moderation_status !== "published" && <button type="button" onClick={() => void changeStatus(game, "published")}>공개</button>}{game.moderation_status !== "archived" && <button type="button" onClick={() => void changeStatus(game, "archived")}>보관</button>}<button className={styles.delete} type="button" onClick={() => void deleteGame(game)}>삭제</button></div></article>)}</div> : <Empty text="다른 상태를 선택하거나 새 공식 게임을 등록해보세요." />}</section>
  </main>;
}

function QueueCard({ action, count, description, empty, href, label, onAction }: { action: string; count: number; description: string; empty: string; href?: string; label: string; onAction?: () => void }) {
  return <article className={styles.queueCard}><div><span className={styles.queueBadge}>{label}</span><strong>{count}개</strong></div><p>{description}</p>{href ? <Link href={href}>{action}</Link> : onAction ? <button type="button" onClick={onAction}>{action}</button> : <small>{empty}</small>}</article>;
}

function Empty({ text }: { text: string }) {
  return <div className={styles.empty}><span>✓</span><h2>표시할 게임이 없어요.</h2><p>{text}</p></div>;
}
