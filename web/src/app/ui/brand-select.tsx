"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./brand-select.module.css";

type SelectValue = string | number;

export type BrandSelectOption<T extends SelectValue> = {
  label: string;
  value: T;
};

type BrandSelectProps<T extends SelectValue> = {
  "aria-label"?: string;
  disabled?: boolean;
  onValueChange: (value: T) => void;
  options: readonly BrandSelectOption<T>[];
  value: T;
  variant?: "default" | "compact" | "dark";
};

/** 레크플러스 전역에서 쓰는 키보드 접근 가능한 브랜드 선택 메뉴입니다. */
export default function BrandSelect<T extends SelectValue>({
  "aria-label": ariaLabel,
  disabled = false,
  onValueChange,
  options,
  value,
  variant = "default",
}: BrandSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function closeWhenOutside(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("pointerdown", closeWhenOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeWhenOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={`${styles.root} ${styles[variant]}`} ref={rootRef}>
      <button aria-controls={listId} aria-expanded={open} aria-haspopup="listbox" aria-label={ariaLabel} className={styles.trigger} disabled={disabled} onClick={() => setOpen((current) => !current)} type="button">
        <span>{selected?.label}</span><i aria-hidden="true" className={styles.chevron} />
      </button>
      {open && <div className={styles.menu} id={listId} role="listbox" aria-label={ariaLabel}>
        {options.map((option) => <button aria-selected={option.value === value} className={option.value === value ? styles.selected : ""} key={String(option.value)} onClick={() => { onValueChange(option.value); setOpen(false); }} role="option" type="button">{option.label}{option.value === value && <i aria-hidden="true">✓</i>}</button>)}
      </div>}
    </div>
  );
}
