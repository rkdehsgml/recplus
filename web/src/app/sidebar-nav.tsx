"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { GamePaletteKey } from "@/lib/game-palette";
import styles from "./sidebar-nav.module.css";

export type SidebarNavItem = {
  id: string;
  label: string;
  icon?: string;
  badge?: number | string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onSelect?: () => void;
  palette?: GamePaletteKey;
  level?: 1 | 2;
};

export type SidebarNavGroup = {
  id: string;
  label: string;
  items: SidebarNavItem[];
};

type SidebarNavProps = {
  ariaLabel: string;
  title: string;
  subtitle?: string;
  activeLabel: string;
  groups: SidebarNavGroup[];
  footer?: ReactNode;
};

export default function SidebarNav({ ariaLabel, title, subtitle, activeLabel, groups, footer }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function select(item: SidebarNavItem) {
    item.onSelect?.();
    setMobileOpen(false);
  }

  return (
    <aside className={styles.sidebar} aria-label={ariaLabel}>
      <button
        className={styles.mobileToggle}
        type="button"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((current) => !current)}
      >
        <span><small>{title}</small><strong>{activeLabel}</strong></span>
        <b aria-hidden="true">{mobileOpen ? "닫기" : "필터"}</b>
      </button>

      <div className={`${styles.panel} ${mobileOpen ? styles.mobileOpen : ""}`}>
        <header className={styles.identity}>
          <div><strong>{title}</strong>{subtitle && <small>{subtitle}</small>}</div>
        </header>

        <nav className={styles.navigation} aria-label={ariaLabel}>
          {groups.map((group) => (
            <section className={styles.group} key={group.id}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const className = `${styles.item} ${item.active ? styles.active : ""} ${item.level === 2 ? styles.secondary : ""}`;
                const content = <><i className={styles.itemIcon} aria-hidden="true">{item.icon ?? "·"}</i><span>{item.label}</span>{item.badge !== undefined && <b>{item.badge}</b>}</>;
                return item.href ? (
                  <Link className={className} href={item.href} aria-current={item.active ? "page" : undefined} data-palette={item.palette} key={item.id} onClick={() => setMobileOpen(false)}>{content}</Link>
                ) : (
                  <button className={className} type="button" aria-pressed={item.active} disabled={item.disabled} data-palette={item.palette} key={item.id} onClick={() => select(item)}>{content}</button>
                );
              })}
            </section>
          ))}
        </nav>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </aside>
  );
}
