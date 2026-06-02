import type { BetaRawMessageStreamEvent } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import type { Citation } from '@jamesmccomish/mp-mcp/types';
import { cardKindForTool } from './cardRegistry';
import type { AgentEvent } from './events';

// An mp-mcp tool result is the JSON-serialised citation envelope.
interface ToolResultEnvelope {
  data: unknown;
  sources?: Citation[];
}

// MCP tool-result content is either a plain string or text blocks; flatten to text.
function resultText(content: string | Array<{ text: string }>): string {
  return typeof content === 'string' ? content : content.map((b) => b.text).join('');
}

// Turns the raw Anthropic connector stream into the UI's typed event protocol.
// MCP result blocks carry only `tool_use_id`, so we track id -> tool name from the
// preceding `mcp_tool_use` block to resolve which card kind (if any) a result renders.
export async function* transform(
  stream: AsyncIterable<BetaRawMessageStreamEvent>,
): AsyncGenerator<AgentEvent> {
  const toolNameById = new Map<string, string>();

  for await (const event of stream) {
    if (event.type === 'content_block_start') {
      const block = event.content_block;

      if (block.type === 'mcp_tool_use') {
        toolNameById.set(block.id, block.name);
        yield { type: 'tool_start', id: block.id, name: block.name };
        continue;
      }

      if (block.type === 'mcp_tool_result') {
        const text = resultText(block.content);

        if (block.is_error) {
          yield { type: 'error', message: text };
          continue;
        }

        const kind = cardKindForTool(toolNameById.get(block.tool_use_id) ?? '');
        if (!kind) continue;

        try {
          const envelope = JSON.parse(text) as ToolResultEnvelope;
          yield { type: 'card', kind, data: envelope.data, sources: envelope.sources ?? [] };
        } catch {
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
