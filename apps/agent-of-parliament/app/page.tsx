'use client';

import { CardView } from '@/components/cards/CardView';
import { type ChatTurn, runAgentTurn } from '@/lib/agent/connector';
import type { AgentEvent, CardKind } from '@/lib/agent/events';
import { clearKey, getKey, setKey } from '@/lib/key/keyVault';
import type { Citation } from 'mp-mcp/types';
import { type FormEvent, useEffect, useRef, useState } from 'react';

const MCP_URL = process.env.NEXT_PUBLIC_MCP_URL ?? '';

const SAMPLE_PROMPTS = [
  'Tell me about my MP, my postcode is BS3 4QH.',
  'How has the MP for Holborn and St Pancras voted on climate?',
  'What is Parliament doing about NHS waiting lists?',
  "Did Diane Abbott vote for the Renters' Rights Bill?",
  'Recent debates about Ukraine.',
  'What does my MP do on committees? My postcode is M14 5SH.',
];

interface RawCard {
  id: string;
  kind: CardKind;
  data: unknown;
  sources: Citation[];
}

function appendToLast(turns: ChatTurn[], text: string): ChatTurn[] {
  const last = turns[turns.length - 1];
  if (!last) return turns;
  return [...turns.slice(0, -1), { role: last.role, content: last.content + text }];
}

export default function Page() {
  const [keyPresent, setKeyPresent] = useState(false);
  const [keyDraft, setKeyDraft] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [cards, setCards] = useState<RawCard[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [toolTrace, setToolTrace] = useState<string[]>([]);
  const cardSeq = useRef(0);

  useEffect(() => {
    setKeyPresent(getKey() !== null);
  }, []);

  function saveKey() {
    setKey(keyDraft);
    setKeyDraft('');
    setKeyPresent(getKey() !== null);
  }

  function forgetKey() {
    clearKey();
    setKeyPresent(false);
  }

  async function ask(question: string) {
    const apiKey = getKey();
    if (!apiKey || !question.trim() || streaming) return;
    if (!MCP_URL) {
      setHistory((h) => [
        ...h,
        { role: 'user', content: question },
        {
          role: 'assistant',
          content: 'NEXT_PUBLIC_MCP_URL is not set — point it at the deployed /mcp host.',
        },
      ]);
      return;
    }

    const turns: ChatTurn[] = [...history, { role: 'user', content: question }];
    setHistory([...turns, { role: 'assistant', content: '' }]);
    setInput('');
    setToolTrace([]);
    setStreaming(true);

    const apply = (event: AgentEvent) => {
      if (event.type === 'text') {
        setHistory((h) => appendToLast(h, event.delta));
      } else if (event.type === 'tool_start') {
        setToolTrace((t) => [...t, event.name]);
      } else if (event.type === 'card') {
        cardSeq.current += 1;
        setCards((c) => [
          ...c,
          {
            id: `card-${cardSeq.current}`,
            kind: event.kind,
            data: event.data,
            sources: event.sources,
          },
        ]);
      } else if (event.type === 'error') {
        setHistory((h) => appendToLast(h, `\n\n[error] ${event.message}`));
      }
    };

    try {
      for await (const event of runAgentTurn({ apiKey, mcpUrl: MCP_URL, history: turns })) {
        apply(event);
      }
    } finally {
      setStreaming(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(input);
  }

  if (!keyPresent) {
    return (
      <main
        style={{ maxWidth: 520, margin: '15vh auto', padding: '0 24px', fontFamily: 'system-ui' }}
      >
        <h1>Agent of Parliament</h1>
        <p>
          Ask UK Parliament questions in plain English and watch cited cards assemble. This runs on
          your own Anthropic key — paste it once and it stays in your browser tab.
        </p>
        <input
          type="password"
          value={keyDraft}
          onChange={(e) => setKeyDraft(e.target.value)}
          placeholder="sk-ant-..."
          style={{ width: '100%', padding: 10, fontSize: 16 }}
        />
        <button
          type="button"
          onClick={saveKey}
          disabled={!keyDraft.trim()}
          style={{ marginTop: 12, padding: '10px 16px' }}
        >
          Save key and start
        </button>
      </main>
    );
  }

  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        fontFamily: 'system-ui',
      }}
    >
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #ddd',
          padding: 16,
          overflow: 'hidden',
        }}
      >
        <header
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}
        >
          <strong>Agent of Parliament</strong>
          <button type="button" onClick={forgetKey} style={{ fontSize: 12 }}>
            Forget key
          </button>
        </header>

        <div style={{ flex: 1, overflowY: 'auto', margin: '12px 0' }}>
          {history.length === 0 ? (
            <div>
              <p style={{ color: '#666' }}>Try one of these:</p>
              {SAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => void ask(p)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    margin: '6px 0',
                    padding: 8,
                    cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          ) : (
            history.map((turn, i) => (
              <div key={`${turn.role}-${i}`} style={{ margin: '12px 0' }}>
                <div style={{ fontSize: 12, color: '#888' }}>{turn.role}</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {turn.content || (streaming ? '…' : '')}
                </div>
              </div>
            ))
          )}
          {toolTrace.length > 0 && (
            <div style={{ fontSize: 12, color: '#999' }}>tools: {toolTrace.join(' → ')}</div>
          )}
        </div>

        <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about an MP, a vote, a debate…"
            disabled={streaming}
            style={{ flex: 1, padding: 10 }}
          />
          <button
            type="submit"
            disabled={streaming || !input.trim()}
            style={{ padding: '10px 16px' }}
          >
            {streaming ? '…' : 'Ask'}
          </button>
        </form>
      </section>

      <section style={{ padding: 16, overflowY: 'auto', background: '#fafafa' }}>
        {cards.length === 0 ? (
          <p style={{ color: '#999' }}>Cards will appear here as the agent finds data.</p>
        ) : (
          cards.map((card) => (
            <CardView key={card.id} kind={card.kind} data={card.data} sources={card.sources} />
          ))
        )}
        <footer style={{ fontSize: 11, color: '#999', marginTop: 24 }}>
          Contains Parliamentary information licensed under the Open Parliament Licence v3.0.
        </footer>
      </section>
    </main>
  );
}
