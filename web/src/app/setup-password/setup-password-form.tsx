"use client";

import Link from "next/link";
import { useState } from "react";
import { validatePassword } from "@/lib/auth/password-policy";
import styles from "./page.module.css";

export default function SetupPasswordForm() {
  const [setupToken, setSetupToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

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
    try {
      const result = await fetch("/api/internal/initial-admin-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password, setupToken }),
      });
      const payload: { message?: string } = await result.json().catch(() => ({}));

      if (!result.ok) {
        setError(payload.message ?? "비밀번호를 설정하지 못했어요.");
        return;
      }

      setPassword("");
      setConfirmation("");
      setSetupToken("");
      setMessage(payload.message ?? "비밀번호를 설정했어요.");
    } catch {
      setError("연결하지 못했어요. 로컬 개발 서버가 실행 중인지 확인해주세요.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-busy={saving}>
        <p className={styles.eyebrow}>LOCAL ONE-TIME SETUP</p>
        <h1>관리자 비밀번호를<br />안전하게 설정하세요.</h1>
        <p className={styles.description}>이 화면은 로컬 개발 환경에서만 작동하며, 관리자 한 명의 초기 비밀번호를 한 번만 설정합니다.</p>

        <form className={styles.form} onSubmit={submit}>
          <label>
            초기 설정 코드
            <input type="password" value={setupToken} onChange={(event) => setSetupToken(event.target.value)} autoComplete="off" spellCheck={false} placeholder="환경변수에 저장한 코드" required />
          </label>
          <label>
            새 비밀번호
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={12} maxLength={128} placeholder="12자 이상, 3종류 이상 조합" required />
          </label>
          <label>
            새 비밀번호 확인
            <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" minLength={12} maxLength={128} placeholder="비밀번호를 한 번 더 입력" required />
          </label>
          <button type="submit" disabled={saving}>{saving ? "안전하게 저장 중…" : "비밀번호 설정하기"}</button>
        </form>

        {message && <p className={styles.success} role="status">{message}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}

        {message && <Link className={styles.loginLink} href="/login">로그인 화면으로 가기 →</Link>}
        <p className={styles.note}>Supabase의 서버 전용 키와 초기 설정 코드는 브라우저 코드에 포함되지 않습니다.</p>
      </section>
    </main>
  );
}
