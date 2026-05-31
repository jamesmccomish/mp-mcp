import { adaptTopic } from '@/lib/agent/adapters/topic';
import type { TopicViewModel } from '@/lib/agent/adapters/topic';
import type { Citation } from 'mp-mcp/types';
import type { ReactNode } from 'react';
import { CardShell } from './CardShell';
import { formatDate } from './format';

const GREEN = '#0b6b4f';

function Section({
  title,
  count,
  children,
}: { title: string; count: number; children: ReactNode }) {
  if (count === 0) return null;
  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          color: '#9a9484',
          marginBottom: 4,
        }}
      >
        {title} <span style={{ color: '#c4bca8' }}>({count})</span>
      </div>
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div style={{ borderTop: '1px solid #efece4', padding: '8px 0' }}>{children}</div>;
}

const titleStyle = { fontSize: 13, fontWeight: 700, color: '#26231a', lineHeight: 1.35 } as const;
const metaStyle = { fontSize: 12, color: '#5c5746', marginTop: 2 } as const;

function pill(background: string, color: string) {
  return {
    fontSize: 10,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.4,
    padding: '1px 6px',
    borderRadius: 999,
    background,
    color,
  };
}

export function TopicCard({ data, sources }: { data: unknown; sources: Citation[] }) {
  const vm: TopicViewModel = adaptTopic(data, sources);

  return (
    <CardShell eyebrow="Topic dossier" sources={vm.sources}>
      <div style={{ fontSize: 19, fontWeight: 700, color: '#26231a', lineHeight: 1.3 }}>
        {vm.topic}
      </div>
      <div style={metaStyle}>
        Parliamentary activity, {formatDate(vm.window.from)} – {formatDate(vm.window.to)}
      </div>

      <Section title="Bills" count={vm.bills.length}>
        {vm.bills.map((b) => (
          <Row key={b.id}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ ...titleStyle, flex: 1, minWidth: 0 }}>{b.title}</span>
              {b.isAct && <span style={pill('#e3f3ec', GREEN)}>Act</span>}
            </div>
            {b.stage && <div style={metaStyle}>{b.stage}</div>}
          </Row>
        ))}
      </Section>

      <Section title="Divisions" count={vm.votes.length}>
        {vm.votes.map((v) => (
          <Row key={`${v.title}-${v.date}`}>
            <div style={titleStyle}>{v.title}</div>
            <div style={metaStyle}>
              {formatDate(v.date)} · Ayes {v.ayes} · Noes {v.noes}
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Debates" count={vm.debates.length}>
        {vm.debates.map((d) => (
          <Row key={`${d.title}-${d.date}`}>
            <div style={titleStyle}>{d.title}</div>
            <div style={metaStyle}>
              {d.house} · {formatDate(d.date)}
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Written questions" count={vm.questions.length}>
        {vm.questions.map((q) => (
          <Row key={`${q.dateTabled}-${q.question.slice(0, 24)}`}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: '#3b3729', margin: 0, flex: 1 }}>
                {q.question}
              </p>
              {q.answered ? (
                <span style={pill('#e3f3ec', GREEN)}>Answered</span>
              ) : (
                <span style={pill('#f2efe6', '#9a9484')}>Awaiting</span>
              )}
            </div>
            <div style={metaStyle}>
              {q.house} · tabled {formatDate(q.dateTabled)}
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Petitions" count={vm.petitions.length}>
        {vm.petitions.map((p) => (
          <Row key={p.action}>
            <div style={titleStyle}>{p.action}</div>
            <div style={metaStyle}>{p.signatures.toLocaleString('en-GB')} signatures</div>
          </Row>
        ))}
      </Section>
    </CardShell>
  );
}
