import type { BetaRawMessageStreamEvent } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import type { Citation } from '@jamesmccomish/mp-mcp/types';
import type { TelemetrySink } from '../telemetry/types';
import { cardKindForTool } from './cardRegistry';
import type { AgentEvent } from './events';

// An mp-mcp tool result is the JSON-serialised citation envelope.
interface ToolResultEnvelope {
  data: unknown;
  sources?: Citation[];
  meta?: { upstream_calls?: number; truncated?: boolean };
}

// mp-mcp error payloads are JSON with this shape.
interface McpErrorPayload {
  error?: { message?: string };
}

function parseMcpError(text: string): string {
  try {
    const payload = JSON.parse(text) as McpErrorPayload;
    if (payload.error?.message) return payload.error.message;
  } catch {}
  return text;
}

// MCP tool-result content is either a plain string or text blocks; flatten to text.
function resultText(content: string | Array<{ text: string }>): string {
  return typeof content === 'string' ? content : content.map((b) => b.text).join('');
}

// Turns the raw Anthropic connector stream into the UI's typed event protocol.
// MCP result blocks carry only `tool_use_id`, so we track id -> tool name from the
// preceding `mcp_tool_use` block to resolve which card kind (if any) a result renders.
//
// `sink` is an optional telemetry side-channel: it observes the same events to
// capture usage and per-tool metadata for Langfuse, and does not affect the UI
// AgentEvents this generator yields.
//
// Tool outputs are public parliamentary data (no PII), so we record them for
// tool-design inspection — but capped, since the whole turn is POSTed in one
// `keepalive` request (~64KB browser limit). `response_bytes` keeps the true size.
const TELEMETRY_OUTPUT_CAP = 10_000;

export async function* transform(
  stream: AsyncIterable<BetaRawMessageStreamEvent>,
  sink?: TelemetrySink,
): AsyncGenerator<AgentEvent> {
  const toolNameById = new Map<string, string>();
  const toolInputById = new Map<string, unknown>();

  for await (const event of stream) {
    if (event.type === 'message_start') {
      const u = event.message.usage;
      sink?.onUsage({
        model: event.message.model,
        input: u.input_tokens,
        output: u.output_tokens,
        cache_read: u.cache_read_input_tokens ?? 0,
        cache_creation: u.cache_creation_input_tokens ?? 0,
      });
      continue;
    }

    if (event.type === 'message_delta') {
      sink?.onUsage({ output: event.usage.output_tokens ?? 0 });
      continue;
    }

    if (event.type === 'content_block_start') {
      const block = event.content_block;

      if (block.type === 'mcp_tool_use') {
        toolNameById.set(block.id, block.name);
        toolInputById.set(block.id, block.input);
        yield { type: 'tool_start', id: block.id, name: block.name };
        continue;
      }

      if (block.type === 'mcp_tool_result') {
        const text = resultText(block.content);
        const name = toolNameById.get(block.tool_use_id) ?? '';
        const envelope = block.is_error ? undefined : safeParse(text);

        // Capture every tool result for telemetry, including errors and results
        // that render no card.
        sink?.onTool({
          name,
          input: toolInputById.get(block.tool_use_id),
          output: text.slice(0, TELEMETRY_OUTPUT_CAP),
          response_bytes: text.length,
          upstream_calls: envelope?.meta?.upstream_calls,
          truncated: envelope?.meta?.truncated,
          sources_count: envelope?.sources?.length ?? 0,
          is_error: Boolean(block.is_error),
        });

        if (block.is_error) {
          yield { type: 'error', message: parseMcpError(text) };
          continue;
        }

        const kind = cardKindForTool(name);
        if (!kind) continue;

        if (envelope) {
          yield { type: 'card', kind, data: envelope.data, sources: envelope.sources ?? [] };
        } else {
          yield { type: 'error', message: 'Could not parse tool result.' };
        }
      }

      continue;
    }

    if (event.type === 'content_block_delta') {
      if (event.delta.type === 'text_delta') {
        yield { type: 'text', delta: event.delta.text };
      }
      continue;
    }

    if (event.type === 'message_stop') {
      yield { type: 'done' };
    }
  }
}

function safeParse(text: string): ToolResultEnvelope | undefined {
  try {
    return JSON.parse(text) as ToolResultEnvelope;
  } catch {
    return undefined;
  }
}
