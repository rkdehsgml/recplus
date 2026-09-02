import Link from "next/link";
import styles from "./page.module.css";

/** 아직 열어보지 않은 화면을 오프라인에서 요청했을 때 보여주는 안전한 안내입니다. */
export default function OfflinePage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span aria-hidden="true">R</span>
        <h1>인터넷 연결이 없어요.</h1>
        <p>이전에 열어둔 행사와 저장된 진행 기록은 오프라인에서도 이어서 쓸 수 있어요. 연결되면 새 게임과 문제팩을 다시 불러옵니다.</p>
        <Link href="/cuesheets">저장한 행사 보기</Link>
      </section>
    </main>
  );
}
