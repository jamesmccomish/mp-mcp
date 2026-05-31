import type { Citation } from 'mp-mcp/types';
import type { ReactNode } from 'react';

// Shared frame for every card: an eyebrow label, the card body, and the citation
// row. The citation row is non-negotiable — surfacing the `sources` URLs is the
// project's credibility contract, so it renders on every card that has any.
export function CardShell({
  eyebrow,
  children,
  sources,
}: {
  eyebrow: string;
  children: ReactNode;
  sources: Citation[];
}) {
  return (
    <article
      style={{
        border: '1px solid #d8d2c4',
        borderRadius: 10,
        background: '#fff',
        padding: 16,
        margin: '0 0 14px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8a8270',
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>

      {children}

      {sources.length > 0 && (
        <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #eee' }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#aaa',
              marginBottom: 4,
            }}
          >
            Sources
          </div>
          {sources.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                fontSize: 12,
                color: '#1d5c4f',
                textDecoration: 'none',
                margin: '2px 0',
              }}
            >
              {s.title}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
