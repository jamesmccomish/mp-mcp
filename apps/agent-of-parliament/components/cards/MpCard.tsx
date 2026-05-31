import { adaptMp } from '@/lib/agent/adapters/mp';
import type { Citation, Vote } from 'mp-mcp/types';
import type { ReactNode } from 'react';
import { CardShell } from './CardShell';
import { formatDate, partyColour } from './format';

const VOTE_STYLE: Record<Vote, { label: string; bg: string; fg: string }> = {
  aye: { label: 'Aye', bg: '#e3f3ec', fg: '#0b6b4f' },
  no: { label: 'No', bg: '#fbe6e9', fg: '#a3122b' },
  teller: { label: 'Teller', bg: '#efece4', fg: '#6b6655' },
  absent: { label: 'Absent', bg: '#efece4', fg: '#9a9484' },
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#4a4636', marginBottom: 6 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

export function MpCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const mp = adaptMp(data, sources);
  const colour = partyColour(mp.party);
  const contactRows = [
    mp.contact.email,
    mp.contact.phone,
    mp.contact.website,
    mp.contact.address,
  ].filter((v): v is string => Boolean(v));

  return (
    <CardShell eyebrow="Member of Parliament" sources={mp.sources}>
      <div style={{ height: 4, borderRadius: 2, background: colour, marginBottom: 12 }} />

      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        {mp.thumbnailUrl && (
          <img
            src={mp.thumbnailUrl}
            alt={mp.name}
            width={64}
            height={64}
            style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0, background: '#efece4' }}
          />
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#26231a' }}>{mp.name}</div>
          <div style={{ fontSize: 13, color: '#5c5746', marginTop: 2 }}>
            <span style={{ fontWeight: 600, color: colour }}>{mp.party}</span>
            {mp.constituency && <span> · {mp.constituency}</span>}
            {mp.status === 'former' && <span style={{ color: '#9a9484' }}> · former member</span>}
          </div>
        </div>
      </div>

      {mp.synopsis && (
        <p style={{ fontSize: 14, lineHeight: 1.5, color: '#3b3729', marginTop: 12 }}>
          {mp.synopsis}
        </p>
      )}

      {contactRows.length > 0 && (
        <Section title="Contact">
          {contactRows.map((row) => (
            <div key={row} style={{ fontSize: 13, color: '#5c5746' }}>
              {row}
            </div>
          ))}
        </Section>
      )}

      {mp.committees.length > 0 && (
        <Section title="Committees">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {mp.committees.map((c) => (
              <span
                key={c.name}
                style={{
                  fontSize: 12,
                  padding: '3px 8px',
                  borderRadius: 999,
                  background: '#f2efe6',
                  color: '#4a4636',
                }}
              >
                {c.name}
                {c.isChair && <strong> (Chair)</strong>}
              </span>
            ))}
          </div>
        </Section>
      )}

      {mp.recentVotes.length > 0 && (
        <Section title="Recent votes">
          {mp.recentVotes.map((v) => {
            const vs = VOTE_STYLE[v.vote];
            return (
              <div
                key={v.divisionId}
                style={{ display: 'flex', gap: 8, alignItems: 'baseline', margin: '5px 0' }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '1px 7px',
                    borderRadius: 4,
                    background: vs.bg,
                    color: vs.fg,
                    flexShrink: 0,
                  }}
                >
                  {vs.label}
                </span>
                <span style={{ fontSize: 13, color: '#3b3729' }}>
                  {v.title}
                  <span style={{ color: '#9a9484' }}>
                    {' '}
                    — {v.passed ? 'passed' : 'rejected'}, {formatDate(v.date)}
                  </span>
                </span>
              </div>
            );
          })}
        </Section>
      )}

      {mp.recentContributions.length > 0 && (
        <Section title="Recent contributions">
          {mp.recentContributions.map((c) => (
            <div
              key={`${c.title}-${c.date}`}
              style={{ fontSize: 13, color: '#3b3729', margin: '4px 0' }}
            >
              {c.title.trim()}
              <span style={{ color: '#9a9484' }}>
                {' '}
                — {c.section}, {formatDate(c.date)}
              </span>
            </div>
          ))}
        </Section>
      )}

      {mp.interests.length > 0 && (
        <Section title="Registered interests">
          {mp.interests.map((cat) => (
            <div key={cat.category} style={{ margin: '4px 0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#4a4636' }}>{cat.category}</div>
              {cat.entries.map((e) => (
                <div key={e.interest} style={{ fontSize: 12, color: '#5c5746' }}>
                  {e.interest}
                </div>
              ))}
            </div>
          ))}
        </Section>
      )}
    </CardShell>
  );
}
