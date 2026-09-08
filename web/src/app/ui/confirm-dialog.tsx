"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./confirm-dialog.module.css";

type ConfirmDialogProps = {
  cancelLabel?: string;
  confirmLabel: string;
  description: string;
  isConfirming?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
};

/** 중요한 변경을 앱 안에서 한 번 더 확인하는 공용 대화상자입니다. */
export default function ConfirmDialog({
  cancelLabel = "취소",
  confirmLabel,
  description,
  isConfirming = false,
  onCancel,
  onConfirm,
  open,
  title,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onCancel, open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
      <section aria-describedby={descriptionId} aria-labelledby={titleId} aria-modal="true" className={styles.dialog} ref={dialogRef} role="alertdialog">
        <p className={styles.eyebrow}>DELETE PLAN</p>
        <h2 id={titleId}>{title}</h2>
        <p className={styles.description} id={descriptionId}>{description}</p>
        <div className={styles.actions}>
          <button className={styles.cancel} disabled={isConfirming} onClick={onCancel} ref={cancelRef} type="button">{cancelLabel}</button>
          <button className={styles.confirm} disabled={isConfirming} onClick={onConfirm} type="button">{isConfirming ? "삭제 중…" : confirmLabel}</button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
