import Link from "next/link";
import { games } from "@/data/games";
import { gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { archetypeLabels } from "@/lib/game-types";
import styles from "./page.module.css";

const icons = { QUIZ: "🧠", TALK: "💬", SURVIVAL: "⚡", PERFORM: "🎭", PICK: "🎰", BOMB: "💣" } as const;

const situations = [
  { id: "mt", icon: "🏕️", title: "MT·친구 모임", description: "처음 어색함을 풀고 텐션을 올려요." },
  { id: "orientation", icon: "🎒", title: "새터·OT", description: "많은 인원이 함께 참여할 게임이에요." },
  { id: "bus", icon: "🚌", title: "버스 이동", description: "준비물 없이 앉아서 바로 시작해요." },
  { id: "workshop", icon: "🧩", title: "워크숍", description: "협업과 분위기 전환에 좋아요." },
  { id: "dinner", icon: "🍽️", title: "회식", description: "테이블에서도 부담 없이 즐겨요." },
] as const;

const featuredIds = ["balance", "choseong", "charades"];

export default function Home() {
  const featuredGames = featuredIds.flatMap((id) => {
    const game = games.find((item) => item.id === id);
    return game ? [game] : [];
  });

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>GROUP GAME DISCOVERY</p>
          <h1>레크 고민 끝,<br /><em>맞춤 게임 리스트</em></h1>
          <p className={styles.description}>예능에서 검증된 포맷과 현장에서 자주 쓰이는 레크 게임을, 인원·장소·분위기에 맞춰 빠르게 찾아보세요.</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/games">게임 찾아보기 <span aria-hidden="true">→</span></Link>
            <Link className={styles.secondaryButton} href="/create">행사 준비하기</Link>
          </div>
          <div className={styles.heroStats}><span><b>{games.length}</b>개 검증 게임</span><span><b>5</b>가지 모임 상황</span><span><b>0</b>개 준비물 게임부터</span></div>
        </div>

        <div className={styles.heroPanel} aria-label="상황별 게임 미리보기">
          <div className={styles.panelTop}><span>오늘 바로 할 게임</span><b>추천 게임</b></div>
          <div className={styles.panelGame}><span className={styles.panelIcon}>💬</span><div><small>4~50명 · 팀·개인 가능</small><strong>밸런스 게임</strong><p>서로를 알아가며 자연스럽게 대화를 여는 질문 게임</p></div></div>
          <div className={styles.panelFit}><span>추천 상황</span><div><i>🏕️ MT</i><i>🚌 버스</i><i>🍽️ 회식</i></div></div>
          <Link className={styles.panelLink} href="/games/balance">게임 자세히 보기 <span>→</span></Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>START HERE</p><h2>가장 먼저 꺼내기 좋은 게임</h2></div><Link href="/games">전체 게임 보기 →</Link></div>
        <div className={styles.featuredGrid}>
          {featuredGames.map((game) => (
            <Link className={styles.gameCard} href={`/games/${game.id}`} key={game.id}>
              <div className={styles.cardTop}><span>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span><b>{game.duration}분</b></div>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
              <div className={styles.cardMeta}><i>{gamePeopleLabel(game)}</i><i>{gameTeamLabel(game)}</i></div>
              <strong>게임 보기 <span>→</span></strong>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.situationSection}`}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>FIND BY OCCASION</p><h2>어떤 자리인가요?</h2></div><p>상황을 고르면 가능한 게임부터 볼 수 있어요.</p></div>
        <div className={styles.situationGrid}>
          {situations.map((situation) => <Link className={styles.situation} href={`/games?context=${situation.id}`} key={situation.id}><span>{situation.icon}</span><div><h3>{situation.title}</h3><p>{situation.description}</p></div><b>→</b></Link>)}
        </div>
      </section>

      <section className={styles.planPrompt}>
        <div><p className={styles.eyebrow}>PLAN WHEN YOU NEED IT</p><h2>게임을 골랐다면,<br />행사 흐름도 가볍게 정리하세요.</h2><p>총 인원과 조 수를 설정하고, 선택한 게임을 행사 순서로 구성할 수 있어요.</p></div>
        <Link href="/create">행사 준비 시작 <span>→</span></Link>
      </section>

      <footer className={styles.footer}><span>레크플러스</span><span>즐거운 단체 게임을 위한 발견 도구</span></footer>
    </main>
  );
}
