'use client';

import type { ChatTurn } from '@/lib/agent/connector';
import { type FormEvent, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ChatFeed.module.css';

export function ChatFeed({
  history,
  streaming,
  toolTrace,
  samplePrompts,
  input,
  onInput,
  onSubmit,
  onPromptClick,
}: {
  history: ChatTurn[];
  streaming: boolean;
  toolTrace: string[];
  samplePrompts: string[];
  input: string;
  onInput: (value: string) => void;
  onSubmit: () => void;
  onPromptClick: (prompt: string) => void;
}) {
  const feedRef = useRef<HTMLDivElement>(null);

  // Keep the newest turn in view as text streams in.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on prop change, not ref mutation
  useEffect(() => {
    const el = feedRef.current;
    if (el && typeof el.scrollTo === 'function') {
      el.scrollTo({ top: el.scrollHeight });
    }
  }, [history, toolTrace]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className={styles.rail}>
      <span className={styles.tab}>
        <span className={styles.tabDot} />
        Conversation
      </span>
      <div className={styles.folder}>
        <div className={styles.feed} ref={feedRef}>
          {history.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.greeting}>Ask Parliament a question.</p>
              <div className={styles.chips}>
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={styles.chip}
                    onClick={() => onPromptClick(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            history.map((turn, i) => {
              const last = i === history.length - 1;
              return (
                <div
                  key={`${turn.role}-${i}`}
                  className={`${styles.turn} ${turn.role === 'user' ? styles.user : styles.asst}`}
                >
                  <div>
                    {turn.role === 'assistant' && <div className={styles.label}>Claude</div>}
                    <div className={styles.bubble}>
                      {turn.role === 'assistant' ? (
                        <ReactMarkdown>{turn.content}</ReactMarkdown>
                      ) : (
                        turn.content
                      )}
                      {turn.role === 'assistant' && last && streaming && (
                        <span className={styles.caret} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {toolTrace.length > 0 && (
            <div className={styles.trace}>
              <span className={styles.tick} />
              {toolTrace.join(' → ')}
            </div>
          )}
        </div>
        <form className={styles.composer} onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => onInput(e.target.value)}
            placeholder="Ask about an MP, a vote, a debate…"
            disabled={streaming}
            aria-label="Your question"
          />
          <button type="submit" className={styles.ask} disabled={streaming || !input.trim()}>
            Ask →
          </button>
        </form>
      </div>
    </div>
  );
}
