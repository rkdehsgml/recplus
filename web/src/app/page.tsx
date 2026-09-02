import Link from "next/link";
import { games } from "@/data/games";
import { gamePeopleLabel, gameTeamLabel } from "@/lib/game-discovery";
import { gamePaletteFor } from "@/lib/game-palette";
import { archetypeLabels, gameSeriesDescriptions, gameSeriesLabels, phaseLabels, type GameSeries } from "@/lib/game-types";
import { FeaturedGameDeck } from "./featured-game-deck";
import { MotionReveal } from "./motion-reveal";
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
  const deckGameIds = ["balance", "choseong", "charades", "speed-quiz"];
const programCollections: { id: GameSeries; icon: string; note: string }[] = [
  { id: "new-journey", icon: "🐉", note: "미션과 말맛이 살아 있는 게임" },
  { id: "earth-arcade", icon: "🪐", note: "빠른 템포로 승부욕을 끌어올리는 게임" },
];

export default function Home() {
  const featuredGames = featuredIds.flatMap((id) => {
    const game = games.find((item) => item.id === id);
    return game ? [game] : [];
  });
  const deckGames = deckGameIds.flatMap((id) => {
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

        <FeaturedGameDeck games={deckGames} />
      </section>

      <MotionReveal className={`${styles.section} ${styles.archiveSection}`}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>BROWSE BY PROGRAM</p><h2>방송 게임 라이브러리</h2></div><p>좋아하는 프로그램을 고르면 그 안에서 쓰인 게임 포맷을 바로 볼 수 있어요.</p></div>
        <div className={styles.archiveGrid}>{programCollections.map((collection) => {
          const count = games.filter((game) => game.series?.includes(collection.id)).length;
          return <Link className={styles.archiveCard} href={`/games?series=${collection.id}`} key={collection.id}><span>{collection.icon}</span><div><small>{collection.note}</small><h3>{gameSeriesLabels[collection.id]}</h3><p>{gameSeriesDescriptions[collection.id]}</p></div><b>{count}개 게임 <i>→</i></b></Link>;
        })}</div>
      </MotionReveal>

      <MotionReveal className={styles.section} delay={50}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>START HERE</p><h2>가장 먼저 꺼내기 좋은 게임</h2></div><Link href="/games">전체 라이브러리 보기 →</Link></div>
        <div className={styles.featuredGrid}>
          {featuredGames.map((game) => (
            <Link className={styles.gameCard} data-palette={gamePaletteFor(game.archetype)} href={`/games/${game.id}`} key={game.id}>
              <div className={styles.cardTop}><span>{icons[game.archetype]} {archetypeLabels[game.archetype]}</span><b>{game.duration}분</b></div>
              <h3>{game.name}</h3>
              <div className={styles.cardIntro}><small>이런 게임이에요</small><p>{game.description}</p></div>
              <dl className={styles.cardMeta}>
                <div><dt>권장 인원</dt><dd>{gamePeopleLabel(game)}</dd></div>
                <div><dt>진행 방식</dt><dd>{gameTeamLabel(game)}</dd></div>
              </dl>
              <span className={styles.cardPhase}>{phaseLabels[game.phase]}에 추천</span>
              <strong>게임 보기 <span>→</span></strong>
            </Link>
          ))}
        </div>
      </MotionReveal>

      <MotionReveal className={`${styles.section} ${styles.situationSection}`} delay={50}>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>FIND BY OCCASION</p><h2>어떤 자리인가요?</h2></div><p>상황을 고르면 가능한 게임부터 볼 수 있어요.</p></div>
        <div className={styles.situationGrid}>
          {situations.map((situation) => <Link className={styles.situation} href={`/games?context=${situation.id}`} key={situation.id}><span>{situation.icon}</span><div><h3>{situation.title}</h3><p>{situation.description}</p></div><b>→</b></Link>)}
        </div>
      </MotionReveal>

      <MotionReveal className={styles.planPrompt} delay={50}>
        <div><p className={styles.eyebrow}>PLAN WHEN YOU NEED IT</p><h2>게임을 골랐다면,<br />행사 흐름도 가볍게 정리하세요.</h2><p>총 인원과 조 수를 설정하고, 선택한 게임을 행사 순서로 구성할 수 있어요.</p></div>
        <Link href="/create">행사 준비 시작 <span>→</span></Link>
      </MotionReveal>

      <footer className={styles.footer}><span>레크플러스</span><span>즐거운 단체 게임을 위한 발견 도구</span></footer>
    </main>
  );
}
