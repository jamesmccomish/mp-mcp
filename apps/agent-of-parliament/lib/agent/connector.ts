import Anthropic from '@anthropic-ai/sdk';
import type { BetaMessageParam } from '@anthropic-ai/sdk/resources/beta/messages/messages';
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

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface RunOptions {
  apiKey: string;
  mcpUrl: string;
  history: ChatTurn[];
  model?: string;
  signal?: AbortSignal;
}

// Runs one agent turn: a single streamed Messages call with the MCP connector
// pointed at our host. Anthropic runs the tool loop server-side; we only consume
// the stream and project it into AgentEvents. There is no hand-written tool loop.
// The SDK retries 429/5xx with backoff natively; mid-stream failures surface as an
// error event, and the caller can cancel a turn via `signal`.
export async function* runAgentTurn(opts: RunOptions): AsyncGenerator<AgentEvent> {
  const { apiKey, mcpUrl, history, model = MODELS.default, signal } = opts;

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
        mcp_servers: [{ type: 'url', url: mcpUrl, name: MCP_SERVER_NAME }],
        tools: [{ type: 'mcp_toolset', mcp_server_name: MCP_SERVER_NAME }],
        betas: [MCP_BETA],
        stream: true,
      },
      { signal },
    );

    yield* transform(stream);
  } catch (err) {
    yield { type: 'error', message: errorMessage(err) };
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof Anthropic.APIError) {
    return `Anthropic API error (${err.status ?? 'network'}): ${err.message}`;
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong talking to the model.';
}
