"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { validatePassword } from "@/lib/auth/password-policy";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

export default function AccountContent({ supportEmail }: { supportEmail?: string }) {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    void supabase.auth.getUser().then(({ data, error: userError }) => {
      if (!active) return;
      setEmail(userError ? null : data.user?.email ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setEmail(session?.user.email ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function updatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmation) {
      setError("비밀번호 확인이 일치하지 않아요.");
      return;
    }

    setSaving(true);
    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (updateError) {
      setError("비밀번호를 저장하지 못했어요. 로그인 상태를 확인한 뒤 다시 시도해주세요.");
      return;
    }

    setPassword("");
    setConfirmation("");
    setMessage("비밀번호를 저장했어요. 이제 이메일·비밀번호로도 로그인할 수 있어요.");
  }

  async function deleteAccount() {
    if (!window.confirm("계정과 서버에 저장된 행사 플랜·내 게임을 모두 삭제할까요? 이 작업은 되돌릴 수 없습니다.")) return;
    const confirmation = window.prompt("계정 삭제를 확인하려면 ‘계정 삭제’를 입력해주세요.");
    if (confirmation !== "계정 삭제") {
      setError("확인 문구가 일치하지 않아 계정 삭제를 취소했어요.");
      return;
    }

    setDeleting(true);
    setError("");
    setMessage("");
    const response = await fetch("/api/account", { method: "DELETE" });
    const result = await response.json().catch(() => ({ message: "계정을 삭제하지 못했어요." })) as { message?: string };
    if (!response.ok) {
      setDeleting(false);
      setError(result.message ?? "계정을 삭제하지 못했어요.");
      return;
    }

    Object.keys(window.localStorage).forEach((key) => {
      if (key.startsWith("recplus.")) window.localStorage.removeItem(key);
    });
    await createSupabaseBrowserClient().auth.signOut({ scope: "local" });
    window.location.replace("/");
  }

  return (
    <main className={styles.page}>
      <section className={styles.heading}>
        <p className={styles.eyebrow}>ACCOUNT SETTINGS</p>
        <h1>내 계정과 로그인 방식을<br />관리하세요.</h1>
        <p>행사 플랜은 로그인한 계정에만 저장됩니다. 비밀번호를 설정하면 메일 링크를 기다리지 않고 바로 로그인할 수 있어요.</p>
      </section>

      <section className={styles.panel} aria-busy={loading}>
        {loading ? (
          <p className={styles.loading}>로그인 상태를 확인하고 있어요…</p>
        ) : !email ? (
          <div className={styles.empty}>
            <span>🔐</span>
            <h2>로그인이 필요해요.</h2>
            <p>계정 설정을 바꾸려면 먼저 로그인해주세요.</p>
            <Link href="/login">로그인하기 →</Link>
          </div>
        ) : (
          <>
            <div className={styles.identity}>
              <span className={styles.avatar}>{email.slice(0, 1).toUpperCase()}</span>
              <div>
                <p>로그인한 계정</p>
                <strong>{email}</strong>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.sectionTitle}>
              <div>
                <h2>비밀번호 설정</h2>
                <p>처음 설정하거나 이미 만든 비밀번호를 바꿀 수 있어요.</p>
              </div>
              <span className={styles.badge}>이메일·비밀번호</span>
            </div>

            <form className={styles.form} onSubmit={updatePassword}>
              <label>
                새 비밀번호
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={12} maxLength={128} autoComplete="new-password" placeholder="12자 이상, 3종류 이상 조합" required />
              </label>
              <label>
                새 비밀번호 확인
                <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} minLength={12} maxLength={128} autoComplete="new-password" placeholder="비밀번호를 한 번 더 입력" required />
              </label>
              <button type="submit" disabled={saving}>{saving ? "저장 중…" : "비밀번호 저장"}</button>
            </form>

            {message && <p className={styles.success} role="status">{message}</p>}
            {error && <p className={styles.error} role="alert">{error}</p>}

            <div className={styles.divider} />
            <div className={styles.accountFooter}>
              <section><h2>도움이 필요하신가요?</h2><p>로그인, 데이터 또는 개인정보 관련 문의를 운영자에게 보낼 수 있어요.</p>{supportEmail ? <a href={`mailto:${supportEmail}`}>{supportEmail}</a> : <span>정식 공개 전 문의 이메일을 설정할 예정입니다.</span>}</section>
              <section className={styles.danger}><h2>계정 삭제</h2><p>계정과 서버에 저장된 행사 플랜·내 게임·진행 상태가 영구 삭제됩니다.</p><button type="button" onClick={() => void deleteAccount()} disabled={deleting}>{deleting ? "삭제 중…" : "계정 및 서버 데이터 삭제"}</button></section>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
