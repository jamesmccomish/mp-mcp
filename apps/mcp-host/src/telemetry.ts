import { Langfuse } from 'langfuse';

// Minimal server-side telemetry: one span per tool call, with accurate wall-clock
// latency, attached to the browser-owned Langfuse trace (joined by traceId). No-op
// unless the Langfuse env is set.

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

export function isTelemetryEnabled(): boolean {
  return getClient() !== null;
}

export interface ToolSpan {
  traceId: string;
  name: string;
  startTime: Date;
  endTime: Date;
  ok: boolean;
}

// Upper bound on how long the flush may run. flushAsync hits the Langfuse
// ingestion API; if that is slow, unreachable, or rate-limited it can otherwise
// hang indefinitely. This caller must never outlive a real tool call by much.
const FLUSH_TIMEOUT_MS = 2000;

// Records one span and flushes it. flushAsync per call is the documented Langfuse
// pattern for serverless (the process suspends after the response, so batched
// events would otherwise be lost) — but the flush is bounded and never throws, so
// it is safe to run off the request's critical path. The caller is responsible for
// not awaiting this before returning the response (see app.ts).
export async function recordToolSpan(span: ToolSpan): Promise<void> {
  // The caller runs this fire-and-forget (see app.ts), so it must never reject —
  // a rejected fire-and-forget promise is an unhandled rejection. Everything,
  // including client construction and span enqueue, stays inside the try.
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const langfuse = getClient();
    if (!langfuse) return;
    langfuse.span({
      traceId: span.traceId,
      name: `tool:${span.name} srv`,
      startTime: span.startTime,
      endTime: span.endTime,
      level: span.ok ? 'DEFAULT' : 'ERROR',
      metadata: { source: 'mcp-host' },
    });
    await Promise.race([
      langfuse.flushAsync(),
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, FLUSH_TIMEOUT_MS);
      }),
    ]);
  } catch {
    // Telemetry is best-effort and must never surface on the request path.
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// The hosted MCP connector forwards `authorization_token` as `Authorization: Bearer <token>`;
// the browser carries the Langfuse traceId there. Tolerate a bare token too.
export function parseTraceId(authorization: string | undefined): string | undefined {
  if (!authorization) return undefined;
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  return (match?.[1] ?? authorization).trim() || undefined;
}
