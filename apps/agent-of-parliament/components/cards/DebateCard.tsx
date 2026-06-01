'use client';

import { adaptDebate } from '@/lib/agent/adapters/debate';
import type {
  DebateDetailViewModel,
  DebateSearchViewModel,
  DebateViewModel,
} from '@/lib/agent/adapters/debate';
import { toPlainEnglish } from '@/lib/agent/plainEnglish';
import { getKey } from '@/lib/key/keyVault';
import type { Citation } from 'mp-mcp/types';
import { useState } from 'react';
import { CardShell } from './CardShell';
import styles from './DebateCard.module.css';
import { formatDate } from './format';

function SearchView({ vm }: { vm: DebateSearchViewModel }) {
  return (
    <CardShell kicker="Hansard Search" sources={vm.sources}>
      <div className={styles.meta}>
        Showing {vm.hitCount} matching contribution{vm.hitCount === 1 ? '' : 's'}.
      </div>
      {vm.hits.map((hit) => (
        <div key={`${hit.memberName}-${hit.excerpt.slice(0, 24)}`} className={styles.hit}>
          <div className={styles.speaker}>{hit.debateTitle}</div>
          <div className={styles.meta}>
            {hit.speaker} · {hit.section} · {formatDate(hit.date)}
          </div>
          <p className={styles.excerpt}>{hit.excerpt}</p>
        </div>
      ))}
    </CardShell>
  );
}

function DetailView({ vm }: { vm: DebateDetailViewModel }) {
  const [showPlain, setShowPlain] = useState(false);
  const [plain, setPlain] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function togglePlain() {
    setError(null);
    if (showPlain) {
      setShowPlain(false);
      return;
    }
    if (plain !== null) {
      setShowPlain(true);
      return;
    }
    const apiKey = getKey();
    if (!apiKey) {
      setError('No Anthropic key in this tab.');
      return;
    }
    const excerpt = vm.contributions.map((c) => `${c.speaker}: ${c.text}`).join('\n\n');
    setLoading(true);
    try {
      const result = await toPlainEnglish(excerpt, apiKey);
      setPlain(result);
      setShowPlain(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reach the model.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <CardShell kicker="Hansard" title={vm.title} sources={vm.sources}>
      <div className={styles.meta}>
        {vm.house} · {vm.location} · {formatDate(vm.date)}
      </div>

      <div className={styles.toggleRow}>
        <button
          type="button"
          onClick={() => void togglePlain()}
          disabled={loading}
          className={`${styles.toggle} ${showPlain ? styles.toggleOn : ''}`}
        >
          {loading ? 'Rewriting…' : showPlain ? 'Verbatim' : 'Plain English'}
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>

      {showPlain && plain ? (
        <>
          <p className={styles.excerpt} style={{ fontStyle: 'normal', whiteSpace: 'pre-wrap' }}>
            {plain}
          </p>
          <div className={styles.rerendered}>re-rendered</div>
        </>
      ) : (
        <div style={{ marginTop: 8 }}>
          {vm.contributions.map((c, i) => (
            <div key={`${c.speaker}-${i}`} className={styles.hit}>
              {c.speaker && <div className={styles.speaker}>{c.speaker}</div>}
              <p className={styles.excerpt}>{c.text}</p>
            </div>
          ))}
          {vm.truncated && (
            <div className={`${styles.meta} ${styles.dim}`} style={{ marginTop: 8 }}>
              Showing the first {vm.contributions.length} of {vm.totalItems} contributions.
            </div>
          )}
        </div>
      )}
    </CardShell>
  );
}

export function DebateCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const debate: DebateViewModel = adaptDebate(data, sources);
  if (debate.mode === 'search') return <SearchView vm={debate} />;
  return <DetailView vm={debate} />;
}
