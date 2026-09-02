"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { validatePassword } from "@/lib/auth/password-policy";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

export default function AccountContent() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

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
          </>
        )}
      </section>
    </main>
  );
}
