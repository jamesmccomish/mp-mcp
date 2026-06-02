import { adaptMember } from '@/lib/agent/adapters/member';
import type { Citation } from '@jamesmccomish/mp-mcp/types';
import { CardShell } from './CardShell';
import styles from './MemberCard.module.css';
import { partyColour } from './format';

// Lightweight identity card for parliament_find_member. It names the matched
// member(s) and points the user at the richer profile, which renders as the
// detailed MP card once the agent calls parliament_member_overview.
export function MemberCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const { matches, sources: srcs } = adaptMember(data, sources);

  if (matches.length === 0) return null;

  const single = matches.length === 1;

  return (
    <CardShell kicker={single ? 'Member' : `${matches.length} matches`} sources={srcs}>
      {matches.map((m) => {
        const colour = partyColour(m.party);
        return (
          <div key={m.id} className={styles.row}>
            {m.thumbnailUrl && (
              <img
                src={m.thumbnailUrl}
                alt={m.name}
                width={48}
                height={48}
                className={styles.photo}
                style={{ borderTopColor: colour }}
              />
            )}
            <div style={{ minWidth: 0 }}>
              <div className={styles.name}>{m.name}</div>
              <div className={styles.sub}>
                <span className={styles.party} style={{ color: colour }}>
                  {m.party}
                </span>
                {m.constituency && <span> · {m.constituency}</span>}
                {m.status === 'former' && <span className={styles.dim}> · former member</span>}
              </div>
            </div>
          </div>
        );
      })}

      <p className={styles.hint}>
        {single
          ? 'Ask for the full profile to see committees, recent votes, and contributions.'
          : 'Ask about one of them for a full profile with committees, votes, and contributions.'}
      </p>
    </CardShell>
  );
}
