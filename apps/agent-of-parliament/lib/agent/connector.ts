import Anthropic from '@anthropic-ai/sdk';
import type { BetaMessageParam } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import type { TelemetrySink, TurnRecord } from '../telemetry/types';
import type { AgentEvent } from './events';
import { MODELS } from './models';
import { SYSTEM_PROMPT } from './systemPrompt';
import { transform } from './transform';

// The connector beta that lets the Messages API reach a remote MCP server itself.
const MCP_BETA = 'mcp-client-2025-11-20';
const MAX_TOKENS = 4096;

// One name binds the server declaration to its toolset reference. The API rejects
// the request (400) if an mcp_servers entry has no matching mcp_toolset in tools.
const MCP_SERVER_NAME = 'parliament';

const TELEMETRY_ENABLED = process.env.NEXT_PUBLIC_TELEMETRY_ENABLED === 'true';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface RunOptions {
  apiKey: string;
  mcpUrl: string;
  history: ChatTurn[];
  model?: string;
  sessionId?: string;
  signal?: AbortSignal;
}

// Runs one agent turn: a single streamed Messages call with the MCP connector
// pointed at our host. Anthropic runs the tool loop server-side; we only consume
// the stream and project it into AgentEvents. There is no hand-written tool loop.
// The SDK retries 429/5xx with backoff natively; mid-stream failures surface as an
// error event, and the caller can cancel a turn via `signal`.
export async function* runAgentTurn(opts: RunOptions): AsyncGenerator<AgentEvent> {
  const { apiKey, mcpUrl, history, model = MODELS.default, sessionId, signal } = opts;

  const telemetryOn = TELEMETRY_ENABLED && Boolean(sessionId);
  const traceId = crypto.randomUUID();
  const record: TurnRecord = {
    traceId,
    sessionId: sessionId ?? '',
    model,
    input: history.at(-1)?.content ?? '',
    output: '',
    usage: { input: 0, output: 0, cache_read: 0, cache_creation: 0 },
    toolCalls: [],
  };
  const sink: TelemetrySink = {
    onUsage: (u) => {
      if (u.model) record.model = u.model;
      if (u.input != null) record.usage.input = u.input;
      if (u.output != null) record.usage.output = u.output;
      if (u.cache_read != null) record.usage.cache_read = u.cache_read;
      if (u.cache_creation != null) record.usage.cache_creation = u.cache_creation;
    },
    onTool: (t) => record.toolCalls.push(t),
  };

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });

  const messages: BetaMessageParam[] = history.map((turn) => ({
    role: turn.role,
    content: turn.content,
  }));

  try {
    const stream = await client.beta.messages.create(
      {
        model,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
        mcp_servers: [
          {
            type: 'url',
            url: mcpUrl,
            name: MCP_SERVER_NAME,
            // authorization_token is the only field the hosted MCP connector
            // forwards to our server, so we carry the Langfuse traceId through it
            // to join the browser trace with mcp-host's server-side spans.
            // mcp-host has no real auth today; if it gains some, the token carries both.
            ...(telemetryOn ? { authorization_token: traceId } : {}),
          },
        ],
        tools: [{ type: 'mcp_toolset', mcp_server_name: MCP_SERVER_NAME }],
        betas: [MCP_BETA],
        stream: true,
      },
      { signal },
    );

    for await (const event of transform(stream, telemetryOn ? sink : undefined)) {
      if (event.type === 'text') record.output += event.delta;
      yield event;
    }
  } catch (err) {
    yield { type: 'error', message: errorMessage(err) };
  } finally {
    if (telemetryOn) sendTurn(record);
  }
}

// Fire-and-forget: write the captured turn via our own route handler (which holds
// the Langfuse secret key). Never blocks or breaks the turn.
function sendTurn(record: TurnRecord): void {
  void fetch('/api/trace', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(record),
    keepalive: true,
  }).catch(() => {});
}

function errorMessage(err: unknown): string {
  if (err instanceof Anthropic.APIError) {
    return `Anthropic API error (${err.status ?? 'network'}): ${err.message}`;
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong talking to the model.';
}
