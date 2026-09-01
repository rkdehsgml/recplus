import LoginForm from "./login-form";
import styles from "./page.module.css";

type LoginPageProps = {
  searchParams: Promise<{ error?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const message = typeof error === "string" ? "인증 링크가 만료됐거나 유효하지 않아요. 새 링크를 요청해주세요." : undefined;

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.brandMark}>R</div>
        <p className={styles.eyebrow}>RECPLUS ACCOUNT</p>
        <h1>좋은 자리는<br /><em>바로 시작</em>할 수 있게.</h1>
        <p className={styles.description}>게임을 고르고, 행사 플랜을 저장하고, 현장에서 바로 꺼내 쓰는 경험을 하나의 계정으로 이어가세요.</p>
        <ul className={styles.benefits}>
          <li><span>✓</span> 저장한 행사 플랜을 모든 기기에서 이어보기</li>
          <li><span>✓</span> 로그인한 계정만 내 플랜에 접근</li>
          <li><span>✓</span> Google·카카오 계정으로 빠르게 시작</li>
        </ul>
        <p className={styles.securityNote}><span>✦</span> 소셜 계정의 비밀번호는 레크플러스에 전달되지 않아요.</p>
      </section>
      <section className={styles.authCard}>
        <div className={styles.cardHeader}>
          <p>WELCOME</p>
          <h2>레크플러스를 시작해볼까요?</h2>
          <span>가장 편한 방식으로 로그인하세요.</span>
        </div>
        <LoginForm initialError={message} />
      </section>
    </main>
  );
}
