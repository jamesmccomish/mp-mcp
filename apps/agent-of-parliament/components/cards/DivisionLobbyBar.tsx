import type { PartyTally } from '@/lib/agent/adapters/vote';
import { lobbyFill, partyShare } from '@/lib/cards/lobby';
import styles from './DivisionLobbyBar.module.css';
import { partyColour } from './format';

export interface MemberVote {
  name: string;
  vote: 'aye' | 'no';
}

export function DivisionLobbyBar({
  ayes,
  noes,
  ayesByParty,
  noesByParty,
  memberVote,
  compact = false,
}: {
  ayes: number;
  noes: number;
  ayesByParty?: PartyTally[];
  noesByParty?: PartyTally[];
  memberVote?: MemberVote;
  compact?: boolean;
}) {
  const fill = lobbyFill(ayes, noes);

  // Combine both lobbies into a single party tally for the breakdown stack.
  const combined = new Map<string, number>();
  for (const t of [...(ayesByParty ?? []), ...(noesByParty ?? [])]) {
    combined.set(t.party, (combined.get(t.party) ?? 0) + t.count);
  }
  const shares = partyShare(
    [...combined.entries()]
      .map(([party, count]) => ({ party, count }))
      .sort((a, b) => b.count - a.count || a.party.localeCompare(b.party)),
  );

  const rowClass = (side: 'aye' | 'no') =>
    `${styles.row} ${styles[side]} ${memberVote?.vote === side ? styles.highlight : ''}`;

  return (
    <div className={`${styles.lobby} ${compact ? styles.compact : ''}`}>
      <div className={rowClass('aye')}>
        <span className={styles.label}>Ayes</span>
        <span className={styles.track}>
          <span className={styles.fill} style={{ width: `${fill.aye * 100}%` }} />
        </span>
        <span className={styles.count}>{ayes}</span>
      </div>
      {memberVote?.vote === 'aye' && (
        <div className={styles.voted}>{memberVote.name} voted Aye</div>
      )}
      <div className={rowClass('no')}>
        <span className={styles.label}>Noes</span>
        <span className={styles.track}>
          <span className={styles.fill} style={{ width: `${fill.no * 100}%` }} />
        </span>
        <span className={styles.count}>{noes}</span>
      </div>
      {memberVote?.vote === 'no' && <div className={styles.voted}>{memberVote.name} voted No</div>}

      {!compact && shares.length > 0 && (
        <>
          <div className={styles.stack}>
            {shares.map((s) => (
              <span
                key={s.party}
                style={{ width: `${s.fraction * 100}%`, background: partyColour(s.party) }}
                title={`${s.party}: ${s.count}`}
              />
            ))}
          </div>
          <div className={styles.legend}>{shares.map((s) => s.party).join(' · ')}</div>
        </>
      )}
    </div>
  );
}
