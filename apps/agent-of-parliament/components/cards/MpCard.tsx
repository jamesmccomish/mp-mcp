import { adaptMp } from '@/lib/agent/adapters/mp';
import type { Citation, Vote } from 'mp-mcp/types';
import type { ReactNode } from 'react';
import { CardShell } from './CardShell';
import styles from './MpCard.module.css';
import { formatDate, partyColour } from './format';

const VOTE_LABEL: Record<Vote, string> = {
  aye: 'Aye',
  no: 'No',
  teller: 'Teller',
  absent: 'Absent',
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className={styles.section}>{title}</div>
      {children}
    </>
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
    <CardShell kicker="MP Profile" sources={mp.sources}>
      <div className={styles.top}>
        {mp.thumbnailUrl && (
          <img
            src={mp.thumbnailUrl}
            alt={mp.name}
            width={74}
            height={74}
            className={styles.photo}
            style={{ borderTopColor: colour }}
          />
        )}
        <div style={{ minWidth: 0 }}>
          <div className={styles.name}>{mp.name}</div>
          <div className={styles.sub}>
            <span className={styles.party} style={{ color: colour }}>
              {mp.party}
            </span>
            {mp.constituency && <span> · {mp.constituency}</span>}
            {mp.status === 'former' && <span className={styles.dim}> · former member</span>}
          </div>
        </div>
      </div>

      {mp.synopsis && <p className={styles.line}>{mp.synopsis}</p>}

      {contactRows.length > 0 && (
        <Section title="Contact">
          {contactRows.map((row) => (
            <div key={row} className={`${styles.line} ${styles.dim}`}>
              {row}
            </div>
          ))}
        </Section>
      )}

      {mp.committees.length > 0 && (
        <Section title="Committees">
          <div className={styles.chips}>
            {mp.committees.map((c) => (
              <span key={c.name} className={styles.chip}>
                {c.name}
                {c.isChair && <strong> (Chair)</strong>}
              </span>
            ))}
          </div>
        </Section>
      )}

      {mp.recentVotes.length > 0 && (
        <Section title="Recent votes">
          {mp.recentVotes.map((v) => (
            <div key={v.divisionId} className={styles.voterow}>
              <span className={`${styles.vtag} ${styles[v.vote]}`}>{VOTE_LABEL[v.vote]}</span>
              <span>
                {v.title}
                <span className={styles.dim}>
                  {' '}
                  — {v.passed ? 'passed' : 'rejected'}, {formatDate(v.date)}
                </span>
              </span>
            </div>
          ))}
        </Section>
      )}

      {mp.recentContributions.length > 0 && (
        <Section title="Recent contributions">
          {mp.recentContributions.map((c) => (
            <div key={`${c.title}-${c.date}`} className={styles.line}>
              {c.title.trim()}
              <span className={styles.dim}>
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
              <div className={styles.line} style={{ fontWeight: 600 }}>
                {cat.category}
              </div>
              {cat.entries.map((e) => (
                <div key={e.interest} className={`${styles.line} ${styles.dim}`}>
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
