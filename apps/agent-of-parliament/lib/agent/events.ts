import type { Citation } from 'mp-mcp/types';

export type CardKind = 'mp' | 'vote' | 'debate' | 'topic';

export type AgentEvent =
  | { type: 'text'; delta: string }
  | { type: 'tool_start'; id: string; name: string }
  | { type: 'card'; kind: CardKind; data: unknown; sources: Citation[] }
  | { type: 'done' }
  | { type: 'error'; message: string };
