"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validatePassword } from "@/lib/auth/password-policy";
import { getAuthCallbackUrl } from "@/lib/auth/redirect";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./page.module.css";

type LoginFormProps = {
  initialError?: string;
};

type EmailMode = "password" | "signup" | "magic";
type SentAction = "magic" | "signup" | "reset" | null;

const CONSENT_VERSION = "2026-09-03";

function loginErrorMessage(error: { code?: string; message: string; status?: number }) {
  const text = error.message.toLowerCase();

  if (error.status === 429 || error.code === "over_email_send_rate_limit" || error.code === "over_request_rate_limit") {
    return "메일 발송 요청이 많아요. 잠시 기다렸다가 다시 시도해주세요.";
  }

  if (text.includes("not authorized")) {
    return "이 이메일은 현재 메일 서비스의 발송 허용 목록에 없어요. 운영용 메일 설정을 확인해주세요.";
  }

  if (error.code === "otp_disabled") {
    return "이메일 링크 로그인이 현재 꺼져 있어요. 비밀번호 또는 소셜 로그인을 이용해주세요.";
  }

  if (error.code === "invalid_credentials") {
    return "이메일 또는 비밀번호가 맞지 않아요. 처음이라면 계정을 만들어주세요.";
  }

  if (error.code === "weak_password") {
    return "비밀번호가 보안 요구 사항을 충족하지 않아요.";
  }

  return "로그인을 완료하지 못했어요. 잠시 후 다시 시도해주세요.";
}

export default function LoginForm({ initialError }: LoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<EmailMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(initialError ?? "");
  const [sentAction, setSentAction] = useState<SentAction>(null);
  const [submitting, setSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  function selectMode(nextMode: EmailMode) {
    setMode(nextMode);
    setError("");
    setSentAction(null);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSentAction(null);

    if (mode === "signup") {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    if (mode === "signup" && password !== passwordConfirmation) {
      setError("비밀번호 확인이 일치하지 않아요.");
      return;
    }

    if (mode === "signup" && (!agreedToTerms || !agreedToPrivacy)) {
      setError("서비스 이용약관과 개인정보 처리방침에 모두 동의해주세요.");
      return;
    }

    setSubmitting(true);

    const supabase = createSupabaseBrowserClient();
    const emailAddress = email.trim();
    const redirectTo = getAuthCallbackUrl(window.location.origin);
    const consentedAt = new Date().toISOString();
    const response = mode === "magic"
      ? await supabase.auth.signInWithOtp({ email: emailAddress, options: { emailRedirectTo: redirectTo } })
      : mode === "password"
        ? await supabase.auth.signInWithPassword({ email: emailAddress, password })
        : await supabase.auth.signUp({
          email: emailAddress,
          password,
          options: {
            emailRedirectTo: redirectTo,
            data: {
              privacy_agreed_at: consentedAt,
              privacy_version: CONSENT_VERSION,
              terms_agreed_at: consentedAt,
              terms_version: CONSENT_VERSION,
            },
          },
        });

    setSubmitting(false);

    if (response.error) {
      setError(loginErrorMessage(response.error));
      return;
    }

    if (response.data.session) {
      router.replace("/cuesheets");
      router.refresh();
      return;
    }

    setSentAction(mode === "signup" ? "signup" : "magic");
  }

  async function requestPasswordReset() {
    const emailAddress = email.trim();
    if (!emailAddress) {
      setError("먼저 이메일을 입력해주세요.");
      return;
    }

    setError("");
    setSentAction(null);
    setSubmitting(true);

    const supabase = createSupabaseBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(emailAddress, {
      redirectTo: getAuthCallbackUrl(window.location.origin, "/account"),
    });

    setSubmitting(false);

    if (resetError) {
      setError(loginErrorMessage(resetError));
      return;
    }

    setSentAction("reset");
  }

  const copy = mode === "password"
    ? { badge: "이메일 로그인", title: "이메일로 계속하기", description: "비밀번호가 있다면 바로 로그인할 수 있어요.", button: "이메일로 로그인" }
    : mode === "signup"
      ? { badge: "새 계정", title: "처음이신가요?", description: "30초면 내 행사 플랜을 저장할 수 있어요.", button: "계정 만들기" }
      : { badge: "비밀번호 없이", title: "로그인 링크 받기", description: "이메일로 받은 링크를 눌러 안전하게 들어오세요.", button: "로그인 링크 보내기" };

  return (
    <div className={styles.authFlow}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.emailHeading}>
          <span>{copy.badge}</span>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <label>
          이메일 주소
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        {mode !== "magic" && (
          <label>
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "signup" ? "12자 이상, 3종류 이상 조합" : "비밀번호 입력"}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={mode === "signup" ? 12 : undefined}
              maxLength={mode === "signup" ? 128 : undefined}
              required
            />
          </label>
        )}
        {mode === "signup" && (
          <label>
            비밀번호 확인
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              placeholder="비밀번호를 한 번 더 입력"
              autoComplete="new-password"
              minLength={12}
              maxLength={128}
              required
            />
          </label>
        )}

        {mode === "signup" && (
          <fieldset className={styles.consents}>
            <legend>가입 동의</legend>
            <label>
              <input type="checkbox" checked={agreedToTerms} onChange={(event) => setAgreedToTerms(event.target.checked)} required />
              <span><b>[필수]</b> <Link href="/terms" target="_blank">서비스 이용약관</Link>에 동의합니다.</span>
            </label>
            <label>
              <input type="checkbox" checked={agreedToPrivacy} onChange={(event) => setAgreedToPrivacy(event.target.checked)} required />
              <span><b>[필수]</b> <Link href="/privacy" target="_blank">개인정보 처리방침</Link>에 동의합니다.</span>
            </label>
            <p>커뮤니티 게임 공유 동의는 공유 기능을 신청할 때 별도로 받습니다.</p>
          </fieldset>
        )}

        <button className={styles.submitButton} type="submit" disabled={submitting}>
          {submitting ? "처리 중…" : `${copy.button} →`}
        </button>
      </form>

      {mode === "password" && (
        <div className={styles.inlineActions}>
          <button type="button" onClick={requestPasswordReset} disabled={submitting}>비밀번호를 잊으셨나요?</button>
          <span />
          <button type="button" onClick={() => selectMode("signup")}>계정 만들기</button>
        </div>
      )}
      {mode === "signup" && <p className={styles.modeSwitch}>이미 계정이 있나요? <button type="button" onClick={() => selectMode("password")}>로그인</button></p>}
      {mode === "magic" && <p className={styles.modeSwitch}>비밀번호로 로그인할까요? <button type="button" onClick={() => selectMode("password")}>이메일 로그인</button></p>}
      {mode !== "magic" && <p className={styles.magicSwitch}><button type="button" onClick={() => selectMode("magic")}>비밀번호 없이 이메일 링크로 계속하기</button></p>}

      {sentAction === "magic" && <p className={styles.success} role="status"><b>{email}</b>로 로그인 링크를 보냈어요. 메일함에서 링크를 열어주세요.</p>}
      {sentAction === "signup" && <p className={styles.success} role="status">입력한 이메일로 계정 확인 안내를 보냈어요. 메일함을 확인해주세요.</p>}
      {sentAction === "reset" && <p className={styles.success} role="status">입력한 이메일로 비밀번호 재설정 안내를 보냈어요.</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}
