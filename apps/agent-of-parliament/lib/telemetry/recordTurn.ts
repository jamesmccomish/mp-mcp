import { Langfuse } from 'langfuse';
import type { TurnRecord } from './types';

// Server-only. Imported solely by the /api/trace route handler, so the Langfuse
// secret key never reaches the client bundle.

let client: Langfuse | null | undefined;

function getClient(): Langfuse | null {
  if (client !== undefined) return client;
  const secretKey = process.env.LANGFUSE_SECRET_KEY;
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY;
  client =
    secretKey && publicKey
      ? new Langfuse({ secretKey, publicKey, baseUrl: process.env.LANGFUSE_BASEURL })
      : null;
  return client;
}

// Writes one browser-captured turn to Langfuse: the trace, the generation
// (tokens/cost), and a client-side span per tool call. No-op unless the Langfuse
// env is set. mcp-host adds accurate server-side latency to the same trace.
export async function recordTurn(record: TurnRecord): Promise<void> {
  const langfuse = getClient();
  if (!langfuse) return;

  const trace = langfuse.trace({
    id: record.traceId,
    name: 'agent.turn',
    sessionId: record.sessionId,
    input: record.input,
    output: record.output,
  });

  // usageDetails lists token classes separately so Langfuse computes cost from
  // the model's price table, including the cache read/creation breakdown.
  trace.generation({
    name: 'messages.create',
    model: record.model,
    input: record.input,
    output: record.output,
    usageDetails: {
      input: record.usage.input,
      output: record.usage.output,
      cache_read_input_tokens: record.usage.cache_read,
      cache_creation_input_tokens: record.usage.cache_creation,
    },
  });

  for (const tool of record.toolCalls) {
    trace.span({
      name: `tool:${tool.name}`,
      input: tool.input,
      output: tool.output,
      level: tool.is_error ? 'ERROR' : 'DEFAULT',
      metadata: {
        source: 'client',
        response_bytes: tool.response_bytes,
        upstream_calls: tool.upstream_calls,
        truncated: tool.truncated,
        sources_count: tool.sources_count,
      },
    });
  }

  await langfuse.flushAsync();
}
