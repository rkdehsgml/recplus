"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import styles from "./site-header.module.css";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/games", label: "게임 찾기" },
  { href: "/create", label: "행사 준비" },
  { href: "/items", label: "문제팩" },
  { href: "/cuesheets", label: "내 행사" },
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let active = true;

    void supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      setEmail(error ? null : data.user?.email ?? null);
      setAuthReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      setAuthReady(true);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    setSigningOut(true);
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    setEmail(null);
    setSigningOut(false);
    setMenuOpen(false);
    router.refresh();
  }

  // 진행 중에는 타이머와 점수판에 집중할 수 있도록 별도 진행 화면을 유지합니다.
  if (pathname.startsWith("/play/")) return null;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" onClick={() => setMenuOpen(false)} aria-label="레크플러스 홈">
          <span className={styles.brandMark}>R</span>
          <span>레크플러스</span>
        </Link>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i /><i />
        </button>

        <nav className={`${styles.navigation} ${menuOpen ? styles.open : ""}`} id="main-navigation" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link
              className={isCurrent(pathname, item.href) ? styles.current : ""}
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link className={styles.createButton} href="/games/new" onClick={() => setMenuOpen(false)}>＋ 내 게임</Link>
          {authReady ? (
            email ? (
              <>
                <Link className={styles.accountButton} href="/account" onClick={() => setMenuOpen(false)}>계정</Link>
                <button className={styles.signOutButton} type="button" onClick={signOut} disabled={signingOut} title={email}>
                  {signingOut ? "로그아웃 중" : "로그아웃"}
                </button>
              </>
            ) : (
              pathname !== "/login" && <Link className={styles.signInButton} href="/login" onClick={() => setMenuOpen(false)}>로그인</Link>
            )
          ) : <span className={styles.authLoading} aria-label="로그인 상태 확인 중" />}
        </nav>
      </div>
    </header>
  );
}
