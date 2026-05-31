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
import { formatDate } from './format';

function SearchView({ vm }: { vm: DebateSearchViewModel }) {
  return (
    <CardShell eyebrow="Hansard search" sources={vm.sources}>
      <div style={{ fontSize: 13, color: '#5c5746', marginBottom: 10 }}>
        Showing {vm.hitCount} matching contribution{vm.hitCount === 1 ? '' : 's'}.
      </div>
      {vm.hits.map((hit) => (
        <div
          key={`${hit.memberName}-${hit.excerpt.slice(0, 24)}`}
          style={{ borderTop: '1px solid #efece4', padding: '10px 0' }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: '#26231a' }}>{hit.debateTitle}</div>
          <div style={{ fontSize: 12, color: '#5c5746', margin: '2px 0 6px' }}>
            {hit.speaker} · {hit.section} · {formatDate(hit.date)}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: '#3b3729', margin: 0 }}>
            {hit.excerpt}
          </p>
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
    <CardShell eyebrow="Hansard debate" sources={vm.sources}>
      <div style={{ fontSize: 19, fontWeight: 700, color: '#26231a', lineHeight: 1.3 }}>
        {vm.title}
      </div>
      <div style={{ fontSize: 13, color: '#5c5746', marginTop: 3 }}>
        {vm.house} · {vm.location} · {formatDate(vm.date)}
      </div>

      <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          onClick={() => void togglePlain()}
          disabled={loading}
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 999,
            border: '1px solid #d8d2c4',
            background: showPlain ? '#0b6b4f' : '#f2efe6',
            color: showPlain ? '#fff' : '#4a4636',
            cursor: loading ? 'default' : 'pointer',
          }}
        >
          {loading ? 'Rewriting…' : showPlain ? 'Show Hansard text' : 'Plain English'}
        </button>
        {error && <span style={{ fontSize: 12, color: '#a3122b' }}>{error}</span>}
      </div>

      {showPlain && plain ? (
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: '#3b3729',
            marginTop: 12,
            whiteSpace: 'pre-wrap',
          }}
        >
          {plain}
        </p>
      ) : (
        <div style={{ marginTop: 8 }}>
          {vm.contributions.map((c, i) => (
            <div
              key={`${c.speaker}-${i}`}
              style={{ borderTop: '1px solid #efece4', padding: '8px 0' }}
            >
              {c.speaker && (
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4a4636' }}>{c.speaker}</div>
              )}
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#3b3729', margin: '2px 0 0' }}>
                {c.text}
              </p>
            </div>
          ))}
          {vm.truncated && (
            <div style={{ fontSize: 12, color: '#9a9484', marginTop: 8 }}>
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
