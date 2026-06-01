'use client';

import { CardView } from '@/components/cards/CardView';
import { partyColour } from '@/components/cards/format';
import { ChatFeed } from '@/components/chat/ChatFeed';
import { MapPopover } from '@/components/chrome/MapPopover';
import { TopBar } from '@/components/chrome/TopBar';
import { type ChatTurn, runAgentTurn } from '@/lib/agent/connector';
import type { AgentEvent, CardKind } from '@/lib/agent/events';
import { highlightsFromCards } from '@/lib/agent/highlights';
import { clearKey, getKey, setKey } from '@/lib/key/keyVault';
import type { Citation } from 'mp-mcp/types';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.css';

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
  const [mapOpen, setMapOpen] = useState(false);
  const [plainEnglish, setPlainEnglish] = useState(false);
  const cardSeq = useRef(0);

  const mapHighlights = useMemo(
    () =>
      highlightsFromCards(cards).map((ref) => ({
        name: ref.name,
        colour: partyColour(ref.party),
        sublabel: ref.party,
      })),
    [cards],
  );

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

  const toggleMap = useCallback(() => setMapOpen((v) => !v), []);
  const closeMap = useCallback(() => setMapOpen(false), []);
  const togglePlainEnglish = useCallback(() => setPlainEnglish((v) => !v), []);

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

  if (!keyPresent) {
    return (
      <main className={styles.gate}>
        <div className={styles.gateCard}>
          <div className="mono-label" style={{ fontSize: 10, color: 'var(--gilt)' }}>
            Agent of Parliament
          </div>
          <h1 className={styles.gateTitle}>Ask Parliament a question.</h1>
          <p className={styles.gateBody}>
            Ask UK Parliament questions in plain English and watch cited cards assemble. This runs
            on your own Anthropic key — paste it once, it stays in your browser.
          </p>
          <input
            type="password"
            value={keyDraft}
            onChange={(e) => setKeyDraft(e.target.value)}
            placeholder="sk-ant-…"
            className={styles.gateInput}
          />
          <div>
            <button
              type="button"
              onClick={saveKey}
              disabled={!keyDraft.trim()}
              className={styles.gateButton}
            >
              Save key and start
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.app} paper-noise`}>
      <div className={styles.topbar}>
        <TopBar
          keyPresent={keyPresent}
          mapBadge={mapHighlights.length}
          mapOpen={mapOpen}
          onToggleMap={toggleMap}
          plainEnglish={plainEnglish}
          onTogglePlainEnglish={togglePlainEnglish}
          onForgetKey={forgetKey}
        />
        <MapPopover open={mapOpen} onClose={closeMap} highlights={mapHighlights} />
      </div>

      <div className={styles.main}>
        <ChatFeed
          history={history}
          streaming={streaming}
          toolTrace={toolTrace}
          samplePrompts={SAMPLE_PROMPTS}
          input={input}
          onInput={setInput}
          onSubmit={() => void ask(input)}
          onPromptClick={(p) => void ask(p)}
        />

        <div className={styles.canvas}>
          <div className={styles.cards}>
            {cards.length === 0 ? (
              <p className={styles.placeholder}>Cards will appear here as the agent finds data.</p>
            ) : (
              cards.map((card) => (
                <CardView key={card.id} kind={card.kind} data={card.data} sources={card.sources} />
              ))
            )}
          </div>
          <footer className={styles.footer}>
            Contains Parliamentary information licensed under the Open Parliament Licence v3.0.
            Constituency boundaries: ONS / OS, Open Government Licence v3.0.
          </footer>
        </div>
      </div>
    </main>
  );
}
