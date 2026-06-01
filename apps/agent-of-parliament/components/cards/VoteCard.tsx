import { adaptVote } from '@/lib/agent/adapters/vote';
import type { VoteViewModel } from '@/lib/agent/adapters/vote';
import type { Citation } from 'mp-mcp/types';
import { CardShell } from './CardShell';
import { DivisionLobbyBar } from './DivisionLobbyBar';
import styles from './VoteCard.module.css';
import { formatDate } from './format';

export function VoteCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const vote: VoteViewModel = adaptVote(data, sources);
  const isLords = vote.house === 'Lords';

  return (
    <CardShell
      kicker={isLords ? 'Lords Division' : 'Division'}
      title={vote.title}
      lords={isLords}
      sources={vote.sources}
    >
      <div className={styles.meta}>
        Division {vote.divisionNumber} · {vote.house} · {formatDate(vote.date)}
      </div>
      <span className={`${styles.result} ${vote.passed ? styles.passed : styles.rejected}`}>
        {vote.passed ? 'Motion passed' : 'Motion rejected'}
      </span>
      <DivisionLobbyBar
        ayes={vote.ayes}
        noes={vote.noes}
        ayesByParty={vote.ayesByParty}
        noesByParty={vote.noesByParty}
      />
    </CardShell>
  );
}
