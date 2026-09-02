import Link from "next/link";
import styles from "../legal/page.module.css";

export const metadata = { title: "서비스 이용약관 | 레크플러스" };

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>RECPLUS POLICY</p>
      <h1>서비스 이용약관</h1>
      <p className={styles.updated}>시행일: 2026년 9월 3일</p>
      <p className={styles.notice}>레크플러스는 모임 진행을 돕는 게임·행사 플랜 도구입니다. 이 약관은 현재 제공 기능에 적용되며, 커뮤니티 게임 공유 기능은 출시 시 별도 안내와 동의 절차를 거칩니다.</p>
      <div className={styles.contents}>
        <section><h2>1. 서비스와 계정</h2><p>이용자는 정확한 이메일 주소로 계정을 만들고, 비밀번호와 로그인 링크를 안전하게 관리해야 합니다. 계정으로 저장한 행사 플랜은 해당 계정에서만 볼 수 있도록 운영합니다.</p></section>
        <section><h2>2. 이용자의 콘텐츠</h2><p>내 게임과 행사 플랜은 기본적으로 개인 용도로 사용됩니다. 타인의 개인정보, 저작권을 침해하는 자료, 모욕·혐오·불법 콘텐츠를 입력하거나 공유해서는 안 됩니다.</p></section>
        <section><h2>3. 향후 게임 공유</h2><p>사용자 제작 게임을 다른 이용자에게 공개하는 기능은 아직 제공하지 않습니다. 도입 시에는 공개 범위, 표시될 작성자 정보, 콘텐츠 검수, 삭제 방법을 제출 시점에 명확히 안내하고 별도 동의를 받습니다. 가입만으로는 공유에 동의한 것으로 보지 않습니다.</p></section>
        <section><h2>4. 서비스 변경과 이용 제한</h2><p>서비스의 안정성과 이용자 보호를 위해 기능을 변경하거나, 정책을 위반한 계정·콘텐츠의 이용을 제한할 수 있습니다. 중요한 정책 변경은 시행 전 서비스 화면에서 알립니다.</p></section>
      </div>
      <div className={styles.links}><Link href="/privacy">개인정보 처리방침</Link><Link href="/login">로그인으로 돌아가기</Link></div>
    </main>
  );
}
