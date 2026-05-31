import { adaptVote } from '@/lib/agent/adapters/vote';
import type { PartyTally, VoteViewModel } from '@/lib/agent/adapters/vote';
import type { Citation } from 'mp-mcp/types';
import { CardShell } from './CardShell';
import { formatDate, partyColour } from './format';

const AYE_COLOUR = '#0b6b4f';
const NO_COLOUR = '#a3122b';

function TallyColumn({
  heading,
  total,
  tally,
}: { heading: string; total: number; tally: PartyTally[] }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#4a4636', marginBottom: 6 }}>
        {heading} <span style={{ color: '#9a9484', fontWeight: 600 }}>({total})</span>
      </div>
      {tally.map((t) => (
        <div
          key={t.party}
          style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '3px 0' }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 2,
              background: partyColour(t.party),
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12, color: '#3b3729', flex: 1, minWidth: 0 }}>{t.party}</span>
          <span style={{ fontSize: 12, color: '#5c5746', fontVariantNumeric: 'tabular-nums' }}>
            {t.count}
          </span>
        </div>
      ))}
    </div>
  );
}

export function VoteCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const vote: VoteViewModel = adaptVote(data, sources);
  const accent = vote.house === 'Lords' ? NO_COLOUR : AYE_COLOUR;
  const total = vote.ayes + vote.noes;
  const ayePct = total > 0 ? (vote.ayes / total) * 100 : 50;

  return (
    <CardShell eyebrow="Division" sources={vote.sources}>
      <div style={{ height: 4, borderRadius: 2, background: accent, marginBottom: 12 }} />

      <div style={{ fontSize: 19, fontWeight: 700, color: '#26231a', lineHeight: 1.3 }}>
        {vote.title}
      </div>
      <div style={{ fontSize: 13, color: '#5c5746', marginTop: 3 }}>
        Division {vote.divisionNumber} · {vote.house} · {formatDate(vote.date)}
      </div>

      <div
        style={{
          marginTop: 14,
          display: 'inline-block',
          fontSize: 12,
          fontWeight: 700,
          padding: '2px 10px',
          borderRadius: 999,
          background: vote.passed ? '#e3f3ec' : '#fbe6e9',
          color: vote.passed ? AYE_COLOUR : NO_COLOUR,
        }}
      >
        {vote.passed ? 'Motion passed' : 'Motion rejected'}
      </div>

      {/* Two-lobby split bar: ayes and noes are distinct division lobbies, so the
          two segments meet edge-to-edge rather than reading as a single progress
          meter filling toward a goal. */}
      <div style={{ marginTop: 12 }}>
        <div
          style={{
            display: 'flex',
            height: 22,
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid #e6e1d6',
          }}
        >
          <div
            style={{
              width: `${ayePct}%`,
              background: AYE_COLOUR,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {vote.ayes > 0 && `Ayes ${vote.ayes}`}
          </div>
          <div
            style={{
              flex: 1,
              background: NO_COLOUR,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 8,
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {vote.noes > 0 && `Noes ${vote.noes}`}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
        <TallyColumn heading="Ayes" total={vote.ayes} tally={vote.ayesByParty} />
        <TallyColumn heading="Noes" total={vote.noes} tally={vote.noesByParty} />
      </div>
    </CardShell>
  );
}
