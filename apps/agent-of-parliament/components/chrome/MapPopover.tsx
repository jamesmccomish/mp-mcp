'use client';

import { ConstituencyMap } from '@/components/map/ConstituencyMap';
import type { ConstituencyHighlight } from '@/components/map/ConstituencyMap';
import { useEffect, useRef } from 'react';
import styles from './MapPopover.module.css';

export function MapPopover({
  open,
  onClose,
  highlights,
}: {
  open: boolean;
  onClose: () => void;
  highlights: ConstituencyHighlight[];
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('keydown', onKey);
    // Defer so the opening click doesn't immediately close it.
    const id = window.setTimeout(() => document.addEventListener('mousedown', onClick), 0);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(id);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={ref}
      className={styles.pop}
      aria-label="Constituencies in view"
      open
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className={styles.head}>In view</div>
      <div className={styles.body}>
        <ConstituencyMap highlights={highlights} />
      </div>
    </dialog>
  );
}
