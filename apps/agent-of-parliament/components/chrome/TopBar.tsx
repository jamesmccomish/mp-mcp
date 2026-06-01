'use client';

import styles from './TopBar.module.css';

export function TopBar({
  keyPresent,
  mapBadge,
  mapOpen,
  onToggleMap,
  plainEnglish,
  onTogglePlainEnglish,
  onForgetKey,
}: {
  keyPresent: boolean;
  mapBadge: number;
  mapOpen: boolean;
  onToggleMap: () => void;
  plainEnglish: boolean;
  onTogglePlainEnglish: () => void;
  onForgetKey?: () => void;
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.brand}>
        <svg
          className={styles.emblem}
          viewBox="0 0 64 64"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
        >
          <path d="M12 12 H52" />
          <path d="M18 12 V48 M26 12 V48 M32 12 V48 M38 12 V48 M46 12 V48" />
          <path d="M12 22 H52 M12 32 H52 M12 42 H52" strokeWidth="1.8" />
          <path
            d="M18 48 l-3 7 6 0 z M26 48 l-3 7 6 0 z M32 48 l-3 7 6 0 z M38 48 l-3 7 6 0 z M46 48 l-3 7 6 0 z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
        <span className={styles.wordmark}>Agent of Parliament</span>
      </div>
      <div className={styles.tools}>
        <button
          type="button"
          className={`${styles.pill} ${plainEnglish ? styles.pillOn : ''}`}
          onClick={onTogglePlainEnglish}
          aria-pressed={plainEnglish}
        >
          Plain English
        </button>
        <button
          type="button"
          className={styles.mapBtn}
          onClick={onToggleMap}
          aria-expanded={mapOpen}
          aria-label={`Map${mapBadge > 0 ? `, ${mapBadge} in view` : ''}`}
        >
          Map
          {mapBadge > 0 && <span className={styles.badge}>{mapBadge}</span>}
        </button>
        <button
          type="button"
          className={styles.keypip}
          onClick={onForgetKey}
          title={keyPresent ? 'Forget key' : 'No key set'}
          aria-label={keyPresent ? 'Forget API key' : 'No API key set'}
        >
          <span className={`${styles.dot} ${keyPresent ? '' : styles.dotOff}`} />
          Key
        </button>
      </div>
    </div>
  );
}
