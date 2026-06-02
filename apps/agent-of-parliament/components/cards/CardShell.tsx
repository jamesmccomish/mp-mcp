import type { Citation } from '@jamesmccomish/mp-mcp/types';
import type { ReactNode } from 'react';
import styles from './CardShell.module.css';

// Shared frame for every card: a mono kicker, an optional display-face title, the
// card body, and the mono citation row. The citation row is non-negotiable —
// surfacing the `sources` URLs is the project's credibility contract.
export function CardShell({
  kicker,
  title,
  lords = false,
  children,
  sources,
}: {
  kicker: string;
  title?: string;
  lords?: boolean;
  children: ReactNode;
  sources: Citation[];
}) {
  return (
    <article className={`${styles.card} ${lords ? styles.lords : ''}`}>
      <div className={styles.kicker}>{kicker}</div>
      {title && <h2 className={styles.title}>{title}</h2>}
      {children}
      {sources.length > 0 && (
        <div className={styles.sources}>
          Sources:{' '}
          {sources.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.title}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
