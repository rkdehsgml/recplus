import Link from "next/link";
import styles from "../legal/page.module.css";

export const metadata = { title: "개인정보 처리방침 | 레크플러스" };

export default function PrivacyPage() {
  const operatorName = process.env.NEXT_PUBLIC_OPERATOR_NAME;
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <main className={styles.page}>
      <p className={styles.eyebrow}>RECPLUS POLICY</p>
      <h1>개인정보 처리방침</h1>
      <p className={styles.updated}>시행일: 2026년 9월 3일</p>
      <p className={styles.notice}>레크플러스는 서비스에 필요한 최소 정보만 처리합니다. 회원가입 동의와 향후 커뮤니티 게임 공유 동의는 서로 분리합니다.</p>
      <div className={styles.contents}>
        <section><h2>0. 개인정보 처리자</h2><p>{operatorName ? `${operatorName} (레크플러스 운영자)` : "운영자명은 정식 공개 전에 설정됩니다."}</p></section>
        <section><h2>1. 처리하는 정보</h2><ul><li>계정: 이메일 주소, 인증·보안에 필요한 로그인 정보</li><li>서비스 사용: 계정에 저장한 행사 플랜과 그 안의 행사 이름, 인원, 진행 구성</li><li>기기 저장: 빠른 이용을 위해 브라우저에 저장되는 큐시트·진행 상태·내 게임 데이터</li></ul></section>
        <section><h2>2. 처리 목적과 보관</h2><p>계정 인증, 저장한 행사 플랜 제공, 보안과 장애 대응을 위해 사용합니다. 계정에 저장된 행사 플랜은 이용자가 서비스에서 삭제할 수 있으며, 계정 삭제 요청이 접수되면 관련 정보를 삭제합니다.</p></section>
        <section><h2>3. 외부 처리와 공개</h2><p>인증과 데이터 저장에는 Supabase, 웹 호스팅에는 Vercel을 사용합니다. 현재 사용자 제작 게임은 공개하지 않으며, 향후 공유 기능에서는 공개될 항목과 공개 범위를 별도 동의로 선택하게 합니다.</p></section>
        <section><h2>4. 이용자 권리와 문의</h2><p>이용자는 자신의 행사 플랜을 열람·삭제할 수 있고, 개인정보 열람·정정·삭제 또는 계정 삭제를 요청할 수 있습니다. {supportEmail ? <>문의: <a href={`mailto:${supportEmail}`}>{supportEmail}</a></> : "운영자 문의 이메일은 정식 공개 전에 설정됩니다."}</p></section>
        <section><h2>5. 정책 변경</h2><p>처리 목적이나 항목이 바뀌면 시행 전에 서비스 화면에서 알리고, 필요한 경우 새 동의를 받습니다.</p></section>
      </div>
      <div className={styles.links}><Link href="/terms">서비스 이용약관</Link><Link href="/login">로그인으로 돌아가기</Link></div>
    </main>
  );
}
