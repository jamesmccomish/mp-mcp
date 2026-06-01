import { adaptTopic } from '@/lib/agent/adapters/topic';
import type { TopicViewModel } from '@/lib/agent/adapters/topic';
import type { Citation } from 'mp-mcp/types';
import type { ReactNode } from 'react';
import { CardShell } from './CardShell';
import { DivisionLobbyBar } from './DivisionLobbyBar';
import styles from './TopicCard.module.css';
import { formatDate } from './format';

function Section({
  title,
  count,
  children,
}: { title: string; count: number; children: ReactNode }) {
  if (count === 0) return null;
  return (
    <>
      <div className={styles.group}>
        {title} <span className={styles.count}>({count})</span>
      </div>
      {children}
    </>
  );
}

export function TopicCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const vm: TopicViewModel = adaptTopic(data, sources);

  return (
    <CardShell kicker="Topic" title={vm.topic} sources={vm.sources}>
      <div className={styles.meta}>
        Parliamentary activity, {formatDate(vm.window.from)} – {formatDate(vm.window.to)}
      </div>

      <Section title="Bills in progress" count={vm.bills.length}>
        {vm.bills.map((b) => (
          <div key={b.id} className={styles.row}>
            <div className={styles.flex}>
              <span className={`${styles.title} ${styles.grow}`}>{b.title}</span>
              {b.isAct && <span className={`${styles.tag} ${styles.tagGreen}`}>Act</span>}
            </div>
            {b.stage && <div className={styles.rowMeta}>{b.stage}</div>}
          </div>
        ))}
      </Section>

      <Section title="Recent debates" count={vm.debates.length}>
        {vm.debates.map((d) => (
          <div key={`${d.title}-${d.date}`} className={styles.row}>
            <div className={styles.title}>{d.title}</div>
            <div className={styles.rowMeta}>
              {d.house} · {formatDate(d.date)}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Recent votes" count={vm.votes.length}>
        {vm.votes.map((v) => (
          <div key={`${v.title}-${v.date}`} className={styles.row}>
            <div className={styles.title}>{v.title}</div>
            <div className={styles.rowMeta}>{formatDate(v.date)}</div>
            <DivisionLobbyBar ayes={v.ayes} noes={v.noes} compact />
          </div>
        ))}
      </Section>

      <Section title="Written questions" count={vm.questions.length}>
        {vm.questions.map((q) => (
          <div key={`${q.dateTabled}-${q.question.slice(0, 24)}`} className={styles.row}>
            <div className={styles.flex}>
              <p className={`${styles.title} ${styles.grow}`} style={{ fontWeight: 400 }}>
                {q.question}
              </p>
              <span className={`${styles.tag} ${q.answered ? styles.tagGreen : styles.tagDim}`}>
                {q.answered ? 'Answered' : 'Awaiting'}
              </span>
            </div>
            <div className={styles.rowMeta}>
              {q.house} · tabled {formatDate(q.dateTabled)}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Petitions" count={vm.petitions.length}>
        {vm.petitions.map((p) => (
          <div key={p.action} className={styles.row}>
            <div className={styles.title}>{p.action}</div>
            <div className={styles.rowMeta}>{p.signatures.toLocaleString('en-GB')} signatures</div>
          </div>
        ))}
      </Section>
    </CardShell>
  );
}
