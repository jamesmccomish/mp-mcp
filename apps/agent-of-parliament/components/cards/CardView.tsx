import type { CardKind } from '@/lib/agent/events';
import type { Citation } from 'mp-mcp/types';
import { CardShell } from './CardShell';
import { DebateCard } from './DebateCard';
import { MpCard } from './MpCard';
import { TopicCard } from './TopicCard';
import { VoteCard } from './VoteCard';

// Dispatches a card event to its typed component. Any unmapped kind falls back to
// raw JSON inside the shared shell so its sources still render.
export function CardView({
  kind,
  data,
  sources,
}: {
  kind: CardKind;
  data: unknown;
  sources: Citation[];
}) {
  if (kind === 'mp') return <MpCard data={data} sources={sources} />;
  if (kind === 'vote') return <VoteCard data={data} sources={sources} />;
  if (kind === 'debate') return <DebateCard data={data} sources={sources} />;
  if (kind === 'topic') return <TopicCard data={data} sources={sources} />;

  return (
    <CardShell eyebrow={kind} sources={sources}>
      <pre style={{ fontSize: 12, overflowX: 'auto', whiteSpace: 'pre-wrap', margin: 0 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </CardShell>
  );
}
